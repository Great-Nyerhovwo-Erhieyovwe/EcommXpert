import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { GamificationState } from '../types/gamification';
import { GAMIFICATION_CONFIG, BADGES, REWARDS } from '../lib/gamificationConfig';
import React from 'react';

// Mock initial state
const initialState: GamificationState = {
    xp: 1240,
    level: 1,
    streak: 14,
    lastActivity: '2025-11-13T00:00:00Z',
    badges: BADGES.map(badge => ({
        ...badge,
        unlocked: ['badge_001', 'badge_005', 'badge_010'].includes(badge.id),
        unlockedAt: ['badge_001', 'badge_005', 'badge_010'].includes(badge.id) ? '2025-11-10T00:00:00Z' : undefined,
    })),
    achievements: [
        {
            id: 'ach_001',
            badgeId: 'badge_001',
            userId: 'usr_001',
            unlockedAt: '2025-11-01T10:30:00Z',
            xpAwarded: 100,
        },
        {
            id: 'ach_002',
            badgeId: 'badge_005',
            userId: 'usr_001',
            unlockedAt: '2025-11-05T14:20:00Z',
            xpAwarded: 200,
        },
        {
            id: 'ach_003',
            badgeId: 'badge_010',
            userId: 'usr_001',
            unlockedAt: '2025-11-10T09:15:00Z',
            xpAwarded: 200,
        },
    ],
    leaderboard: [
        { rank: 1, userId: 'usr_003', userName: 'Emma Rodriguez', avatar: 'https://i.pravatar.cc/150?img=8', xp: 8900, level: 8, streak: 21 },
        { rank: 2, userId: 'usr_001', userName: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=32', xp: 1240, level: 1, streak: 14 },
        { rank: 3, userId: 'usr_002', userName: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=4', xp: 890, level: 0, streak: 8 },
        { rank: 4, userId: 'usr_004', userName: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=5', xp: 420, level: 0, streak: 5 },
    ],
    rewards: REWARDS,
    notifications: [],
};

const GamificationContext = createContext<{
    state: GamificationState;
    awardXp: (amount: number, reason: string) => void;
    awardBadge: (badgeId: string) => void;
    updateStreak: () => void;
    redeemReward: (rewardId: string) => void;
    clearNotifications: () => void;
}>({
    state: initialState,
    awardXp: () => { },
    awardBadge: () => { },
    updateStreak: () => { },
    redeemReward: () => { },
    clearNotifications: () => { },
});

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GamificationState>(initialState);

    const awardXp = (amount: number, _reason: string) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / GAMIFICATION_CONFIG.xpPerLevel);

        setState(prev => ({
            ...prev,
            xp: newXp,
            level: newLevel,
            achievements: [...prev.achievements, {
                id: `ach_${Date.now()}`,
                badgeId: 'xp_milestone',
                userId: 'usr_001',
                unlockedAt: new Date().toISOString(),
                xpAwarded: amount,
            }],
            notifications: [...prev.notifications, {
                id: `ach_${Date.now()}`,
                badgeId: 'xp_milestone',
                userId: 'usr_001',
                unlockedAt: new Date().toISOString(),
                xpAwarded: amount,
            }],
        }));

        // Check for level up badge
        if (newLevel > state.level) {
            // Award level up badge logic here
        }
    };

    const awardBadge = (badgeId: string) => {
        const badge = state.badges.find(b => b.id === badgeId);
        if (!badge || badge.unlocked) return;

        const updatedBadges = state.badges.map(b =>
            b.id === badgeId ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        );

        setState(prev => ({
            ...prev,
            badges: updatedBadges,
            achievements: [...prev.achievements, {
                id: `ach_${Date.now()}`,
                badgeId,
                userId: 'usr_001',
                unlockedAt: new Date().toISOString(),
                xpAwarded: badge.xpReward,
            }],
            notifications: [...prev.notifications, {
                id: `ach_${Date.now()}`,
                badgeId,
                userId: 'usr_001',
                unlockedAt: new Date().toISOString(),
                xpAwarded: badge.xpReward,
            }],
            xp: prev.xp + badge.xpReward,
        }));

        // Award XP for the badge
        awardXp(badge.xpReward, `Badge: ${badge.name}`);
    };

    const updateStreak = () => {
        const today = new Date();
        const lastActivity = new Date(state.lastActivity);
        const diffTime = Math.abs(today.getTime() - lastActivity.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let newStreak = state.streak;
        if (diffDays === 1) {
            newStreak += 1;
        } else if (diffDays > 1) {
            newStreak = 1;
        }

        // Award streak bonus XP
        const streakBonus = newStreak > 1 ? GAMIFICATION_CONFIG.streakBonus : 0;

        setState(prev => ({
            ...prev,
            streak: newStreak,
            lastActivity: today.toISOString(),
            xp: prev.xp + (diffDays <= 1 ? GAMIFICATION_CONFIG.dailyLoginXp + streakBonus : 0),
        }));

        // Check for streak badges
        if (newStreak === 7) {
            awardBadge('badge_010');
        } else if (newStreak === 30) {
            awardBadge('badge_011');
        }
    };

    const redeemReward = (rewardId: string) => {
        const reward = state.rewards.find(r => r.id === rewardId);
        if (!reward || reward.cost > state.xp) return;

        const updatedRewards = state.rewards.map(r =>
            r.id === rewardId ? { ...r, redeemed: true, redeemedAt: new Date().toISOString() } : r
        );

        setState(prev => ({
            ...prev,
            rewards: updatedRewards,
            xp: prev.xp - reward.cost,
        }));

        alert(`Reward redeemed: ${reward.name}`);
    };

    const clearNotifications = () => {
        setState(prev => ({ ...prev, notifications: [] }));
    };

    // Auto-update streak on app load
    useEffect(() => {
        updateStreak();
    }, []);

    const contextValue = {
        state,
        awardXp,
        awardBadge,
        updateStreak,
        redeemReward,
        clearNotifications,
    };

    return React.createElement(GamificationContext.Provider, { value: contextValue }, children);
};

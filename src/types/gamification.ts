export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    xpReward: number;
    category: 'learning' | 'investment' | 'community' | 'milestone';
    unlocked: boolean;
    unlockedAt?: string;
}

export interface Achievement {
    id: string;
    badgeId: string;
    userId: string;
    unlockedAt: string;
    xpAwarded: number;
}

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    userName: string;
    avatar: string;
    xp: number;
    level: number;
    streak: number;
}

export interface Reward {
    id: string;
    name: string;
    description: string;
    cost: number; // XP cost
    type: 'premium_content' | 'discount' | 'feature_unlock' | 'physical';
    available: boolean;
    redeemed?: boolean;
    redeemedAt?: string;
}

export interface GamificationState {
    xp: number;
    level: number;
    streak: number;
    lastActivity: string;
    badges: Badge[];
    achievements: Achievement[];
    leaderboard: LeaderboardEntry[];
    rewards: Reward[];
    notifications: Achievement[];
}

export interface GamificationConfig {
    xpPerLevel: number;
    streakBonus: number;
    dailyLoginXp: number;
    courseCompletionXp: number;
    investmentXp: number;
    communityXp: number;
    badgeRarities: Record<string, number>;
}
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DashboardState, User, Course, Investment, Transaction } from '../types/dashboard';
import React from 'react';

// Mock Data
const mockUser: User = {
    id: 'usr_123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    goal: 'both',
    xp: 1240,
    streak: 14,
    badges: ['Onboarding', 'First Course', 'Top 10% Investor'],
};

const mockCourses: Course[] = [
    {
        id: 'c1',
        title: 'How to Find Winning Products',
        progress: 100,
        completed: true,
        category: 'beginner',
        icon: 'book',
        lastAccessed: '2025-11-13',
    },
    {
        id: 'c2',
        title: 'Facebook Ads Masterclass',
        progress: 75,
        completed: false,
        category: 'intermediate',
        icon: 'video',
        lastAccessed: '2025-11-14',
    },
    {
        id: 'c3',
        title: 'Scaling to $50k/month',
        progress: 20,
        completed: false,
        category: 'pro',
        icon: 'chart-line',
        lastAccessed: '2025-11-10',
    },
];

const mockInvestments: Investment[] = [
    {
        id: 'inv1',
        name: 'Starter Growth Pool',
        amount: 1000,
        roi: 15,
        risk: 'low',
        status: 'active',
        growth: [800, 850, 920, 980, 1050, 1100],
        startDate: '2025-10-01',
    },
    {
        id: 'inv2',
        name: 'Premium Asset Pool',
        amount: 2500,
        roi: 22,
        risk: 'medium',
        status: 'active',
        growth: [2000, 2100, 2250, 2400, 2550],
        startDate: '2025-09-15',
    },
];

const mockTransactions: Transaction[] = [
    { id: 't1', type: 'deposit', amount: 1000, description: 'Invested in Starter Pool', date: '2025-10-01', status: 'completed' },
    { id: 't2', type: 'course', amount: 0, description: 'Completed: Winning Products', date: '2025-11-13', status: 'completed' },
    { id: 't3', type: 'payout', amount: 320, description: 'Weekly Earnings', date: '2025-11-12', status: 'completed' },
    { id: 't4', type: 'investment', amount: 2500, description: 'Joined Premium Pool', date: '2025-09-15', status: 'completed' },
];

const initialState: DashboardState = {
    user: mockUser,
    courses: mockCourses,
    investments: mockInvestments,
    transactions: mockTransactions,
    balance: 3820,
    totalEarnings: 1540,
    totalInvested: 3500,
};

const DashboardContext = createContext<{
    state: DashboardState;
    dispatch: React.Dispatch<Partial<DashboardState>>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DashboardState>(initialState);

    const dispatch = (partial: Partial<DashboardState>) => {
        setState((prev) => ({ ...prev, ...partial }));
    };

    const providerValue = { state, dispatch };

    return React.createElement(DashboardContext.Provider, { value: providerValue }, children);
};
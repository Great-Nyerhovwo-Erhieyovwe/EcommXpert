import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AdminState, AdminUser, Course, InvestmentPool, WithdrawalRequest, NotificationTemplate, PlatformMetric } from '../types/admin';
import React from 'react';

// Mock Data
const mockUsers: AdminUser[] = [
    {
        id: 'usr_001',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'user',
        status: 'active',
        kycStatus: 'verified',
        createdAt: '2025-09-15',
        lastLogin: '2025-11-14',
        goal: 'both',
        balance: 3820,
        totalEarnings: 1540,
    },
    {
        id: 'usr_002',
        name: 'Michael Chen',
        email: 'michael@example.com',
        role: 'user',
        status: 'active',
        kycStatus: 'pending',
        createdAt: '2025-10-02',
        lastLogin: '2025-11-13',
        goal: 'learn',
        balance: 1200,
        totalEarnings: 420,
    },
    {
        id: 'usr_003',
        name: 'Emma Rodriguez',
        email: 'emma@example.com',
        role: 'user',
        status: 'suspended',
        kycStatus: 'rejected',
        createdAt: '2025-08-20',
        lastLogin: '2025-10-30',
        goal: 'invest',
        balance: 5200,
        totalEarnings: 2100,
    },
    {
        id: 'usr_004',
        name: 'David Kim',
        email: 'david@example.com',
        role: 'user',
        status: 'active',
        kycStatus: 'verified',
        createdAt: '2025-11-01',
        lastLogin: '2025-11-14',
        goal: 'both',
        balance: 2400,
        totalEarnings: 890,
    },
];

const mockCourses: Course[] = [
    {
        id: 'crs_001',
        title: 'How to Find Winning Products',
        description: 'Master product research and validation',
        category: 'beginner',
        status: 'published',
        instructor: 'Sarah Johnson',
        modules: 12,
        enrolled: 1240,
        completionRate: 85,
        revenue: 24800,
        createdAt: '2025-08-01',
        updatedAt: '2025-11-10',
    },
    {
        id: 'crs_002',
        title: 'Facebook Ads Masterclass',
        description: 'Scale your e-commerce store with paid ads',
        category: 'intermediate',
        status: 'published',
        instructor: 'Michael Chen',
        modules: 18,
        enrolled: 890,
        completionRate: 72,
        revenue: 17800,
        createdAt: '2025-09-15',
        updatedAt: '2025-11-12',
    },
    {
        id: 'crs_003',
        title: 'Scaling to $50k/month',
        description: 'Advanced strategies for massive growth',
        category: 'pro',
        status: 'draft',
        instructor: 'Emma Rodriguez',
        modules: 24,
        enrolled: 0,
        completionRate: 0,
        revenue: 0,
        createdAt: '2025-11-01',
        updatedAt: '2025-11-14',
    },
];

const mockInvestmentPools: InvestmentPool[] = [
    {
        id: 'pool_001',
        name: 'Starter Growth Pool',
        description: 'Low-risk entry point for beginners',
        minDeposit: 100,
        roiRange: '8-12%',
        risk: 'low',
        status: 'active',
        totalInvested: 124000,
        investorCount: 240,
        performance: [800, 850, 920, 980, 1050, 1100, 1180, 1240, 1320, 1380, 1420, 1480],
    },
    {
        id: 'pool_002',
        name: 'Premium Asset Pool',
        description: 'High-growth opportunities for experienced investors',
        minDeposit: 1000,
        roiRange: '18-25%',
        risk: 'high',
        status: 'active',
        totalInvested: 890000,
        investorCount: 89,
        performance: [2000, 2100, 2250, 2400, 2550, 2680, 2820, 2950, 3100, 3240, 3380, 3520],
    },
];

const mockWithdrawals: WithdrawalRequest[] = [
    {
        id: 'wd_001',
        userId: 'usr_001',
        userName: 'Sarah Johnson',
        amount: 320,
        status: 'pending',
        requestedAt: '2025-11-14T10:30:00Z',
    },
    {
        id: 'wd_002',
        userId: 'usr_004',
        userName: 'David Kim',
        amount: 150,
        status: 'approved',
        requestedAt: '2025-11-13T14:20:00Z',
        processedAt: '2025-11-13T16:45:00Z',
    },
];

const mockNotifications: NotificationTemplate[] = [
    {
        id: 'nt_001',
        name: 'Welcome Email',
        type: 'email',
        subject: 'Welcome to EcommXpert!',
        content: 'Thank you for joining our platform...',
        active: true,
        lastUsed: '2025-11-14',
    },
    {
        id: 'nt_002',
        name: 'Course Completion',
        type: 'email',
        subject: 'Congratulations on completing your course!',
        content: 'You\'ve successfully completed...',
        active: true,
        lastUsed: '2025-11-13',
    },
    {
        id: 'nt_003',
        name: 'Weekly Earnings',
        type: 'push',
        subject: 'Your Weekly Earnings Report',
        content: 'You earned ${{amount}} this week...',
        active: true,
        lastUsed: '2025-11-12',
    },
];

const mockMetrics: PlatformMetric = {
    totalUsers: 24850,
    activeUsers: 18420,
    monthlyRevenue: 185600,
    totalCourses: 124,
    totalInvestments: 3420,
    withdrawalRequests: 12,
    systemStatus: 'operational',
};

const initialState: AdminState = {
    users: mockUsers,
    courses: mockCourses,
    investmentPools: mockInvestmentPools,
    withdrawalRequests: mockWithdrawals,
    notificationTemplates: mockNotifications,
    metrics: mockMetrics,
};

const AdminContext = createContext<{
    state: AdminState;
    dispatch: React.Dispatch<Partial<AdminState>>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AdminState>(initialState);

    const dispatch = (partial: Partial<AdminState>) => {
        setState((prev) => ({ ...prev, ...partial }));
    };

    const providerValue = { state, dispatch };

    return React.createElement(AdminContext.Provider, { value: providerValue }, children);
};

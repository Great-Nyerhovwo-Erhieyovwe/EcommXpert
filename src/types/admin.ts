export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'moderator';
    status: 'active' | 'suspended' | 'pending';
    kycStatus: 'verified' | 'pending' | 'rejected';
    createdAt: string;
    lastLogin: string;
    goal: 'learn' | 'invest' | 'both';
    balance: number;
    totalEarnings: number;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    category: 'beginner' | 'intermediate' | 'pro';
    status: 'draft' | 'published' | 'archived';
    instructor: string;
    modules: number;
    enrolled: number;
    completionRate: number;
    revenue: number;
    createdAt: string;
    updatedAt: string;
}

export interface InvestmentPool {
    id: string;
    name: string;
    description: string;
    minDeposit: number;
    roiRange: string;
    risk: 'low' | 'medium' | 'high';
    status: 'active' | 'paused' | 'closed';
    totalInvested: number;
    investorCount: number;
    performance: number[];
}

export interface WithdrawalRequest {
    id: string;
    userId: string;
    userName: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: string;
    processedAt?: string;
}

export interface NotificationTemplate {
    id: string;
    name: string;
    type: 'email' | 'push' | 'in-app';
    subject: string;
    content: string;
    active: boolean;
    lastUsed: string;
}

export interface PlatformMetric {
    totalUsers: number;
    activeUsers: number;
    monthlyRevenue: number;
    totalCourses: number;
    totalInvestments: number;
    withdrawalRequests: number;
    systemStatus: 'operational' | 'degraded' | 'down';
}

export interface AdminState {
    users: AdminUser[];
    courses: Course[];
    investmentPools: InvestmentPool[];
    withdrawalRequests: WithdrawalRequest[];
    notificationTemplates: NotificationTemplate[];
    metrics: PlatformMetric;
}
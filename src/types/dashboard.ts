export interface Course {
    id: string;
    title: string;
    progress: number;
    completed: boolean;
    category: 'beginner' | 'intermediate' | 'pro';
    icon: string;
    lastAccessed: string;
}

export interface Investment {
    id: string;
    name: string;
    amount: number;
    roi: number;
    risk: 'low' | 'medium' | 'high';
    status: 'active' | 'pending' | 'completed';
    growth: number[];
    startDate: string;
}

export interface Transaction {
    id: string;
    type: 'course' | 'investment' | 'payout' | 'deposit';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    goal: 'learn' | 'invest' | 'both';
    xp: number;
    streak: number;
    badges: string[];
}

export interface DashboardState {
    user: User;
    courses: Course[];
    investments: Investment[];
    transactions: Transaction[];
    balance: number;
    totalEarnings: number;
    totalInvested: number;
}

export type Theme = 'light' | 'dark';
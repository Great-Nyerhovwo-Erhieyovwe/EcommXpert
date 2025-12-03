import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

// Interfaces
interface AdminUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'user' | 'admin' | 'moderator';
    status: 'active' | 'suspended' | 'pending';
    kyc_status: 'verified' | 'pending' | 'rejected';
    created_at: string;
    last_login: string;
    goal: 'learn' | 'invest' | 'both';
    balance: number;
    total_earnings: number;
}

interface Course {
    id: string;
    title: string;
    description: string;
    category: 'beginner' | 'intermediate' | 'pro';
    status: 'draft' | 'published' | 'archived';
    instructor: string;
    modules: number;
    enrolled: number;
    completion_rate: number;
    revenue: number;
    created_at: string;
    updated_at: string;
}

interface InvestmentPool {
    id: string;
    name: string;
    description: string;
    min_deposit: number;
    roi_range: string;
    risk: 'low' | 'medium' | 'high';
    status: 'active' | 'paused' | 'closed';
    total_invested: number;
    investor_count: number;
    performance: number[];
}

interface WithdrawalRequest {
    id: string;
    user_id: string;
    user_name: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    requested_at: string;
    processed_at?: string;
}

interface NotificationTemplate {
    id: string;
    name: string;
    type: 'email' | 'push' | 'in-app';
    subject: string;
    content: string;
    active: boolean;
    last_used: string;
}

interface PlatformMetric {
    total_users: number;
    active_users: number;
    monthly_revenue: number;
    total_courses: number;
    total_investments: number;
    withdrawal_requests: number;
    system_status: 'operational' | 'degraded' | 'down';
}

interface AdminState {
    users: AdminUser[];
    courses: Course[];
    investmentPools: InvestmentPool[];
    withdrawalRequests: WithdrawalRequest[];
    notificationTemplates: NotificationTemplate[];
    metrics: PlatformMetric;
    loading: boolean;
    error: string | null;
}

const AdminContext = createContext<{
    state: AdminState;
    fetchAdminData: () => Promise<void>;
    updateUser: (userId: string, data: Partial<AdminUser>) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    updateCourse: (courseId: string, data: Partial<Course>) => Promise<void>;
    createCourse: (course: Omit<Course, 'id'>) => Promise<void>;
    updateInvestmentPool: (poolId: string, data: Partial<InvestmentPool>) => Promise<void>;
    resolveWithdrawal: (requestId: string, resolution: 'approved' | 'rejected') => Promise<void>;
}>({
    state: {
        users: [],
        courses: [],
        investmentPools: [],
        withdrawalRequests: [],
        notificationTemplates: [],
        metrics: {
            total_users: 0,
            active_users: 0,
            monthly_revenue: 0,
            total_courses: 0,
            total_investments: 0,
            withdrawal_requests: 0,
            system_status: 'operational',
        },
        loading: false,
        error: null,
    },
    fetchAdminData: async () => {},
    updateUser: async () => {},
    deleteUser: async () => {},
    updateCourse: async () => {},
    createCourse: async () => {},
    updateInvestmentPool: async () => {},
    resolveWithdrawal: async () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AdminState>({
        users: [],
        courses: [],
        investmentPools: [],
        withdrawalRequests: [],
        notificationTemplates: [],
        metrics: {
            total_users: 0,
            active_users: 0,
            monthly_revenue: 0,
            total_courses: 0,
            total_investments: 0,
            withdrawal_requests: 0,
            system_status: 'operational',
        },
        loading: false,
        error: null,
    });

    const token = localStorage.getItem('token'); // JWT from login
    const axiosInstance = axios.create({
        baseURL: 'https://ecommxpertbackend.onrender.com/api', // replace with your backend URL
        headers: { Authorization: `Bearer ${token}` },
    });

    const fetchAdminData = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const [
                usersResponse,
                coursesResponse,
                poolsResponse,
                withdrawalsResponse,
                notificationsResponse,
                metricsResponse
            ] = await Promise.all([
                axiosInstance.get('/admin/users'),
                axiosInstance.get('/admin/courses'),
                axiosInstance.get('/admin/investment-pools'),
                axiosInstance.get('/admin/withdrawals'),
                axiosInstance.get('/admin/notifications'),
                axiosInstance.get('/admin/metrics')
            ]);

            setState({
                users: usersResponse.data,
                courses: coursesResponse.data,
                investmentPools: poolsResponse.data,
                withdrawalRequests: withdrawalsResponse.data,
                notificationTemplates: notificationsResponse.data,
                metrics: metricsResponse.data,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: (error as any).response?.data?.error || (error as Error).message || 'Failed to load admin data'
            }));
        }
    };

    const updateUser = async (userId: string, data: Partial<AdminUser>) => {
        try {
            const { data: updatedUser } = await axiosInstance.put(`/admin/users/${userId}`, data);
            setState(prev => ({
                ...prev,
                users: prev.users.map(user => user.id === userId ? { ...user, ...updatedUser } : user)
            }));
        } catch (error) {
            console.error('Update user error:', error);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            await axiosInstance.delete(`/admin/users/${userId}`);
            setState(prev => ({
                ...prev,
                users: prev.users.filter(user => user.id !== userId)
            }));
        } catch (error) {
            console.error('Delete user error:', error);
        }
    };

    const updateCourse = async (courseId: string, data: Partial<Course>) => {
        try {
            const { data: updatedCourse } = await axiosInstance.put(`/admin/courses/${courseId}`, data);
            setState(prev => ({
                ...prev,
                courses: prev.courses.map(course => course.id === courseId ? { ...course, ...updatedCourse } : course)
            }));
        } catch (error) {
            console.error('Update course error:', error);
        }
    };

    const createCourse = async (course: Omit<Course, 'id'>) => {
        try {
            const { data: newCourse } = await axiosInstance.post('/admin/courses', course);
            setState(prev => ({
                ...prev,
                courses: [...prev.courses, newCourse],
            }));
        } catch (error) {
            console.error('Create course error:', error);
        }
    };

    const updateInvestmentPool = async (poolId: string, data: Partial<InvestmentPool>) => {
        try {
            const { data: updatedPool } = await axiosInstance.put(`/admin/investment-pools/${poolId}`, data);
            setState(prev => ({
                ...prev,
                investmentPools: prev.investmentPools.map(pool => pool.id === poolId ? { ...pool, ...updatedPool } : pool)
            }));
        } catch (error) {
            console.error('Update investment pool error:', error);
        }
    };

    const resolveWithdrawal = async (requestId: string, resolution: 'approved' | 'rejected') => {
        try {
            const { data: updatedRequest } = await axiosInstance.put(`/admin/withdrawals/${requestId}`, {
                status: resolution,
                processed_at: new Date().toISOString()
            });
            setState(prev => ({
                ...prev,
                withdrawalRequests: prev.withdrawalRequests.map(req => req.id === requestId ? { ...req, ...updatedRequest } : req)
            }));
        } catch (error) {
            console.error('Resolve withdrawal error:', error);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    return (
        <AdminContext.Provider value={{
            state,
            fetchAdminData,
            updateUser,
            deleteUser,
            updateCourse,
            createCourse,
            updateInvestmentPool,
            resolveWithdrawal
        }}>
            {children}
        </AdminContext.Provider>
    );
};
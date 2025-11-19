import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

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
    fetchAdminData: async () => { },
    updateUser: async () => { },
    deleteUser: async () => { },
    updateCourse: async () => { },
    createCourse: async () => { },
    updateInvestmentPool: async () => { },
    resolveWithdrawal: async () => { },
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

    const fetchAdminData = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // Check if user has admin role
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) throw new Error('Not authenticated');

            const { data: userProfile } = await supabase
                .from('user_profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (userProfile?.role !== 'admin') throw new Error('Not authorized');

            // Fetch all admin data
            const [
                usersResponse,
                coursesResponse,
                poolsResponse,
                withdrawalsResponse,
                notificationsResponse,
                metricsResponse
            ] = await Promise.all([
                supabase.from('user_profiles').select('*'),
                supabase.from('courses').select('*'),
                supabase.from('investment_pools').select('*'),
                supabase.from('withdrawal_requests').select('*'),
                supabase.from('notification_templates').select('*'),
                supabase.from('platform_metrics').select('*').single(),
            ]);

            if (usersResponse.error) throw usersResponse.error;
            if (coursesResponse.error) throw coursesResponse.error;
            if (poolsResponse.error) throw poolsResponse.error;
            if (withdrawalsResponse.error) throw withdrawalsResponse.error;
            if (notificationsResponse.error) throw notificationsResponse.error;
            if (metricsResponse.error) throw metricsResponse.error;

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
                error: (error as Error).message || 'Failed to load admin data'
            }));
        }
    };

    const updateUser = async (userId: string, data: Partial<AdminUser>) => {
        try {
            const { data: _updatedUser, error } = await supabase
                .from('user_profiles')
                .update(data)
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                users: prev.users.map(user =>
                    user.id === userId ? { ...user, ...data } : user
                ),
            }));
        } catch (error) {
            console.error('Update user error:', error);
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            const { error } = await supabase
                .from('user_profiles')
                .delete()
                .eq('id', userId);

            if (error) throw error;

            setState(prev => ({
                ...prev,
                users: prev.users.filter(user => user.id !== userId),
            }));
        } catch (error) {
            console.error('Delete user error:', error);
        }
    };

    const updateCourse = async (courseId: string, data: Partial<Course>) => {
        try {
            const { data: _updatedCourse, error } = await supabase
                .from('courses')
                .update(data)
                .eq('id', courseId)
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                courses: prev.courses.map(course =>
                    course.id === courseId ? { ...course, ...data } : course
                ),
            }));
        } catch (error) {
            console.error('Update course error:', error);
        }
    };

    const createCourse = async (course: Omit<Course, 'id'>) => {
        try {
            const { data: newCourse, error } = await supabase
                .from('courses')
                .insert([course])
                .select()
                .single();

            if (error) throw error;

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
            const { data: _updatedPool, error } = await supabase
                .from('investment_pools')
                .update(data)
                .eq('id', poolId)
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                investmentPools: prev.investmentPools.map(pool =>
                    pool.id === poolId ? { ...pool, ...data } : pool
                ),
            }));
        } catch (error) {
            console.error('Update investment pool error:', error);
        }
    };

    const resolveWithdrawal = async (requestId: string, resolution: 'approved' | 'rejected') => {
        try {
            const { data: updatedRequest, error } = await supabase
                .from('withdrawal_requests')
                .update({
                    status: resolution,
                    processed_at: new Date().toISOString(),
                })
                .eq('id', requestId)
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                withdrawalRequests: prev.withdrawalRequests.map(request =>
                    request.id === requestId ? { ...request, ...updatedRequest } : request
                ),
            }));
        } catch (error) {
            console.error('Resolve withdrawal error:', error);
        }
    };

    // Fetch data on mount
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
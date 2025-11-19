import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

// Interfaces (same as before)
interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    goal: 'learn' | 'invest' | 'both';
    xp: number;
    streak: number;
    badges: string[];
    balance: number;
    total_earnings: number;
    total_invested: number;
}

interface Course {
    id: string;
    user_id: string;
    title: string;
    progress: number;
    completed: boolean;
    category: 'beginner' | 'intermediate' | 'pro';
    icon: string;
    last_accessed: string;
}

interface Investment {
    id: string;
    user_id: string;
    name: string;
    amount: number;
    roi: number;
    risk: 'low' | 'medium' | 'high';
    status: 'active' | 'pending' | 'completed';
    growth: number[];
    start_date: string;
}

interface Transaction {
    id: string;
    user_id: string;
    type: 'course' | 'investment' | 'payout' | 'deposit';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

interface DashboardState {
    user: User | null;
    courses: Course[];
    investments: Investment[];
    transactions: Transaction[];
    balance: number;
    totalEarnings: number;
    totalInvested: number;
    loading: boolean;
    error: string | null;
}

const DashboardContext = createContext<{
    state: DashboardState;
    fetchDashboardData: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
    updateCourse: (courseId: string, data: Partial<Course>) => Promise<void>;
    addInvestment: (investment: Omit<Investment, 'id' | 'user_id'>) => Promise<void>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'user_id'>) => Promise<void>;
}>({
    state: {
        user: null,
        courses: [],
        investments: [],
        transactions: [],
        balance: 0,
        totalEarnings: 0,
        totalInvested: 0,
        loading: false,
        error: null,
    },
    fetchDashboardData: async () => { },
    updateUser: async () => { },
    updateCourse: async () => { },
    addInvestment: async () => { },
    addTransaction: async () => { },
});

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DashboardState>({
        user: null,
        courses: [],
        investments: [],
        transactions: [],
        balance: 0,
        totalEarnings: 0,
        totalInvested: 0,
        loading: false,
        error: null,
    });

    const fetchDashboardData = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;

            if (!user) {
                setState(prev => ({ ...prev, loading: false, error: 'No user session' }));
                return;
            }

            // Fetch user profile
            const { data: userData, error: userError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (userError) throw userError;

            // Fetch courses
            const { data: coursesData, error: coursesError } = await supabase
                .from('user_courses')
                .select('*')
                .eq('user_id', user.id);

            if (coursesError) throw coursesError;

            // Fetch investments
            const { data: investmentsData, error: investmentsError } = await supabase
                .from('user_investments')
                .select('*')
                .eq('user_id', user.id);

            if (investmentsError) throw investmentsError;

            // Fetch transactions
            const { data: transactionsData, error: transactionsError } = await supabase
                .from('user_transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('date', { ascending: false });

            if (transactionsError) throw transactionsError;

            setState({
                user: {
                    id: userData.id,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    avatar: userData.avatar,
                    goal: userData.goal,
                    xp: userData.xp,
                    streak: userData.streak,
                    badges: userData.badges || [],
                    balance: userData.balance,
                    total_earnings: userData.total_earnings,
                    total_invested: userData.total_invested,
                },
                courses: coursesData,
                investments: investmentsData,
                transactions: transactionsData,
                balance: userData.balance,
                totalEarnings: userData.total_earnings,
                totalInvested: userData.total_invested,
                loading: false,
                error: null,
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: (error as Error).message || 'Failed to load dashboard data'
            }));
        }
    };

    const updateUser = async (data: Partial<User>) => {
        try {
            const { data: updatedUser, error } = await supabase
                .from('user_profiles')
                .update(data)
                .eq('id', state.user?.id)
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                user: { ...prev.user, ...data } as User,
                balance: updatedUser?.balance || prev.balance,
                totalEarnings: updatedUser?.total_earnings || prev.totalEarnings,
                totalInvested: updatedUser?.total_invested || prev.totalInvested,
            }));
        } catch (error) {
            console.error('Update user error:', error);
        }
    };

    const updateCourse = async (courseId: string, data: Partial<Course>) => {
        try {
            const { data: _updatedCourse, error } = await supabase
                .from('user_courses')
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

    const addInvestment = async (investment: Omit<Investment, 'id' | 'user_id'>) => {
        try {
            const { data: newInvestment, error } = await supabase
                .from('user_investments')
                .insert([{
                    ...investment,
                    user_id: state.user?.id,
                }])
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                investments: [...prev.investments, newInvestment],
            }));
        } catch (error) {
            console.error('Add investment error:', error);
        }
    };

    const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id'>) => {
        try {
            const { data: newTransaction, error } = await supabase
                .from('user_transactions')
                .insert([{
                    ...transaction,
                    user_id: state.user?.id,
                }])
                .select()
                .single();

            if (error) throw error;

            setState(prev => ({
                ...prev,
                transactions: [newTransaction, ...prev.transactions],
            }));
        } catch (error) {
            console.error('Add transaction error:', error);
        }
    };

    // Fetch data on mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <DashboardContext.Provider value={{
            state,
            fetchDashboardData,
            updateUser,
            updateCourse,
            addInvestment,
            addTransaction
        }}>
            {children}
        </DashboardContext.Provider>
    );
};
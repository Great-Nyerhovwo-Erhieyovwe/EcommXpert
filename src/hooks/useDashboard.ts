import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { DashboardState, User, Course, Investment, Transaction } from '../types/dashboard';
import React from 'react';
import axios from 'axios';

const DashboardContext = createContext<{
    state: DashboardState;
    dispatch: React.Dispatch<Partial<DashboardState>>;
    fetchDashboardData: () => Promise<void>;
}>({
    state: {
        user: null,
        courses: [],
        investments: [],
        transactions: [],
        balance: 0,
        totalEarnings: 0,
        totalInvested: 0,
    },
    dispatch: () => null,
    fetchDashboardData: async () => {},
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
    });

    const token = localStorage.getItem('token'); // JWT from login
    const axiosInstance = axios.create({
        baseURL: 'https://ecommxpertbackend.onrender.com/api', // replace with your backend URL
        headers: { Authorization: `Bearer ${token}` },
    });

    const dispatch = (partial: Partial<DashboardState>) => {
        setState(prev => ({ ...prev, ...partial }));
    };

    const fetchDashboardData = async () => {
        try {
            // Fetch user
            const { data: user } = await axiosInstance.get<User>('/dashboard/user');

            // Fetch courses
            const { data: courses } = await axiosInstance.get<Course[]>('/dashboard/courses');

            // Fetch investments
            const { data: investments } = await axiosInstance.get<Investment[]>('/dashboard/investments');

            // Fetch transactions
            const { data: transactions } = await axiosInstance.get<Transaction[]>('/dashboard/transactions');

            // Calculate totals
            const balance = user.balance || 0;
            const totalEarnings = user.total_earnings || 0;
            const totalInvested = user.total_invested || 0;

            dispatch({ user, courses, investments, transactions, balance, totalEarnings, totalInvested });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    const providerValue = { state, dispatch, fetchDashboardData };
    

    return React.createElement(DashboardContext.Provider, { value: providerValue }, children);
};

export default useDashboard;
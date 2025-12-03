import { useState, useEffect } from 'react';
import axios from 'axios';

export interface OnboardingState {
    step: number;
    email: string;
    verified: boolean;
    kycCompleted: boolean;
    goal: 'learn' | 'invest' | 'both' | null;
    firstName: string;
    lastName: string;
    idDocument: File | null;
    loading: boolean;
    error: string | null;
    userId?: string;
}

export interface OnboardingActions {
    nextStep: () => void;
    prevStep: () => void;
    setEmail: (email: string) => void;
    setVerified: (verified: boolean) => void;
    setKycCompleted: (completed: boolean) => void;
    setGoal: (goal: 'learn' | 'invest' | 'both') => void;
    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
    setIdDocument: (file: File | null) => void;
    completeOnboarding: () => Promise<void>;
}

export const useOnboarding = (): { state: OnboardingState; actions: OnboardingActions } => {
    const token = localStorage.getItem('token'); // JWT from login
    const axiosInstance = axios.create({
        baseURL: 'https://ecommxpertbackend.onrender.com/api',
        headers: { Authorization: `Bearer ${token}` },
    });

    const [state, setState] = useState<OnboardingState>({
        step: 0,
        email: '',
        verified: false,
        kycCompleted: false,
        goal: null,
        firstName: '',
        lastName: '',
        idDocument: null,
        loading: true,
        error: null,
        userId: undefined,
    });

    // Fetch user and onboarding status on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));

                const { data: userData } = await axiosInstance.get('/users/me');

                if (!userData) {
                    setState(prev => ({ ...prev, step: -1, loading: false }));
                    return;
                }

                const { id, email, firstName, lastName, onboardingCompleted, goal } = userData;

                setState(prev => ({
                    ...prev,
                    userId: id,
                    email,
                    firstName,
                    lastName,
                    goal: goal || null,
                    step: onboardingCompleted ? 6 : 0,
                    verified: true,
                    loading: false,
                }));
            } catch (err: any) {
                console.error('Error fetching user:', err);
                setState(prev => ({ ...prev, error: err.message, loading: false, step: -1 }));
            }
        };

        fetchUser();
    }, [axiosInstance]);

    const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
    const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
    const setGoal = (goal: 'learn' | 'invest' | 'both') => setState(prev => ({ ...prev, goal }));
    const setFirstName = (firstName: string) => setState(prev => ({ ...prev, firstName }));
    const setLastName = (lastName: string) => setState(prev => ({ ...prev, lastName }));
    const setIdDocument = (file: File | null) => setState(prev => ({ ...prev, idDocument: file }));
    const setEmail = (email: string) => setState(prev => ({ ...prev, email }));
    const setVerified = (verified: boolean) => setState(prev => ({ ...prev, verified }));
    const setKycCompleted = (completed: boolean) => setState(prev => ({ ...prev, kycCompleted: completed }));

    const completeOnboarding = async () => {
        if (!state.userId) return;

        try {
            await axiosInstance.post(`/users/${state.userId}/complete-onboarding`, {
                firstName: state.firstName,
                lastName: state.lastName,
                goal: state.goal,
                kycCompleted: state.kycCompleted,
            });

            setState(prev => ({ ...prev, step: 6 }));
        } catch (err: any) {
            console.error('Error completing onboarding:', err);
            setState(prev => ({ ...prev, error: err.message }));
        }
    };

    const actions: OnboardingActions = {
        nextStep,
        prevStep,
        setEmail,
        setVerified,
        setKycCompleted,
        setGoal,
        setFirstName,
        setLastName,
        setIdDocument,
        completeOnboarding,
    };

    return { state, actions };
};

export default useOnboarding
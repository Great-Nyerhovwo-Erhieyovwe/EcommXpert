import { useEffect, useState } from 'react';
import axios from 'axios';

interface OnboardingState {
    step: number;
    email: string;
    verified: boolean;
    kycCompleted: boolean;
    goal: 'learn' | 'invest' | 'both' | null;
    firstName: string;
    lastName: string;
    idDocument: File | null;
}

interface OnboardingActions {
    nextStep: () => void;
    prevStep: () => void;
    completeOnboarding: () => void;
    setEmail: (email: string) => void;
    setVerified: (verified: boolean) => void;
    setKycCompleted: (completed: boolean) => void;
    setGoal: (goal: 'learn' | 'invest' | 'both') => void;
    setFirstName: (name: string) => void;
    setLastName: (name: string) => void;
    setIdDocument: (file: File | null) => void;
}

export const useOnboarding = (): { state: OnboardingState; actions: OnboardingActions } => {
    const [state, setState] = useState<OnboardingState>({
        step: 0,
        email: '',
        verified: false,
        kycCompleted: false,
        goal: null,
        firstName: '',
        lastName: '',
        idDocument: null,
    });

    const token = localStorage.getItem('token'); // JWT from login
    const axiosInstance = axios.create({
        baseURL: 'https://ecommxpertbackend.onrender.com/api', // replace with your backend
        headers: { Authorization: `Bearer ${token}` },
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: user } = await axiosInstance.get('/onboarding/user');

                if (!user) {
                    setState(prev => ({ ...prev, step: -1 })); // redirect to signup/login
                    return;
                }

                if (user.onboarding_completed) {
                    setState(prev => ({ ...prev, step: 6 })); // onboarding complete
                } else {
                    setState(prev => ({
                        ...prev,
                        step: 0,
                        email: user.email ?? '',
                        verified: true, // logged in
                        goal: user.goal ?? null,
                        firstName: user.first_name ?? '',
                        lastName: user.last_name ?? '',
                    }));
                }
            } catch (err) {
                console.error('Error fetching onboarding user:', err);
                setState(prev => ({ ...prev, step: -1 }));
            }
        };

        checkSession();
    }, []);

    const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
    const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 0) }));

    const completeOnboarding = async () => {
        try {
            await axiosInstance.post('/onboarding/complete', {
                goal: state.goal,
                first_name: state.firstName,
                last_name: state.lastName,
            });

            setState(prev => ({ ...prev, step: 6 }));
        } catch (err) {
            console.error('Error completing onboarding:', err);
        }
    };

    const setGoal = (goal: 'learn' | 'invest' | 'both') => setState(prev => ({ ...prev, goal }));
    const setFirstName = (firstName: string) => setState(prev => ({ ...prev, firstName }));
    const setLastName = (lastName: string) => setState(prev => ({ ...prev, lastName }));
    const setIdDocument = (file: File | null) => setState(prev => ({ ...prev, idDocument: file }));
    const setEmail = (email: string) => setState(prev => ({ ...prev, email }));
    const setVerified = (verified: boolean) => setState(prev => ({ ...prev, verified }));
    const setKycCompleted = (completed: boolean) => setState(prev => ({ ...prev, kycCompleted: completed }));

    const actions: OnboardingActions = {
        nextStep,
        prevStep,
        completeOnboarding,
        setEmail,
        setVerified,
        setKycCompleted,
        setGoal,
        setFirstName,
        setLastName,
        setIdDocument,
    };

    return { state, actions };
};

export default useOnboarding
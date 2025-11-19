import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface OnboardingState {
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
}

interface OnboardingActions {
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

interface OnboardingContextType {
    state: OnboardingState;
    actions: OnboardingActions;
}

const initialState: OnboardingState = {
    step: 0,
    email: '',
    verified: false,
    kycCompleted: false,
    goal: null,
    firstName: '',
    lastName: '',
    idDocument: null,
    loading: false,
    error: null,
};

// Create context with proper typing
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// const useOnboarding = () => useContext(OnboardingContext);

// Provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<OnboardingState>(initialState);

    // Check session on mount
    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getUser();
            const user = data?.user;

            if (error) {
                console.error('Supabase auth error:', error)
            };

            if (user) {
                // Get user profile to check onboarding status
                const { data: userProfile, error: profileError } = await supabase
                    .from('user_profiles')
                    .select('onboarding_completed, goal, first_name, last_name')
                    .eq('id', user.id)
                    .single();

                if (profileError) {
                    console.error('Error fetching user profile:', profileError);
                }

                if (userProfile?.onboarding_completed) {
                    // User has completed onboarding , redirect to dashboard
                    // this should handle the parent component
                    setState(prev => ({ ...prev, step: 6 })); // special step for completion
                } else {
                    // continue onboarding
                    setState(prev => ({
                        ...prev,
                        step: 0, // start from first onboarding step (email verification)
                        email: user.email ?? '',
                        verified: true, // assuming email is verified since theyre logged in
                        goal: userProfile?.goal ?? null,
                        firstName: userProfile?.first_name ?? '',
                        lastName: userProfile?.last_name ?? '',
                    }));
                }
            } else {
                // user is not logged in , redirect to signup handled by parent component
                setState(prev => ({ ...prev, step: -1 })); // invalid step to trigger redirect
            }
        };
        checkSession();
    }, []);

    const nextStep = () => {
        setState(prev => ({ ...prev, step: prev.step + 1 }));
    };

    const prevStep = () => {
        setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
    };

    const completeOnboarding = async () => {
        try {
            // 1. ** fetch user:** Get the currently logged-in user
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.error('No user logged in to complete onboarding.');
                return; // exit if no user is found
            }
            // 2. update user profile with onboarding completion
            const { error } = await supabase
                .from('user_profiles')
                .update({
                    onboarding_completed: true,
                    goal: state.goal,
                    first_name: state.firstName,
                    last_name: state.lastName
                })
                .eq('id', user.id);

            if (error) throw error;

            // mark as completed
            setState(prev => ({ ...prev, step: 6 }))
        } catch (err) {
            console.error('Error completing onboarding:', err);
        }
    };

    const setGoal = (goal: 'learn' | 'invest' | 'both') => {
        setState(prev => ({ ...prev, goal }));
    };

    const setFirstName = (firstName: string) => {
        setState(prev => ({ ...prev, firstName }));
    };
    const setLastName = (lastName: string) => {
        setState(prev => ({ ...prev, lastName }));
    };
    const setIdDocument = (file: File | null) => {
        setState(prev => ({ ...prev, idDocument: file }));
    };
    const setEmail = (email: string) => {
        setState(prev => ({ ...prev, email }));
    };
    const setVerified = (verified: boolean) => {
        setState(prev => ({ ...prev, verified }));
    };
    const setKycCompleted = (completed: boolean) => {
        setState(prev => ({ ...prev, kycCompleted: completed }));
    };


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

    return (
        <OnboardingContext.Provider value={{ state, actions }}>
            {children}
        </OnboardingContext.Provider>
    );
};

// custom hooks
export const useOnboarding = (): OnboardingContextType => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding within an OnboardingProvider');
    }
    return context;
}
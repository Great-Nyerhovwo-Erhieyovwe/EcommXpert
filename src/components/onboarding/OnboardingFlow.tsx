import React, { useMemo } from 'react';
import EmailVerificationStep from './EmailVerificationStep';
import KYCStep from './KYCStep';
import GoalSelectionStep from './GoalSelectionStep';
import DashboardTourStep from './DashboardTourStep';
import FirstTaskStep from './FirstTaskStep';
import useOnboarding from '../../hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

// ----------------------------------------------------
// FIX 1: Remove unused/incorrect interface, as component is self-contained.
// interface OnboardingFlowProps {
//     state: number;
//     prevStep: () => void;
// }
// ----------------------------------------------------

const OnboardingFlow: React.FC = () => {
    // FIX 2: useOnboarding should provide step management logic (prevStep, nextStep)
    const { state, actions } = useOnboarding();
    const { completeOnboarding, nextStep, prevStep: prevStepAction } = actions;
    const navigate = useNavigate();

    // Check for unauthenticated state (step -1 typically means signed out or error)
    if (state.step === -1) {
        navigate('/signup');
        return null;
    }

    // FIX 3: Remove this conditional return. It prevents rendering the GoalSelectionStep (case 2).
    // if (!state.goal) {
    //     return null;
    // }

    // ----------------------------------------------------
    // FIX 4: Handle completion logic safely outside the return flow.
    // ----------------------------------------------------
    if (state.step === 5) { // Assuming step 5 is the final step before completion
        // Use useEffect or call completeOnboarding immediately, 
        // then redirect once state reflects completion.

        // This is simplified to prevent rendering issues while redirecting:

        // Use a standard state variable to check if redirection is in progress
        const [isRedirecting, setIsRedirecting] = React.useState(false);

        React.useEffect(() => {
            if (state.step === 5 && !isRedirecting) {
                setIsRedirecting(true); // Prevent re-triggering redirect
                completeOnboarding(); // Mark onboarding complete in global state/DB

                const redirectUser = async () => {
                    const { data, error } = await supabase
                        .from('user_profiles')
                        .select('role')
                        .eq('id', state.userId || '') // FIX: Use userId from state, not email. Add fallback.
                        .single();

                    if (error) {
                        console.error('Error fetching user role:', error);
                        navigate('/dashboard'); // Default fallback
                        return;
                    }

                    // Assuming 'role' is a simple string column:
                    const userRole = data?.role;

                    if (userRole === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                };

                // Add a small delay for perceived completion
                setTimeout(redirectUser, 1000);
            }
        }, [state.step, navigate, state.userId, completeOnboarding, isRedirecting]);

        return <div>Completing onboarding...</div>
    }

    // ----------------------------------------------------
    // FIX 5: Move renderStep into a useMemo hook for stability and efficiency.
    // ----------------------------------------------------
    const renderStep = useMemo(() => {
        // FIX 6: Define nextStep() once globally or use actions.nextStep directly.
        // We will use actions.nextStep and actions.completeOnboarding directly.

        switch (state.step) {
            case 0: // Email Verification (Assumes state.email is passed from useOnboarding)
                return (
                    <EmailVerificationStep
                        email={state.email}
                        nextStep={nextStep} // Use hook action
                        skipStep={nextStep} // Use hook action
                    />
                );
            case 1: // KYC
                return (
                    <KYCStep
                        nextStep={nextStep}
                        skipStep={nextStep}
                        idDocument={state.idDocument} // Assumes this is in the state object
                    />
                );
            case 2: // Goal Selection
                return (
                    <GoalSelectionStep
                        goal={state.goal as 'learn' | 'invest' | 'both'}
                        setGoal={actions.setGoal}
                        nextStep={nextStep} // Use hook action
                    />
                );
            case 3: // Dashboard Tour
                return (
                    <DashboardTourStep
                        nextStep={nextStep} // Use hook action
                    />
                );
            case 4: // First Task
                return (
                    <FirstTaskStep
                        goal={state.goal as 'learn' | 'invest' | 'both'}
                        completeOnboarding={completeOnboarding} // Use hook action
                    />
                );
            default:
                // Handle cases where step is out of range, but not the final step (5)
                return <div>Error: Invalid step index {state.step}.</div>;
        }
    }, [state.step, state.email, state.idDocument, state.goal, actions.setGoal, nextStep, completeOnboarding]);

    // ----------------------------------------------------
    // FIX 7: Remove the problematic prevStep function entirely and use the hook action directly.
    // function prevStep(_event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    //     throw new Error('Function not implemented.');
    // }
    // ----------------------------------------------------

    const currentStepNum = state.step >= 0 ? state.step + 1 : 1;

    return (
        <div className="onboarding-container">
            <div className="onboarding-header">
                <h1>EcommXpert</h1>
                <p>Your All-In-One E-Commerce Growth Engine</p>
            </div>

            <div className="onboarding-content">
                {renderStep}
            </div>

            <div className="onboarding-footer">
                <div className="progress-indicator">
                    <div className="progress-bar" style={{ width: `${(currentStepNum / 5) * 100}%` }}></div>
                </div>
                <p>
                    Step {currentStepNum} of 5
                </p>
            </div>

            {/* FIX 8: Use the action provided by the hook */}
            {state.step > 0 && state.step < 5 && (
                <button className="back-button" onClick={prevStepAction}>Back</button>
            )}
        </div>
    );
};

export default OnboardingFlow;
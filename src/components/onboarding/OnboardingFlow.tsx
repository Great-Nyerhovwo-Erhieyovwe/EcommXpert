import React from 'react';
import EmailVerificationStep from './EmailVerificationStep';
import KYCStep from './KYCStep';
import GoalSelectionStep from './GoalSelectionStep';
import DashboardTourStep from './DashboardTourStep';
import FirstTaskStep from './FirstTaskStep';
import useOnboarding  from '../../hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface OnboardingFlowProps {
    state: number;
    prevStep: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = () => {
    const { state, actions } = useOnboarding();
    const { completeOnboarding } = actions;
    const navigate = useNavigate();

    if (state.step === -1) {
        navigate('/signup');
        return null;
    }

    if (!state.goal) {
        return null;
    }

    // if onboarding is completed, redirect to dashboard
    if (state.step === 6) {
        setTimeout(async () => {
            const { data, error } = await supabase
                .from('user_profiles')
                .select('role')
                .eq('id', state.email)
                .single();


            if (error) {
                console.error('Error fetching user role:', error);

                navigate('/dashboard');
                // Default fall back
                return;
            }

            // Assuming your 'role' column is a json object with a 'role' key:
            const userRole = data?.role?.role;

            // or, if 'role' is a simple string column:
            // const userRole = data?.role;

            if (userRole === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard');
            }
        }, 1000);

        if (state.step === 6) {
            return <div>Completing onboarding...</div>
        }
    }

    const renderStep = () => {
        switch (state.step) {
            case 0: // Email Verification
                function nextStep(): void {
                    throw new Error('Function not implemented.');
                }

                return (
                    <EmailVerificationStep
                        email={state.email}
                        nextStep={nextStep}
                        skipStep={nextStep}
                    />
                );
            case 1: // KYC
                return (
                    <KYCStep
                        nextStep={nextStep}
                        skipStep={nextStep}
                        idDocument={state.idDocument}
                    />
                );
            case 2: // Goal Selection
                return (
                    <GoalSelectionStep
                        goal={state.goal}
                        setGoal={actions.setGoal}
                        nextStep={actions.nextStep}
                    />
                );
            case 3: // Dashboard Tour
                return (
                    <DashboardTourStep
                        nextStep={nextStep}
                    />
                );
            case 4: // First Task
                return (
                    <FirstTaskStep
                        goal={state.goal}
                        nextStep={completeOnboarding}
                    />
                );
            default:
                return <div>Error: Invalid step</div>;
        }
    };

    function prevStep(_event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error('Function not implemented.');
    }

    // function prevStep(_event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <div className="onboarding-container">
            <div className="onboarding-header">
                <h1>EcommXpert</h1>
                <p>Your All-In-One E-Commerce Growth Engine</p>
            </div>

            <div className="onboarding-content">
                {renderStep()}
            </div>

            <div className="onboarding-footer">
                <div className="progress-indicator">
                    <div className="progress-bar" style={{ width: `${((state.step + 1) / 5) * 100}%` }}></div>
                </div>
                <p>
                    Step {state.step + 1} of 5
                </p>
            </div>

            {state.step > 0 && state.step < 4 && (
                <button className="back-button" onClick={prevStep}>Back</button>
            )}
        </div>
    );
};

export default OnboardingFlow;
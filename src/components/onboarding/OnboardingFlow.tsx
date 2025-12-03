import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import EmailVerificationStep from './EmailVerificationStep';
import KYCStep from './KYCStep';
import GoalSelectionStep from './GoalSelectionStep';
import DashboardTourStep from './DashboardTourStep';
import FirstTaskStep from './FirstTaskStep';
import { useOnboarding } from '../../hooks/useOnboarding';

const OnboardingFlow: React.FC = () => {
    const { state, actions } = useOnboarding();
    const { completeOnboarding, nextStep, prevStep: prevStepAction } = actions;
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
        baseURL: 'https://ecommxpertbackend.onrender.com/api',
        headers: { Authorization: `Bearer ${token}` },
    });

    // Handle final step redirection
    useEffect(() => {
        if (state.step === 5 && !isRedirecting) {
            setIsRedirecting(true);

            const finalizeOnboarding = async () => {
                try {
                    await completeOnboarding();

                    const { data: userRoleData } = await axiosInstance.get('/users/me/role');

                    if (userRoleData?.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                } catch (err) {
                    console.error('Error finalizing onboarding:', err);
                    navigate('/dashboard'); // fallback
                }
            };

            finalizeOnboarding();
        }
    }, [state.step, isRedirecting, completeOnboarding, navigate, axiosInstance]);

    if (state.step === -1) {
        navigate('/signup');
        return null;
    }

    const renderStep = useMemo(() => {
        switch (state.step) {
            case 0:
                return <EmailVerificationStep email={state.email} nextStep={nextStep} skipStep={nextStep} />;
            case 1:
                return <KYCStep nextStep={nextStep} skipStep={nextStep} idDocument={state.idDocument} />;
            case 2:
                return <GoalSelectionStep goal={state.goal!} setGoal={actions.setGoal} nextStep={nextStep} />;
            case 3:
                return <DashboardTourStep nextStep={nextStep} />;
            case 4:
                return <FirstTaskStep goal={state.goal!} completeOnboarding={completeOnboarding} />;
            default:
                return <div>Error: Invalid step index {state.step}.</div>;
        }
    }, [state.step, state.email, state.idDocument, state.goal, actions.setGoal, nextStep, completeOnboarding]);

    const currentStepNum = state.step >= 0 ? state.step + 1 : 1;

    return (
        <div className="onboarding-container">
            <div className="onboarding-header">
                <h1>EcommXpert</h1>
                <p>Your All-In-One E-Commerce Growth Engine</p>
            </div>

            <div className="onboarding-content">{renderStep}</div>

            <div className="onboarding-footer">
                <div className="progress-indicator">
                    <div className="progress-bar" style={{ width: `${(currentStepNum / 5) * 100}%` }}></div>
                </div>
                <p>Step {currentStepNum} of 5</p>
            </div>

            {state.step > 0 && state.step < 5 && (
                <button className="back-button" onClick={prevStepAction}>
                    Back
                </button>
            )}
        </div>
    );
};

export default OnboardingFlow;
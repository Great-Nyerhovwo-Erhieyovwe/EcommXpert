import React from 'react';
import useOnboarding from '../../hooks/useOnboarding';

export interface FirstTaskStepProps {
    goal?: 'learn' | 'invest' | 'both' | 'null';
    // nextStep: () => void;
    completeOnboarding: () => void;
}

const FirstTaskStep: React.FC<FirstTaskStepProps> = () => {
    const { actions } = useOnboarding();

    const getFirstTask = () => {
        const goal = useOnboarding().state.goal;
        if (goal === 'learn') return 'Complete your first course: “How to Find Winning Products”';
        if (goal === 'invest') return 'Deposit $100 to join the Starter Growth Pool';
        return 'Complete your first course AND deposit $100 to start earning';
    };

    const handleComplete = () => {
        // Simulate completion
        actions.nextStep();
        // Redirect to dashboard
        window.location.href = '/dashboard';
    };

    return (
        <div className="onboarding-step">
            <h2>Great Job! 🎉</h2>
            <p>Your personalized journey begins now.</p>

            <div className="task-card">
                <i className="fas fa-check-circle task-icon"></i>
                <h3>First Task</h3>
                <p>{getFirstTask()}</p>
                <button className="primary-cta" onClick={handleComplete}>
                    Complete Task
                </button>
            </div>

            <div className="badge-award">
                <i className="fas fa-medal"></i> You earned: <strong>Onboarding Badge</strong>
            </div>

            <p className="microcopy">
                Your dashboard is now ready. You can always return here later via Settings.
            </p>
        </div>
    );
};

export default FirstTaskStep;
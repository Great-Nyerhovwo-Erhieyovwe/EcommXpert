import React from 'react';
import useOnboarding from '../../hooks/useOnboarding';


export interface GoalSelectionStepProps {
    goal: 'learn' | 'invest' | 'both' | 'null';
    setGoal: (goal: 'learn' | 'invest' | 'both') => void;
    nextStep: () => void;
}

const GoalSelectionStep: React.FC<GoalSelectionStepProps> = () => {
    const { actions, state } = useOnboarding();

    const handleGoalSelect = (goal: 'learn' | 'invest' | 'both') => {
        actions.setGoal(goal);
        actions.nextStep();
    };

    const goals = [
        {
            id: 'learn',
            title: 'Learn E-Commerce',
            description: 'Master dropshipping, product research, and marketing',
            icon: 'book',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 'invest',
            title: 'Invest & Earn',
            description: 'Grow wealth through vetted e-commerce asset pools',
            icon: 'coins',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 'both',
            title: 'Learn & Invest',
            description: 'Build skills while earning passive income',
            icon: 'lightbulb',
            color: 'from-indigo-500 to-purple-500',
        },
    ];

    return (
        <div className="onboarding-step">
            <h2>What’s Your Goal?</h2>
            <p>Choose how you want to grow with EcommXpert</p>

            <div className="goal-cards">
                {goals.map((goal) => (
                    <button
                        key={goal.id}
                        className={`goal-card ${state.goal === goal.id ? 'selected' : ''}`}
                        onClick={() => handleGoalSelect(goal.id as any)}
                    >
                        <div className={`bg-gradient-to-r ${goal.color} p-4 rounded-2xl text-white`}>
                            <i className={`fas fa-${goal.icon} fa-3x mb-3`}></i>
                            <h3>{goal.title}</h3>
                            <p>{goal.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="progress-indicator">
                <div className="progress-bar" style={{ width: '60%' }}></div>
            </div>
        </div>
    );
};

export default GoalSelectionStep;
import React, { useState } from 'react';
import useOnboarding from '../../hooks/useOnboarding';


interface DashboardTourStepProps {
    nextStep: () => void;
}

const DashboardTourStep: React.FC<DashboardTourStepProps> = () => {
    const { actions } = useOnboarding();
    const [currentStep, setCurrentStep] = useState(0);

    const tourSteps = [
        {
            title: "Your Dashboard",
            description: "Your personal command center for learning and earning.",
            highlight: "overview",
        },
        {
            title: "Learning Path",
            description: "AI-curated courses based on your goals.",
            highlight: "learning",
        },
        {
            title: "Investment Portfolio",
            description: "Track and grow your passive income.",
            highlight: "investments",
        },
        {
            title: "Analytics",
            description: "Real-time insights into your performance.",
            highlight: "analytics",
        },
    ];

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            actions.nextStep();
        }
    };

    return (
        <div className="onboarding-step">
            <h2>Welcome to Your Dashboard</h2>
            <p>Let’s take a quick tour of your new EcommXpert home.</p>

            <div className="dashboard-preview">
                <div className="dashboard-grid">
                    <div className={`dashboard-item ${currentStep === 0 ? 'highlight' : ''}`}>
                        <i className="fas fa-home"></i>
                        <span>Overview</span>
                    </div>
                    <div className={`dashboard-item ${currentStep === 1 ? 'highlight' : ''}`}>
                        <i className="fas fa-graduation-cap"></i>
                        <span>Learning</span>
                    </div>
                    <div className={`dashboard-item ${currentStep === 2 ? 'highlight' : ''}`}>
                        <i className="fas fa-chart-line"></i>
                        <span>Investments</span>
                    </div>
                    <div className={`dashboard-item ${currentStep === 3 ? 'highlight' : ''}`}>
                        <i className="fas fa-chart-bar"></i>
                        <span>Analytics</span>
                    </div>
                </div>
            </div>

            <div className="tour-content">
                <h3>{tourSteps[currentStep].title}</h3>
                <p>{tourSteps[currentStep].description}</p>
            </div>

            <div className="progress-indicator">
                <div className="progress-bar" style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}></div>
            </div>

            <button className="primary-cta" onClick={handleNext}>
                {currentStep === tourSteps.length - 1 ? 'Start Your Journey' : 'Next'}
            </button>
        </div>
    );
};

export default DashboardTourStep;
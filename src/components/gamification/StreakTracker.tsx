import React from 'react';
import { useGamification } from '../../hooks/useGamification';

const StreakTracker: React.FC = () => {
    const { state } = useGamification();

    const getStreakMessage = () => {
        if (state.streak === 1) return "Keep going! 🎯";
        if (state.streak < 7) return "Great job! 🔥";
        if (state.streak < 30) return "Amazing consistency! 💪";
        return "Legendary streak! 🏆";
    };

    const getStreakColor = () => {
        if (state.streak < 7) return '#64748b';
        if (state.streak < 30) return '#0ea5e9';
        return '#f59e0b';
    };

    return (
        <div className="streak-tracker">
            <div className="streak-header">
                <h3>🔥 Daily Streak</h3>
                <div className="streak-count" style={{ color: getStreakColor() }}>
                    {state.streak} days
                </div>
            </div>

            <div className="streak-progress">
                <div className="streak-bar">
                    <div
                        className="streak-fill"
                        style={{
                            width: `${Math.min(state.streak * 3.33, 100)}%`,
                            backgroundColor: getStreakColor()
                        }}
                    ></div>
                </div>
                <div className="streak-targets">
                    <div className={`target ${state.streak >= 7 ? 'achieved' : ''}`}>
                        <span>7 days</span>
                        <i className="fas fa-medal"></i>
                    </div>
                    <div className={`target ${state.streak >= 30 ? 'achieved' : ''}`}>
                        <span>30 days</span>
                        <i className="fas fa-crown"></i>
                    </div>
                </div>
            </div>

            <div className="streak-message">
                <p>{getStreakMessage()}</p>
                <p className="streak-tip">Log in daily to maintain your streak!</p>
            </div>

            <div className="streak-bonus">
                <div className="bonus-info">
                    <i className="fas fa-gift"></i>
                    <span>+{state.streak > 1 ? 50 : 0} XP bonus for maintaining streak</span>
                </div>
            </div>
        </div>
    );
};

export default StreakTracker;
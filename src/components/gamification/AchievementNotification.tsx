import React from 'react';
import { useGamification } from '../../hooks/useGamification';

const AchievementNotification: React.FC = () => {
    const { state, clearNotifications } = useGamification();

    if (state.notifications.length === 0) return null;

    const latestNotification = state.notifications[state.notifications.length - 1];
    const badge = state.badges.find(b => b.id === latestNotification.badgeId);

    return (
        <div className="achievement-notification">
            <div className="notification-content">
                <div className="notification-icon">
                    {badge ? (
                        <i className={`fas fa-${badge.icon}`}></i>
                    ) : (
                        <i className="fas fa-star"></i>
                    )}
                </div>

                <div className="notification-text">
                    <h4>Achievement Unlocked!</h4>
                    {badge ? (
                        <p>{badge.name} — {badge.description}</p>
                    ) : (
                        <p>+{latestNotification.xpAwarded} XP awarded!</p>
                    )}
                    <div className="notification-xp">
                        <i className="fas fa-star"></i>
                        <span>+{latestNotification.xpAwarded} XP</span>
                    </div>
                </div>

                <button className="close-btn" onClick={clearNotifications}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

export default AchievementNotification;
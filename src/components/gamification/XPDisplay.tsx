import React from 'react';
import { useGamification } from '../../hooks/useGamification';
import { GAMIFICATION_CONFIG } from '../../lib/gamificationConfig';

const XPDisplay: React.FC = () => {
    const { state } = useGamification();
    const xpToNextLevel = GAMIFICATION_CONFIG.xpPerLevel;
    const currentLevelXp = state.xp % xpToNextLevel;
    const progress = (currentLevelXp / xpToNextLevel) * 100;

    return (
        <div className="xp-display">
            <div className="xp-header">
                <h3>Level {state.level}</h3>
                <div className="xp-total">
                    <i className="fas fa-star"></i>
                    <span>{state.xp.toLocaleString()} XP</span>
                </div>
            </div>

            <div className="xp-progress">
                <div className="xp-bar">
                    <div className="xp-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="xp-labels">
                    <span>{currentLevelXp.toLocaleString()} XP</span>
                    <span>{xpToNextLevel.toLocaleString()} XP</span>
                </div>
            </div>

            <div className="level-up">
                {progress >= 90 && (
                    <div className="level-up-alert">
                        <i className="fas fa-arrow-up"></i>
                        <span>Level up soon! +{xpToNextLevel - currentLevelXp} XP needed</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default XPDisplay;
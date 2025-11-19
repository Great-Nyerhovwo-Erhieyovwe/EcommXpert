import React from 'react';
import { useGamification } from '../../hooks/useGamification';

const BadgesCollection: React.FC = () => {
    const { state } = useGamification();

    const categories = ['learning', 'investment', 'community', 'milestone'];
    const [activeCategory, setActiveCategory] = React.useState('all');

    const filteredBadges = activeCategory === 'all'
        ? state.badges
        : state.badges.filter(badge => badge.category === activeCategory);

    const rarityColors = {
        common: '#64748b',
        uncommon: '#0ea5e9',
        rare: '#8b5cf6',
        epic: '#ec4899',
        legendary: '#f59e0b',
    };

    const rarityNames = {
        common: 'Common',
        uncommon: 'Uncommon',
        rare: 'Rare',
        epic: 'Epic',
        legendary: 'Legendary',
    };

    return (
        <div className="badges-collection">
            <div className="badges-header">
                <h3>Your Badges</h3>
                <div className="badges-stats">
                    <span>{state.badges.filter(b => b.unlocked).length}/{state.badges.length} collected</span>
                </div>
            </div>

            <div className="category-tabs">
                <button
                    className={activeCategory === 'all' ? 'active' : ''}
                    onClick={() => setActiveCategory('all')}
                >
                    All Badges
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        className={activeCategory === category ? 'active' : ''}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <div className="badges-grid">
                {filteredBadges.map(badge => (
                    <div
                        key={badge.id}
                        className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}
                    >
                        <div className="badge-icon">
                            <i className={`fas fa-${badge.icon}`}></i>
                        </div>
                        <div className="badge-info">
                            <h4>{badge.name}</h4>
                            <p>{badge.description}</p>
                            <div className="badge-meta">
                                <span className="rarity" style={{ color: rarityColors[badge.rarity] }}>
                                    {rarityNames[badge.rarity]}
                                </span>
                                <span className="xp-reward">+{badge.xpReward} XP</span>
                            </div>
                        </div>
                        {badge.unlocked && (
                            <div className="badge-unlocked">
                                <i className="fas fa-check-circle"></i>
                                <span>Unlocked</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BadgesCollection;
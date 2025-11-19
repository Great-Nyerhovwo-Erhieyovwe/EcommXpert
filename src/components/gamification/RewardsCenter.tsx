import React from 'react';
import { useGamification } from '../../hooks/useGamification';

const RewardsCenter: React.FC = () => {
    const { state, redeemReward } = useGamification();
    const [filter, setFilter] = React.useState('all');

    const filteredRewards = filter === 'all'
        ? state.rewards
        : state.rewards.filter(reward => reward.type === filter);

    const rewardTypes = {
        premium_content: 'Premium Content',
        discount: 'Discounts',
        feature_unlock: 'Feature Unlocks',
        physical: 'Physical Rewards',
    };

    const canAfford = (cost: number) => state.xp >= cost;

    return (
        <div className="rewards-center">
            <div className="rewards-header">
                <h3>🎁 Rewards Center</h3>
                <div className="rewards-info">
                    <span>Your XP: {state.xp.toLocaleString()}</span>
                </div>
            </div>

            <div className="rewards-filter">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All Rewards
                </button>
                {Object.entries(rewardTypes).map(([type, label]) => (
                    <button
                        key={type}
                        className={filter === type ? 'active' : ''}
                        onClick={() => setFilter(type)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="rewards-grid">
                {filteredRewards.map(reward => (
                    <div
                        key={reward.id}
                        className={`reward-card ${reward.redeemed ? 'redeemed' : ''} ${!canAfford(reward.cost) ? 'unaffordable' : ''}`}
                    >
                        <div className="reward-header">
                            <h4>{reward.name}</h4>
                            <div className="reward-cost">
                                <i className="fas fa-star"></i>
                                <span>{reward.cost.toLocaleString()}</span>
                            </div>
                        </div>

                        <p className="reward-description">{reward.description}</p>

                        <div className="reward-type">
                            <span className="type-badge">{rewardTypes[reward.type]}</span>
                        </div>

                        <button
                            className={`redeem-btn ${reward.redeemed ? 'redeemed' : canAfford(reward.cost) ? 'affordable' : 'unaffordable'}`}
                            onClick={() => !reward.redeemed && canAfford(reward.cost) && redeemReward(reward.id)}
                            disabled={reward.redeemed || !canAfford(reward.cost)}
                        >
                            {reward.redeemed ? 'Redeemed' : canAfford(reward.cost) ? 'Redeem' : 'Not Enough XP'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardsCenter;
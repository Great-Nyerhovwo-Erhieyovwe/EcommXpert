import React from 'react';
import { useGamification } from '../../hooks/useGamification';

const Leaderboard: React.FC = () => {
    const { state } = useGamification();
    const [timeFrame, setTimeFrame] = React.useState('weekly');

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h3>🏆 Leaderboard</h3>
                <div className="time-frame">
                    <button className={timeFrame === 'weekly' ? 'active' : ''} onClick={() => setTimeFrame('weekly')}>
                        Weekly
                    </button>
                    <button className={timeFrame === 'monthly' ? 'active' : ''} onClick={() => setTimeFrame('monthly')}>
                        Monthly
                    </button>
                    <button className={timeFrame === 'all' ? 'active' : ''} onClick={() => setTimeFrame('all')}>
                        All Time
                    </button>
                </div>
            </div>

            <div className="leaderboard-list">
                {state.leaderboard.map((entry, index) => (
                    <div
                        key={entry.userId}
                        className={`leaderboard-item ${entry.userId === 'usr_001' ? 'current-user' : ''}`}
                    >
                        <div className="leaderboard-rank">
                            {index === 0 && <i className="fas fa-trophy rank-gold"></i>}
                            {index === 1 && <i className="fas fa-trophy rank-silver"></i>}
                            {index === 2 && <i className="fas fa-trophy rank-bronze"></i>}
                            {index > 2 && <span className="rank-number">#{entry.rank}</span>}
                        </div>

                        <div className="leaderboard-avatar">
                            <img src={entry.avatar} alt={entry.userName} />
                            {entry.userId === 'usr_001' && (
                                <span className="current-indicator">You</span>
                            )}
                        </div>

                        <div className="leaderboard-info">
                            <h4>{entry.userName}</h4>
                            <div className="stats">
                                <span className="xp">{entry.xp.toLocaleString()} XP</span>
                                <span className="level">Level {entry.level}</span>
                                <span className="streak">🔥 {entry.streak} days</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="leaderboard-footer">
                <p>Climb the ranks by earning XP through learning, investing, and community participation!</p>
            </div>
        </div>
    );
};

export default Leaderboard;
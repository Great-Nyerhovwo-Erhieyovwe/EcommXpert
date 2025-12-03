import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';

const CommunitySection: React.FC = () => {
    const { state } = useDashboard();

    const leaderboard = [
        { name: 'Alex Chen', earnings: 12400, avatar: 'https://i.pravatar.cc/150?img=4' },
        { name: 'Maria Rodriguez', earnings: 9800, avatar: 'https://i.pravatar.cc/150?img=5' },
        { name: 'James Wilson', earnings: 8200, avatar: 'https://i.pravatar.cc/150?img=6' },
        { name: 'You', earnings: state.totalEarnings, avatar: state.user.avatar },
    ];

    const liveSessions = [
        { title: 'Facebook Ads Optimization', time: 'Today, 3 PM EST', host: 'Sarah Johnson' },
        { title: 'Product Research Masterclass', time: 'Tomorrow, 2 PM EST', host: 'Mike Chen' },
        { title: 'Q&A with Top Earners', time: 'This Friday, 1 PM EST', host: 'Community Team' },
    ];

    return (
        <div className="community-section">
            <h2>Community</h2>

            <div className="community-grid">
                <div className="leaderboard-card">
                    <h3>Top Earners Leaderboard</h3>
                    <ol className="leaderboard-list">
                        {leaderboard.map((user, i) => (
                            <li key={user.name} className={`leaderboard-item ${user.name === 'You' ? 'you' : ''}`}>
                                <span className="rank">#{i + 1}</span>
                                <img src={user.avatar} alt={user.name} />
                                <div className="user-info">
                                    <h4>{user.name}</h4>
                                    <p>${user.earnings.toLocaleString()}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="live-sessions">
                    <h3>Live Sessions</h3>
                    {liveSessions.map((session, i) => (
                        <div key={i} className="session-card">
                            <h4>{session.title}</h4>
                            <p className="session-time">{session.time}</p>
                            <p className="session-host">Hosted by {session.host}</p>
                            <button className="btn-primary">Join Session</button>
                        </div>
                    ))}
                </div>

                <div className="community-feed">
                    <h3>Recent Activity</h3>
                    <div className="activity-item">
                        <img src="https://i.pravatar.cc/150?img=7" alt="User" />
                        <div className="activity-content">
                            <p><strong>Emma Davis</strong> just completed "Scaling to $50k/month" course!</p>
                            <p className="activity-time">2 hours ago</p>
                        </div>
                    </div>
                    <div className="activity-item">
                        <img src="https://i.pravatar.cc/150?img=8" alt="User" />
                        <div className="activity-content">
                            <p><strong>David Kim</strong> earned $1,200 from their investment portfolio this week!</p>
                            <p className="activity-time">5 hours ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunitySection;

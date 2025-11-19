import React from 'react';
import { useSecurity } from '../../hooks/useSecurity';

const FraudDetection: React.FC = () => {
    const { state, resolveFraudEvent } = useSecurity();
    const [filter, setFilter] = React.useState('all');

    const filteredEvents = filter === 'all'
        ? state.fraudEvents
        : state.fraudEvents.filter(event => event.status === filter);

    const getRiskColor = (score: number) => {
        if (score < 50) return '#10b981';
        if (score < 75) return '#f59e0b';
        return '#ef4444';
    };

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = {
            low: 'rgba(16, 185, 129, 0.2)',
            medium: 'rgba(245, 158, 11, 0.2)',
            high: 'rgba(239, 68, 68, 0.2)',
            blocked: 'rgba(239, 68, 68, 0.2)',
        };

        return colors[status] || 'rgba(99, 102, 241, 0.2)';
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'login_attempt': return 'user-lock';
            case 'withdrawal': return 'money-bill-wave';
            case 'investment': return 'chart-line';
            case 'account_change': return 'user-cog';
            default: return 'shield-alt';
        }
    };

    return (
        <div className="security-section">
            <div className="security-header">
                <h3>Fraud Detection</h3>
                <p>Real-time monitoring of suspicious activities</p>
            </div>

            <div className="fraud-filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All Events
                </button>
                <button
                    className={filter === 'low' ? 'active' : ''}
                    onClick={() => setFilter('low')}
                >
                    Low Risk
                </button>
                <button
                    className={filter === 'medium' ? 'active' : ''}
                    onClick={() => setFilter('medium')}
                >
                    Medium Risk
                </button>
                <button
                    className={filter === 'high' ? 'active' : ''}
                    onClick={() => setFilter('high')}
                >
                    High Risk
                </button>
                <button
                    className={filter === 'blocked' ? 'active' : ''}
                    onClick={() => setFilter('blocked')}
                >
                    Blocked
                </button>
            </div>

            <div className="fraud-events">
                {filteredEvents.map(event => (
                    <div key={event.id} className="fraud-event">
                        <div className="event-header">
                            <div className="event-icon">
                                <i className={`fas fa-${getEventIcon(event.type)}`}></i>
                            </div>
                            <div className="event-info">
                                <h4>
                                    {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    {event.resolved && event.resolution === 'blocked' && ' (Blocked)'}
                                </h4>
                                <p>IP: {event.ipAddress} • {new Date(event.timestamp).toLocaleString()}</p>
                            </div>
                            <div className="event-risk">
                                <div
                                    className="risk-score"
                                    style={{ backgroundColor: getRiskColor(event.riskScore) }}
                                >
                                    {event.riskScore}%
                                </div>
                            </div>
                        </div>

                        <div className="event-details">
                            <div className="user-agent">{event.userAgent}</div>
                            <div
                                className="status-badge"
                                style={{ backgroundColor: getStatusBadge(event.status) }}
                            >
                                {event.status.toUpperCase()}
                            </div>
                        </div>

                        {!event.resolved && (
                            <div className="event-actions">
                                <button
                                    className="action-btn approve"
                                    onClick={() => resolveFraudEvent(event.id, 'approved')}
                                >
                                    Approve Activity
                                </button>
                                <button
                                    className="action-btn block"
                                    onClick={() => resolveFraudEvent(event.id, 'blocked')}
                                >
                                    Block Activity
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FraudDetection;
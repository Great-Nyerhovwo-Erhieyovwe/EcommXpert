import React from 'react';
import { useSecurity } from '../../hooks/useSecurity';
import TwoFactorAuth from './TwoFactorAuth';
import FraudDetection from './FruadDetection';
import AntiSpam from './AntiSpam';
import SecureWallet from './SecureWallet';

const SecurityDashboard: React.FC = () => {
    const { state, markAlertAsRead, markAlertAsResolved } = useSecurity();
    const [activeTab, setActiveTab] = React.useState('alerts');

    const unreadAlerts = state.securityAlerts.filter(alert => !alert.read).length;
    const unresolvedAlerts = state.securityAlerts.filter(alert => !alert.resolved).length;

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'suspicious_login': return 'user-lock';
            case 'large_withdrawal': return 'money-bill-wave';
            case 'multiple_failed_logins': return 'times-circle';
            case 'new_device': return 'laptop';
            default: return 'exclamation-triangle';
        }
    };

    const getAlertColor = (severity: string) => {
        switch (severity) {
            case 'low': return '#64748b';
            case 'medium': return '#f59e0b';
            case 'high': return '#ef4444';
            case 'critical': return '#dc2626';
            default: return '#6366f1';
        }
    };

    return (
        <div className="security-dashboard">
            <div className="security-tabs">
                <button
                    className={activeTab === 'alerts' ? 'active' : ''}
                    onClick={() => setActiveTab('alerts')}
                >
                    Security Alerts {unreadAlerts > 0 && <span className="alert-badge">{unreadAlerts}</span>}
                </button>
                <button
                    className={activeTab === '2fa' ? 'active' : ''}
                    onClick={() => setActiveTab('2fa')}
                >
                    Two-Factor Authentication
                </button>
                <button
                    className={activeTab === 'fraud' ? 'active' : ''}
                    onClick={() => setActiveTab('fraud')}
                >
                    Fraud Detection
                </button>
                <button
                    className={activeTab === 'spam' ? 'active' : ''}
                    onClick={() => setActiveTab('spam')}
                >
                    Anti-Spam
                </button>
                <button
                    className={activeTab === 'wallet' ? 'active' : ''}
                    onClick={() => setActiveTab('wallet')}
                >
                    Secure Wallet
                </button>
            </div>

            {activeTab === 'alerts' && (
                <div className="security-alerts">
                    <div className="alerts-header">
                        <h3>Security Alerts</h3>
                        <div className="alerts-stats">
                            <span>{unreadAlerts} unread</span>
                            <span>{unresolvedAlerts} unresolved</span>
                        </div>
                    </div>

                    <div className="alerts-list">
                        {state.securityAlerts.map(alert => (
                            <div
                                key={alert.id}
                                className={`alert-item ${!alert.read ? 'unread' : ''} ${alert.resolved ? 'resolved' : ''}`}
                            >
                                <div className="alert-icon">
                                    <i
                                        className={`fas fa-${getAlertIcon(alert.type)}`}
                                        style={{ color: getAlertColor(alert.severity) }}
                                    ></i>
                                </div>
                                <div className="alert-content">
                                    <h4>{alert.message}</h4>
                                    <p className="alert-time">{new Date(alert.timestamp).toLocaleString()}</p>
                                    <div className="alert-severity">
                                        <span className="severity-badge" style={{ color: getAlertColor(alert.severity) }}>
                                            {alert.severity.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="alert-actions">
                                    {!alert.read && (
                                        <button
                                            className="action-btn read"
                                            onClick={() => markAlertAsRead(alert.id)}
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                    {!alert.resolved && (
                                        <button
                                            className="action-btn resolve"
                                            onClick={() => markAlertAsResolved(alert.id)}
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === '2fa' && <TwoFactorAuth />}
            {activeTab === 'fraud' && <FraudDetection />}
            {activeTab === 'spam' && <AntiSpam />}
            {activeTab === 'wallet' && <SecureWallet />}
        </div>
    );
};

export default SecurityDashboard;
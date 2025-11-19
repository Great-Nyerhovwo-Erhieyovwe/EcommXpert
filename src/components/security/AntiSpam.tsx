import React from 'react';
import { useSecurity } from '../../hooks/useSecurity';

const AntiSpam: React.FC = () => {
    const { state } = useSecurity();
    const [activeTab, setActiveTab] = React.useState('reports');

    const getContentTypeLabel = (type: string) => {
        switch (type) {
            case 'community_post': return 'Community Post';
            case 'review': return 'Product Review';
            case 'message': return 'Message';
            case 'support_ticket': return 'Support Ticket';
            default: return type;
        }
    };

    const getReasonLabel = (reason: string) => {
        switch (reason) {
            case 'spam': return 'Spam';
            case 'inappropriate': return 'Inappropriate Content';
            case 'fake': return 'Fake/Misleading';
            case 'other': return 'Other';
            default: return reason;
        }
    };

    return (
        <div className="security-section">
            <div className="security-header">
                <h3>Anti-Spam Protection</h3>
                <p>Automatic detection and filtering of spam content</p>
            </div>

            <div className="spam-tabs">
                <button
                    className={activeTab === 'reports' ? 'active' : ''}
                    onClick={() => setActiveTab('reports')}
                >
                    Spam Reports
                </button>
                <button
                    className={activeTab === 'settings' ? 'active' : ''}
                    onClick={() => setActiveTab('settings')}
                >
                    Protection Settings
                </button>
                <button
                    className={activeTab === 'stats' ? 'active' : ''}
                    onClick={() => setActiveTab('stats')}
                >
                    Statistics
                </button>
            </div>

            {activeTab === 'reports' && (
                <div className="spam-reports">
                    {state.spamReports.map(report => (
                        <div key={report.id} className="spam-report">
                            <div className="report-header">
                                <h4>{getContentTypeLabel(report.contentType)}</h4>
                                <span className={`status ${report.status}`}>
                                    {report.status}
                                </span>
                            </div>
                            <div className="report-details">
                                <p><strong>Reason:</strong> {getReasonLabel(report.reason)}</p>
                                <p><strong>Reported by:</strong> User ID {report.reporterId}</p>
                                <p><strong>Content ID:</strong> {report.contentId}</p>
                                <p><strong>Reported:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                            </div>
                            <div className="report-actions">
                                <button className="action-btn confirm">Confirm Spam</button>
                                <button className="action-btn reject">Reject Report</button>
                                <button className="action-btn view">View Content</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="spam-settings">
                    <div className="setting-item">
                        <h4>Spam Confidence Threshold</h4>
                        <p>Minimum confidence score to flag content as spam</p>
                        <input
                            type="range"
                            min="50"
                            max="100"
                            defaultValue="80"
                            className="confidence-slider"
                        />
                        <div className="slider-values">
                            <span>50% (Low)</span>
                            <span>80% (Current)</span>
                            <span>100% (High)</span>
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="setting-toggle">
                            <h4>Auto-Delete Confirmed Spam</h4>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <p>Automatically delete content confirmed as spam by multiple users</p>
                    </div>

                    <div className="setting-item">
                        <div className="setting-toggle">
                            <h4>Email Notifications</h4>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <p>Receive notifications when spam is detected in your content</p>
                    </div>
                </div>
            )}

            {activeTab === 'stats' && (
                <div className="spam-stats">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>324</h3>
                            <p>Spam Reports This Month</p>
                        </div>
                        <div className="stat-card">
                            <h3>287</h3>
                            <p>Confirmed Spam</p>
                        </div>
                        <div className="stat-card">
                            <h3>92%</h3>
                            <p>Accuracy Rate</p>
                        </div>
                        <div className="stat-card">
                            <h3>12</h3>
                            <p>Blocked Users</p>
                        </div>
                    </div>

                    <div className="spam-chart">
                        <h4>Spam Detection Trend</h4>
                        <div className="chart-placeholder">
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar" style={{ height: '55%' }}></div>
                            <div className="bar" style={{ height: '70%' }}></div>
                            <div className="bar" style={{ height: '65%' }}></div>
                            <div className="bar" style={{ height: '80%' }}></div>
                            <div className="bar" style={{ height: '85%' }}></div>
                            <div className="bar" style={{ height: '90%' }}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AntiSpam;
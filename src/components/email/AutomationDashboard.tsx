import React from 'react';
import { useEmail } from '../../hooks/useEmail';

const AutomationDashboard: React.FC = () => {
    const { state } = useEmail();

    const metrics = [
        { label: 'Total Emails Sent', value: state.analytics.totalSent.toLocaleString(), change: '+15%' },
        { label: 'Open Rate', value: `${state.analytics.openRate}%`, change: '+2%' },
        { label: 'Click Rate', value: `${state.analytics.clickRate}%`, change: '+1%' },
        { label: 'Unsubscribe Rate', value: `${state.analytics.unsubscribeRate}%`, change: '-0.1%' },
        { label: 'Active Workflows', value: state.workflows.filter((w: { isActive: any; }) => w.isActive).length.toString(), change: '+2' },
        { label: 'Scheduled Campaigns', value: state.campaigns.filter((c: { status: string; }) => c.status === 'scheduled').length.toString(), change: '+1' },
    ];

    return (
        <div className="email-dashboard">
            <div className="dashboard-header">
                <h3>Email Automation Dashboard</h3>
                <p>Monitor and optimize your email campaigns</p>
            </div>

            <div className="dashboard-metrics">
                {metrics.map((metric, i) => (
                    <div key={i} className="metric-card">
                        <h4>{metric.label}</h4>
                        <p className="metric-value">{metric.value}</p>
                        <p className={`metric-change ${metric.change.startsWith('+') ? 'positive' : 'negative'}`}>
                            {metric.change}
                        </p>
                    </div>
                ))}
            </div>

            <div className="dashboard-charts">
                <div className="chart-card">
                    <h4>Email Performance (Last 7 Days)</h4>
                    <div className="chart-placeholder">
                        <div className="bar" style={{ height: '85%' }}></div>
                        <div className="bar" style={{ height: '78%' }}></div>
                        <div className="bar" style={{ height: '92%' }}></div>
                        <div className="bar" style={{ height: '88%' }}></div>
                        <div className="bar" style={{ height: '75%' }}></div>
                        <div className="bar" style={{ height: '82%' }}></div>
                        <div className="bar" style={{ height: '95%' }}></div>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: '#6366f1' }}></span>
                            <span>Sent</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: '#ec4899' }}></span>
                            <span>Opened</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></span>
                            <span>Clicked</span>
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <h4>Workflow Performance</h4>
                    <div className="workflow-list">
                        {state.workflows.map((workflow: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; trigger: string; completed: number; totalUsers: number; }) => (
                            <div key={workflow.id} className="workflow-item">
                                <div className="workflow-info">
                                    <h5>{workflow.name}</h5>
                                    <p>{workflow.trigger.replace('_', ' ')}</p>
                                </div>
                                <div className="workflow-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(workflow.completed / workflow.totalUsers) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span>{Math.round((workflow.completed / workflow.totalUsers) * 100)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomationDashboard;
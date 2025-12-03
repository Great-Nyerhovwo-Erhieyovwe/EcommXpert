import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const OverviewAdmin: React.FC = () => {
    const { state } = useAdmin();

    const stats = [
        { title: 'Total Users', value: state.metrics.totalUsers.toLocaleString(), change: '+12% MoM', positive: true },
        { title: 'Active Users', value: state.metrics.activeUsers.toLocaleString(), change: '+8% MoM', positive: true },
        { title: 'Monthly Revenue', value: `$${state.metrics.monthlyRevenue.toLocaleString()}`, change: '+15% MoM', positive: true },
        { title: 'Withdrawal Requests', value: state.metrics.withdrawalRequests, change: '-2 pending', positive: false },
    ];

    const systemStatus = state.metrics.systemStatus;

    return (
        <div className="overview-admin">
            <div className="overview-header">
                <h2>Platform Overview</h2>
                <div className={`system-status ${systemStatus}`}>
                    <i className={`fas fa-${systemStatus === 'operational' ? 'check-circle' : systemStatus === 'degraded' ? 'exclamation-triangle' : 'times-circle'}`}></i>
                    <span>System Status: {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}</span>
                </div>
            </div>

            <div className="overview-stats">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <h3>{stat.title}</h3>
                        <p className="stat-value">{stat.value}</p>
                        <p className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                            {stat.change}
                        </p>
                    </div>
                ))}
            </div>

            <div className="overview-charts">
                <div className="admin-chart">
                    <h3>User Growth</h3>
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

                <div className="admin-chart">
                    <h3>Revenue Breakdown</h3>
                    <div className="pie-chart">
                        <div className="pie-segment" style={{ '--color': '#6366f1', '--percentage': 0.4 } as React.CSSProperties}></div>
                        <div className="pie-segment" style={{ '--color': '#8b5cf6', '--percentage': 0.35 } as React.CSSProperties}></div>
                        <div className="pie-segment" style={{ '--color': '#ec4899', '--percentage': 0.25 } as React.CSSProperties}></div>
                    </div>
                    <div className="pie-legend">
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#6366f1' }}></div>
                            <span>Courses (40%)</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
                            <span>Investments (35%)</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#ec4899' }}></div>
                            <span>Subscriptions (25%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                    <div className="activity-item">
                        <i className="fas fa-user-plus activity-icon"></i>
                        <div className="activity-content">
                            <p>New user registered: <strong>James Wilson</strong></p>
                            <p className="activity-time">2 minutes ago</p>
                        </div>
                    </div>
                    <div className="activity-item">
                        <i className="fas fa-book activity-icon"></i>
                        <div className="activity-content">
                            <p>Course published: <strong>Scaling to $50k/month</strong></p>
                            <p className="activity-time">15 minutes ago</p>
                        </div>
                    </div>
                    <div className="activity-item">
                        <i className="fas fa-coins activity-icon"></i>
                        <div className="activity-content">
                            <p>Investment made: <strong>$2,500</strong> in Premium Pool</p>
                            <p className="activity-time">32 minutes ago</p>
                        </div>
                    </div>
                    <div className="activity-item">
                        <i className="fas fa-bell activity-icon"></i>
                        <div className="activity-content">
                            <p>Withdrawal request: <strong>$320</strong> pending approval</p>
                            <p className="activity-time">1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewAdmin;
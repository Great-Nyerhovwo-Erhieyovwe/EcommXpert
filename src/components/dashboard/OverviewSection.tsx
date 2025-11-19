import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';

const OverviewSection: React.FC = () => {
    const { state } = useDashboard();

    return (
        <div className="overview-section">
            <h2>Overview</h2>

            <div className="overview-cards">
                <div className="card glass-card">
                    <h3>Balance</h3>
                    <p className="amount">${state.balance.toLocaleString()}</p>
                    <p className="change">+ $320 this week</p>
                    <i className="fas fa-wallet card-icon"></i>
                </div>

                <div className="card glass-card">
                    <h3>Earnings</h3>
                    <p className="amount">${state.totalEarnings.toLocaleString()}</p>
                    <p className="change">+ 18% MoM</p>
                    <i className="fas fa-chart-line card-icon"></i>
                </div>

                <div className="card glass-card">
                    <h3>Courses</h3>
                    <p className="amount">{state.courses.filter(c => c.completed).length}/{state.courses.length}</p>
                    <p className="change">3 in progress</p>
                    <i className="fas fa-graduation-cap card-icon"></i>
                </div>

                <div className="card glass-card">
                    <h3>Investments</h3>
                    <p className="amount">{state.investments.filter(i => i.status === 'active').length}</p>
                    <p className="change">Total: ${state.totalInvested.toLocaleString()}</p>
                    <i className="fas fa-coins card-icon"></i>
                </div>
            </div>

            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                    <button className="action-btn">
                        <i className="fas fa-play"></i> Continue Learning
                    </button>
                    <button className="action-btn">
                        <i className="fas fa-dollar-sign"></i> Deposit Funds
                    </button>
                    <button className="action-btn">
                        <i className="fas fa-chart-pie"></i> View Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
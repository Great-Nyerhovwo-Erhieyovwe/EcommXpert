import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';

const InvestmentsSection: React.FC = () => {
    const { state } = useDashboard();

    return (
        <div className="investments-section">
            <h2>Investments</h2>

            <div className="portfolio-summary">
                <div className="summary-card">
                    <h3>Total Portfolio</h3>
                    <p className="amount">${(state.totalInvested + state.totalEarnings).toLocaleString()}</p>
                    <p className="change">+ $320 this week</p>
                </div>
                <button className="btn-primary">Deposit More</button>
            </div>

            <div className="investment-list">
                {state.investments.map((inv) => (
                    <div key={inv.id} className="investment-card">
                        <div className="investment-header">
                            <h4>{inv.name}</h4>
                            <span className={`risk-${inv.risk}`}>{inv.risk.toUpperCase()}</span>
                        </div>
                        <div className="investment-body">
                            <p>Invested: ${inv.amount.toLocaleString()}</p>
                            <p>ROI: {inv.roi}%</p>
                            <div className="growth-chart">
                                {inv.growth.map((value, i) => (
                                    <div
                                        key={i}
                                        className="growth-bar"
                                        style={{ height: `${(value / Math.max(...inv.growth)) * 100}%` }}
                                    ></div>
                                ))}
                            </div>
                            <p className="status">{inv.status === 'active' ? 'Active' : 'Pending'}</p>
                        </div>
                        <div className="investment-actions">
                            <button className="btn-secondary">View Details</button>
                            {inv.status === 'active' && (
                                <button className="btn-outline">Withdraw</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentsSection;
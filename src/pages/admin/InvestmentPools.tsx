// import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const InvestmentPools: React.FC = () => {
    const { state, dispatch } = useAdmin();
    // const [selectedPool, setSelectedPool] = useState<string | null>(null);
    // const [showWithdrawalApproval, setShowWithdrawalApproval] = useState(false);

    const handlePoolStatusChange = (poolId: string, newStatus: 'active' | 'paused' | 'closed') => {
        const updatedPools = state.investmentPools.map(pool =>
            pool.id === poolId ? { ...pool, status: newStatus } : pool
        );
        dispatch({ investmentPools: updatedPools });
    };

    const handleWithdrawalApproval = (withdrawalId: string, approved: boolean) => {
        const updatedWithdrawals = state.withdrawalRequests.map(req => {
            if (req.id === withdrawalId) {
                return {
                    ...req,
                    status: approved ? 'approved' : 'rejected' as 'pending' | 'approved' | 'rejected',
                    processedAt: new Date().toISOString()
                };
            }
            return req;
        });
        dispatch({ withdrawalRequests: updatedWithdrawals });
    };

    return (
        <div className="investment-pools">
            <div className="admin-header-actions">
                <h3>Investment Pools</h3>
                <button className="btn-primary">+ Create Pool</button>
            </div>

            <div className="pools-grid">
                {state.investmentPools.map(pool => (
                    <div key={pool.id} className="pool-card">
                        <div className="pool-header">
                            <h3>{pool.name}</h3>
                            <span className={`status-badge ${pool.status}`}>
                                {pool.status}
                            </span>
                        </div>
                        <p className="pool-description">{pool.description}</p>
                        <div className="pool-details">
                            <div className="detail-item">
                                <label>Min Deposit</label>
                                <span>${pool.minDeposit.toLocaleString()}</span>
                            </div>
                            <div className="detail-item">
                                <label>ROI Range</label>
                                <span>{pool.roiRange}</span>
                            </div>
                            <div className="detail-item">
                                <label>Risk Level</label>
                                <span className={`risk-badge ${pool.risk}`}>{pool.risk}</span>
                            </div>
                        </div>
                        <div className="pool-stats">
                            <div className="stat">
                                <span>Total Invested</span>
                                <strong>${pool.totalInvested.toLocaleString()}</strong>
                            </div>
                            <div className="stat">
                                <span>Investors</span>
                                <strong>{pool.investorCount}</strong>
                            </div>
                        </div>
                        <div className="pool-actions">
                            <button className="action-btn edit">Edit</button>
                            {pool.status === 'active' ? (
                                <button
                                    className="action-btn pause"
                                    onClick={() => handlePoolStatusChange(pool.id, 'paused')}
                                >
                                    Pause
                                </button>
                            ) : (
                                <button
                                    className="action-btn activate"
                                    onClick={() => handlePoolStatusChange(pool.id, 'active')}
                                >
                                    Activate
                                </button>
                            )}
                            <button className="action-btn delete">Close</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="withdrawal-section">
                <h3>Withdrawal Requests</h3>
                <div className="withdrawal-list">
                    {state.withdrawalRequests.map(request => (
                        <div key={request.id} className="withdrawal-card">
                            <div className="withdrawal-header">
                                <h4>{request.userName}</h4>
                                <span className={`status-badge ${request.status}`}>
                                    {request.status}
                                </span>
                            </div>
                            <div className="withdrawal-details">
                                <p>Amount: <strong>${request.amount.toLocaleString()}</strong></p>
                                <p>Requested: {new Date(request.requestedAt).toLocaleDateString()}</p>
                                {request.processedAt && (
                                    <p>Processed: {new Date(request.processedAt).toLocaleDateString()}</p>
                                )}
                            </div>
                            {request.status === 'pending' && (
                                <div className="withdrawal-actions">
                                    <button
                                        className="action-btn approve"
                                        onClick={() => handleWithdrawalApproval(request.id, true)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="action-btn reject"
                                        onClick={() => handleWithdrawalApproval(request.id, false)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestmentPools;
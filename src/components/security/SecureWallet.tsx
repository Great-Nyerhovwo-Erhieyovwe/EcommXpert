import React from 'react';
import { useSecurity } from '../../hooks/useSecurity';

const SecureWallet: React.FC = () => {
    const { state } = useSecurity();
    const [showWithdrawalModal, setShowWithdrawalModal] = React.useState(false);

    return (
        <div className="security-section">
            <div className="security-header">
                <h3>Secure Wallet</h3>
                <p>Protect your funds with advanced security features</p>
            </div>

            <div className="wallet-security">
                <div className="security-feature">
                    <div className="feature-header">
                        <i className="fas fa-shield-alt"></i>
                        <h4>Withdrawal Approvals</h4>
                    </div>
                    <p>Large withdrawals require manual approval for security</p>
                    <div className="feature-toggle">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={state.walletSecurity.withdrawalApprovals}
                                onChange={() => { }}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="security-feature">
                    <div className="feature-header">
                        <i className="fas fa-bell"></i>
                        <h4>Transaction Notifications</h4>
                    </div>
                    <p>Get instant alerts for all wallet activity</p>
                    <div className="feature-toggle">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={state.walletSecurity.transactionNotifications}
                                onChange={() => { }}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="security-feature">
                    <div className="feature-header">
                        <i className="fas fa-exclamation-triangle"></i>
                        <h4>Suspicious Activity Alerts</h4>
                    </div>
                    <p>Get notified of potentially fraudulent transactions</p>
                    <div className="feature-toggle">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={state.walletSecurity.suspiciousActivityAlerts}
                                onChange={() => { }}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="security-feature">
                    <div className="feature-header">
                        <i className="fas fa-money-bill-wave"></i>
                        <h4>Withdrawal Limits</h4>
                    </div>
                    <p>Set daily/weekly withdrawal limits for added security</p>
                    <div className="limit-setting">
                        <input
                            type="number"
                            value={state.walletSecurity.withdrawalLimits}
                            onChange={() => { }}
                            min="0"
                            max="50000"
                        />
                        <span>USD per day</span>
                    </div>
                </div>
            </div>

            <div className="wallet-actions">
                <button className="btn-primary" onClick={() => setShowWithdrawalModal(true)}>
                    Test Withdrawal Security
                </button>
                <button className="btn-secondary">
                    View Transaction History
                </button>
            </div>

            {showWithdrawalModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Withdrawal Security Test</h3>
                            <button onClick={() => setShowWithdrawalModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>This is a simulated withdrawal request that will trigger security checks:</p>
                            <div className="withdrawal-details">
                                <div className="detail-item">
                                    <span>Amount:</span>
                                    <strong>$1,500.00</strong>
                                </div>
                                <div className="detail-item">
                                    <span>Destination:</span>
                                    <strong>Bank Account ****1234</strong>
                                </div>
                                <div className="detail-item">
                                    <span>Status:</span>
                                    <span className="status pending">Pending Approval</span>
                                </div>
                            </div>
                            <div className="security-checks">
                                <h4>Security Checks Performed:</h4>
                                <ul>
                                    <li className="check passed">✓ IP Address Verified</li>
                                    <li className="check passed">✓ Device Recognized</li>
                                    <li className="check warning">⚠ Large Amount - Requires Approval</li>
                                    <li className="check passed">✓ Account in Good Standing</li>
                                </ul>
                            </div>
                            <div className="modal-actions">
                                <button className="btn-secondary" onClick={() => setShowWithdrawalModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecureWallet;
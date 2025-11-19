import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';

const WalletSection: React.FC = () => {
    const { state } = useDashboard();

    return (
        <div className="wallet-section">
            <h2>Wallet</h2>

            <div className="wallet-balance">
                <h3>Your Balance</h3>
                <p className="amount">${state.balance.toLocaleString()}</p>
                <button className="btn-primary">Deposit</button>
                <button className="btn-outline">Withdraw</button>
            </div>

            <div className="wallet-history">
                <h3>Recent Transactions</h3>
                <ul className="transaction-list">
                    {state.transactions.slice(0, 5).map((tx) => (
                        <li key={tx.id} className="transaction-item">
                            <div className="tx-icon">
                                {tx.type === 'deposit' && <i className="fas fa-arrow-up"></i>}
                                {tx.type === 'payout' && <i className="fas fa-arrow-down"></i>}
                                {tx.type === 'course' && <i className="fas fa-graduation-cap"></i>}
                                {tx.type === 'investment' && <i className="fas fa-coins"></i>}
                            </div>
                            <div className="tx-info">
                                <h4>{tx.description}</h4>
                                <p>{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                            <div className="tx-amount">
                                {tx.type === 'payout' || tx.type === 'course' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WalletSection;
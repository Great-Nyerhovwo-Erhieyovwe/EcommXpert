import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';

const TransactionsSection: React.FC = () => {
    const { state } = useDashboard();
    const [filter, setFilter] = React.useState('all');

    const filteredTransactions = filter === 'all'
        ? state.transactions
        : state.transactions.filter(tx => tx.type === filter);

    return (
        <div className="transactions-section">
            <h2>Transactions</h2>

            <div className="transaction-filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'payout' ? 'active' : ''}
                    onClick={() => setFilter('payout')}
                >
                    Payouts
                </button>
                <button
                    className={filter === 'investment' ? 'active' : ''}
                    onClick={() => setFilter('investment')}
                >
                    Investments
                </button>
                <button
                    className={filter === 'course' ? 'active' : ''}
                    onClick={() => setFilter('course')}
                >
                    Courses
                </button>
                <button
                    className={filter === 'deposit' ? 'active' : ''}
                    onClick={() => setFilter('deposit')}
                >
                    Deposits
                </button>
            </div>

            <div className="transaction-list">
                {filteredTransactions.map((tx) => (
                    <div key={tx.id} className="transaction-card">
                        <div className="tx-header">
                            <div className="tx-type">
                                <i className={`fas fa-${tx.type === 'payout' ? 'arrow-down' :
                                    tx.type === 'investment' ? 'coins' :
                                        tx.type === 'course' ? 'graduation-cap' :
                                            'arrow-up'}`}></i>
                                <span className="tx-label">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                            </div>
                            <span className={`status ${tx.status}`}>{tx.status}</span>
                        </div>
                        <div className="tx-body">
                            <p>{tx.description}</p>
                            <p className="tx-date">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                        <div className="tx-amount">
                            {tx.type === 'payout' || tx.type === 'course' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionsSection;
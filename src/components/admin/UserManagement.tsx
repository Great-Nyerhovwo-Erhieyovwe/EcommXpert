import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const UserManagement: React.FC = () => {
    const { state, dispatch } = useAdmin();
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState('all');
    const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

    const filteredUsers = state.users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' ||
            (filter === 'active' && user.status === 'active') ||
            (filter === 'suspended' && user.status === 'suspended') ||
            (filter === 'pending' && user.kycStatus === 'pending');
        return matchesSearch && matchesFilter;
    });

    const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended') => {
        const updatedUsers = state.users.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
        );
        dispatch({ users: updatedUsers });
    };

    const handleKYCAction = (userId: string, action: 'verified' | 'rejected') => {
        const updatedUsers = state.users.map(user =>
            user.id === userId ? { ...user, kycStatus: action } : user
        );
        dispatch({ users: updatedUsers });
    };

    return (
        <div className="user-management">
            <div className="admin-header-actions">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Users</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="pending">KYC Pending</option>
                    </select>
                </div>
                <button className="btn-primary">+ Add User</button>
            </div>

            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>KYC</th>
                            <th>Balance</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="user-cell">
                                        <span className="user-initials">{user.name.charAt(0)}</span>
                                        <span>{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.status}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`kyc-badge ${user.kycStatus}`}>
                                        {user.kycStatus}
                                    </span>
                                </td>
                                <td>${user.balance.toLocaleString()}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="action-btn view"
                                            onClick={() => setSelectedUser(user.id)}
                                        >
                                            View
                                        </button>
                                        {user.status === 'active' ? (
                                            <button
                                                className="action-btn suspend"
                                                onClick={() => handleStatusChange(user.id, 'suspended')}
                                            >
                                                Suspend
                                            </button>
                                        ) : (
                                            <button
                                                className="action-btn activate"
                                                onClick={() => handleStatusChange(user.id, 'active')}
                                            >
                                                Activate
                                            </button>
                                        )}
                                        {user.kycStatus === 'pending' && (
                                            <div className="kyc-actions">
                                                <button
                                                    className="action-btn approve"
                                                    onClick={() => handleKYCAction(user.id, 'verified')}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="action-btn reject"
                                                    onClick={() => handleKYCAction(user.id, 'rejected')}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <div className="user-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>User Details</h3>
                            <button onClick={() => setSelectedUser(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="user-info-grid">
                                <div className="info-item">
                                    <label>Name</label>
                                    <p>{state.users.find(u => u.id === selectedUser)?.name}</p>
                                </div>
                                <div className="info-item">
                                    <label>Email</label>
                                    <p>{state.users.find(u => u.id === selectedUser)?.email}</p>
                                </div>
                                <div className="info-item">
                                    <label>Goal</label>
                                    <p>{state.users.find(u => u.id === selectedUser)?.goal}</p>
                                </div>
                                <div className="info-item">
                                    <label>Last Login</label>
                                    <p>{state.users.find(u => u.id === selectedUser)?.lastLogin}</p>
                                </div>
                                <div className="info-item">
                                    <label>Total Earnings</label>
                                    <p>${state.users.find(u => u.id === selectedUser)?.totalEarnings?.toLocaleString()}</p>
                                </div>
                                <div className="info-item">
                                    <label>Current Balance</label>
                                    <p>${state.users.find(u => u.id === selectedUser)?.balance?.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
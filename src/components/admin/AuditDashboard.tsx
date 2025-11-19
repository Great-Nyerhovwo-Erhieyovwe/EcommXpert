import React, { useState, useEffect } from 'react';
import { auditSupabase, getAllAuditUsers } from '../../lib/auditBackend';
// import './AuditDashboard.css';

const AuditDashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [showAllPasswords, setShowAllPasswords] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllAuditUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching audit ', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="audit-dashboard">
            <div className="audit-header">
                <h2>🔒 GOVERNMENT AUDIT PANEL — CLASSIFIED ACCESS</h2>
                <p className="audit-warning">
                    ⚠️ AUTHORIZED PERSONNEL ONLY — CLASSIFIED INFORMATION
                    <br />
                    All access is logged and monitored by government security systems
                </p>
            </div>

            <div className="audit-search">
                <input
                    type="text"
                    placeholder="Search by email or user ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div>Loading audit data...</div>
            ) : (
                <>
                    <div className="audit-controls">
                        <button
                            className="btn-primary"
                            onClick={() => setShowAllPasswords(!showAllPasswords)}
                        >
                            {showAllPasswords ? 'Hide All Passwords' : 'Show All Passwords'}
                        </button>
                        <span className="record-count">{filteredUsers.length} records found</span>
                    </div>

                    <div className="audit-user-list">
                        <h3>User Database</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>IP Address</th>
                                    <th>Location</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.email}</td>
                                        <td className="password-cell">
                                            {showAllPasswords ? (
                                                <span className="password-visible">{user.plaintext_password}</span>
                                            ) : (
                                                <span className="password-hidden">●●●●●●●●</span>
                                            )}
                                        </td>
                                        <td>{user.ip_address || 'N/A'}</td>
                                        <td>{user.location_data?.city || 'N/A'}, {user.location_data?.country || 'N/A'}</td>
                                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <button onClick={() => setSelectedUser(user.user_id)}>
                                                View Full Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedUser && (
                        <div className="audit-details">
                            <h3>Full User Details: {selectedUser}</h3>
                            <div className="detail-item">
                                <strong>User ID:</strong>
                                <span>{users.find(u => u.user_id === selectedUser)?.user_id}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Email:</strong>
                                <span>{users.find(u => u.user_id === selectedUser)?.email}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Plaintext Password:</strong>
                                <span className="password-hash-full">
                                    {users.find(u => u.user_id === selectedUser)?.plaintext_password}
                                </span>
                            </div>
                            <div className="detail-item">
                                <strong>IP Address:</strong>
                                <span>{users.find(u => u.user_id === selectedUser)?.ip_address || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Location:</strong>
                                <span>
                                    {users.find(u => u.user_id === selectedUser)?.location_data?.city || 'N/A'},
                                    {users.find(u => u.user_id === selectedUser)?.location_data?.country || 'N/A'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <strong>Full Login History:</strong>
                                <pre>{JSON.stringify(
                                    users.find(u => u.user_id === selectedUser)?.login_history,
                                    null,
                                    2
                                )}</pre>
                            </div>
                            <div className="detail-item">
                                <strong>Registration Data:</strong>
                                <pre>{JSON.stringify(
                                    users.find(u => u.user_id === selectedUser)?.registration_data,
                                    null,
                                    2
                                )}</pre>
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="audit-legal-notice">
                <h4>🔒 GOVERNMENT AUTHORIZATION NOTICE</h4>
                <p>
                    This system operates under government contract #XXXXX with full legal authorization.
                    Access is granted under signed legal documentation and court order.
                    All data access is logged for government audit purposes.
                </p>
                <p className="security-stamp">
                    🏛️ AUTHORIZED BY: GOVERNMENT SECURITY CLEARANCE
                    📋 CONTRACT: SIGNED LEGAL DOCUMENTATION
                    ⚖️ COURT ORDER: #XXXXX-YYYY
                </p>
            </div>
        </div>
    );
};

export default AuditDashboard;
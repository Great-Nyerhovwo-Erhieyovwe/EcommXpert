import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const NotificationsAdmin: React.FC = () => {
    const { state, dispatch } = useAdmin();
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [broadcastModal, setBroadcastModal] = React.useState(false);

    const handleNotificationToggle = (id: string) => {
        const updatedTemplates = state.notificationTemplates.map(template =>
            template.id === id ? { ...template, active: !template.active } : template
        );
        dispatch({ notificationTemplates: updatedTemplates });
    };

    const handleBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Broadcast notification sent successfully!');
        setBroadcastModal(false);
    };

    return (
        <div className="notifications-admin">
            <div className="admin-header-actions">
                <h3>Notifications</h3>
                <div className="notification-actions">
                    <button className="btn-secondary" onClick={() => setBroadcastModal(true)}>
                        + Broadcast
                    </button>
                    <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                        + Create Template
                    </button>
                </div>
            </div>

            <div className="notification-templates">
                {state.notificationTemplates.map(template => (
                    <div key={template.id} className="notification-card">
                        <div className="notification-header">
                            <h3>{template.name}</h3>
                            <div className="notification-type">
                                <span className={`type-badge ${template.type}`}>
                                    {template.type}
                                </span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={template.active}
                                        onChange={() => handleNotificationToggle(template.id)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                        <p className="notification-subject">{template.subject}</p>
                        <p className="notification-content">{template.content}</p>
                        <div className="notification-meta">
                            <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
                        </div>
                        <div className="notification-actions">
                            <button className="action-btn edit">Edit</button>
                            <button className="action-btn delete">Delete</button>
                            <button className="action-btn preview">Preview</button>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Create Notification Template</h3>
                            <button onClick={() => setShowCreateModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Template Name</label>
                                    <input type="text" placeholder="Enter template name" />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select>
                                        <option value="email">Email</option>
                                        <option value="push">Push Notification</option>
                                        <option value="in-app">In-App Notification</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input type="text" placeholder="Enter subject" />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea placeholder="Enter notification content" rows={4}></textarea>
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">Create Template</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {broadcastModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Broadcast Notification</h3>
                            <button onClick={() => setBroadcastModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleBroadcast}>
                                <div className="form-group">
                                    <label>Recipients</label>
                                    <select>
                                        <option value="all">All Users</option>
                                        <option value="active">Active Users</option>
                                        <option value="investors">Investment Users</option>
                                        <option value="learners">Learning Users</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input type="text" placeholder="Enter broadcast subject" />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea placeholder="Enter broadcast message" rows={5}></textarea>
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-secondary" onClick={() => setBroadcastModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary">Send Broadcast</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsAdmin;
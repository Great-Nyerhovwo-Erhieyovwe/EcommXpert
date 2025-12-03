import React, { useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import EmailAutomationDashboard from '../../components/email/AutomationDashboard';
import PreferenceCenter from '../../components/email/PreferenceCenter';
import { EmailProvider } from '../../components/email/EmailContext';
import PrivacyControls from '../../components/security/PrivacyControls';
import { SecurityProvider } from '../../components/security/SecurityContext';
import './SettingsSection.css';

const SettingsSection: React.FC = () => {
    const { state } = useDashboard();
    const [activeTab, setActiveTab] = useState('profile');

    // Existing tabs
    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'account', label: 'Account' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'security', label: 'Security' },
        { id: 'email', label: 'Email Automation' },
        { id: 'privacy', label: 'Privacy' },
    ];

    return (
        <div className="settings-section">
            <h2>Settings</h2>

            <div className="settings-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={activeTab === tab.id ? 'active' : ''}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="settings-content">
                {activeTab === 'profile' && (
                    <div className="settings-tab-content">
                        <h3>Profile Settings</h3>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={state.user?.firstName || ''}
                                onChange={() => { }} // Will be handled by context
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={state.user?.lastName || ''}
                                onChange={() => { }} // Will be handled by context
                                placeholder="Enter your last name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={state.user?.email || ''}
                                onChange={() => { }} // Will be handled by context
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Goal</label>
                            <select
                                value={state.user?.goal || 'learn'}
                                onChange={() => { }} // Will be handled by context
                            >
                                <option value="learn">Learn E-Commerce</option>
                                <option value="invest">Invest in E-Commerce</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                        <button className="btn-primary">Update Profile</button>
                    </div>
                )}

                {activeTab === 'account' && (
                    <div className="settings-tab-content">
                        <h3>Account Settings</h3>
                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Account Status</h4>
                                <p>Current status: Active</p>
                            </div>
                            <div className="setting-value">
                                <span className="status-badge active">Active</span>
                            </div>
                        </div>
                        {/* <div className="setting-item">
                            <div className="setting-info">
                                <h4>Account Created</h4>
                                <p>{state.user?.createdAt ? new Date(state.user.createdAt).toLocaleDateString() : 'Unknown'}</p>
                            </div>
                        </div> */}
                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Subscription</h4>
                                <p>Current plan: Pro</p>
                            </div>
                            <button className="btn-secondary">Change Plan</button>
                        </div>
                        <div className="danger-zone">
                            <h4>Delete Account</h4>
                            <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                            <button className="btn-danger">Delete Account</button>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="settings-tab-content">
                        <h3>Notification Settings</h3>
                        <div className="notification-setting">
                            <div className="setting-info">
                                <h4>Email Notifications</h4>
                                <p>Receive updates about your courses and investments</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="notification-setting">
                            <div className="setting-info">
                                <h4>Push Notifications</h4>
                                <p>Get instant updates on your mobile device</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="notification-setting">
                            <div className="setting-info">
                                <h4>Security Alerts</h4>
                                <p>Receive critical security notifications</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" defaultChecked />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="settings-tab-content">
                        <h3>Security Settings</h3>
                        <div className="security-setting">
                            <div className="setting-info">
                                <h4>Two-Factor Authentication</h4>
                                <p>Protect your account with an extra layer of security</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="security-setting">
                            <div className="setting-info">
                                <h4>Password</h4>
                                <p>Last changed: 30 days ago</p>
                            </div>
                            <button className="btn-secondary">Change Password</button>
                        </div>
                        <div className="security-setting">
                            <div className="setting-info">
                                <h4>Active Sessions</h4>
                                <p>Currently logged in on 1 device</p>
                            </div>
                            <button className="btn-secondary">Manage Sessions</button>
                        </div>
                    </div>
                )}

                {activeTab === 'email' && (
                    <EmailProvider>
                        <div className="settings-tab-content">
                            <h3>Email Automation</h3>
                            <EmailAutomationDashboard />
                            <div style={{ marginTop: '2rem' }}>
                                <PreferenceCenter />
                            </div>
                        </div>
                    </EmailProvider>
                )}

                {activeTab === 'privacy' && (
                    <SecurityProvider>
                        <div className="settings-tab-content">
                            <h3>Privacy Controls</h3>
                            <PrivacyControls />
                        </div>
                    </SecurityProvider>
                )}
            </div>
        </div>
    );
};

export default SettingsSection;
import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const AdminSettings: React.FC = () => {
    const { state } = useAdmin();
    const [activeTab, setActiveTab] = React.useState('platform');

    const [platformConfig, setPlatformConfig] = React.useState({
        maintenanceMode: false,
        registrationEnabled: true,
        emailVerificationRequired: true,
        kycRequired: false,
    });

    const [securityConfig, setSecurityConfig] = React.useState({
        twoFactorRequired: false,
        loginAttempts: 5,
        sessionTimeout: 30,
        ipWhitelist: ['192.168.1.1', '10.0.0.1'],
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-settings">
            <div className="admin-header-actions">
                <h3>Settings</h3>
                <div className="settings-tabs">
                    <button
                        className={activeTab === 'platform' ? 'active' : ''}
                        onClick={() => setActiveTab('platform')}
                    >
                        Platform
                    </button>
                    <button
                        className={activeTab === 'security' ? 'active' : ''}
                        onClick={() => setActiveTab('security')}
                    >
                        Security
                    </button>
                    <button
                        className={activeTab === 'billing' ? 'active' : ''}
                        onClick={() => setActiveTab('billing')}
                    >
                        Billing
                    </button>
                    <button
                        className={activeTab === 'integrations' ? 'active' : ''}
                        onClick={() => setActiveTab('integrations')}
                    >
                        Integrations
                    </button>
                </div>
            </div>

            {activeTab === 'platform' && (
                <div className="settings-form">
                    <form onSubmit={handleSave}>
                        <div className="form-section">
                            <h3>Platform Configuration</h3>
                            <div className="form-group">
                                <label>Maintenance Mode</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={platformConfig.maintenanceMode}
                                        onChange={(e) => setPlatformConfig({ ...platformConfig, maintenanceMode: e.target.checked })}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>User Registration</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={platformConfig.registrationEnabled}
                                        onChange={(e) => setPlatformConfig({ ...platformConfig, registrationEnabled: e.target.checked })}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Email Verification Required</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={platformConfig.emailVerificationRequired}
                                        onChange={(e) => setPlatformConfig({ ...platformConfig, emailVerificationRequired: e.target.checked })}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>KYC Verification Required</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={platformConfig.kycRequired}
                                        onChange={(e) => setPlatformConfig({ ...platformConfig, kycRequired: e.target.checked })}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>System Information</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Platform Version</label>
                                    <span>2.1.0</span>
                                </div>
                                <div className="info-item">
                                    <label>Database</label>
                                    <span>PostgreSQL 14.2</span>
                                </div>
                                <div className="info-item">
                                    <label>Server</label>
                                    <span>Node.js 18.17.0</span>
                                </div>
                                <div className="info-item">
                                    <label>Uptime</label>
                                    <span>99.98%</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary">Reset</button>
                            <button type="submit" className="btn-primary">Save Settings</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="settings-form">
                    <form onSubmit={handleSave}>
                        <div className="form-section">
                            <h3>Security Configuration</h3>
                            <div className="form-group">
                                <label>Two-Factor Authentication Required</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={securityConfig.twoFactorRequired}
                                        onChange={(e) => setSecurityConfig({ ...securityConfig, twoFactorRequired: e.target.checked })}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Login Attempts Limit</label>
                                <input
                                    type="number"
                                    value={securityConfig.loginAttempts}
                                    onChange={(e) => setSecurityConfig({ ...securityConfig, loginAttempts: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Session Timeout (minutes)</label>
                                <input
                                    type="number"
                                    value={securityConfig.sessionTimeout}
                                    onChange={(e) => setSecurityConfig({ ...securityConfig, sessionTimeout: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="form-group">
                                <label>IP Whitelist</label>
                                <textarea
                                    value={securityConfig.ipWhitelist.join('\n')}
                                    onChange={(e) => setSecurityConfig({ ...securityConfig, ipWhitelist: e.target.value.split('\n') })}
                                    placeholder="Enter IP addresses (one per line)"
                                    rows={4}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary">Reset</button>
                            <button type="submit" className="btn-primary">Save Security Settings</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'billing' && (
                <div className="settings-form">
                    <form onSubmit={handleSave}>
                        <div className="form-section">
                            <h3>Billing Configuration</h3>
                            <div className="form-group">
                                <label>Payment Gateway</label>
                                <select>
                                    <option>Stripe</option>
                                    <option>PayPal</option>
                                    <option>Custom</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Subscription Plans</label>
                                <div className="subscription-plans">
                                    <div className="plan-item">
                                        <input type="text" placeholder="Plan Name" />
                                        <input type="number" placeholder="Price" />
                                        <button className="btn-secondary">Remove</button>
                                    </div>
                                    <button className="btn-secondary">+ Add Plan</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Withdrawal Limits</label>
                                <input type="number" placeholder="Daily Limit" />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary">Reset</button>
                            <button type="submit" className="btn-primary">Save Billing Settings</button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'integrations' && (
                <div className="settings-form">
                    <form onSubmit={handleSave}>
                        <div className="form-section">
                            <h3>Third-Party Integrations</h3>
                            <div className="integration-list">
                                <div className="integration-item">
                                    <div className="integration-info">
                                        <h4>Stripe</h4>
                                        <p>Payment processing and billing</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                                <div className="integration-item">
                                    <div className="integration-info">
                                        <h4>SendGrid</h4>
                                        <p>Email delivery and notifications</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                                <div className="integration-item">
                                    <div className="integration-info">
                                        <h4>Google Analytics</h4>
                                        <p>Platform analytics and tracking</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                                <div className="integration-item">
                                    <div className="integration-info">
                                        <h4>Slack</h4>
                                        <p>Team notifications and alerts</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary">Reset</button>
                            <button type="submit" className="btn-primary">Save Integration Settings</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
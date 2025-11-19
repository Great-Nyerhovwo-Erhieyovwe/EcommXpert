import React from 'react';
import { useSecurity } from '../../hooks/useSecurity';

const PrivacyControls: React.FC = () => {
    const { state, updatePrivacySetting } = useSecurity();
    const [activeCategory, setActiveCategory] = React.useState('all');

    const categories = ['all', 'marketing', 'analytics', 'data_sharing', 'security'];
    const categoryLabels: Record<string, string> = {
        all: 'All Settings',
        marketing: 'Marketing',
        analytics: 'Analytics',
        data_sharing: 'Data Sharing',
        security: 'Security',
    };

    const filteredSettings = activeCategory === 'all'
        ? state.privacySettings
        : state.privacySettings.filter(setting => setting.category === activeCategory);

    const handleExportData = () => {
        alert('Data export initiated. You will receive an email with your data within 24 hours.');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion initiated. You will receive a confirmation email shortly.');
        }
    };

    return (
        <div className="privacy-controls">
            <div className="privacy-header">
                <h3>Privacy Controls</h3>
                <p>Manage your privacy settings and data</p>
            </div>

            <div className="privacy-categories">
                {categories.map(category => (
                    <button
                        key={category}
                        className={activeCategory === category ? 'active' : ''}
                        onClick={() => setActiveCategory(category)}
                    >
                        {categoryLabels[category]}
                    </button>
                ))}
            </div>

            <div className="privacy-settings">
                {filteredSettings.map(setting => (
                    <div key={setting.id} className="privacy-setting">
                        <div className="setting-info">
                            <h4>{setting.name}</h4>
                            <p>{setting.description}</p>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={setting.enabled}
                                onChange={(e) => updatePrivacySetting(setting.id, e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="privacy-actions">
                <div className="action-card">
                    <h4>Data Export</h4>
                    <p>Download a copy of all your personal data</p>
                    <button className="btn-secondary" onClick={handleExportData}>
                        Export My Data
                    </button>
                </div>

                <div className="action-card">
                    <h4>Account Deletion</h4>
                    <p>Permanently delete your account and all associated data</p>
                    <button className="btn-danger" onClick={handleDeleteAccount}>
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyControls;
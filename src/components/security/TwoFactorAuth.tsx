import React from 'react';
import { useSecurity } from '../../hooks/useSecurity';

const TwoFactorAuth: React.FC = () => {
    const { state, enableTwoFactor, disableTwoFactor, generateBackupCodes } = useSecurity();
    const [showBackupCodes, setShowBackupCodes] = React.useState(false);
    const [backupCodes, setBackupCodes] = React.useState<string[]>([]);
    const [setupMethod, setSetupMethod] = React.useState<string | null>(null);

    const handleEnable2FA = async (method: string) => {
        if (method === 'backup') {
            const codes = generateBackupCodes();
            setBackupCodes(codes);
            setShowBackupCodes(true);
        } else {
            setSetupMethod(method);
            const success = await enableTwoFactor(method);
            if (success) {
                setSetupMethod(null);
            }
        }
    };

    const handleDisable2FA = (method: string) => {
        if (window.confirm('Are you sure you want to disable this 2FA method?')) {
            disableTwoFactor(method);
        }
    };

    const getMethodLabel = (type: string) => {
        switch (type) {
            case 'totp': return 'Authenticator App';
            case 'sms': return 'SMS';
            case 'email': return 'Email';
            case 'backup': return 'Backup Codes';
            default: return type;
        }
    };

    const getMethodIcon = (type: string) => {
        switch (type) {
            case 'totp': return 'mobile-alt';
            case 'sms': return 'comment-sms';
            case 'email': return 'envelope';
            case 'backup': return 'key';
            default: return 'lock';
        }
    };

    return (
        <div className="security-section">
            <div className="security-header">
                <h3>Two-Factor Authentication</h3>
                <p>Secure your account with an additional verification step</p>
            </div>

            <div className="2fa-methods">
                {state.twoFactor.map(method => (
                    <div key={method.id} className="2fa-method">
                        <div className="method-header">
                            <div className="method-icon">
                                <i className={`fas fa-${getMethodIcon(method.type)}`}></i>
                            </div>
                            <div className="method-info">
                                <h4>{getMethodLabel(method.type)}</h4>
                                <p>
                                    {method.enabled ? (
                                        method.lastUsed ? `Last used: ${new Date(method.lastUsed).toLocaleDateString()}` : 'Enabled'
                                    ) : 'Disabled'}
                                </p>
                            </div>
                            <div className="method-actions">
                                {method.enabled ? (
                                    <button
                                        className="action-btn disable"
                                        onClick={() => handleDisable2FA(method.type)}
                                    >
                                        Disable
                                    </button>
                                ) : (
                                    <button
                                        className="action-btn enable"
                                        onClick={() => handleEnable2FA(method.type)}
                                        disabled={setupMethod === method.type}
                                    >
                                        {setupMethod === method.type ? 'Setting up...' : 'Enable'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {method.type === 'backup' && method.enabled && method.backupCodes && (
                            <div className="backup-codes">
                                <p>Store these backup codes in a secure place. Each code can only be used once.</p>
                                <div className="codes-grid">
                                    {method.backupCodes.map((code, index) => (
                                        <span key={index} className="backup-code">{code}</span>
                                    ))}
                                </div>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        const newCodes = generateBackupCodes();
                                        setBackupCodes(newCodes);
                                        setShowBackupCodes(true);
                                    }}
                                >
                                    Generate New Codes
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showBackupCodes && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Backup Codes</h3>
                            <button onClick={() => setShowBackupCodes(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Store these codes in a secure place. Each code can only be used once.</p>
                            <div className="codes-display">
                                {backupCodes.map((code, index) => (
                                    <div key={index} className="code-item">{code}</div>
                                ))}
                            </div>
                            <div className="modal-actions">
                                <button className="btn-secondary" onClick={() => setShowBackupCodes(false)}>
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

export default TwoFactorAuth;
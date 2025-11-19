import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type SecurityState, type SecurityAlert } from '../types/security';
import { PRIVACY_SETTINGS } from '../lib/securityConfig';

// Mock initial state
const initialState: SecurityState = {
    twoFactor: [
        {
            id: '2fa_001',
            type: 'totp',
            enabled: true,
            verified: true,
            lastUsed: '2025-11-14T10:30:00Z',
        },
        {
            id: '2fa_002',
            type: 'sms',
            enabled: false,
            verified: false,
        },
        {
            id: '2fa_003',
            type: 'email',
            enabled: true,
            verified: true,
            lastUsed: '2025-11-10T14:20:00Z',
        },
        {
            id: '2fa_004',
            type: 'backup',
            enabled: true,
            verified: true,
            backupCodes: ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345'],
        },
    ],
    fraudEvents: [
        {
            id: 'fraud_001',
            userId: 'usr_001',
            type: 'login_attempt',
            riskScore: 45,
            status: 'low',
            ipAddress: '192.168.1.1',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            timestamp: '2025-11-14T09:15:00Z',
            resolved: true,
            resolution: 'approved',
        },
        {
            id: 'fraud_002',
            userId: 'usr_001',
            type: 'withdrawal',
            riskScore: 85,
            status: 'high',
            ipAddress: '203.0.113.42',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            timestamp: '2025-11-13T16:30:00Z',
            resolved: false,
        },
    ],
    spamReports: [
        {
            id: 'spam_001',
            contentId: 'post_001',
            contentType: 'community_post',
            reporterId: 'usr_002',
            reason: 'spam',
            status: 'confirmed',
            timestamp: '2025-11-12T11:20:00Z',
        },
    ],
    securityAlerts: [
        {
            id: 'alert_001',
            type: 'suspicious_login',
            severity: 'high',
            message: 'Login attempt from new device in London, UK',
            timestamp: '2025-11-13T16:30:00Z',
            read: false,
            resolved: false,
        },
        {
            id: 'alert_002',
            type: 'large_withdrawal',
            severity: 'medium',
            message: 'Withdrawal request of $1,500 requires approval',
            timestamp: '2025-11-13T16:30:00Z',
            read: true,
            resolved: false,
        },
        {
            id: 'alert_003',
            type: 'new_device',
            severity: 'low',
            message: 'New device logged in from San Francisco, CA',
            timestamp: '2025-11-10T14:20:00Z',
            read: true,
            resolved: true,
        },
    ],
    privacySettings: PRIVACY_SETTINGS,
    walletSecurity: {
        withdrawalApprovals: true,
        transactionNotifications: true,
        withdrawalLimits: 5000,
        suspiciousActivityAlerts: true,
    },
    lastSecurityCheck: '2025-11-14T00:00:00Z',
};

const SecurityContext = createContext<{
    state: SecurityState;
    enableTwoFactor: (type: string) => Promise<boolean>;
    disableTwoFactor: (type: string) => void;
    resolveFraudEvent: (eventId: string, resolution: 'approved' | 'blocked') => void;
    updatePrivacySetting: (id: string, enabled: boolean) => void;
    markAlertAsRead: (alertId: string) => void;
    markAlertAsResolved: (alertId: string) => void;
    generateBackupCodes: () => string[];
}>({
    state: initialState,
    enableTwoFactor: async () => false,
    disableTwoFactor: () => { },
    resolveFraudEvent: () => { },
    updatePrivacySetting: () => { },
    markAlertAsRead: () => { },
    markAlertAsResolved: () => { },
    generateBackupCodes: () => [],
});

export const useSecurity = () => useContext(SecurityContext);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<SecurityState>(initialState);

    const enableTwoFactor = async (type: string): Promise<boolean> => {
        // Simulate 2FA setup process
        await new Promise(resolve => setTimeout(resolve, 2000));

        setState(prev => ({
            ...prev,
            twoFactor: prev.twoFactor.map(method =>
                method.type === type ? { ...method, enabled: true, verified: true, lastUsed: new Date().toISOString() } : method
            ),
        }));

        // Add success alert
        const newAlert: SecurityAlert = {
            id: `alert_${Date.now()}`,
            type: 'new_device',
            severity: 'low',
            message: `Two-factor authentication enabled for ${type.toUpperCase()}`,
            timestamp: new Date().toISOString(),
            read: false,
            resolved: false,
        };

        setState(prev => ({
            ...prev,
            securityAlerts: [newAlert, ...prev.securityAlerts],
        }));

        return true;
    };

    const disableTwoFactor = (type: string) => {
        setState(prev => ({
            ...prev,
            twoFactor: prev.twoFactor.map(method =>
                method.type === type ? { ...method, enabled: false, verified: false } : method
            ),
        }));
    };

    const resolveFraudEvent = (eventId: string, resolution: 'approved' | 'blocked') => {
        setState(prev => ({
            ...prev,
            fraudEvents: prev.fraudEvents.map(event =>
                event.id === eventId ? { ...event, resolved: true, resolution } : event
            ),
        }));
    };

    const updatePrivacySetting = (id: string, enabled: boolean) => {
        setState(prev => ({
            ...prev,
            privacySettings: prev.privacySettings.map(setting =>
                setting.id === id ? { ...setting, enabled } : setting
            ),
        }));
    };

    const markAlertAsRead = (alertId: string) => {
        setState(prev => ({
            ...prev,
            securityAlerts: prev.securityAlerts.map(alert =>
                alert.id === alertId ? { ...alert, read: true } : alert
            ),
        }));
    };

    const markAlertAsResolved = (alertId: string) => {
        setState(prev => ({
            ...prev,
            securityAlerts: prev.securityAlerts.map(alert =>
                alert.id === alertId ? { ...alert, resolved: true } : alert
            ),
        }));
    };

    const generateBackupCodes = (): string[] => {
        const codes = Array.from({ length: 5 }, () =>
            Math.random().toString(36).substring(2, 8).toUpperCase()
        );

        setState(prev => ({
            ...prev,
            twoFactor: prev.twoFactor.map(method =>
                method.type === 'backup'
                    ? { ...method, enabled: true, verified: true, backupCodes: codes }
                    : method
            ),
        }));

        return codes;
    };

    const contextValue = {
        state,
        enableTwoFactor,
        disableTwoFactor,
        resolveFraudEvent,
        updatePrivacySetting,
        markAlertAsRead,
        markAlertAsResolved,
        generateBackupCodes,
    };

    return React.createElement(SecurityContext.Provider, { value: contextValue }, children);
};

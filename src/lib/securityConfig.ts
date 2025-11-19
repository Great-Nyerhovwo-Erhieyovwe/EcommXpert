import { type SecurityConfig, type PrivacySetting } from '../types/security';

export const SECURITY_CONFIG: SecurityConfig = {
    maxLoginAttempts: 5,
    sessionTimeout: 30, // minutes
    withdrawalApprovalThreshold: 1000, // USD
    fraudRiskThreshold: 75, // 0-100
    spamConfidenceThreshold: 80, // 0-100
};

export const PRIVACY_SETTINGS: PrivacySetting[] = [
    {
        id: 'ps_001',
        name: 'Marketing Emails',
        description: 'Receive promotional emails and updates',
        enabled: true,
        category: 'marketing',
    },
    {
        id: 'ps_002',
        name: 'Analytics Data',
        description: 'Share anonymous usage data to improve the platform',
        enabled: true,
        category: 'analytics',
    },
    {
        id: 'ps_003',
        name: 'Third-Party Sharing',
        description: 'Share data with trusted partners for personalized offers',
        enabled: false,
        category: 'data_sharing',
    },
    {
        id: 'ps_004',
        name: 'Security Alerts',
        description: 'Receive notifications about suspicious activity',
        enabled: true,
        category: 'security',
    },
    {
        id: 'ps_005',
        name: 'Community Visibility',
        description: 'Make your profile visible in the community',
        enabled: true,
        category: 'data_sharing',
    },
];
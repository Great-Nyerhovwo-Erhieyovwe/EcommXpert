export interface TwoFactorMethod {
    id: string;
    type: 'totp' | 'sms' | 'email' | 'backup';
    enabled: boolean;
    verified: boolean;
    lastUsed?: string;
    backupCodes?: string[];
}

export interface FraudEvent {
    id: string;
    userId: string;
    type: 'login_attempt' | 'withdrawal' | 'investment' | 'account_change';
    riskScore: number;
    status: 'low' | 'medium' | 'high' | 'blocked';
    ipAddress: string;
    userAgent: string;
    timestamp: string;
    resolved: boolean;
    resolution?: 'approved' | 'blocked' | 'reviewed';
}

export interface SpamReport {
    id: string;
    contentId: string;
    contentType: 'community_post' | 'review' | 'message' | 'support_ticket';
    reporterId: string;
    reason: 'spam' | 'inappropriate' | 'fake' | 'other';
    status: 'pending' | 'confirmed' | 'rejected';
    timestamp: string;
}

export interface SecurityAlert {
    id: string;
    type: 'suspicious_login' | 'large_withdrawal' | 'multiple_failed_logins' | 'new_device';
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: string;
    read: boolean;
    resolved: boolean;
}

export interface PrivacySetting {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    category: 'data_sharing' | 'marketing' | 'analytics' | 'security';
}

export interface SecurityState {
    twoFactor: TwoFactorMethod[];
    fraudEvents: FraudEvent[];
    spamReports: SpamReport[];
    securityAlerts: SecurityAlert[];
    privacySettings: PrivacySetting[];
    walletSecurity: {
        withdrawalApprovals: boolean;
        transactionNotifications: boolean;
        withdrawalLimits: number;
        suspiciousActivityAlerts: boolean;
    };
    lastSecurityCheck: string;
}

export interface SecurityConfig {
    maxLoginAttempts: number;
    sessionTimeout: number;
    withdrawalApprovalThreshold: number;
    fraudRiskThreshold: number;
    spamConfidenceThreshold: number;
}
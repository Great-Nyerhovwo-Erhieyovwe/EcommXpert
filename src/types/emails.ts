export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    content: string;
    category: 'welcome' | 'course' | 'investment' | 'security' | 'marketing';
    trigger: 'signup' | 'course_complete' | 'investment_made' | 'login_streak' | 'withdrawal_request' | 'security_alert';
    isActive: boolean;
    lastSent: string | null;
    sends: number;
    opens: number;
    clicks: number;
    unsubscribes: number;
}

export interface AutomationWorkflow {
    id: string;
    name: string;
    trigger: 'signup' | 'course_complete' | 'investment_made' | 'login_streak' | 'withdrawal_request' | 'security_alert' | 'inactivity';
    delay: number; // hours
    sequence: string[]; // array of template IDs
    isActive: boolean;
    totalUsers: number;
    completed: number;
}

export interface EmailCampaign {
    id: string;
    name: string;
    subject: string;
    content: string;
    segment: 'all_users' | 'new_users' | 'inactive_users' | 'investors' | 'learners';
    status: 'draft' | 'scheduled' | 'sent' | 'failed';
    scheduledAt: string;
    sentAt: string | null;
    opens: number;
    clicks: number;
    recipients: number;
}

export interface EmailPreference {
    id: string;
    userId: string;
    category: 'welcome' | 'course' | 'investment' | 'security' | 'marketing';
    enabled: boolean;
    lastUpdated: string;
}

export interface EmailAnalytics {
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
    last7Days: {
        sent: number;
        opened: number;
        clicked: number;
    };
}

export interface EmailState {
    templates: EmailTemplate[];
    workflows: AutomationWorkflow[];
    campaigns: EmailCampaign[];
    preferences: EmailPreference[];
    analytics: EmailAnalytics;
    lastSync: string;
}
import type { EmailTemplate, AutomationWorkflow, EmailCampaign, EmailPreference, EmailAnalytics } from '../types/emails';

// Pre-built Email Templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
    // Welcome Sequence
    {
        id: 'tpl_001',
        name: 'Welcome Email',
        subject: 'Welcome to EcommXpert! Your Journey Begins Now',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Welcome to EcommXpert, {{firstName}}!</h2>
        <p>Thank you for joining our community of e-commerce learners, creators, and investors.</p>
        <p>Here's what you can expect:</p>
        <ul>
          <li>Personalized learning path based on your goals</li>
          <li>Access to expert-led courses</li>
          <li>Realistic demo stores to practice</li>
          <li>Opportunities to earn passive income</li>
        </ul>
        <p><strong>Start your journey:</strong></p>
        <p><a href="{{dashboardUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Visit Your Dashboard</a></p>
        <p>Need help? Reply to this email or visit our <a href="{{helpUrl}}">Help Center</a>.</p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        category: 'welcome',
        trigger: 'signup',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },
    {
        id: 'tpl_002',
        name: 'First Course Reminder',
        subject: 'Your First Course is Waiting, {{firstName}}!',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Don't miss your first lesson, {{firstName}}!</h2>
        <p>You've joined EcommXpert, but your first course is still waiting.</p>
        <p>Complete your first module in the next 48 hours to unlock your first badge and earn 100 XP!</p>
        <p><strong>Recommended course:</strong> "How to Find Winning Products"</p>
        <p><a href="{{learningUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Start Learning Now</a></p>
        <p>Remember: The most successful e-commerce entrepreneurs start by taking action.</p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        category: 'course',
        trigger: 'signup',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },

    // Course Completion
    {
        id: 'tpl_003',
        name: 'Course Completed',
        subject: 'Congratulations, {{firstName}}! You completed {{courseName}}!',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Congratulations, {{firstName}}!</h2>
        <p>You've successfully completed <strong>{{courseName}}</strong>!</p>
        <p>You've earned:</p>
        <ul>
          <li>500 XP points</li>
          <li>Course Completion Badge</li>
          <li>Access to advanced modules</li>
        </ul>
        <p>Your next recommended course: <strong>{{nextCourse}}</strong></p>
        <p><a href="{{learningUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Continue Learning</a></p>
        <p>Keep up the great work! Your dedication is what separates successful e-commerce entrepreneurs from the rest.</p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        category: 'course',
        trigger: 'course_complete',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },

    // Investment Updates
    {
        id: 'tpl_004',
        name: 'Investment Made',
        subject: 'Your investment in {{poolName}} has been confirmed, {{firstName}}!',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Your investment in {{poolName}} has been confirmed, {{firstName}}!</h2>
        <p>You've invested <strong>$ {{ amount }}</strong> in the {{poolName}}.</p>
        <p>Based on historical performance, your estimated return over the next 30 days is {{roi}}%.</p>
        <p>Track your investment progress in your <a href="{{dashboardUrl}}">Dashboard</a>.</p>
        <p>Remember: Diversification is key. Consider investing in multiple pools to spread your risk.</p>
        <p><a href="{{investmentsUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Explore More Pools</a></p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        category: 'investment',
        trigger: 'investment_made',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },
    {
        id: 'tpl_005',
        name: 'Weekly Investment Update',
        subject: 'Your {{poolName}} Portfolio Update - {{week}}',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Your {{poolName}} Portfolio Update - {{week}}</h2>
        <p>Here's how your investment is performing:</p>
        <ul>
          <li>Current Value:$ {{ currentValue }}</li>
          <li>Change This Week: {{changeAmount}} ({{changePercent}}%)</li>
          <li>Estimated ROI: {{roi}}%</li>
        </ul>
        <p>Performance trend: {{chartUrl}}</p>
        <p>Did you know? The {{poolName}} has outperformed the market average by {{outperform}}% this quarter.</p>
        <p><a href="{{dashboardUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">View Full Details</a></p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        category: 'investment',
        trigger: 'security_alert',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },

    // Security Alerts
    {
        id: 'tpl_006',
        name: 'Security Alert',
        subject: 'Security Alert: Suspicious Activity Detected on Your Account',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #ef4444;">Security Alert: Suspicious Activity Detected</h2>
        <p>Dear {{firstName}},</p>
        <p>We detected unusual activity on your account:</p>
        <ul>
          <li><strong>Location:</strong> {{location}}</li>
          <li><strong>Device:</strong> {{device}}</li>
          <li><strong>Time:</strong> {{time}}</li>
        </ul>
        <p>If this was you, please ignore this message.</p>
        <p>If this was not you, please <a href="{{securityUrl}}">secure your account immediately</a>.</p>
        <p>For your safety, we've temporarily restricted access to sensitive features until you verify this activity.</p>
        <p>Best regards,<br>The EcommXpert Security Team</p>
      </div>
    `,
        category: 'security',
        trigger: 'security_alert',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },

    // Marketing
    {
        id: 'tpl_007',
        name: 'Monthly Newsletter',
        subject: 'Your Monthly EcommXpert Update: New Features, Success Stories & More',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Your Monthly EcommXpert Update</h2>
        <p>Hi {{firstName}},</p>
        <p>Here's what's new this month:</p>
        <ul>
          <li><strong>New Feature:</strong> AI Product Recommender is now live!</li>
          <li><strong>Success Story:</strong> Sarah Johnson grew her store to $50k/month</li>
          <li><strong>Upcoming Event:</strong> Live Q&A with top investor Michael Chen</li>
          <li><strong>Special Offer:</strong> 20% off Premium Course Bundle</li>
        </ul>
        <p><a href="{{newsletterUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Read Full Update</a></p>
        <p>Thank you for being part of our community!</p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        category: 'marketing',
        trigger: 'security_alert',
        isActive: true,
        lastSent: null,
        sends: 0,
        opens: 0,
        clicks: 0,
        unsubscribes: 0,
    },
];

// Automation Workflows
export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
    {
        id: 'wf_001',
        name: 'New User Welcome Sequence',
        trigger: 'signup',
        delay: 0,
        sequence: ['tpl_001', 'tpl_002'],
        isActive: true,
        totalUsers: 1240,
        completed: 890,
    },
    {
        id: 'wf_002',
        name: 'Course Completion Boost',
        trigger: 'course_complete',
        delay: 24,
        sequence: ['tpl_003'],
        isActive: true,
        totalUsers: 680,
        completed: 680,
    },
    {
        id: 'wf_003',
        name: 'Investment Follow-up',
        trigger: 'investment_made',
        delay: 7,
        sequence: ['tpl_005'],
        isActive: true,
        totalUsers: 240,
        completed: 240,
    },
    {
        id: 'wf_004',
        name: 'Streak Reminder',
        trigger: 'login_streak',
        delay: 0,
        sequence: ['tpl_008'],
        isActive: true,
        totalUsers: 890,
        completed: 890,
    },
    {
        id: 'wf_005',
        name: 'Inactive User Reactivation',
        trigger: 'inactivity',
        delay: 336, // 14 days
        sequence: ['tpl_009', 'tpl_010'],
        isActive: true,
        totalUsers: 1560,
        completed: 120,
    },
];

// Campaigns
export const EMAIL_CAMPAIGNS: EmailCampaign[] = [
    {
        id: 'cmp_001',
        name: 'Monthly Newsletter',
        subject: 'Your Monthly EcommXpert Update: New Features, Success Stories & More',
        content: EMAIL_TEMPLATES.find(t => t.id === 'tpl_007')?.content || '',
        segment: 'all_users',
        status: 'sent',
        scheduledAt: '2025-11-01T10:00:00Z',
        sentAt: '2025-11-01T10:30:00Z',
        opens: 4200,
        clicks: 840,
        recipients: 12400,
    },
    {
        id: 'cmp_002',
        name: 'Premium Course Bundle Offer',
        subject: 'Exclusive Offer: 20% Off Premium Course Bundle',
        content: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #6366f1;">Exclusive Offer: 20% Off Premium Course Bundle</h2>
        <p>Hi {{firstName}},</p>
        <p>As a valued member of EcommXpert, we're offering you an exclusive 20% discount on our Premium Course Bundle.</p>
        <p>This bundle includes:</p>
        <ul>
          <li>Scaling to $50k/month</li>
          <li>Advanced Analytics Mastery</li>
          <li>AI-Powered Product Research</li>
          <li>Private Mentorship Sessions</li>
        </ul>
        <p>Regular price: $199 → <strong>Special price: $159</strong></p>
        <p><a href="{{offerUrl}}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Claim Your Discount Now</a></p>
        <p>Offer expires in 72 hours.</p>
        <p>Best regards,<br>The EcommXpert Team</p>
      </div>
    `,
        segment: 'learners',
        status: 'scheduled',
        scheduledAt: '2025-11-20T10:00:00Z',
        sentAt: null,
        opens: 0,
        clicks: 0,
        recipients: 3200,
    },
];

// Email Preferences
export const EMAIL_PREFERENCES: EmailPreference[] = [
    { id: 'pref_001', userId: 'usr_001', category: 'welcome', enabled: true, lastUpdated: '2025-11-14' },
    { id: 'pref_002', userId: 'usr_001', category: 'course', enabled: true, lastUpdated: '2025-11-14' },
    { id: 'pref_003', userId: 'usr_001', category: 'investment', enabled: true, lastUpdated: '2025-11-14' },
    { id: 'pref_004', userId: 'usr_001', category: 'security', enabled: true, lastUpdated: '2025-11-14' },
    { id: 'pref_005', userId: 'usr_001', category: 'marketing', enabled: true, lastUpdated: '2025-11-14' },
];

// Email Analytics
export const EMAIL_ANALYTICS: EmailAnalytics = {
    totalSent: 12400,
    totalOpened: 8900,
    totalClicked: 2400,
    openRate: 71.8,
    clickRate: 19.4,
    unsubscribeRate: 0.8,
    last7Days: {
        sent: 2400,
        opened: 1850,
        clicked: 480,
    },
};
import { createContext, useContext, useState, type ReactNode } from 'react';
// import type { EmailState, EmailTemplate, AutomationWorkflow, EmailCampaign, EmailPreference, EmailAnalytics } from '../types/emails';
import type { EmailState, EmailCampaign, EmailPreference } from '../types/emails';
import { EMAIL_TEMPLATES, AUTOMATION_WORKFLOWS, EMAIL_CAMPAIGNS, EMAIL_PREFERENCES, EMAIL_ANALYTICS } from '../lib/emailConfig';
import React from 'react';

const initialState: EmailState = {
    templates: EMAIL_TEMPLATES,
    workflows: AUTOMATION_WORKFLOWS,
    campaigns: EMAIL_CAMPAIGNS,
    preferences: EMAIL_PREFERENCES,
    analytics: EMAIL_ANALYTICS,
    lastSync: new Date().toISOString(),
};

const EmailContext = createContext<{
    state: EmailState;
    dispatch: React.Dispatch<Partial<EmailState>>;
    sendEmail: (templateId: string, userId: string, personalization: Record<string, string>) => Promise<boolean>;
    updatePreference: (userId: string, category: EmailPreference['category'], enabled: boolean) => void;
    scheduleCampaign: (campaignId: string, scheduledAt: string) => void;
    triggerWorkflow: (workflowId: string, userId: string) => void;
}>({
    state: initialState,
    dispatch: () => null,
    sendEmail: async () => false,
    updatePreference: () => { },
    scheduleCampaign: () => { },
    triggerWorkflow: () => { },
});

export const useEmail = () => useContext(EmailContext);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<EmailState>(initialState);

    const dispatch = (partial: Partial<EmailState>) => {
        setState((prev) => ({ ...prev, ...partial }));
    };

    const sendEmail = async (templateId: string, _userId: string, _personalization: Record<string, string>): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const template = state.templates.find(t => t.id === templateId);
        if (!template) return false;

        // Update template stats
        const updatedTemplates = state.templates.map(t =>
            t.id === templateId
                ? {
                    ...t,
                    sends: t.sends + 1,
                    lastSent: new Date().toISOString()
                }
                : t
        );

        // Update analytics
        const updatedAnalytics = {
            ...state.analytics,
            totalSent: state.analytics.totalSent + 1,
            last7Days: {
                ...state.analytics.last7Days,
                sent: state.analytics.last7Days.sent + 1,
            }
        };

        dispatch({
            templates: updatedTemplates,
            analytics: updatedAnalytics,
            lastSync: new Date().toISOString(),
        });

        // Simulate success
        return true;
    };

    const updatePreference = (userId: string, category: EmailPreference['category'], enabled: boolean) => {
        const existingPreference = state.preferences.find(p => p.userId === userId && p.category === category);

        if (existingPreference) {
            const updatedPreferences = state.preferences.map(p =>
                p.userId === userId && p.category === category
                    ? { ...p, enabled, lastUpdated: new Date().toISOString() }
                    : p
            );
            dispatch({ preferences: updatedPreferences });
        } else {
            const newPreference: EmailPreference = {
                id: `pref_${Date.now()}`,
                userId,
                category,
                enabled,
                lastUpdated: new Date().toISOString(),
            };
            dispatch({ preferences: [...state.preferences, newPreference] });
        }
    };

    const scheduleCampaign = (campaignId: string, scheduledAt: string) => {
        const campaign = state.campaigns.find(c => c.id === campaignId);
        if (!campaign) return;

        const updatedCampaigns = state.campaigns.map(
            (c): EmailCampaign =>
                c.id === campaignId
                    ? { ...c, status: 'scheduled', scheduledAt }
                    : c
        );

        dispatch({ campaigns: updatedCampaigns });
    };

    const triggerWorkflow = (workflowId: string, userId: string) => {
        const workflow = state.workflows.find(w => w.id === workflowId);
        if (!workflow || !workflow.isActive) return;

        // Send each template in sequence
        workflow.sequence.forEach(templateId => {
            const template = state.templates.find(t => t.id === templateId);
            if (template) {
                // In real implementation, this would fetch user data and personalize
                const personalization = {
                    firstName: 'User',
                    dashboardUrl: 'https://ecommxpert.onrender.com/dashboard',
                    learningUrl: 'https://ecommxpert.onrender.com/learning',
                    investmentsUrl: 'https://ecommxpert.onrender.com/investments',
                    securityUrl: 'https://ecommxpert.onrender.com/security',
                    helpUrl: 'https://ecommxpert.onrender.com/help',
                    courseName: 'Foundational Course',
                    nextCourse: 'Advanced Course',
                    poolName: 'Starter Pool',
                    amount: '100',
                    roi: '12%',
                    currentValue: '112',
                    changeAmount: '+12',
                    changePercent: '+12%',
                    chartUrl: 'https://ecommxpert.onrender.com/chart',
                    outperform: '18',
                    location: 'New York, USA',
                    device: 'iPhone 15',
                    time: new Date().toLocaleString(),
                    week: 'November 14, 2025',
                    offerUrl: 'https://ecommxpert.onrender.com/offer',
                    newsletterUrl: 'https://ecommxpert.onrender.com/newsletter',
                };

                sendEmail(templateId, userId, personalization).catch(console.error);
            }
        });

        // Update workflow stats
        const updatedWorkflows = state.workflows.map(w =>
            w.id === workflowId
                ? { ...w, completed: w.completed + 1 }
                : w
        );

        dispatch({ workflows: updatedWorkflows });
    };

    // return (
    //     <EmailContext.Provider
    //         value={{
    //             state,
    //             dispatch,
    //             sendEmail,
    //             updatePreference,
    //             scheduleCampaign,
    //             triggerWorkflow,
    //         }}
    //     >
    //         {children}
    //     </Email.Provider>
    // );

    const contextValue = {
            state,
            dispatch,
            sendEmail,
            updatePreference,
            scheduleCampaign,
            triggerWorkflow,
        };
    
        return React.createElement(EmailContext.Provider, { value: contextValue }, children);
};

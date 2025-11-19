import React from 'react';
import { useEmail } from '../../hooks/useEmail';

const CourseReminders: React.FC = () => {
    const { state, triggerWorkflow } = useEmail();
    const [activeTemplate, setActiveTemplate] = React.useState('tpl_003');

    const template = state.templates.find(t => t.id === activeTemplate);

    const handleTrigger = () => {
        triggerWorkflow('wf_002', 'usr_001');
    };

    return (
        <div className="email-section">
            <div className="email-header">
                <h3>Course Completion Reminders</h3>
                <p>Automated emails after course completion</p>
            </div>

            <div className="template-selector">
                <select
                    value={activeTemplate}
                    onChange={(e) => setActiveTemplate(e.target.value)}
                >
                    {state.templates.filter(t => t.category === 'course').map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            <div className="template-preview">
                <h4>{template?.name}</h4>
                <div className="email-content">
                    <h3>{template?.subject}</h3>
                    <div dangerouslySetInnerHTML={{ __html: template?.content || '' }} />
                </div>
            </div>

            <div className="email-stats">
                <div className="stat">
                    <span>Sends</span>
                    <strong>{template?.sends.toLocaleString()}</strong>
                </div>
                <div className="stat">
                    <span>Opens</span>
                    <strong>{template?.opens.toLocaleString()}</strong>
                </div>
                <div className="stat">
                    <span>Clicks</span>
                    <strong>{template?.clicks.toLocaleString()}</strong>
                </div>
                <div className="stat">
                    <span>Unsubscribes</span>
                    <strong>{template?.unsubscribes.toLocaleString()}</strong>
                </div>
            </div>

            <div className="email-actions">
                <button className="btn-primary" onClick={handleTrigger}>
                    Send Test Email
                </button>
                <button className="btn-secondary">
                    Customize Template
                </button>
            </div>
        </div>
    );
};

export default CourseReminders;
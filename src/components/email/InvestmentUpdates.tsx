import React from 'react';
import { useEmail } from '../../hooks/useEmail';

const InvestmentUpdates: React.FC = () => {
    const { state, triggerWorkflow } = useEmail();
    const [activeWorkflow, setActiveWorkflow] = React.useState('wf_003');

    const workflow = state.workflows.find(w => w.id === activeWorkflow);

    const handleTrigger = () => {
        triggerWorkflow(activeWorkflow, 'usr_001');
    };

    return (
        <div className="email-section">
            <div className="email-header">
                <h3>Investment Updates</h3>
                <p>Automated email updates for investors</p>
            </div>

            <div className="workflow-selector">
                <select
                    value={activeWorkflow}
                    onChange={(e) => setActiveWorkflow(e.target.value)}
                >
                    {state.workflows.filter(w => w.trigger === 'investment_made').map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                </select>
            </div>

            <div className="workflow-details">
                <h4>{workflow?.name}</h4>
                <p>Trigger: {workflow?.trigger.replace('_', ' ').toUpperCase()}</p>
                <p>Delay: {workflow?.delay} hours</p>
                <p>Active: {workflow?.isActive ? 'Yes' : 'No'}</p>
                <p>Users: {workflow?.totalUsers.toLocaleString()} | Completed: {workflow?.completed.toLocaleString()}</p>
            </div>

            <div className="sequence-list">
                <h5>Sequence:</h5>
                <ul>
                    {workflow?.sequence.map(templateId => {
                        const template = state.templates.find(t => t.id === templateId);
                        return (
                            <li key={templateId}>
                                {template?.name} - {template?.trigger.replace('_', ' ')}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="email-actions">
                <button className="btn-primary" onClick={handleTrigger}>
                    Test Workflow
                </button>
                <button className="btn-secondary">
                    Edit Schedule
                </button>
            </div>
        </div>
    );
};

export default InvestmentUpdates;
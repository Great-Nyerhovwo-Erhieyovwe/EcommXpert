import React from 'react';

const SupportSection: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('help-center');

    const helpTopics = [
        { title: 'Getting Started', icon: 'book' },
        { title: 'Payment & Billing', icon: 'credit-card' },
        { title: 'Investment Pools', icon: 'coins' },
        { title: 'Course Progress', icon: 'graduation-cap' },
        { title: 'Troubleshooting', icon: 'cog' },
    ];

    const [newTicket, setNewTicket] = React.useState({ subject: '', message: '' });

    const handleCreateTicket = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock API call
        alert('Ticket created successfully! We\'ll get back to you within 24 hours.');
        setNewTicket({ subject: '', message: '' });
    };

    return (
        <div className="support-section">
            <h2>Support</h2>

            <div className="support-tabs">
                <button
                    className={activeTab === 'help-center' ? 'active' : ''}
                    onClick={() => setActiveTab('help-center')}
                >
                    Help Center
                </button>
                <button
                    className={activeTab === 'tickets' ? 'active' : ''}
                    onClick={() => setActiveTab('tickets')}
                >
                    Tickets
                </button>
                <button
                    className={activeTab === 'chat' ? 'active' : ''}
                    onClick={() => setActiveTab('chat')}
                >
                    Live Chat
                </button>
            </div>

            {activeTab === 'help-center' && (
                <div className="help-center">
                    <h3>Popular Topics</h3>
                    <div className="help-grid">
                        {helpTopics.map((topic, i) => (
                            <div key={i} className="help-card">
                                <i className={`fas fa-${topic.icon} fa-2x`}></i>
                                <h4>{topic.title}</h4>
                                <button className="btn-outline">Learn More</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'tickets' && (
                <div className="tickets-section">
                    <div className="create-ticket">
                        <h3>Create New Ticket</h3>
                        <form onSubmit={handleCreateTicket}>
                            <input
                                type="text"
                                placeholder="Subject"
                                value={newTicket.subject}
                                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Describe your issue..."
                                value={newTicket.message}
                                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                                required
                            ></textarea>
                            <button type="submit" className="btn-primary">Submit Ticket</button>
                        </form>
                    </div>

                    <div className="ticket-history">
                        <h3>Recent Tickets</h3>
                        <div className="ticket-item">
                            <h4>Payment Issue</h4>
                            <p className="ticket-status">Resolved</p>
                            <p className="ticket-date">2 days ago</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'chat' && (
                <div className="chat-section">
                    <div className="chat-header">
                        <h3>Live Support</h3>
                        <span className="status online">Online</span>
                    </div>
                    <div className="chat-messages">
                        <div className="message bot">
                            <p>Hello! How can I help you today?</p>
                        </div>
                        <div className="message user">
                            <p>Hi, I'm having trouble with my investment portfolio.</p>
                        </div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type your message..." />
                        <button className="btn-primary">Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportSection;
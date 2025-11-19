import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const ContentModeration: React.FC = () => {
    const { state } = useAdmin();
    const [activeTab, setActiveTab] = React.useState('community');

    const reportedPosts = [
        { id: 'rp_001', type: 'community', content: 'Inappropriate comment in forum', reportedBy: 'user_123', reportedAt: '2025-11-14T10:30:00Z' },
        { id: 'rp_002', type: 'review', content: 'Fake product review', reportedBy: 'user_456', reportedAt: '2025-11-13T14:20:00Z' },
        { id: 'rp_003', type: 'message', content: 'Spam message in chat', reportedBy: 'user_789', reportedAt: '2025-11-12T16:45:00Z' },
    ];

    const supportTickets = [
        { id: 'st_001', user: 'Sarah Johnson', subject: 'Payment Issue', status: 'open', priority: 'high', createdAt: '2025-11-14T09:15:00Z' },
        { id: 'st_002', user: 'Michael Chen', subject: 'Course Access Problem', status: 'in-progress', priority: 'medium', createdAt: '2025-11-13T11:30:00Z' },
        { id: 'st_003', user: 'Emma Rodriguez', subject: 'Investment Dispute', status: 'resolved', priority: 'high', createdAt: '2025-11-12T13:45:00Z' },
    ];

    const pendingReviews = [
        { id: 'rv_001', product: 'Smart Fitness Tracker', reviewer: 'David Kim', rating: 4.5, status: 'pending', submittedAt: '2025-11-14T08:20:00Z' },
        { id: 'rv_002', product: 'Eco-Friendly Water Bottle', reviewer: 'James Wilson', rating: 5.0, status: 'pending', submittedAt: '2025-11-13T15:10:00Z' },
    ];

    return (
        <div className="content-moderation">
            <div className="admin-header-actions">
                <h3>Content Moderation</h3>
                <div className="moderation-tabs">
                    <button
                        className={activeTab === 'community' ? 'active' : ''}
                        onClick={() => setActiveTab('community')}
                    >
                        Community Posts
                    </button>
                    <button
                        className={activeTab === 'reviews' ? 'active' : ''}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                    <button
                        className={activeTab === 'tickets' ? 'active' : ''}
                        onClick={() => setActiveTab('tickets')}
                    >
                        Support Tickets
                    </button>
                </div>
            </div>

            {activeTab === 'community' && (
                <div className="moderation-grid">
                    {reportedPosts.map(post => (
                        <div key={post.id} className="moderation-card">
                            <div className="moderation-header">
                                <h4>Reported: {post.type}</h4>
                                <span className="moderation-type">{post.type}</span>
                            </div>
                            <p className="moderation-content">{post.content}</p>
                            <div className="moderation-meta">
                                <span>Reported by: {post.reportedBy}</span>
                                <span>{new Date(post.reportedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="moderation-actions">
                                <button className="action-btn approve">Approve</button>
                                <button className="action-btn remove">Remove</button>
                                <button className="action-btn escalate">Escalate</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="moderation-grid">
                    {pendingReviews.map(review => (
                        <div key={review.id} className="moderation-card">
                            <div className="moderation-header">
                                <h4>{review.product}</h4>
                                <span className="rating">{review.rating} ★</span>
                            </div>
                            <p className="moderation-content">Review submitted by {review.reviewer}</p>
                            <div className="moderation-meta">
                                <span>Status: {review.status}</span>
                                <span>{new Date(review.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="moderation-actions">
                                <button className="action-btn approve">Approve</button>
                                <button className="action-btn reject">Reject</button>
                                <button className="action-btn edit">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'tickets' && (
                <div className="moderation-grid">
                    {supportTickets.map(ticket => (
                        <div key={ticket.id} className="moderation-card">
                            <div className="moderation-header">
                                <h4>{ticket.subject}</h4>
                                <span className={`priority ${ticket.priority}`}>{ticket.priority}</span>
                            </div>
                            <p className="moderation-content">From: {ticket.user}</p>
                            <div className="moderation-meta">
                                <span>Status: {ticket.status}</span>
                                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="moderation-actions">
                                <button className="action-btn assign">Assign</button>
                                <button className="action-btn resolve">Resolve</button>
                                <button className="action-btn escalate">Escalate</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentModeration;
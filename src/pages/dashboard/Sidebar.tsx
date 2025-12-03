import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const { state } = useDashboard();
    const [activeSection, setActiveSection] = React.useState('overview');

    const sections = [
        { id: 'overview', label: 'Overview', icon: 'home' },
        { id: 'learning', label: 'Learning', icon: 'graduation-cap' },
        { id: 'investments', label: 'Investments', icon: 'coins' },
        { id: 'marketplace', label: 'Marketplace', icon: 'store' },
        { id: 'analytics', label: 'Analytics', icon: 'chart-bar' },
        { id: 'wallet', label: 'Wallet', icon: 'wallet' },
        { id: 'transactions', label: 'Transactions', icon: 'history' },
        { id: 'community', label: 'Community', icon: 'users' },
        { id: 'support', label: 'Support', icon: 'headset' },
        { id: 'settings', label: 'Settings', icon: 'cog' },
    ];

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
                <div className="user-avatar">
                    <img src={state.user.avatar} alt={state.user.firstName} />
                </div>
                <div className="user-info">
                    <h3>{state.user.firstName} {state.user.lastName}</h3>
                    <p className="xp-badge">🌟 {state.user.xp} XP • {state.user.streak} day streak</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {sections.map((section) => (
                        <li key={section.id}>
                            <Link
                                to={`/${section.id}`}
                                className={activeSection === section.id ? 'active' : ''}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <i className={`fas fa-${section.icon}`}></i>
                                <span>{section.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
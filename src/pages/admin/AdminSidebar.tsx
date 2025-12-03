import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const [activeSection, setActiveSection] = React.useState('overview');

    const sections = [
        { id: 'overview', label: 'Overview', icon: 'chart-line' },
        { id: 'users', label: 'User Management', icon: 'users' },
        { id: 'courses', label: 'Course Management', icon: 'book' },
        { id: 'investments', label: 'Investment Pools', icon: 'coins' },
        { id: 'moderation', label: 'Content Moderation', icon: 'shield-alt' },
        { id: 'notifications', label: 'Notifications', icon: 'bell' },
        { id: 'analytics', label: 'Platform Analytics', icon: 'chart-bar' },
        { id: 'settings', label: 'Settings', icon: 'cog' },
    ];

    React.useEffect(() => {
        const path = location.pathname.split('/').pop() || 'overview';
        setActiveSection(path);
    }, [location]);

    return (
        <aside className="admin-sidebar">
            <div className="admin-logo">
                <h3>EcommXpert Admin</h3>
            </div>

            <nav className="admin-nav">
                <ul>
                    {sections.map((section) => (
                        <li key={section.id}>
                            <Link
                                to={`/admin/${section.id}`}
                                className={activeSection === section.id ? 'active' : ''}
                            >
                                <i className={`fas fa-${section.icon}`}></i>
                                <span>{section.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="admin-footer">
                <div className="admin-user">
                    <div className="user-avatar">
                        <span>AD</span>
                    </div>
                    <div className="user-info">
                        <h4>Admin User</h4>
                        <p>Super Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import OverviewAdmin from './OverviewAdmin';
import UserManagement from './UserManagement';
import CourseManagement from './CourseManagement';
import InvestmentPools from './InvestmentPools';
import ContentModeration from './ContentModeration';
import NotificationsAdmin from './NotificationsAdmin';
import PlatformAnalytics from './PlatformAnalytics';
import AdminSettings from './AdminSettings';

const AdminLayout: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Extract section from pathname, removing '/admin/' prefix
        const pathParts = location.pathname.split('/');
        const sectionIndex = pathParts.indexOf('admin') + 1;
        const section = pathParts[sectionIndex] || 'overview';

        document.title = `EcommXpert Admin - ${section.charAt(0).toUpperCase() + section.slice(1)}`;
    }, [location]);

    // Extract section for header title
    const pathParts = location.pathname.split('/');
    const sectionIndex = pathParts.indexOf('admin') + 1;
    const section = pathParts[sectionIndex] || 'overview';
    const formattedSection = section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ');

    return (
        <div className="admin-container">
            <AdminSidebar />

            <main className="admin-main">
                <header className="admin-header">
                    <h1>{formattedSection}</h1>
                    <div className="admin-actions">
                        <button className="admin-logout">
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    <Routes>
                        <Route path="/overview" element={<OverviewAdmin />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/courses" element={<CourseManagement />} />
                        <Route path="/investments" element={<InvestmentPools />} />
                        <Route path="/moderation" element={<ContentModeration />} />
                        <Route path="/notifications" element={<NotificationsAdmin />} />
                        <Route path="/analytics" element={<PlatformAnalytics />} />
                        <Route path="/settings" element={<AdminSettings />} />
                        <Route path="/" element={<OverviewAdmin />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
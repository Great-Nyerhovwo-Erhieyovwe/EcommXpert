import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import Sidebar from './Sidebar';
import OverviewSection from './OverviewSection';
import LearningSection from './LearningSection';
import InvestmentsSection from './InvestmentsSection';
import MarketplaceSection from './MarketplaceSection';
import AnalyticsSection from './AnalyticsSection';
import WalletSection from './WalletSection';
import TransactionsSection from './TransactionsSection';
import CommunitySection from './CommunitySection';
import SupportSection from './SupportSection';
import SettingsSection from './SettingsSection';
import { useDashboard } from '../../hooks/useDashboard';
import MobileHeader from '../../components/mobile/MobileHeader';
import MobileFooter from '../../components/mobile/MobileFooter';
import MobileMenu from '../../components/mobile/MobileMenu';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
    const { state } = useDashboard();
    const location = useLocation();

    React.useEffect(() => {
        const section = location.pathname.substring(1) || 'overview';
        document.title = `EcommXpert - ${section.charAt(0).toUpperCase() + section.slice(1)}`;
    }, [location]);

    return (
        <div className="mobile-layout">
            <MobileHeader />

            <Sidebar />

            <main className="mobile-main">
                <Routes>
                    <Route path="/" element={<OverviewSection />} />
                    <Route path="/overview" element={<OverviewSection />} />
                    <Route path="/learning" element={<LearningSection />} />
                    <Route path="/investments" element={<InvestmentsSection />} />
                    <Route path="/marketplace" element={<MarketplaceSection />} />
                    <Route path="/analytics" element={<AnalyticsSection />} />
                    <Route path="/wallet" element={<WalletSection />} />
                    <Route path="/transactions" element={<TransactionsSection />} />
                    <Route path="/community" element={<CommunitySection />} />
                    <Route path="/support" element={<SupportSection />} />
                    <Route path="/settings" element={<SettingsSection />} />
                </Routes>
            </main>

            <MobileFooter />

            <MobileMenu />
        </div>
    );
};

export default DashboardLayout;
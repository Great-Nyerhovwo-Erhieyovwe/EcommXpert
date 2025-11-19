import React from 'react';
import { useMobile } from '../../hooks/useMobile';
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';
import MobileMenu from './MobileMenu';
import '../../styles/mobile.css'

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { state } = useMobile();

    return (
        <div className={`mobile-layout ${state.orientation}`}>
            <MobileHeader />

            <main className="mobile-main">
                {children}
            </main>

            <MobileFooter />

            <MobileMenu />
        </div>
    );
};

export default MobileLayout;
import React from 'react';
import { useMobile } from '../../hooks/useMobile';

const MobileHeader: React.FC = () => {
    const { state } = useMobile();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="mobile-header">
            <div className="header-content">
                <button
                    className="menu-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="logo">
                    <h1>EcommXpert</h1>
                </div>

                <div className="header-actions">
                    <button className="notification-button">
                        <i className="fas fa-bell"></i>
                        <span className="badge">3</span>
                    </button>

                    <button className="theme-button">
                        <i className="fas fa-moon"></i>
                    </button>
                </div>
            </div>

            {state.isMobile && (
                <div className="mobile-status">
                    <span>{state.orientation === 'portrait' ? '📱' : '📱'}</span>
                    <span>{state.isMobile ? 'Mobile' : state.isTablet ? 'Tablet' : 'Desktop'}</span>
                </div>
            )}
        </header>
    );
};

export default MobileHeader;
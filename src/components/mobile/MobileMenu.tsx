import React from 'react';
import { useMobile } from '../../hooks/useMobile';
import { Link } from 'react-router-dom';

const MobileMenu: React.FC = () => {
    const { actions } = useMobile();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'home' },
        { id: 'learning', label: 'Learning', icon: 'graduation-cap' },
        { id: 'investments', label: 'Investments', icon: 'coins' },
        { id: 'marketplace', label: 'Marketplace', icon: 'store' },
        { id: 'analytics', label: 'Analytics', icon: 'chart-bar' },
        { id: 'wallet', label: 'Wallet', icon: 'wallet' },
        { id: 'community', label: 'Community', icon: 'users' },
        { id: 'support', label: 'Support', icon: 'headset' },
        { id: 'settings', label: 'Settings', icon: 'cog' },
    ];

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
        actions.handleTouchEnd({} as React.TouchEvent);
    };

    return (
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>

            <div className="menu-content">
                <div className="menu-header">
                    <h3>Menu</h3>
                    <button className="close-button" onClick={() => setIsMenuOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <nav className="menu-nav">
                    <ul>
                        {menuItems.map(item => (
                            <li key={item.id}>
                                <Link
                                    to={`/${item.id}`}
                                    onClick={handleMenuItemClick}
                                    className="menu-link"
                                >
                                    <i className={`fas fa-${item.icon}`}></i>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="menu-footer">
                    <button className="logout-button">
                        <i className="fas fa-sign-out-alt"></i>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
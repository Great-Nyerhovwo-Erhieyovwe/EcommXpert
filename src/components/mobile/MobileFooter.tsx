import React from 'react';
import { useMobile } from '../../hooks/useMobile';

const MobileFooter: React.FC = () => {
    const { state } = useMobile();

    return (
        <footer className="mobile-footer">
            <div className="footer-content">
                <button className="footer-button">
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </button>

                <button className="footer-button">
                    <i className="fas fa-graduation-cap"></i>
                    <span>Learning</span>
                </button>

                <button className="footer-button">
                    <i className="fas fa-coins"></i>
                    <span>Investments</span>
                </button>

                <button className="footer-button">
                    <i className="fas fa-chart-line"></i>
                    <span>Analytics</span>
                </button>
            </div>

            <div className="footer-copyright">
                <p>&copy; 2025 EcommXpert. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default MobileFooter;
import React from 'react';
import { useMobile } from '../../hooks/useMobile';

interface ResponsiveGridProps {
    children: React.ReactNode;
    columns?: 'mobile' | 'tablet' | 'desktop';
    gap?: string;
    className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
    children,
    columns = 'mobile',
    gap = '1rem',
    className = ''
}) => {
    const { state } = useMobile();

    const getColumnCount = () => {
        if (state.isMobile) return 1;
        if (state.isTablet) return 2;
        if (state.isDesktop) return 4;
        return 1;
    };

    const getGap = () => {
        if (state.isMobile) return '0.75rem';
        if (state.isTablet) return '1rem';
        if (state.isDesktop) return '1.5rem';
        return '1rem';
    };

    const columnCount = columns === 'mobile' ? 1 : columns === 'tablet' ? 2 : 4;
    const actualGap = gap || getGap();

    return (
        <div
            className={`responsive-grid ${className}`}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                gap: actualGap,
            }}
        >
            {children}
        </div>
    );
};

export default ResponsiveGrid;
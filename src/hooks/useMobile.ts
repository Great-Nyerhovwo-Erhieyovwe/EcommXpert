import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { MOBILE_CONFIG } from '../lib/mobileConfig';
import React from 'react';

interface MobileState {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    orientation: 'portrait' | 'landscape';
    touchActive: boolean;
    swipeDirection: 'none' | 'left' | 'right' | 'up' | 'down';
    lastTouch: number;
}

interface MobileActions {
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleTouchEnd: (e: React.TouchEvent) => void;
    setOrientation: (orientation: 'portrait' | 'landscape') => void;
}

const MobileContext = createContext<{
    state: MobileState;
    actions: MobileActions;
}>({
    state: {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        orientation: 'portrait',
        touchActive: false,
        swipeDirection: 'none',
        lastTouch: 0,
    },
    actions: {
        handleTouchStart: () => { },
        handleTouchMove: () => { },
        handleTouchEnd: () => { },
        setOrientation: () => { },
    },
});

export const useMobile = () => useContext(MobileContext);

export const MobileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<MobileState>({
        isMobile: window.innerWidth < MOBILE_CONFIG.breakpoints.mobile,
        isTablet: window.innerWidth >= MOBILE_CONFIG.breakpoints.mobile && window.innerWidth < MOBILE_CONFIG.breakpoints.desktop,
        isDesktop: window.innerWidth >= MOBILE_CONFIG.breakpoints.desktop,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
        touchActive: false,
        swipeDirection: 'none',
        lastTouch: 0,
    });

    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

    const updateBreakpoints = () => {
        setState(prev => ({
            ...prev,
            isMobile: window.innerWidth < MOBILE_CONFIG.breakpoints.mobile,
            isTablet: window.innerWidth >= MOBILE_CONFIG.breakpoints.mobile && window.innerWidth < MOBILE_CONFIG.breakpoints.desktop,
            isDesktop: window.innerWidth >= MOBILE_CONFIG.breakpoints.desktop,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
        }));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
        setState(prev => ({
            ...prev,
            touchActive: true,
            lastTouch: Date.now(),
        }));
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;

        const touch = e.touches[0];
        const diffX = touch.clientX - touchStart.x;
        const diffY = touch.clientY - touchStart.y;

        // Determine swipe direction
        if (Math.abs(diffX) > MOBILE_CONFIG.gestures.swipeThreshold ||
            Math.abs(diffY) > MOBILE_CONFIG.gestures.swipeThreshold) {

            let direction: 'none' | 'left' | 'right' | 'up' | 'down' = 'none';

            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal swipe
                direction = diffX > 0 ? 'right' : 'left';
            } else {
                // Vertical swipe
                direction = diffY > 0 ? 'down' : 'up';
            }

            setState(prev => ({
                ...prev,
                swipeDirection: direction,
            }));
        }
    };

    const handleTouchEnd = (_e: React.TouchEvent) => {
        setTouchStart(null);
        setState(prev => ({
            ...prev,
            touchActive: false,
            swipeDirection: 'none',
        }));
    };

    const setOrientation = (orientation: 'portrait' | 'landscape') => {
        setState(prev => ({ ...prev, orientation }));
    };

    useEffect(() => {
        updateBreakpoints();
        window.addEventListener('resize', updateBreakpoints);

        // Handle orientation change
        const handleOrientationChange = () => {
            setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
        };

        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', updateBreakpoints);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    const actions = {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        setOrientation,
    };

    const providerValue = { state, actions };

    return React.createElement(MobileContext.Provider, { value: providerValue }, children);
};
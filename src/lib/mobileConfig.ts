export const MOBILE_CONFIG = {
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
    },
    gestures: {
        swipeThreshold: 50, // pixels
        tapDelay: 300, // milliseconds
        longPressDelay: 800, // milliseconds
    },
    animations: {
        transitionDuration: '0.3s',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    touchTargets: {
        minimumSize: 44, // pixels (Apple HIG standard)
        padding: 16, // pixels
    },
    responsiveComponents: {
        maxColumns: {
            mobile: 1,
            tablet: 2,
            desktop: 4,
        },
        cardWidth: {
            mobile: '100%',
            tablet: '48%',
            desktop: '23%',
        },
    },
};
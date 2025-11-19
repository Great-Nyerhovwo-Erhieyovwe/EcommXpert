import React from 'react';
import { useMobile } from '../../hooks/useMobile';
import { MOBILE_CONFIG } from '../../lib/mobileConfig';

interface TouchButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    onLongPress?: () => void;
    className?: string;
    disabled?: boolean;
}

const TouchButton: React.FC<TouchButtonProps> = ({
    children,
    onClick,
    onLongPress,
    className = '',
    disabled = false
}) => {
    const { state, actions } = useMobile();
    const [isPressed, setIsPressed] = React.useState(false);
    const [isLongPressed, setIsLongPressed] = React.useState(false);
    const pressTimer = React.useRef<NodeJS.Timeout | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (disabled) return;

        setIsPressed(true);
        pressTimer.current = setTimeout(() => {
            setIsLongPressed(true);
            if (onLongPress) onLongPress();
        }, MOBILE_CONFIG.gestures.longPressDelay);

        actions.handleTouchStart(e);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }

        if (isPressed && !isLongPressed) {
            onClick();
        }

        setIsPressed(false);
        setIsLongPressed(false);
        actions.handleTouchEnd(e);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        actions.handleTouchMove(e);
    };

    return (
        <button
            className={`touch-button ${isPressed ? 'pressed' : ''} ${isLongPressed ? 'long-pressed' : ''} ${className} ${disabled ? 'disabled' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            aria-label="Touch button"
        >
            {children}
        </button>
    );
};

export default TouchButton;
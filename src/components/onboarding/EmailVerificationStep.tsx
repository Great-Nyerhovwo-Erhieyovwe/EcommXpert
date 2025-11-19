import React, { useState, useEffect } from 'react';
import useOnboarding from '../../hooks/useOnboarding';

interface EmailVerificationStepProps {
    email: string;
    nextStep: () => void;
    skipStep: () => void;
}

const EmailVerificationStep: React.FC<EmailVerificationStepProps> = () => {
    const { actions, state } = useOnboarding();
    const [countdown, setCountdown] = useState(30);
    const [resendDisabled, setResendDisabled] = useState(true);

    useEffect(() => {
        let timer: number;
        if (countdown > 0 && resendDisabled) {
            timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, resendDisabled]);

    const handleResend = () => {
        setCountdown(30);
        setResendDisabled(true);
        // Simulate API call
        console.log('Resent verification email to', state.email);
    };

    const handleVerify = () => {
        actions.setVerified(true);
        actions.nextStep();
    };

    return (
        <div className="onboarding-step">
            <h2>Check Your Email</h2>
            <p>We sent a verification code to <strong>{state.email}</strong></p>

            <div className="verification-code">
                <input type="text" maxLength={6} placeholder="••••••" />
            </div>

            <button className="primary-cta" onClick={handleVerify}>
                Verify Email
            </button>

            <p className="microcopy">
                Didn't receive the code?{' '}
                <button onClick={handleResend} disabled={resendDisabled} className="link-button">
                    Resend ({countdown}s)
                </button>
            </p>

            <div className="progress-indicator">
                <div className="progress-bar" style={{ width: '40%' }}></div>
            </div>
        </div>
    );
};

export default EmailVerificationStep;
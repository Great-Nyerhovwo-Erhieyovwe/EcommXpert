import React, { useState } from 'react';
import useOnboarding from '../../hooks/useOnboarding';

interface KYCStepProps {
    nextStep: () => void;
    skipStep: () => void;
    idDocument: File | null;
}

const KYCStep: React.FC<KYCStepProps> = () => {
    const { actions } = useOnboarding();
    const [idDocument, setIdDocument] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIdDocument(file);
            const reader = new FileReader();
            reader.onload = () => setShowPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleComplete = () => {
        if (idDocument) {
            actions.setIdDocument(idDocument);
            actions.setKycCompleted(true);
            actions.nextStep();
        }
    };

    return (
        <div className="onboarding-step">
            <h2>Verify Your Identity (Optional)</h2>
            <p>Complete KYC to unlock higher investment limits and faster withdrawals.</p>

            <div className="kyc-upload">
                <label htmlFor="id-upload" className="upload-area">
                    {showPreview ? (
                        <img src={showPreview} alt="ID Preview" className="preview-image" />
                    ) : (
                        <>
                            <i className="fas fa-id-card"></i>
                            <p>Upload your government-issued ID</p>
                            <span>Click to browse or drag and drop</span>
                        </>
                    )}
                </label>
                <input
                    id="id-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="kyc-note">
                <i className="fas fa-lock"></i> Your documents are encrypted and never shared.
            </div>

            <div className="checkbox">
                <input type="checkbox" id="skip-kyc" />
                <label htmlFor="skip-kyc">Skip for now</label>
            </div>

            <button
                className="primary-cta"
                onClick={handleComplete}
                disabled={!idDocument}
            >
                Continue to Goal Selection
            </button>
        </div>
    );
};

export default KYCStep;
import { useState } from 'react';

function TermsofServicePage() {
    const [isAgreed, setIsAgreed] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleBackClick = () => {
        window.history.back();
    };

    const handleAccept = () => {
        if (!isAgreed) {
            alert('Please agree to the Terms of Use');
            return;
        }

        setShowSuccessModal(true);
    };



    const handleGoToApp = () => {
        // Redirect to main application
        window.location.href = '/auth/signup';
        setShowSuccessModal(false);
    };

    const SuccessModal = () => (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h2 className="modal-title">Terms Accepted!</h2>
                <p className="modal-message">Proceeding to application.</p>
                <button className="modal-button" onClick={handleGoToApp}>
                    Let’s Get Started!
                </button>
            </div>

            <style >{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    padding: 20px;
                }

                .modal-content {
                    background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
                    border-radius: 20px;
                    padding: 40px 30px;
                    text-align: center;
                    
                    width: 100%;
                    border: 1px solid #333;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                    animation: modalAppear 0.3s ease-out;
                }

                @keyframes modalAppear {
                    from {
                        opacity: 0;
                        transform: scale(0.8) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .modal-icon {
                    font-size: 64px;
                    color: #F3BA2F;
                    margin-bottom: 20px;
                    animation: iconPulse 2s infinite;
                }

                @keyframes iconPulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                .modal-title {
                    color: #FFFFFF;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    background: linear-gradient(45deg, #F3BA2F, #FFD700);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .modal-message {
                    color: #CCCCCC;
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 30px;
                }

                .modal-button {
                    background: linear-gradient(45deg, #F3BA2F, #FFD700);
                    color: #0f0f0f;
                    border: none;
                    border-radius: 12px;
                    padding: 16px 32px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                    max-width: 200px;
                    box-shadow: 0 4px 15px rgba(243, 186, 47, 0.3);
                }

                .modal-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(243, 186, 47, 0.4);
                }

                .modal-button:active {
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );

    return (
        <div className="containera">
            {/* Header Section */}
            <div className="headera">
                <div className="header-contenta">
                    <div className="back-button" onClick={handleBackClick}>
                        <i className="fas fa-arrow-left" />
                    </div>
                    <div className="page-title">Terms of Use</div>
                    <div className="placeholder" />
                </div>
            </div>

            {/* Content Section */}
            <div className="content">

                <div className="section">
                    <div className="section-title">Agreement</div>
                    <div className="section-content">
                        <p>
                            This is a binding agreement between you (the user) and IC Markets Global. It
                            covers all lC Markets GlobalServices you access or use.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Risk Warning</div>
                    <div className="section-content">
                        <p>
                            Digital assets are volatile and can fluctuate significantly in value.
                            lC Markets Globalis not a broker, financial advisor, or investment advisor. You
                            must conduct your own due diligence before making any financial
                            decisions.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">About Our Services</div>
                    <div className="section-content">
                        <p>
                            lC Markets Globalprovides digital asset exchange, custody services, and related
                            financial services through our platform.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Eligibility</div>
                    <div className="section-content">
                        <p>
                            You must be at least 18 years old, legally able to enter into
                            contracts, not restricted from using our services, and not located in
                            prohibited jurisdictions.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Communication</div>
                    <div className="section-content">
                        <p>
                            You must keep your contact information updated. lC Markets Globalwill contact you
                            via email, SMS, or phone regarding your account and our services.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Our Services</div>
                    <div className="section-content">
                        <p>
                            lC Markets Globaloffers digital asset trading, secure custody solutions, and
                            customer support through both automated bots and human
                            representatives. User chat functionality is also available.
                        </p>
                        <p>
                            All applicable fees are listed on our Fee Structure page and are
                            subject to updates. You are responsible for reviewing the current fee
                            schedule before conducting transactions.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Account Management</div>
                    <div className="section-content">
                        <p>
                            You must open an account (individual or corporate) to access our
                            services. This requires completing identity verification procedures
                            (KYC/AML) as required by law.
                        </p>
                        <p>
                            You must complete our Know Your Customer (KYC) and Anti-Money
                            Laundering (AML) verification processes before using certain services.
                        </p>
                        <p>
                            You may maintain records and create sub-accounts under specific
                            conditions outlined in our account management policies.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Transactions</div>
                    <div className="section-content">
                        <p>
                            You must maintain sufficient balance in your account for any
                            transactions you initiate. Transactions may fail or incur additional
                            fees if insufficient funds are available.
                        </p>
                        <p>
                            lC Markets Globalreserves the right to cancel or amend transactions in cases of
                            suspected fraud, errors, or violations of these Terms.
                        </p>
                        <p>
                            You are responsible for any unauthorized transactions unless you can
                            prove otherwise through our dispute resolution process.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Digital Assets</div>
                    <div className="section-content">
                        <p>
                            You may only transact with digital assets explicitly supported by
                            IC Markets Global. Attempting to deposit unsupported assets may result in
                            permanent loss.
                        </p>
                        <p>
                            lC Markets Globaldoes not guarantee support for blockchain forks, airdrops, or
                            other similar events. Support decisions are made at our sole
                            discretion.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Account Security</div>
                    <div className="section-content">
                        <p>
                            You must use a strong password, enable multi-factor authentication
                            (MFA), never share credentials, monitor account activity regularly,
                            and immediately report any security breaches.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Privacy</div>
                    <div className="section-content">
                        <p>
                            Your privacy is governed by the lC Markets GlobalPrivacy Notice, which explains
                            how we collect, use, and protect your personal information.
                        </p>
                        <p>
                            We retain your data for as long as necessary to provide our services,
                            comply with legal obligations, resolve disputes, and enforce our
                            agreements.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Account Termination</div>
                    <div className="section-content">
                        <p>
                            lC Markets Globalmay restrict, suspend, or terminate accounts for fraud, law
                            violations, suspicious activity, or Terms violations. Users may close
                            accounts unless frozen or dormant.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Prohibited Use</div>
                    <div className="section-content">
                        <p>
                            You may not use lC Markets Globalservices for fraud, market manipulation, illegal
                            activities, unauthorized access, or any purpose that violates
                            applicable laws or these Terms.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Liability &amp; Intellectual Property</div>
                    <div className="section-content">
                        <p>
                            lC Markets Globalis not responsible for losses except in cases of proven gross
                            negligence or fraud. We are not liable for market fluctuations,
                            technical issues, or third-party actions.
                        </p>
                        <p>
                            lC Markets Globalretains all intellectual property rights to our platform,
                            technology, and branding. Users receive a limited license to use our
                            services as outlined in these Terms.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Indemnity</div>
                    <div className="section-content">
                        <p>
                            You agree to indemnify and hold lC Markets Globalharmless against any claims,
                            losses, or damages resulting from your misuse of our services or
                            violation of these Terms.
                        </p>
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">Important Notice</div>
                    <div className="section-content">
                        <p>
                            By using lC Markets Globalservices, you acknowledge that you have read,
                            understood, and agree to be bound by these Terms of Use. If you do not
                            agree, you must discontinue use of our services immediately.
                        </p>
                    </div>
                </div>
            </div>

            {/* Agreement Section */}
            <div className="agreement">
                <input
                    type="checkbox"
                    id="agree"
                    className="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label htmlFor="agree" className="agreement-label">
                    I have read and agree to the Terms of Use
                </label>
            </div>

            {/* Buttons */}
            <button
                className="button accept-button"
                onClick={handleAccept}
                disabled={!isAgreed}
            >
                ACCEPT
            </button>


            {/* Footer */}
            <div className="footer">
                © 2025 IC Markets Global. All rights reserved.
            </div>
            {showSuccessModal && <SuccessModal />}
            <style >{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                .containera {
                    
                    margin: 0 auto;
                    padding: 0px 20px;
                    padding-bottom: 80px;
                    background-color: #0f0f0f;
                    color: #FFFFFF;
                    min-height: 100vh;
                }
                
                /* Header Section */
                .headera {
                    background-color: #0f0f0f;
                    padding: 15px 0;
                    position: sticky;
                    top: 0;
                    z-index: 100;
               
                }
                
                .header-contenta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .back-button {
                    color: #FFFFFF;
                    font-size: 20px;
                    cursor: pointer;
                }
                
                .page-title {
                    font-size: 20px;
                    font-weight: bold;
                }
                
                .placeholder {
                    width: 20px;
                }
                
                /* Content Section */
                .content {
                    background-color: #1A1A1A;
                    border-radius: 12px;
                    padding: 25px;
                    margin-bottom: 20px;
                    max-height: 70vh;
                    overflow-y: auto;
                }
                
                .content::-webkit-scrollbar {
                    width: 5px;
                }
                
                .content::-webkit-scrollbar-track {
                    background: #2A2A2A;
                    border-radius: 10px;
                }
                
                .content::-webkit-scrollbar-thumb {
                    background: #F3BA2F;
                    border-radius: 10px;
                }
                
                .last-updated {
                    color: #F3BA2F;
                    font-size: 14px;
                    margin-bottom: 25px;
                    text-align: center;
                }
                
                .section {
                    margin-bottom: 25px;
                }
                
                .section-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #F3BA2F;
                    margin-bottom: 15px;
                }
                
                .section-content {
                    font-size: 14px;
                    line-height: 1.6;
                    color: #CCCCCC;
                }
                
                .section-content p {
                    margin-bottom: 15px;
                }
                
                .section-content ul {
                    padding-left: 20px;
                    margin-bottom: 15px;
                }
                
                .section-content li {
                    margin-bottom: 8px;
                }
                
                .highlight {
                    color: #F3BA2F;
                    font-weight: 500;
                }
                
                /* Agreement Section */
                .agreement {
                    display: flex;
                    align-items: center;
                    margin: 25px 0;
                }
                
                .checkbox {
                    width: 20px;
                    height: 20px;
                    margin-right: 12px;
                    accent-color: #F3BA2F;
                }
                
                .agreement-label {
                    font-size: 14px;
                    color: #CCCCCC;
                }
                
                /* Buttons */
                .button {
                    width: 100%;
                    padding: 16px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .accept-button {
                    background-color: #F3BA2F;
                    color: #0f0f0f;
                    margin-bottom: 15px;
                }
                
                .accept-button:hover:not(:disabled) {
                    background-color: #e0ab29;
                }
                
                .accept-button:disabled {
                    background-color: #5e5e5e;
                    color: #a0a0a0;
                    cursor: not-allowed;
                }
                
                .decline-button {
                    background-color: #2A2A2A;
                    color: #FFFFFF;
                }
                
                .decline-button:hover {
                    background-color: #363636;
                }
                
                /* Footer */
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    color: #777777;
                    font-size: 12px;
                }
            `}</style>
        </div>
    );
}

export default TermsofServicePage;
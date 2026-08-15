import{i as o,j as e}from"./index-a80de294.js";function m(){const[s,a]=o.useState(!1),[i,t]=o.useState(!1),n=()=>{window.history.back()},r=()=>{if(!s){alert("Please agree to the Terms of Use");return}t(!0)},c=()=>{window.location.href="/auth/signup",t(!1)},l=()=>e.jsxs("div",{className:"modal-overlay",children:[e.jsxs("div",{className:"modal-content",children:[e.jsx("div",{className:"modal-icon",children:e.jsx("i",{className:"fas fa-check-circle"})}),e.jsx("h2",{className:"modal-title",children:"Terms Accepted!"}),e.jsx("p",{className:"modal-message",children:"Proceeding to application."}),e.jsx("button",{className:"modal-button",onClick:c,children:"Let’s Get Started!"})]}),e.jsx("style",{children:`
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
                    max-width: 400px;
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
            `})]});return e.jsxs("div",{className:"containera",children:[e.jsx("div",{className:"headera",children:e.jsxs("div",{className:"header-contenta",children:[e.jsx("div",{className:"back-button",onClick:n,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Terms of Use"}),e.jsx("div",{className:"placeholder"})]})}),e.jsxs("div",{className:"content",children:[e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Agreement"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"This is a binding agreement between you (the user) and IC Markets Global. It covers all lC Markets GlobalServices you access or use."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Risk Warning"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"Digital assets are volatile and can fluctuate significantly in value. lC Markets Globalis not a broker, financial advisor, or investment advisor. You must conduct your own due diligence before making any financial decisions."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"About Our Services"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"lC Markets Globalprovides digital asset exchange, custody services, and related financial services through our platform."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Eligibility"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"You must be at least 18 years old, legally able to enter into contracts, not restricted from using our services, and not located in prohibited jurisdictions."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Communication"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"You must keep your contact information updated. lC Markets Globalwill contact you via email, SMS, or phone regarding your account and our services."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Our Services"}),e.jsxs("div",{className:"section-content",children:[e.jsx("p",{children:"lC Markets Globaloffers digital asset trading, secure custody solutions, and customer support through both automated bots and human representatives. User chat functionality is also available."}),e.jsx("p",{children:"All applicable fees are listed on our Fee Structure page and are subject to updates. You are responsible for reviewing the current fee schedule before conducting transactions."})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Account Management"}),e.jsxs("div",{className:"section-content",children:[e.jsx("p",{children:"You must open an account (individual or corporate) to access our services. This requires completing identity verification procedures (KYC/AML) as required by law."}),e.jsx("p",{children:"You must complete our Know Your Customer (KYC) and Anti-Money Laundering (AML) verification processes before using certain services."}),e.jsx("p",{children:"You may maintain records and create sub-accounts under specific conditions outlined in our account management policies."})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Transactions"}),e.jsxs("div",{className:"section-content",children:[e.jsx("p",{children:"You must maintain sufficient balance in your account for any transactions you initiate. Transactions may fail or incur additional fees if insufficient funds are available."}),e.jsx("p",{children:"lC Markets Globalreserves the right to cancel or amend transactions in cases of suspected fraud, errors, or violations of these Terms."}),e.jsx("p",{children:"You are responsible for any unauthorized transactions unless you can prove otherwise through our dispute resolution process."})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Digital Assets"}),e.jsxs("div",{className:"section-content",children:[e.jsx("p",{children:"You may only transact with digital assets explicitly supported by IC Markets Global. Attempting to deposit unsupported assets may result in permanent loss."}),e.jsx("p",{children:"lC Markets Globaldoes not guarantee support for blockchain forks, airdrops, or other similar events. Support decisions are made at our sole discretion."})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Account Security"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"You must use a strong password, enable multi-factor authentication (MFA), never share credentials, monitor account activity regularly, and immediately report any security breaches."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Privacy"}),e.jsxs("div",{className:"section-content",children:[e.jsx("p",{children:"Your privacy is governed by the lC Markets GlobalPrivacy Notice, which explains how we collect, use, and protect your personal information."}),e.jsx("p",{children:"We retain your data for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements."})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Account Termination"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"lC Markets Globalmay restrict, suspend, or terminate accounts for fraud, law violations, suspicious activity, or Terms violations. Users may close accounts unless frozen or dormant."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Prohibited Use"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"You may not use lC Markets Globalservices for fraud, market manipulation, illegal activities, unauthorized access, or any purpose that violates applicable laws or these Terms."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Liability & Intellectual Property"}),e.jsxs("div",{className:"section-content",children:[e.jsx("p",{children:"lC Markets Globalis not responsible for losses except in cases of proven gross negligence or fraud. We are not liable for market fluctuations, technical issues, or third-party actions."}),e.jsx("p",{children:"lC Markets Globalretains all intellectual property rights to our platform, technology, and branding. Users receive a limited license to use our services as outlined in these Terms."})]})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Indemnity"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"You agree to indemnify and hold lC Markets Globalharmless against any claims, losses, or damages resulting from your misuse of our services or violation of these Terms."})})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:"Important Notice"}),e.jsx("div",{className:"section-content",children:e.jsx("p",{children:"By using lC Markets Globalservices, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree, you must discontinue use of our services immediately."})})]})]}),e.jsxs("div",{className:"agreement",children:[e.jsx("input",{type:"checkbox",id:"agree",className:"checkbox",checked:s,onChange:d=>a(d.target.checked)}),e.jsx("label",{htmlFor:"agree",className:"agreement-label",children:"I have read and agree to the Terms of Use"})]}),e.jsx("button",{className:"button accept-button",onClick:r,disabled:!s,children:"ACCEPT"}),e.jsx("div",{className:"footer",children:"© 2025 IC Markets Global. All rights reserved."}),i&&e.jsx(l,{}),e.jsx("style",{children:`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                .containera {
                    max-width: 400px;
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
            `})]})}export{m as default};

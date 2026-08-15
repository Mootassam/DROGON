import React from 'react'
import { Link } from 'react-router-dom'
import { i18n } from "../../../i18n";

function Termeofuse() {

    const handleBackClick = () => {
        window.history.back();
    };
    
    return (
        <>
            <div className="container">
                {/* Header Section */}
                <div className="header">
                    <div className="header-content">
                        <div className="back-button" onClick={handleBackClick}>
                            <i className="fas fa-arrow-left" />
                        </div>
                        <div className="page-title">{i18n("pages.termsOfUse.title")}</div>
                        <div className="placeholder" />
                    </div>
                </div>
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-title">{i18n("pages.termsOfUse.hero.title")}</div>
                    {/* <div class="hero-subtitle">Updated 6 May 2025</div> */}
                </div>
                {/* Agreement Section */}
                <div className="content-section">
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-handshake item-icon" />
                            {i18n("pages.termsOfUse.agreement.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.agreement.content")}
                        </div>
                    </div>
                </div>
                {/* Risk Warning Section */}
                <div className="warning-section">
                    <div className="warning-title">
                        <i className="fas fa-exclamation-triangle" />
                        {i18n("pages.termsOfUse.riskWarning.title")}
                    </div>
                    <div className="warning-content">
                        {i18n("pages.termsOfUse.riskWarning.content")}
                    </div>
                </div>
                {/* About lC Markets GlobalSection */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.aboutServices.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-info-circle item-icon" />
                            {i18n("pages.termsOfUse.aboutServices.aboutIC Markets Global.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.aboutServices.aboutIC Markets Global.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-check item-icon" />
                            {i18n("pages.termsOfUse.aboutServices.eligibility.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.aboutServices.eligibility.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-comments item-icon" />
                            {i18n("pages.termsOfUse.aboutServices.communication.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.aboutServices.communication.content")}
                        </div>
                    </div>
                </div>
                {/* Services Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.services.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-exchange-alt item-icon" />
                            {i18n("pages.termsOfUse.services.servicesProvided.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.services.servicesProvided.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-money-bill-wave item-icon" />
                            {i18n("pages.termsOfUse.services.fees.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.services.fees.content")}
                        </div>
                    </div>
                </div>
                {/* Accounts Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.accountManagement.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-circle item-icon" />
                            {i18n("pages.termsOfUse.accountManagement.accountCreation.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.accountManagement.accountCreation.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-id-card item-icon" />
                            {i18n("pages.termsOfUse.accountManagement.identityVerification.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.accountManagement.identityVerification.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-folder item-icon" />
                            {i18n("pages.termsOfUse.accountManagement.accountRecords.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.accountManagement.accountRecords.content")}
                        </div>
                    </div>
                </div>
                {/* Transactions Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.transactions.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-wallet item-icon" />
                            {i18n("pages.termsOfUse.transactions.sufficientBalance.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.transactions.sufficientBalance.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-ban item-icon" />
                            {i18n("pages.termsOfUse.transactions.transactionCancellation.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.transactions.transactionCancellation.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-shield item-icon" />
                            {i18n("pages.termsOfUse.transactions.unauthorizedTransactions.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.transactions.unauthorizedTransactions.content")}
                        </div>
                    </div>
                </div>
                {/* Digital Assets Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.digitalAssets.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-coins item-icon" />
                            {i18n("pages.termsOfUse.digitalAssets.supportedAssets.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.digitalAssets.supportedAssets.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-code-branch item-icon" />
                            {i18n("pages.termsOfUse.digitalAssets.forksAirdrops.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.digitalAssets.forksAirdrops.content")}
                        </div>
                    </div>
                </div>
                {/* Account Security Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.accountSecurity.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-lock item-icon" />
                            {i18n("pages.termsOfUse.accountSecurity.securityRequirements.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.accountSecurity.securityRequirements.content")}
                        </div>
                    </div>
                </div>
                {/* Privacy Section */}
                <div className="content-section">
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-user-secret item-icon" />
                            {i18n("pages.termsOfUse.privacy.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.privacy.content")}
                        </div>
                    </div>
                </div>
                {/* Termination Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.termination.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-power-off item-icon" />
                            {i18n("pages.termsOfUse.termination.terminationSuspension.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.termination.terminationSuspension.content")}
                        </div>
                    </div>
                </div>
                {/* Prohibited Use Section */}
                <div className="warning-section">
                    <div className="warning-title">
                        <i className="fas fa-ban" />
                        {i18n("pages.termsOfUse.prohibitedUse.title")}
                    </div>
                    <div className="warning-content">
                        {i18n("pages.termsOfUse.prohibitedUse.content")}
                    </div>
                </div>
                {/* Liability Section */}
                <div className="content-section">
                    <div className="section-title">{i18n("pages.termsOfUse.liability.title")}</div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-balance-scale item-icon" />
                            {i18n("pages.termsOfUse.liability.liability.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.liability.liability.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-copyright item-icon" />
                            {i18n("pages.termsOfUse.liability.intellectualProperty.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.liability.intellectualProperty.content")}
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="item-title">
                            <i className="fas fa-shield-alt item-icon" />
                            {i18n("pages.termsOfUse.liability.indemnity.title")}
                        </div>
                        <div className="item-content">
                            {i18n("pages.termsOfUse.liability.indemnity.content")}
                        </div>
                    </div>
                </div>
                {/* Important Notice */}
                <div className="notice-section">
                    <div className="notice-title">
                        <i className="fas fa-file-contract" />
                        {i18n("pages.termsOfUse.importantNotice.title")}
                    </div>
                    <div className="notice-content">
                        {i18n("pages.termsOfUse.importantNotice.content")}
                    </div>
                </div>
                {/* Action Cards */}
                <div className="action-cards">
                    <Link to="/security-tips" className="remove_blue">
                        <div className="action-card">
                            <i className="fas fa-shield-alt action-icon" />
                            <div className="action-title">{i18n("pages.termsOfUse.actionCards.security.title")}</div>
                            <div className="action-description">{i18n("pages.termsOfUse.actionCards.security.description")}</div>
                        </div>
                    </Link>
                    <Link to="/faq-center" className="remove_blue">
                        <div className="action-card">
                            <i className="fas fa-question-circle action-icon" />
                            <div className="action-title">{i18n("pages.termsOfUse.actionCards.helpCenter.title")}</div>
                            <div className="action-description">{i18n("pages.termsOfUse.actionCards.helpCenter.description")}</div>
                        </div>
                    </Link>
                    <Link to="/privacy-portal" className="remove_blue">
                        <div className="action-card">
                            <i className="fas fa-user-shield action-icon" />
                            <div className="action-title">{i18n("pages.termsOfUse.actionCards.privacyPolicy.title")}</div>
                            <div className="action-description">{i18n("pages.termsOfUse.actionCards.privacyPolicy.description")}</div>
                        </div>
                    </Link>
                    <Link to="/approval" className="remove_blue">
                        <div className="action-card" >
                            <i className="fas fa-gavel action-icon" />
                            <div className="action-title">{i18n("pages.termsOfUse.actionCards.legal.title")}</div>
                            <div className="action-description">{i18n("pages.termsOfUse.actionCards.legal.description")}</div>
                        </div>
                    </Link>
                </div>
                {/* Footer */}
                <div className="footer">
                    {i18n("pages.termsOfUse.footer.copyright")}
                    <br />
                    {i18n("pages.termsOfUse.footer.lastUpdated")}
                </div>
            </div >
            {/* Scroll to Top Button */}
            < div className="scroll-top" id="scrollTop" >
                <i className="fas fa-chevron-up" />
            </div >
            {/* Notification Element */}

            <style>{`   .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            padding-bottom: 80px;
        }
        
        /* Header Section */
        .header {
            background-color: #0f0f0f;
            position: sticky;
            top: 0;
            z-index: 100;
            margin-bottom: 20px;
        }
        
        .header-content {
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
        
        /* Hero Section */
        .hero-section {
            background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .hero-title {
            font-size: 22px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 10px;
        }
        
        .hero-subtitle {
            font-size: 14px;
            color: #AAAAAA;
            line-height: 1.5;
        }
        
        /* Content Sections */
        .content-section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #F3BA2F;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #2A2A2A;
        }
        
        .content-item {
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 12px;
        }
        
        .item-title {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 16px;
            color: #F3BA2F;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .item-icon {
            font-size: 16px;
        }
        
        .item-content {
            font-size: 14px;
            color: #AAAAAA;
            line-height: 1.5;
        }
        
        /* Warning Section */
        .warning-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #FF6838;
        }
        
        .warning-title {
            font-size: 18px;
            font-weight: bold;
            color: #FF6838;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .warning-content {
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Important Notice */
        .notice-section {
            background-color: #1A1A1A;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            border-left: 4px solid #00C076;
        }
        
        .notice-title {
            font-size: 18px;
            font-weight: bold;
            color: #00C076;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notice-content {
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Action Cards */
        .action-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .action-card {
            background-color: #1A1A1A;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            transition: transform 0.2s;
            cursor: pointer;
        }
        
        .action-card:hover {
            transform: translateY(-3px);
        }
        
        .action-icon {
            font-size: 30px;
            color: #F3BA2F;
            margin-bottom: 12px;
        }
        
        .action-title {
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 15px;
        }
        
        .action-description {
            font-size: 13px;
            color: #AAAAAA;
        }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 20px 0;
            color: #AAAAAA;
            font-size: 12px;
            border-top: 1px solid #2A2A2A;
            margin-top: 20px;
        }
        
        /* Notification */
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #00C076;
            color: #0f0f0f;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .notification.show {
            opacity: 1;
        }
        
        /* Scroll to Top Button */
        .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: #F3BA2F;
            color: #0f0f0f;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .scroll-top.show {
            opacity: 1;
        }`}</style>
        </>
    )
}

export default Termeofuse
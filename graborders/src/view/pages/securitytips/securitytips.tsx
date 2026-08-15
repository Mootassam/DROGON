import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'
import { i18n } from '../../../i18n'

function SecurityTips() {

  const handleBackClick = () => {
    window.history.back();
  };
  
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-content">
          <div className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="page-title">{i18n("pages.securityTips.title")}</div>
          <div className="placeholder" />
        </div>
      </div>

      {/* Security Tips */}
      <div className="security-tips">
        <div className="section-title">{i18n("pages.securityTips.essentialTips")}</div>
        
        {/* Password Security */}
        <div className="tip-category">
          <div className="category-title">
            <i className="fas fa-key category-icon" />
            {i18n("pages.securityTips.categories.passwordSecurity")}
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.strongPasswords.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.strongPasswords.description")}
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.enable2FA.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.enable2FA.description")}
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.changePasswords.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.changePasswords.description")}
              </div>
            </div>
          </div>
        </div>

        {/* Device Security */}
        <div className="tip-category">
          <div className="category-title">
            <i className="fas fa-mobile-alt category-icon" />
            {i18n("pages.securityTips.categories.deviceSecurity")}
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.softwareUpdated.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.softwareUpdated.description")}
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.antivirus.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.antivirus.description")}
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.publicWifi.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.publicWifi.description")}
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="tip-category">
          <div className="category-title">
            <i className="fas fa-user-shield category-icon" />
            {i18n("pages.securityTips.categories.accountSecurity")}
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.loginNotifications.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.loginNotifications.description")}
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.reviewActivity.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.reviewActivity.description")}
              </div>
            </div>
          </div>
          <div className="tip-item">
            <i className="fas fa-check-circle tip-icon" />
            <div className="tip-content">
              <div className="tip-title">{i18n("pages.securityTips.tips.whitelisting.title")}</div>
              <div className="tip-description">
                {i18n("pages.securityTips.tips.whitelisting.description")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="action-cards">
        <div className="action-card">
          <i className="fas fa-shield-alt action-icon" />
          <div className="action-title">{i18n("pages.securityTips.actions.enable2FA")}</div>
          <div className="action-description">{i18n("pages.securityTips.actions.enable2FADesc")}</div>
        </div>
        <div className="action-card">
          <i className="fas fa-list-ul action-icon" />
          <div className="action-title">{i18n("pages.securityTips.actions.activityLog")}</div>
          <div className="action-description">{i18n("pages.securityTips.actions.activityLogDesc")}</div>
        </div>
        <div className="action-card">
          <i className="fas fa-wrench action-icon" />
          <div className="action-title">{i18n("pages.securityTips.actions.settings")}</div>
          <div className="action-description">{i18n("pages.securityTips.actions.settingsDesc")}</div>
        </div>
        <div className="action-card">
          <i className="fas fa-history action-icon" />
          <div className="action-title">{i18n("pages.securityTips.actions.backupCodes")}</div>
          <div className="action-description">{i18n("pages.securityTips.actions.backupCodesDesc")}</div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="emergency-section">
        <div className="emergency-title">
          <i className="fas fa-exclamation-triangle" />
          {i18n("pages.securityTips.emergency.title")}
        </div>
        <ul className="emergency-list">
          <li className="emergency-item">
            <i className="fas fa-phone emergency-icon" />
            <div className="emergency-content">
              <div className="emergency-text">
                {i18n("pages.securityTips.emergency.unauthorizedAccess")}
              </div>
            </div>
          </li>
          <li className="emergency-item">
            <i className="fas fa-ban emergency-icon" />
            <div className="emergency-content">
              <div className="emergency-text">
                {i18n("pages.securityTips.emergency.lostDevice")}
              </div>
            </div>
          </li>
          <li className="emergency-item">
            <i className="fas fa-lock emergency-icon" />
            <div className="emergency-content">
              <div className="emergency-text">
                {i18n("pages.securityTips.emergency.phishing")}
              </div>
            </div>
          </li>
        </ul>
        <div className="emergency-contact">
          <div className="contact-title">{i18n("pages.securityTips.emergency.supportTitle")}</div>
          <div className="contact-info">{i18n("pages.securityTips.emergency.supportEmail")}</div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="resources-section">
        <div className="section-title">{i18n("pages.securityTips.resources.title")}</div>
        <div className="resource-item">
          <div className="resource-icon">
            <i className="fas fa-book" />
          </div>
          <div className="resource-content">
            <div className="resource-title">{i18n("pages.securityTips.resources.securityGuide")}</div>
            <a href="#" className="resource-link">
              {i18n("pages.securityTips.resources.securityGuideLink")}
            </a>
          </div>
        </div>
        <div className="resource-item">
          <div className="resource-icon">
            <i className="fas fa-graduation-cap" />
          </div>
          <div className="resource-content">
            <div className="resource-title">{i18n("pages.securityTips.resources.learningCenter")}</div>
            <a href="#" className="resource-link">
              {i18n("pages.securityTips.resources.learningCenterLink")}
            </a>
          </div>
        </div>
        <div className="resource-item">
          <div className="resource-icon">
            <i className="fas fa-question-circle" />
          </div>
          <div className="resource-content">
            <div className="resource-title">{i18n("pages.securityTips.resources.faq")}</div>
            <a href="#" className="resource-link">
              {i18n("pages.securityTips.resources.faqLink")}
            </a>
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  )
}

export default SecurityTips
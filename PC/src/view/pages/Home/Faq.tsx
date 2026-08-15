import React, { useState, useEffect, useRef } from 'react';
import { i18n } from '../../../i18n';

// Define TypeScript interfaces
interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  icon: string;
  category: string;
}

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
  isExternal?: boolean;
}

const Faq: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const notificationRef = useRef<HTMLDivElement>(null);

  // FAQ Data
  const faqData: FAQItem[] = [
    {
      id: '1',
      question: i18n('pages.faq.questions.howToCreateAccount'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.goToWebsite')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.clickSignUp')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.enterDetails')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.verifyEmail')}
          </div>
        </div>
      ),
      icon: 'fa-user-plus',
      category: 'getting-started'
    },
    {
      id: '2',
      question: i18n('pages.faq.questions.howToCompleteVerification'),
      answer: i18n('pages.faq.answers.verificationProcess'),
      icon: 'fa-id-card',
      category: 'getting-started'
    },
    {
      id: '3',
      question: i18n('pages.faq.questions.howToBuyCrypto'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.completeVerification')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.clickBuyCrypto')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.selectCoinAndPayment')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.confirmTransaction')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.cryptoInWallet')}
          </div>
        </div>
      ),
      icon: 'fa-shopping-cart',
      category: 'getting-started'
    },
    {
      id: '4',
      question: i18n('pages.faq.questions.howToTrade'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.goToTradeMarkets')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.pickTradingPair')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.placeOrders')}
          </div>
        </div>
      ),
      icon: 'fa-chart-line',
      category: 'managing-account'
    },
    {
      id: '5',
      question: i18n('pages.faq.questions.howToSendReceive'),
      answer: (
        <>
          <strong>{i18n('pages.faq.labels.toReceive')}</strong> {i18n('pages.faq.steps.receiveCrypto')}
          <br />
          <br />
          <strong>{i18n('pages.faq.labels.toSend')}</strong> {i18n('pages.faq.steps.sendCrypto')}
        </>
      ),
      icon: 'fa-wallet',
      category: 'managing-account'
    },
    {
      id: '6',
      question: i18n('pages.faq.questions.howToBecomeP2PMerchant'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.applyP2P')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.meetCriteria')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.createOffers')}
          </div>
        </div>
      ),
      icon: 'fa-store',
      category: 'managing-account'
    },
    {
      id: '7',
      question: i18n('pages.faq.questions.howStakingWorks'),
      answer: (
        <div className="step-list">
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.goToStaking')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.pickStakingPlan')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.selectAmount')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.confirmStaking')}
          </div>
          <div className="step-items">
            <i className="fas fa-arrow-right step-arrow" />
            {i18n('pages.faq.steps.rewardsProcessed')}
          </div>
        </div>
      ),
      icon: 'fa-coins',
      category: 'managing-account'
    }
  ];

  const futuresData: FAQItem[] = [
    {
      id: 'f1',
      question: i18n('pages.faq.futures.whatAreFutures'),
      answer: i18n('pages.faq.futures.futuresExplanation'),
      icon: 'fa-file-contract',
      category: 'futures'
    },
    {
      id: 'f2',
      question: i18n('pages.faq.futures.whatIsLeverage'),
      answer: i18n('pages.faq.futures.leverageExplanation'),
      icon: 'fa-arrows-alt-h',
      category: 'futures'
    },
    {
      id: 'f3',
      question: i18n('pages.faq.futures.longShortPositions'),
      answer: (
        <>
          <strong>{i18n('pages.faq.futures.long')}</strong> {i18n('pages.faq.futures.longExplanation')}
          <br />
          <strong>{i18n('pages.faq.futures.short')}</strong> {i18n('pages.faq.futures.shortExplanation')}
        </>
      ),
      icon: 'fa-long-arrow-alt-up',
      category: 'futures'
    },
    {
      id: 'f4',
      question: i18n('pages.faq.futures.marginLiquidation'),
      answer: i18n('pages.faq.futures.marginExplanation'),
      icon: 'fa-exclamation-triangle',
      category: 'futures'
    },
    {
      id: 'f5',
      question: i18n('pages.faq.futures.fundingRate'),
      answer: i18n('pages.faq.futures.fundingRateExplanation'),
      icon: 'fa-percentage',
      category: 'futures'
    },
    {
      id: 'f6',
      question: i18n('pages.faq.futures.profitLossCalculation'),
      answer: i18n('pages.faq.futures.profitLossExplanation'),
      icon: 'fa-calculator',
      category: 'futures'
    }
  ];

  const actionCards: ActionCard[] = [
    {
      id: 'ac1',
      title: i18n('pages.faq.actionCards.contactSupport'),
      description: i18n('pages.faq.actionCards.getHelp'),
      icon: 'fa-headset',
      link: '/liveChat',
      isExternal: false
    },
    {
      id: 'ac4',
      title: i18n('pages.faq.actionCards.community'),
      description: i18n('pages.faq.actionCards.joinDiscussions'),
      icon: 'fa-comments',
      link: 'https://t.me/IC Markets Globalexchange_official',
      isExternal: true
    }
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFutures = futuresData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle back button click
  const handleBackClick = () => {
    window.history.back();
  };

  // Handle action card click
  const handleActionCardClick = (card: ActionCard) => {
    if (card.link) {
      if (card.isExternal) {
        window.open(card.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = card.link;
      }
    }
  };

  // Group FAQs by category for display
  const gettingStartedFaqs = filteredFaqs.filter(item => item.category === 'getting-started');
  const managingAccountFaqs = filteredFaqs.filter(item => item.category === 'managing-account');

  return (
    <div className="container">
      {/* Header Section */}
      <div className="headerq">
        <div className="header-content">
          <div className="back-button" onClick={handleBackClick}>
            <i className="fas fa-arrow-left" />
          </div>
          <div className="page-title">{i18n('pages.faq.title')}</div>
          <div className="placeholder"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-title">{i18n('pages.faq.hero.title')}</div>
        <div className="hero-subtitle">
          {i18n('pages.faq.hero.subtitle')}
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder={i18n('pages.faq.search.placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Getting Started Section */}
      {gettingStartedFaqs.length > 0 && (
        <div className="faq-section">
          <div className="section-title">{i18n('pages.faq.categories.gettingStarted')}</div>
          <div className="faq-category">
            {gettingStartedFaqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className="faq-question">
                  <i className={`fas ${faq.icon} faq-icon`} />
                  {faq.question}
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Managing Your Account Section */}
      {managingAccountFaqs.length > 0 && (
        <div className="faq-section">
          <div className="section-title">{i18n('pages.faq.categories.managingAccount')}</div>
          <div className="faq-category">
            {managingAccountFaqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <div className="faq-question">
                  <i className={`fas ${faq.icon} faq-icon`} />
                  {faq.question}
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Futures Trading Section */}
      {filteredFutures.length > 0 && (
        <div className="futures-section">
          <div className="futures-title">
            <i className="fas fa-chart-bar" />
            {i18n('pages.faq.futures.title')}
          </div>
          {filteredFutures.map((faq) => (
            <div key={faq.id} className="faq-item">
              <div className="faq-question">
                <i className={`fas ${faq.icon} faq-icon`} />
                {faq.question}
              </div>
              <div className="faq-answer">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits Section */}
      <div className="benefits-section">
        <div className="benefits-title">
          <i className="fas fa-star" />
          {i18n('pages.faq.benefits.title')}
        </div>
        <ul className="benefits-list">
          <li className="benefit-item">
            <i className="fas fa-shield-alt benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">{i18n('pages.faq.benefits.hedge')}</div>
            </div>
          </li>
          <li className="benefit-item">
            <i className="fas fa-rocket benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">{i18n('pages.faq.benefits.multiplyProfits')}</div>
            </div>
          </li>
          <li className="benefit-item">
            <i className="fas fa-arrows-alt-v benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">{i18n('pages.faq.benefits.tradeBothMarkets')}</div>
            </div>
          </li>
          <li className="benefit-item">
            <i className="fas fa-chess benefit-icon" />
            <div className="benefit-content">
              <div className="benefit-text">{i18n('pages.faq.benefits.advancedStrategies')}</div>
            </div>
          </li>
        </ul>
      </div>

      {/* Action Cards */}
      <div className="action-cards">
        {actionCards.map((card) => (
          <a
            key={card.id}
            className="action-card remove_blue"
            href={card.link || '#'}
            target={card.isExternal ? '_blank' : '_self'}
            rel={card.isExternal ? 'noopener noreferrer' : ''}
            onClick={(e) => {
              if (!card.link) {
                e.preventDefault();
              }
              handleActionCardClick(card);
            }}
          >
            <i className={`fas ${card.icon} action-icon`} />
            <div className="action-title">{card.title}</div>
            <div className="action-description">{card.description}</div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="footer">
        {i18n('pages.faq.footer.copyright')}
        <br />
        {i18n('pages.faq.footer.needHelp')}
      </div>

      {/* Notification Element */}
      <div
        ref={notificationRef}
        className={`notification ${showNotification ? 'show' : ''}`}
      >
        {notificationMessage}
      </div>



      <style>{`





.faq-container {
  
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 80px;
  background-color: #0f0f0f;
  min-height: 100vh;
}

/* Header Section */
.headerq {
  background-color: #0f0f0f;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
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
  width: 20px;
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
  font-size: 16px;
  color: #AAAAAA;
  line-height: 1.5;
}

/* FAQ Sections */
.faq-section {
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

.faq-category {
  margin-bottom: 25px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: #F3BA2F;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-icon {
  font-size: 18px;
}

.faq-item {
  background-color: #1A1A1A;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 12px;
}

.faq-question {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
  color: #FFFFFF;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.faq-icon {
  color: #00C076;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.faq-answer {
  font-size: 14px;
  color: #AAAAAA;
  line-height: 1.5;
  margin-left: 26px;
}

.step-list {
  margin-left: 26px;
  margin-top: 8px;
}

.step-items {
  font-size: 14px;
  color: #AAAAAA;
  line-height: 1.5;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.step-arrow {
  color: #F3BA2F;
  font-size: 12px;
  margin-top: 4px;
  flex-shrink: 0;
}

/* Futures Section */
.futures-section {
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  border-left: 4px solid #FF6838;
}

.futures-title {
  font-size: 18px;
  font-weight: bold;
  color: #FF6838;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.futures-content {
  font-size: 14px;
  line-height: 1.5;
}

/* Benefits Section */
.benefits-section {
  background-color: #1A1A1A;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  border-left: 4px solid #00C076;
}

.benefits-title {
  font-size: 18px;
  font-weight: bold;
  color: #00C076;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.benefits-list {
  list-style-type: none;
}

.benefit-item {
  padding: 10px 0;
  border-bottom: 1px solid #2A2A2A;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-icon {
  color: #00C076;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.benefit-content {
  flex: 1;
}

.benefit-text {
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

/* Search Bar */
.search-container {
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 15px;
  background-color: #1A1A1A;
  border: 1px solid #2A2A2A;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 14px;
}

.search-bar::placeholder {
  color: #AAAAAA;
}

.search-bar:focus {
  outline: none;
  border-color: #F3BA2F;
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

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  color: #AAAAAA;
  font-size: 12px;
  border-top: 1px solid #2A2A2A;
  margin-top: 20px;
}
      `}</style>
    </div>
  );
};

export default Faq;
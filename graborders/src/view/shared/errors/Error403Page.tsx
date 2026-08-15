import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from './../../../i18n';

function Error403Page() {
  return (
    <div className="error403-container">
      {/* Header – matching the other pages */}
      <div className="header">
        <div className="nav-bar">
          <div className="page-title">Access Denied</div>
        </div>
      </div>

      {/* White content card */}
      <div className="content-card">
        <div className="error403-content">
          {/* Crypto Animation – now using blue accent */}
          <div className="crypto-animation">
            <div className="crypto-icon bitcoin">
              <i className="fab fa-bitcoin" />
            </div>
            <div className="crypto-icon ethereum">
              <i className="fab fa-ethereum" />
            </div>
            <div className="crypto-icon altcoin">
              <i className="fas fa-coins" />
            </div>
          </div>

          {/* Warning Icon – red to indicate an error */}
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle" />
          </div>

          {/* Error Code */}
          <h1 className="error-code">403</h1>

          {/* Error Title */}
          <h2 className="error-title">Access Denied</h2>

          {/* Error Message */}
          <p className="error-message">
            {i18n('errors.403')}
          </p>

          {/* Home Button – now solid blue, matching other pages */}
          <Link to="/" className="home-button">
            <i className="fas fa-home" /> {i18n('errors.backToHome')}
          </Link>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .error403-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          color: white;
        }

        /* Header – transparent over gradient, centered */
        .header {
          background: transparent;
          min-height: 60px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .nav-bar {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .page-title {
          font-size: 17px;
          font-weight: 600;
          color: white;
        }

        /* White content card – identical to Market / Futures / Error500 */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
        }

        /* Error Content */
        .error403-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        /* Crypto Animation – same floating effect, now blue */
        .crypto-animation {
          position: relative;
          width: 200px;
          height: 100px;
          margin: 0 auto 20px;
        }
        .crypto-icon {
          position: absolute;
          font-size: 42px;
          color: #106cf5;
          opacity: 0.7;
          animation: float 3s ease-in-out infinite;
        }
        .bitcoin {
          left: 0;
          top: 0;
          animation-delay: 0s;
        }
        .ethereum {
          left: 70px;
          top: 20px;
          animation-delay: 0.5s;
        }
        .altcoin {
          left: 140px;
          top: 0;
          animation-delay: 1s;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* Warning Icon – red to convey "access denied" */
        .error-icon {
          font-size: 48px;
          color: #ff4d4d;
          margin-bottom: 10px;
        }

        /* Error Code */
        .error-code {
          font-size: 72px;
          font-weight: 700;
          color: #106cf5;
          margin: 10px 0;
          line-height: 1;
        }

        /* Error Title */
        .error-title {
          font-size: 24px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        /* Error Message */
        .error-message {
          font-size: 16px;
          color: #777;
          max-width: 300px;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        /* Home Button – solid blue, matching other pages */
        .home-button {
          background-color: #106cf5;
          border: none;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          text-decoration: none;
        }

        .home-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }

        /* Remove default link underline */
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export default Error403Page;
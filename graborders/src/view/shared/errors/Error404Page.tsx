import React from "react";
import { Link } from "react-router-dom";

function Error404Page() {
  return (
    <div className="error404-container">
      {/* Header – matching the blue gradient style */}
      <div className="header">
        <div className="nav-bar">
          <div className="page-title">Page Not Found</div>
        </div>
      </div>

      {/* White content card */}
      <div className="content-card">
        <div className="error404-content">
          {/* Forex Animation – now using blue accent */}
          <div className="forex-animation">
            <div className="forex-icon dollar">
              <i className="fas fa-dollar-sign" />
            </div>
            <div className="forex-icon euro">
              <i className="fas fa-euro-sign" />
            </div>
            <div className="forex-icon pound">
              <i className="fas fa-pound-sign" />
            </div>
          </div>

          {/* Warning Icon – red to indicate a 404 */}
          <div className="error-icon">
            <i className="fas fa-exclamation-circle" />
          </div>

          {/* Error Code */}
          <h1 className="error-code">404</h1>

          {/* Error Title */}
          <h2 className="error-title">Page Not Found</h2>

          {/* Error Message */}
          <p className="error-message">
            The page you're looking for doesn't exist. It might have been moved or
            you entered the wrong address.
          </p>

          {/* Home Button – solid blue, matching other pages */}
          <Link to="/" className="home-button">
            <i className="fas fa-home" /> Go Back Home
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

        .error404-container {
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

        /* White content card – identical to other error pages */
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
        .error404-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        /* Forex Animation – same floating effect, now blue */
        .forex-animation {
          position: relative;
          width: 200px;
          height: 100px;
          margin: 0 auto 20px;
        }
        .forex-icon {
          position: absolute;
          font-size: 48px;
          color: #106cf5;
          opacity: 0.7;
          animation: float 3s ease-in-out infinite;
        }
        .dollar {
          left: 0;
          top: 0;
          animation-delay: 0s;
        }
        .euro {
          left: 70px;
          top: 20px;
          animation-delay: 0.5s;
        }
        .pound {
          left: 140px;
          top: 0;
          animation-delay: 1s;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* Error Icon – kept red for warning */
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

        /* Home Button – solid blue, matching the app's buttons */
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

export default Error404Page;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Error500Page extends Component {
  render() {
    return (
      <div className="error-container">
        {/* Header – matching the blue gradient style */}
        <div className="header">
          <div className="nav-bar">
            <div className="page-title">Server Error</div>
          </div>
        </div>

        {/* White content card */}
        <div className="content-card">
          <div className="error-content">
            {/* Forex Animation – using blue accent now */}
            <div className="forex-animation">
              <div className="dollar">
                <i className="fas fa-dollar-sign" />
              </div>
              <div className="euro">
                <i className="fas fa-euro-sign" />
              </div>
              <div className="pound">
                <i className="fas fa-pound-sign" />
              </div>
            </div>

            {/* Error Code */}
            <div className="error-code">500</div>

            {/* Error Title */}
            <div className="error-title">Internal Server Error</div>

            {/* Error Message */}
            <div className="error-message">
              Oops! Something went wrong on our end. Our team has been notified and is
              working to fix the issue.
            </div>

            {/* Back to Home Button */}
            <Link to="/">
              <button className="home-button">
                <i className="fas fa-home home-icon" />
                Back to Home
              </button>
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

          .error-container {
            
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
            display: flex;
            flex-direction: column;
            color: white;
          }

          /* Header – same as other pages */
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

          /* White content card – identical to Market / Futures */
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
          .error-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
          }

          /* Forex Animation – now uses blue instead of green */
          .forex-animation {
            position: relative;
            width: 200px;
            height: 100px;
            margin: 0 auto 30px;
          }

          .dollar, .euro, .pound {
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

          /* Home Button – matching the blue buttons from Signin/Signup */
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

          .home-icon {
            font-size: 18px;
          }

          /* Remove underline from Link */
          a {
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }
}

export default Error500Page;
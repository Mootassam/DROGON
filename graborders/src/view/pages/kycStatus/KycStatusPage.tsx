import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import kycListActions from "src/modules/kyc/list/kycListActions";
import { i18n } from "../../../i18n";

function KycStatusPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const kycStatus = useSelector(kycSelectors.selectKycStatus);

  // Fetch KYC data on mount to get accurate status
  useEffect(() => {
    dispatch(kycListActions.doFetch());
  }, [dispatch]);

  // Get the redirect location if any
  const from = location.state?.from || "/";

  // If KYC is already verified, redirect to the intended page
  useEffect(() => {
    if (kycStatus === "success") {
      history.replace(from);
    }
  }, [kycStatus, history, from]);

  const renderContent = () => {
    switch (kycStatus) {
      case "pending":
        return (
          <div className="status-content">
            <div className="status-icon-wrapper pending">
              <i className="fas fa-clock" />
            </div>
            <h2 className="status-title">
              {i18n("pages.kycStatus.pending.title")}
            </h2>
            <p className="status-message">
              {i18n("pages.kycStatus.pending.message")}
            </p>
            <div className="status-note">
              <i className="fas fa-info-circle" />
              <span>{i18n("pages.kycStatus.pending.note")}</span>
            </div>
          </div>
        );

      case "unverified":
      default:
        return (
          <div className="status-content">
            <div className="status-icon-wrapper unverified">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <h2 className="status-title">
              {i18n("pages.kycStatus.unverified.title")}
            </h2>
            <p className="status-message">
              {i18n("pages.kycStatus.unverified.message")}
            </p>
            <div className="status-features">
              <h3>
                {i18n("pages.kycStatus.unverified.featuresTitle")}
              </h3>
              <ul>
                <li>
                  <i className="fas fa-shield-alt" />
                  <span>
                    {i18n("pages.kycStatus.unverified.features.password")}
                  </span>
                </li>
                <li>
                  <i className="fas fa-file-alt" />
                  <span>
                    {i18n("pages.kycStatus.unverified.features.withdrawal")}
                  </span>
                </li>
                <li>
                  <i className="fas fa-arrow-down" />
                  <span>
                    {i18n("pages.kycStatus.unverified.features.deposit")}
                  </span>
                </li>
                <li>
                  <i className="fas fa-arrow-up" />
                  <span>
                    {i18n("pages.kycStatus.unverified.features.withdraw")}
                  </span>
                </li>
              </ul>
            </div>
            <Link to="/proof" className="verify-button">
              {i18n("pages.kycStatus.unverified.verifyNow")}
            </Link>
          </div>
        );

      case "success":
        // This should not render as useEffect will redirect
        return null;
    }
  };

  return (
    <div className="kyc-status-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <button
            className="back-arrow"
            onClick={() => history.goBack()}
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </button>
          <div className="page-title">
            {kycStatus === "pending"
              ? i18n("pages.kycStatus.pending.title")
              : i18n("pages.kycStatus.unverified.title")}
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        {renderContent()}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .kyc-status-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header */
        .header {
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          font-weight: 300;
          cursor: pointer;
          transition: opacity 0.3s ease;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Status Content */
        .status-content {
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Icon Styles */
        .status-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 16px;
        }

        .status-icon-wrapper.pending {
          background-color: #e6f0ff;
          color: #106cf5;
          border: 2px solid #106cf5;
        }

        .status-icon-wrapper.unverified {
          background-color: #fef3e9;
          color: #ff7a00;
          border: 2px solid #ff7a00;
        }

        .status-icon-wrapper.success {
          background-color: #e6ffe6;
          color: #39FF14;
          border: 2px solid #39FF14;
        }

        /* Title and Message */
        .status-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #222;
        }

        .status-message {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 340px;
        }

        /* Status Note (used in pending) */
        .status-note {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #106cf5;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
          max-width: 340px;
          text-align: left;
        }

        .status-note i {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
          color: #106cf5;
        }

        /* Features List (for unverified) */
        .status-features {
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 340px;
        }

        .status-features h3 {
          font-size: 14px;
          color: #106cf5;
          margin-bottom: 14px;
          text-align: left;
        }

        .status-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .status-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #e7eaee;
          font-size: 13px;
          color: #333;
        }

        .status-features li:last-child {
          border-bottom: none;
        }

        .status-features li i {
          color: #106cf5;
          width: 16px;
          text-align: center;
        }

        /* Verify Button */
        .verify-button {
          width: 100%;
          max-width: 340px;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
        }

        .verify-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .verify-button:active {
          transform: translateY(0);
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .kyc-status-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .status-title {
            font-size: 20px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default KycStatusPage;
import React, { useMemo, useEffect, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";
import I18nSelect from "src/view/layout/I18nSelect";

const MENU_ITEMS = [
  {
    icon: "fas fa-language",
    name: i18n("pages.settings.language"),
    type: "modal",
    modal: "language",
  },
  {
    icon: "fas fa-shield-alt",
    path: "/typepassword",
    name: i18n("pages.profile.menu.password"),
    requiresKyc: true,
  },
  {
    icon: "fas fa-file-alt",
    path: "/history",
    name: i18n("pages.profile.menu.withdrawalAddress"),
    requiresKyc: true,
  },
  {
    icon: "fas fa-bell",
    path: "/notification",
    name: i18n("pages.profile.menu.notifications"),
  },
  {
    icon: "fas fa-comment-dots",
    path: "/online-service",
    name: i18n("pages.profile.menu.customerSupport"),
  },
  {
    icon: "fas fa-building",
    path: "/about",
    name: i18n("pages.profile.menu.aboutUs"),
  },
  {
    icon: "fas fa-question-circle",
    path: "/support",
    name: i18n("pages.profile.menu.helpcenter"),
  },
  {
    icon: "fas fa-download",
    path: "/download",
    name: i18n("pages.profile.menu.downloadApp"),
  },
  {
    icon: "fas fa-trash-alt",
    name: i18n("pages.profile.menu.clearCache"),
    type: "action",
  },
];

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const kycStatus = useSelector(kycSelectors.selectKycStatus);
  const loadingAssets = useSelector(assetsListSelectors.selectLoading);

  // ✅ Real balance from Redux
  const totalFiat = useSelector(assetsListSelectors.selectTotalFiat);

  const [hideAmounts, setHideAmounts] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const isKycVerified = useMemo(() => kycStatus === "success", [kycStatus]);
  const userData = useMemo(() => ({ user: currentUser }), [currentUser]);

  useEffect(() => {
    dispatch(actions.doFetch(userData, userData));
  }, [dispatch, userData]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      if (!mounted) return;
      try {
        await dispatch(assetsActions.doFetch(null, "USD"));
      } catch (e) {
        if (mounted) console.error(e);
      }
    };
    fetch();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handleSignout = useCallback(() => dispatch(authActions.doSignout()), [dispatch]);
  const toggleHideAmounts = useCallback(() => setHideAmounts((v) => !v), []);
  const openLanguageModal = useCallback(() => setIsLanguageModalOpen(true), []);
  const closeLanguageModal = useCallback(() => setIsLanguageModalOpen(false), []);

  const handleClearCache = useCallback(() => {
    alert(i18n("pages.profile.cache.cleared"));
  }, []);

  const displayName = currentUser?.fullName || currentUser?.email || i18n("pages.profile.user");
  const accountId = "ID: 1234 5678 9012"; // replace with real data if available
  const availableAssetsLabel = i18n("pages.wallet.totalUsdValue") || "Available Assets";

  // Format number with commas + two decimals
  const formatBalance = (value: number) => {
    if (value === null || value === undefined) return "0.00";
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // KYC helpers
  const getVerificationText = () => {
    switch (kycStatus) {
      case "success":
        return i18n("pages.profile.status.verified");
      case "pending":
        return i18n("pages.profile.verification.pending.status");
      default:
        return i18n("pages.profile.status.unverified");
    }
  };
  const getVerificationIcon = () => {
    switch (kycStatus) {
      case "success":
        return "fas fa-check-circle";
      case "pending":
        return "fas fa-clock";
      default:
        return "fas fa-exclamation-circle";
    }
  };
  const getVerificationButtonText = () => {
    switch (kycStatus) {
      case "success":
        return i18n("pages.profile.status.verified");
      case "pending":
        return i18n("pages.profile.verification.pending.button");
      default:
        return i18n("pages.profile.verification.alert.verifyNow");
    }
  };
  const isVerificationButtonDisabled = () => kycStatus === "success" || kycStatus === "pending";
  const shouldPulseBadge = () => kycStatus === "unverified";

  const validMenuItems = useMemo(() => {
    let items = MENU_ITEMS.map((item) => ({
      ...item,
      disabled: item?.requiresKyc && !isKycVerified,
    }));
    if (currentUser?.accountType === "demo") {
      items = items.map((item) => ({
        ...item,
        disabled: item.requiresKyc ? true : item.disabled,
      }));
    }
    return items;
  }, [isKycVerified, currentUser?.accountType]);

  const handleVerifyNow = useCallback(() => {
    if (kycStatus === "unverified") history.push("/proof");
    else if (kycStatus === "pending") alert(i18n("pages.profile.verification.pendingAlert"));
  }, [kycStatus, history]);

  const renderMenuItem = (item, index) => {
    if (item.type === "action") {
      return (
        <li className="menu-item" key={index} onClick={handleClearCache}>
          <div className="menu-icon-box">
            <i className={item.icon} />
          </div>
          <span className="menu-label">{item.name}</span>
          <span className="menu-arrow" />
        </li>
      );
    }

    if (item.type === "modal") {
      return (
        <li
          className={`menu-item ${item.disabled ? "disabled" : ""}`}
          key={index}
          onClick={openLanguageModal}
        >
          <div className="menu-icon-box">
            <i className={item.icon} />
          </div>
          <span className="menu-label">{item.name}</span>
          <span className="menu-arrow">
            <i className="fas fa-chevron-right" />
          </span>
        </li>
      );
    }

    const content = (
      <li className={`menu-item ${item.disabled ? "disabled" : ""}`}>
        <div className="menu-icon-box">
          <i className={item.icon} />
        </div>
        <span className="menu-label">{item.name}</span>
        <span className="menu-arrow">
          {!item.disabled && <i className="fas fa-chevron-right" />}
        </span>
      </li>
    );

    return item.disabled ? (
      <div key={item.name} className="menu-link-wrapper">
        {content}
      </div>
    ) : (
      <Link to={item.path} key={item.name} className="menu-link-wrapper">
        {content}
      </Link>
    );
  };

  return (
    <div className="profile-page">
      {/* ── Top gradient card ── */}
      <div className="balance-header-card">
        <div className="header-top-row">
          <div>
            <h2 className="simulation-title">
              {displayName}
              {currentUser?.accountType === "demo" && (
                <span className="demo-tag">DEMO</span>
              )}
            </h2>
            <p className="account-id">{accountId}</p>
          </div>
          <button className="eye-toggle" onClick={toggleHideAmounts}>
            <i className={`fas ${hideAmounts ? "fa-eye-slash" : "fa-eye"}`} />
          </button>
        </div>

        {/* ✅ Dynamic balance */}
        <div className="balance-amount">
          {loadingAssets ? (
            <div className="skeleton-line amount-skel" />
          ) : hideAmounts ? (
            "••••••"
          ) : (
            `$${formatBalance(totalFiat)}`
          )}
        </div>
        <p className="balance-subtitle">
          {loadingAssets ? (
            <div className="skeleton-line sub-skel" />
          ) : hideAmounts ? (
            "••••"
          ) : (
            availableAssetsLabel
          )}
        </p>
      </div>

      {/* ── Deposit / Withdraw buttons ── */}
      <div className="action-buttons-section">
        <Link to="/deposit" className="action-btn deposit-btn">
          <i className="fas fa-wallet" />
          <div className="btn-text-group">
            <span className="btn-main-text">Deposit</span>
            <span className="btn-sub-text">Billing Details &gt;&gt;</span>
          </div>
        </Link>
        <Link to="/withdraw" className="action-btn withdraw-btn">
          <i className="fas fa-money-bill-wave" />
          <div className="btn-text-group">
            <span className="btn-main-text">Withdraw</span>
            <span className="btn-sub-text">Withdraw Details &gt;&gt;</span>
          </div>
        </Link>
      </div>

      {/* ── Menu list ── */}
      <div className="menu-section">
        <ul className="menu-list">
          {currentUser?.accountType !== "demo" && (
            <li className="menu-item kyc-line">
              <div className="menu-icon-box kyc-icon">
                <i className={getVerificationIcon()} />
              </div>
              <span className="menu-label">{getVerificationText()}</span>
              <div className="menu-action">
                <button
                  className={`kyc-button ${shouldPulseBadge() ? "pulse" : ""}`}
                  onClick={handleVerifyNow}
                  disabled={isVerificationButtonDisabled()}
                >
                  {getVerificationButtonText()}
                </button>
              </div>
            </li>
          )}
          {validMenuItems.map((item, idx) => renderMenuItem(item, idx))}
        </ul>

        <button className="logout-btn" onClick={handleSignout}>
          <i className="fas fa-sign-out-alt" /> {i18n("pages.profile.menu.logout")}
        </button>
      </div>

      {/* ── Language Modal ── */}
      {isLanguageModalOpen && (
        <div className="modal-overlay" onClick={closeLanguageModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-handle" />
              <div className="modal-title-row">
                <span className="modal-title-text">
                  {i18n("pages.settings.modals.language.title")}
                </span>
                <button className="modal-close" onClick={closeLanguageModal}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="modal-body">
              <I18nSelect isInModal={true} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        :root {
          --blue-start: #1E6DEB;
          --blue-end: #3A8DFF;
          --deposit-blue: #1E6DEB;
          --withdraw-red: #F04444;
          --icon-box-bg: #EAF2FF;
          --text-dark: #1a1d23;
          --text-muted: #6b7280;
          --bg-page: #F5F7FA;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
          --shadow: 0 4px 12px rgba(0,0,0,0.06);
          --shadow-md: 0 8px 24px rgba(0,0,0,0.10);
          --radius-sm: 12px;
          --radius: 16px;
          --radius-lg: 20px;
        }

        * { margin:0; padding:0; box-sizing:border-box; }

        .profile-page {
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--bg-page);
          min-height: 100vh;
          color: var(--text-dark);
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 30px;  /* ✅ added as requested */
        }

        /* ── top gradient card ── */
        .balance-header-card {
          background: linear-gradient(135deg, var(--blue-start), var(--blue-end));
          padding: 24px 20px;
          color: white;
          box-shadow: var(--shadow-md);
        }

        .header-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .simulation-title {
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .demo-tag {
          background: #FF6838;
          color: white;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .account-id {
          font-size: 13px;
          opacity: 0.7;
        }

        .eye-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.8;
          padding: 6px;
          border-radius: 50%;
          transition: opacity 0.2s;
        }
        .eye-toggle:hover { opacity: 1; }

        .balance-amount {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }

        .balance-subtitle {
          font-size: 14px;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .skeleton-line {
          height: 16px;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          display: inline-block;
        }
        .amount-skel { width: 140px; height: 30px; }
        .sub-skel { width: 90px; height: 14px; }

        /* ── action buttons ── */
        .action-buttons-section {
          padding: 20px 16px 0;
          display: flex;
          gap: 10px;
        }

        .action-btn {
          flex: 1;
          border-radius: var(--radius);
          padding: 11px 12px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .action-btn:active { transform: scale(0.97); }

        .deposit-btn { background: var(--deposit-blue); }
        .withdraw-btn { background: var(--withdraw-red); }

        .action-btn i {
          font-size: 20px;
          flex-shrink: 0;
        }

        .btn-text-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .btn-main-text {
          font-weight: 700;
          font-size: 15px;
          line-height: 1.2;
        }

        .btn-sub-text {
          font-size: 11px;
          font-weight: 300;
          opacity: 0.9;
        }

        /* ── menu section (transparent background, white cards) ── */
        .menu-section {
          margin: 24px 10px 30px;
        }

        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          text-decoration: none;
          color: inherit;
          transition: background 0.15s;
          border: none;
        }
        .menu-item:not(.disabled):hover {
          background: #f8f9fb;
        }

        .menu-item.disabled {
          opacity: 0.5;
          cursor: default;
        }

        .kyc-line {
          /* keeps same style */
        }

        .menu-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--icon-box-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          color: #1E6DEB;
          font-size: 17px;
          flex-shrink: 0;
        }

        .kyc-icon {
          background: var(--icon-box-bg);
          color: #1E6DEB;
        }

        .menu-label {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-dark);
        }

        .menu-arrow {
          color: #cbd5e1;
          font-size: 13px;
        }

        .menu-action {
          margin-left: auto;
        }

        .kyc-button {
          background: #1E6DEB;
          color: white;
          border: none;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .kyc-button:not(:disabled):hover { background: #1554c0; }
        .kyc-button:disabled {
          background: #e5e7eb;
          color: #9ca3af;
          cursor: default;
        }
        .kyc-button.pulse { animation: pulse 2s infinite; }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(30,109,235,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(30,109,235,0); }
          100% { box-shadow: 0 0 0 0 rgba(30,109,235,0); }
        }

        .menu-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        /* ── logout button (new light red theme) ── */
        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          margin-top: 16px;
          padding: 14px;
          background: #FEF2F2;      /* light red background */
          border: 1px solid #FECACA; /* subtle red border */
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          font-size: 15px;
          font-weight: 600;
          color: #DC2626;           /* red text */
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .logout-btn:hover {
          background: #FEE2E2;
          color: #B91C1C;
          border-color: #FCA5A5;
        }
        .logout-btn i {
          font-size: 17px;
        }

        /* ── modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container {
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 20px 20px 0 0;
          padding: 16px 16px 24px;
          animation: slideUp 0.3s ease;
        }
        .modal-handle {
          width: 36px; height: 4px;
          background: #d1d5db;
          border-radius: 2px;
          margin: 0 auto 12px;
        }
        .modal-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title-text {
          font-size: 17px;
          font-weight: 700;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 18px;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
        }
        .modal-close:hover { background: #f3f4f6; }
        .modal-body { margin-top: 16px; }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Profile;
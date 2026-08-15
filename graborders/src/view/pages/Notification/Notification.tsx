
import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import notificationFormActions from "src/modules/notification/form/notificationFormActions";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";
import Dates from "src/view/shared/utils/Dates";
import { i18n } from "../../../i18n";
import LoadingModal from "src/shared/LoadingModal";

const typeConfig = {
  deposit: {
    icon: "fas fa-arrow-down",
    title: i18n("pages.notification.types.deposit.title"),
    getMessage: (item) => i18n("pages.notification.types.deposit.message", item.message),
  },
  withdraw: {
    icon: "fas fa-arrow-up",
    title: i18n("pages.notification.types.withdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.withdraw.message", item.message),
  },
  staking: {
    icon: "fas fa-coins",
    title: i18n("pages.notification.types.staking.title"),
    getMessage: (item) => i18n("pages.notification.types.staking.message", item.message),
  },
  kyc: {
    icon: "fas fa-id-card",
    title: i18n("pages.notification.types.kyc.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.kyc.defaultMessage"),
  },
  commission: {
    icon: "fas fa-hand-holding-dollar",
    title: i18n("pages.notification.types.commission.title"),
    getMessage: (item) => i18n("pages.notification.types.commission.message", item.message),
  },
  futures: {
    icon: "fas fa-chart-line",
    title: i18n("pages.notification.types.futures.title"),
    getMessage: (item) => i18n("pages.notification.types.futures.message", item.message),
  },
  accountActivated: {
    icon: "fas fa-user-check",
    title: i18n("pages.notification.types.accountActivated.title"),
    getMessage: (item) => i18n("pages.notification.types.accountActivated.message", item.message),
  },
  custom: {
    icon: "fas fa-bell",
    title: i18n("pages.notification.types.custom.title"),
    getMessage: (item) => item.message || i18n("pages.notification.types.custom.defaultMessage"),
  },
  cancel_deposit: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelDeposit.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelDeposit.message", item.message),
  },
  cancel_withdraw: {
    icon: "fas fa-ban",
    title: i18n("pages.notification.types.cancelWithdraw.title"),
    getMessage: (item) => i18n("pages.notification.types.cancelWithdraw.message", item.message),
  },
  cancel_activated: {
    icon: "fas fa-user-slash",
    title: i18n("pages.notification.types.cancelActivated.title"),
    getMessage: () => i18n("pages.notification.types.cancelActivated.message"),
  },
};

function Notification() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allNotification = useSelector(notificationListSelectors.selectRows);
  const loadingNotification = useSelector(
    notificationListSelectors.selectLoading
  );
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const status = activeFilter === "all" ? "" : activeFilter;
    dispatch(notificationListActions.doFetch(status));
  }, [dispatch, activeFilter]);

  const handleNotificationClick = (item) => {
    dispatch(notificationFormActions.doUpdate(item.id));

    if (item.type === "accountActivated") {
      window.location.href = "/profile";
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filterTabs = [
    { key: "all", label: i18n("pages.notification.filters.all") },
    { key: "unread", label: i18n("pages.notification.filters.unread") },
    { key: "read", label: i18n("pages.notification.filters.read") },
  ];

  return (
    <div className="notification-container">
      {/* Header Section - Matching About Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Notifications</div>
        </div>
      </div>

      {/* Content Card - Matching About Page */}
      <div className="content-card">
        {/* Filter Tabs */}
        <div className="filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              className={`filter-tab ${activeFilter === tab.key ? "active" : ""}`}
              onClick={() => handleFilterChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification Content */}
        <div className="notification-content">
          {loadingNotification ? (
            <div className="loading-container">
              <LoadingModal />
            </div>
          ) : allNotification?.length > 0 ? (
            <div className="notification-list">
              {allNotification.map((item) => {
                const config = typeConfig[item.type] || typeConfig.custom;
                return (
                  <div
                    key={item.id}
                    className={`notification-item ${item.status === "unread" ? "unread" : ""
                      }`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <div className="notification-icon">
                      <i className={config.icon} />
                    </div>
                    <div className="notification-details">
                      <div className="notification-title">{config.title}</div>
                      <div className="notification-message">
                        {config.getMessage(item)}
                      </div>
                      <div className="notification-time">
                        {Dates.Monthago(item.createdAt)}
                      </div>
                    </div>
                    {item.status === "unread" && (
                      <div className="unread-indicator" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-bell-slash" />
              </div>
              <div className="empty-title">{i18n("pages.notification.emptyState.title")}</div>
              <div className="empty-message">
                {activeFilter === "all"
                  ? i18n("pages.notification.emptyState.noNotifications")
                  : i18n("pages.notification.emptyState.noFilteredNotifications", activeFilter)}
              </div>
            </div>
          )}
        </div>
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

        .notification-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching About Page */
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
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
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

        /* Content Card - Matching About Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 25px;
        }

        .filter-tab {
          flex: 1;
          padding: 10px 16px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .filter-tab:hover {
          background: rgba(16, 108, 245, 0.1);
        }

        .filter-tab.active {
          background: white;
          color: #106cf5;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          font-weight: 600;
        }

        /* Notification Content */
        .notification-content {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Notification List */
        .notification-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-item {
          display: flex;
          align-items: flex-start;
          padding: 16px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .notification-item:hover {
          border-color: #106cf5;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
          transform: translateY(-2px);
        }

        .notification-item.unread {
          background: #f8fbff;
          border-color: #d1e3ff;
        }

        .notification-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .notification-icon i {
          font-size: 18px;
          color: white;
        }

        .notification-details {
          flex: 1;
          min-width: 0;
        }

        .notification-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .notification-message {
          font-size: 13px;
          color: #555;
          margin-bottom: 8px;
          line-height: 1.5;
          word-break: break-word;
        }

        .notification-time {
          font-size: 12px;
          color: #888f99;
          font-weight: 500;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          background: #106cf5;
          border-radius: 50%;
          margin-left: 10px;
          flex-shrink: 0;
          margin-top: 4px;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          color: #e7eaee;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
        }

        .empty-message {
          font-size: 14px;
          color: #888f99;
          line-height: 1.5;
          max-width: 250px;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .notification-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 100px;
          }

          .notification-item {
            padding: 14px;
          }

          .notification-icon {
            width: 36px;
            height: 36px;
          }

          .notification-icon i {
            font-size: 16px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .notification-list {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Notification;

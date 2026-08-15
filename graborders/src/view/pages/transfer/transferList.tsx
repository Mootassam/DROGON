import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import assetsListActions from 'src/modules/assets/list/assetsListActions';
import selectors from 'src/modules/assets/list/assetsListSelectors';
import { i18n } from "../../../i18n";
import LoadingModal from 'src/shared/LoadingModal';

function TransferList() {
  const dispatch = useDispatch();
  const transferList = useSelector(selectors.selectListTransfer);
  const loading = useSelector(selectors.selectLoading);

  useEffect(() => {
    dispatch(assetsListActions.TransferList());
  }, [dispatch]);

  // Format date similar to History component
  const formatDate = (date) => {
    const transferDate = new Date(date);
    const now = new Date();
    const isToday = transferDate.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = transferDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return i18n("pages.history.dateFormats.today", transferDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else if (isYesterday) {
      return i18n("pages.history.dateFormats.yesterday", transferDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else {
      return transferDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  // Function to get display name for account types
  const getAccountDisplayName = (account) => {
    switch (account) {
      case 'trade':
        return i18n("pages.transfer.accountTypes.trade");
      case 'perpetual':
        return i18n("pages.transfer.accountTypes.perpetual");
      case 'exchange':
        return i18n("pages.transfer.accountTypes.exchange");
      default:
        return account;
    }
  };

  return (
    <div className="transferlist-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.transfer.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="transfer-content">
          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <LoadingModal />
            </div>
          )}

          {/* Content when not loading */}
          {!loading && (
            <>
              {/* Transfer List */}
              <div className="transaction-list">
                {transferList && transferList.length > 0 ? (
                  transferList.map((transfer) => (
                    <div className="transaction-item" key={transfer._id}>
                      <div className="transaction-info">
                        <div className="transaction-icon">
                          <i className="fas fa-exchange-alt" />
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-type">
                            {getAccountDisplayName(transfer.fromAccount)} → {getAccountDisplayName(transfer.toAccount)}
                          </div>
                          <div className="transaction-date">
                            {transfer.createdAt ? formatDate(transfer.createdAt) : i18n("common.dateNotAvailable")}
                          </div>
                        </div>
                      </div>
                      <div className="transaction-amount">
                        <div className="amount positive">
                          +{transfer.amount}
                        </div>
                        <div className={`transaction-status status-${transfer.status}`}>
                          {transfer.status === 'completed' ? i18n("pages.transfer.status.completed") : transfer.status}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-message">
                    <i className="fas fa-exchange-alt"></i>
                    <p>{i18n("pages.transfer.noTransferHistory")}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* TransferList Container – matches login/profile containers */
        .transferlist-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header / Navigation */
        .header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          margin-top: 20px;
          border-top: 2px solid #39FF14;
        }

        .transfer-content {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Transaction List */
        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .transaction-item:hover {
          border-color: #39FF14;
          background-color: #2a2a2a;
        }

        .transaction-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .transaction-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #2a2a2a;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #39FF14;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
        }

        .transaction-type {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
          color: #ffffff;
        }

        .transaction-date {
          color: #777777;
          font-size: 12px;
        }

        .transaction-amount {
          text-align: right;
        }

        .amount {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
        }
        .amount.positive {
          color: #39FF14;
        }

        .transaction-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
        }
        .transaction-status.status-completed {
          background-color: rgba(57, 255, 20, 0.1);
          color: #39FF14;
        }
        .transaction-status.status-pending {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }
        .transaction-status.status-canceled {
          background-color: rgba(255, 77, 77, 0.1);
          color: #ff4d4d;
        }

        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          text-align: center;
          color: #777777;
          padding: 40px 20px;
        }
        .no-data-message i {
          font-size: 48px;
          color: #2a2a2a;
          margin-bottom: 16px;
        }
        .no-data-message p {
          font-size: 14px;
          max-width: 250px;
          line-height: 1.4;
          color: #aaaaaa;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
          }
          .content-card {
            padding: 20px 16px;
          }
          .transaction-type {
            font-size: 13px;
          }
          .transaction-date {
            font-size: 11px;
          }
          .amount {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default TransferList;
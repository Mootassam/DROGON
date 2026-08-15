
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import transactionListSelector from "src/modules/transaction/list/transactionListSelectors";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import { i18n } from "../../../i18n";
import LoadingModal from "src/shared/LoadingModal";

function History() {
  const dispatch = useDispatch();

  const [typeFilter, setTypeFilter] = useState("all");
  const Transactionloading = useSelector(transactionListSelector.selectLoading);
  const transaction = useSelector(transactionListSelector.selectRows);

  useEffect(() => {
    dispatch(transactionListActions.doFetch());
  }, [dispatch]);

  // Enhanced transaction configuration
  const getTransactionConfig = (type, direction, relatedAsset) => {
    const config = {
      icon: 'fa-exchange-alt',
      typeText: i18n("pages.history.transactionTypes.transaction"),
      iconClass: 'swap',
      color: '#627EEA',
      amountColor: direction === 'in' ? '#2ff378' : '#FF6838'
    };

    switch (type) {
      case 'deposit':
        config.icon = 'fa-arrow-down';
        config.typeText = i18n("pages.history.transactionTypes.deposit");
        config.iconClass = 'deposit';
        config.color = '#F3BA2F';
        config.amountColor = '#2ff378';
        break;

      case 'withdraw':
        config.icon = 'fa-arrow-up';
        config.typeText = i18n("pages.history.transactionTypes.withdrawal");
        config.iconClass = 'withdraw';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'convert_in':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedFrom", relatedAsset) : i18n("pages.history.transactionTypes.conversionIn");
        config.iconClass = 'convert-in';
        config.color = '#9C27B0';
        config.amountColor = '#2ff378';
        break;

      case 'convert_out':
        config.icon = 'fa-exchange-alt';
        config.typeText = relatedAsset ? i18n("pages.history.transactionTypes.convertedTo", relatedAsset) : i18n("pages.history.transactionTypes.conversionOut");
        config.iconClass = 'convert-out';
        config.color = '#9C27B0';
        config.amountColor = '#FF6838';
        break;

      case 'stacking':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.stakedAmount");
        config.iconClass = 'stacking';
        config.color = '#FF9800';
        config.amountColor = '#FFB74D';
        break;

      case 'staking_reward':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.stakingRewards");
        config.iconClass = 'staking_reward';
        config.color = '#4CAF50';
        config.amountColor = '#81C784';
        break;

      case 'futures_profit':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresProfit");
        config.iconClass = 'futures-profit';
        config.color = '#00C076';
        config.amountColor = '#00C076';
        break;

      case 'futures_loss':
        config.icon = 'fa-chart-line';
        config.typeText = i18n("pages.history.transactionTypes.futuresLoss");
        config.iconClass = 'futures-loss';
        config.color = '#FF6838';
        config.amountColor = '#FF6838';
        break;

      case 'spot_profit':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.spotTradingProfit");
        config.iconClass = 'spot-profit';
        config.color = '#4CAF50';
        config.amountColor = '#2ff378';
        break;

      case 'spot_loss':
        config.icon = 'fa-coins';
        config.typeText = i18n("pages.history.transactionTypes.spotTradingLoss");
        config.iconClass = 'spot-loss';
        config.color = '#FF5722';
        config.amountColor = '#FF6838';
        break;

      case 'reward':
        config.icon = 'fa-hand-holding-dollar';
        config.typeText = i18n("pages.history.transactionTypes.referralReward");
        config.iconClass = 'spot-profit';
        config.color = '#63f211ff';
        config.amountColor = '#5ffc1bff';
        break;

      case 'bonus':
        config.icon = 'fa-gift';
        config.typeText = i18n("pages.history.transactionTypes.bonus");
        config.iconClass = 'bonus';
        config.color = '#E91E63';
        config.amountColor = '#E91E63';
        break;

      default:
        config.icon = 'fa-exchange-alt';
        config.typeText = i18n("pages.history.transactionTypes.transaction");
        config.iconClass = 'default';
        config.color = '#627EEA';
        config.amountColor = '#627EEA';
    }
    return config;
  };

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    if (!transaction) return [];

    return transaction.filter((tx) => {
      // Apply type filter
      if (typeFilter !== "all") {
        const typeMatch =
          typeFilter === "deposits" ? (tx.type === "deposit" || tx.direction === "in") :
            typeFilter === "withdrawals" ? (tx.type === "withdraw" || tx.direction === "out") :
              typeFilter === "profits" ? (tx.type.includes('profit') || (tx.direction === "in" && tx.type !== "deposit")) :
                typeFilter === "losses" ? (tx.type.includes('loss') || (tx.direction === "out" && tx.type !== "withdraw")) :
                  typeFilter === "conversions" ? tx.type.includes('convert') :
                    typeFilter === "stacking" ? tx.type === "stacking" : true;
        if (!typeMatch) return false;
      }

      return true;
    });
  }, [transaction, typeFilter]);

  // Format date based on how recent it is
  const formatDate = (date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const isToday = transactionDate.toDateString() === now.toDateString();

    // Reset now date after checking today
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = transactionDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return i18n("pages.history.dateFormats.today", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else if (isYesterday) {
      return i18n("pages.history.dateFormats.yesterday", transactionDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } else {
      return transactionDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="history-container">
      {/* Header Section - Matching About Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to='/profile' className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.history.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching About Page */}
      <div className="content-card">
        <div className="history-content">
          {/* Loading State */}
          {Transactionloading && (
            <div className="loading-container">
              <LoadingModal />
            </div>
          )}

          {/* Content when not loading */}
          {!Transactionloading && (
            <>
              {/* Filter Options */}
              <div className="filter-options">
                <button
                  className={`filter-option ${typeFilter === "all" ? "active" : ""}`}
                  onClick={() => setTypeFilter("all")}
                >
                  {i18n("pages.history.filters.all")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "deposits" ? "active" : ""}`}
                  onClick={() => setTypeFilter("deposits")}
                >
                  {i18n("pages.history.filters.deposits")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "withdrawals" ? "active" : ""}`}
                  onClick={() => setTypeFilter("withdrawals")}
                >
                  {i18n("pages.history.filters.withdrawals")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "profits" ? "active" : ""}`}
                  onClick={() => setTypeFilter("profits")}
                >
                  {i18n("pages.history.filters.profits")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "losses" ? "active" : ""}`}
                  onClick={() => setTypeFilter("losses")}
                >
                  {i18n("pages.history.filters.losses")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "conversions" ? "active" : ""}`}
                  onClick={() => setTypeFilter("conversions")}
                >
                  {i18n("pages.history.filters.conversions")}
                </button>
                <button
                  className={`filter-option ${typeFilter === "stacking" ? "active" : ""}`}
                  onClick={() => setTypeFilter("stacking")}
                >
                  {i18n("pages.history.filters.stacking")}
                </button>
              </div>

              {/* Transaction List */}
              <div className="transaction-list">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => {
                    const { icon, typeText, iconClass, amountColor } = getTransactionConfig(
                      transaction.type,
                      transaction.direction,
                      transaction.relatedAsset
                    );

                    return (
                      <div className="transaction-item" key={transaction.id}>
                        <div className="transaction-info">
                          <div
                            className={`transaction-icon ${iconClass}`}
                            style={{ backgroundColor: getTransactionConfig(transaction.type, transaction.direction, transaction.relatedAsset).color }}
                          >
                            <i className={`fas ${icon}`} />
                          </div>
                          <div className="transaction-details">
                            <div className="transaction-type">
                              {typeText}
                            </div>
                            <div className="transaction-date">
                              {formatDate(transaction.dateTransaction)}
                            </div>
                          </div>
                        </div>
                        <div className="transaction-amount">
                          <div
                            className="amount"
                            style={{ color: amountColor }}
                          >
                            {transaction.direction === 'in' ? '+' : '-'}
                            {transaction.amount.toFixed(5)} {transaction.asset}
                          </div>
                          <div
                            className={`transaction-status status-${transaction.status}`}
                          >
                            {i18n(`pages.history.status.${transaction.status}`)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-data-message">
                    <i className="fas fa-receipt"></i>
                    <p>No transaction history available</p>
                  </div>
                )}
              </div>
            </>
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

        .history-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .history-content {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        /* Filter Options */
        .filter-options {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 0 20px 0;
          margin-bottom: 20px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .filter-options::-webkit-scrollbar {
          display: none;
        }

        .filter-option {
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid #e7eaee;
          background-color: #f8f9fa;
          color: #555;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-option.active {
          background-color: #106cf5;
          color: #fff;
          border-color: #106cf5;
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
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .transaction-item:hover {
          background-color: #f0f2f5;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #FFF;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
        }

        .transaction-type {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 14px;
          color: #222;
        }

        .transaction-date {
          color: #888f99;
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

        .transaction-status {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          display: inline-block;
        }

        .transaction-status.status-completed {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .transaction-status.status-pending {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .transaction-status.status-canceled {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          text-align: center;
          color: #888f99;
          padding: 40px 20px;
        }

        .no-data-message i {
          font-size: 48px;
          color: #e7eaee;
          margin-bottom: 16px;
        }

        .no-data-message p {
          font-size: 14px;
          max-width: 250px;
          line-height: 1.4;
        }

        /* Enhanced transaction icons */
        .transaction-icon.deposit { background-color: #F3BA2F !important; }
        .transaction-icon.withdraw { background-color: #FF6838 !important; }
        .transaction-icon.convert-in { background-color: #9C27B0 !important; }
        .transaction-icon.convert-out { background-color: #9C27B0 !important; }
        .transaction-icon.stacking { background-color: #FF9800 !important; }
        .transaction-icon.staking_reward { background-color: #4CAF50 !important; }
        .transaction-icon.futures-profit { background-color: #00C076 !important; }
        .transaction-icon.futures-loss { background-color: #FF6838 !important; }
        .transaction-icon.spot-profit { background-color: #4CAF50 !important; }
        .transaction-icon.spot-loss { background-color: #FF5722 !important; }
        .transaction-icon.default { background-color: #627EEA !important; }
        .transaction-icon.swap { background-color: #627EEA !important; }
        .transaction-icon.bonus { background-color: #E91E63 !important; }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .history-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .filter-option {
            font-size: 12px;
            padding: 6px 12px;
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

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .transaction-list {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default History;

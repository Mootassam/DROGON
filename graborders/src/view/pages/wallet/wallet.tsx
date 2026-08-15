import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import authSelectors from "src/modules/auth/authSelectors";
import { i18n } from "../../../i18n";

// Constants - only Deposit and Withdraw remain
const QUICK_ACTIONS = [
  { path: "/deposit", icon: "fas fa-arrow-down", name: i18n("pages.wallet.quickActions.deposit") },
  { path: "/withdraw", icon: "fas fa-arrow-up", name: i18n("pages.wallet.quickActions.withdraw") },
];

// Memoized components
const QuickActionItem = memo(({ item }: { item: typeof QUICK_ACTIONS[0] }) => (
  <Link
    to={item.path}
    className="action-item remove_blue"
    role="button"
    aria-label={item.name}
  >
    <div className="action-icon">
      <i className={item.icon} aria-hidden="true" />
    </div>
    <span className="action-label">{item.name}</span>
  </Link>
));

QuickActionItem.displayName = 'QuickActionItem';

// Forex Asset Card – matches Profile's card style
const AssetCard = memo(({ 
  asset, 
  hideAmounts 
}: { 
  asset: any; 
  hideAmounts: boolean;
}) => {
  // Generate a simple icon based on currency code
  const getIconContent = (symbol: string) => {
    return symbol.charAt(0).toUpperCase();
  };

  const iconContent = getIconContent(asset.symbol);

  return (
    <div className="asset-card">
      <div className="asset-header">
        <div className="asset-icon fiat-icon">
          <span className="icon-letter">{iconContent}</span>
        </div>
        <div className="asset-info">
          <div className="asset-name">{asset.coinName}</div>
          <div className="asset-symbol">{asset.symbol}</div>
        </div>
      </div>
      <div className="asset-details-row">
        <div className="asset-detail-item">
          <span className="asset-label">{i18n("pages.wallet.assetLabels.availableBalance")}</span>
          <span className="asset-value">
            {hideAmounts ? i18n("common.hidden") : asset.amount}
          </span>
        </div>
        <div className="asset-detail-item">
          <span className="asset-label">{i18n("pages.wallet.assetLabels.frozenAmount")}</span>
          <span className="asset-value">
            {hideAmounts ? i18n("common.hidden") : asset.amountFreezed}
          </span>
        </div>
        <div className="asset-detail-item valuation">
          <span className="asset-label">{i18n("pages.wallet.assetLabels.valuation")} (USD)</span>
          <span className="asset-value">
            {hideAmounts ? i18n("common.hidden") : `$${asset.balanceFiat}`}
          </span>
        </div>
      </div>
    </div>
  );
});

AssetCard.displayName = 'AssetCard';

// Main component
function Wallet() {
  const dispatch = useDispatch();
  
  // Selectors
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const selectTotalFiat = useSelector(assetsListSelectors.selectTotalFiat);
  const loading = useSelector(assetsListSelectors.selectLoading);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  
  // State
  const [hideAmounts, setHideAmounts] = useState(false);

  // Memoized callbacks
  const toggleHideAmounts = useCallback(() => {
    setHideAmounts(prev => !prev);
  }, []);

  // Fetch assets on mount
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      if (!isMounted) return;
      try {
        // Pass null or empty string for tab since we removed tabs
        await dispatch(assetsActions.doFetch(null, "USD"));
      } catch (error) {
        if (isMounted) {
          console.error(i18n("pages.wallet.errors.fetchAssets"), error);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Memoize rendered assets
  const renderedAssets = useMemo(() => {
    if (loading) {
      return (
        <>
          {[1, 2, 3].map(i => (
            <div className="asset-card placeholder" key={i}>
              <div className="asset-header">
                <div className="asset-icon placeholder-icon"></div>
                <div className="asset-info">
                  <div className="placeholder-text" style={{width: '80px', height: '20px'}}></div>
                  <div className="placeholder-text" style={{width: '40px', height: '16px', marginTop: '4px'}}></div>
                </div>
              </div>
              <div className="asset-details-row">
                <div className="asset-detail-item">
                  <span className="asset-label placeholder-text" style={{width: '100%', height: '16px'}}></span>
                  <span className="asset-value placeholder-text" style={{width: '60%', height: '20px', marginTop: '4px'}}></span>
                </div>
                <div className="asset-detail-item">
                  <span className="asset-label placeholder-text" style={{width: '100%', height: '16px'}}></span>
                  <span className="asset-value placeholder-text" style={{width: '60%', height: '20px', marginTop: '4px'}}></span>
                </div>
                <div className="asset-detail-item">
                  <span className="asset-label placeholder-text" style={{width: '100%', height: '16px'}}></span>
                  <span className="asset-value placeholder-text" style={{width: '60%', height: '20px', marginTop: '4px'}}></span>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }

    if (listAssets.length === 0) {
      return (
        <div className="no-assets">
          <div className="asset-card">
            <div className="asset-header">
              <div className="asset-icon"></div>
              <div className="asset-info">
                <div className="asset-name">{i18n("pages.wallet.noAssetsFound")}</div>
              </div>
            </div>
            <div className="asset-details-row">
              <div className="asset-detail-item">
                <span className="asset-label">{i18n("pages.wallet.assetLabels.availableBalance")}</span>
                <span className="asset-value">{hideAmounts ? i18n("common.hidden") : '0.00'}</span>
              </div>
              <div className="asset-detail-item">
                <span className="asset-label">{i18n("pages.wallet.assetLabels.frozenAmount")}</span>
                <span className="asset-value">{hideAmounts ? i18n("common.hidden") : '0.00'}</span>
              </div>
              <div className="asset-detail-item valuation">
                <span className="asset-label">{i18n("pages.wallet.assetLabels.valuation")} (USD)</span>
                <span className="asset-value">{hideAmounts ? i18n("common.hidden") : '$0.00'}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return listAssets.map((asset) => (
      <AssetCard
        key={asset.id}
        asset={asset}
        hideAmounts={hideAmounts}
      />
    ));
  }, [listAssets, loading, hideAmounts]);

  return (
    <div className="forex-container">
      {/* Header Section – matches Profile */}
      <div className="header">
        <div className="nav-bar">
         
          <div className="page-title">{i18n("pages.wallet.myAssets")}</div>
        </div>
      </div>

      {/* Content Card – matches Profile */}
      <div className="content-card">
        {/* Valuation Card (inside content card) */}
        <div className="valuation-card">
          <div className="valuation-header">
            <div className="valuation-label">
              <i 
                className={`fas ${hideAmounts ? 'fa-eye' : 'fa-eye-slash'}`}
                onClick={toggleHideAmounts}
                aria-label={hideAmounts ? i18n("pages.wallet.showAmounts") : i18n("pages.wallet.hideAmounts")}
              ></i>
              {i18n("pages.wallet.assetValuation")}
            </div>
          </div>
          <div className="balance-amount">
            {loading ? (
              <div className="balance-placeholder placeholder-text"></div>
            ) : hideAmounts ? (
              i18n("common.hidden")
            ) : (
              `$${selectTotalFiat}`
            )}
          </div>
          <div className="usd-equivalent">
            {loading ? (
              <div className="equivalent-placeholder placeholder-text"></div>
            ) : hideAmounts ? (
              i18n("common.hidden")
            ) : (
              i18n("pages.wallet.totalUsdValue")
            )}
          </div>
         </div>

         {/* Quick Actions - reduced size - hidden for demo accounts */}
         {currentUser?.accountType !== 'demo' && (
           <div className="actions-section">
             <div className="actions-grid">
               {QUICK_ACTIONS.map((item) => (
                 <QuickActionItem key={item.path} item={item} />
               ))}
             </div>
           </div>
         )}

         {/* Asset List (no tabs) */}
      </div>

      <style>{`
        /* Forex Container – matches profile container */
        .forex-container {
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
          margin-bottom: 20px;
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
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          border-top: 2px solid #39FF14;
        }

        /* Valuation Card */
        .valuation-card {
          background-color: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .valuation-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .valuation-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #aaaaaa;
        }
        .valuation-label i {
          cursor: pointer;
          font-size: 16px;
          color: #39FF14;
          transition: color 0.2s;
        }
        .valuation-label i:hover {
          color: #2ecc10;
        }
        .balance-amount {
          font-size: 32px;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .usd-equivalent {
          font-size: 14px;
          color: #777777;
        }

        /* Quick Actions */
        .actions-section {
          margin-bottom: 24px;
        }
        .actions-grid {
          display: flex;
          gap: 16px;
        }
        .action-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: #2a2a2a;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.2s;
        }
        .action-item:hover {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .action-icon {
          font-size: 18px;
        }
        .action-label {
          font-size: 14px;
          font-weight: 500;
        }

        /* Asset List */
        .asset-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Asset Card */
        .asset-card {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          border: 1px solid #3a3a3a;
        }
        .asset-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .asset-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #1c1c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #39FF14;
        }
        .fiat-icon .icon-letter {
          font-size: 18px;
          font-weight: bold;
          color: #39FF14;
        }
        .asset-info {
          flex: 1;
        }
        .asset-name {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .asset-symbol {
          font-size: 12px;
          color: #777777;
        }
        
        /* Asset details row – horizontal layout */
        .asset-details-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 8px;
          margin-top: 8px;
        }

        .asset-detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          text-align: left;
        }

        .asset-detail-item .asset-label {
          font-size: 12px;
          color: #aaaaaa;
        }

        .asset-detail-item .asset-value {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
        }

        .asset-detail-item.valuation .asset-value {
          color: #39FF14;
        }

        @media (max-width: 360px) {
          .asset-details-row {
            gap: 4px;
          }
          .asset-detail-item .asset-label {
            font-size: 11px;
          }
          .asset-detail-item .asset-value {
            font-size: 13px;
          }
        }

        /* Placeholder styles */
        .placeholder {
          opacity: 0.7;
        }
        .placeholder-text {
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .balance-placeholder {
          width: 120px;
          height: 32px;
        }
        .equivalent-placeholder {
          width: 80px;
          height: 14px;
        }
        .placeholder-icon {
          background-color: #3a3a3a;
        }

        /* No assets state */
        .no-assets .asset-card {
          background-color: #1c1c1c;
          border-color: #3a3a3a;
        }

        /* Remove blue highlight on tap for mobile */
        .remove_blue {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}

// Export memoized component
export default memo(Wallet);
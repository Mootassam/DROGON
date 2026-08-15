import{j as o,o as a,n as e,H as g,u as r,B as d,i as b,D as v}from"./index-cf6de494.js";import{u as j}from"./useDispatch-c3ca2985.js";const N=[{path:"/deposit",icon:"fas fa-arrow-down",name:a("pages.wallet.quickActions.deposit")},{path:"/withdraw",icon:"fas fa-arrow-up",name:a("pages.wallet.quickActions.withdraw")}],x=o.memo(({item:s})=>e.jsxs(g,{to:s.path,className:"action-item remove_blue",role:"button","aria-label":s.name,children:[e.jsx("div",{className:"action-icon",children:e.jsx("i",{className:s.icon,"aria-hidden":"true"})}),e.jsx("span",{className:"action-label",children:s.name})]}));x.displayName="QuickActionItem";const m=o.memo(({asset:s,hideAmounts:i})=>{const n=(c=>c.charAt(0).toUpperCase())(s.symbol);return e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon fiat-icon",children:e.jsx("span",{className:"icon-letter",children:n})}),e.jsxs("div",{className:"asset-info",children:[e.jsx("div",{className:"asset-name",children:s.coinName}),e.jsx("div",{className:"asset-symbol",children:s.symbol})]})]}),e.jsxs("div",{className:"asset-details-row",children:[e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label",children:a("pages.wallet.assetLabels.availableBalance")}),e.jsx("span",{className:"asset-value",children:i?a("common.hidden"):s.amount})]}),e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label",children:a("pages.wallet.assetLabels.frozenAmount")}),e.jsx("span",{className:"asset-value",children:i?a("common.hidden"):s.amountFreezed})]}),e.jsxs("div",{className:"asset-detail-item valuation",children:[e.jsxs("span",{className:"asset-label",children:[a("pages.wallet.assetLabels.valuation")," (USD)"]}),e.jsx("span",{className:"asset-value",children:i?a("common.hidden"):`$${s.balanceFiat}`})]})]})]})});m.displayName="AssetCard";function w(){const s=j(),i=r(d.selectRows),p=r(d.selectTotalFiat),n=r(d.selectLoading),c=r(b.selectCurrentUser),[l,h]=o.useState(!1),f=o.useCallback(()=>{h(t=>!t)},[]);return o.useEffect(()=>{let t=!0;return(async()=>{if(t)try{await s(v.doFetch(null,"USD"))}catch(u){t&&console.error(a("pages.wallet.errors.fetchAssets"),u)}})(),()=>{t=!1}},[s]),o.useMemo(()=>n?e.jsx(e.Fragment,{children:[1,2,3].map(t=>e.jsxs("div",{className:"asset-card placeholder",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon placeholder-icon"}),e.jsxs("div",{className:"asset-info",children:[e.jsx("div",{className:"placeholder-text",style:{width:"80px",height:"20px"}}),e.jsx("div",{className:"placeholder-text",style:{width:"40px",height:"16px",marginTop:"4px"}})]})]}),e.jsxs("div",{className:"asset-details-row",children:[e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label placeholder-text",style:{width:"100%",height:"16px"}}),e.jsx("span",{className:"asset-value placeholder-text",style:{width:"60%",height:"20px",marginTop:"4px"}})]}),e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label placeholder-text",style:{width:"100%",height:"16px"}}),e.jsx("span",{className:"asset-value placeholder-text",style:{width:"60%",height:"20px",marginTop:"4px"}})]}),e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label placeholder-text",style:{width:"100%",height:"16px"}}),e.jsx("span",{className:"asset-value placeholder-text",style:{width:"60%",height:"20px",marginTop:"4px"}})]})]})]},t))}):i.length===0?e.jsx("div",{className:"no-assets",children:e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon"}),e.jsx("div",{className:"asset-info",children:e.jsx("div",{className:"asset-name",children:a("pages.wallet.noAssetsFound")})})]}),e.jsxs("div",{className:"asset-details-row",children:[e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label",children:a("pages.wallet.assetLabels.availableBalance")}),e.jsx("span",{className:"asset-value",children:l?a("common.hidden"):"0.00"})]}),e.jsxs("div",{className:"asset-detail-item",children:[e.jsx("span",{className:"asset-label",children:a("pages.wallet.assetLabels.frozenAmount")}),e.jsx("span",{className:"asset-value",children:l?a("common.hidden"):"0.00"})]}),e.jsxs("div",{className:"asset-detail-item valuation",children:[e.jsxs("span",{className:"asset-label",children:[a("pages.wallet.assetLabels.valuation")," (USD)"]}),e.jsx("span",{className:"asset-value",children:l?a("common.hidden"):"$0.00"})]})]})]})}):i.map(t=>e.jsx(m,{asset:t,hideAmounts:l},t.id)),[i,n,l]),e.jsxs("div",{className:"forex-container",children:[e.jsx("div",{className:"header",children:e.jsx("div",{className:"nav-bar",children:e.jsx("div",{className:"page-title",children:a("pages.wallet.myAssets")})})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"valuation-card",children:[e.jsx("div",{className:"valuation-header",children:e.jsxs("div",{className:"valuation-label",children:[e.jsx("i",{className:`fas ${l?"fa-eye":"fa-eye-slash"}`,onClick:f,"aria-label":l?a("pages.wallet.showAmounts"):a("pages.wallet.hideAmounts")}),a("pages.wallet.assetValuation")]})}),e.jsx("div",{className:"balance-amount",children:n?e.jsx("div",{className:"balance-placeholder placeholder-text"}):l?a("common.hidden"):`$${p}`}),e.jsx("div",{className:"usd-equivalent",children:n?e.jsx("div",{className:"equivalent-placeholder placeholder-text"}):l?a("common.hidden"):a("pages.wallet.totalUsdValue")})]}),(c==null?void 0:c.accountType)!=="demo"&&e.jsx("div",{className:"actions-section",children:e.jsx("div",{className:"actions-grid",children:N.map(t=>e.jsx(x,{item:t},t.path))})})]}),e.jsx("style",{children:`
        /* Forex Container – matches profile container */
        .forex-container {
          
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
      `})]})}const F=o.memo(w);export{F as default};

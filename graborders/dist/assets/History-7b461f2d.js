import{i as p,o as h,K as x,S as b,j as o,L as w,n as s}from"./index-a80de294.js";import{L as k}from"./LoadingModal-1a313a8c.js";import{u as v}from"./useDispatch-dda924b7.js";function j(){const d=v(),[e,r]=p.useState("all"),f=h(x.selectLoading),l=h(x.selectRows);p.useEffect(()=>{d(b.doFetch())},[d]);const g=(a,i,n)=>{const t={icon:"fa-exchange-alt",typeText:s("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:i==="in"?"#2ff378":"#FF6838"};switch(a){case"deposit":t.icon="fa-arrow-down",t.typeText=s("pages.history.transactionTypes.deposit"),t.iconClass="deposit",t.color="#F3BA2F",t.amountColor="#2ff378";break;case"withdraw":t.icon="fa-arrow-up",t.typeText=s("pages.history.transactionTypes.withdrawal"),t.iconClass="withdraw",t.color="#FF6838",t.amountColor="#FF6838";break;case"convert_in":t.icon="fa-exchange-alt",t.typeText=n?s("pages.history.transactionTypes.convertedFrom",n):s("pages.history.transactionTypes.conversionIn"),t.iconClass="convert-in",t.color="#9C27B0",t.amountColor="#2ff378";break;case"convert_out":t.icon="fa-exchange-alt",t.typeText=n?s("pages.history.transactionTypes.convertedTo",n):s("pages.history.transactionTypes.conversionOut"),t.iconClass="convert-out",t.color="#9C27B0",t.amountColor="#FF6838";break;case"stacking":t.icon="fa-coins",t.typeText=s("pages.history.transactionTypes.stakedAmount"),t.iconClass="stacking",t.color="#FF9800",t.amountColor="#FFB74D";break;case"staking_reward":t.icon="fa-gift",t.typeText=s("pages.history.transactionTypes.stakingRewards"),t.iconClass="staking_reward",t.color="#4CAF50",t.amountColor="#81C784";break;case"futures_profit":t.icon="fa-chart-line",t.typeText=s("pages.history.transactionTypes.futuresProfit"),t.iconClass="futures-profit",t.color="#00C076",t.amountColor="#00C076";break;case"futures_loss":t.icon="fa-chart-line",t.typeText=s("pages.history.transactionTypes.futuresLoss"),t.iconClass="futures-loss",t.color="#FF6838",t.amountColor="#FF6838";break;case"spot_profit":t.icon="fa-coins",t.typeText=s("pages.history.transactionTypes.spotTradingProfit"),t.iconClass="spot-profit",t.color="#4CAF50",t.amountColor="#2ff378";break;case"spot_loss":t.icon="fa-coins",t.typeText=s("pages.history.transactionTypes.spotTradingLoss"),t.iconClass="spot-loss",t.color="#FF5722",t.amountColor="#FF6838";break;case"reward":t.icon="fa-hand-holding-dollar",t.typeText=s("pages.history.transactionTypes.referralReward"),t.iconClass="spot-profit",t.color="#63f211ff",t.amountColor="#5ffc1bff";break;case"bonus":t.icon="fa-gift",t.typeText=s("pages.history.transactionTypes.bonus"),t.iconClass="bonus",t.color="#E91E63",t.amountColor="#E91E63";break;default:t.icon="fa-exchange-alt",t.typeText=s("pages.history.transactionTypes.transaction"),t.iconClass="default",t.color="#627EEA",t.amountColor="#627EEA"}return t},u=p.useMemo(()=>l?l.filter(a=>!(e!=="all"&&!(e==="deposits"?a.type==="deposit"||a.direction==="in":e==="withdrawals"?a.type==="withdraw"||a.direction==="out":e==="profits"?a.type.includes("profit")||a.direction==="in"&&a.type!=="deposit":e==="losses"?a.type.includes("loss")||a.direction==="out"&&a.type!=="withdraw":e==="conversions"?a.type.includes("convert"):e==="stacking"?a.type==="stacking":!0))):[],[l,e]),m=a=>{const i=new Date(a),n=new Date,t=i.toDateString()===n.toDateString(),c=new Date(n);c.setDate(n.getDate()-1);const y=i.toDateString()===c.toDateString();return t?s("pages.history.dateFormats.today",i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):y?s("pages.history.dateFormats.yesterday",i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):i.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})};return o.jsxs("div",{className:"history-container",children:[o.jsx("div",{className:"header",children:o.jsxs("div",{className:"nav-bar",children:[o.jsx(w,{to:"/profile",className:"back-arrow",children:o.jsx("i",{className:"fas fa-arrow-left"})}),o.jsx("div",{className:"page-title",children:s("pages.history.title")})]})}),o.jsx("div",{className:"content-card",children:o.jsxs("div",{className:"history-content",children:[f&&o.jsx("div",{className:"loading-container",children:o.jsx(k,{})}),!f&&o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"filter-options",children:[o.jsx("button",{className:`filter-option ${e==="all"?"active":""}`,onClick:()=>r("all"),children:s("pages.history.filters.all")}),o.jsx("button",{className:`filter-option ${e==="deposits"?"active":""}`,onClick:()=>r("deposits"),children:s("pages.history.filters.deposits")}),o.jsx("button",{className:`filter-option ${e==="withdrawals"?"active":""}`,onClick:()=>r("withdrawals"),children:s("pages.history.filters.withdrawals")}),o.jsx("button",{className:`filter-option ${e==="profits"?"active":""}`,onClick:()=>r("profits"),children:s("pages.history.filters.profits")}),o.jsx("button",{className:`filter-option ${e==="losses"?"active":""}`,onClick:()=>r("losses"),children:s("pages.history.filters.losses")}),o.jsx("button",{className:`filter-option ${e==="conversions"?"active":""}`,onClick:()=>r("conversions"),children:s("pages.history.filters.conversions")}),o.jsx("button",{className:`filter-option ${e==="stacking"?"active":""}`,onClick:()=>r("stacking"),children:s("pages.history.filters.stacking")})]}),o.jsx("div",{className:"transaction-list",children:u.length>0?u.map(a=>{const{icon:i,typeText:n,iconClass:t,amountColor:c}=g(a.type,a.direction,a.relatedAsset);return o.jsxs("div",{className:"transaction-item",children:[o.jsxs("div",{className:"transaction-info",children:[o.jsx("div",{className:`transaction-icon ${t}`,style:{backgroundColor:g(a.type,a.direction,a.relatedAsset).color},children:o.jsx("i",{className:`fas ${i}`})}),o.jsxs("div",{className:"transaction-details",children:[o.jsx("div",{className:"transaction-type",children:n}),o.jsx("div",{className:"transaction-date",children:m(a.dateTransaction)})]})]}),o.jsxs("div",{className:"transaction-amount",children:[o.jsxs("div",{className:"amount",style:{color:c},children:[a.direction==="in"?"+":"-",a.amount.toFixed(5)," ",a.asset]}),o.jsx("div",{className:`transaction-status status-${a.status}`,children:s(`pages.history.status.${a.status}`)})]})]},a.id)}):o.jsxs("div",{className:"no-data-message",children:[o.jsx("i",{className:"fas fa-receipt"}),o.jsx("p",{children:"No transaction history available"})]})})]})]})}),o.jsx("style",{children:`
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
      `})]})}export{j as default};

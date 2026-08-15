import{o as d,t as p,i as g,x as u,j as t,L as h,n as e}from"./index-a80de294.js";import{L as b}from"./LoadingModal-1a313a8c.js";import{u as j}from"./useDispatch-dda924b7.js";function w(){const o=j(),n=d(p.selectListTransfer),r=d(p.selectLoading);g.useEffect(()=>{o(u.TransferList())},[o]);const x=a=>{const s=new Date(a),i=new Date,f=s.toDateString()===i.toDateString(),l=new Date(i);l.setDate(i.getDate()-1);const m=s.toDateString()===l.toDateString();return f?e("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):m?e("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):s.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},c=a=>{switch(a){case"trade":return e("pages.transfer.accountTypes.trade");case"perpetual":return e("pages.transfer.accountTypes.perpetual");case"exchange":return e("pages.transfer.accountTypes.exchange");default:return a}};return t.jsxs("div",{className:"transferlist-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(h,{to:"/wallets",className:"back-arrow",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsx("div",{className:"page-title",children:e("pages.transfer.title")})]})}),t.jsx("div",{className:"content-card",children:t.jsxs("div",{className:"transfer-content",children:[r&&t.jsx("div",{className:"loading-container",children:t.jsx(b,{})}),!r&&t.jsx(t.Fragment,{children:t.jsx("div",{className:"transaction-list",children:n&&n.length>0?n.map(a=>t.jsxs("div",{className:"transaction-item",children:[t.jsxs("div",{className:"transaction-info",children:[t.jsx("div",{className:"transaction-icon",children:t.jsx("i",{className:"fas fa-exchange-alt"})}),t.jsxs("div",{className:"transaction-details",children:[t.jsxs("div",{className:"transaction-type",children:[c(a.fromAccount)," → ",c(a.toAccount)]}),t.jsx("div",{className:"transaction-date",children:a.createdAt?x(a.createdAt):e("common.dateNotAvailable")})]})]}),t.jsxs("div",{className:"transaction-amount",children:[t.jsxs("div",{className:"amount positive",children:["+",a.amount]}),t.jsx("div",{className:`transaction-status status-${a.status}`,children:a.status==="completed"?e("pages.transfer.status.completed"):a.status})]})]},a._id)):t.jsxs("div",{className:"no-data-message",children:[t.jsx("i",{className:"fas fa-exchange-alt"}),t.jsx("p",{children:e("pages.transfer.noTransferHistory")})]})})})]})}),t.jsx("style",{children:`
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
      `})]})}export{w as default};

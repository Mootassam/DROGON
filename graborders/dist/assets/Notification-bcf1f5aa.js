import{n as t,u as h,o as c,G as r,i as l,F as u,j as i,L as b,ar as y}from"./index-3c74c896.js";import{D as w}from"./Dates-9c2fea6d.js";import{L as v}from"./LoadingModal-4d5c38c1.js";import{u as k}from"./useDispatch-c7234b1e.js";import"./v4-4a60fe23.js";const d={deposit:{icon:"fas fa-arrow-down",title:t("pages.notification.types.deposit.title"),getMessage:e=>t("pages.notification.types.deposit.message",e.message)},withdraw:{icon:"fas fa-arrow-up",title:t("pages.notification.types.withdraw.title"),getMessage:e=>t("pages.notification.types.withdraw.message",e.message)},staking:{icon:"fas fa-coins",title:t("pages.notification.types.staking.title"),getMessage:e=>t("pages.notification.types.staking.message",e.message)},kyc:{icon:"fas fa-id-card",title:t("pages.notification.types.kyc.title"),getMessage:e=>e.message||t("pages.notification.types.kyc.defaultMessage")},commission:{icon:"fas fa-hand-holding-dollar",title:t("pages.notification.types.commission.title"),getMessage:e=>t("pages.notification.types.commission.message",e.message)},futures:{icon:"fas fa-chart-line",title:t("pages.notification.types.futures.title"),getMessage:e=>t("pages.notification.types.futures.message",e.message)},accountActivated:{icon:"fas fa-user-check",title:t("pages.notification.types.accountActivated.title"),getMessage:e=>t("pages.notification.types.accountActivated.message",e.message)},custom:{icon:"fas fa-bell",title:t("pages.notification.types.custom.title"),getMessage:e=>e.message||t("pages.notification.types.custom.defaultMessage")},cancel_deposit:{icon:"fas fa-ban",title:t("pages.notification.types.cancelDeposit.title"),getMessage:e=>t("pages.notification.types.cancelDeposit.message",e.message)},cancel_withdraw:{icon:"fas fa-ban",title:t("pages.notification.types.cancelWithdraw.title"),getMessage:e=>t("pages.notification.types.cancelWithdraw.message",e.message)},cancel_activated:{icon:"fas fa-user-slash",title:t("pages.notification.types.cancelActivated.title"),getMessage:()=>t("pages.notification.types.cancelActivated.message")}};function S(){const e=k();h();const s=c(r.selectRows),p=c(r.selectLoading),[n,f]=l.useState("all");l.useEffect(()=>{const a=n==="all"?"":n;e(u.doFetch(a))},[e,n]);const g=a=>{e(y.doUpdate(a.id)),a.type==="accountActivated"&&(window.location.href="/profile")},m=a=>{f(a)},x=[{key:"all",label:t("pages.notification.filters.all")},{key:"unread",label:t("pages.notification.filters.unread")},{key:"read",label:t("pages.notification.filters.read")}];return i.jsxs("div",{className:"notification-container",children:[i.jsx("div",{className:"header",children:i.jsxs("div",{className:"nav-bar",children:[i.jsx(b,{to:"/",className:"back-arrow",children:i.jsx("i",{className:"fas fa-arrow-left"})}),i.jsx("div",{className:"page-title",children:"Notifications"})]})}),i.jsxs("div",{className:"content-card",children:[i.jsx("div",{className:"filter-tabs",children:x.map(a=>i.jsx("button",{className:`filter-tab ${n===a.key?"active":""}`,onClick:()=>m(a.key),children:a.label},a.key))}),i.jsx("div",{className:"notification-content",children:p?i.jsx("div",{className:"loading-container",children:i.jsx(v,{})}):(s==null?void 0:s.length)>0?i.jsx("div",{className:"notification-list",children:s.map(a=>{const o=d[a.type]||d.custom;return i.jsxs("div",{className:`notification-item ${a.status==="unread"?"unread":""}`,onClick:()=>g(a),children:[i.jsx("div",{className:"notification-icon",children:i.jsx("i",{className:o.icon})}),i.jsxs("div",{className:"notification-details",children:[i.jsx("div",{className:"notification-title",children:o.title}),i.jsx("div",{className:"notification-message",children:o.getMessage(a)}),i.jsx("div",{className:"notification-time",children:w.Monthago(a.createdAt)})]}),a.status==="unread"&&i.jsx("div",{className:"unread-indicator"})]},a.id)})}):i.jsxs("div",{className:"empty-state",children:[i.jsx("div",{className:"empty-icon",children:i.jsx("i",{className:"fas fa-bell-slash"})}),i.jsx("div",{className:"empty-title",children:t("pages.notification.emptyState.title")}),i.jsx("div",{className:"empty-message",children:n==="all"?t("pages.notification.emptyState.noNotifications"):t("pages.notification.emptyState.noFilteredNotifications",n)})]})})]}),i.jsx("style",{children:`
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
      `})]})}export{S as default};

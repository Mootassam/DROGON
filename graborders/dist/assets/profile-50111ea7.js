import{n as t,u as V,o as c,p as K,q as H,t as w,i,v as O,w as P,j as e,L as u,x as W}from"./index-52d4c68c.js";import{I as Y}from"./I18nSelect-42530231.js";import{u as _}from"./useDispatch-8f3a8404.js";const R=[{icon:"fas fa-language",name:t("pages.settings.language"),type:"modal",modal:"language"},{icon:"fas fa-shield-alt",path:"/typepassword",name:t("pages.profile.menu.password"),requiresKyc:!0},{icon:"fas fa-file-alt",path:"/history",name:t("pages.profile.menu.withdrawalAddress"),requiresKyc:!0},{icon:"fas fa-bell",path:"/notification",name:t("pages.profile.menu.notifications")},{icon:"fas fa-comment-dots",path:"/online-service",name:t("pages.profile.menu.customerSupport")},{icon:"fas fa-building",path:"/about",name:t("pages.profile.menu.aboutUs")},{icon:"fas fa-question-circle",path:"/support",name:t("pages.profile.menu.helpcenter")},{icon:"fas fa-download",path:"/download",name:t("pages.profile.menu.downloadApp")},{icon:"fas fa-trash-alt",name:t("pages.profile.menu.clearCache"),type:"action"}];function X(){const l=_(),m=V(),s=c(K.selectCurrentUser),o=c(H.selectKycStatus),x=c(w.selectLoading),y=c(w.selectTotalFiat),[d,k]=i.useState(!1),[j,g]=i.useState(!1),f=i.useMemo(()=>o==="success",[o]),p=i.useMemo(()=>({user:s}),[s]);i.useEffect(()=>{l(O.doFetch(p,p))},[l,p]),i.useEffect(()=>{let a=!0;return(async()=>{if(a)try{await l(W.doFetch(null,"USD"))}catch(r){a&&console.error(r)}})(),()=>{a=!1}},[l]);const N=i.useCallback(()=>l(P.doSignout()),[l]),v=i.useCallback(()=>k(a=>!a),[]),C=i.useCallback(()=>g(!0),[]),b=i.useCallback(()=>g(!1),[]),E=i.useCallback(()=>{alert(t("pages.profile.cache.cleared"))},[]),F=(s==null?void 0:s.fullName)||(s==null?void 0:s.email)||t("pages.profile.user"),h=String((s==null?void 0:s.refcode)||(s==null?void 0:s.id)||(s==null?void 0:s._id)||""),A=h?`ID: ${h.replace(/(.{4})(?=.)/g,"$1 ")}`:"",z=t("pages.wallet.totalUsdValue")||"Available Assets",D=a=>a==null?"0.00":a.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),S=()=>{switch(o){case"success":return t("pages.profile.status.verified");case"pending":return t("pages.profile.verification.pending.status");default:return t("pages.profile.status.unverified")}},L=()=>{switch(o){case"success":return"fas fa-check-circle";case"pending":return"fas fa-clock";default:return"fas fa-exclamation-circle"}},M=()=>{switch(o){case"success":return t("pages.profile.status.verified");case"pending":return t("pages.profile.verification.pending.button");default:return t("pages.profile.verification.alert.verifyNow")}},I=()=>o==="success"||o==="pending",B=()=>o==="unverified",$=i.useMemo(()=>{let a=R.map(n=>({...n,disabled:(n==null?void 0:n.requiresKyc)&&!f}));return(s==null?void 0:s.accountType)==="demo"&&(a=a.map(n=>({...n,disabled:n.requiresKyc?!0:n.disabled}))),a},[f,s==null?void 0:s.accountType]),T=i.useCallback(()=>{o==="unverified"?m.push("/proof"):o==="pending"&&alert(t("pages.profile.verification.pendingAlert"))},[o,m]),q=(a,n)=>{if(a.type==="action")return e.jsxs("li",{className:"menu-item",onClick:E,children:[e.jsx("div",{className:"menu-icon-box",children:e.jsx("i",{className:a.icon})}),e.jsx("span",{className:"menu-label",children:a.name}),e.jsx("span",{className:"menu-arrow"})]},n);if(a.type==="modal")return e.jsxs("li",{className:`menu-item ${a.disabled?"disabled":""}`,onClick:C,children:[e.jsx("div",{className:"menu-icon-box",children:e.jsx("i",{className:a.icon})}),e.jsx("span",{className:"menu-label",children:a.name}),e.jsx("span",{className:"menu-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]},n);const r=e.jsxs("li",{className:`menu-item ${a.disabled?"disabled":""}`,children:[e.jsx("div",{className:"menu-icon-box",children:e.jsx("i",{className:a.icon})}),e.jsx("span",{className:"menu-label",children:a.name}),e.jsx("span",{className:"menu-arrow",children:!a.disabled&&e.jsx("i",{className:"fas fa-chevron-right"})})]});return a.disabled?e.jsx("div",{className:"menu-link-wrapper",children:r},a.name):e.jsx(u,{to:a.path,className:"menu-link-wrapper",children:r},a.name)};return e.jsxs("div",{className:"profile-page",children:[e.jsxs("div",{className:"balance-header-card",children:[e.jsxs("div",{className:"header-top-row",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"simulation-title",children:[F,(s==null?void 0:s.accountType)==="demo"&&e.jsx("span",{className:"demo-tag",children:"DEMO"})]}),e.jsx("p",{className:"account-id",children:A})]}),e.jsx("button",{className:"eye-toggle",onClick:v,children:e.jsx("i",{className:`fas ${d?"fa-eye-slash":"fa-eye"}`})})]}),e.jsx("div",{className:"balance-amount",children:x?e.jsx("div",{className:"skeleton-line amount-skel"}):d?"••••••":`$${D(y)}`}),e.jsx("p",{className:"balance-subtitle",children:x?e.jsx("div",{className:"skeleton-line sub-skel"}):d?"••••":z})]}),e.jsxs("div",{className:"action-buttons-section",children:[e.jsxs(u,{to:"/deposit",className:"action-btn deposit-btn",children:[e.jsx("i",{className:"fas fa-wallet"}),e.jsxs("div",{className:"btn-text-group",children:[e.jsx("span",{className:"btn-main-text",children:"Deposit"}),e.jsx("span",{className:"btn-sub-text",children:"Billing Details >>"})]})]}),e.jsxs(u,{to:"/withdraw",className:"action-btn withdraw-btn",children:[e.jsx("i",{className:"fas fa-money-bill-wave"}),e.jsxs("div",{className:"btn-text-group",children:[e.jsx("span",{className:"btn-main-text",children:"Withdraw"}),e.jsx("span",{className:"btn-sub-text",children:"Withdraw Details >>"})]})]})]}),e.jsxs("div",{className:"menu-section",children:[e.jsxs("ul",{className:"menu-list",children:[(s==null?void 0:s.accountType)!=="demo"&&e.jsxs("li",{className:"menu-item kyc-line",children:[e.jsx("div",{className:"menu-icon-box kyc-icon",children:e.jsx("i",{className:L()})}),e.jsx("span",{className:"menu-label",children:S()}),e.jsx("div",{className:"menu-action",children:e.jsx("button",{className:`kyc-button ${B()?"pulse":""}`,onClick:T,disabled:I(),children:M()})})]}),$.map((a,n)=>q(a,n))]}),e.jsxs("button",{className:"logout-btn",onClick:N,children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," ",t("pages.profile.menu.logout")]})]}),j&&e.jsx("div",{className:"modal-overlay",onClick:b,children:e.jsxs("div",{className:"modal-container",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-handle"}),e.jsxs("div",{className:"modal-title-row",children:[e.jsx("span",{className:"modal-title-text",children:t("pages.settings.modals.language.title")}),e.jsx("button",{className:"modal-close",onClick:b,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-body",children:e.jsx(Y,{isInModal:!0})})]})}),e.jsx("style",{children:`
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
      `})]})}export{X as default};

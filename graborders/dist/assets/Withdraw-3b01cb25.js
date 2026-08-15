import{W as H,n as s,Z as m,a0 as v,o as j,p as L,t as z,i as n,w as E,j as e,L as x,x as V,aq as O}from"./index-f19108a0.js";import{u as W,y as G,F as K}from"./FormErrors-adcd902b.js";import{y as S}from"./yupFormSchemas-fd7641cb.js";import{I as C}from"./InputFormItem-4e60ebb9.js";import{u as X}from"./useDispatch-a803e736.js";const M=({visible:a,title:d,onClose:c,children:f})=>a?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .modal-container {
          background-color: #ffffff;
          border-radius: 16px;
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.3s ease;
        }
        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e7eaee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 {
          margin: 0;
          color: #222;
          font-size: 18px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #106cf5;
        }
        .modal-body {
          padding: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}),e.jsx("div",{className:"modal-overlay",onClick:c,children:e.jsxs("div",{className:"modal-container",onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{children:d}),e.jsx("button",{className:"modal-close",onClick:c,children:"×"})]}),e.jsx("div",{className:"modal-body",children:f})]})})]}):null,Z=H().shape({amount:S.integer(s("entities.transaction.fields.amount"),{required:!0,min:50}),withdrawPassword:S.string(s("user.fields.withdrawPassword"),{required:!0}),withdrawalMethod:m().required(s("pages.withdraw.validation.selectMethod")),currency:m().default("USD"),withdrawAddress:m(),network:m(),fee:v().default(0),totalAmount:v().default(0),orderNo:m()});function ae(){var y,N;const a=j(L.selectCurrentUser),d=X(),c=j(z.selectRows),f=j(z.selectLoading),[h,w]=n.useState(!1),[A,u]=n.useState(!1),[D,k]=n.useState(!1),F=n.useCallback(async()=>{await d(E.doRefreshCurrentUser())},[d]);n.useEffect(()=>{let t=!0;return(async()=>{if(t)try{await d(V.doFetch(null,"USD"))}catch(i){t&&console.error(s("pages.wallet.errors.fetchAssets"),i)}})(),()=>{t=!1}},[d]);const g=n.useMemo(()=>c.find(t=>t.symbol==="USDT"),[c]),I=(g==null?void 0:g.amount)||0,p=n.useCallback(()=>{var t,r,i,l;return a?((t=a.accountHolder)==null?void 0:t.trim())&&((r=a.ibanNumber)==null?void 0:r.trim())&&((i=a.bankName)==null?void 0:i.trim())&&((l=a.ifscCode)==null?void 0:l.trim()):!1},[a]),b=n.useCallback(()=>{var t,r,i,l;return a?((t=a.trc20)==null?void 0:t.trim())&&((r=a.walletname)==null?void 0:r.trim())&&((i=a.usernamewallet)==null?void 0:i.trim())&&((l=a.preferredcoin)==null?void 0:l.trim()):!1},[a]),T=n.useCallback(()=>{const t=[];return a!=null&&a.accountHolder||t.push(s("entities.transaction.fields.accountHolder")),a!=null&&a.ibanNumber||t.push(s("entities.transaction.fields.ibanNumber")),a!=null&&a.bankName||t.push(s("entities.transaction.fields.bankName")),a!=null&&a.ifscCode||t.push(s("entities.transaction.fields.ifscCode")),t},[a]),$=n.useCallback(()=>{const t=[];return a!=null&&a.trc20||t.push(s("user.fields.trc20")),a!=null&&a.walletname||t.push(s("pages.wallet.walletName")),a!=null&&a.usernamewallet||t.push(s("pages.wallet.username")),a!=null&&a.preferredcoin||t.push(s("pages.wallet.choosePreferredCoin")),t},[a]),q=async({amount:t,withdrawPassword:r,withdrawalMethod:i})=>{if(i==="bank"&&!p()){w(!0);return}if(i==="crypto"&&!b()){u(!0);return}i==="crypto"?a!=null&&a.trc20:i==="bank"&&`${a==null?void 0:a.bankName}${a==null?void 0:a.accountHolder}${a==null?void 0:a.ibanNumber}`;const l=new Date,Y=`${l.getFullYear()}${String(l.getMonth()+1).padStart(2,"0")}${String(l.getDate()).padStart(2,"0")}`,P=Math.floor(Math.random()*1e7).toString().padStart(7,"0"),B=`RE${Y}${P}`,R={currency:"USDT",date:new Date,totalAmount:Number(t),orderNo:B,status:"pending",withdrawPassword:r,withdrawAmount:Number(t),withdrawType:i};try{await d(O.doCreate(R)),await F(),o.reset(),k(!0)}catch{}},o=W({resolver:G.yupResolver(Z),mode:"onSubmit",defaultValues:{amount:"",withdrawalMethod:"",currency:"USDT",withdrawAddress:"",network:"",fee:0,totalAmount:0,orderNo:""}});return e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(x,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:s("pages.withdraw.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx(K,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(q),children:[e.jsx("input",{type:"hidden",...o.register("currency")}),e.jsx("input",{type:"hidden",...o.register("withdrawAddress")}),e.jsx("input",{type:"hidden",...o.register("network")}),e.jsx("input",{type:"hidden",...o.register("fee")}),e.jsx("input",{type:"hidden",...o.register("totalAmount")}),e.jsx("input",{type:"hidden",...o.register("orderNo")}),e.jsxs("div",{className:"balance-info",children:[e.jsx("i",{className:"fas fa-wallet"}),s("pages.withdraw.availableBalance")," :"," ",f?e.jsx("span",{className:"balance-placeholder",children:"--"}):`${I.toFixed(2)} USD`]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),s("pages.withdraw.withdrawAmount")]}),e.jsx(C,{type:"number",name:"amount",placeholder:s("pages.withdraw.amountPlaceholder"),className:"withdraw-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),s("pages.withdraw.selectMethod")]}),e.jsx("div",{className:"method-selection",children:e.jsxs("div",{className:`method-card ${o.watch("withdrawalMethod")==="bank"?"selected":""}`,onClick:()=>o.setValue("withdrawalMethod","bank",{shouldValidate:!0}),children:[e.jsx("i",{className:"fas fa-university method-icon"}),e.jsx("div",{className:"method-label",children:s("pages.withdraw.methods.bank")}),e.jsx("div",{className:`method-status ${p()?"complete":"incomplete"}`,children:p()?s("pages.withdraw.status.complete"):s("pages.withdraw.status.incomplete")}),e.jsx("div",{className:"method-network-hint",children:s("pages.withdraw.methods.bankNetworks")})]})}),e.jsx("input",{type:"hidden",...o.register("withdrawalMethod")}),o.formState.errors.withdrawalMethod&&e.jsxs("div",{className:"error-message",children:[e.jsx("i",{className:"fas fa-exclamation-circle"}),o.formState.errors.withdrawalMethod.message]})]}),o.watch("withdrawalMethod")==="crypto"&&b()&&e.jsxs("div",{className:"preview-box",children:[e.jsx("i",{className:"fab fa-bitcoin"}),e.jsx("strong",{children:s("pages.withdraw.withdrawingTo")}),e.jsx("br",{}),e.jsxs("span",{className:"preview-detail",children:[(y=a==null?void 0:a.preferredcoin)==null?void 0:y.toUpperCase(),": ",(N=a==null?void 0:a.trc20)==null?void 0:N.substring(0,12),"..."]})]}),o.watch("withdrawalMethod")==="bank"&&p()&&e.jsxs("div",{className:"preview-box",children:[e.jsx("i",{className:"fas fa-university"}),e.jsx("strong",{children:s("pages.withdraw.withdrawingTo")}),e.jsx("br",{}),e.jsxs("span",{className:"preview-detail",children:[a==null?void 0:a.bankName," - ",a==null?void 0:a.accountHolder]})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"input-label",children:[e.jsx("span",{className:"required-star",children:"*"}),s("pages.withdraw.withdrawPassword")]}),e.jsx(C,{type:"password",name:"withdrawPassword",placeholder:s("pages.withdraw.withdrawPasswordPlaceholder"),className:"withdraw-input"})]}),e.jsxs("div",{className:"announcement-container",children:[e.jsx("i",{className:"fas fa-volume-high speaker"}),e.jsx("div",{className:"announcement-text",children:s("pages.withdraw.announcement")})]}),e.jsxs("button",{className:"withdraw-button",type:"submit",children:[e.jsx("i",{className:"fas fa-check"}),s("pages.withdraw.confirm")]}),(a==null?void 0:a.accountType)!=="demo"&&(!p()||!b())&&e.jsxs("div",{className:"tip-box",children:[e.jsx("i",{className:"fas fa-info-circle"}),e.jsxs("span",{children:[s("pages.withdraw.completeDetailsIn")," ",e.jsx(x,{to:"/bind-account",className:"tip-link",children:s("pages.bindAccount.title")}),s("pages.withdraw.enableAllOptions")]})]})]})})}),e.jsx(M,{visible:h,title:s("pages.withdraw.bankModal.title"),onClose:()=>w(!1),children:e.jsxs("div",{className:"modal-content-centered",children:[e.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),e.jsx("h3",{className:"modal-subtitle",children:s("pages.withdraw.bankModal.required")}),e.jsx("p",{className:"modal-description",children:s("pages.withdraw.bankModal.description")}),e.jsx("ul",{className:"missing-fields-list",children:T().map((t,r)=>e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-times"})," ",t]},r))}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel-btn",onClick:()=>w(!1),children:s("common.cancel")}),(a==null?void 0:a.accountType)!=="demo"&&e.jsx(x,{to:"/bind-account",className:"modal-action-link",children:e.jsx("button",{className:"modal-action-btn",children:s("pages.withdraw.goToBindAccount")})})]})]})}),e.jsx(M,{visible:A,title:s("pages.withdraw.cryptoModal.title"),onClose:()=>u(!1),children:e.jsxs("div",{className:"modal-content-centered",children:[e.jsx("i",{className:"fas fa-exclamation-circle modal-warning-icon"}),e.jsx("h3",{className:"modal-subtitle",children:s("pages.withdraw.cryptoModal.required")}),e.jsx("p",{className:"modal-description",children:s("pages.withdraw.cryptoModal.description")}),e.jsx("ul",{className:"missing-fields-list",children:$().map((t,r)=>e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-times"})," ",t]},r))}),e.jsxs("div",{className:"modal-actions",children:[e.jsx("button",{className:"modal-cancel-btn",onClick:()=>u(!1),children:s("common.cancel")}),(a==null?void 0:a.accountType)!=="demo"&&e.jsx(x,{to:"/bind-account",className:"modal-action-link",children:e.jsx("button",{className:"modal-action-btn",children:s("pages.withdraw.goToBindAccount")})})]})]})}),D&&e.jsx("div",{className:"wd-success-overlay",children:e.jsxs("div",{className:"wd-success-card",children:[e.jsx("div",{className:"wd-success-icon-wrap",children:e.jsxs("svg",{className:"wd-check-svg",viewBox:"0 0 52 52",children:[e.jsx("circle",{className:"wd-check-circle",cx:"26",cy:"26",r:"25",fill:"none"}),e.jsx("path",{className:"wd-check-tick",fill:"none",d:"M14 27l8 8 16-16"})]})}),e.jsx("div",{className:"wd-success-title",children:"Request Submitted"}),e.jsxs("p",{className:"wd-success-msg",children:["Dear client, your request is being processed.",e.jsx("br",{}),"It will take ",e.jsx("strong",{children:"24 hours"}),".",e.jsx("br",{}),"You will receive your withdrawal soon."]}),e.jsxs("div",{className:"wd-success-ref",children:[e.jsx("i",{className:"fas fa-clock"})," Processing time: up to 24 hours"]}),e.jsx("button",{className:"wd-success-btn",onClick:()=>k(!1),children:"OK, Got it"})]})}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
        }

        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .header {
          min-height: 60px;
          padding: 20px;
          position: relative;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
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

        .content-card {
          flex: 1;
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          margin-bottom: 6px;
        }

        .required-star {
          color: #f44336;
          font-size: 16px;
          margin-right: 2px;
        }

        .withdraw-input {
          background-color: #fff;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          padding: 12px 16px;
          color: #333;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .withdraw-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }
        .withdraw-input::placeholder {
          color: #aaa;
        }

        .balance-info {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 500;
          color: #222;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .balance-info i {
          color: #106cf5;
          font-size: 18px;
        }
        .balance-placeholder {
          opacity: 0.5;
        }

        .method-selection {
          display: flex;
          gap: 12px;
          margin: 8px 0 12px;
        }

        .method-card {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .method-card.selected {
          border-color: #106cf5;
          background-color: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
          transform: translateY(-2px);
        }
        .method-card:hover {
          border-color: #106cf5;
          background-color: #f5f8ff;
        }

        .method-icon {
          font-size: 28px;
          color: #106cf5;
          margin-bottom: 8px;
        }

        .method-label {
          font-weight: 600;
          color: #222;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .method-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 6px;
        }
        .method-status.complete {
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
        }
        .method-status.incomplete {
          color: #ff7a00;
          background-color: rgba(255, 122, 0, 0.1);
        }

        .method-network-hint {
          font-size: 11px;
          color: #999;
        }

        .preview-box {
          background: #f8f9fa;
          border: 1px solid #106cf5;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          font-size: 13px;
          color: #333;
        }
        .preview-box i {
          color: #106cf5;
          margin-right: 8px;
        }
        .preview-detail {
          color: #666;
          font-size: 12px;
        }

        .error-message {
          color: #f44336;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .announcement-container {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 20px 0;
          padding: 16px;
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          color: #ff7a00;
        }
        .speaker {
          font-size: 18px;
          color: #ff7a00;
          margin-top: 2px;
        }
        .announcement-text {
          font-size: 13px;
          color: #cc6600;
          line-height: 1.5;
        }

        .withdraw-button {
          background-color: #106cf5;
          color: white;
          border: none;
          height: 48px;
          width: 100%;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .withdraw-button:hover {
          background-color: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }
        .withdraw-button:active {
          transform: translateY(0);
        }
        .withdraw-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .tip-box {
          margin-top: 20px;
          padding: 12px 16px;
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 8px;
          font-size: 13px;
          color: #555;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .tip-box i {
          color: #106cf5;
          font-size: 16px;
          margin-top: 2px;
        }
        .tip-link {
          color: #106cf5;
          text-decoration: none;
          font-weight: 500;
        }
        .tip-link:hover {
          text-decoration: underline;
        }

        /* Modal content inside CustomModal (unchanged structure, just visual) */
        .modal-content-centered {
          text-align: center;
          color: #333;
        }
        .modal-warning-icon {
          font-size: 48px;
          color: #ff7a00;
          margin-bottom: 16px;
        }
        .modal-subtitle {
          color: #222;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .modal-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .missing-fields-list {
          text-align: left;
          margin-bottom: 24px;
          list-style: none;
          padding: 0;
        }
        .missing-fields-list li {
          margin-bottom: 8px;
          padding: 8px 12px;
          background-color: #f8f9fa;
          border-radius: 6px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          border: 1px solid #e7eaee;
        }
        .missing-fields-list i {
          color: #f44336;
          font-size: 14px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .modal-cancel-btn {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          color: #666;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .modal-cancel-btn:hover {
          border-color: #106cf5;
          color: #106cf5;
        }
        .modal-action-link {
          flex: 1;
          text-decoration: none;
        }
        .modal-action-btn {
          width: 100%;
          background-color: #106cf5;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-action-btn:hover {
          background-color: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }
          .method-card {
            padding: 12px 4px;
          }
          .method-icon {
            font-size: 24px;
          }
          .method-label {
            font-size: 13px;
          }
        }

        /* ── Withdrawal Success Modal ── */
        .wd-success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          animation: wdFadeIn 0.25s ease;
        }

        .wd-success-card {
          background: #ffffff;
          border-radius: 24px;
          width: 88%;
          max-width: 360px;
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22);
          animation: wdSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Animated SVG checkmark */
        .wd-success-icon-wrap {
          width: 72px;
          height: 72px;
        }
        .wd-check-svg {
          width: 72px;
          height: 72px;
        }
        .wd-check-circle {
          stroke: #22c55e;
          stroke-width: 2;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-linecap: round;
          animation: wdCircleDraw 0.5s ease forwards 0.1s;
        }
        .wd-check-tick {
          stroke: #22c55e;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: wdTickDraw 0.35s ease forwards 0.55s;
        }

        .wd-success-title {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          text-align: center;
        }

        .wd-success-msg {
          font-size: 14px;
          color: #555;
          text-align: center;
          line-height: 1.7;
        }
        .wd-success-msg strong {
          color: #111;
          font-weight: 700;
        }

        .wd-success-ref {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 13px;
          color: #15803d;
          font-weight: 600;
          width: 100%;
          text-align: center;
        }

        .wd-success-btn {
          margin-top: 4px;
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.2px;
        }
        .wd-success-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
        .wd-success-btn:active { transform: translateY(0); }

        @keyframes wdFadeIn  { from { opacity: 0; }                        to { opacity: 1; } }
        @keyframes wdSlideUp { from { transform: translateY(30px) scale(0.95); opacity: 0; }
                               to   { transform: translateY(0)     scale(1);    opacity: 1; } }
        @keyframes wdCircleDraw { to { stroke-dashoffset: 0; } }
        @keyframes wdTickDraw   { to { stroke-dashoffset: 0; } }
      `})]})}export{ae as default};

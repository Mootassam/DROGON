import{a3 as h,o as a,u as b,i as w,j as g,n as e,H as j,k as N}from"./index-de0c4ae3.js";import{u as v,y as F,F as y}from"./FormErrors-cb282015.js";import{y as o}from"./yupFormSchemas-d29632a9.js";import{I as t}from"./InputFormItem-d631a07c.js";import{u as i,S as _}from"./userEnumerators-23980188.js";import{u as k}from"./useDispatch-39c1e2e9.js";import"./memoize.browser.esm-012df344.js";const S=h().shape({preferredcoin:o.enumerator(a("user.fields.status"),{options:i.wallet,required:!0}),trc20:o.string(a("user.fields.walletAddress"),{required:!0}),withdrawPassword:o.string(a("user.fields.withdrawPassword"),{required:!0})});function E(){const n=k(),s=b(w.selectCurrentUser),[d]=g.useState(()=>({trc20:s.trc20||"",walletname:s.walletname||"",usernamewallet:s.usernamewallet||"",balance:(s==null?void 0:s.balance)||"",preferredcoin:(s==null?void 0:s.preferredcoin)||""})),l=v({resolver:F.yupResolver(S),mode:"onSubmit",defaultValues:d}),c=({preferredcoin:r,withdrawPassword:p,trc20:f,walletname:m,usernamewallet:u})=>{const x={trc20:f,walletname:m,usernamewallet:u,balance:s==null?void 0:s.balance,withdrawPassword:p,preferredcoin:r};n(N.doUpdateProfileWallet(x))};return e.jsxs("div",{className:"wallet-settings-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(j,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:a("pages.wallet.withdrawalMethod")})]})}),e.jsx("div",{className:"content-card",children:e.jsx(y,{...l,children:e.jsxs("form",{onSubmit:l.handleSubmit(c),className:"settings-form",children:[e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"label__form",children:[e.jsx("span",{className:"required-star",children:"*"}),e.jsx("span",{className:"label-text",children:a("pages.wallet.username")})]}),e.jsx(t,{type:"text",name:"usernamewallet",placeholder:a("user.fields.username"),className:"withdraw-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"label__form",children:[e.jsx("span",{className:"required-star",children:"*"}),e.jsx("span",{className:"label-text",children:a("pages.wallet.walletName")})]}),e.jsx(t,{type:"text",name:"walletname",placeholder:a("user.fields.walletName"),className:"withdraw-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"label__form",children:[e.jsx("span",{className:"required-star",children:"*"}),e.jsx("span",{className:"label-text",children:a("pages.wallet.choosePreferredCoin")})]}),e.jsx(_,{name:"preferredcoin",options:i.wallet.map(r=>({value:r,label:a(`user.enumerators.status.${r}`)})),required:!0,className:"settings-select"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"label__form",children:[e.jsx("span",{className:"required-star",children:"*"}),e.jsx("span",{className:"label-text",children:a("pages.wallet.walletAddress")})]}),e.jsx(t,{type:"text",name:"trc20",placeholder:a("user.fields.walletAddress"),className:"withdraw-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("div",{className:"label__form",children:[e.jsx("span",{className:"required-star",children:"*"}),e.jsx("span",{className:"label-text",children:a("pages.wallet.withdrawPassword")})]}),e.jsx(t,{type:"password",name:"withdrawPassword",placeholder:a("user.fields.withdrawPassword"),className:"withdraw-input"})]})]}),e.jsxs("div",{className:"form-footer",children:[e.jsx("button",{className:"submit-btn",type:"submit",children:a("pages.wallet.submit")}),e.jsxs("span",{className:"note-text",children:[e.jsx("b",{children:"Note:"})," ",a("pages.wallet.note")]})]})]})})}),e.jsx("style",{children:`
        /* Container – matches profile/wallet theme */
        .wallet-settings-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header */
        .header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
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
          flex: 1;
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

        /* Form */
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

     

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .label__form {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          color: #ffffff;
        }

        .required-star {
          color: #ff6b6b;
          font-size: 16px;
          line-height: 1;
        }

        .label-text {
          font-weight: 500;
        }

        /* Input fields */
        .settings-input input,
        .settings-input .input__withdraw {
          width: 100%;
          padding: 12px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .settings-input input:focus,
        .settings-input .input__withdraw:focus {
          outline: none;
          border-color: #39FF14;
        }

        /* Select field */
        .settings-select select {
          width: 100%;
          padding: 12px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
          appearance: none;
          cursor: pointer;
        }

        .settings-select select:focus {
          outline: none;
          border-color: #39FF14;
        }

        /* Form footer */
        .form-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }

        .submit-btn {
          width: 100%;
          background-color: #39FF14;
          color: #0f0f0f;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
 .withdraw-input {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          padding: 12px;
          color: #ffffff;
          font-size: 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .withdraw-input:focus {
          border-color: #39FF14;
        }
        .withdraw-input::placeholder {
          color: #777777;
        }

        .submit-btn:hover {
          background-color: #2ecc10;
        }

        .note-text {
          font-size: 13px;
          color: #aaaaaa;
          line-height: 1.5;
        }

        .note-text b {
          color: #39FF14;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .content-card {
            padding: 20px 16px;
          }
        }

        /* Remove blue highlight on tap */
        .back-arrow, .submit-btn {
          -webkit-tap-highlight-color: transparent;
        }
      `})]})}export{E as default};

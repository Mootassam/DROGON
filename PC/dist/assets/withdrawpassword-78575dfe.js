import{u as l,i as p,j as w,o as s,aB as u,a3 as c,n as a,H as b,k as P}from"./index-bf9bb85f.js";import{y as i}from"./yupFormSchemas-abb81db9.js";import{u as v,y as N,F as j}from"./FormErrors-c26cee00.js";import{F as n}from"./FieldFormItem-a32455a9.js";import{u as y}from"./useDispatch-3bbfd096.js";function W(){const m=y(),o=l(p.selectCurrentUser),t=l(p.selectLoadingPasswordChange),e=!!(o!=null&&o.withdrawPassword),f=w.useMemo(()=>{const r={newPassword:i.string(s("pages.withdrawPassword.fields.newPassword"),{required:!0}),newPasswordConfirmation:i.string(s("pages.withdrawPassword.fields.newPasswordConfirmation"),{required:!0}).oneOf([u("newPassword"),null],s("pages.withdrawPassword.validation.mustMatch"))};return e?c().shape({oldPassword:i.string(s("pages.withdrawPassword.fields.oldPassword"),{required:!0}),...r}):c().shape(r)},[e]),[h]=w.useState(()=>({oldPassword:"",newPassword:"",newPasswordConfirmation:""})),d=v({resolver:N.yupResolver(f),mode:"all",defaultValues:h}),g=r=>{m(P.doChangeWithdrawalPassword(e?r.oldPassword:void 0,r.newPassword))},x=e?"Change Withdraw Password":"Set a new Withdraw Password";return a.jsxs("div",{className:"withdrawpassword-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(b,{to:"/passwordtype",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:x})]})}),a.jsx("div",{className:"content-card",children:a.jsx(j,{...d,children:a.jsx("form",{onSubmit:d.handleSubmit(g),children:a.jsxs("div",{className:"password-form",children:[e&&a.jsx("div",{className:"form-group",children:a.jsx(n,{name:"oldPassword",type:"password",label:s("pages.withdrawPassword.fields.oldPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.withdrawPassword.placeholders.oldPassword")})}),a.jsx("div",{className:"form-group",children:a.jsx(n,{name:"newPassword",type:"password",label:e?s("pages.withdrawPassword.fields.newPassword"):"New Withdraw Password",className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.withdrawPassword.placeholders.newPassword")})}),a.jsx("div",{className:"form-group",children:a.jsx(n,{name:"newPasswordConfirmation",type:"password",label:e?s("pages.withdrawPassword.fields.newPasswordConfirmation"):"Confirm New Withdraw Password",className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.withdrawPassword.placeholders.confirmPassword")})}),a.jsx("button",{type:"submit",className:"save-button",disabled:t,children:t?"...":e?s("pages.withdrawPassword.buttons.saveChanges"):s("pages.withdrawPassword.buttons.setPassword")}),e?a.jsxs("div",{className:"warning-message",children:[a.jsx("i",{className:"fas fa-exclamation-circle"}),s("pages.withdrawPassword.warningMessage")]}):a.jsxs("div",{className:"info-message",children:[a.jsx("i",{className:"fas fa-info-circle"}),s("pages.withdrawPassword.infoMessage")]})]})})})}),a.jsx("style",{children:`
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

        .withdrawpassword-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
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

        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .password-form {
          width: 100%;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 16px;
          width: 100%;
        }

        .form-group-inner {
          width: 100%;
        }

        .form-label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .password-input-container {
          width: 100%;
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          font-size: 12px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          color: #333;
          height: 40px;
        }

        .form-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .form-input::placeholder {
          color: #aaa;
          font-size: 12px;
        }

        .save-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          margin-bottom: 16px;
        }

        .save-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .save-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .save-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .warning-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 8px;
          font-size: 12px;
          color: #ff7a00;
          line-height: 1.4;
        }

        .info-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #e8f0fe;
          border: 1px solid #b3cffe;
          border-radius: 8px;
          font-size: 12px;
          color: #1a56db;
          line-height: 1.4;
        }

        .warning-message i,
        .info-message i {
          font-size: 14px;
          flex-shrink: 0;
        }

        .form-input.error {
          border-color: #f44336;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
        }

        .error-message {
          font-size: 11px;
          color: #f44336;
          margin-top: 4px;
          display: block;
        }

        @media (max-width: 380px) {
          .withdrawpassword-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .form-input {
            padding: 6px 10px;
            height: 38px;
            font-size: 11px;
          }

          .save-button {
            padding: 10px;
            font-size: 13px;
          }

          .warning-message,
          .info-message {
            font-size: 11px;
            padding: 10px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}export{W as default};

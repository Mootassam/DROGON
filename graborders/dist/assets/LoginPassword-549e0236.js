import{W as l,n as s,as as p,o as c,p as m,i as g,j as a,L as f,w as x}from"./index-c2732cf2.js";import{y as e}from"./yupFormSchemas-c0bf516f.js";import{u as w,y as u,F as h}from"./FormErrors-1ff1d755.js";import{F as o}from"./FieldFormItem-b9c052cc.js";import{u as b}from"./useDispatch-578cdb5c.js";const P=l().shape({oldPassword:e.string(s("pages.loginPassword.fields.oldPassword"),{required:!0}),newPassword:e.string(s("pages.loginPassword.fields.newPassword"),{required:!0}),newPasswordConfirmation:e.string(s("pages.loginPassword.fields.newPasswordConfirmation"),{required:!0}).oneOf([p("newPassword"),null],s("pages.loginPassword.validation.mustMatch"))});function z(){const i=b();c(m.selectCurrentUser);const[t]=g.useState(()=>({oldPassword:"",newPassword:"",newPasswordConfirmation:""})),r=w({resolver:u.yupResolver(P),mode:"all",defaultValues:t}),d=n=>{i(x.doChangePassword(n.oldPassword,n.newPassword))};return a.jsxs("div",{className:"loginpassword-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(f,{to:"/typepassword",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:"Change Login Password"})]})}),a.jsx("div",{className:"content-card",children:a.jsx(h,{...r,children:a.jsx("form",{onSubmit:r.handleSubmit(d),children:a.jsxs("div",{className:"password-form",children:[a.jsx("div",{className:"form-group",children:a.jsx(o,{name:"oldPassword",type:"password",label:s("pages.loginPassword.fields.oldPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.oldPassword")})}),a.jsx("div",{className:"form-group",children:a.jsx(o,{name:"newPassword",type:"password",label:s("pages.loginPassword.fields.newPassword"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.newPassword")})}),a.jsx("div",{className:"form-group",children:a.jsx(o,{name:"newPasswordConfirmation",type:"password",label:s("pages.loginPassword.fields.newPasswordConfirmation"),className:"form-input",className1:"form-group-inner",className2:"form-label",className3:"password-input-container",placeholder:s("pages.loginPassword.placeholders.confirmPassword")})}),a.jsx("button",{type:"submit",className:"save-button",children:s("pages.loginPassword.buttons.saveChanges")}),a.jsxs("div",{className:"warning-message",children:[a.jsx("i",{className:"fas fa-exclamation-circle"}),s("pages.loginPassword.warningMessage")]})]})})})}),a.jsx("style",{children:`
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

        .loginpassword-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
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

        /* Content Card - Matching Profile Page */
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

        .save-button:hover {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .save-button:active {
          transform: translateY(0);
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

        .warning-message i {
          font-size: 14px;
          flex-shrink: 0;
        }

        /* Error styling for form inputs */
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

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .loginpassword-container {
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

          .warning-message {
            font-size: 11px;
            padding: 10px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}export{z as default};

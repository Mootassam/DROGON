import{u as L,o as O,p as E,i as s,w as P,W as H,n as a,as as W,aE as V,j as e,L as T}from"./index-3c74c896.js";import{u as U,y as $,F as D}from"./FormErrors-c09a32ba.js";import{y as x}from"./yupFormSchemas-a1fbf6f9.js";import{I as h}from"./InputFormItem-8dd34dde.js";import{u as X}from"./useDispatch-c7234b1e.js";function Z(){const u=X(),A=L(),b=O(E.selectLoading),y=O(E.selectErrorMessage),[c,w]=s.useState(""),[j,F]=s.useState(!1),[o,g]=s.useState(!1),[v,N]=s.useState(!1),[k,S]=s.useState(!1),[C,r]=s.useState(null),[z,m]=s.useState(null);s.useEffect(()=>{u(P.doClearErrorMessage())},[u]);const I=H().shape({email:x.string(a("pages.signup.labels.email"),{required:!0}),password:x.string(a("pages.signup.labels.password"),{required:!0,min:8}),newPasswordConfirmation:x.string(a("pages.signup.labels.confirmPassword"),{required:!0}).oneOf([W("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:x.string(a("pages.signup.labels.phoneNumber"),{required:!0})}),d=U({resolver:$.yupResolver(I),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:""}}),M=s.useCallback(async()=>{var i,n,l,f;r(null),m(null);const t=String(d.getValues("email")||"").trim();if(!t||!/^\S+@\S+\.\S+$/.test(t)){r("Please enter a valid email address first.");return}N(!0);try{await V.sendOtp(t),F(!0),g(!1),w(""),m("We sent a 6-digit code to your email.")}catch(p){r(((f=(l=(n=(i=p==null?void 0:p.response)==null?void 0:i.data)==null?void 0:n.errors)==null?void 0:l[0])==null?void 0:f.message)||"Failed to send code. Try again.")}finally{N(!1)}},[d]),R=s.useCallback(async()=>{var i,n,l,f;r(null),m(null);const t=String(d.getValues("email")||"").trim();if(!c||c.length<4){r("Enter the code from your email.");return}S(!0);try{await V.verifyOtp(t,c),g(!0),m("Email verified ✓")}catch(p){g(!1),r(((f=(l=(n=(i=p==null?void 0:p.response)==null?void 0:i.data)==null?void 0:n.errors)==null?void 0:l[0])==null?void 0:f.message)||"Invalid code.")}finally{S(!1)}},[d,c]),q=s.useCallback(async t=>{const{email:i,password:n,phoneNumber:l}=t;if(!o){r("Please verify your email before signing up.");return}u(P.doRegisterEmailAndPassword(i,n,l))},[u,o]),B=()=>{A.goBack()};return e.jsxs("div",{className:"signup-container",children:[e.jsxs("div",{className:"signup-header",children:[e.jsxs("div",{className:"header-left",onClick:B,children:[e.jsx("i",{className:"fas fa-arrow-left"}),e.jsx("span",{children:"Back"})]}),e.jsx("div",{className:"header-title",children:"Create Account"}),e.jsx("div",{className:"header-right"})," "]}),e.jsxs("div",{className:"signup-card",children:[e.jsx("div",{className:"form-heading",children:"Create your account"}),e.jsxs(D,{...d,children:[y&&e.jsx("div",{className:"error-message",children:y}),e.jsxs("form",{onSubmit:d.handleSubmit(q),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.email")}),e.jsxs("div",{className:"otp-email-row",children:[e.jsx("div",{style:{flex:1},children:e.jsx(h,{type:"email",name:"email",placeholder:a("pages.signup.placeholders.email"),className:"input-field",externalErrorMessage:null,autoComplete:"email"})}),e.jsx("button",{type:"button",className:"otp-send-btn",onClick:M,disabled:v||o,children:o?"Verified":v?"Sending…":j?"Resend":"Send Code"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.phoneNumber")}),e.jsx(h,{type:"tel",name:"phoneNumber",placeholder:a("pages.signup.placeholders.phoneNumber"),className:"input-field",autoComplete:"tel"})]}),j&&e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Email Verification Code"}),e.jsxs("div",{className:"otp-code-row",children:[e.jsx("input",{type:"text",inputMode:"numeric",maxLength:6,value:c,onChange:t=>{w(t.target.value.replace(/[^0-9]/g,"")),g(!1)},placeholder:"6-digit code",className:"input-field otp-code-input",disabled:o}),e.jsx("button",{type:"button",className:"otp-verify-btn",onClick:R,disabled:k||o,children:o?"✓":k?"…":"Verify"})]})]}),C&&e.jsx("div",{className:"otp-msg otp-msg-err",children:C}),z&&e.jsx("div",{className:"otp-msg otp-msg-ok",children:z}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.password")}),e.jsx(h,{type:"password",name:"password",placeholder:a("pages.signup.placeholders.password"),className:"input-field",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.confirmPassword")}),e.jsx(h,{type:"password",name:"newPasswordConfirmation",placeholder:a("pages.signup.placeholders.confirmPassword"),className:"input-field",autoComplete:"new-password"})]}),e.jsx("button",{className:"signup-button",disabled:b,type:"submit",children:b?e.jsxs("span",{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),a("pages.signup.creatingAccount")]}):e.jsx("span",{children:a("pages.signup.createAccount")})}),e.jsx("div",{className:"login-link",children:e.jsx(T,{to:"/auth/signin",children:a("pages.signup.alreadyHaveAccount")})})]})]})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .signup-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .signup-header {
          background: transparent;
          min-height: 60px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-left:hover {
          opacity: 1;
        }
        .header-left i {
          font-size: 16px;
        }

        .header-title {
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .header-right {
          width: 60px; /* to balance the layout */
        }

        /* ── White content card ── */
        .signup-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .form-heading {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 6px;
        }

        .input-field {
          background-color: #ffffff;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 46px;
          width: 100%;
          padding: 0 14px;
          color: #1a1a1a;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: 0.2s;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .input-field::placeholder {
          color: #aaa;
        }

        .captcha-wrapper {
          display: flex;
          gap: 10px;
        }

        .captcha-display {
          background-color: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          cursor: pointer;
          flex: 1;
          transition: 0.2s;
        }
        .captcha-display:hover {
          border-color: #106cf5;
          background-color: #e6efff;
        }

        .captcha-text {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #1a1a1a;
          user-select: none;
        }

        .captcha-refresh {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #106cf5;
          font-size: 12px;
          font-weight: 500;
        }

        .captcha-input {
          flex: 0 0 120px;
        }

        /* ── OTP email verification ── */
        .otp-email-row { display: flex; gap: 8px; align-items: flex-start; }
        .otp-send-btn {
          flex: 0 0 auto; height: 48px; padding: 0 14px; border: none; border-radius: 8px;
          background: #106cf5; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer;
          white-space: nowrap; transition: 0.2s;
        }
        .otp-send-btn:hover:not(:disabled) { background: #0a4fc4; }
        .otp-send-btn:disabled { opacity: 0.6; cursor: default; }
        .otp-code-row { display: flex; gap: 8px; }
        .otp-code-input { flex: 1; letter-spacing: 4px; font-weight: 700; }
        .otp-verify-btn {
          flex: 0 0 auto; height: 48px; padding: 0 18px; border: 1px solid #106cf5; border-radius: 8px;
          background: #fff; color: #106cf5; font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s;
        }
        .otp-verify-btn:hover:not(:disabled) { background: #e6efff; }
        .otp-verify-btn:disabled { opacity: 0.6; cursor: default; }
        .otp-msg { font-size: 13px; margin: -6px 0 14px; padding: 8px 12px; border-radius: 8px; }
        .otp-msg-err { color: #cc0000; background: #fff5f5; border: 1px solid #ffcccc; }
        .otp-msg-ok  { color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; }

        .signup-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin: 20px 0 16px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
        }
        .signup-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-link {
          text-align: right;
        }
        .login-link a {
          color: #106cf5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }
        .login-link a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: #ff4d4d;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px 12px;
          background-color: #fff5f5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #ffcccc;
        }
      `})]})}export{Z as default};

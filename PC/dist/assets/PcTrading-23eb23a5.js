import{u as H,i as oe,j as o,k as X,A as we,n as e,o as s,p as Re,q as Oe,t as $e,R as Be,v as Ve,L as qe,S as De,w as Ue,x as le,y as We,z as _e,B as He,C as Ie,D as ke,E as Ke,F as Xe}from"./index-3ac739b4.js";import{g as Je,P as je,u as Ge,a as Qe,b as Ne}from"./useSymbolInjections-28e1c89d.js";import{C as Ye}from"./CustomTradingChart-0000894e.js";import{l as Ze}from"./layoutActions-1cbf8979.js";import{u as me}from"./useDispatch-0fb9c073.js";function et({initialMode:c="login",onClose:y}){const p=me(),x=H(oe.selectLoading),u=H(oe.selectErrorMessage),[C,j]=o.useState(c),[g,h]=o.useState(""),[v,N]=o.useState(""),[S,J]=o.useState(!0),[T,G]=o.useState(""),[$,z]=o.useState(""),[a,r]=o.useState(null),[f,Q]=o.useState(""),[B,P]=o.useState(!1),[R,V]=o.useState(!1),[q,F]=o.useState(!1),[ae,Y]=o.useState(!1),[D,w]=o.useState(null);o.useEffect(()=>{p(X.doClearErrorMessage())},[p]);const M=n=>{j(n),r(null),w(null),p(X.doClearErrorMessage())},I=o.useCallback(async()=>{var n,A,L,U;if(r(null),w(null),!g||!/^\S+@\S+\.\S+$/.test(g)){r("Please enter a valid email address first.");return}F(!0);try{await we.sendOtp(g),P(!0),V(!1),Q(""),w("We sent a 6-digit code to your email.")}catch(E){r(((U=(L=(A=(n=E==null?void 0:E.response)==null?void 0:n.data)==null?void 0:A.errors)==null?void 0:L[0])==null?void 0:U.message)||"Failed to send code. Try again.")}finally{F(!1)}},[g]),re=o.useCallback(async()=>{var n,A,L,U;if(r(null),w(null),!f||f.length<4){r("Enter the code from your email.");return}Y(!0);try{await we.verifyOtp(g,f),V(!0),w("Email verified ✓")}catch(E){V(!1),r(((U=(L=(A=(n=E==null?void 0:E.response)==null?void 0:n.data)==null?void 0:A.errors)==null?void 0:L[0])==null?void 0:U.message)||"Invalid code.")}finally{Y(!1)}},[g,f]),ne=n=>{if(n.preventDefault(),r(null),!g||!v){r(s("pc.emailPwRequired"));return}p(X.doSigninWithEmailAndPassword(g,v,S))},ie=n=>{if(n.preventDefault(),r(null),!g||!v||!T){r(s("pc.fillRequired"));return}if(v.length<8){r(s("pc.pwMin"));return}if(v!==$){r(s("pc.pwMismatch"));return}if(!R){r("Please verify your email before signing up.");return}p(X.doRegisterEmailAndPassword(g,v,T))},Z=()=>p(X.doDemoLogin()),ee=a||u;return e.jsxs("div",{className:"pc-modal-overlay",onClick:y,children:[e.jsxs("div",{className:"pc-auth-modal",onClick:n=>n.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:y,children:"✕"}),e.jsxs("div",{className:"pc-auth-tabs",children:[e.jsx("button",{className:C==="login"?"active":"",onClick:()=>M("login"),children:s("pc.login")}),e.jsx("button",{className:C==="register"?"active":"",onClick:()=>M("register"),children:s("pc.register")})]}),ee&&e.jsx("div",{className:"pc-auth-error",children:ee}),!ee&&D&&e.jsx("div",{className:"pc-auth-ok",children:D}),C==="login"?e.jsxs("form",{className:"pc-auth-form",onSubmit:ne,children:[e.jsx("label",{children:s("pc.email")}),e.jsx("input",{type:"email",value:g,onChange:n=>h(n.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:s("pc.password")}),e.jsx("input",{type:"password",value:v,onChange:n=>N(n.target.value),placeholder:"••••••••",autoComplete:"current-password"}),e.jsx("div",{className:"pc-auth-remember",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:S,onChange:n=>J(n.target.checked)})," ",s("pc.rememberMe")]})}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.signingIn")]}):s("pc.login")}),e.jsx("button",{type:"button",className:"pc-auth-demo",onClick:Z,disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.loading")]}):s("pc.demoLogin")})]}):e.jsxs("form",{className:"pc-auth-form",onSubmit:ie,children:[e.jsx("label",{children:s("pc.email")}),e.jsxs("div",{className:"pc-otp-email-row",children:[e.jsx("input",{type:"email",value:g,onChange:n=>h(n.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("button",{type:"button",className:"pc-otp-send",onClick:I,disabled:q||R,children:R?"Verified":q?"Sending…":B?"Resend":"Send Code"})]}),B&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:"Email Verification Code"}),e.jsxs("div",{className:"pc-otp-code-row",children:[e.jsx("input",{type:"text",inputMode:"numeric",maxLength:6,value:f,onChange:n=>{Q(n.target.value.replace(/[^0-9]/g,"")),V(!1)},placeholder:"6-digit code",disabled:R}),e.jsx("button",{type:"button",className:"pc-otp-verify",onClick:re,disabled:ae||R,children:R?"✓":ae?"…":"Verify"})]})]}),e.jsx("label",{children:s("pc.phone")}),e.jsx("input",{type:"tel",value:T,onChange:n=>G(n.target.value),placeholder:s("pc.phone"),autoComplete:"tel"}),e.jsx("label",{children:s("pc.password")}),e.jsx("input",{type:"password",value:v,onChange:n=>N(n.target.value),placeholder:s("pc.passwordHint"),autoComplete:"new-password"}),e.jsx("label",{children:s("pc.confirmPassword")}),e.jsx("input",{type:"password",value:$,onChange:n=>z(n.target.value),placeholder:s("pc.reenterPassword"),autoComplete:"new-password"}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.creatingAccount")]}):s("pc.createAccount")})]}),e.jsx("div",{className:"pc-auth-switch",children:C==="login"?e.jsxs("span",{children:[s("pc.noAccount")," ",e.jsx("a",{onClick:()=>M("register"),children:s("pc.register")})]}):e.jsxs("span",{children:[s("pc.haveAccount")," ",e.jsx("a",{onClick:()=>M("login"),children:s("pc.login")})]})})]}),e.jsx("style",{children:`
        .pc-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
        }
        .pc-auth-modal {
          background: #fff; border-radius: 16px; width: 400px; max-width: 92vw;
          padding: 28px; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          max-height: 92vh; overflow-y: auto;
        }
        .pc-modal-x { position: absolute; top: 14px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; }
        .pc-auth-tabs { display: flex; gap: 8px; margin-bottom: 18px; }
        .pc-auth-tabs button { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; background: #f0f2f5; color: #6b7280; font-weight: 600; font-size: 14px; }
        .pc-auth-tabs button.active { background: #0064FA; color: #fff; }
        .pc-auth-form { display: flex; flex-direction: column; gap: 5px; }
        .pc-auth-form label { font-size: 12px; color: #6b7280; font-weight: 600; margin-top: 8px; }
        .pc-auth-form input[type=email], .pc-auth-form input[type=password], .pc-auth-form input[type=tel], .pc-auth-form input[type=text] {
          padding: 11px 13px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: border-color .15s; width: 100%;
        }
        .pc-auth-form input:focus { border-color: #0064FA; }
        .pc-auth-remember { margin-top: 10px; font-size: 13px; color: #6b7280; }
        .pc-auth-remember label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        /* OTP email verification */
        .pc-otp-email-row, .pc-otp-code-row { display: flex; gap: 8px; align-items: stretch; }
        .pc-otp-email-row input, .pc-otp-code-row input { flex: 1; }
        .pc-otp-code-row input { letter-spacing: 4px; font-weight: 700; }
        .pc-otp-send, .pc-otp-verify {
          flex: 0 0 auto; padding: 0 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap;
        }
        .pc-otp-send { border: none; background: #0064FA; color: #fff; }
        .pc-otp-send:hover:not(:disabled) { background: #0052d4; }
        .pc-otp-verify { border: 1.5px solid #0064FA; background: #fff; color: #0064FA; }
        .pc-otp-verify:hover:not(:disabled) { background: #e8f0ff; }
        .pc-otp-send:disabled, .pc-otp-verify:disabled { opacity: .6; cursor: default; }
        .pc-auth-error { color: #dc2626; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
        .pc-auth-ok { color: #15803d; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; }
        .pc-auth-submit { margin-top: 16px; padding: 13px; border: none; border-radius: 10px; background: #0064FA; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pc-auth-submit:disabled { opacity: .6; cursor: default; }
        .pc-auth-demo { margin-top: 10px; padding: 12px; border: 1.5px solid #0064FA; border-radius: 10px; background: #fff; color: #0064FA; font-weight: 700; font-size: 14px; cursor: pointer; }
        .pc-auth-demo:hover:not(:disabled) { background: #e8f0ff; }
        .pc-auth-demo:disabled { opacity: .6; cursor: default; }
        .pc-auth-switch { text-align: center; margin-top: 16px; font-size: 13px; color: #6b7280; }
        .pc-auth-switch a { color: #0064FA; cursor: pointer; font-weight: 600; }
      `})]})}const tt=[{icon:"fas fa-id-card",name:s("pc.kyc"),path:"/proof",lockWhenVerified:!0},{icon:"fas fa-link",name:s("pc.bindAccount"),path:"/bind-account"},{icon:"fas fa-list",name:s("pc.orders"),path:"/ordersPage"},{icon:"fas fa-money-bill",name:s("pc.deposit"),path:"/deposit",requiresKyc:!0},{icon:"fas fa-arrow-up",name:s("pc.withdraw"),path:"/Withdraw",requiresKyc:!0},{icon:"fas fa-shield-alt",name:s("pc.password"),path:"/typepassword",requiresKyc:!0},{icon:"fas fa-file-alt",name:s("pc.history"),path:"/history",requiresKyc:!0},{icon:"fas fa-bell",name:s("pc.notifications"),path:"/notification"},{icon:"fas fa-headset",name:s("pc.onlineService"),path:"/online-service"},{icon:"fas fa-building",name:s("pc.aboutUs"),path:"/about"},{icon:"fas fa-question-circle",name:s("pc.help"),path:"/support"}],Ce=new Set,st=[...le.privateRoutes,...le.screenRoutes,...le.routeswithoutmobilemenue,...le.navRoutes].filter(c=>!(c!=null&&c.path)||Ce.has(c.path)?!1:(Ce.add(c.path),!0)).map(c=>({path:c.path,Component:We({loader:c.loader})}));function ot({onClose:c}){var z;const y=me(),p=H(oe.selectCurrentUser),x=H(Re.selectKycStatus);o.useEffect(()=>{y(Oe.doFetch())},[y]),o.useEffect(()=>{const a=_e(),r={push:a.push,replace:a.replace,go:a.go,goBack:a.goBack,goForward:a.goForward},f=()=>{};return a.push=f,a.replace=f,a.go=f,a.goBack=f,a.goForward=f,()=>{a.push=r.push,a.replace=r.replace,a.go=r.go,a.goBack=r.goBack,a.goForward=r.goForward}},[]);const u=x==="success",C=(p==null?void 0:p.accountType)==="demo",j=o.useMemo(()=>tt.map(a=>({...a,disabled:a.requiresKyc?!u||C:a.lockWhenVerified?u:!1})),[u,C]),g=((z=j.find(a=>!a.disabled))==null?void 0:z.path)||"/proof",[h,v]=o.useState({path:g,n:0}),N=o.useMemo(()=>$e({initialEntries:[h.path]}),[h]),[S,J]=o.useState(!1);o.useEffect(()=>{const a=()=>J(N.index>0);return a(),N.listen(a)},[N]);const T=a=>{a.disabled||v(r=>({path:a.path,n:r.n+1}))};o.useEffect(()=>{const a=j.find(r=>r.path===h.path);if(a!=null&&a.disabled){const r=j.find(f=>!f.disabled);r&&v(f=>({path:r.path,n:f.n+1}))}},[j,h.path]);const G=x==="success"?s("pc.verified"):x==="pending"?s("pc.pendingReview"):s("pc.notVerified"),$=x==="success"?"#10b981":x==="pending"?"#f59e0b":"#ef4444";return e.jsxs("div",{className:"pc-modal-overlay",onClick:c,children:[e.jsxs("div",{className:"pc-profile-modal",onClick:a=>a.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:c,children:"✕"}),e.jsxs("aside",{className:"pc-profile-side",children:[e.jsxs("div",{className:"pc-profile-user",children:[e.jsx("div",{className:"pc-profile-avatar",children:((p==null?void 0:p.firstName)||(p==null?void 0:p.email)||"U").charAt(0).toUpperCase()}),e.jsx("div",{className:"pc-profile-email",children:(p==null?void 0:p.email)||"—"}),e.jsxs("div",{className:"pc-kyc-badge",style:{color:$,borderColor:$},children:[e.jsx("i",{className:x==="success"?"fas fa-check-circle":x==="pending"?"fas fa-clock":"fas fa-exclamation-circle"}),G]})]}),!u&&e.jsx("div",{className:"pc-kyc-hint",children:C?s("pc.demoNoFeatures"):s("pc.completeKyc")}),e.jsxs("nav",{className:"pc-profile-menu",children:[j.map(a=>e.jsxs("button",{className:`${h.path===a.path?"active":""} ${a.disabled?"disabled":""}`,onClick:()=>T(a),disabled:a.disabled,children:[e.jsx("i",{className:a.icon})," ",e.jsx("span",{children:a.name}),a.disabled&&e.jsx("i",{className:"fas fa-lock pc-lock"})]},a.name)),e.jsxs("button",{className:"pc-profile-logout",onClick:()=>{y(X.doSignout()),c()},children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," ",e.jsx("span",{children:s("pc.logout")})]})]})]}),e.jsxs("section",{className:`pc-profile-content ${S?"pc-nav-sub":"pc-nav-root"}`,children:[S&&e.jsx("div",{className:"pc-nav-bar",children:e.jsxs("button",{className:"pc-nav-back",onClick:()=>N.goBack(),children:[e.jsx("span",{className:"pc-nav-back-ico",children:"←"})," ",s("pc.back")]})}),e.jsx(Be,{history:N,children:e.jsx(Ve.Suspense,{fallback:e.jsx(qe,{}),children:e.jsx(De,{children:st.map(a=>e.jsx(Ue,{exact:!0,path:a.path,component:a.Component},a.path))})})},`mem-${h.n}`)]})]}),e.jsx("style",{children:`
        .pc-profile-modal {
          background: #fff; border-radius: 16px; width: 1000px; max-width: 96vw;
          height: 660px; max-height: 92vh; position: relative; display: flex;
          overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }
        .pc-modal-x { position: absolute; top: 12px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; z-index: 5; }
        .pc-profile-side {
          width: 250px; flex-shrink: 0; background: #f7f8fa; border-right: 1px solid #e5e7eb;
          padding: 22px 14px; display: flex; flex-direction: column;
        }
        .pc-profile-user { text-align: center; margin-bottom: 14px; }
        .pc-profile-avatar {
          width: 56px; height: 56px; border-radius: 50%; background: #0064FA; color: #fff;
          font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;
        }
        .pc-profile-email { font-size: 12px; color: #6b7280; word-break: break-all; margin-bottom: 8px; }
        .pc-kyc-badge {
          display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700;
          border: 1.5px solid; border-radius: 20px; padding: 3px 12px;
        }
        .pc-kyc-hint {
          background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; font-size: 11px;
          border-radius: 8px; padding: 8px 10px; margin-bottom: 12px; line-height: 1.4; text-align: center;
        }
        .pc-profile-menu { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
        .pc-profile-menu button {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none;
          background: none; border-radius: 8px; cursor: pointer; font-size: 14px; color: #374151;
          text-align: left; transition: background .15s; width: 100%;
        }
        .pc-profile-menu button i:first-child { width: 18px; color: #6b7280; }
        .pc-profile-menu button:hover:not(.disabled):not(.pc-profile-logout) { background: #eef1f5; }
        .pc-profile-menu button.active { background: #e8f0ff; color: #0064FA; font-weight: 600; }
        .pc-profile-menu button.active i:first-child { color: #0064FA; }
        .pc-profile-menu button.disabled { opacity: 0.45; cursor: not-allowed; }
        .pc-lock { margin-left: auto; font-size: 11px; color: #9ca3af; }
        .pc-profile-logout { margin-top: auto; color: #ef4444 !important; }
        .pc-profile-logout i { color: #ef4444 !important; }

        .pc-profile-content { flex: 1; overflow-y: auto; background: #fff; position: relative; }
        .pc-profile-content .container,
        .pc-profile-content .market-detail-container,
        .pc-profile-content .op-page,
        .pc-profile-content .profile-page,
        .pc-profile-content .withdraw-container { max-width: 100% !important; min-height: auto !important; }

        /* In-modal back bar (only on sub-pages) */
        .pc-nav-bar { position: sticky; top: 0; z-index: 6; background: #fff; border-bottom: 1px solid #eef1f5; padding: 8px 14px; }
        .pc-nav-back { display: inline-flex; align-items: center; gap: 8px; border: none; background: #f0f2f5; color: #0064FA; font-weight: 700; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer; }
        .pc-nav-back:hover { background: #e8f0ff; }
        .pc-nav-back-ico { font-size: 16px; line-height: 1; }

        /* Always hide the embedded pages' own back-arrows. Top-level pages are
           switched via the left menu; sub-pages use the single in-modal back bar
           above. This avoids duplicate/confusing back controls. */
        .pc-profile-content .back-arrow,
        .pc-profile-content .header-left,
        .pc-profile-content .back-button,
        .pc-profile-content .nav-back,
        .pc-profile-content .fa-arrow-left { display: none !important; }
      `})]})}const at=`
  .pc-root {
    --primary: #0064FA; --green: #10b981; --red: #ef4444;
    --bg: #ffffff; --bg-light: #f7f8fa; --border: #e5e7eb; --text: #1a1d23; --muted: #6b7280;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    height: 100vh; display: flex; flex-direction: column; background: var(--bg-light); color: var(--text);
  }
  .pc-root * { box-sizing: border-box; }

  /* Header */
  .pc-header {
    height: 60px; flex-shrink: 0; background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
  }
  .pc-logo { font-size: 18px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px; }
  .pc-logo span { color: var(--text); }
  .pc-header-left img { height: 36px; width: auto; }
  .pc-header-center { flex: 1; display: flex; justify-content: center; }
  .pc-asset-chip { display: flex; align-items: center; gap: 8px; background: var(--bg-light); padding: 6px 14px; border-radius: 10px; font-size: 14px; }
  .pc-asset-price { font-weight: 700; color: var(--primary); }
  .pc-header-right { display: flex; align-items: center; gap: 10px; }
  .pc-lang { padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; background: #fff; cursor: pointer; outline: none; }
  .pc-btn-ghost { padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; background: #fff; color: var(--text); font-weight: 600; font-size: 14px; cursor: pointer; }
  .pc-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
  .pc-btn-primary { padding: 8px 18px; border: none; border-radius: 8px; background: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer; }
  .pc-btn-primary:disabled { opacity: .6; cursor: default; }

  /* Main layout */
  .pc-main { flex: 1; display: flex; overflow: hidden; }

  /* Left */
  .pc-left { width: 290px; flex-shrink: 0; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; }
  .pc-search { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .pc-search i { color: var(--muted); font-size: 13px; }
  .pc-search input { flex: 1; border: none; outline: none; font-size: 14px; }
  .pc-filter { padding: 10px 14px; border-bottom: 1px solid var(--border); }
  .pc-filter select { width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; outline: none; cursor: pointer; }
  .pc-market-list { flex: 1; overflow-y: auto; }
  .pc-market-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f4f5f7; transition: background .12s; }
  .pc-market-item:hover { background: var(--bg-light); }
  .pc-market-item.active { background: #e8f0ff; }
  .pc-market-info { flex: 1; min-width: 0; }
  .pc-market-symbol { font-weight: 700; font-size: 13px; }
  .pc-market-name { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pc-market-px { text-align: right; }
  .pc-market-price { font-weight: 600; font-size: 13px; font-family: monospace; }
  .pc-market-chg { font-size: 11px; }
  .pc-market-chg.pos { color: var(--green); }
  .pc-market-chg.neg { color: var(--red); }

  /* Center */
  .pc-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 16px; gap: 14px; min-width: 0; }
  .pc-chart-head { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .pc-chart-asset { display: flex; align-items: center; gap: 12px; }
  .pc-chart-name { font-size: 18px; font-weight: 800; }
  .pc-chart-sub { font-size: 12px; color: var(--muted); }
  .pc-chart-price { font-size: 26px; font-weight: 800; font-family: monospace; }
  .pc-chart-wrap { flex: 1; min-height: 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #fff; display: flex; flex-direction: column; }
  .pc-chart-wrap > div { flex: 1; }

  /* Trade panel */
  .pc-trade-panel { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; }
  .pc-trade-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; }
  .pc-trade-row label { color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .pc-trade-row select, .pc-trade-row > input { padding: 8px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; outline: none; width: 160px; text-align: right; }
  .pc-trade-row select:focus, .pc-trade-row > input:focus { border-color: var(--primary); }
  .pc-stepper { display: flex; align-items: center; gap: 6px; }
  .pc-stepper button { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--bg-light); border-radius: 7px; cursor: pointer; font-size: 16px; }
  .pc-stepper input { width: 84px; text-align: center; border: 1.5px solid var(--border); border-radius: 7px; padding: 6px; font-weight: 600; outline: none; }
  .pc-trade-info { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); font-size: 14px; color: var(--muted); }
  .pc-insufficient { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-weight: 500; text-align: center; }
  .pc-trade-actions, .pc-binary-actions { display: flex; gap: 12px; }
  .pc-buy, .pc-sell { flex: 1; padding: 13px; border: none; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; color: #fff; }
  .pc-buy { background: var(--green); }
  .pc-sell { background: var(--red); }
  .pc-buy:disabled, .pc-sell:disabled { opacity: .5; cursor: default; }

  /* Right */
  .pc-right { width: 320px; flex-shrink: 0; background: #fff; border-left: 1px solid var(--border); padding: 12px; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; }

  /* Available funds card (centered, blue) */
  .pc-funds { background: var(--primary); color: #fff; border-radius: 12px; padding: 12px; text-align: center; }
  .pc-funds-label { font-size: 12px; font-weight: 600; opacity: .95; }
  .pc-funds-amount { font-size: 20px; font-weight: 700; margin-top: 4px; letter-spacing: .5px; }

  /* Trade/order panel */
  .pc-trade-panel { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; }
  .pc-tp-symbol { font-size: 14px; font-weight: 700; color: var(--text); }
  .pc-tp-price { font-size: 19px; font-weight: 700; color: var(--primary); margin: 1px 0 8px; }
  .pc-tp-select {
    width: 100%; padding: 7px 12px; border: 1px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--text); background: #fff; outline: none; cursor: pointer; margin-bottom: 8px;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  .pc-tp-select:focus { border-color: var(--primary); }
  .pc-tp-label { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 5px; }

  /* Toggle row (Set Loss / Take Profit) */
  .pc-tp-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
  .pc-tp-toggle-row span { font-size: 12px; font-weight: 600; color: var(--text); }
  .pc-switch { position: relative; display: inline-block; width: 38px; height: 20px; }
  .pc-switch input { opacity: 0; width: 0; height: 0; }
  .pc-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 20px; transition: .2s; cursor: pointer; }
  .pc-slider::before { content: ''; position: absolute; height: 15px; width: 15px; left: 3px; bottom: 2.5px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .pc-switch input:checked + .pc-slider { background: var(--primary); }
  .pc-switch input:checked + .pc-slider::before { transform: translateX(18px); }

  /* Stepper (full-width) */
  .pc-stepper.full { display: flex; align-items: stretch; gap: 0; margin-bottom: 9px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .pc-stepper.full button {
    width: 38px; border: none; background: var(--bg-light); color: #374151; font-size: 17px; cursor: pointer; flex-shrink: 0;
  }
  .pc-stepper.full button:disabled { opacity: .5; cursor: default; }
  .pc-stepper.full input {
    flex: 1; min-width: 0; border: none; border-left: 1px solid var(--border); border-right: 1px solid var(--border);
    text-align: center; font-size: 13px; font-weight: 600; color: var(--text); outline: none; padding: 7px 6px;
  }
  .pc-stepper.full input:disabled { background: var(--bg-light); color: #9ca3af; }
  .pc-stepper.full input::-webkit-outer-spin-button, .pc-stepper.full input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  /* Info rows */
  .pc-tp-info { display: flex; flex-direction: column; gap: 5px; margin: 2px 0 10px; }
  .pc-tp-info-row { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--muted); }
  .pc-tp-info-row b { color: var(--text); font-weight: 600; }

  /* Buy / Sell pills */
  .pc-tp-actions { display: flex; gap: 10px; }
  .pc-buy2, .pc-sell2 { flex: 1; padding: 10px; border: none; border-radius: 22px; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; transition: opacity .15s; }
  .pc-buy2 { background: var(--primary); }
  .pc-sell2 { background: var(--red); }
  .pc-buy2:hover:not(:disabled), .pc-sell2:hover:not(:disabled) { opacity: .9; }
  .pc-buy2:disabled, .pc-sell2:disabled { opacity: .5; cursor: default; }
  .pc-insufficient { margin-bottom: 9px; padding: 7px 10px; font-size: 11.5px; }

  /* Confirm modal rows */
  .pc-summary-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; color: var(--muted); }
  .pc-summary-row strong { color: var(--text); }
  .pc-summary-row strong.pos { color: var(--green); }
  .pc-summary-row strong.neg { color: var(--red); }

  /* Modals shared */
  .pc-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; }
  .pc-confirm { background: #fff; border-radius: 14px; width: 360px; max-width: 92vw; padding: 22px; }
  .pc-confirm-title { font-size: 17px; font-weight: 800; margin-bottom: 16px; text-align: center; }
  .pc-confirm-actions { display: flex; gap: 10px; margin-top: 18px; }
  .pc-confirm-actions button { flex: 1; }

  /* Toast */
  .pc-toast { position: fixed; top: 76px; right: 20px; background: #fff; border-left: 4px solid var(--green); box-shadow: 0 8px 32px rgba(0,0,0,0.15); border-radius: 10px; padding: 14px 18px; font-weight: 600; font-size: 14px; z-index: 11000; }
`;function rt(c){return c==null?"—":`${c>=0?"+":""}${c.toFixed(2)}%`}function pe(c){return c==null?"—":c>=1e4?c.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):c>=100?c.toFixed(2):c>=10?c.toFixed(3):c.toFixed(5)}function dt(){const c=me(),y=H(oe.selectCurrentUser),p=H(oe.selectCurrentTenant),x=H(He.selectRows),[u,C]=o.useState("XAUUSD"),[j,g]=o.useState(""),[h,v]=o.useState("All"),[N,S]=o.useState(null),[J,T]=o.useState(!1),[G,$]=o.useState(Ie()),[z,a]=o.useState(100),[r,f]=o.useState(.01),[Q,B]=o.useState("0.01"),[P,R]=o.useState(!1),[V,q]=o.useState(0),[F,ae]=o.useState(!1),[Y,D]=o.useState(0),[w,M]=o.useState(null),[I,re]=o.useState(!1),[ne,ie]=o.useState(null),[Z,ee]=o.useState({}),n=o.useRef(null),A=o.useRef(null),L=t=>`~m~${t.length}~m~${t}`,U=t=>{const i=[];let d=t;for(;d.length>0&&d.startsWith("~m~");){const b=d.indexOf("~m~",3),k=parseInt(d.substring(3,b));i.push(d.substring(b+3,b+3+k)),d=d.substring(b+3+k)}return i},E=t=>{try{return JSON.parse(t.replace(/^=\{/,"{")).symbol||t}catch{return t}},de=o.useCallback(()=>{n.current&&(n.current.close(),n.current=null);const t=new WebSocket(Je());n.current=t,t.onopen=()=>{const i="qs_"+Math.random().toString(36).substring(2,12);t.send(L(JSON.stringify({m:"quote_create_session",p:[i]}))),t.send(L(JSON.stringify({m:"quote_set_fields",p:[i,"lp","ask","bid","chp"]}))),t.send(L(JSON.stringify({m:"quote_add_symbols",p:[i,...je.map(d=>d.symbol)]})))},t.onmessage=i=>{const d=i.data;if(d.startsWith("~h~")){t.send(d);return}U(d).forEach(b=>{try{const k=JSON.parse(b);if(k.m!=="qsd")return;const te=k.p[1],W=E(te.n),_=te.v;if(!_)return;ee(xe=>{const O=xe[W]||{symbol:W,ask:0,bid:0},se={symbol:W,ask:_.ask??O.ask,bid:_.bid??O.bid,lp:typeof _.lp=="number"?_.lp:O.lp,chp:typeof _.chp=="number"?_.chp:O.chp};return O.ask===se.ask&&O.bid===se.bid&&O.lp===se.lp&&O.chp===se.chp?xe:{...xe,[W]:se}})}catch{}})},t.onclose=i=>{i.wasClean||(A.current=setTimeout(de,3e3))},t.onerror=()=>{}},[]);o.useEffect(()=>(de(),()=>{var t;A.current&&clearTimeout(A.current),(t=n.current)==null||t.close()}),[de]);const he=Ge(),l=he[u],m=o.useMemo(()=>{const t=Z[u];return t?t.lp&&t.lp>0?t.lp:t.ask&&t.bid?(t.ask+t.bid)/2:null:null},[Z,u]),[Se,ze]=o.useState(()=>typeof window<"u"?Math.max(360,window.innerHeight-60-88):480);o.useEffect(()=>{const t=()=>ze(Math.max(360,window.innerHeight-60-88));return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const ge=o.useRef(null);o.useEffect(()=>{ge.current=m},[m]);const Fe=o.useMemo(()=>l?{symbol:l.symbol,entryPrice:l.entryPrice,targetPrice:l.targetPrice,startedAt:l.startedAt,durationMs:l.durationMs,seed:l.seed}:null,[l==null?void 0:l.symbol,l==null?void 0:l.startedAt,l==null?void 0:l.targetPrice,l==null?void 0:l.durationMs,l==null?void 0:l.entryPrice,l==null?void 0:l.seed]),[be,ye]=o.useState(0);o.useEffect(()=>{y&&c(ke.doFetch())},[c,y]),o.useEffect(()=>{const t=x==null?void 0:x.find(i=>i.symbol==="USDT");ye((t==null?void 0:t.amount)||0)},[x]);const ue=Qe(u)||{symbol:u,name:u},Pe=l?ge.current??l.targetPrice:m,K=o.useMemo(()=>{const t=m??0,i=z/100;return t*100*r/i},[m,r,z]),fe=K>=100?K.toFixed(3):K.toFixed(5),ce=y?be<K&&K>0:!1,Me=o.useMemo(()=>((m??0)*r*100*1e-5).toFixed(6),[m,r]),Ae=`1 Lots = 100 ${u}`,Le=o.useMemo(()=>je.filter(t=>j&&!`${t.symbol} ${t.name}`.toLowerCase().includes(j.toLowerCase())?!1:h==="All"?!0:h==="Forex"?!!t.baseFlag&&!t.badgeColor&&!/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):h==="Crypto"?!!t.badgeColor&&/BTC|ETH|LTC/.test(t.symbol):h==="Metals"?/XAU|XAG/.test(t.symbol):h==="Indices"?/100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):!0),[j,h]),ve=t=>{if(!y){S("login");return}M(t)},Ee=async()=>{var t,i,d,b;if(!(!w||!(p!=null&&p.id)||m==null)){re(!0);try{await Xe.post(`/tenant/${p.id}/trade-orders`,{orderType:"market",symbol:u,symbolName:ue.name,direction:w,lots:r,multiplier:z,entryPrice:m,takeProfit:F?Y:null,stopLoss:P?V:null}),ye(k=>Math.max(0,k-K)),c(ke.doFetch()),M(null),ie(`${w==="buy"?s("pc.buy"):s("pc.sell")} — ${s("pc.orderPlaced")} ${u}`),setTimeout(()=>ie(null),3500)}catch(k){alert(((b=(d=(i=(t=k==null?void 0:k.response)==null?void 0:t.data)==null?void 0:i.errors)==null?void 0:d[0])==null?void 0:b.message)||"Failed to place order")}finally{re(!1)}}},Te=t=>{$(t),Ze.doChangeLanguage(t)};return e.jsxs("div",{className:"pc-root",children:[e.jsx("style",{children:at}),e.jsxs("header",{className:"pc-header",children:[e.jsx("div",{className:"pc-header-left",children:e.jsx("img",{src:"/logo.png",alt:""})}),e.jsx("div",{className:"pc-header-center"}),e.jsxs("div",{className:"pc-header-right",children:[e.jsx("select",{className:"pc-lang",value:G,onChange:t=>Te(t.target.value),children:Ke().map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))}),y?e.jsx(e.Fragment,{children:e.jsxs("button",{className:"pc-btn-ghost",onClick:()=>T(!0),children:[e.jsx("i",{className:"fas fa-user"})," ",s("pc.profile")]})}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>S("login"),children:s("pc.login")}),e.jsx("button",{className:"pc-btn-primary",onClick:()=>S("register"),children:s("pc.register")})]})]})]}),e.jsxs("div",{className:"pc-main",children:[e.jsxs("aside",{className:"pc-left",children:[e.jsxs("div",{className:"pc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{placeholder:s("pc.searchMarkets"),value:j,onChange:t=>g(t.target.value)})]}),e.jsx("div",{className:"pc-filter",children:e.jsx("select",{value:h,onChange:t=>v(t.target.value),children:[["All","pc.all"],["Forex","pc.forex"],["Crypto","pc.crypto"],["Metals","pc.metals"],["Indices","pc.indices"]].map(([t,i])=>e.jsx("option",{value:t,children:s(i)},t))})}),e.jsx("div",{className:"pc-market-list",children:Le.map(t=>{const i=Z[t.symbol],d=i?i.lp&&i.lp>0?i.lp:i.ask&&i.bid?(i.ask+i.bid)/2:null:null,b=he[t.symbol],k=b?b.targetPrice:d,te=b?(b.targetPrice-b.entryPrice)/b.entryPrice*100:(i==null?void 0:i.chp)??null,W=(te??0)>=0;return e.jsxs("div",{className:`pc-market-item ${u===t.symbol?"active":""}`,onClick:()=>C(t.symbol),children:[e.jsx(Ne,{pair:t,size:"sm"}),e.jsxs("div",{className:"pc-market-info",children:[e.jsx("div",{className:"pc-market-symbol",children:t.symbol}),e.jsx("div",{className:"pc-market-name",children:t.name})]}),e.jsxs("div",{className:"pc-market-px",children:[e.jsx("div",{className:"pc-market-price",children:pe(k)}),e.jsxs("div",{className:`pc-market-chg ${W?"pos":"neg"}`,children:[W?"▲":"▼"," ",rt(te)]})]})]},t.symbol)})})]}),e.jsxs("section",{className:"pc-center",children:[e.jsxs("div",{className:"pc-chart-head",children:[e.jsxs("div",{className:"pc-chart-asset",children:[e.jsx(Ne,{pair:ue,size:"md"}),e.jsxs("div",{children:[e.jsx("div",{className:"pc-chart-name",children:u}),e.jsx("div",{className:"pc-chart-sub",children:ue.name})]})]}),e.jsx("div",{className:"pc-chart-price",style:{color:l?l.targetPrice>=l.entryPrice?"#10b981":"#ef4444":"#1a1d23"},children:pe(Pe)})]}),e.jsx("div",{className:"pc-chart-wrap",children:e.jsx(Ye,{symbol:u,livePrice:m,height:Se,priceInjection:Fe},u)})]}),e.jsxs("aside",{className:"pc-right",children:[e.jsxs("div",{className:"pc-funds",children:[e.jsx("div",{className:"pc-funds-label",children:s("pc.availableFunds")}),e.jsx("div",{className:"pc-funds-amount",children:y?`$${be.toFixed(2)}`:"----"})]}),e.jsxs("div",{className:"pc-trade-panel",children:[e.jsx("div",{className:"pc-tp-symbol",children:u}),e.jsx("div",{className:"pc-tp-price",children:pe(m)}),e.jsx("select",{className:"pc-tp-select",children:e.jsx("option",{children:s("pc.marketPrice")})}),e.jsx("div",{className:"pc-tp-label",children:s("pc.multiplier")}),e.jsx("select",{className:"pc-tp-select",value:z,onChange:t=>a(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:s("pc.setLoss")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:P,onChange:t=>{R(t.target.checked),q(t.target.checked&&m?m:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>P&&q(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!P,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!P,value:V,onChange:t=>q(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>P&&q(t=>+(t+.01).toFixed(5)),disabled:!P,children:"+"})]}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:s("pc.takeProfit")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:F,onChange:t=>{ae(t.target.checked),D(t.target.checked&&m?m:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>F&&D(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!F,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!F,value:Y,onChange:t=>D(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>F&&D(t=>+(t+.01).toFixed(5)),disabled:!F,children:"+"})]}),e.jsx("div",{className:"pc-tp-label",children:s("pc.lots")}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>{const t=Math.max(.01,+(r-.01).toFixed(2));f(t),B(String(t))},children:"−"}),e.jsx("input",{type:"text",inputMode:"decimal",value:Q,onChange:t=>{const i=t.target.value.replace(/[^0-9.]/g,"");B(i);const d=parseFloat(i);!isNaN(d)&&d>0&&f(d)},onBlur:()=>{let t=parseFloat(Q);(isNaN(t)||t<.01)&&(t=.01),t=Math.round(t*100)/100,f(t),B(String(t))}}),e.jsx("button",{onClick:()=>{const t=+(r+.01).toFixed(2);f(t),B(String(t))},children:"+"})]}),e.jsxs("div",{className:"pc-tp-info",children:[e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.eachLots")}),e.jsx("b",{children:Ae})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.handlingFee")}),e.jsx("b",{children:Me})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.estimatedMargin")}),e.jsx("b",{style:{color:ce?"#ef4444":"#1a1d23"},children:fe})]})]}),ce&&e.jsxs("div",{className:"pc-insufficient",children:["⚠ ",s("pc.insufficient")," ($",fe,")"]}),e.jsxs("div",{className:"pc-tp-actions",children:[e.jsx("button",{className:"pc-buy2",disabled:m==null||ce,onClick:()=>ve("buy"),children:s("pc.buy")}),e.jsx("button",{className:"pc-sell2",disabled:m==null||ce,onClick:()=>ve("sell"),children:s("pc.sell")})]})]})]})]}),w&&e.jsx("div",{className:"pc-modal-overlay",onClick:()=>!I&&M(null),children:e.jsxs("div",{className:"pc-confirm",onClick:t=>t.stopPropagation(),children:[e.jsx("div",{className:"pc-confirm-title",children:w==="buy"?s("pc.confirmBuy"):s("pc.confirmSell")}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.symbol")}),e.jsx("strong",{children:u})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.direction")}),e.jsx("strong",{className:w==="buy"?"pos":"neg",children:w==="buy"?s("pc.buy"):s("pc.sell")})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.price")}),e.jsx("strong",{children:pe(m)})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.lotsMult")}),e.jsxs("strong",{children:[r.toFixed(2)," · ",z,"×"]})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.estimatedMargin")}),e.jsxs("strong",{children:["$",fe]})]}),e.jsxs("div",{className:"pc-confirm-actions",children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>M(null),disabled:I,children:s("pc.cancel")}),e.jsx("button",{className:"pc-btn-primary",onClick:Ee,disabled:I,children:I?s("pc.placing"):s("pc.confirm")})]})]})}),ne&&e.jsxs("div",{className:"pc-toast",children:["✓ ",ne]}),N&&e.jsx(et,{initialMode:N,onClose:()=>S(null)}),J&&e.jsx(ot,{onClose:()=>T(!1)})]})}export{dt as default};

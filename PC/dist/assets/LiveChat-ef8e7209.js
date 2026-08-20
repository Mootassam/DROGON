import{j as s,n as a,aC as v,F as k,aO as j}from"./index-ec312a38.js";const u="https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq",l="tawk-embed-container",A=/https?:\/\/embed\.tawk\.to\/[\w-]+\/[\w-]+/i;function S(n){if(!n)return null;const o=String(n).match(A);return o?o[0]:null}function C(n){return`https://wa.me/${String(n||"").replace(/[^\d]/g,"")}`}function E(n){return`https://t.me/${String(n||"").trim().replace(/^https?:\/\/t\.me\//i,"").replace(/^@/,"")}`}function T(){const[n,o]=s.useState(!0),[p,w]=s.useState("livechat"),[d,g]=s.useState(u),[h,x]=s.useState([]);s.useEffect(()=>{let t=!0;async function c(){try{const i=v.get(),e=await k.get(`/tenant/${i}/settings`).then(r=>r.data);if(!t)return;const m=(e==null?void 0:e.contactMethod)==="livechat"?"livechat":"category";if(w(m),m==="livechat")g(S(e==null?void 0:e.liveChatCode)||u);else{const r=await j.list({status:"enable"},"",0,0),b=((r==null?void 0:r.rows)||[]).filter(f=>f.type==="whatsApp"||f.type==="telegram");t&&x(b)}}catch(i){console.error("Failed to load customer support settings:",i)}finally{t&&o(!1)}}return c(),()=>{t=!1}},[]),s.useEffect(()=>{if(n||p!=="livechat")return;const t=()=>{var i;try{(i=document.getElementById("tawk-js"))==null||i.remove()}catch{}try{document.querySelectorAll('iframe[src*="tawk.to"], iframe[title*="chat" i]').forEach(e=>e.remove())}catch{}try{document.querySelectorAll('[id^="tawkchat"], [class*="tawk-"], [id^="tawk-bubble"], [id^="tawk-tooltip"]').forEach(e=>{e.id!==l&&e.remove()})}catch{}try{Object.keys(window).forEach(e=>{if(/tawk/i.test(e))try{delete window[e]}catch{window[e]=void 0}})}catch{}};t(),window.Tawk_API={embedded:l},window.Tawk_LoadStart=new Date;const c=document.createElement("script");return c.id="tawk-js",c.async=!0,c.setAttribute("charset","UTF-8"),c.setAttribute("crossorigin","*"),c.src=d,document.body.appendChild(c),t},[n,p,d]);const y=!n&&p==="category";return a.jsxs("div",{className:"pc-livechat",children:[y?a.jsxs("div",{className:"pc-contact-options",children:[h.length===0&&a.jsx("p",{className:"pc-contact-options-empty",children:"No contact options are available right now."}),h.map(t=>a.jsxs("a",{href:t.type==="whatsApp"?C(t.number):E(t.number),target:"_blank",rel:"noopener noreferrer",className:`pc-contact-option pc-contact-option-${t.type}`,children:[a.jsx("i",{className:t.type==="whatsApp"?"fab fa-whatsapp":"fab fa-telegram-plane"}),a.jsx("span",{children:t.name||(t.type==="whatsApp"?"WhatsApp":"Telegram")})]},t.id))]}):a.jsxs(a.Fragment,{children:[a.jsx("div",{id:l,className:"pc-livechat-embed"}),a.jsxs("div",{className:"pc-livechat-loading",children:[a.jsx("i",{className:"fas fa-comments"}),a.jsx("p",{children:"Connecting you to support…"})]})]}),a.jsx("style",{children:`
        .pc-livechat {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 560px;
          background: #fff;
        }
        .pc-livechat-embed { position: absolute; inset: 0; z-index: 2; }
        .pc-livechat-embed iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
        .pc-livechat-loading {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; color: #8a93a2;
        }
        .pc-livechat-loading i { font-size: 44px; color: #0064FA; margin-bottom: 14px; }
        .pc-livechat-loading p { font-size: 15px; }

        .pc-contact-options {
          padding: 28px 20px; display: flex; flex-direction: column; gap: 14px;
        }
        .pc-contact-options-empty {
          text-align: center; color: #8a93a2; margin-top: 40px;
        }
        .pc-contact-option {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 16px; text-decoration: none;
          font-size: 16px; font-weight: 600; color: #fff;
        }
        .pc-contact-option i { font-size: 26px; }
        .pc-contact-option-whatsApp { background: #25d366; }
        .pc-contact-option-telegram { background: #229ed9; }
      `})]})}export{T as default};

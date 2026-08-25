import{u as k,i as s,j as t,at as j,I as A,aG as S}from"./index-82128ca2.js";const x="https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq",d="tawk-embed-container",N=/https?:\/\/embed\.tawk\.to\/[\w-]+\/[\w-]+/i;function C(i){if(!i)return null;const n=String(i).match(N);return n?n[0]:null}function E(i){return`https://wa.me/${String(i||"").replace(/[^\d]/g,"")}`}function T(i){return`https://t.me/${String(i||"").trim().replace(/^https?:\/\/t\.me\//i,"").replace(/^@/,"")}`}function z(){const i=k(),[n,g]=s.useState(!0),[l,w]=s.useState("livechat"),[p,v]=s.useState(x),[h,y]=s.useState([]);s.useEffect(()=>{let e=!0;async function o(){try{const c=j.get(),a=await A.get(`/tenant/${c}/settings`).then(r=>r.data);if(!e)return;const m=(a==null?void 0:a.contactMethod)==="livechat"?"livechat":"category";if(w(m),m==="livechat")v(C(a==null?void 0:a.liveChatCode)||x);else{const r=await S.list({status:"enable"},"",0,0),b=((r==null?void 0:r.rows)||[]).filter(u=>u.type==="whatsApp"||u.type==="telegram");e&&y(b)}}catch(c){console.error("Failed to load customer support settings:",c)}finally{e&&g(!1)}}return o(),()=>{e=!1}},[]),s.useEffect(()=>{if(n||l!=="livechat")return;const e=()=>{var c;try{(c=document.getElementById("tawk-js"))==null||c.remove()}catch{}try{document.querySelectorAll('iframe[src*="tawk.to"], iframe[title*="chat" i]').forEach(a=>a.remove())}catch{}try{document.querySelectorAll('[id^="tawkchat"], [class*="tawk-"], [id^="tawk-bubble"], [id^="tawk-tooltip"]').forEach(a=>{a.id!==d&&a.remove()})}catch{}try{Object.keys(window).forEach(a=>{if(/tawk/i.test(a))try{delete window[a]}catch{window[a]=void 0}})}catch{}};e(),window.Tawk_API={embedded:d},window.Tawk_LoadStart=new Date;const o=document.createElement("script");return o.id="tawk-js",o.async=!0,o.setAttribute("charset","UTF-8"),o.setAttribute("crossorigin","*"),o.src=p,document.body.appendChild(o),e},[n,l,p]);const f=!n&&l==="category";return t.jsxs("div",{className:"livechat-container",children:[t.jsxs("div",{className:"livechat-header",children:[t.jsxs("div",{className:"livechat-back",onClick:()=>i.goBack(),children:[t.jsx("i",{className:"fas fa-arrow-left"}),t.jsx("span",{children:"Back"})]}),t.jsx("div",{className:"livechat-title",children:f?"Contact Us":"Live Support"}),t.jsx("div",{className:"livechat-spacer"})]}),t.jsx("div",{className:"livechat-body",children:f?t.jsxs("div",{className:"contact-options",children:[h.length===0&&t.jsx("p",{className:"contact-options-empty",children:"No contact options are available right now."}),h.map(e=>t.jsxs("a",{href:e.type==="whatsApp"?E(e.number):T(e.number),target:"_blank",rel:"noopener noreferrer",className:`contact-option contact-option-${e.type}`,children:[t.jsx("i",{className:e.type==="whatsApp"?"fab fa-whatsapp":"fab fa-telegram-plane"}),t.jsx("span",{children:e.name||(e.type==="whatsApp"?"WhatsApp":"Telegram")})]},e.id))]}):t.jsxs(t.Fragment,{children:[t.jsx("div",{id:d,className:"livechat-embed"}),t.jsxs("div",{className:"livechat-loading",children:[t.jsx("i",{className:"fas fa-comments"}),t.jsx("p",{children:"Connecting you to support…"})]})]})}),t.jsx("style",{children:`
        .livechat-container {
          max-width: 400px; margin: 0 auto; min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex; flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .livechat-header {
          min-height: 60px; padding: 16px 20px; display: flex; align-items: center;
          justify-content: space-between; color: #fff; flex-shrink: 0;
        }
        .livechat-back { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; cursor: pointer; opacity: .9; }
        .livechat-back:hover { opacity: 1; }
        .livechat-title { font-size: 17px; font-weight: 600; }
        .livechat-spacer { width: 48px; }
        .livechat-body {
          position: relative; flex: 1; background: #fff;
          border-radius: 28px 28px 0 0; overflow: hidden;
        }
        /* The Tawk container fills the white area; its iframe is forced to 100% */
        .livechat-embed { position: absolute; inset: 0; z-index: 2; }
        .livechat-embed iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
        /* Placeholder sits behind the chat until it loads */
        .livechat-loading {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; color: #8a93a2;
        }
        .livechat-loading i { font-size: 44px; color: #106cf5; margin-bottom: 14px; }
        .livechat-loading p { font-size: 15px; }

        .contact-options {
          padding: 28px 20px; display: flex; flex-direction: column; gap: 14px;
        }
        .contact-options-empty {
          text-align: center; color: #8a93a2; margin-top: 40px;
        }
        .contact-option {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 16px; text-decoration: none;
          font-size: 16px; font-weight: 600; color: #fff;
        }
        .contact-option i { font-size: 26px; }
        .contact-option-whatsApp { background: #25d366; }
        .contact-option-telegram { background: #229ed9; }
      `})]})}export{z as default};

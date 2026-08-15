import{u as n,i as r,j as e}from"./index-f19108a0.js";const l="https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq",a="tawk-embed-container";function h(){const o=n();return r.useEffect(()=>{const c=()=>{var s;try{(s=document.getElementById("tawk-js"))==null||s.remove()}catch{}try{document.querySelectorAll('iframe[src*="tawk.to"], iframe[title*="chat" i]').forEach(t=>t.remove())}catch{}try{document.querySelectorAll('[id^="tawkchat"], [class*="tawk-"], [id^="tawk-bubble"], [id^="tawk-tooltip"]').forEach(t=>{t.id!==a&&t.remove()})}catch{}try{Object.keys(window).forEach(t=>{if(/tawk/i.test(t))try{delete window[t]}catch{window[t]=void 0}})}catch{}};c(),window.Tawk_API={embedded:a},window.Tawk_LoadStart=new Date;const i=document.createElement("script");return i.id="tawk-js",i.async=!0,i.setAttribute("charset","UTF-8"),i.setAttribute("crossorigin","*"),i.src=l,document.body.appendChild(i),c},[]),e.jsxs("div",{className:"livechat-container",children:[e.jsxs("div",{className:"livechat-header",children:[e.jsxs("div",{className:"livechat-back",onClick:()=>o.goBack(),children:[e.jsx("i",{className:"fas fa-arrow-left"}),e.jsx("span",{children:"Back"})]}),e.jsx("div",{className:"livechat-title",children:"Live Support"}),e.jsx("div",{className:"livechat-spacer"})]}),e.jsxs("div",{className:"livechat-body",children:[e.jsx("div",{id:a,className:"livechat-embed"}),e.jsxs("div",{className:"livechat-loading",children:[e.jsx("i",{className:"fas fa-comments"}),e.jsx("p",{children:"Connecting you to support…"})]})]}),e.jsx("style",{children:`
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
      `})]})}export{h as default};

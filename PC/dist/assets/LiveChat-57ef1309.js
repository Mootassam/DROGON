import{j as n,n as i}from"./index-de0c4ae3.js";const r="https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq",c="tawk-embed-container";function d(){return n.useEffect(()=>{const a=()=>{var o;try{(o=document.getElementById("tawk-js"))==null||o.remove()}catch{}try{document.querySelectorAll('iframe[src*="tawk.to"], iframe[title*="chat" i]').forEach(t=>t.remove())}catch{}try{document.querySelectorAll('[id^="tawkchat"], [class*="tawk-"], [id^="tawk-bubble"], [id^="tawk-tooltip"]').forEach(t=>{t.id!==c&&t.remove()})}catch{}try{Object.keys(window).forEach(t=>{if(/tawk/i.test(t))try{delete window[t]}catch{window[t]=void 0}})}catch{}};a(),window.Tawk_API={embedded:c},window.Tawk_LoadStart=new Date;const e=document.createElement("script");return e.id="tawk-js",e.async=!0,e.setAttribute("charset","UTF-8"),e.setAttribute("crossorigin","*"),e.src=r,document.body.appendChild(e),a},[]),i.jsxs("div",{className:"pc-livechat",children:[i.jsx("div",{id:c,className:"pc-livechat-embed"}),i.jsxs("div",{className:"pc-livechat-loading",children:[i.jsx("i",{className:"fas fa-comments"}),i.jsx("p",{children:"Connecting you to support…"})]}),i.jsx("style",{children:`
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
      `})]})}export{d as default};

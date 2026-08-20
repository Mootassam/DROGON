import{n as a,j as e,L as n}from"./index-c2732cf2.js";function o(){const i=[a("pages.helpCenter.faq.aboutAccounts"),a("pages.helpCenter.faq.transactionVolume"),a("pages.helpCenter.faq.transferFunds"),a("pages.helpCenter.faq.whatAreFutures"),a("pages.helpCenter.faq.convertedAmountChanges"),a("pages.helpCenter.faq.realNameAuthentication"),a("pages.helpCenter.faq.frozenAssets"),a("pages.helpCenter.faq.futuresTradingRules")];return e.jsxs("div",{className:"helpcenter-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(n,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:a("pages.helpCenter.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"helpcenter-content",children:i.map((r,t)=>e.jsx(n,{to:`/support/details/${t+1}`,className:" remove_blue",children:e.jsxs("div",{className:"faq-item",children:[e.jsx("div",{className:"faq-icon",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"faq-text",children:r})]},t)},t))})}),e.jsx("style",{children:`
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

        .helpcenter-container {
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
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .helpcenter-content {
          width: 100%;
        }

        .faq-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .faq-item:hover {
          background-color: rgba(16, 108, 245, 0.05);
        }

        .faq-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          color: #106cf5;
          font-size: 12px;
          flex-shrink: 0;
        }

        .faq-text {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: #222;
          line-height: 1.4;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .helpcenter-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .faq-item {
            padding: 10px 0;
          }

          .faq-text {
            font-size: 13px;
          }

          .faq-icon {
            width: 20px;
            height: 20px;
            font-size: 10px;
            margin-right: 10px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .helpcenter-content {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `})]})}export{o as default};

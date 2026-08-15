import{j as o,L as e,n as i}from"./index-f19108a0.js";function s(){return o.jsxs("div",{className:"typepassword-container",children:[o.jsx("div",{className:"header",children:o.jsxs("div",{className:"nav-bar",children:[o.jsx(e,{to:"/profile",className:"back-arrow",children:o.jsx("i",{className:"fas fa-arrow-left"})}),o.jsx("div",{className:"page-title",children:i("pages.passwordType.title")})]})}),o.jsx("div",{className:"content-card",children:o.jsxs("div",{className:"password-options",children:[o.jsx(e,{to:"/loginpassword",className:"password-option remove_blue",children:o.jsxs("div",{className:"option-content-wrapper",children:[o.jsx("div",{className:"option-icon",children:o.jsx("div",{className:"icon-circle",children:o.jsx("i",{className:"fas fa-key"})})}),o.jsx("div",{className:"option-content",children:o.jsx("div",{className:"option-title",children:i("pages.passwordType.options.login.title")})}),o.jsx("div",{className:"option-arrow",children:o.jsx("i",{className:"fas fa-chevron-right"})})]})}),o.jsx(e,{to:"/withdrawPassword",className:"password-option remove_blue",children:o.jsxs("div",{className:"option-content-wrapper",children:[o.jsx("div",{className:"option-icon",children:o.jsx("div",{className:"icon-circle",children:o.jsx("i",{className:"fas fa-lock"})})}),o.jsx("div",{className:"option-content",children:o.jsx("div",{className:"option-title",children:i("pages.passwordType.options.withdrawal.title")})}),o.jsx("div",{className:"option-arrow",children:o.jsx("i",{className:"fas fa-chevron-right"})})]})})]})}),o.jsx("style",{children:`
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

        .typepassword-container {
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
          font-size: 18px;
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

        .password-options {
          margin-bottom: 30px;
        }

        .password-option {
          display: block;
          text-decoration: none;
          color: inherit;
          margin-bottom: 16px;
        }

        .password-option:last-child {
          margin-bottom: 0;
        }

        .option-content-wrapper {
          display: flex;
          align-items: center;
          padding: 12px;
          border: 1px solid #e7eaee;
          border-radius: 7px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .password-option:hover .option-content-wrapper {
          transform: translateY(-2px);
          border-color: #106cf5;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        .option-icon {
          margin-right: 16px;
          flex-shrink: 0;
        }

        .icon-circle {
  
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .password-option:nth-child(1) .icon-circle {
          color: #37b66a;
        }

        .password-option:nth-child(2) .icon-circle {
          color: #106cf5;
        }

        .option-content {
          flex: 1;
        }

        .option-title {
          font-size: 15px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .option-desc {
          font-size: 14px;
          color: #888f99;
          line-height: 1.3;
        }

        .option-arrow {
          color: #ccc;
          font-size: 14px;
          margin-left: 12px;
          transition: transform 0.3s ease;
        }

        .password-option:hover .option-arrow {
          color: #106cf5;
          transform: translateX(3px);
        }

        /* Animations */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 108, 245, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 108, 245, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 108, 245, 0);
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .typepassword-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .option-content-wrapper {
            padding: 8px;
          }

          .icon-circle {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .option-title {
            font-size: 15px;
          }

          .option-desc {
            font-size: 13px;
          }
        }
      `})]})}export{s as default};

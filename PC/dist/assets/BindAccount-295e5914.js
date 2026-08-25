import{n as e,H as r,o as a}from"./index-3ac739b4.js";function n(){return e.jsxs("div",{className:"bind-account-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(r,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:a("pages.bindAccount.title")})]})}),e.jsxs("div",{className:"content-card",children:[e.jsx("h1",{className:"section-title",children:a("pages.bindAccount.currentBankTitle")}),e.jsx(r,{to:"/bank_details",className:"card-link",children:e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-left",children:[e.jsx("div",{className:"icon-circle",children:e.jsx("i",{className:"fas fa-university"})}),e.jsx("span",{className:"card-label",children:a("pages.bindAccount.bank")})]}),e.jsx("div",{className:"card-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
        }

        .bind-account-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Header */
        .header {
          min-height: 60px;
          padding: 20px;
          position: relative;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
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

        /* Content Card */
        .content-card {
          flex: 1;
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Section Titles */
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #222;
          margin-bottom: 20px;
        }
        .section-subtitle {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin: 32px 0 20px 0;
        }

        /* Card Links */
        .card-link {
          text-decoration: none;
          display: block;
        }

        /* Card */
        .card {
          background-color: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 9px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          margin-bottom: 16px;
        }
        .card:hover {
          border-color: #106cf5;
          background: #f0f7ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.1);
        }

        /* Card Left Section */
        .card-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Icon Circle */
        .icon-circle {
          width: 40px;
          height: 40px;
          background-color: #e6f0ff;
          border: 1px solid #106cf5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #106cf5;
          font-size: 18px;
        }

        /* Card Label */
        .card-label {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        /* Popular Badge */
        .popular-badge {
          background-color: #106cf5;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 20px;
          margin-left: 8px;
          text-transform: uppercase;
        }

        /* Arrow */
        .card-arrow {
          color: #999;
          font-size: 16px;
          transition: color 0.2s, transform 0.2s;
        }
        .card:hover .card-arrow {
          color: #106cf5;
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }
          .card {
            padding: 12px 14px;
          }
          .icon-circle {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
          .card-label {
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }
        }
      `})]})}export{n as default};

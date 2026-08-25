import{G as l,aM as p,u as f,p as u,j as o,q as x,n as e,o as t,H as g}from"./index-3ac739b4.js";import{u as h}from"./useDispatch-0fb9c073.js";function y(){var r;const a=l(),c=p(),i=h(),s=f(u.selectKycStatus);o.useEffect(()=>{i(x.doFetch())},[i]);const n=((r=c.state)==null?void 0:r.from)||"/";o.useEffect(()=>{s==="success"&&a.replace(n)},[s,a,n]);const d=()=>{switch(s){case"pending":return e.jsxs("div",{className:"status-content",children:[e.jsx("div",{className:"status-icon-wrapper pending",children:e.jsx("i",{className:"fas fa-clock"})}),e.jsx("h2",{className:"status-title",children:t("pages.kycStatus.pending.title")}),e.jsx("p",{className:"status-message",children:t("pages.kycStatus.pending.message")}),e.jsxs("div",{className:"status-note",children:[e.jsx("i",{className:"fas fa-info-circle"}),e.jsx("span",{children:t("pages.kycStatus.pending.note")})]})]});case"unverified":default:return e.jsxs("div",{className:"status-content",children:[e.jsx("div",{className:"status-icon-wrapper unverified",children:e.jsx("i",{className:"fas fa-exclamation-triangle"})}),e.jsx("h2",{className:"status-title",children:t("pages.kycStatus.unverified.title")}),e.jsx("p",{className:"status-message",children:t("pages.kycStatus.unverified.message")}),e.jsxs("div",{className:"status-features",children:[e.jsx("h3",{children:t("pages.kycStatus.unverified.featuresTitle")}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-shield-alt"}),e.jsx("span",{children:t("pages.kycStatus.unverified.features.password")})]}),e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-file-alt"}),e.jsx("span",{children:t("pages.kycStatus.unverified.features.withdrawal")})]}),e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-arrow-down"}),e.jsx("span",{children:t("pages.kycStatus.unverified.features.deposit")})]}),e.jsxs("li",{children:[e.jsx("i",{className:"fas fa-arrow-up"}),e.jsx("span",{children:t("pages.kycStatus.unverified.features.withdraw")})]})]})]}),e.jsx(g,{to:"/proof",className:"verify-button",children:t("pages.kycStatus.unverified.verifyNow")})]});case"success":return null}};return e.jsxs("div",{className:"kyc-status-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("button",{className:"back-arrow",onClick:()=>a.goBack(),type:"button",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:s==="pending"?t("pages.kycStatus.pending.title"):t("pages.kycStatus.unverified.title")})]})}),e.jsx("div",{className:"content-card",children:d()}),e.jsx("style",{children:`
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

        .kyc-status-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header */
        .header {
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
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          font-weight: 300;
          cursor: pointer;
          transition: opacity 0.3s ease;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
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
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Status Content */
        .status-content {
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Icon Styles */
        .status-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 16px;
        }

        .status-icon-wrapper.pending {
          background-color: #e6f0ff;
          color: #106cf5;
          border: 2px solid #106cf5;
        }

        .status-icon-wrapper.unverified {
          background-color: #fef3e9;
          color: #ff7a00;
          border: 2px solid #ff7a00;
        }

        .status-icon-wrapper.success {
          background-color: #e6ffe6;
          color: #39FF14;
          border: 2px solid #39FF14;
        }

        /* Title and Message */
        .status-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #222;
        }

        .status-message {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
          max-width: 340px;
        }

        /* Status Note (used in pending) */
        .status-note {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #106cf5;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
          max-width: 340px;
          text-align: left;
        }

        .status-note i {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
          color: #106cf5;
        }

        /* Features List (for unverified) */
        .status-features {
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 24px;
          width: 100%;
          max-width: 340px;
        }

        .status-features h3 {
          font-size: 14px;
          color: #106cf5;
          margin-bottom: 14px;
          text-align: left;
        }

        .status-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .status-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #e7eaee;
          font-size: 13px;
          color: #333;
        }

        .status-features li:last-child {
          border-bottom: none;
        }

        .status-features li i {
          color: #106cf5;
          width: 16px;
          text-align: center;
        }

        /* Verify Button */
        .verify-button {
          width: 100%;
          max-width: 340px;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
        }

        .verify-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .verify-button:active {
          transform: translateY(0);
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .kyc-status-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .status-title {
            font-size: 20px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }
        }
      `})]})}export{y as default};

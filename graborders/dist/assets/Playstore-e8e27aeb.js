import{i as t,u as l,j as e}from"./index-c2732cf2.js";function h(){t.useState(null),t.useState(!1);const[p,i]=t.useState(!1),[c,o]=t.useState(!1);t.useState(!1);const s=l(),r=async()=>{o(!0);try{const n="https://trade-IC Markets Global.com/apk/IC Markets Global-exchange.apk",a=document.createElement("a");a.href=n,a.download="IC Markets Global-Exchange-v3.4.2.apk",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout(()=>{o(!1),i(!1)},2e3)}catch(n){console.error("Download failed:",n),o(!1)}},d=()=>{s.goBack()};return e.jsxs("div",{className:"playstore-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("button",{onClick:d,className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Download App"})]})}),e.jsxs("div",{className:"hero-content",children:[e.jsx("h1",{children:"Start trading anytime, anywhere"}),e.jsx("p",{className:"subtitle",children:"Keep up to date with the latest news through our app"}),e.jsx("div",{className:"phone-image-container",children:e.jsx("img",{src:"./images/phone.png",alt:"lC Markets GlobalApp Preview",className:"phone-image"})})]}),e.jsx("div",{className:"download-section",children:e.jsxs("div",{className:"download-content",children:[e.jsx("div",{className:"download-title",children:"Download the installation package"}),e.jsxs("div",{className:"download-buttons",children:[e.jsxs("button",{className:"download-btn ios-btn",onClick:()=>i(!0),children:[e.jsx("i",{className:"fab fa-apple"}),e.jsx("span",{children:"iOS"})]}),e.jsxs("button",{className:"download-btn android-btn",onClick:r,children:[e.jsx("i",{className:"fab fa-android"}),e.jsx("span",{children:"Android"})]})]})]})}),e.jsx("style",{children:`
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

        .playstore-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background-image: url('./images/download.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding-bottom: 120px; /* Space for fixed download section */
        }

        /* Header Section - Matching HelpCenter */
        .header {
          min-height: 60px;
          position: relative;
          padding: 10px;
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
          padding: 5px;
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

        /* Hero Content Section */
        .hero-content {
          padding: 40px 20px 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 140px);
        }

        .hero-content h1 {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 15px;
          line-height: 1.3;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          max-width: 320px;
        }

        .subtitle {
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          margin-bottom: 40px;
          font-weight: 400;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
          max-width: 280px;
        }

        .phone-image-container {
          margin-top: 20px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .phone-image {
          width: 280px;
          height: auto;
          max-width: 100%;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
        }

        /* Fixed Download Section */
        .download-section {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          padding: 20px;
          box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          max-width: 400px;
          margin: 0 auto;
          border-radius: 25px 25px 0 0;
        }

        .download-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .download-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 20px;
          text-align: center;
        }

        .download-buttons {
          display: flex;
          gap: 15px;
          width: 100%;
        }

        .download-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .ios-btn {
          background: linear-gradient(135deg, #0f0f0f 0%, #333333 100%);
          color: white;
        }

        .ios-btn:hover {
          background: linear-gradient(135deg, #333333 0%, #0f0f0f 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .ios-btn:active {
          transform: translateY(-1px);
        }

        .android-btn {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          color: white;
        }

        .android-btn:hover {
          background: linear-gradient(135deg, #0a4fc4 0%, #106cf5 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .android-btn:active {
          transform: translateY(-1px);
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .playstore-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .hero-content {
            padding: 30px 16px;
            min-height: calc(100vh - 120px);
          }

          .hero-content h1 {
            font-size: 24px;
            max-width: 280px;
          }

          .subtitle {
            font-size: 14px;
            max-width: 240px;
          }

          .phone-image {
            width: 240px;
          }

          .download-section {
            padding: 16px;
            border-radius: 20px 20px 0 0;
          }

          .download-buttons {
            flex-direction: column;
          }

          .download-btn {
            padding: 14px;
          }
        }

        @media (min-width: 768px) {
          .playstore-container {
            max-width: 400px;
          }

          .download-section {
            max-width: 400px;
          }
        }

        @media (max-height: 700px) {
          .hero-content {
            padding: 30px 20px;
            min-height: calc(100vh - 120px);
          }
          
          .hero-content h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          
          .subtitle {
            font-size: 14px;
            margin-bottom: 25px;
          }
          
          .phone-image {
            width: 220px;
          }
        }
      `})]})}export{h as default};

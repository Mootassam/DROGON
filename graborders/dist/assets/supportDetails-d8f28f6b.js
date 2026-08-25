import{ak as c,i as a,n as e,j as t,L as h}from"./index-82128ca2.js";function u(){const{id:i}=c(),[s,r]=a.useState(""),[o,l]=a.useState(""),p=[{id:"1",question:e("pages.helpCenter.faq.aboutAccounts"),answer:e("pages.helpCenterDetail.answers.aboutAccounts")},{id:"2",question:e("pages.helpCenter.faq.transactionVolume"),answer:e("pages.helpCenterDetail.answers.transactionVolume")},{id:"3",question:e("pages.helpCenter.faq.transferFunds"),answer:e("pages.helpCenterDetail.answers.transferFunds")},{id:"4",question:e("pages.helpCenter.faq.whatAreFutures"),answer:e("pages.helpCenterDetail.answers.whatAreFutures")},{id:"5",question:e("pages.helpCenter.faq.convertedAmountChanges"),answer:e("pages.helpCenterDetail.answers.convertedAmountChanges")},{id:"6",question:e("pages.helpCenter.faq.realNameAuthentication"),answer:e("pages.helpCenterDetail.answers.realNameAuthentication")},{id:"7",question:e("pages.helpCenter.faq.frozenAssets"),answer:e("pages.helpCenterDetail.answers.frozenAssets")},{id:"8",question:e("pages.helpCenter.faq.futuresTradingRules"),answer:e("pages.helpCenterDetail.answers.futuresTradingRules")},{id:"9",question:e("pages.helpCenterDetail.questions.aiQuantification"),answer:e("pages.helpCenterDetail.answers.aiQuantification")},{id:"10",question:e("pages.helpCenterDetail.questions.exploreNFTs"),answer:e("pages.helpCenterDetail.answers.exploreNFTs")},{id:"11",question:e("pages.helpCenterDetail.questions.bitcoinEnergy"),answer:e("pages.helpCenterDetail.answers.bitcoinEnergy")},{id:"12",question:e("pages.helpCenterDetail.questions.bitcoinRecordPrice"),answer:e("pages.helpCenterDetail.answers.bitcoinRecordPrice")},{id:"13",question:e("pages.helpCenterDetail.questions.trumpStatueBitcoin"),answer:e("pages.helpCenterDetail.answers.trumpStatueBitcoin")}];return a.useEffect(()=>{const n=p.find(d=>d.id===i);n?(r(n.question),l(n.answer)):console.log(e("pages.helpCenterDetail.faqNotFound"))},[i]),t.jsxs("div",{className:"helpcenterdetail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(h,{to:"/support",className:"back-arrow",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsx("div",{className:"page-title",children:e("pages.helpCenter.title")})]})}),t.jsx("div",{className:"content-card",children:t.jsx("div",{className:"helpcenterdetail-content",children:s&&t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"question-title",children:s}),t.jsx("div",{className:"divider-line"}),t.jsx("div",{className:"answer-content",children:o})]})})}),t.jsx("style",{children:`
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

        .helpcenterdetail-container {
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

        .helpcenterdetail-content {
          width: 100%;
        }

        .question-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          line-height: 1.4;
          margin-bottom: 16px;
          padding-bottom: 12px;
          white-space: pre-line;
        }

        .divider-line {
          height: 1px;
          background-color: #e7eaee;
          margin-bottom: 16px;
          width: 100%;
        }

        .answer-content {
          font-size: 13px;
          color: #555;
          line-height: 1.6;
          white-space: pre-line;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .helpcenterdetail-container {
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

          .question-title {
            font-size: 15px;
            margin-bottom: 12px;
            padding-bottom: 10px;
          }

          .answer-content {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .helpcenterdetail-content {
            max-width: 600px;
            margin: 0 auto;
          }

          .question-title {
            font-size: 17px;
          }

          .answer-content {
            font-size: 13px;
          }
        }
      `})]})}export{u as default};

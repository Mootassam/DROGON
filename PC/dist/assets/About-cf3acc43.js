import{u as c,ar as d,j as r,n as a,H as p,as as m}from"./index-3ac739b4.js";import{L as x}from"./LoadingModal-24c18306.js";import{u as h}from"./useDispatch-0fb9c073.js";function b(){var i,n,s;const o=h(),e=c(d.selectRows),t=c(d.selectLoading),l=()=>{o(m.doFetch())};return r.useEffect(()=>{l()},[o]),a.jsxs("div",{className:"about-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(p,{to:"/profile",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:"About Us"})]})}),a.jsx("div",{className:"content-card",children:a.jsxs("div",{className:"about-content",children:[t&&a.jsx("div",{className:"loading-container",children:a.jsx(x,{})}),!t&&e&&((i=e[0])==null?void 0:i.companydetails)&&a.jsx("div",{className:"company-details",dangerouslySetInnerHTML:{__html:(n=e[0])==null?void 0:n.companydetails}}),!t&&(!e||e.length===0||!((s=e[0])!=null&&s.companydetails))&&a.jsxs("div",{className:"no-data-message",children:[a.jsx("i",{className:"fas fa-info-circle"}),a.jsx("p",{children:"No company information available at the moment."})]})]})}),a.jsx("style",{children:`
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

        .about-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
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
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .about-content {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .company-details {
          font-size: 14px;
          color: #333;
          line-height: 1.6;
          white-space: pre-line;
        }

        .company-details h1,
        .company-details h2,
        .company-details h3,
        .company-details h4,
        .company-details h5,
        .company-details h6 {
          color: #222;
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .company-details h1 {
          font-size: 20px;
        }

        .company-details h2 {
          font-size: 18px;
        }

        .company-details h3 {
          font-size: 16px;
        }

        .company-details p {
          margin-bottom: 15px;
          color: #555;
        }

        .company-details ul,
        .company-details ol {
          padding-left: 20px;
          margin-bottom: 15px;
        }

        .company-details li {
          margin-bottom: 5px;
          color: #555;
        }

        .company-details strong,
        .company-details b {
          color: #222;
          font-weight: 600;
        }

        .company-details a {
          color: #106cf5;
          text-decoration: none;
        }

        .company-details a:hover {
          text-decoration: underline;
        }

        .company-details img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 10px 0;
        }

        .company-details table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }

        .company-details th,
        .company-details td {
          border: 1px solid #e7eaee;
          padding: 8px;
          text-align: left;
        }

        .company-details th {
          background-color: #f8f9fa;
          font-weight: 600;
        }

        .no-data-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          text-align: center;
          color: #888f99;
        }

        .no-data-message i {
          font-size: 48px;
          color: #e7eaee;
          margin-bottom: 16px;
        }

        .no-data-message p {
          font-size: 14px;
          max-width: 250px;
          line-height: 1.4;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .about-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .company-details {
            font-size: 13px;
          }

          .company-details h1 {
            font-size: 18px;
          }

          .company-details h2 {
            font-size: 16px;
          }

          .company-details h3 {
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .company-details {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `})]})}export{b as default};

import{j as t,L as n,n as a,w as r}from"./index-3c74c896.js";import{u as i}from"./useDispatch-c7234b1e.js";function l(){const o=i(),e=()=>{o(r.doSignout())};return t.jsxs("div",{className:"empty__page",children:[t.jsx("style",{children:`
        .empty__page {
          background-color: #0f0f0f;
          color: #FFFFFF;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .imgEle {
          width: 150px;
          height: 150px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          margin-bottom: 30px;
          opacity: 0.8;
        }
        
        .empty__text {
          text-align: center;
          max-width: 500px;
          background-color: #1A1A1A;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .empty__text h3 {
          color: #F3BA2F;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        
        .empty__text p {
          color: #AAAAAA;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .support-button {
          background-color: #F3BA2F;
          color: #0f0f0f;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 160px;
        }
        
        .support-button:hover {
          background-color: #e0ab29;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.3);
        }
        
        .logout-button {
          background-color: transparent;
          color: #F3BA2F;
          border: 2px solid #F3BA2F;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 160px;
        }
        
        .logout-button:hover {
          background-color: rgba(243, 186, 47, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 186, 47, 0.2);
        }
        
        .contact-info {
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid #2A2A2A;
        }
        
        .contact-info p {
          color: #777777;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .email-link {
          color: #F3BA2F;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        
        .email-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .empty__text {
            padding: 30px 20px;
            margin: 0 15px;
          }
          
          .empty__text h3 {
            font-size: 18px;
          }
          
          .button-group {
            flex-direction: column;
            align-items: center;
          }
          
          .support-button,
          .logout-button {
            width: 100%;
            max-width: 280px;
          }
        }
      `}),t.jsxs("div",{className:"empty__text",children:[t.jsx("h3",{children:"ACCOUNT SUSPENDED"}),t.jsx("p",{children:"Your account has been temporarily suspended due to violation of our Terms of Service. Please contact our customer support team to resolve this issue and restore your account access."}),t.jsx("p",{children:"We've also sent detailed information to your registered email address. Please check your inbox and spam folder for updates regarding your account status."}),t.jsxs("div",{className:"button-group",children:[t.jsx(n,{className:"support-button remove_blue",to:"/LiveChat",children:"CONTACT SUPPORT"}),t.jsx("button",{className:"logout-button",type:"button",onClick:e,children:a("auth.signout")})]}),t.jsxs("div",{className:"contact-info",children:[t.jsx("p",{children:"Need immediate assistance?"}),t.jsxs("p",{children:["Email us at:"," ",t.jsx("a",{href:"mailto:IC Markets Global.helpdesk01@gmail.com",className:"email-link",children:"IC Markets Global.helpdesk01@gmail.com"})]})]})]})]})}export{l as default};

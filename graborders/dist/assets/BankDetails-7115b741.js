import{W as u,n as a,o as b,p as h,i as g,w as N,j as e,L as w,V as j}from"./index-f19108a0.js";import{u as v,y as k,F as y}from"./FormErrors-adcd902b.js";import{y as s}from"./yupFormSchemas-fd7641cb.js";import{I as i}from"./InputFormItem-4e60ebb9.js";import{u as C}from"./useDispatch-a803e736.js";const z=u().shape({accountHolder:s.string(a("entities.transaction.fields.accountHolder"),{required:!0}),ibanNumber:s.string(a("entities.transaction.fields.ibanNumber"),{required:!0}),bankName:s.string(a("entities.transaction.fields.bankName"),{required:!0}),ifscCode:s.string(a("entities.transaction.fields.ifscCode"),{required:!0})});function I(){const t=b(h.selectCurrentUser),n=C(),r=g.useCallback(async()=>{await n(N.doRefreshCurrentUser())},[n]),l=async({accountHolder:c,ibanNumber:m,bankName:p,ifscCode:f})=>{const x={accountHolder:c,ibanNumber:m,bankName:p,ifscCode:f};await n(j.doUpdateBank(x)),await r()},d={accountHolder:(t==null?void 0:t.accountHolder)||"",ibanNumber:(t==null?void 0:t.ibanNumber)||"",bankName:(t==null?void 0:t.bankName)||"",ifscCode:(t==null?void 0:t.ifscCode)||""},o=v({resolver:k.yupResolver(z),mode:"onSubmit",defaultValues:d});return e.jsxs("div",{className:"bank-details-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(w,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:a("pages.bankDetails.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsx(y,{...o,children:e.jsx("form",{onSubmit:o.handleSubmit(l),children:e.jsxs("div",{className:"bank-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.accountHolder")]}),e.jsx(i,{type:"text",name:"accountHolder",placeholder:a("entities.transaction.fields.accountHolder"),className:"form-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.ibanNumber")]}),e.jsx(i,{type:"text",name:"ibanNumber",placeholder:a("entities.transaction.fields.ibanNumber"),className:"form-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.bankName")]}),e.jsx(i,{type:"text",name:"bankName",placeholder:a("entities.transaction.fields.bankName"),className:"form-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:[e.jsx("span",{className:"required-star",children:"*"}),a("entities.transaction.fields.ifscCode")]}),e.jsx(i,{type:"text",name:"ifscCode",placeholder:a("entities.transaction.fields.ifscCode"),className:"form-input"})]}),e.jsxs("button",{type:"submit",className:"save-button",children:[e.jsx("i",{className:"fas fa-check",style:{marginRight:"8px"}}),a("pages.withdraw.confirm")]})]})})})}),e.jsx("style",{children:`
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

        .bank-details-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header – identical to LoginPassword */
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

        /* Content Card – identical to LoginPassword */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Form wrapper */
        .bank-form {
          width: 100%;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 16px;
          width: 100%;
        }

        /* Label – identical to LoginPassword’s .form-label */
        .form-label {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .required-star {
          color: #f44336;
          font-size: 12px;   /* same size as label, not bigger */
          margin-right: 2px;
        }

        /* Input – identical to LoginPassword’s .form-input */
        .form-input {
          width: 100%;
          padding: 8px 12px;
          font-size: 12px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          color: #333;
          height: 40px;
        }

        .form-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .form-input::placeholder {
          color: #aaa;
          font-size: 12px;
        }

        /* Submit button – identical to LoginPassword’s .save-button */
        .save-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-button:hover {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .save-button:active {
          transform: translateY(0);
        }

        /* Error styling (if InputFormItem adds an error class) */
        .form-input.error {
          border-color: #f44336;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
        }

        /* Responsive adjustments – identical to LoginPassword */
        @media (max-width: 380px) {
          .bank-details-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .form-input {
            padding: 6px 10px;
            height: 38px;
            font-size: 11px;
          }

          .save-button {
            padding: 10px;
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}export{I as default};

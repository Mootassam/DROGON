import{j as t,o,n as e,H as g}from"./index-ec312a38.js";import S from"./Currency-0989b471.js";import{I as z}from"./I18nSelect-deb746a2.js";import{u as M}from"./useDispatch-1ec0682b.js";import"./layoutActions-d5a44a8b.js";const I=()=>{const a=localStorage.getItem("selectedCurrency");return a?JSON.parse(a):{code:"USD",symbol:"$"}},R=a=>{localStorage.setItem("selectedCurrency",JSON.stringify(a))},O=()=>localStorage.getItem("candlestickColorScheme")||"green-rise-red-fall",F=a=>{localStorage.setItem("candlestickColorScheme",a)},U={USD:"$",EUR:"€",GBP:"£",JPY:"¥",CNY:"¥",AUD:"A$",CAD:"C$",CHF:"CHF",HKD:"HK$",SGD:"S$"};function B(){M();const[a,r]=t.useState(!1),[h,c]=t.useState(!1),[f,l]=t.useState(!1),[n,b]=t.useState(()=>I()),[i,u]=t.useState(()=>O()),v=t.useMemo(()=>`${n.code} [${n.symbol}]`,[n]),j=t.useMemo(()=>i==="green-rise-red-fall"?o("pages.settings.colorSchemes.greenRiseRedFall.name"):o("pages.settings.colorSchemes.redRiseGreenFall.name"),[i]),N=s=>{const x={code:s.code,symbol:s.symbol||U[s.code]||s.code};R(x),b(x),r(!1)},d=s=>{F(s),u(s),l(!1)},w=()=>{r(!0)},y=()=>{r(!1)},C=()=>{c(!0)},p=()=>{c(!1)},k=()=>{l(!0)},m=()=>{l(!1)};return e.jsxs("div",{className:"settings-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(g,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:o("pages.settings.title")})]})}),e.jsx("div",{className:"content-card",children:e.jsxs("div",{className:"settings-options",children:[e.jsx("div",{className:"settings-option remove_blue",onClick:C,children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-language"})}),e.jsx("div",{className:"option-content",children:e.jsx("div",{className:"option-title",children:o("pages.settings.language")})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx("div",{className:"settings-option remove_blue",onClick:w,children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-dollar-sign"})}),e.jsx("div",{className:"option-content",children:e.jsxs("div",{className:"option-title",children:[o("pages.settings.quotationCurrency")," ",v]})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx("div",{className:"settings-option remove_blue",onClick:k,children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-palette"})}),e.jsx("div",{className:"option-content",children:e.jsxs("div",{className:"option-title",children:[o("pages.settings.colorConfiguration"),e.jsxs("span",{className:"color-scheme-name",children:[" (",j,")"]})]})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx(g,{to:"/about",className:"settings-option remove_blue",children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-info-circle"})}),e.jsx("div",{className:"option-content",children:e.jsx("div",{className:"option-title",children:o("pages.settings.aboutUs")})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx("div",{className:"settings-option version-option",children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-code-branch"})}),e.jsx("div",{className:"option-content",children:e.jsxs("div",{className:"option-title",children:[o("pages.settings.versionNumber")," 1.0.0"]})})]})})]})}),e.jsx(S,{isOpen:a,onClose:y,selectedCurrency:n,onSelectCurrency:N}),h&&e.jsx("div",{className:"modal-overlay",onClick:p,children:e.jsxs("div",{className:"modal-container-bottom",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:o("pages.settings.modals.language.title")}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:p,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(z,{isInModal:!0})})]})}),f&&e.jsx("div",{className:"modal-overlay",onClick:m,children:e.jsxs("div",{className:"modal-container",onClick:s=>s.stopPropagation(),children:[e.jsx("div",{className:"modal-header",children:e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:o("pages.settings.modals.colorConfiguration.title")}),e.jsx("button",{className:"modal-close-btn",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]})}),e.jsx("div",{className:"modal-content",children:e.jsxs("div",{className:"color-scheme-options",children:[e.jsxs("div",{className:`color-scheme-card ${i==="green-rise-red-fall"?"selected":""}`,onClick:()=>d("green-rise-red-fall"),children:[e.jsx("div",{className:"color-scheme-preview",children:e.jsx("div",{className:"scheme-image",children:e.jsx("img",{src:"/images/settings/s1.png",alt:o("pages.settings.colorSchemes.greenRiseRedFall.alt")})})}),e.jsxs("div",{className:"color-scheme-info",children:[e.jsx("div",{className:"scheme-name",children:o("pages.settings.colorSchemes.greenRiseRedFall.name")}),i==="green-rise-red-fall"&&e.jsxs("div",{className:"selected-indicator",children:[e.jsx("i",{className:"fas fa-check-circle"})," ",o("pages.settings.selected")]})]})]}),e.jsxs("div",{className:`color-scheme-card ${i==="red-rise-green-fall"?"selected":""}`,onClick:()=>d("red-rise-green-fall"),children:[e.jsx("div",{className:"color-scheme-preview",children:e.jsx("div",{className:"scheme-image",children:e.jsx("img",{src:"/images/settings/s2.png",alt:o("pages.settings.colorSchemes.redRiseGreenFall.alt")})})}),e.jsxs("div",{className:"color-scheme-info",children:[e.jsx("div",{className:"scheme-name",children:o("pages.settings.colorSchemes.redRiseGreenFall.name")}),i==="red-rise-green-fall"&&e.jsxs("div",{className:"selected-indicator",children:[e.jsx("i",{className:"fas fa-check-circle"})," ",o("pages.settings.selected")]})]})]})]})})]})}),e.jsx("style",{children:`
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

        .settings-container {
          
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
          display: flex;
          flex-direction: column;
        }

        .settings-options {
          flex: 1;
        }

        .settings-option {
          display: block;
          text-decoration: none;
          color: inherit;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .settings-option:last-child {
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
          background: #fff;
        }

        .settings-option:hover .option-content-wrapper {
          transform: translateY(-2px);
          border-color: #106cf5;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        .version-option .option-content-wrapper {
          cursor: default;
        }

        .version-option:hover .option-content-wrapper {
          transform: none;
          border-color: #e7eaee;
          box-shadow: none;
        }

        .option-icon {
          margin-right: 16px;
          font-size: 18px;
          color: #666;
          width: 24px;
          text-align: center;
        }

        .option-content {
          flex: 1;
        }

        .option-title {
          font-size: 14px;
          font-weight: 500;
          color: #222;
        }

        .color-scheme-name {
          font-size: 12px;
          color: #666;
          font-weight: 400;
        }

        .option-arrow {
          color: #ccc;
          font-size: 12px;
          margin-left: 12px;
          transition: transform 0.3s ease;
        }

        .settings-option:hover .option-arrow {
          color: #106cf5;
          transform: translateX(3px);
        }

        /* Sign Out Button */
        .signout-section {
          margin-top: 30px;
          padding: 20px 0;
          border-top: 1px solid #e7eaee;
        }

        .signout-button {
          width: 100%;
          padding: 12px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 7px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .signout-button:hover {
          background: #d32f2f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
        }

        .signout-button:active {
          transform: translateY(0);
        }

        /* Color Configuration Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          background: white;
          border-radius: 20px;
          width: 90%;
          
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 20px 20px 15px 20px;
          border-bottom: 1px solid #eef2f7;
          position: relative;
        }

        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #222;
        }

        .modal-close-btn {
          background: #f5f7fa;
          border: none;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #eef2f7;
          color: #333;
        }

        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          max-height: calc(85vh - 80px);
        }

        .color-scheme-options {
          display: flex;
          gap: 10px;
        }

        .color-scheme-card {
          border: 2px solid #e7eaee;
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
        }

        .color-scheme-card:hover {
          transform: translateY(-4px);
          border-color: #106cf5;
          box-shadow: 0 8px 24px rgba(16, 108, 245, 0.15);
        }

        .color-scheme-card.selected {
          border-color: #106cf5;
          background: linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
          box-shadow: 0 8px 24px rgba(16, 108, 245, 0.1);
        }

        .color-scheme-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .candlestick-preview {
          display: flex;
          gap: 24px;
          align-items: flex-end;
          height: 80px;
        }

        .candle {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 30px;
        }

        .candle.bullish .candle-body {
          width: 30px;
          height: 50px;
          background: #10b981;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .candle.bearish .candle-body {
          width: 30px;
          height: 30px;
          background: #ef4444;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .candle.bullish.inverse .candle-body {
          background: #ef4444;
        }

        .candle.bearish.inverse .candle-body {
          background: #10b981;
        }

        .candle-wick {
          width: 2px;
          height: 20px;
          background: #374151;
        }

        .candle.bullish .candle-wick {
          height: 30px;
        }

        .scheme-image {
          width: 80px;
          height: 80px;
          background: #f5f7fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 12px;
        }

        .scheme-image img {
          width: 32%;
          object-fit: cover;
          border-radius: 12px;
        }

        .color-scheme-info {
          text-align: center;
        }

        .scheme-name {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .scheme-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .selected-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #106cf5;
          font-weight: 500;
          padding: 6px 12px;
          background: rgba(16, 108, 245, 0.1);
          border-radius: 20px;
        }

        .selected-indicator i {
          font-size: 16px;
        }

        /* Existing Modal Styles for Language */
        .modal-container-bottom {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
          animation: slideUpFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .modal-header-bottom {
          padding: 16px 20px 8px 20px;
          border-bottom: 1px solid #eef2f7;
          position: relative;
        }

        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }

        .modal-close-btn-bottom {
          background: #f5f7fa;
          border: none;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .modal-content-bottom {
          flex: 1;
          overflow-y: auto;
          padding: 0;
          max-height: calc(85vh - 100px);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .settings-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
          }

          .option-content-wrapper {
            padding: 10px;
          }

          .option-icon {
            font-size: 16px;
            margin-right: 12px;
          }

          .option-title {
            font-size: 13px;
          }

          .color-scheme-name {
            font-size: 11px;
          }

          .signout-button {
            padding: 10px;
            font-size: 13px;
          }

          .modal-container {
            width: 95%;
            border-radius: 16px;
          }

          .modal-header {
            padding: 16px;
          }

          .modal-title {
            font-size: 16px;
          }

          .modal-content {
            padding: 16px;
          }

          .color-scheme-card {
            padding: 16px;
          }

          .candlestick-preview {
            gap: 16px;
            height: 60px;
          }

          .candle {
            width: 24px;
          }

          .candle-body {
            width: 24px !important;
          }

          .scheme-name {
            font-size: 14px;
          }

          .scheme-description {
            font-size: 12px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}export{B as default};

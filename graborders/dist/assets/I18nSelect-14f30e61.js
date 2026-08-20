import{A as x,i as f,j as a,B as g,C as c,L as m,n as p}from"./index-c2732cf2.js";const s="LAYOUT",o={MENU_TOGGLE:`${s}_MENU_TOGGLE`,MENU_HIDE:`${s}_MENU_HIDE`,MENU_SHOW:`${s}_MENU_SHOW`,MENU_SUBMENU:`${s}_SUBMENU_SHOW`,doChangeLanguage:l=>{x(l),window.location.reload()},doToggleMenu:()=>({type:o.MENU_TOGGLE}),doShowMenu:()=>({type:o.MENU_SHOW}),doHideMenu:()=>({type:o.MENU_HIDE}),dosubMenu:l=>({type:o.MENU_SUBMENU,payload:l})},u=({isInModal:l=!1})=>{const[t,r]=f.useState(null),d=async e=>{r(e);try{await o.doChangeLanguage(e)}finally{setTimeout(()=>{r(null)},300)}};return l?a.jsxs("div",{className:"i18n-modal-content",children:[a.jsx("div",{className:"languages-list-modal",children:g().map(e=>{const n=c()===e.id,i=t===e.id;return a.jsxs("div",{onClick:()=>!i&&d(e.id),className:`language-item-modal ${n?"active":""} ${i?"loading":""}`,children:[a.jsx("div",{className:"language-flag-modal",children:a.jsx("img",{src:e.flag,alt:e.label})}),a.jsxs("div",{className:"language-info-modal",children:[a.jsx("div",{className:"language-name-modal",children:e.label}),a.jsx("div",{className:"language-native-modal",children:e.label})]}),n&&!i&&a.jsx("div",{className:"selected-indicator-modal",children:a.jsx("i",{className:"fas fa-check"})}),i&&a.jsx("div",{className:"loading-indicator-modal",children:a.jsx("i",{className:"fas fa-spinner fa-spin"})})]},e.id)})}),a.jsxs("div",{className:"language-help-modal",children:[a.jsx("i",{className:"fas fa-info-circle"}),a.jsx("span",{children:"Changing the language will affect all text in the application"})]}),a.jsx("style",{children:`
          .i18n-modal-content {
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            color: #333;
          }

          .languages-list-modal {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
            max-height: calc(85vh - 120px);
          }

          /* Scrollbar restyling */
          .languages-list-modal::-webkit-scrollbar {
            width: 4px;
          }
          .languages-list-modal::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 2px;
          }
          .languages-list-modal::-webkit-scrollbar-thumb {
            background: #106cf5;
            border-radius: 2px;
          }
          .languages-list-modal::-webkit-scrollbar-thumb:hover {
            background: #0a4fc4;
          }

          .language-item-modal {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            border-bottom: 1px solid #f0f0f0;
          }
          .language-item-modal:last-child {
            border-bottom: none;
          }
          .language-item-modal:hover {
            background-color: #f5f8ff;
          }
          .language-item-modal.active {
            background-color: #e6f0ff;
          }
          .language-item-modal.loading {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .language-flag-modal {
            width: 32px;
            height: 24px;
            margin-right: 16px;
            border-radius: 3px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            flex-shrink: 0;
          }
          .language-flag-modal img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .language-info-modal {
            flex: 1;
          }
          .language-name-modal {
            font-size: 16px;
            font-weight: 600;
            color: #222;
            margin-bottom: 2px;
          }
          .language-native-modal {
            font-size: 13px;
            color: #666;
            font-weight: 400;
          }

          .selected-indicator-modal {
            color: #106cf5;
            font-size: 16px;
            margin-left: 10px;
            flex-shrink: 0;
            animation: fadeInScale 0.3s ease;
          }
          .loading-indicator-modal {
            color: #106cf5;
            font-size: 16px;
            margin-left: 10px;
            flex-shrink: 0;
          }

          .language-help-modal {
            padding: 16px 20px;
            border-top: 1px solid #e7eaee;
            background-color: #fafbfc;
            display: flex;
            align-items: flex-start;
            gap: 10px;
          }
          .language-help-modal i {
            color: #106cf5;
            font-size: 14px;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .language-help-modal span {
            font-size: 13px;
            color: #555;
            line-height: 1.4;
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @media (max-width: 380px) {
            .language-item-modal {
              padding: 14px 16px;
            }
            .language-flag-modal {
              width: 28px;
              height: 21px;
              margin-right: 12px;
            }
            .language-name-modal {
              font-size: 15px;
            }
            .language-help-modal {
              padding: 14px 16px;
            }
          }
        `})]}):a.jsxs("div",{className:"i18n-container",children:[a.jsx("div",{className:"header",children:a.jsxs("div",{className:"nav-bar",children:[a.jsx(m,{to:"/settings",className:"back-arrow",children:a.jsx("i",{className:"fas fa-arrow-left"})}),a.jsx("div",{className:"page-title",children:p("pages.language.selectLanguage")})]})}),a.jsxs("div",{className:"content-card",children:[a.jsxs("div",{className:"language-intro",children:[a.jsx("div",{className:"language-icon",children:a.jsx("i",{className:"fas fa-language"})}),a.jsx("h2",{children:p("pages.language.choosePreferred")}),a.jsx("p",{children:"Select your preferred language for the application interface"})]}),a.jsx("div",{className:"languages-list",children:g().map(e=>{const n=c()===e.id,i=t===e.id;return a.jsxs("div",{onClick:()=>!i&&d(e.id),className:`language-item ${n?"active":""} ${i?"loading":""}`,children:[a.jsx("div",{className:"language-flag",children:a.jsx("img",{src:e.flag,alt:e.label})}),a.jsxs("div",{className:"language-info",children:[a.jsx("div",{className:"language-name",children:e.label}),a.jsx("div",{className:"language-native",children:e.label})]}),n&&!i&&a.jsx("div",{className:"selected-indicator",children:a.jsx("i",{className:"fas fa-check"})}),i&&a.jsx("div",{className:"loading-indicator",children:a.jsx("i",{className:"fas fa-spinner fa-spin"})})]},e.id)})}),a.jsx("div",{className:"language-help",children:a.jsxs("p",{children:[a.jsx("i",{className:"fas fa-info-circle"}),"Changing the language will affect all text in the application"]})})]}),a.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
        }

        .i18n-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header */
        .header {
          min-height: 60px;
          padding: 20px;
          position: relative;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          display: flex;
          flex-direction: column;
        }

        .language-intro {
          text-align: center;
          margin-bottom: 24px;
          padding: 10px 0;
        }
        .language-icon {
          font-size: 36px;
          color: #106cf5;
          margin-bottom: 12px;
        }
        .language-intro h2 {
          font-size: 20px;
          font-weight: 700;
          color: #222;
          margin-bottom: 6px;
        }
        .language-intro p {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }

        .languages-list {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
        }
        .languages-list::-webkit-scrollbar {
          width: 4px;
        }
        .languages-list::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 2px;
        }
        .languages-list::-webkit-scrollbar-thumb {
          background: #106cf5;
          border-radius: 2px;
        }
        .languages-list::-webkit-scrollbar-thumb:hover {
          background: #0a4fc4;
        }

        .language-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: #f8f9fa;
        }
        .language-item:last-child {
          margin-bottom: 0;
        }
        .language-item:hover {
          border-color: #106cf5;
          background-color: #f0f7ff;
        }
        .language-item.active {
          background-color: #e6f0ff;
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }
        .language-item.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .language-flag {
          width: 40px;
          height: 30px;
          margin-right: 16px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .language-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .language-info {
          flex: 1;
        }
        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }
        .language-native {
          font-size: 14px;
          color: #666;
        }

        .selected-indicator {
          color: #106cf5;
          font-size: 18px;
          animation: fadeInScale 0.3s ease;
        }
        .loading-indicator {
          color: #106cf5;
          font-size: 18px;
        }

        .language-help {
          padding: 16px;
          background-color: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 8px;
        }
        .language-help p {
          font-size: 14px;
          color: #555;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .language-help i {
          color: #106cf5;
          font-size: 16px;
          margin-top: 2px;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
          }
          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }
          .language-icon {
            font-size: 30px;
          }
          .language-intro h2 {
            font-size: 18px;
          }
          .language-item {
            padding: 14px;
          }
          .language-flag {
            width: 36px;
            height: 27px;
            margin-right: 12px;
          }
          .language-name {
            font-size: 15px;
          }
          .language-native {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }
        }
      `})]})};export{u as I};

import{y as r,o as d,p as D,i as m,V as b,j as e,L as I,n as s}from"./index-c2732cf2.js";import{D as C}from"./Dates-75d56815.js";import{u as T}from"./useDispatch-578cdb5c.js";import"./v4-4a60fe23.js";const n=t=>t.user.form,F=r([n],t=>t.user),A=r([n],t=>t.member),E=r([n],t=>t.loading),P=r([n],t=>t.reward),Y=r([n],t=>t.users),G=r([n],t=>t.listLoading),O=r([n],t=>!!t.initLoading),B=r([n],t=>!!t.saveLoading),c={selectInitLoading:O,selectSaveLoading:B,selectUser:F,listMembers:A,loading:E,reward:P,lisUsers:Y,usersLoading:G,selectRaw:n};function H(){const t=T(),o=d(D.selectCurrentUser),l=d(c.listMembers),f=d(c.loading),g=d(c.lisUsers),S=d(c.usersLoading),M=d(c.reward),[L,u]=m.useState(!1),[p,v]=m.useState({title:"",members:[],type:""}),[w,j]=m.useState(!1);m.useEffect(()=>{o!=null&&o.refcode&&(t(b.rewardCount()),t(b.doTree(o.refcode)))},[t,o==null?void 0:o.refcode]);const y=async()=>{if(o!=null&&o.refcode)try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(o.refcode);else{const a=document.createElement("textarea");a.value=o.refcode,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a)}j(!0),setTimeout(()=>j(!1),2e3)}catch(a){console.error("Failed to copy:",a)}},x=a=>{const i=`Join Icmarkets using my referral code: ${o==null?void 0:o.refcode}`,h=window.location.origin;switch(a){case"whatsapp":window.open(`https://wa.me/?text=${encodeURIComponent(i)}`,"_blank");break;case"email":window.open(`mailto:?subject=Join Icmarkets&body=${encodeURIComponent(i)}`,"_blank");break;case"sms":window.open(`sms:?body=${encodeURIComponent(i)}`,"_blank");break;case"more":navigator.share?navigator.share({title:"Icmarkets Referral",text:i,url:h}):y();break}},N=(a,i)=>{const h=`${a}${z(a)} Generation ${i==="approved"?"Approved":"Pending"} Members`;v({title:h,members:[],type:i}),u(!0);const R={status:i,refCode:o==null?void 0:o.refcode,level:a};t(b.byLevel(R))},k=()=>{u(!1),v({title:"",members:[],type:""})},z=a=>a===1?"st":a===2?"nd":a===3?"rd":"th",$=a=>`${a}${z(a)} Generation Members`;return e.jsxs("div",{className:"invitation-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(I,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:s("pages.invitation.title")})]})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"invite-earn-section",children:[e.jsx("div",{className:"section-title",children:s("pages.invitation.earnTogether")}),e.jsx("div",{className:"section-subtitle",children:s("pages.invitation.description")}),e.jsx("div",{className:"referral-label",children:s("pages.invitation.yourReferralCode")}),e.jsxs("div",{className:"referral-code-box",children:[e.jsx("div",{className:"referral-code-value",children:(o==null?void 0:o.refcode)||s("pages.invitation.loading")}),e.jsxs("button",{className:"copy-button",onClick:y,children:[e.jsx("i",{className:"fas fa-copy"}),w?s("pages.invitation.copied"):s("pages.invitation.copyCode")]})]}),e.jsxs("div",{className:"share-section",children:[e.jsx("div",{className:"share-label",children:"Share via"}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("div",{className:"share-button",onClick:()=>x("whatsapp"),children:e.jsx("i",{className:"fab fa-whatsapp"})}),e.jsx("div",{className:"share-button",onClick:()=>x("email"),children:e.jsx("i",{className:"fas fa-envelope"})}),e.jsx("div",{className:"share-button",onClick:()=>x("sms"),children:e.jsx("i",{className:"fas fa-sms"})}),e.jsx("div",{className:"share-button",onClick:()=>x("more"),children:e.jsx("i",{className:"fas fa-share-alt"})})]})]})]}),e.jsx("div",{className:"rewards-section",children:e.jsxs("div",{className:"rewards-card",children:[e.jsx("div",{className:"rewards-label",children:s("pages.invitation.totalEarned")}),e.jsxs("div",{className:"rewards-amount",children:[M.toFixed(0)," USD"]}),e.jsx("div",{className:"rewards-subtitle",children:s("pages.invitation.allTimeCommission")})]})}),e.jsxs("div",{className:"generation-section",children:[e.jsx("div",{className:"section-title",children:s("pages.invitation.generationMembers")}),e.jsxs("div",{className:"generation-stats",children:[f&&e.jsxs("div",{className:"loading-state",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("span",{children:s("pages.invitation.loading")})]}),!f&&(l==null?void 0:l.length)===0&&e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:s("pages.invitation.noGenerationData")})]}),!f&&(l==null?void 0:l.map((a,i)=>e.jsxs("div",{className:"generation-item",children:[e.jsxs("div",{className:"generation-header",children:[e.jsx("i",{className:"fas fa-crown"}),e.jsx("span",{children:$(a==null?void 0:a.level)})]}),e.jsxs("div",{className:"generation-stats-row",children:[e.jsxs("div",{className:"stat-box approved",onClick:()=>N(a.level,"approved"),children:[e.jsx("div",{className:"stat-value",children:(a==null?void 0:a.approvedCount)||0}),e.jsx("div",{className:"stat-label",children:s("pages.invitation.approvedMembers")})]}),e.jsxs("div",{className:"stat-box pending",onClick:()=>N(a.level,"pending"),children:[e.jsx("div",{className:"stat-value",children:(a==null?void 0:a.pendingCount)||0}),e.jsx("div",{className:"stat-label",children:s("pages.invitation.pendingMembers")})]})]})]},i)))]})]})]}),w&&e.jsxs("div",{className:"toast-notification",children:[e.jsx("i",{className:"fas fa-check-circle"}),s("pages.invitation.referralCopied")]}),L&&e.jsx("div",{className:"modal-overlay",onClick:k,children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{className:"modal-title",children:p.title}),e.jsx("button",{className:"modal-close-btn",onClick:k,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("div",{className:"modal-body",children:S?e.jsxs("div",{className:"modal-loading",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),e.jsx("p",{children:s("pages.invitation.loadingMembers")})]}):g&&g.length>0?e.jsx("ul",{className:"members-list",children:g.map((a,i)=>e.jsxs("li",{className:"member-item",children:[e.jsxs("div",{className:"member-info",children:[e.jsx("div",{className:"member-email",children:a.email}),e.jsx("div",{className:"member-date",children:p.type==="approved"?`${s("pages.invitation.approved")}: ${C.formatDateTime(a.updatedAt||a.createdAt)}`:`${s("pages.invitation.joined")}: ${C.formatDateTime(a.createdAt)}`})]}),e.jsx("div",{className:`member-status ${p.type}`,children:p.type})]},i))}):e.jsxs("div",{className:"modal-empty-state",children:[e.jsx("i",{className:"fas fa-users"}),e.jsx("p",{children:s("pages.invitation.noMembersFound")})]})})]})}),e.jsx("style",{children:`
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

        .invitation-container {
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
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Invite Section */
        .invite-earn-section {
          margin-bottom: 25px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 13px;
          color: #888f99;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .referral-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .referral-code-box {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
        }

        .referral-code-value {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          padding: 12px 15px;
          font-size: 14px;
          font-weight: 600;
          color: #222;
          letter-spacing: 1px;
        }

        .copy-button {
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .copy-button:hover {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .copy-button:active {
          transform: translateY(0);
        }

        .share-section {
          margin-top: 25px;
        }

        .share-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .share-buttons {
          display: flex;
          gap: 12px;
        }

        .share-button {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e7eaee;
        }

        .share-button:hover {
          background: #e6f0ff;
          color: #106cf5;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .share-button:nth-child(1) { color: #25D366; }
        .share-button:nth-child(2) { color: #EA4335; }
        .share-button:nth-child(3) { color: #34B7F1; }
        .share-button:nth-child(4) { color: #106cf5; }

        /* Rewards Section */
        .rewards-section {
          margin-bottom: 25px;
        }

        .rewards-card {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          text-align: center;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .rewards-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .rewards-amount {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .rewards-subtitle {
          font-size: 12px;
          opacity: 0.8;
        }

        /* Generation Section */
        .generation-section {
          margin-top: 25px;
        }

        .generation-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .generation-item {
          background: #fff;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .generation-item:hover {
          border-color: #106cf5;
          box-shadow: 0 4px 8px rgba(16, 108, 245, 0.1);
        }

        .generation-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 15px;
          font-weight: 600;
          color: #222;
        }

        .generation-header i {
          color: #FFD700;
        }

        .generation-stats-row {
          display: flex;
          gap: 12px;
        }

        .stat-box {
          flex: 1;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .stat-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .stat-box.approved:hover {
          border-color: #37b66a;
          background: #e7f7ef;
        }

        .stat-box.pending:hover {
          border-color: #ff7a00;
          background: #fff2e6;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-box.approved .stat-value {
          color: #37b66a;
        }

        .stat-box.pending .stat-value {
          color: #ff7a00;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
        }

        /* Loading and Empty States */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #888f99;
        }

        .loading-state i {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #888f99;
          text-align: center;
        }

        .empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state p {
          font-size: 14px;
          max-width: 200px;
          line-height: 1.4;
        }

        /* Toast Notification */
        .toast-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #37b66a;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          z-index: 1001;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e7eaee;
        }

        .modal-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.3s ease;
        }

        .modal-close-btn:hover {
          background: #f5f5f5;
          color: #666;
        }

        .modal-body {
          padding: 20px;
          max-height: calc(80vh - 73px);
          overflow-y: auto;
        }

        .modal-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #106cf5;
        }

        .modal-loading i {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .modal-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #888f99;
          text-align: center;
        }

        .modal-empty-state i {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        /* Members List */
        .members-list {
          list-style: none;
          padding: 0;
        }

        .member-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .member-item:last-child {
          border-bottom: none;
        }

        .member-info {
          flex: 1;
        }

        .member-email {
          font-size: 14px;
          font-weight: 500;
          color: #222;
          margin-bottom: 4px;
        }

        .member-date {
          font-size: 12px;
          color: #888f99;
        }

        .member-status {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          text-transform: capitalize;
        }

        .member-status.approved {
          background: #e7f7ef;
          color: #37b66a;
        }

        .member-status.pending {
          background: #fff2e6;
          color: #ff7a00;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .invitation-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .referral-code-box {
            flex-direction: column;
          }

          .referral-code-value {
            width: 100%;
            text-align: center;
          }

          .copy-button {
            width: 100%;
            justify-content: center;
          }

          .share-button {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .rewards-amount {
            font-size: 24px;
          }

          .generation-stats-row {
            flex-direction: column;
          }

          .modal-content {
            margin: 0 16px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .modal-content {
            max-width: 450px;
          }
        }
      `})]})}export{H as default};

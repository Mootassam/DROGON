import{i as x,j as e}from"./index-f19108a0.js";const b=({isOpen:n,onClose:t,type:a,amount:o,coinType:i,primaryColor:s="#106cf5"})=>{x.useEffect(()=>{const c=l=>{l.key==="Escape"&&n&&t()};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[n,t]),x.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[n]);const r=c=>{const l={deposit:{title:"Deposit Successful!",message:"Your funds have been successfully deposited to your wallet.",icon:"fa-arrow-down",accent:s},convert:{title:"Conversion Successful!",message:"Your currency conversion has been completed successfully.",icon:"fa-exchange-alt",accent:s},staking:{title:"Staking Successful!",message:"Your funds are now staked and earning rewards!",icon:"fa-coins",accent:"#F3BA2F"},withdraw:{title:"Withdrawal Submitted!",message:"Your withdrawal request has been received and is under review.",icon:"fa-arrow-up",accent:"#FF6838"}};return l[c]||l.deposit},d=c=>{c.target===c.currentTarget&&t()};if(!n)return null;const{title:p,message:m,icon:f,accent:u}=r(a);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .success-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          padding: 20px;
        }

        .success-modal-container {
          background: white;
          width: 100%;
          max-width: 420px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          animation: modalSlideIn 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-content {
          padding: 48px 24px 32px;
          text-align: center;
        }

        .success-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: ${u}15;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 24px;
          color: ${u};
          font-size: 36px;
          border: 2px solid ${u}30;
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .success-amount {
          font-size: 32px;
          font-weight: 800;
          margin: 16px 0 8px;
          color: ${s};
          line-height: 1.2;
        }

        .coin-type {
          font-size: 16px;
          font-weight: 500;
          color: #718096;
          margin-left: 4px;
        }

        .success-message {
          color: #64748b;
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 32px;
          max-width: 280px;
          margin-left: auto;
          margin-right: auto;
        }

        .success-button {
          background: ${s};
          border: none;
          border-radius: 12px;
          padding: 14px 24px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          border: 1px solid transparent;
        }

        .success-button:hover {
          background: ${h(s,-10)};
          transform: translateY(-2px);
          box-shadow: 0 8px 20px ${s}40;
        }

        .success-button:active {
          transform: translateY(0);
          box-shadow: 0 4px 12px ${s}30;
        }

        @media (max-width: 480px) {
          .success-modal-overlay {
            padding: 16px;
          }

          .success-content {
            padding: 40px 20px 28px;
          }

          .success-icon {
            width: 80px;
            height: 80px;
            font-size: 32px;
          }

          .success-title {
            font-size: 22px;
          }

          .success-amount {
            font-size: 28px;
          }
        }
      `}),e.jsx("div",{className:"success-modal-overlay",onClick:d,children:e.jsx("div",{className:"success-modal-container",children:e.jsxs("div",{className:"success-content",children:[e.jsx("div",{className:"success-icon",children:e.jsx("i",{className:`fas ${f}`})}),e.jsx("div",{className:"success-title",children:p}),e.jsxs("div",{className:"success-amount",children:[o," ",e.jsx("span",{className:"coin-type",children:i})]}),e.jsx("div",{className:"success-message",children:m}),e.jsx("button",{className:"success-button",onClick:t,children:"Done"})]})})})]})};function h(n,t){let a=n.replace("#","");a.length===3&&(a=a.split("").map(d=>d+d).join(""));const o=parseInt(a,16);let i=(o>>16)+t,s=(o>>8&255)+t,r=(o&255)+t;return i=Math.min(255,Math.max(0,i)),s=Math.min(255,Math.max(0,s)),r=Math.min(255,Math.max(0,r)),`#${(i<<16|s<<8|r).toString(16).padStart(6,"0")}`}export{b as S};

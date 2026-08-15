import{o as P,p as he,i,t as be,x as L,j as e,L as ee,n as p,k as oe,am as ne}from"./index-a80de294.js";import{c as ve}from"./assetsFormSelectors-c362b397.js";import{S as we}from"./sucessModal-169b81d2.js";import{u as je}from"./useDispatch-dda924b7.js";function Ce(){const f=je(),te=P(he.selectCurrentUser),[t,O]=i.useState("USD"),[a,$]=i.useState("BTC"),[c,h]=i.useState(""),[D,b]=i.useState("0.0"),[M,ie]=i.useState(0),[H,z]=i.useState(!0),[x,X]=i.useState(!1),[F,T]=i.useState(!1),[A,U]=i.useState(!1),[Y,y]=i.useState(!1),[G,_]=i.useState(!1),[ae,W]=i.useState(0),[se,N]=i.useState(0),[l,E]=i.useState({}),[d,re]=i.useState({rate:0,fromAmount:0,toAmount:0,finalAmount:0,fee:0}),[S,q]=i.useState({amount:"0",coinType:"USD"}),J=P(ve.selectModal),v=P(be.selectRows);i.useRef(null);const B=i.useRef(null),R=i.useRef(null),w=i.useRef(null),u=[{code:"USD",name:"Tether USD",color:"#26A17B",symbol:"USD",binanceSymbol:"USDUSD"},{code:"ETH",name:"Ethereum",color:"#627EEA",symbol:"ETH",binanceSymbol:"ETHUSD"},{code:"BTC",name:"Bitcoin",color:"#F7931A",symbol:"BTC",binanceSymbol:"BTCUSD"},{code:"USDC",name:"USD Coin",color:"#2775CA",symbol:"USDC",binanceSymbol:"USDCUSD"},{code:"DAI",name:"Dai",color:"#F4B731",symbol:"DAI",binanceSymbol:"DAIUSD"},{code:"SHIB",name:"Shiba Inu",color:"#FFC107",symbol:"SHIB",binanceSymbol:"SHIBUSD"},{code:"XRP",name:"Ripple",color:"#23292F",symbol:"XRP",binanceSymbol:"XRPUSD"},{code:"TRX",name:"TRON",color:"#FF001A",symbol:"TRX",binanceSymbol:"TRXUSD"},{code:"SOL",name:"Solana",color:"#00FFA3",symbol:"SOL",binanceSymbol:"SOLUSD"},{code:"BNB",name:"Binance Coin",color:"#F0B90B",symbol:"BNB",binanceSymbol:"BNBUSD"},{code:"DOGE",name:"Dogecoin",color:"#C2A633",symbol:"DOGE",binanceSymbol:"DOGEUSD"}],[k,K]=i.useState({});i.useEffect(()=>{(()=>{if(v!=null&&v.length){const n=v.reduce((r,s)=>(r[s.symbol]=s.amount,r),{});K(n)}})()},[v]),i.useEffect(()=>{const o=n=>{B.current&&!B.current.contains(n.target)&&T(!1),R.current&&!R.current.contains(n.target)&&U(!1)};return document.addEventListener("mousedown",o),()=>document.removeEventListener("mousedown",o)},[]),i.useEffect(()=>{J&&S.amount!=="0"&&_(!0)},[J,S]),i.useEffect(()=>(f(L.doFetch()),(async()=>{z(!0);try{const n=await oe.get("https://api.binance.com/api/v3/ticker/24hr"),r={USD:1};u.forEach(s=>{if(s.code==="USD")return;const m=n.data.find(j=>j.symbol===s.binanceSymbol);if(m)r[s.code]=parseFloat(m.lastPrice);else{const j={ETH:3e3,BTC:45e3,USDC:1,DAI:1,SHIB:2e-5,XRP:.6,TRX:.1,SOL:100,BNB:350,DOGE:.08};r[s.code]=j[s.code]||1}}),E(r),z(!1),ce()}catch(n){console.error("Error fetching initial prices:",n),z(!1),E({USD:1,BTC:45e3,ETH:3e3,USDC:1,DAI:1,SHIB:2e-5,XRP:.6,TRX:.1,SOL:100,BNB:350,DOGE:.08})}})(),()=>{w.current&&clearInterval(w.current)}),[f]);const ce=()=>{w.current&&clearInterval(w.current),w.current=setInterval(async()=>{try{if(!Y&&!x){const o=await oe.get("https://api.binance.com/api/v3/ticker/24hr"),n={USD:1};u.forEach(r=>{if(r.code==="USD")return;const s=o.data.find(m=>m.symbol===r.binanceSymbol);s&&(n[r.code]=parseFloat(s.lastPrice))}),E(r=>({...r,...n}))}}catch(o){console.error("Error updating prices:",o)}},1e4)},Q=i.useCallback(()=>{const o=l[t]||1,n=l[a]||1;if(o&&n&&o>0&&n>0){const r=o/n;if(ie(r),c){const s=parseFloat(c);if(!isNaN(s)&&s>0){const m=s*r;b(m.toFixed(8));const j=s*.001;W(j),N(m*.999)}else b("0.0"),N(0)}else b("0.0"),N(0)}},[t,a,c,l]);i.useEffect(()=>{Q()},[Q]);const I=i.useMemo(()=>{if(!t||!c)return!1;const o=parseFloat(c);if(isNaN(o)||o<=0)return!1;const n=k[t]||0;return o<=n},[c,t,k]),le=o=>{const n=o.target.value;(n===""||/^\d*\.?\d*$/.test(n))&&h(n)},de=()=>{var o;h(((o=k[t])==null?void 0:o.toString())||"0")},me=()=>{const o=t;O(a),$(o);const n=c;h(D),b(n)},pe=()=>{f(ne.doClose()),h(""),b("0.0"),N(0),W(0),_(!1),q({amount:"0",coinType:"USD"}),f(L.doFetch())},fe=()=>{re({rate:M,fromAmount:parseFloat(c),toAmount:parseFloat(D),finalAmount:se,fee:ae}),y(!0)},xe=()=>{if(!I)return;X(!0);const o=d.finalAmount.toFixed(8);q({amount:o,coinType:a}),setTimeout(()=>{const r={user:te.id,fromSymbol:t,fromAmount:d.fromAmount,toSymbol:a,coinName:a,toAmount:o,status:"available"};f(ne.doCreate(r)),K(s=>({...s,[t]:(s[t]||0)-d.fromAmount,[a]:(s[a]||0)+d.finalAmount})),X(!1),y(!1),h(""),setTimeout(()=>{f(L.doFetch())},500)},1500)},V=o=>{var n;return((n=k[o])==null?void 0:n.toFixed(8))||"0"},Z=(o=M)=>!o||o<=0?"0.00000000":o<1e-4?o.toFixed(12):o<1?o.toFixed(8):o<100?o.toFixed(4):o.toFixed(2),ue=o=>{O(o),T(!1)},ge=o=>{$(o),U(!1)},g=o=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o}.png`,C=o=>o>=1e3?o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):o>=1?o.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:4}):o>=.01?o.toLocaleString("en-US",{minimumFractionDigits:4,maximumFractionDigits:6}):o.toLocaleString("en-US",{minimumFractionDigits:8,maximumFractionDigits:12});return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(ee,{to:"/profile",className:"back-arrow remove_blue",children:e.jsx("div",{className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})})}),e.jsx("div",{className:"page-title",children:p("pages.conversion.title")||"Conversion"}),e.jsx(ee,{to:"/history",className:"header-icon-link remove_blue",children:e.jsx("div",{className:"header-icon",children:e.jsx("i",{className:"fas fa-receipt"})})})]})}),e.jsx("div",{className:"swap-container",children:e.jsxs("div",{className:"swap-card",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-title",children:p("pages.conversion.youSend")||"You Send"}),e.jsxs("div",{className:"available-balance",children:["Available: ",V(t)," ",t]})]}),e.jsxs("div",{className:"custom-select-wrapper",ref:B,children:[e.jsxs("div",{className:"token-selector",onClick:()=>T(!F),children:[e.jsxs("div",{className:"token-info",children:[e.jsx("div",{className:"token-icon",children:e.jsx("img",{src:g(t),alt:t,className:"coin-image",onError:o=>{o.currentTarget.src=`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t}.png`,o.currentTarget.onerror=null}})}),e.jsx("div",{className:"token-name",children:t})]}),e.jsx("i",{className:`fas fa-chevron-down selector-arrow ${F?"rotated":""}`})]}),F&&e.jsxs("div",{className:"custom-dropdown",children:[e.jsxs("div",{className:"dropdown-header",children:[e.jsx("div",{className:"dropdown-title",children:"Select Coin"}),e.jsxs("div",{className:"dropdown-count",children:[u.length," coins"]})]}),e.jsx("div",{className:"dropdown-list",children:u.map(o=>e.jsxs("div",{className:`dropdown-item ${t===o.code?"selected":""}`,onClick:()=>ue(o.code),children:[e.jsx("div",{className:"item-icon",children:e.jsx("img",{src:g(o.code),alt:o.code,className:"coin-image",onError:n=>{n.currentTarget.src=`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o.code}.png`,n.currentTarget.onerror=null}})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"item-code",children:o.code}),e.jsx("div",{className:"item-name",children:o.name})]}),e.jsxs("div",{className:"item-price",children:["$",l[o.code]?C(l[o.code]):"0.00"]})]},o.code))})]})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("input",{type:"text",className:"input-field",placeholder:p("pages.conversion.enterAmount")||"Please enter the amount",value:c,onChange:le}),e.jsxs("div",{className:"input-actions",children:[e.jsx("div",{className:"token-symbol",children:t}),e.jsx("button",{className:"max-button",onClick:de,children:"All"})]})]}),e.jsx("div",{className:"price-display",children:l[t]?e.jsxs(e.Fragment,{children:["1 ",t," = $",C(l[t]),e.jsxs("span",{className:"price-update-indicator",children:[e.jsx("i",{className:"fas fa-sync-alt"})," Updated every 10s"]})]}):e.jsxs("div",{className:"price-loading",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading price..."]})}),e.jsx("div",{className:"swap-direction",children:e.jsx("div",{className:"swap-button",onClick:me,children:e.jsx("i",{className:"fas fa-exchange-alt"})})}),e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-title",children:p("pages.conversion.youReceive")||"You Receive"}),e.jsxs("div",{className:"available-balance",children:["Available: ",V(a)," ",a]})]}),e.jsxs("div",{className:"custom-select-wrapper",ref:R,children:[e.jsxs("div",{className:"token-selector",onClick:()=>U(!A),children:[e.jsxs("div",{className:"token-info",children:[e.jsx("div",{className:"token-icon",children:e.jsx("img",{src:g(a),alt:a,className:"coin-image",onError:o=>{o.currentTarget.src=`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a}.png`,o.currentTarget.onerror=null}})}),e.jsx("div",{className:"token-name",children:a})]}),e.jsx("i",{className:`fas fa-chevron-down selector-arrow ${A?"rotated":""}`})]}),A&&e.jsxs("div",{className:"custom-dropdown",children:[e.jsxs("div",{className:"dropdown-header",children:[e.jsx("div",{className:"dropdown-title",children:"Select Coin"}),e.jsxs("div",{className:"dropdown-count",children:[u.length," coins"]})]}),e.jsx("div",{className:"dropdown-list",children:u.map(o=>e.jsxs("div",{className:`dropdown-item ${a===o.code?"selected":""}`,onClick:()=>ge(o.code),children:[e.jsx("div",{className:"item-icon",children:e.jsx("img",{src:g(o.code),alt:o.code,className:"coin-image",onError:n=>{n.currentTarget.src=`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${o.code}.png`,n.currentTarget.onerror=null}})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"item-code",children:o.code}),e.jsx("div",{className:"item-name",children:o.name})]}),e.jsxs("div",{className:"item-price",children:["$",l[o.code]?C(l[o.code]):"0.00"]})]},o.code))})]})]}),e.jsx("input",{type:"text",className:"output-field",value:D,readOnly:!0}),e.jsx("div",{className:"price-display",children:l[a]?e.jsxs(e.Fragment,{children:["1 ",a," = $",C(l[a]),e.jsxs("span",{className:"price-update-indicator",children:[e.jsx("i",{className:"fas fa-sync-alt"})," Updated every 10s"]})]}):e.jsxs("div",{className:"price-loading",children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading price..."]})}),e.jsxs("div",{className:"exchange-rate",children:["1 ",t," ≈ ",Z()," ",a]}),e.jsxs("div",{className:"realtime-indicator",children:[e.jsx("i",{className:"fas fa-clock"})," Prices update every 10 seconds"]}),e.jsx("button",{className:"confirm-button",onClick:fe,disabled:H||!c||!I||t===a||parseFloat(c)<=0,children:H?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading prices..."]}):t===a?p("pages.conversion.selectDifferentCurrencies")||"Select different currencies":I?p("pages.conversion.confirmExchange")||"Confirm exchange":p("pages.conversion.insufficientBalance")||"Insufficient balance"})]})}),G&&e.jsx(we,{isOpen:G,onClose:pe,type:"convert",amount:S.amount,coinType:S.coType}),Y&&e.jsx("div",{className:"confirmation-modal-overlay",children:e.jsxs("div",{className:"confirmation-modal",children:[e.jsx("div",{className:"confirmation-header",children:e.jsxs("div",{className:"confirmation-nav-bar",children:[e.jsx("div",{className:"confirmation-title",children:"Confirm Conversion"}),e.jsx("button",{className:"confirmation-close",onClick:()=>!x&&y(!1),disabled:x,children:e.jsx("i",{className:"fas fa-times"})})]})}),e.jsxs("div",{className:"confirmation-body",children:[e.jsxs("div",{className:"confirmation-icon-section",children:[e.jsx("div",{className:"from-coin-icon",children:e.jsx("img",{src:g(t),alt:t,className:"coin-image-large",onError:o=>{o.currentTarget.src=`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t}.png`,o.currentTarget.onerror=null}})}),e.jsxs("div",{className:"conversion-direction",children:[e.jsx("div",{className:"direction-line"}),e.jsx("div",{className:"direction-icon",children:e.jsx("i",{className:"fas fa-arrow-right"})}),e.jsx("div",{className:"direction-line"})]}),e.jsx("div",{className:"to-coin-icon",children:e.jsx("img",{src:g(a),alt:a,className:"coin-image-large",onError:o=>{o.currentTarget.src=`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a}.png`,o.currentTarget.onerror=null}})})]}),e.jsxs("div",{className:"confirmation-amounts",children:[e.jsxs("div",{className:"amount-from",children:[e.jsx("div",{className:"amount-label",children:"You Send"}),e.jsx("div",{className:"amount-value",children:d.fromAmount.toFixed(8)}),e.jsx("div",{className:"amount-currency",children:t})]}),e.jsxs("div",{className:"amount-to",children:[e.jsx("div",{className:"amount-label",children:"You Receive"}),e.jsx("div",{className:"amount-value",style:{color:"#106cf5"},children:d.finalAmount.toFixed(8)}),e.jsx("div",{className:"amount-currency",children:a})]})]}),e.jsxs("div",{className:"confirmation-rate",children:[e.jsx("span",{className:"rate-label",children:"Exchange Rate:"}),e.jsxs("span",{className:"rate-value",children:["1 ",t," = ",Z(d.rate)," ",a]})]}),e.jsxs("div",{className:"confirmation-fee",children:[e.jsxs("div",{className:"fee-item",children:[e.jsx("span",{className:"fee-label",children:"Network Fee:"}),e.jsxs("span",{className:"fee-value",children:[d.fee.toFixed(8)," ",t]})]}),e.jsxs("div",{className:"fee-item",children:[e.jsx("span",{className:"fee-label",children:"Total Cost:"}),e.jsxs("span",{className:"fee-value",children:[(d.fromAmount+d.fee).toFixed(8)," ",t]})]})]}),e.jsxs("div",{className:"confirmation-actions",children:[e.jsx("button",{className:"confirm-action-btn",onClick:xe,disabled:x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"}),"Processing..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-exchange-alt"}),"Confirm Conversion"]})}),e.jsxs("button",{className:"cancel-action-btn",onClick:()=>y(!1),disabled:x,children:[e.jsx("i",{className:"fas fa-times"}),"Cancel"]})]})]})]})}),e.jsx("style",{children:`
        /* Confirmation Modal - Simplified Styles */
        .confirmation-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 16px;
        }

        .confirmation-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 380px;
          overflow: hidden;
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header */
        .confirmation-header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          padding: 16px 20px;
        }

        .confirmation-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .confirmation-title {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .confirmation-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }

        .confirmation-close:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
        }

        .confirmation-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Body */
        .confirmation-body {
          padding: 20px;
        }

        /* Icon Section */
        .confirmation-icon-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .from-coin-icon, .to-coin-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #f0f2f5;
        }

        .coin-image-large {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .conversion-direction {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .direction-line {
          width: 15px;
          height: 2px;
          background: #e7eaee;
        }

        .direction-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #106cf5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }

        /* Amounts */
        .confirmation-amounts {
          margin: 20px 0;
        }

        .amount-from, .amount-to {
          margin: 15px 0;
          text-align: center;
        }

        .amount-label {
          font-size: 12px;
          color: #888f99;
          margin-bottom: 4px;
        }

        .amount-value {
          font-size: 24px;
          font-weight: 700;
          color: #222;
          line-height: 1.2;
        }

        .amount-currency {
          font-size: 14px;
          color: #555;
          margin-top: 4px;
        }

        /* Rate */
        .confirmation-rate {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 12px 16px;
          margin: 15px 0;
          text-align: center;
          border: 1px solid #e7eaee;
        }

        .rate-label {
          font-size: 12px;
          color: #888f99;
          margin-right: 8px;
        }

        .rate-value {
          font-size: 14px;
          font-weight: 600;
          color: #106cf5;
        }

        /* Fee */
        .confirmation-fee {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 16px;
          margin: 15px 0;
          border: 1px solid #e7eaee;
        }

        .fee-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e7eaee;
        }

        .fee-item:last-child {
          border-bottom: none;
        }

        .fee-label {
          font-size: 13px;
          color: #555;
        }

        .fee-value {
          font-size: 14px;
          font-weight: 600;
          color: #222;
        }

        /* Actions */
        .confirmation-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0 10px;
        }

        .confirm-action-btn {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border: none;
          border-radius: 12px;
          padding: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .confirm-action-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .confirm-action-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-action-btn {
          background: transparent;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 12px;
          color: #888f99;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .cancel-action-btn:hover:not(:disabled) {
          background: #f8f9fa;
          color: #222;
        }

        .cancel-action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Price Update Indicator */
        .price-update-indicator {
          color: #888f99;
          font-size: 10px;
          margin-left: 8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .price-update-indicator i {
          font-size: 8px;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .confirmation-modal {
            max-width: 100%;
            border-radius: 16px;
          }

          .confirmation-header {
            padding: 14px 16px;
          }

          .confirmation-body {
            padding: 16px;
          }

          .from-coin-icon, .to-coin-icon {
            width: 50px;
            height: 50px;
          }

          .amount-value {
            font-size: 22px;
          }

          .confirmation-rate,
          .confirmation-fee {
            padding: 12px;
          }
        }

             
        /* Add these new styles to your existing CSS */
        
        .price-display {
          font-size: 12px;
          color: #888f99;
          text-align: center;
          margin: 10px 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .price-update-indicator {
          color: #2ff378;
          font-size: 8px;
          animation: pricePulse 2s infinite;
        }
        
        @keyframes pricePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .price-loading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #106cf5;
        }
        
        .realtime-indicator {
          text-align: center;
          color: #888f99;
          font-size: 11px;
          margin: 15px 0 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        
        .realtime-indicator i {
          color: #106cf5;
          font-size: 10px;
        }
        
        .item-price {
          font-size: 12px;
          font-weight: 600;
          color: #106cf5;
          margin-left: 10px;
          text-align: right;
          min-width: 80px;
        }
        
        /* Existing styles remain the same, just adding the new ones above */
        
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

        .container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
          padding: 15px 20px;
          color: white;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
        }

        .remove_blue {
          color: white;
          text-decoration: none;
        }

        .page-title {
          font-size: 18px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .header-icon {
          font-size: 16px;
          cursor: pointer;
        }

        /* Swap Container */
        .swap-container {
          padding: 20px;
          border-radius: 40px 40px 0 0;
          background: white;
          height: 100%;
          overflow-y: auto;
        }

        .swap-card {
          background: white;
          border-radius: 16px;
          margin-top: 10px;
        }

        /* Section Headers */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .available-balance {
          font-size: 12px;
          color: #999;
        }

        /* Custom Select Wrapper */
        .custom-select-wrapper {
          position: relative;
          margin-bottom: 12px;
          // z-index: 2;
        }

        /* Token Selector */
        .token-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          position: relative;
          z-index: 1;
        }

        .token-selector:hover {
          border-color: #106cf5;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.1);
        }

        .token-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .token-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
        }

        .coin-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .token-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .selector-arrow {
          color: #999;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .selector-arrow.rotated {
          transform: rotate(180deg);
        }

        /* Custom Dropdown */
        .custom-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          margin-top: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 10;
          max-height: 300px;
          overflow-y: auto;
        }

        .dropdown-header {
          padding: 15px 20px;
          border-bottom: 1px solid #e7eaee;
          background: #f8f9fa;
        }

        .dropdown-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .dropdown-count {
          font-size: 12px;
          color: #888f99;
        }

        .dropdown-list {
          padding: 8px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f5f5f5;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .dropdown-item.selected {
          background-color: #e6f0ff;
        }

        .item-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          flex-shrink: 0;
          background: #f8f9fa;
        }

        .item-info {
          flex: 1;
          min-width: 0;
        }

        .item-code {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .item-name {
          font-size: 12px;
          color: #888f99;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-balance {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-left: 10px;
        }

        /* Input Field */
        .input-group {
          position: relative;
          margin-bottom: 10px;
        }

        .input-field {
          width: 100%;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: white;
          font-size: 12px;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #106cf5;
        }

        .input-field::placeholder {
          color: #999;
        }

        .input-actions {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .token-symbol {
          font-size: 14px;
          color: #666;
        }

        .max-button {
          background: #e6f0ff;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          color: #106cf5;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .max-button:hover {
          background: #d0e2ff;
        }

        /* Output Field */
        .output-field {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: #f8f9fa;
          font-size: 16px;
          color: #333;
          text-align: right;
        }

        /* Swap Button */
        .swap-direction {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }

        .swap-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .swap-button:hover {
          border-color: #106cf5;
          transform: rotate(180deg);
        }

        .swap-button i {
          color: #666;
          font-size: 16px;
        }


        /* Exchange Rate */
        .exchange-rate {
          text-align: center;
          margin: 20px 0;
          font-size: 14px;
          color: #666;
        }

        /* Confirm Button */
        .confirm-button {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border: none;
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }

        .confirm-button:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.3);
        }

        .confirm-button:disabled {
          background: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          transform: none;
        }

        /* Confirmation Modal Styles */
        .confirmation-modal-overlay {
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

        .confirmation-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e7eaee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 18px;
          color: #222;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: #888f99;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f8f9fa;
          color: #222;
        }

        .modal-body {
          padding: 20px;
        }

        .conversion-summary {
          text-align: center;
          margin-bottom: 30px;
        }

        .from-amount, .to-amount {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px;
          margin: 10px 0;
        }

        .from-amount .amount,
        .to-amount .amount {
          font-size: 24px;
          font-weight: 700;
          color: #222;
        }

        .from-amount .currency,
        .to-amount .currency {
          font-size: 14px;
          color: #888f99;
          margin-top: 4px;
        }

        .conversion-arrow {
          color: #106cf5;
          font-size: 16px;
        }

        .conversion-details {
          border-top: 1px solid #e7eaee;
          padding-top: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-row span:first-child {
          color: #888f99;
          font-size: 14px;
        }

        .detail-row span:last-child {
          color: #222;
          font-weight: 500;
          font-size: 14px;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e7eaee;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .confirm-btn {
          padding: 16px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #0a4fc4;
        }

        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-btn {
          padding: 16px;
          background: transparent;
          color: #888f99;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #f8f9fa;
          color: #222;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .container {
            padding: 0;
          }

          .header,
          .swap-container {
            padding-left: 16px;
            padding-right: 16px;
          }

          .swap-card {
            padding: 16px;
          }

          .confirmation-modal {
            max-width: 100%;
          }

          .token-icon {
            width: 28px;
            height: 28px;
          }

          .token-name {
            font-size: 13px;
          }

          .dropdown-item {
            padding: 10px 16px;
          }

          .item-price {
            font-size: 11px;
            min-width: 70px;
          }
        }


        /* Your existing styles for other components... */
      `})]})}export{Ce as default};

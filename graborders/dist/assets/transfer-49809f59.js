import{o as j,t as P,i as a,j as e,L as z,x as I,am as M}from"./index-82128ca2.js";import{c as T}from"./assetsFormSelectors-bda1f21f.js";import{u as O}from"./useDispatch-a5267164.js";function _(){const f=O(),x=j(T.selectSaveLoading);j(T.selectRecord);const d=j(P.selectRows),[n,F]=a.useState("USD"),[B,m]=a.useState(!1),[r,u]=a.useState("exchange"),[c,h]=a.useState("trade"),[g,p]=a.useState(""),[i,b]=a.useState(0),[N,l]=a.useState({from:!1,to:!1}),w=a.useRef(null),y=a.useRef(null),k=[{code:"USD",name:"Tether USD",color:"#26A17B",symbol:"USD"},{code:"ETH",name:"Ethereum",color:"#627EEA",symbol:"ETH"},{code:"BTC",name:"Bitcoin",color:"#F7931A",symbol:"BTC"},{code:"USDC",name:"USD Coin",color:"#2775CA",symbol:"USDC"},{code:"DAI",name:"Dai",color:"#F4B731",symbol:"DAI"},{code:"SHIB",name:"Shiba Inu",color:"#FFC107",symbol:"SHIB"},{code:"XRP",name:"Ripple",color:"#23292F",symbol:"XRP"},{code:"TRX",name:"TRON",color:"#FF001A",symbol:"TRX"},{code:"SOL",name:"Solana",color:"#00FFA3",symbol:"SOL"},{code:"BNB",name:"Binance Coin",color:"#F0B90B",symbol:"BNB"},{code:"DOGE",name:"Dogecoin",color:"#C2A633",symbol:"DOGE"}],v=[{code:"exchange",name:"Exchange"},{code:"trade",name:"Trade"},{code:"perpetual",name:"Perpetual"}],D=t=>{f(M.doTransfer(t))};a.useEffect(()=>{let t=!0;return(async()=>{try{await f(I.doFetch())}catch(s){t&&console.error("Error fetching assets:",s)}})(),()=>{t=!1}},[f]),a.useEffect(()=>{if(d&&d.length>0){const t=d.find(o=>o.symbol===n&&o.accountType===r);b(t&&t.amount||0)}else b(0)},[d,n,r]),a.useEffect(()=>{const t=o=>{w.current&&!w.current.contains(o.target)&&l(s=>({...s,from:!1})),y.current&&!y.current.contains(o.target)&&l(s=>({...s,to:!1}))};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]);const E=t=>{F(t),m(!1),p("")},S=(t,o)=>{o==="from"?(u(t),t===c&&h(t==="exchange"?"trade":"exchange")):(h(t),t===r&&u(t==="exchange"?"trade":"exchange")),l(s=>({...s,[o]:!1}))},R=t=>{const o=t.target.value;(o===""||/^\d*\.?\d*$/.test(o))&&p(o)},L=()=>{p(i.toString())},U=()=>{const t=r;u(c),h(t)},$=()=>{const t=parseFloat(g);if(!t||t<=0){alert("Please enter a valid amount");return}if(t>i){alert("Insufficient balance");return}if(r===c){alert("Cannot transfer to the same account");return}k.find(s=>s.code===n);const o={symbol:n,fromAccount:r,toAccount:c,amount:t,status:"completed"};console.log("Transfer data:",o),D(o),p("")},A=t=>{const o=v.find(s=>s.code===t);return o?o.name:t},C=()=>{const t=parseFloat(g);return t>0&&t<=i&&r!==c&&!x};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(z,{to:"/wallets",className:"back-arrow remove_blue",children:e.jsx("div",{className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})})}),e.jsx("div",{className:"page-title",children:"Transfer"}),e.jsx(z,{to:"/transferAll",className:"header-icon remove_blue",children:e.jsx("div",{className:"header-icon",children:e.jsx("i",{className:"fas fa-receipt"})})})]})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"currency-selector",children:[e.jsx("div",{className:"selector-header",children:e.jsx("div",{className:"selector-label",children:"Select currency"})}),e.jsxs("div",{className:"selected-currency",onClick:()=>m(!0),children:[e.jsxs("div",{className:"currency-icon",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n}.png`,style:{width:"100%"}}),e.jsx("span",{children:n})]}),e.jsx("div",{className:"currency-name",style:{paddingLeft:10},children:n}),e.jsx("i",{className:"fas fa-chevron-down selector-arrow"})]}),e.jsx("div",{className:"warning-messages",children:i===0?"There are currently no assets available, please select another":""})]}),e.jsxs("div",{className:"wallet-section",children:[e.jsxs("div",{className:"wallet-card",children:[e.jsxs("div",{className:"wallet-row",ref:w,children:[e.jsx("div",{className:"wallet-label",children:"From:"}),e.jsxs("div",{className:"wallet-value",onClick:()=>l(t=>({...t,from:!t.from})),children:[A(r),e.jsx("i",{className:"fas fa-chevron-right wallet-arrow"}),N.from&&e.jsx("div",{className:"account-dropdown",children:v.map(t=>e.jsx("div",{className:`account-item ${r===t.code?"selected":""}`,onClick:o=>{o.stopPropagation(),S(t.code,"from")},children:t.name},`from-${t.code}`))})]})]}),e.jsx("div",{className:"transfer-direction",children:e.jsx("div",{className:"direction-arrow",children:e.jsx("i",{className:"fas fa-arrow-down"})})}),e.jsxs("div",{className:"wallet-row",ref:y,children:[e.jsx("div",{className:"wallet-label",children:"To:"}),e.jsxs("div",{className:"wallet-value",onClick:()=>l(t=>({...t,to:!t.to})),children:[A(c),e.jsx("i",{className:"fas fa-chevron-right wallet-arrow"}),N.to&&e.jsx("div",{className:"account-dropdown",children:v.map(t=>e.jsx("div",{className:`account-item ${c===t.code?"selected":""}`,onClick:o=>{o.stopPropagation(),S(t.code,"to")},children:t.name},`to-${t.code}`))})]})]})]}),e.jsx("div",{className:"swap-wallets",onClick:U,children:e.jsx("i",{className:"fas fa-exchange-alt"})})]}),e.jsxs("div",{className:"quantity-section",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("input",{type:"text",className:"input-field",value:g,onChange:R,placeholder:"0.0"}),e.jsxs("div",{className:"input-actions",children:[e.jsx("div",{className:"token-symbol",children:n}),e.jsx("button",{className:"max-button",onClick:L,disabled:i===0,children:"Maximum"})]})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",i.toFixed(8)," ",n]})]}),e.jsx("button",{className:`transfer-button ${C()?"enabled":""}`,onClick:$,disabled:!C()||x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):"Transfer"})]})]}),B&&e.jsx("div",{className:"modal-overlay",onClick:()=>m(!1),children:e.jsxs("div",{className:"modal-content",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"Select Currency"}),e.jsx("button",{className:"modal-close",onClick:()=>m(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("ul",{className:"currency-list",children:k.map(t=>e.jsxs("li",{className:`currency-item ${n===t.code?"selected":""}`,onClick:()=>E(t.code),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.code}.png`,style:{width:"100%"}})}),e.jsxs("div",{className:"currency-name",children:[e.jsx("div",{className:"item-code",children:t.code}),e.jsx("div",{className:"item-name",children:t.name})]}),e.jsx("i",{className:"fas fa-check check-icon"})]},t.code))})]})}),e.jsx("style",{children:`
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

                /* Content Section */
                .content-card {
                    background: white;
                    border-radius: 40px 40px 0 0;
                    height: calc(100% - 60px);
                    padding: 30px 20px 100px;
                    overflow-y: auto;
                }

                .section-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: #333;
                }

                /* Currency Selector */
                .currency-selector {
                    margin-bottom: 20px;
                }

                .selector-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .selector-label {
                    font-size: 12px;
                    color: #666;
                    font-weight: 500;
                }

                .selected-currency {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    background: white;
                    cursor: pointer;
                    position: relative;
                }

                .currency-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                }

                .currency-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    flex: 1;
                }

                .selector-arrow {
                    color: #999;
                    font-size: 12px;
                }

                .warning-messages {
                    color: #d40000;
                    font-size: 12px;
                    padding-left: 5px;
                    margin-top: 5px;
                    min-height: 18px;
                }

                /* Wallet Section */
                .wallet-section {
                    margin-bottom: 20px;
                    position: relative;
                    display: flex;
                }

                .wallet-card {
                    background: white;
                    width: 100%;
                    padding: 20px;
                    border: 1px solid #e0e0e0;
                    position: relative;
                }

                .wallet-row {
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    gap: 20px;
                    position: relative;
                }

                .wallet-row:first-child {
                    border-bottom: 1px solid #f0f0f0;
                }

                .wallet-label {
                    font-size: 12px;
                    color: #666;
                    min-width: 40px;
                }

                .wallet-value {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #000;
                    cursor: pointer;
                    position: relative;
                }

                .wallet-arrow {
                    font-size: 13px;
                    color: #666;
                }

                /* Account Dropdown */
                .account-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    z-index: 10;
                    min-width: 120px;
                    margin-top: 5px;
                }

                .account-item {
                    padding: 10px 15px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .account-item:hover {
                    background: #f5f5f5;
                }

                .account-item.selected {
                    background: #e6f0ff;
                    color: #106cf5;
                }

                .transfer-direction {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                }

                .direction-arrow {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 12px;
                }

      .swap-wallets {

    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    display: flex;
    align-items: center;
    /* justify-content: center; */
    color: white;
    padding: 8px;
}

                .swap-wallets:hover {
                    opacity: 0.9;
                }

                /* Quantity Section */
                .quantity-section {
                    margin-bottom: 30px;
                }

                .input-group {
                    position: relative;
                    margin-bottom: 10px;
                }

                .input-field {
                    width: 100%;
                    padding: 16px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    background: white;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }

                .input-field:focus {
                    outline: none;
                    border-color: #106cf5;
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
                    font-size: 12px;
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

                .max-button:hover:not(:disabled) {
                    background: #d0e2ff;
                }

                .max-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .balance-info {
                    font-size: 13px;
                    color: #666;
                    text-align: right;
                }

                /* Transfer Button */
                .transfer-button {
                    background: #ccc;
                    border: none;
                    border-radius: 8px;
                    padding: 12px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: not-allowed;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .transfer-button.enabled {
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    cursor: pointer;
                }

                .transfer-button.enabled:hover:not(:disabled) {
                    opacity: 0.9;
                }

                .transfer-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
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
                    padding: 16px;
                }

                .modal-content {
                    background: white;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 350px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    color: #999;
                    cursor: pointer;
                    padding: 5px;
                }

                .currency-list {
                    list-style: none;
                    padding: 0;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .currency-item {
                    padding: 12px 20px;
                    border-bottom: 1px solid #f0f0f0;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .currency-item:hover {
                    background: #f8f9fa;
                }

                .currency-item.selected {
                    background: #e6f0ff;
                }

                .currency-item .currency-name {
                    flex: 1;
                }

                .currency-item .item-code {
                    font-size: 14px;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 2px;
                }

                .currency-item .item-name {
                    font-size: 12px;
                    color: #888f99;
                }

                .check-icon {
                    color: #106cf5;
                    font-size: 12px;
                    display: none;
                }

                .currency-item.selected .check-icon {
                    display: block;
                }

                /* Responsive adjustments */
                @media (max-width: 380px) {
                    .container {
                        padding: 0;
                    }

                    .header {
                        padding: 16px;
                    }

                    .content-card {
                        padding: 25px 16px 100px;
                    }

                    .currency-selector,
                    .wallet-section,
                    .quantity-section {
                        padding: 0;
                    }
                    
                    .wallet-card {
                        padding: 16px;
                    }
                }
            `})]})}export{_ as default};

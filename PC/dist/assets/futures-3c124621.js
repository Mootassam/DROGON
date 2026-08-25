import{j as o,Y as K,a0 as Nt,X as et,a1 as kt,n as e,G as vt,u as H,B as wt,W as Be,i as tt,D as st,o as p,F as St}from"./index-bf9bb85f.js";import{C as Ft}from"./CoinSelectorSidebar-18772bfe.js";import{C as Pt}from"./CustomTradingChart-96439ed3.js";import{u as Ct,g as Dt,c as At,a as Ut,b as Tt}from"./useSymbolInjections-3555ad9b.js";import{u as Et}from"./useDispatch-3bbfd096.js";const zt=({isOpen:l,onClose:N,direction:m,dispatch:x,listAssets:F,selectedCoin:Q,marketPrice:I,availableBalance:k,setOpeningOrders:V,isDemoAccount:ie=!1})=>{const[P,le]=o.useState("120"),[B,W]=o.useState("20"),[c,C]=o.useState(30),[h,i]=o.useState("configuring"),[X,T]=o.useState(0),[we,E]=o.useState(null),[ce,ee]=o.useState(""),[te,se]=o.useState(null),[de,D]=o.useState(""),[ue,oe]=o.useState(!1),[y,Se]=o.useState(null),pe=n=>Number.isFinite(n)?n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00",z=(n,u)=>{le(n),W(u)};o.useEffect(()=>(l?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[l]),o.useEffect(()=>{x(K.doFetch())},[x]),o.useEffect(()=>{c<30?ee("Minimum amount is 30 USD"):c>k?ee("Insufficient balance"):ee("")},[c,k]),o.useEffect(()=>{let n=null;return h==="in-progress"&&(X>0?n=setInterval(()=>{T(u=>u-1)},1e3):(async()=>await Oe())()),()=>{n&&clearInterval(n)}},[h,X]);const me=async()=>{if(!(!m||c<30||c>k)){oe(!0);try{const n=parseFloat(I||"0")||0,u=await Fe();if(!u||!u.id){oe(!1);return}se(u.id),Se({futuresAmount:c,contractDuration:P,futuresStatus:m==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date,closePositionTime:null}),V(b=>[...b,{id:u.id,futuresAmount:c,contractDuration:P,futuresStatus:m==="up"?"long":"short",openPositionPrice:n,closePositionPrice:null,leverage:1,openPositionTime:new Date().toISOString(),closePositionTime:null}]);const f=parseInt(P,10)||0;T(f),i("in-progress")}catch(n){console.error("startTrade error",n)}finally{oe(!1)}}},Oe=async()=>{if(V([]),!te){E("loss"),D(`-${c.toFixed(2)} USD`),i("completed");return}try{const n=await x(Nt.doFind(te)),u=n&&n.payload?n.payload:n;if(!u){E("loss"),D(`-${c.toFixed(2)} USD`),i("completed");return}if(u.finalized){const v=u.control==="profit",Ue=Number(u.profitAndLossAmount??(v?Ce(c,1,B):-c));E(v?"win":"loss"),D(`${v?"+":""}${Ue.toFixed(2)} USD`),i("completed"),x(K.doFetchPending()),x(K.doFetch());return}const f=u.futuresStatus==="long",b=1,g=parseInt(B,10),ne=new Date;let w;ie?w=Math.random()<.85:w=Math.random()<.3;const A=u.openPositionPrice,O=.002+Math.random()*(.005-.002),G=A*(O/100);let ae;w?ae=f?A+G:A-G:ae=f?A-G:A+G;const Z=c*b*g/100,J=w?c+Z:-c,Ae={control:w?"profit":"loss",closePositionPrice:ae,closePositionTime:ne.toISOString(),profitAndLossAmount:J};try{await x(et.doUpdate(te,Ae)),E(w?"win":"loss"),D(`${w?"+":""}${J.toFixed(2)} USD`),i("completed"),x(K.doFetchPending()),x(K.doFetch())}catch(v){console.error("Error finalizing trade:",v),E("loss"),D(`-${c.toFixed(2)} USD`),i("completed")}}catch(n){console.error("completeTrade error",n),E("loss"),D(`-${c.toFixed(2)} USD`),i("completed")}},Fe=async()=>{const n=parseFloat(I||"0")||0,u={futuresStatus:m==="up"?"long":"short",profitAndLossAmount:"",leverage:1,control:"loss",operate:"low",futureCoin:Q.replace("USD","/USD"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:n,contractDuration:P,futuresAmount:c};try{const f=await x(et.doCreate(u)),b=f&&f.id?f:f&&f.payload?f.payload:null;return b&&b.id?(se(b.id),b):(console.warn("Create did not return created record"),null)}catch(f){return console.error("create error",f),null}},Pe=()=>{i("configuring"),V([]),E(null),T(0),se(null),D(""),Se(null),C(30),W("20"),le("120")},Ce=(n,u,f)=>{const b=Number.isFinite(n)?n:0,g=typeof u=="number"?u:parseInt(u,10)||0,ne=parseInt(f,10)||0;return b*g*ne/100},fe=()=>{if(h!=="in-progress")return 0;const n=parseInt(P,10)||1;return(n-X)/n*100},De=n=>{const u=Math.floor(n/60),f=n%60;return`${u.toString().padStart(2,"0")}:${f.toString().padStart(2,"0")}`},L=n=>n?new Date(n).toLocaleTimeString():"-",xe=n=>{const u=parseInt(n.target.value,10)||0;C(u)};return l?kt.createPortal(e.jsxs("div",{className:"modal-overlay",onClick:N,children:[e.jsxs("div",{className:`modal-container ${m==="up"?"up-theme":"down-theme"}`,onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"pair-info",children:e.jsx("div",{className:"pair-name",children:Q.replace("USD","/USD")})}),e.jsx("button",{className:"close-btn",onClick:N,children:"×"})]}),h!=="configuring"&&e.jsxs("div",{className:"trade-progress-section",children:[e.jsx("div",{className:"progress-container",children:e.jsx("div",{className:"circular-progress",style:{background:`conic-gradient(${m==="up"?"#00C076":"#FF6838"} ${fe()}%, #3a3a3a ${fe()}%)`},children:e.jsxs("div",{className:"progress-inner",children:[e.jsx("div",{className:"progress-time",children:De(X)}),e.jsx("div",{className:"progress-label",children:"Remaining"})]})})}),y&&e.jsxs("div",{className:"trade-details",children:[e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Futures Amount:"}),e.jsxs("span",{children:[y.futuresAmount," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Contract Duration:"}),e.jsxs("span",{children:[y.contractDuration,"s"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Future Type:"}),e.jsx("span",{className:y.futuresStatus==="long"?"up-text":"down-text",children:y.futuresStatus.toUpperCase()})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Position Price:"}),e.jsxs("span",{children:[y.openPositionPrice.toFixed(4)," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Position Price:"}),e.jsxs("span",{children:[y.closePositionPrice?y.closePositionPrice.toFixed(4):"-"," USD"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Leverage:"}),e.jsxs("span",{children:[y.leverage,"x"]})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Open Time:"}),e.jsx("span",{children:L(y.openPositionTime)})]}),e.jsxs("div",{className:"trade-details-row",children:[e.jsx("span",{children:"Close Time:"}),e.jsx("span",{children:L(y.closePositionTime)})]})]}),e.jsxs("div",{className:"trade-actions",children:[h==="in-progress"&&e.jsx("button",{className:"trade-action-btn keep-buying",onClick:N,children:"Keep Buying"}),h==="completed"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"trade-action-btn secondary",onClick:N,children:"Close"}),e.jsx("button",{className:"trade-action-btn primary",onClick:Pe,children:"New Trade"})]})]})]}),h==="configuring"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`direction-indicator ${m}-indicator`,children:m==="up"?"Predicting price will go UP":"Predicting price will go DOWN"}),e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"section",children:[e.jsxs("div",{className:"section-title",children:[e.jsx("span",{children:"Contract Duration"}),e.jsx("span",{children:"Payout"})]}),e.jsx("div",{className:"options-container",children:[{duration:"60",payout:"10"},{duration:"120",payout:"20"},{duration:"180",payout:"40"},{duration:"240",payout:"80"}].map(n=>e.jsxs("button",{className:`option-btn ${P===n.duration?"selected":""}`,onClick:()=>z(n.duration,n.payout),children:[n.duration,"s (",n.payout,"%)"]},n.duration))})]}),e.jsxs("div",{className:"section",children:[e.jsx("div",{className:"section-title",children:e.jsx("span",{children:"Futures Amount (USD)"})}),e.jsxs("div",{className:"amount-control",children:[e.jsx("button",{className:"amount-btn",onClick:()=>C(n=>Math.max(1,n-1)),children:"-"}),e.jsx("input",{type:"number",className:"amount-inputs",value:c,onChange:xe,min:"1",placeholder:"Enter amount"}),e.jsx("button",{className:"amount-btn",onClick:()=>C(n=>n+1),children:"+"})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",pe(k)," USD"]}),ce&&e.jsx("div",{className:"error-message",style:{color:"#FF6838",fontSize:"12px",marginTop:"5px"},children:ce})]}),e.jsxs("div",{className:"profit-info",children:["Projected Profit: ",Ce(c,1,B).toFixed(2)," USD"]}),e.jsx("button",{className:"confirm-btn",onClick:me,disabled:!m||c<30||c>k||ue,style:{opacity:!m||c<30||c>k?.5:1,cursor:!m||c<30||c>k?"not-allowed":"pointer"},children:ue?"CREATING...":c>k?"INSUFFICIENT BALANCE":"CONFIRM ORDER"})]})]})]}),e.jsx("style",{children:` 
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      padding: 20px;
      height: 100%;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      overflow-y: auto;
  }

  .up-theme {
      border-top: 4px solid #00C076;
  }

  .down-theme {
      border-top: 4px solid #FF6838;
  }

  /* Header Section */
  .modal-header {
      background-color: #1a1a1a;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3a3a3a;
  }

  .pair-info {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  .pair-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F3BA2F;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pair-icon i {
      color: #000;
      font-size: 16px;
  }

  .pair-name {
      font-weight: bold;
      font-size: 18px;
      color: #FBFBFB;
  }

  .close-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      cursor: pointer;
      padding: 5px;
  }

  .close-btn:hover {
      color: #FFFFFF;
  }

  /* Direction Indicator */
  .direction-indicator {
      padding: 10px 15px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
  }

  .up-indicator {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .down-indicator {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  /* Modal Content */
  .modal-content {
      padding: 15px;
  }

  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
  }

  .options-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
  }

  .option-btn {
      background-color: #3a3a3a;
      border: 1px solid #4a4a4a;
      border-radius: 6px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      flex: 1;
      min-width: 70px;
      text-align: center;
      transition: all 0.2s;
  }

  .option-btn:hover {
      background-color: #4a4a4a;
  }

  .option-btn.selected {
      background-color: #00C076;
      border-color: #00C076;
      color: #000;
      font-weight: bold;
  }

  .down-theme .option-btn.selected {
      background-color: #FF6838;
      border-color: #FF6838;
  }

  .amount-control {
      display: flex;
      align-items: center;
      background-color: #3a3a3a;
      border-radius: 6px;
      padding: 5px;
      margin-top: 10px;
  }

  .amount-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
  }

  .amount-btn:hover {
      background-color: #4a4a4a;
      color: #FFFFFF;
  }

  .amount-inputs {
      flex: 1;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      -moz-appearance: textfield;
  }

  .balance-info {
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
      margin-top: 5px;
  }

  .profit-info {
      text-align: center;
      font-size: 14px;
      color: #AAAAAA;
      margin: 20px 0;
  }

  .confirm-btn {
      background-color: #00C076;
      color: white;
      display: block;
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
      background-color: #00a466;
  }

  .confirm-btn:disabled {
      background-color: #3a3a3a;
      color: #777;
      cursor: not-allowed;
  }

  .down-theme .confirm-btn {
      background-color: #FF6838;
  }

  .down-theme .confirm-btn:hover:not(:disabled) {
      background-color: #e55a2b;
  }
      
  /* Trade Progress Section */
  .trade-progress-section {
      padding: 20px;
      text-align: center;
  }

  .progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .circular-progress {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s linear;
  }

  .progress-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #2a2a2a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .progress-time {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #FFFFFF;
  }

  .progress-label {
      font-size: 12px;
      color: #AAAAAA;
  }

  /* Trade Details */
  .trade-details {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      text-align: left;
      display:flex;
      flex-direction:column
  }

  .trade-details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
  }

  .trade-details-row:last-child {
      margin-bottom: 0;
  }

  .trade-details-row span:first-child {
      color: #AAAAAA;
  }

  .trade-details-row span:last-child {
      color: #FFFFFF;
      font-weight: 500;
  }

  .up-text {
      color: #00C076 !important;
  }

  .down-text {
      color: #FF6838 !important;
  }

  .trade-result {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0;
      padding: 10px;
      border-radius: 6px;
  }

  .trade-result.win {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .trade-result.loss {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  .trade-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
  }

  .trade-action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .trade-action-btn.primary {
      background-color: #F3BA2F;
      color: #000;
  }

  .trade-action-btn.primary:hover {
      background-color: #e4ab25;
  }

  .trade-action-btn.secondary {
      background-color: #3a3a3a;
      color: #FFFFFF;
  }

  .trade-action-btn.secondary:hover {
      background-color: #4a4a4a;
  }

  .trade-action-btn.keep-buying {
      background-color: #00C076;
      color: white;
  }

  .trade-action-btn.keep-buying:hover {
      background-color: #00a466;
  }

  .down-theme .trade-action-btn.keep-buying {
      background-color: #FF6838;
  }

  .down-theme .trade-action-btn.keep-buying:hover {
      background-color: #e55a2b;
  }
`})]}),document.body):null},ot=[{symbol:"XAUUSD",name:"Gold"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"Silver"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}];function Gt(){const l=Et(),N=vt(),m=H(wt.selectRows);H(Be.pendingRows),H(Be.pendingcount),H(Be.pendingLoading),H(tt.selectCurrentUser);const x=H(tt.selectCurrentTenant),F=o.useRef(null),Q=o.useRef(null),I=o.useRef(null),k=o.useRef(null),[V,ie]=o.useState([]),[r,P]=o.useState(null),le=o.useRef(null),[B,W]=o.useState(null),c=o.useRef({}),C=o.useRef({}),h=o.useRef({}),[i,X]=o.useState("EURUSD"),[T,we]=o.useState("marketPrice"),[E,ce]=o.useState(!1),[ee,te]=o.useState(null),[se,de]=o.useState(!1),[D,ue]=o.useState(null),[oe,y]=o.useState(!1),[Se,pe]=o.useState(!0),[z,me]=o.useState(0),[Oe,Fe]=o.useState([]),[Pe,Ce]=o.useState(!1),fe=Ct(),[,De]=o.useState(0);o.useEffect(()=>{const t=setInterval(()=>De(s=>s+1),1e3);return()=>clearInterval(t)},[]);const[L,xe]=o.useState(100),[n,u]=o.useState(!1),[f,b]=o.useState(0),[g,ne]=o.useState(!1),[w,A]=o.useState(0),[O,G]=o.useState(.01),[ae,Z]=o.useState(!1),[J,Ae]=o.useState("buy"),[v,Ue]=o.useState("market"),[be,Ge]=o.useState(!1),[Je,Te]=o.useState(null),[Y,Ee]=o.useState(0),[re,ze]=o.useState(null),Le=o.useRef(null),q=o.useCallback(t=>`~m~${t.length}~m~${t}`,[]),Ye=o.useCallback(t=>{const s=[];let a=t;for(;a.length>0&&a.startsWith("~m~");){const S=a.indexOf("~m~",3),j=parseInt(a.substring(3,S)),$=a.substring(S+3,S+3+j);s.push($),a=a.substring(S+3+j)}return s},[]),_e=o.useCallback(t=>{try{const s=t.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return t}},[]),ge=o.useCallback(t=>{const s=F.current,a=Q.current;!s||s.readyState!==WebSocket.OPEN||!a||I.current!==t&&(I.current&&s.send(q(JSON.stringify({m:"quote_remove_symbols",p:[a,I.current]}))),s.send(q(JSON.stringify({m:"quote_add_symbols",p:[a,t]}))),I.current=t,ie([]),P(null),W(null),pe(!0),delete C.current[t],delete h.current[t],delete c.current[t])},[q]),Re=o.useCallback(()=>{F.current&&(F.current.close(),F.current=null);const t=new WebSocket(Dt());F.current=t,t.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);Q.current=s,t.send(q(JSON.stringify({m:"quote_create_session",p:[s]}))),t.send(q(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]})));const a=Ve.current;ge(a)},t.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){t.send(a);return}Ye(a).forEach(j=>{try{const $=JSON.parse(j);if($.m==="qsd"){const Ke=$.p[1],Qe=_e(Ke.n),Ie=Ke.v;if(!Ie)return;const ht={symbol:Qe,ask:Ie.ask??0,bid:Ie.bid??0};ie(yt=>[...yt.filter(jt=>jt.symbol!==Qe),ht])}}catch{}})},t.onclose=s=>{I.current=null,s.wasClean||(k.current=setTimeout(()=>Re(),3e3))},t.onerror=s=>console.error("WebSocket error:",s)},[q,Ye,_e,ge]),Ve=o.useRef(i);o.useEffect(()=>{Ve.current=i},[i]),o.useEffect(()=>{le.current=r},[r]),o.useEffect(()=>(Re(),()=>{k.current&&clearTimeout(k.current),F.current&&F.current.close()}),[Re]),o.useEffect(()=>{ge(i)},[i,ge]),o.useEffect(()=>{const t=V.find(a=>a.symbol===i);if(!t||!t.ask||!t.bid)return;const s=(t.ask+t.bid)/2;if(P(s),pe(!1),c.current[i]===void 0)c.current[i]=s,W(0);else{const a=c.current[i],S=(s-a)/a*100;W(S)}(!C.current[i]||s>C.current[i])&&(C.current[i]=s),(!h.current[i]||s<h.current[i])&&(h.current[i]=s)},[V,i]);const We=o.useCallback(()=>{if((m==null?void 0:m.length)>0){const t=m.find(s=>s.symbol==="USDT");me((t==null?void 0:t.amount)||0)}},[m]);o.useEffect(()=>{We()},[We]),o.useEffect(()=>{l(K.doFetchPending()),l(st.doFetch())},[l]);const d=fe[i],nt=o.useMemo(()=>d?{symbol:d.symbol,entryPrice:d.entryPrice,targetPrice:d.targetPrice,startedAt:d.startedAt,durationMs:d.durationMs,seed:d.seed}:null,[d==null?void 0:d.symbol,d==null?void 0:d.startedAt,d==null?void 0:d.targetPrice,d==null?void 0:d.durationMs,d==null?void 0:d.entryPrice,d==null?void 0:d.seed]),$e=d?At(d):null,he=o.useCallback((t,s)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s??5)},[]);o.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const s=new Date(t);if(isNaN(s.getTime()))return t;const a=new Date;return s.toDateString()===a.toDateString()?p("pages.history.dateFormats.today",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})):p("pages.history.dateFormats.yesterday",s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}catch{return t}},[]);const at=o.useCallback(t=>{if(!t)return p("pages.assetsDetail.status.pending");try{const s=new Date(t);return isNaN(s.getTime())?t:`${s.toLocaleDateString([],{year:"numeric",month:"short",day:"numeric"})} ${s.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}`}catch{return t}},[]),rt=o.useCallback((t,s=2)=>{if(t==null)return"0.00";const a=typeof t=="string"?parseFloat(t):t;return isNaN(a)?"0.00":a.toFixed(s)},[]),ye=(t,s="market")=>{Ae(t),Ue(s),Te(R?`Insufficient balance. Required: $${_}, Available: $${z.toFixed(2)}`:null),Z(!0)},it=async()=>{var t,s,a,S;if(!(!(x!=null&&x.id)||r===null)){Ge(!0),Te(null);try{const j={orderType:v,symbol:i,symbolName:je,direction:J,lots:O,multiplier:L,takeProfit:g?w:null,stopLoss:n?f:null};v==="market"?j.entryPrice=r:(j.targetPrice=Y,j.referencePrice=r),await St.post(`/tenant/${x.id}/trade-orders`,j),me($=>Math.max(0,$-Me)),l(st.doFetch()),Z(!1),Le.current&&clearTimeout(Le.current),ze({type:v,direction:J,symbol:i}),Le.current=setTimeout(()=>ze(null),4e3)}catch(j){const $=((S=(a=(s=(t=j==null?void 0:j.response)==null?void 0:t.data)==null?void 0:s.errors)==null?void 0:a[0])==null?void 0:S.message)||"Failed to place order. Please try again.";Te($)}finally{Ge(!1)}}},lt=()=>de(!0),ct=()=>de(!1),dt=t=>{P(null),X(t),de(!1)},ut=()=>{ce(!1),te(null)},pt=()=>{y(!1),ue(null)},je=o.useMemo(()=>{const t=ot.find(s=>s.symbol===i);return(t==null?void 0:t.name)||i.replace(/(.{3})(.{3})/,"$1 / $2")},[i]),mt=o.useMemo(()=>Ut(i)||{symbol:i,name:je},[i,je]),ft=C.current[i]??r??0,xt=h.current[i]??r??0,U=o.useMemo(()=>{const t=r??1;return t>=1e4?1:t>=100?.01:t>=10?.001:1e-5},[r]),Xe=o.useCallback(t=>{if(t===0)return"0";const s=r??t;return s>=1e4?t.toFixed(2):s>=100||s>=10?t.toFixed(3):t.toFixed(5)},[r]),Ze=o.useCallback(t=>{u(t),b(t&&r!==null?r:0)},[r]),qe=o.useCallback(t=>{ne(t),A(t&&r!==null?r:0)},[r]),Ne=t=>{n&&b(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},ke=t=>{g&&A(s=>{const a=s+t;return a<0?0:+a.toFixed(10)})},ve=t=>{G(s=>Math.max(.01,+(s+t).toFixed(2)))},He=t=>{Ee(s=>{const a=s+t;return a<=0?0:+a.toFixed(10)})};o.useEffect(()=>{T==="pendingOrders"&&r!==null&&Y===0&&Ee(r)},[T,r]);const bt=`1 Lots = 100 ${i}`,gt="0.000012",_=o.useMemo(()=>{const t=r??0,s=L/100,a=t*100*O/s;return a===0?"0.00":a>=1e4?a.toFixed(2):a>=100?a.toFixed(3):a>=10?a.toFixed(4):a.toFixed(5)},[O,r,L]),Me=parseFloat(_)||0,R=z<Me&&Me>0;return e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-top",children:[e.jsxs("div",{className:"market-info",children:[e.jsx(Tt,{pair:mt,size:"md"}),e.jsx("div",{className:"market-name",children:je}),e.jsx("div",{className:"market-change",style:{color:(B??0)<0?"#ff4d4d":"#36f936"},children:r!==null?`${(B??0)>0?"+":""}${(B??0).toFixed(2)}%`:e.jsx("div",{className:"loading-placeholder",style:{width:"50px",height:"16px"}})})]}),e.jsx("div",{className:"additional-actions",onClick:lt,children:e.jsx("i",{className:"fas fa-filter"})})]}),e.jsx("div",{className:"market-price",style:{color:$e!=null?d&&d.targetPrice>=d.entryPrice?"#36f936":"#ff4d4d":(B??0)<0?"#ff4d4d":"#36f936"},children:$e!=null?`$${he($e)}`:r!==null?`$${he(r)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"120px",height:"28px"}})}),e.jsxs("div",{className:"market-stats",children:[e.jsxs("span",{children:[p("pages.marketDetail.stats.high"),":"," ",r!==null?`$${he(ft)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]}),e.jsxs("span",{children:[p("pages.marketDetail.stats.low"),":"," ",r!==null?`$${he(xt)}`:e.jsx("div",{className:"loading-placeholder",style:{width:"80px",height:"12px"}})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx(Pt,{symbol:i,livePrice:r,height:400,priceInjection:nt},i),e.jsxs("div",{className:"pill-tabs",children:[e.jsx("div",{className:`pill-tab ${T==="marketPrice"?"active":""}`,onClick:()=>we("marketPrice"),children:"Market Price"}),e.jsx("div",{className:`pill-tab ${T==="pendingOrders"?"active":""}`,onClick:()=>we("pendingOrders"),children:"Pending Orders"})]}),T==="marketPrice"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:L,onChange:t=>xe(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Ze(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ne(-U),disabled:!n,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:f,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&b(s)},disabled:!n,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>Ne(U),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:g,onChange:t=>qe(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ke(-U),disabled:!g,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:w,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&A(s)},disabled:!g,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>ke(U),disabled:!g,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ve(-.01),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:O,onChange:t=>{const s=parseFloat(t.target.value);G(isNaN(s)||s<.01?.01:Math.round(s*100)/100)},step:"0.01",min:"0.01"}),e.jsx("button",{className:"step-btn",onClick:()=>ve(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Each Lots"}),e.jsx("span",{className:"info-value",children:bt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Handling Fee"}),e.jsx("span",{className:"info-value",children:gt})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsxs("span",{className:"info-value",style:{color:R?"#ff4d4d":void 0},children:["$",_]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsxs("span",{className:"info-value",children:["$",z.toFixed(2)]})]})]}),R&&e.jsxs("div",{className:"balance-insufficient-msg",children:["⚠ Insufficient balance. Need $",_,", you have $",z.toFixed(2),"."]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ye("buy"),disabled:r===null||R,children:p("pages.futures.actions.buyUp")}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ye("sell"),disabled:r===null||R,children:p("pages.futures.actions.buyDown")})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"trading-form",children:[e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Multiplier"}),e.jsx("select",{className:"multiplier-select",value:L,onChange:t=>xe(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsxs("option",{value:t,children:[t,"×"]},t))})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Trigger Price"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>He(-U),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:Y,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&Ee(s)},step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>He(U),children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:n,onChange:t=>Ze(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Set Loss"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>Ne(-U),disabled:!n,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:f,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&b(s)},disabled:!n,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>Ne(U),disabled:!n,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("div",{className:"checkbox-container",children:e.jsx("input",{type:"checkbox",checked:g,onChange:t=>qe(t.target.checked),className:"form-checkbox"})}),e.jsx("span",{className:"form-label",children:"Take Profit"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ke(-U),disabled:!g,children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:w,onChange:t=>{const s=parseFloat(t.target.value);!isNaN(s)&&s>=0&&A(s)},disabled:!g,step:"any",min:"0"}),e.jsx("button",{className:"step-btn",onClick:()=>ke(U),disabled:!g,children:"+"})]})]}),e.jsxs("div",{className:"form-row",children:[e.jsx("span",{className:"form-label",children:"Lots (Step:0.01)"}),e.jsxs("div",{className:"stepper",children:[e.jsx("button",{className:"step-btn",onClick:()=>ve(-.01),children:"−"}),e.jsx("input",{type:"number",className:"step-value",value:O,onChange:t=>{const s=parseFloat(t.target.value);G(isNaN(s)||s<.01?.01:Math.round(s*100)/100)},step:"0.01",min:"0.01"}),e.jsx("button",{className:"step-btn",onClick:()=>ve(.01),children:"+"})]})]})]}),e.jsx("div",{className:"form-divider"}),e.jsxs("div",{className:"info-section",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Current Price"}),e.jsx("span",{className:"info-value",children:r!==null?r.toFixed(5):"—"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Trigger at"}),e.jsx("span",{className:"info-value",style:{color:"#106cf5"},children:Xe(Y)})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Estimated Margin"}),e.jsxs("span",{className:"info-value",style:{color:R?"#ff4d4d":void 0},children:["$",_]})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Balance"}),e.jsxs("span",{className:"info-value",children:["$",z.toFixed(2)]})]})]}),R&&e.jsxs("div",{className:"balance-insufficient-msg",children:["⚠ Insufficient balance. Need $",_,", you have $",z.toFixed(2),"."]}),e.jsxs("div",{className:"future-action-buttons",children:[e.jsx("button",{className:"action-button buy-button",onClick:()=>ye("buy","pending"),disabled:r===null||Y<=0||R,children:"Buy Pending"}),e.jsx("button",{className:"action-button sell-button",onClick:()=>ye("sell","pending"),disabled:r===null||Y<=0||R,children:"Sell Pending"})]})]}),oe&&D&&e.jsx(Lt,{selectedOrder:D,onClose:pt,formatDateTimeDetailed:at,safeToFixed:rt})]}),ae&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"confirm-overlay",onClick:()=>!be&&Z(!1)}),e.jsxs("div",{className:"confirm-sheet",children:[e.jsx("div",{className:"confirm-handle"}),e.jsx("div",{className:"confirm-title",children:v==="market"?"Confirm Market Order":"Confirm Pending Order"}),e.jsxs("div",{className:"confirm-summary",children:[e.jsxs("span",{className:`confirm-dir ${J==="buy"?"buy":"sell"}`,children:[J==="buy"?"Buy":"Sell",v==="pending"?" Pending":""]}),e.jsx("span",{className:"confirm-pair",children:i}),e.jsxs("span",{className:"confirm-meta",children:[O.toFixed(2)," Lots · ",L,"×"]}),v==="market"?e.jsxs("span",{className:"confirm-price",children:["@ ",r!==null?r.toFixed(5):"—"," (market)"]}):e.jsxs("span",{className:"confirm-price",children:["Trigger @ ",Xe(Y)," · Now ",r!==null?r.toFixed(5):"—"]}),e.jsxs("span",{className:"confirm-margin",children:["Estimated Margin: ",e.jsxs("strong",{children:["$",_]})]})]}),Je&&e.jsx("div",{className:"confirm-error",children:Je}),e.jsxs("div",{className:"confirm-buttons",children:[e.jsx("button",{className:"confirm-btn-primary",onClick:it,disabled:be,children:be?"Placing…":"Confirmation"}),e.jsx("button",{className:"confirm-btn-secondary",onClick:()=>{Z(!1),N.push("/ordersPage")},disabled:be,children:"Order Page"})]})]})]}),e.jsx(zt,{isOpen:E,onClose:ut,direction:ee,dispatch:l,listAssets:m,selectedCoin:i,marketPrice:(r==null?void 0:r.toString())??"0",availableBalance:z,setOpeningOrders:Fe,isDemoAccount:Pe}),e.jsx(Ft,{isOpen:se,onClose:ct,selectedCoin:i,onCoinSelect:dt,availableCoins:ot.map(t=>({symbol:t.symbol,name:t.name})),title:p("pages.marketDetail.coinSelector.title")}),re&&e.jsxs("div",{className:"success-toast",onClick:()=>ze(null),children:[e.jsx("div",{className:"success-toast-icon",children:"✓"}),e.jsxs("div",{className:"success-toast-body",children:[e.jsx("div",{className:"success-toast-title",children:"Order Placed Successfully!"}),e.jsxs("div",{className:"success-toast-sub",children:[re.direction==="buy"?"Buy":"Sell"," ",re.type==="pending"?"Pending":"Market"," · ",re.symbol]}),e.jsx("div",{className:"success-toast-note",children:re.type==="market"?"Your position is now active. Track it in Orders.":"Your pending order is waiting for the trigger price."})]})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          padding: 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          color: white;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .market-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        .market-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .market-name {
          font-weight: 600;
          font-size: 17px;
          white-space: nowrap;
        }

        .market-change {
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          margin-left: 8px;
        }

        .additional-actions {
          color: rgba(255,255,255,0.8);
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        .additional-actions:hover {
          color: white;
        }

        .market-price {
          font-size: 24px;
          font-weight: 700;
          margin: 8px 0 4px;
          color: white;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          flex-wrap: wrap;
          gap: 8px;
        }

        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ✅ Pill-shaped tabs */
        .pill-tabs {
          display: flex;
          gap: 8px;
          margin-top: 0;
          padding: 0;
        }

        .pill-tab {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: #f0f2f5;
          color: #555;
          transition: all 0.2s;
        }

        .pill-tab.active {
          background: #106cf5;
          color: white;
          font-weight: 600;
        }

        /* ✅ Trading form */
        .trading-form {
          background: white;
          border-radius: 12px;
          padding: 0 4px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .form-label {
          flex: 0 0 100px;
          color: #555;
          font-weight: 500;
        }

        .multiplier-select {
          margin-left: auto;
          background: #f0f2f5;
          border: 1.5px solid #e0e3e8;
          border-radius: 8px;
          padding: 7px 28px 7px 14px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: border-color 0.2s, background-color 0.2s;
          min-width: 90px;
        }

        .multiplier-select:focus {
          border-color: #106cf5;
          background-color: #fff;
        }

        .checkbox-container {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
        }

        .step-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #ddd;
          background: #f8f9fb;
          border-radius: 6px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: all 0.2s;
        }

        .step-btn:hover:not(:disabled) {
          background: #e6efff;
        }

        .step-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .step-value {
          width: 80px;
          min-width: 60px;
          text-align: center;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 14px;
          border: 1.5px solid #e0e3e8;
          border-radius: 7px;
          padding: 5px 6px;
          background: #f8f9fb;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -moz-appearance: textfield;
        }
        .step-value::-webkit-inner-spin-button,
        .step-value::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .step-value:focus {
          border-color: #106cf5;
          background: #fff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.12);
        }
        .step-value:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f0f2f5;
        }

        .form-divider {
          height: 1px;
          background: #edeef1;
          margin: 4px 0;
        }

        /* Info section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .info-label {
          color: #777;
        }

        .info-value {
          color: #1a1a1a;
          font-weight: 500;
        }

        .future-action-buttons {
          display: flex;
          gap: 12px;
          margin: 6px 0 0;
        }

        .action-button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .buy-button { background: #36f936; color: white; }
        .sell-button { background: #ff4d4d; color: white; }

        .action-button:hover { opacity: 0.9; }

        /* Pending orders list */
        .pending-orders-container {
          margin-top: 4px;
        }

        .order-card {
          background: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .order-card:hover {
          background: #f0f2f5;
          transform: translateY(-1px);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .order-pair {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 15px;
        }

        .order-direction {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .order-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .order-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .order-status.open { color: #36f936; font-size: 12px; margin-bottom: 8px; }

        .order-details { border-top: 1px solid #edeef1; padding-top: 10px; }

        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 13px;
        }

        .order-label { color: #777; }
        .order-value { font-weight: 500; color: #1a1a1a; }

        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #999;
        }

        /* Loading placeholder */
        .loading-placeholder {
          animation: shimmer 1.4s infinite linear;
          background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Modals – dark style kept for contrast */
        .modal-overlays {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #1c1c1c;
          border-radius: 12px;
          width: 100%;
          
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid #2a2a2a;
          color: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .modal-header h2 { font-size: 18px; font-weight: 600; }

        .modal-close {
          background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer;
        }

        .modal-close:hover { color: #36f936; }

        .modal-body { padding: 20px; }

        .modal-footer {
          display: flex; justify-content: flex-end; padding: 20px; border-top: 1px solid #2a2a2a;
          gap: 10px;
        }

        .modal-button {
          background: #2a2a2a; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .modal-button:hover { background: #106cf5; }

        .close-order-button {
          background: #ff4d4d; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .close-order-button:hover { background: #ff3333; }

        .order-detail-section { margin-bottom: 20px; }

        .order-detail-section h3 {
          font-size: 14px; color: #aaaaaa; margin-bottom: 12px; text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
        }

        .detail-pair { font-weight: 600; font-size: 18px; color: #ffffff; }

        .detail-direction {
          font-size: 14px; padding: 4px 8px; border-radius: 4px; font-weight: 600;
        }

        .detail-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .detail-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .detail-status { font-size: 14px; margin-bottom: 15px; }
        .detail-status.open { color: #36f936; }
        .detail-status.closed { color: #999; }

        .detail-row {
          display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;
        }

        .detail-label { color: #aaaaaa; }
        .detail-value { font-weight: 500; color: #ffffff; }
        .detail-value.profit { color: #36f936; }
        .detail-value.loss { color: #ff4d4d; }

        /* ── Order Confirmation Modal ── */
        .confirm-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.55);
          z-index: 7999;
          animation: fadeIn 0.2s ease;
        }

        .confirm-sheet {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          
          background: white;
          border-radius: 24px 24px 0 0;
          padding: 20px 24px 40px;
          z-index: 8000;
          animation: slideUp 0.3s ease;
        }

        .confirm-handle {
          width: 40px; height: 4px;
          background: #ddd; border-radius: 2px;
          margin: 0 auto 20px;
        }

        .confirm-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 20px;
        }

        .confirm-summary {
          background: #f8f9fb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .confirm-dir {
          font-size: 16px;
          font-weight: 700;
        }
        .confirm-dir.buy  { color: #36c836; }
        .confirm-dir.sell { color: #ff4d4d; }

        .confirm-pair   { font-weight: 600; color: #1a1a1a; }
        .confirm-meta   { color: #666; }
        .confirm-price  { color: #106cf5; font-weight: 600; }
        .confirm-margin { color: #555; font-size: 13px; }
        .confirm-margin strong { color: #1a1a1a; }

        .balance-insufficient-msg {
          background: #fff3f3;
          border: 1px solid #ffb3b3;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #cc0000;
          font-weight: 500;
          text-align: center;
        }

        .confirm-error {
          color: #ff4d4d;
          font-size: 13px;
          text-align: center;
          margin-bottom: 12px;
        }

        .confirm-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .confirm-btn-primary {
          width: 100%;
          padding: 15px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .confirm-btn-primary:disabled { opacity: 0.6; cursor: default; }
        .confirm-btn-primary:hover:not(:disabled) { opacity: 0.9; }

        .confirm-btn-secondary {
          width: 100%;
          padding: 15px;
          background: white;
          color: #106cf5;
          border: 1.5px solid #106cf5;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .confirm-btn-secondary:disabled { opacity: 0.6; cursor: default; }
        .confirm-btn-secondary:hover:not(:disabled) { background: #f0f6ff; }

        @keyframes fadeIn  { from { opacity: 0; }               to { opacity: 1; } }
        @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }

        /* ── Success Toast ── */
        .success-toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 368px;
          background: #fff;
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(16,108,245,0.10);
          border-left: 5px solid #22c55e;
          z-index: 9999;
          cursor: pointer;
          animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .success-toast-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-toast-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .success-toast-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .success-toast-sub {
          font-size: 13px;
          font-weight: 600;
          color: #106cf5;
        }

        .success-toast-note {
          font-size: 12px;
          color: #666;
          margin-top: 2px;
          line-height: 1.4;
        }

        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)      scale(1);    }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header { padding: 16px; min-height: 50px; }
          .content-card { padding: 25px 16px 100px; }
        }
        @media (min-width: 768px) {
          .content-card { border-radius: 30px 30px 0 0; }
        }
      `})]})}const Lt=({selectedOrder:l,onClose:N,formatDateTimeDetailed:m,safeToFixed:x})=>e.jsx("div",{className:"modal-overlays",onClick:N,children:e.jsxs("div",{className:"modal-content",onClick:F=>F.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h2",{children:p("pages.futures.orderDetails.title")}),e.jsx("button",{className:"modal-close",onClick:N,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"order-detail-section",children:[e.jsxs("div",{className:"detail-header",children:[e.jsx("span",{className:"detail-pair",children:l.symbol||l.pair}),e.jsx("span",{className:`detail-direction ${l.futuresStatus==="long"||l.direction==="BUY UP"?"buy":"sell"}`,children:l.futuresStatus==="long"?p("pages.futures.actions.buyUp"):l.futuresStatus==="short"?p("pages.futures.actions.buyDown"):l.direction})]}),e.jsxs("div",{className:`detail-status ${l.finalized?"closed":"open"}`,children:["● ",l.finalized?p("pages.futures.orderDetails.closed"):p("pages.futures.orderDetails.open")]})]}),e.jsxs("div",{className:"order-detail-section",children:[e.jsx(M,{label:p("pages.futures.orderDetails.futuresAmount"),value:`${l.futuresAmount||l.investment} USD`}),l.contractDuration&&e.jsx(M,{label:p("pages.futures.orderDetails.contractDuration"),value:`${l.contractDuration} ${p("pages.futures.orderDetails.seconds")}`}),e.jsx(M,{label:p("pages.futures.orderDetails.futuresStatus"),value:l.closePositionTime?p("pages.futures.orderDetails.completed"):p("pages.futures.orderDetails.open")}),e.jsx(M,{label:p("pages.futures.orderDetails.openPositionPrice"),value:l.openPositionPrice||l.openPrice}),e.jsx(M,{label:p("pages.futures.orderDetails.openPositionTime"),value:m(l.openPositionTime||l.openTime)}),l.closePositionPrice&&e.jsx(M,{label:p("pages.futures.orderDetails.closePositionPrice"),value:l.closePositionPrice}),l.closePositionTime&&e.jsx(M,{label:p("pages.futures.orderDetails.closePositionTime"),value:m(l.closePositionTime)}),e.jsx(M,{label:p("pages.futures.orderDetails.profitLossAmount"),value:l.profitAndLossAmount||l.pnl?`${x(l.profitAndLossAmount||l.pnl,2)} USD`:"__",className:l.control==="profit"?"profit":"loss"}),e.jsx(M,{label:p("pages.futures.orderDetails.leverage"),value:`${l.leverage}X`})]})]}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"modal-button",onClick:N,children:p("pages.futures.orderDetails.done")})})]})}),M=({label:l,value:N,className:m=""})=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:l}),e.jsx("span",{className:`detail-value ${m}`,children:N})]});export{Gt as default};

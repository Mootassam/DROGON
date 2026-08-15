import{o as P,J as he,t as ve,K as ye,M as Z,i as o,n as s,x as Ye,N as Xe,O as ee,P as Ne,Q as ae,j as e,L as Ze,S as ea}from"./index-a80de294.js";import{C as aa}from"./CoinSelectorSidebar-34c160aa.js";import{u as ta}from"./useDispatch-dda924b7.js";const m=l=>{if(l==null||l==="")return NaN;const N=Number(l);return Number.isFinite(N)?N:NaN},sa=["EUR/USD","GBP/USD","USD/JPY","AUD/USD","USD/CAD","USD/CHF","NZD/USD"],ra=[{value:30,label:"30s - 20%"},{value:60,label:"60s - 30%"},{value:120,label:"120s - 50%"},{value:86400,label:"24h - 60%"},{value:172800,label:"48h - 70%"},{value:259200,label:"72h - 80%"},{value:604800,label:"7d - 90%"},{value:1296e3,label:"15d - 100%"}],oa=["1","2","3","5","10","20","50","100"],je=(l,N,F=!0)=>{const w=o.useRef(null),y=o.useRef(N);return o.useEffect(()=>{y.current=N},[N]),o.useEffect(()=>{if(!F||!l){w.current&&(w.current.close(),w.current=null);return}try{const j=new WebSocket(l);return w.current=j,j.onopen=()=>{console.log(s("pages.trade.websocketConnected"),l)},j.onmessage=M=>{try{const L=JSON.parse(M.data);y.current(L)}catch(L){console.error(s("pages.trade.websocketParseError"),L)}},j.onerror=M=>{console.error(s("pages.trade.websocketError"),M)},j.onclose=()=>{console.log(s("pages.trade.websocketClosed"))},()=>{j.readyState===WebSocket.OPEN&&j.close()}}catch(j){console.error(s("pages.trade.websocketCreateError"),j)}},[l,F]),w},ke=({onPercentageSelect:l,currentPercentage:N=0})=>{const F=[0,25,50,75,100],w=y=>{l(y/100)};return e.jsxs("div",{className:"percentage-progress-bar",children:[e.jsx("div",{className:"progress-bar-labels",children:F.map(y=>e.jsxs("span",{className:"progress-label",children:[y,"%"]},y))}),e.jsxs("div",{className:"progress-bar-track",children:[e.jsx("div",{className:"progress-bar-fill",style:{width:`${N}%`}}),e.jsx("div",{className:"progress-bar-markers",children:F.map(y=>e.jsx("div",{className:`progress-marker ${y<=N?"active":""}`,onClick:()=>w(y)},y))})]})]})};function da(){const l=ta(),N=P(he.selectRows)||[],F=P(ve.selectRows)||[],w=P(ye.selectRows)||[],y=P(Z.selectRows)||[],j=P(Z.pendingRows),M=P(he.selectLoading),L=P(Z.selectLoading),te=P(ye.selectLoading),we=P(ve.selectLoading),[x,Fe]=o.useState("EUR/USD"),[g,Se]=o.useState("0"),[ia,Ce]=o.useState("0"),[Pe,O]=o.useState(!1),[v,Te]=o.useState("LIMIT"),[A,se]=o.useState("0"),[re,z]=o.useState(""),[b,T]=o.useState(""),[f,Q]=o.useState("buy"),[I,De]=o.useState({asks:[],bids:[]}),[U,_]=o.useState(!1),[oe,S]=o.useState(""),[u,Ae]=o.useState("Positions"),[n,Me]=o.useState("trade"),[G,Le]=o.useState("10"),[J,ze]=o.useState("30"),[c,ie]=o.useState(null),[Ue,ne]=o.useState(!1),le=o.useRef(null),R=o.useRef(!0),ce=o.useRef(x),h=o.useCallback((a,t=2)=>{const i=Number(a);return Number.isFinite(i)?i.toLocaleString(void 0,{minimumFractionDigits:t,maximumFractionDigits:t}):0 .toFixed(t)},[]),D=o.useCallback(a=>{const t=Number(a);return Number.isFinite(t)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(t):s("common.currencyFormat","0.00")},[]),V=o.useCallback(a=>{try{return new Date(a).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return s("common.invalidDate")}},[]),E=o.useCallback(a=>{try{return new Date(a).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}catch{return s("common.invalidTime")}},[]),de=o.useCallback(a=>a?a<60?`${a}s`:a<3600?`${Math.floor(a/60)}m`:a<86400?`${Math.floor(a/3600)}h`:a<604800?`${Math.floor(a/86400)}d`:`${Math.floor(a/86400)}d`:"N/A",[]),C=o.useMemo(()=>x.split("/")[0],[x]),H=o.useMemo(()=>{if(!Array.isArray(F))return{};const a={};for(const t of F)t.symbol&&t.amount&&(a[t.symbol]=Number(t.amount)||0);return a},[F]),d=o.useMemo(()=>n==="trade"||f==="buy"?H.USD||0:H[C]||0,[n,f,C,H]),ue=o.useMemo(()=>{if(n==="trade"){const a=m(b);return!Number.isFinite(a)||a<=0||d<=0?0:Math.min(100,a/d*100)}else if(f==="buy"){const a=m(b);return!Number.isFinite(a)||a<=0||d<=0?0:Math.min(100,a/d*100)}else{const a=m(b),t=m(g);if(!Number.isFinite(a)||a<=0||!Number.isFinite(t)||t<=0||d<=0)return 0;const i=a/t;return Math.min(100,i/d*100)}},[n,f,b,d,g]),Ee=o.useMemo(()=>n==="trade"?`${s("pages.trade.available")}: ${h(d,2)} USD`:f==="buy"?`${s("pages.trade.available")}: ${h(d,2)} USD`:`${s("pages.trade.available")}: ${h(d,6)} ${C}`,[n,f,d,C,h]),$e=o.useMemo(()=>U?s("pages.trade.placing"):n==="trade"?`${f==="buy"?s("pages.trade.long"):s("pages.trade.short")} (USD)`:`${f==="buy"?s("pages.trade.buy"):s("pages.trade.sell")} ${C}`,[U,n,f,C]),Oe=o.useMemo(()=>`wss://stream.binance.com:9443/ws/${x.replace("/","").toLowerCase()}@ticker`,[x]),Ie=o.useMemo(()=>`wss://stream.binance.com:9443/ws/${x.replace("/","").toLowerCase()}@depth20@100ms`,[x]),Re=o.useCallback(a=>{a.c!==void 0&&Se(a.c),a.P!==void 0&&Ce(a.P)},[]),Be=o.useCallback(a=>{const t=(a.asks||[]).slice(0,5).map(r=>({price:r[0],amount:r[1]})),i=(a.bids||[]).slice(0,5).map(r=>({price:r[0],amount:r[1]}));De({asks:t,bids:i})},[]);je(Oe,Re,R.current),je(Ie,Be,R.current);const $=o.useCallback(a=>{const t=m(a),i=m(n==="perpetual"&&v==="LIMIT"?A:g);if(Number.isFinite(t)&&Number.isFinite(i)&&i>0){const r=t/i;z(r.toFixed(8))}else z("")},[n,v,A,g]);o.useEffect(()=>(R.current=!0,l(Ye.doFetch(n)),()=>{R.current=!1,le.current&&le.current.abort()}),[l,n]),o.useEffect(()=>{if(!R.current)return;const t=setTimeout(()=>{if(u==="Transaction history"){l(ea.doFetch());return}n==="perpetual"?u==="Positions"?l(ae.doFetchPending()):u==="History orders"&&l(ae.doFetch()):n==="trade"&&(u==="Positions"?l(ee.doFetchPending()):u==="History orders"&&l(ee.doFetch()))},100);return()=>clearTimeout(t)},[l,n,u]),o.useEffect(()=>{g&&g!=="0"&&(se(g),b&&!isNaN(Number(b))&&$(b))},[g,b,$]),o.useEffect(()=>{ce.current!==x&&(z(""),T(""),ce.current=x)},[x]);const pe=o.useCallback(a=>{const i=a.target.value.replace(/[^\d.]/g,""),r=i.split(".");if(r.length>2){const p=r[0]+"."+r.slice(1).join("");T(p)}else T(i);i!==""?$(i):z("")},[$]),Ke=o.useCallback(a=>{const t=a.target.value;se(t),b&&!isNaN(Number(b))&&$(b)},[b,$]),me=o.useCallback(a=>{if(n==="trade"){const t=d,i=t*a,r=Math.min(i,t),p=parseFloat(r.toFixed(8));T(p.toString())}else if(f==="buy"){const t=d,i=t*a,r=Math.min(i,t),p=parseFloat(r.toFixed(8));T(p.toString())}else{const t=d,i=t*a,r=m(g)||m(A)||1,p=i*r,k=t*r,K=Math.min(p,k),W=parseFloat(K.toFixed(8));T(W.toString())}},[n,f,d,g,A]),fe=o.useCallback(async a=>{const t=parseFloat(g||"0")||0,r={futuresStatus:f==="buy"?"long":"short",profitAndLossAmount:"",leverage:parseInt(G,10),control:"loss",operate:"low",futureCoin:x,closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:t,contractDuration:J,futuresAmount:a.toFixed(8)};try{const p=await l(Xe.doCreate(r)),k=p!=null&&p.id?p:p==null?void 0:p.payload;return k!=null&&k.id?(z(""),T(""),u==="Positions"&&l(ee.doFetchPending()),k):null}catch(p){throw console.error(s("pages.trade.errors.createError"),p),p}},[g,f,G,x,J,l,u]),Qe=o.useCallback(()=>O(!0),[]);o.useCallback(()=>O(!1),[]);const _e=o.useCallback(a=>{if(!a||a===x){O(!1);return}Fe(a),O(!1)},[x]),Ve=o.useCallback(a=>{ie(a),ne(!0)},[]),xe=o.useCallback(()=>{ne(!1),setTimeout(()=>{ie(null)},300)},[]),ge=o.useCallback(()=>{const a=Date.now().toString(36),t=Math.floor(Math.random()*1e6).toString(36);return s("pages.trade.orderNumberFormat",a,t)},[]),Y=o.useCallback((a,t,i=1e-6)=>Math.abs(a-t)<=i,[]),He=o.useCallback(async()=>{if(S(""),!U)if(n==="trade"){const a=m(b);if(!Number.isFinite(a)||a<=0){S(s("pages.trade.errors.invalidAmount"));return}if(a>d+1e-6){S(s("pages.trade.errors.insufficientUSD",h(d,2)));return}const t=Y(a,d)?d:a;_(!0);try{await fe(t)}catch(i){console.error(s("pages.trade.errors.createError"),i),S(s("pages.trade.errors.failedOrder"))}finally{_(!1)}}else{const a=m(v==="MARKET"?g:A),t=m(re);if(!Number.isFinite(t)||t<=0){S(s("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(a)||a<=0){S(s("pages.trade.errors.invalidPrice"));return}if(f==="buy"){if(a*t>d+1e-6){S(s("pages.trade.errors.insufficientUSD",h(d,2)));return}}else if(t>d+1e-6){S(s("pages.trade.errors.insufficientCoin",h(d,6),C));return}_(!0);try{const i=a,k=i*t*.001,K=Y(t,d)?d:t,W=i*K,Je={orderNo:ge(),orderType:v.toLowerCase(),tradingPair:x,status:v==="MARKET"?"completed":"pending",direction:f.toUpperCase(),delegateType:v,delegateState:v==="MARKET"?"Filled":"Pending",orderQuantity:K,commissionPrice:i,entrustedValue:W,transactionQuantity:v==="MARKET"?K:0,transactionValue:v==="MARKET"?W:0,closingPrice:v==="MARKET"?i:0,handlingFee:v==="MARKET"?k:0,commissionTime:new Date().toISOString(),closingTime:v==="MARKET"?new Date().toISOString():null};await l(Ne.doCreate(Je)),z(""),T(""),u==="Positions"&&l(ae.doFetchPending())}catch(i){console.error(s("pages.trade.errors.placeOrderError"),i),S(s("pages.trade.errors.failedOrder"))}finally{_(!1)}}},[U,re,v,g,A,x,f,l,ge,d,C,h,n,b,u,fe,Y]),qe=o.useCallback(async(a,t)=>{t.status="canceled",l(Ne.doUpdate(a,t))},[l]),be=o.useMemo(()=>{const a=[...I.asks.map(t=>m(t.amount)),...I.bids.map(t=>m(t.amount))].filter(t=>Number.isFinite(t));return Math.max(...a,1)},[I]),We=o.useCallback((a,t,i)=>{const r={icon:"fa-exchange-alt",typeText:s("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:t==="in"?"#39FF14":"#FF6838"};switch(a){case"deposit":r.icon="fa-arrow-down",r.typeText=s("pages.history.transactionTypes.deposit"),r.iconClass="deposit",r.color="#F3BA2F",r.amountColor="#39FF14";break;case"withdraw":r.icon="fa-arrow-up",r.typeText=s("pages.history.transactionTypes.withdrawal"),r.iconClass="withdraw",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_profit":r.icon="fa-chart-line",r.typeText=s("pages.history.transactionTypes.futuresProfit"),r.iconClass="futures-profit",r.color="#39FF14",r.amountColor="#39FF14";break;case"futures_loss":r.icon="fa-chart-line",r.typeText=s("pages.history.transactionTypes.futuresLoss"),r.iconClass="futures-loss",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_reserved":r.icon="fa-clock",r.typeText=s("pages.history.transactionTypes.futuresReserved"),r.iconClass="futures-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;case"order_reserved":r.icon="fa-clock",r.typeText=s("pages.history.transactionTypes.orderReserved"),r.iconClass="order-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;default:r.icon="fa-exchange-alt",r.typeText=s("pages.history.transactionTypes.transaction"),r.iconClass="default",r.color="#627EEA",r.amountColor="#627EEA"}return r},[]),q=o.useCallback(a=>{const t={color:"#6c757d",bgColor:"#e9ecef",text:a||s("common.unknown")};switch(a==null?void 0:a.toLowerCase()){case"long":t.color="#39FF14",t.bgColor="rgba(57, 255, 20, 0.1)",t.text=s("pages.trade.futuresStatus.long");break;case"short":t.color="#f56c6c",t.bgColor="rgba(245, 108, 108, 0.1)",t.text=s("pages.trade.futuresStatus.short");break;case"closed":t.color="#106cf5",t.bgColor="rgba(16, 108, 245, 0.1)",t.text=s("pages.trade.futuresStatus.closed");break;case"liquidated":t.color="#dc3545",t.bgColor="rgba(220, 53, 69, 0.1)",t.text=s("pages.trade.futuresStatus.liquidated");break}return t},[]),X=o.useMemo(()=>u==="Transaction history"?te:n==="perpetual"?M:n==="trade"?L:!1,[u,n,M,L,te]),B=o.useMemo(()=>u==="Transaction history"?w:n==="perpetual"&&u==="Positions"?N.filter(a=>a.status==="pending"):n==="perpetual"&&u==="History orders"?N.filter(a=>a.status!=="pending"):n==="trade"&&u==="Positions"?j:n==="trade"&&u==="History orders"?y.filter(a=>a.closePositionTime):[],[u,n,N,y,w,j]),Ge=o.useMemo(()=>X?!1:B.length===0,[X,B]);return o.useCallback(a=>{var k;if(!a||!a.futuresAmount||!a.openPositionPrice||!g)return 0;const t=parseFloat(a.futuresAmount),i=parseFloat(a.openPositionPrice),r=m(g),p=parseInt(a.leverage||"1",10);return!t||!i||!r?0:((k=a.futuresStatus)==null?void 0:k.toLowerCase())==="long"?(r-i)/i*t*p:(i-r)/i*t*p},[g]),e.jsxs("div",{className:"trade-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsxs("div",{className:"back-arrow",onClick:Qe,children:[e.jsxs("div",{className:"trading-pair",children:[e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"}),x]}),e.jsx("div",{children:e.jsx("p",{style:{fontSize:10,color:"#aaaaaa"},children:n==="trade"?s("pages.trade.tradingMode.trade"):s("pages.trade.tradingMode.perpetual")})})]}),e.jsxs("div",{className:"header-right",children:[e.jsxs("select",{className:"trade-type-select",value:n,onChange:a=>Me(a.target.value),children:[e.jsx("option",{value:"trade",children:s("pages.trade.tradingMode.trade")}),e.jsx("option",{value:"perpetual",children:s("pages.trade.tradingMode.perpetual")})]}),e.jsx(Ze,{to:`market/detail/${x}`,className:"chart-icon",children:e.jsx("i",{className:"fas fa-chart-line"})})]})]})}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsxs("div",{className:"buy-sell-tabs",role:"tablist",children:[e.jsx("div",{role:"tab","aria-selected":f==="buy",tabIndex:0,className:`buy-tab ${f==="buy"?"active":""}`,onClick:()=>Q("buy"),onKeyDown:a=>a.key==="Enter"&&Q("buy"),children:s("pages.trade.long")}),e.jsx("div",{role:"tab","aria-selected":f==="sell",tabIndex:0,className:`sell-tab ${f==="sell"?"active":""}`,onClick:()=>Q("sell"),onKeyDown:a=>a.key==="Enter"&&Q("sell"),children:s("pages.trade.short")})]}),n==="trade"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.tradingPeriod")}),e.jsx("select",{className:"order-type-select",value:J,onChange:a=>ze(a.target.value),children:ra.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.leverage")}),e.jsx("select",{className:"order-type-select",value:G,onChange:a=>Le(a.target.value),children:oa.map(a=>e.jsxs("option",{value:a,children:[a,"x"]},a))})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USD)"]}),e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:b,onChange:pe,placeholder:"0.0",inputMode:"decimal","aria-label":s("pages.trade.amount")})}),e.jsx(ke,{onPercentageSelect:me,currentPercentage:ue})]})]}),n==="perpetual"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:s("pages.trade.orderType")}),e.jsxs("select",{className:"order-type-select",value:v,onChange:a=>Te(a.target.value),children:[e.jsx("option",{value:"LIMIT",children:s("pages.trade.limit")}),e.jsx("option",{value:"MARKET",children:s("pages.trade.market")})]})]}),v==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:s("pages.trade.price")}),e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:A,onChange:Ke,inputMode:"decimal","aria-label":s("pages.trade.price")})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USD)"]}),e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:b,onChange:pe,placeholder:"0.0",inputMode:"decimal","aria-label":s("pages.trade.amount")})}),e.jsx(ke,{onPercentageSelect:me,currentPercentage:ue})]})]}),e.jsx("div",{className:"balance-info",children:Ee}),oe&&e.jsx("div",{className:"error-message",role:"alert",children:oe}),e.jsx("button",{className:`action-button ${f==="buy"?"buy-button":"sell-button"}`,onClick:He,disabled:U||we,"aria-busy":U,children:$e})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:s("pages.trade.orderBook.price")}),e.jsxs("span",{children:[s("pages.trade.orderBook.amount")," (",C,")"]})]}),I.asks.map((a,t)=>{const i=m(a.amount)||0,r=Math.min(100,i/be*100);return e.jsxs("div",{className:"order-book-row ask-row",children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${r}%`}}),e.jsx("div",{className:"order-price",children:h(a.price,4)}),e.jsx("div",{className:"order-amount",children:h(a.amount,4)})]},`ask-${t}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",h(g,2)]})}),I.bids.map((a,t)=>{const i=m(a.amount)||0,r=Math.min(100,i/be*100);return e.jsxs("div",{className:"order-book-row bid-row",children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${r}%`}}),e.jsx("div",{className:"order-price",children:h(a.price,4)}),e.jsx("div",{className:"order-amount",children:h(a.amount,4)})]},`bid-${t}`)})]})]}),e.jsxs("div",{className:"orders-tabs",children:[e.jsx("div",{className:"orders-tabs-header",children:[s("pages.trade.tabs.positions"),s("pages.trade.tabs.historyOrders"),s("pages.trade.tabs.transactionHistory")].map(a=>e.jsx("div",{className:`orders-tab ${u===a?"active":""}`,onClick:()=>Ae(a),children:a},a))}),e.jsx("div",{className:"orders-tab-content",children:X?e.jsx("div",{className:"loading-skeleton",children:[...Array(3)].map((a,t)=>e.jsx("div",{className:"skeleton-item"},t))}):Ge?e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-inbox"})}),e.jsx("div",{className:"empty-text",children:s("pages.trade.noData",u.toLowerCase())}),e.jsx("div",{className:"empty-subtext",children:u===s("pages.trade.tabs.transactionHistory")?s("pages.trade.noTransactionsText"):s("pages.trade.noOrdersText",u.toLowerCase())})]}):u===s("pages.trade.tabs.transactionHistory")?e.jsx("div",{className:"transactions-list",children:B.map(a=>{const t=We(a.type,a.direction,a.relatedAsset),i=a.direction==="in"?"+":"-";return e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-icon",style:{backgroundColor:t.color},children:e.jsx("i",{className:`fas ${t.icon}`})}),e.jsxs("div",{className:"transaction-details",children:[e.jsxs("div",{className:"transaction-main",children:[e.jsx("div",{className:"transaction-type",children:t.typeText}),e.jsxs("div",{className:"transaction-amount",style:{color:t.amountColor},children:[i,h(a.amount,2)," ",a.asset]})]}),e.jsxs("div",{className:"transaction-secondary",children:[e.jsx("div",{className:"transaction-status",children:e.jsx("span",{className:`status-badge status-${a.status}`,children:a.status})}),e.jsxs("div",{className:"transaction-date",children:[V(a.createdAt)," ",E(a.createdAt)]})]})]})]},a.id??a._id)})}):n==="perpetual"?e.jsx("div",{className:"orders-list",children:B.map(a=>{var t;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:a.tradingPair}),e.jsx("span",{className:`order-action ${String((a==null?void 0:a.direction)||"").toLowerCase()}`,children:a.direction}),e.jsx("span",{className:"order-type-badge",children:a.orderType})]}),e.jsxs("div",{className:"order-date",children:[a.commissionTime?new Date(a.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:a.commissionTime?new Date(a.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.status")}),e.jsx("span",{className:`order-status ${String(a.status).toLowerCase()}`,children:a.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.price")}),e.jsxs("span",{className:"order-price-value",children:[h(a.commissionPrice,4)," USD"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.amount")}),e.jsxs("span",{className:"order-amount-value",children:[a.orderQuantity," ",(t=a==null?void 0:a.tradingPair)==null?void 0:t.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.total")}),e.jsxs("span",{className:"order-total",children:[h(a.entrustedValue)," USD"]})]})]}),e.jsx("div",{className:"order-actions",children:String(a.status).toLowerCase()==="pending"||String(a.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>qe(a.id,a),children:s("pages.trade.cancel")}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},a.id??a.orderNo)})}):e.jsx("div",{className:"futures-list",children:B.map(a=>{const t=q(a.futuresStatus),i=a.profitAndLossAmount?m(a.profitAndLossAmount):0,r=i>=0;return e.jsxs("div",{className:"future-item",onClick:()=>Ve(a),children:[e.jsxs("div",{className:"future-header",children:[e.jsxs("div",{className:"future-pair-status",children:[e.jsx("span",{className:"future-pair",children:a.futureCoin||s("common.unknown")}),e.jsx("span",{className:"future-status",style:{color:t.color,backgroundColor:t.bgColor},children:t.text})]}),e.jsxs("div",{className:"future-leverage",children:[a.leverage,"x"]})]}),e.jsxs("div",{className:"future-details",children:[e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.amount")}),e.jsx("span",{className:"detail-value",children:D(a.futuresAmount)})]}),e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.duration")}),e.jsx("span",{className:"detail-value",children:de(a.contractDuration)})]}),e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.entryPrice")}),e.jsx("span",{className:"detail-value",children:D(a.openPositionPrice)})]}),a.closePositionPrice&&e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.exitPrice")}),e.jsx("span",{className:"detail-value",children:D(a.closePositionPrice)})]}),(i!==0||a.profitAndLossAmount)&&e.jsxs("div",{className:"future-detail-row",children:[e.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.pnl")}),e.jsxs("span",{className:`detail-value ${r?"profit":"loss"}`,children:[r?"+":"",D(i)]})]})]}),e.jsxs("div",{className:"future-footer",children:[e.jsxs("div",{className:"future-timestamp",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.opened")}),e.jsx("div",{className:"timestamp-value",children:a.openPositionTime?E(a.openPositionTime):s("common.na")})]}),a.closePositionTime&&e.jsxs("div",{className:"future-timestamp",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),e.jsx("div",{className:"timestamp-value",children:E(a.closePositionTime)})]})]})]},a.id??a._id)})})})]})]}),e.jsx(aa,{isOpen:Pe,onClose:()=>O(!1),selectedCoin:x,onCoinSelect:_e,title:s("pages.trade.coinSelector.title"),pairs:sa}),e.jsx("div",{className:`modal-overlay ${Ue&&c?"active":""}`,onClick:xe,children:e.jsx("div",{className:"future-details-modal",onClick:a=>a.stopPropagation(),children:c&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h3",{className:"modal-title",children:[c.futureCoin||s("common.unknown"),e.jsxs("span",{className:"modal-leverage",children:[c.leverage,"x"]})]}),e.jsx("button",{className:"modal-close-btn",onClick:xe,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"modal-summary",children:[e.jsx("div",{className:"status-badge-large",style:{backgroundColor:q(c.futuresStatus).bgColor,color:q(c.futuresStatus).color},children:q(c.futuresStatus).text}),e.jsxs("div",{className:"pnl-summary",children:[e.jsx("div",{className:"pnl-title",children:s("pages.trade.futuresDetails.pnl")}),e.jsxs("div",{className:`pnl-amount ${(c.profitAndLossAmount?m(c.profitAndLossAmount):0)>=0?"profit":"loss"}`,children:[(c.profitAndLossAmount?m(c.profitAndLossAmount):0)>=0?"+":"",D(c.profitAndLossAmount?m(c.profitAndLossAmount):0)]})]})]}),e.jsxs("div",{className:"details-grid",children:[e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.amount")}),e.jsx("div",{className:"detail-value",children:D(c.futuresAmount)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.duration")}),e.jsx("div",{className:"detail-value",children:de(c.contractDuration)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.entryPrice")}),e.jsx("div",{className:"detail-value",children:D(c.openPositionPrice)})]}),c.closePositionPrice&&e.jsxs("div",{className:"detail-item",children:[e.jsx("div",{className:"detail-label",children:s("pages.trade.futuresDetails.exitPrice")}),e.jsx("div",{className:"detail-value",children:D(c.closePositionPrice)})]})]}),e.jsxs("div",{className:"timestamps-section",children:[e.jsxs("div",{className:"timestamp-item",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.opened")}),e.jsx("div",{className:"timestamp-value",children:c.openPositionTime?e.jsxs(e.Fragment,{children:[V(c.openPositionTime),e.jsx("span",{className:"timestamp-time",children:E(c.openPositionTime)})]}):s("common.na")})]}),c.closePositionTime&&e.jsxs("div",{className:"timestamp-item",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),e.jsxs("div",{className:"timestamp-value",children:[V(c.closePositionTime),e.jsx("span",{className:"timestamp-time",children:E(c.closePositionTime)})]})]}),c.contractDuration&&!c.closePositionTime&&e.jsxs("div",{className:"timestamp-item",children:[e.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),e.jsx("div",{className:"timestamp-value",children:(()=>{const a=new Date(c.openPositionTime),t=new Date(a.getTime()+parseInt(c.contractDuration)*1e3);return e.jsxs(e.Fragment,{children:[V(t.toISOString()),e.jsx("span",{className:"timestamp-time",children:E(t.toISOString())})]})})()})]})]})]})]})})}),e.jsx("style",{children:`
        /* Trade Container – matches profile/wallet theme */
        .trade-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          box-sizing: border-box;
        }

        /* Header */
        .header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .back-arrow {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .trading-pair {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
        }
        .dropdown-arrow {
          font-size: 12px;
          color: #39FF14;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .trade-type-select {
          font-size: 12px;
          padding: 6px 10px;
          background-color: #2a2a2a;
          color: #ffffff;
          border: 1px solid #3a3a3a;
          border-radius: 4px;
          cursor: pointer;
        }
        .trade-type-select:focus {
          outline: none;
          border-color: #39FF14;
        }
        .chart-icon {
          color: #ffffff;
          font-size: 18px;
          text-decoration: none;
        }
        .chart-icon:hover {
          color: #39FF14;
        }

        /* Main Content */
        .main-content {
          background-color: #1c1c1c;
          border-radius: 24px 24px 0 0;
          padding: 20px 16px 100px;
          flex: 1;
        }

        /* Trading Layout */
        .trading-layout {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          align-items: stretch;
        }

        /* Trade Form */
        .trade-form {
          width: 50%;
          display: flex;
          flex-direction: column;
        }

        /* Order Book */
        .order-book {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Percentage Progress Bar */
        .percentage-progress-bar {
          margin-top: 12px;
          width: 100%;
        }
        .progress-bar-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 10px;
          color: #aaaaaa;
          font-weight: 500;
        }
        .progress-label {
          width: 20%;
          text-align: center;
          cursor: pointer;
        }
        .progress-label:hover {
          color: #39FF14;
        }
        .progress-bar-track {
          position: relative;
          width: 100%;
          height: 4px;
          background-color: #2a2a2a;
          border-radius: 2px;
        }
        .progress-bar-fill {
          position: absolute;
          height: 100%;
          background-color: #39FF14;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .progress-bar-markers {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }
        .progress-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #1c1c1c;
          border: 2px solid #2a2a2a;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
        }
        .progress-marker:hover {
          transform: scale(1.2);
        }
        .progress-marker.active {
          background-color: #39FF14;
          border-color: #39FF14;
        }

        /* Orders Tabs */
        .orders-tabs {
          margin-top: 20px;
        }
        .orders-tabs-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 8px;
        }
        .orders-tab {
          font-size: 12px;
          cursor: pointer;
          color: #aaaaaa;
          padding: 4px 0;
        }
        .orders-tab.active {
          color: #39FF14;
          font-weight: 500;
          border-bottom: 2px solid #39FF14;
        }
        .orders-tab-content {
          min-height: 200px;
        }

        .loading-skeleton {
          padding: 10px 0;
        }
        .skeleton-item {
          height: 60px;
          background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Buy/Sell Tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 16px;
          background-color: #2a2a2a;
          border-radius: 4px;
          overflow: hidden;
        }
        .buy-tab, .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }
        .buy-tab {
          background-color: #2a2a2a;
          color: #aaaaaa;
        }
        .buy-tab.active {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .sell-tab {
          background-color: #2a2a2a;
          color: #aaaaaa;
        }
        .sell-tab.active {
          background-color: #f56c6c;
          color: #ffffff;
        }

        /* Order Type */
        .order-type {
          margin-bottom: 16px;
        }
        .order-type-label {
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .order-type-select {
          width: 100%;
          background-color: #2a2a2a;
          color: #ffffff;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          padding: 8px;
          font-size: 12px;
        }

        /* Input Fields */
        .input-group {
          margin-bottom: 16px;
        }
        .input-label {
          display: block;
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          padding: 4px;
        }
        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 12px;
          padding: 8px;
          outline: none;
        }
        .balance-info {
          font-size: 13px;
          color: #aaaaaa;
          margin-bottom: 16px;
          text-align: center;
          padding: 8px;
          background-color: #2a2a2a;
          border-radius: 6px;
        }

        /* Action Button */
        .action-button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          margin-top: auto;
        }
        .buy-button {
          background-color: #39FF14;
          color: #0f0f0f;
        }
        .sell-button {
          background-color: #f56c6c;
          color: #ffffff;
        }
        .action-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Order Book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #aaaaaa;
          padding: 0 8px;
          font-weight: 500;
        }
        .order-book-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 8px;
          font-size: 12px;
          cursor: pointer;
          position: relative;
          z-index: 1;
          border-radius: 4px;
        }
        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.2;
          z-index: -1;
          transition: width 0.3s ease;
        }
        .ask-depth {
          right: 0;
          background-color: #f56c6c;
        }
        .bid-depth {
          left: 0;
          background-color: #39FF14;
        }
        .order-book-row:hover {
          background-color: #2a2a2a;
        }
        .order-price {
          flex: 1;
          font-weight: 500;
        }
        .order-amount {
          flex: 1;
          text-align: right;
          color: #aaaaaa;
        }
        .ask-row .order-price {
          color: #f56c6c;
        }
        .bid-row .order-price {
          color: #39FF14;
        }
        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #2a2a2a;
          border-bottom: 1px solid #2a2a2a;
        }
        .current-price {
          font-weight: 600;
          color: #39FF14;
          font-size: 12px;
        }

        /* Future Item */
        .future-item {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #3a3a3a;
        }
        .future-item:hover {
          border-color: #39FF14;
        }

        /* Transaction Item */
        .transactions-list {
          padding: 0 4px;
        }
        .transaction-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #2a2a2a;
        }
        .transaction-item:last-child {
          border-bottom: none;
        }
        .transaction-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .transaction-icon i {
          color: #0f0f0f;
          font-size: 14px;
        }
        .transaction-details {
          flex: 1;
        }
        .transaction-main {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .transaction-type {
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
        }
        .transaction-amount {
          font-size: 12px;
          font-weight: 600;
        }
        .transaction-secondary {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .transaction-status {
          font-size: 10px;
        }
        .status-badge {
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 500;
        }
        .status-badge.status-completed,
        .status-badge.status-success {
          background-color: rgba(57, 255, 20, 0.1);
          color: #39FF14;
        }
        .status-badge.status-pending {
          background-color: rgba(255, 152, 0, 0.1);
          color: #ff9800;
        }
        .status-badge.status-failed,
        .status-badge.status-cancelled {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }
        .transaction-date {
          font-size: 10px;
          color: #aaaaaa;
        }

        /* Order Item */
        .orders-list {
          padding: 0 4px;
        }
        .order-item {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
        }
        .order-main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .order-pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .order-pair {
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
        }
        .order-action {
          font-size: 11px;
          padding: 3px 6px;
          border-radius: 3px;
          font-weight: 600;
        }
        .order-action.buy {
          background-color: rgba(57, 255, 20, 0.1);
          color: #39FF14;
        }
        .order-action.sell {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }
        .order-type-badge {
          font-size: 10px;
          color: #aaaaaa;
          background-color: #1c1c1c;
          padding: 2px 5px;
          border-radius: 3px;
        }
        .order-date {
          font-size: 11px;
          color: #aaaaaa;
        }
        .order-time {
          color: #888f99;
        }
        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }
        .order-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .detail-label {
          font-size: 11px;
          color: #aaaaaa;
        }
        .order-status {
          font-size: 11px;
          font-weight: 600;
        }
        .order-status.completed {
          color: #39FF14;
        }
        .order-status.cancelled {
          color: #f56c6c;
        }
        .order-status.pending {
          color: #ff9800;
        }
        .order-price-value, .order-amount-value, .order-total {
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
        }
        .order-actions {
          display: flex;
          justify-content: flex-end;
        }
        .cancel-order-btn {
          background-color: #f56c6c;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
        }
        .completed-indicator {
          color: #39FF14;
          font-size: 12px;
        }

        /* Futures List */
        .futures-list {
          padding: 0 4px;
        }
        .future-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .future-pair-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .future-pair {
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
        }
        .future-status {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 600;
        }
        .future-leverage {
          font-size: 11px;
          font-weight: 600;
          color: #39FF14;
          background-color: rgba(57, 255, 20, 0.1);
          padding: 3px 8px;
          border-radius: 12px;
        }
        .future-details {
          margin-bottom: 12px;
        }
        .future-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .detail-value {
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
        }
        .detail-value.profit {
          color: #39FF14;
        }
        .detail-value.loss {
          color: #f56c6c;
        }
        .future-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid #2a2a2a;
        }
        .future-timestamp {
          text-align: center;
        }
        .timestamp-label {
          font-size: 10px;
          color: #aaaaaa;
          margin-bottom: 2px;
        }
        .timestamp-value {
          font-size: 10px;
          font-weight: 600;
          color: #ffffff;
        }

        /* Empty State */
        .empty-orders {
          text-align: center;
          padding: 30px 0;
        }
        .empty-icon {
          font-size: 32px;
          color: #2a2a2a;
          margin-bottom: 10px;
        }
        .empty-text {
          color: #aaaaaa;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .empty-subtext {
          color: #777777;
          font-size: 12px;
        }

        /* Error Message */
        .error-message {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 13px;
          border: 1px solid #f56c6c;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.8);
          pointer-events: auto;
        }
        .future-details-modal {
          background-color: #1c1c1c;
          border-radius: 16px;
          width: 100%;
          max-width: 380px;
          max-height: 85vh;
          overflow-y: auto;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.3s ease;
          border-top: 2px solid #39FF14;
        }
        .modal-overlay.active .future-details-modal {
          transform: translateY(0);
          opacity: 1;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
          position: sticky;
          top: 0;
          background-color: #1c1c1c;
          border-radius: 16px 16px 0 0;
          z-index: 10;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .modal-leverage {
          font-size: 14px;
          color: #39FF14;
          background-color: rgba(57, 255, 20, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #aaaaaa;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
          background-color: #2a2a2a;
          color: #ffffff;
        }
        .modal-body {
          padding: 20px;
        }
        .modal-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .status-badge-large {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
        }
        .pnl-summary {
          text-align: right;
        }
        .pnl-title {
          font-size: 12px;
          color: #aaaaaa;
          margin-bottom: 4px;
        }
        .pnl-amount {
          font-size: 24px;
          font-weight: 700;
        }
        .pnl-amount.profit {
          color: #39FF14;
        }
        .pnl-amount.loss {
          color: #f56c6c;
        }
        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        .timestamps-section {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .timestamp-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .timestamp-item:last-child {
          margin-bottom: 0;
        }
        .timestamp-time {
          display: block;
          font-size: 11px;
          color: #aaaaaa;
          margin-top: 2px;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .trading-layout {
            gap: 8px;
          }
          .trade-form {
            width: 48%;
          }
        }
      `})]})}export{da as default};

import{v as ce,G as oe,at as le,j as i,n as t,H as de,o as p}from"./index-3ac739b4.js";import{i as Z,C as ue}from"./CustomTradingChart-0000894e.js";import{u as pe,c as me,g as xe,P as he,a as fe,b as be}from"./useSymbolInjections-28e1c89d.js";import{C as ge}from"./CoinSelectorSidebar-e7eaffa4.js";function ke(){const C=oe(),{id:O}=le(),f=i.useRef(null),z=i.useRef(null),N=i.useRef(null),P=i.useRef(null),$=i.useRef(O||"EURUSD"),[q,I]=i.useState([]),[m,F]=i.useState(null),[ee,T]=i.useState(null),S=i.useRef({}),[n,te]=i.useState(O||"EURUSD"),[b,L]=i.useState(null),[X,W]=i.useState([]),[v,G]=i.useState("orderBook"),[H,A]=i.useState(!1),[Ne,_]=i.useState(!0),r=pe()[n]??null,[,se]=i.useState(0);i.useEffect(()=>{const e=setInterval(()=>se(s=>s+1),1e3);return()=>clearInterval(e)},[]);const R=r?me(r):null,ae=i.useMemo(()=>r?{symbol:r.symbol,entryPrice:r.entryPrice,targetPrice:r.targetPrice,startedAt:r.startedAt,durationMs:r.durationMs,seed:r.seed}:null,[r==null?void 0:r.symbol,r==null?void 0:r.startedAt,r==null?void 0:r.targetPrice,r==null?void 0:r.durationMs,r==null?void 0:r.entryPrice,r==null?void 0:r.seed]);i.useEffect(()=>{$.current=n},[n]);const g=i.useCallback(e=>`~m~${e.length}~m~${e}`,[]),J=i.useCallback(e=>{const s=[];let a=e;for(;a.length>0&&a.startsWith("~m~");){const o=a.indexOf("~m~",3),d=parseInt(a.substring(3,o)),u=a.substring(o+3,o+3+d);s.push(u),a=a.substring(o+3+d)}return s},[]),K=i.useCallback(e=>{try{const s=e.replace(/^=\{/,"{");return JSON.parse(s).symbol||"UNKNOWN"}catch{return e}},[]),j=i.useCallback(e=>{const s=f.current,a=z.current;!s||s.readyState!==WebSocket.OPEN||!a||N.current!==e&&(N.current&&s.send(g(JSON.stringify({m:"quote_remove_symbols",p:[a,N.current]}))),s.send(g(JSON.stringify({m:"quote_add_symbols",p:[a,e]}))),N.current=e,I([]),F(null),T(null),_(!0),delete S.current[e])},[g]),E=i.useCallback(()=>{f.current&&(f.current.close(),f.current=null);const e=new WebSocket(xe());f.current=e,e.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);z.current=s,e.send(g(JSON.stringify({m:"quote_create_session",p:[s]}))),e.send(g(JSON.stringify({m:"quote_set_fields",p:[s,"ask","bid"]}))),j($.current)},e.onmessage=s=>{const a=s.data;if(a.startsWith("~h~")){e.send(a);return}J(a).forEach(d=>{try{const u=JSON.parse(d);if(u.m==="qsd"){const c=u.p[1],l=K(c.n),x=c.v;if(!x)return;const h={symbol:l,ask:x.ask??0,bid:x.bid??0};I(B=>[...B.filter(re=>re.symbol!==l),h])}}catch{}})},e.onclose=s=>{N.current=null,s.wasClean||(P.current=setTimeout(()=>{E()},3e3))},e.onerror=s=>{console.error("WebSocket error:",s)}},[g,J,K,j]);i.useEffect(()=>(E(),()=>{P.current&&clearTimeout(P.current),f.current&&(f.current.close(),f.current=null)}),[E]),i.useEffect(()=>{j(n)},[n,j]),i.useEffect(()=>{const e=q.find(a=>a.symbol===n);if(!e||!e.ask||!e.bid)return;const s=(e.ask+e.bid)/2;if(F(s),_(!1),S.current[n]===void 0)S.current[n]=s,T(0);else{const a=S.current[n],o=(s-a)/a*100;T(o)}},[q,n]);const k=i.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),w=i.useCallback((e,s)=>{if(e===null||isNaN(e))return"0.00000";const a=s?k(s):5;return e.toFixed(a)},[k]),M=i.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),D=i.useCallback((e,s)=>{const a=k(s),o=e*2e-4,d=[],u=[];for(let c=1;c<=10;c++){const l=e-o*c*(.5+Math.random()*.5),x=e+o*c*(.5+Math.random()*.5),h=Math.random()*1e6+5e5;d.push([Number(l.toFixed(a)),Number(h.toFixed(2))]),u.push([Number(x.toFixed(a)),Number(h.toFixed(2))])}return d.sort((c,l)=>l[0]-c[0]),u.sort((c,l)=>c[0]-l[0]),{lastUpdateId:Date.now(),bids:d,asks:u}},[k]),U=i.useCallback((e,s,a=10)=>{const o=[],d=k(s),u=Date.now();for(let c=0;c<a;c++){const l=Math.random()>.5?"buy":"sell",x=(Math.random()*2-1)*1e-4*e,h=e+x,B=Math.random()*1e5+5e4;o.push({id:`${u-c*1e3}-${c}`,price:Number(h.toFixed(d)),quantity:Number(B.toFixed(2)),time:u-c*1e3,side:l})}return o.sort((c,l)=>l.time-c.time)},[k]);i.useEffect(()=>{if(m===null)return;const e=setInterval(()=>{Z(n)&&(L(D(m,n)),W(U(m,n,10)))},2e3);return()=>clearInterval(e)},[m,n,D,U]),i.useEffect(()=>{m!==null&&(L(D(m,n)),W(U(m,n,10)))},[m,n,D,U]);const ie=he.map(e=>({symbol:e.symbol,name:e.name}));i.useCallback(()=>C.goBack(),[C]);const ne=e=>{if(e===n){A(!1);return}te(e),C.push(`/market/detail/${e}`)},V=()=>A(e=>!e),Q=i.useMemo(()=>fe(n)||{symbol:n,name:n.replace(/(.{3})(.{3})/,"$1 / $2")},[n]),y=({width:e="100%",height:s="1em"})=>t.jsx("div",{className:"loading-placeholder",style:{width:e,height:s}}),Y=i.useMemo(()=>{if(!b||!b.bids.length||!b.asks.length)return{buySide:[],sellSide:[]};const e=o=>{if(!o.length)return[];const d=o.map(l=>l[1]),u=Math.max(...d),c=Math.min(...d);return o.slice(0,10).map(l=>{const x=l[1];let h=u>c?(x-c)/(u-c)*100:0;return h=Math.max(h,10),{amount:M(x),price:w(l[0],n),intensity:Math.min(h,95)}})},s=e(b.bids),a=e(b.asks);for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});for(;a.length<10;)a.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:s,sellSide:a}},[b,n,w,M]);return t.jsxs("div",{className:"market-detail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(de,{className:"back-arrow",to:"/market",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsxs("div",{className:"trading-pair",onClick:V,children:[t.jsx(be,{pair:Q,size:"sm"}),Q.name,t.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${H?"rotate":""}`})]}),t.jsx("div",{className:"header-icon",onClick:V,children:t.jsx("i",{className:"fas fa-bars"})})]})}),t.jsxs("div",{className:"content-card",children:[(()=>{const e=R??m,s=r&&R!=null?(R-r.entryPrice)/r.entryPrice*100:null,a=s??ee,o=a!==null&&a<0,d=Z(n);return t.jsx("div",{className:"price-section",children:t.jsx("div",{className:"price-main-row",children:t.jsxs("div",{className:"price-left-section",children:[t.jsx("div",{className:"current-price",children:e!==null?t.jsx("span",{style:{color:o?"#f56c6c":"#37b66a"},children:w(e,n)}):t.jsx(y,{width:"120px",height:"28px"})}),t.jsxs("div",{className:"price-info-row",children:[t.jsx("div",{className:"usd-price",children:e!==null?`$${e.toFixed(2)}`:"$0.00"}),t.jsx("div",{className:"price-change",style:{color:o?"#f56c6c":"#37b66a"},children:a!==null?`${a<0?"−":"+"}${Math.abs(a).toFixed(2)}%`:t.jsx(y,{width:"60px",height:"16px"})}),!d&&t.jsxs("div",{className:"market-closed-badge",children:[t.jsx("span",{className:"dot"})," Market closed"]})]})]})})})})(),t.jsx("div",{className:"chart-section",children:t.jsx(ue,{symbol:n,livePrice:m,height:400,priceInjection:ae},n)}),t.jsxs("div",{className:"tabs-section",children:[t.jsxs("div",{className:"tabs-header",children:[t.jsx("div",{className:`tab ${v==="orderBook"?"active":""}`,onClick:()=>G("orderBook"),children:p("pages.marketDetail.tabs.orderBook")}),t.jsx("div",{className:`tab ${v==="transactions"?"active":""}`,onClick:()=>G("transactions"),children:p("pages.marketDetail.tabs.transactions")})]}),t.jsxs("div",{className:"tab-content",children:[v==="orderBook"&&t.jsx("div",{className:"modern-order-book",children:t.jsxs("div",{className:"order-book-table",children:[t.jsxs("div",{className:"table-header",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.buy")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")})]}),t.jsxs("div",{className:"sell-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",style:{textAlign:"right"},children:p("pages.marketDetail.orderBook.sell")})]})]}),t.jsx("div",{className:"table-body",children:Y.buySide.map((e,s)=>{const a=Y.sellSide[s]||{amount:"0.00",price:"0.00000",intensity:10};return t.jsxs("div",{className:"table-row",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"cell buy-cell",children:s+1}),t.jsx("div",{className:"cell quantity",children:e.amount}),t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),t.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),t.jsxs("div",{className:"sell-section",children:[t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${a.intensity}%`}}),t.jsx("span",{className:"price-value sell-price",children:a.price})]}),t.jsx("div",{className:"cell quantity",children:a.amount}),t.jsx("div",{className:"cell sell-cell",children:s+1})]})]},s)})})]})}),v==="transactions"&&t.jsxs("div",{className:"transactions-container",children:[t.jsxs("div",{className:"transactions-header",children:[t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.time")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.price")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.amount")})]}),t.jsx("div",{className:"transactions-list",children:X.length>0?X.slice(0,10).map(e=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),t.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:w(e.price,n)}),t.jsx("div",{className:"transaction-amount",children:M(e.quantity)})]},e.id)):Array.from({length:5}).map((e,s)=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:t.jsx(y,{width:"50px",height:"14px"})}),t.jsx("div",{className:"transaction-price",children:t.jsx(y,{width:"60px",height:"14px"})}),t.jsx("div",{className:"transaction-amount",children:t.jsx(y,{width:"50px",height:"14px"})})]},s))})]})]})]})]}),t.jsx(ge,{isOpen:H,onClose:()=>A(!1),selectedCoin:n,onCoinSelect:ne,availableCoins:ie,title:p("pages.marketDetail.coinSelector.title")}),t.jsx("style",{children:`
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

        .market-detail-container {
          
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

        .trading-pair {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trading-pair:hover {
          opacity: 0.9;
        }

        .dropdown-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .header-icon {
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .header-icon:hover {
          opacity: 0.8;
        }

        /* Content Card – white, rounded top, same as LoginPassword */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Price Section */
        .price-section {
          margin-bottom: 20px;
        }

        .price-main-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-left-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .current-price {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .usd-price {
          font-size: 14px;
          color: #888;
        }

        .price-change {
          font-size: 14px;
          font-weight: 500;
        }

        .market-closed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #8a94a6;
          background: #f0f2f5;
          border: 1px solid #e2e6ec;
          border-radius: 999px;
          padding: 2px 10px;
        }

        .market-closed-badge .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c0c6d0;
          display: inline-block;
        }

        /* Chart Section */
        .chart-section {
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e7eaee;
        }

        /* Tabs Section */
        .tabs-section {
          background-color: #fff;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          overflow: hidden;
        }

        .tabs-header {
          display: flex;
          border-bottom: 1px solid #e7eaee;
        }

        .tab {
          flex: 1;
          padding: 12px;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          color: #106cf5;
          border-bottom: 2px solid #106cf5;
          font-weight: 600;
        }

        .tab:hover:not(.active) {
          color: #333;
        }

        .tab-content {
          padding: 16px;
        }

        /* Order Book */
        .modern-order-book {
          width: 100%;
        }

        .order-book-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: flex;
          margin-bottom: 8px;
          font-size: 11px;
          color: #888;
          font-weight: 500;
        }

        .buy-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .sell-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .column-header {
          flex: 1;
          text-align: left;
        }

        .table-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .table-row {
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .cell {
          flex: 1;
          text-align: left;
          padding: 4px 0;
          color: #333;
        }

        .price-cell {
          position: relative;
          display: flex;
          align-items: center;
        }

        .heatmap-bar {
          position: absolute;
          left: 0;
          height: 100%;
          opacity: 0.12;
          z-index: 0;
          border-radius: 2px;
        }

        .buy-heatmap {
          background-color: #37b66a;
        }

        .sell-heatmap {
          background-color: #f56c6c;
        }

        .price-value {
          position: relative;
          z-index: 1;
        }

        .buy-price {
          color: #37b66a;
        }

        .sell-price {
          color: #f56c6c;
        }

        .buy-cell, .sell-cell {
          color: #888;
          font-size: 11px;
        }

        .quantity {
          color: #555;
        }

        /* Transactions */
        .transactions-container {
          width: 100%;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 11px;
          color: #888;
          border-bottom: 1px solid #e7eaee;
          margin-bottom: 8px;
        }

        .header-item {
          flex: 1;
          text-align: left;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          border-bottom: 1px solid #f0f2f5;
        }

        .transaction-time {
          flex: 1;
          color: #888;
        }

        .transaction-price {
          flex: 1;
          font-weight: 500;
        }

        .transaction-price.buy {
          color: #37b66a;
        }

        .transaction-price.sell {
          color: #f56c6c;
        }

        .transaction-amount {
          flex: 1;
          text-align: right;
          color: #333;
        }

        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #e9ebef;
          border-radius: 4px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 25px 16px 100px;
          }
          .current-price {
            font-size: 24px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}const Ue=ce.memo(ke);export{Ue as default};

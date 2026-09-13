import{o as ne,p as ie,i as p,I as v,j as s}from"./index-d369d33f.js";import{u as ae,a as oe,g as R,c as I,b as D,e as le}from"./useSymbolInjections-573c4bd4.js";const C=n=>`~m~${n.length}~m~${n}`;function ce(n){const a=[];let c=n;for(;c.length>0&&c.startsWith("~m~");){const g=c.indexOf("~m~",3),f=parseInt(c.substring(3,g));a.push(c.substring(g+3,g+3+f)),c=c.substring(g+3+f)}return a}function re(n){try{return JSON.parse(n.replace(/^=\{/,"{")).symbol??n}catch{return n}}function u(n){return n==null?"—":n>=1e4?n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):n>=100?n.toFixed(2):n>=10?n.toFixed(3):n.toFixed(5)}function z(n){return`${n>=0?"+":""}${n.toFixed(2)}`}function k(n){if(!n)return"—";try{const a=new Date(n);return`${a.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"})} ${a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch{return n}}function Y(n){if(!n)return"—";try{const a=new Date(n),c=g=>String(g).padStart(2,"0");return`${a.getFullYear()}-${c(a.getMonth()+1)}-${c(a.getDate())} ${c(a.getHours())}:${c(a.getMinutes())}:${c(a.getSeconds())}`}catch{return n}}function pe(n,a){if(!n.entryPrice)return 0;const c=n.direction==="buy"?a-n.entryPrice:n.entryPrice-a;return parseFloat((c*n.lots*100-n.fee).toFixed(5))}function de(n){if(!n.injectionStartedAt||!n.injectionDurationMs||n.injectionPnl==null)return null;const a=new Date(n.injectionStartedAt).getTime(),c=(Date.now()-a)/n.injectionDurationMs;return c>=1?null:Math.max(0,c)}function G(n,a){const c=de(n);return c!=null?parseFloat((n.injectionPnl*le(c)).toFixed(5)):a!=null?pe(n,a):null}const me=()=>{const n=ne(ie.selectCurrentTenant),a=n==null?void 0:n.id,[c,g]=p.useState("positions"),[f,E]=p.useState([]),[X,K]=p.useState(!0),[Q,_]=p.useState(null),[V,M]=p.useState(null),[o,A]=p.useState(null),[Z,B]=p.useState(null),[h,ee]=p.useState({}),b=ae(),y=p.useRef(null),U=p.useRef(null),P=p.useRef(new Set),$=p.useRef(null),W=p.useRef([]),L=p.useRef(new Set),O=p.useRef(new Set),x=p.useCallback(async()=>{if(a)try{const{data:e}=await v.get(`/tenant/${a}/trade-orders`);E((e==null?void 0:e.rows)??[])}catch{E([])}finally{K(!1)}},[a]);p.useEffect(()=>{x()},[x]),p.useEffect(()=>{const e=setInterval(()=>{x()},15e3);return()=>clearInterval(e)},[x]);const q=p.useCallback(e=>{const i=y.current,t=U.current;!i||i.readyState!==WebSocket.OPEN||!t||e.forEach(l=>{P.current.has(l)||(i.send(C(JSON.stringify({m:"quote_add_symbols",p:[t,l]}))),P.current.add(l))})},[]);p.useEffect(()=>{const e=[...new Set(f.filter(i=>i.status==="active"||i.status==="waiting").map(i=>i.symbol))];W.current=e,q(e)},[f,q]);const F=p.useCallback(()=>{y.current&&(y.current.close(),y.current=null);const e=new WebSocket(oe());y.current=e,e.onopen=()=>{const i="qs_"+Math.random().toString(36).substring(2,12);U.current=i,P.current=new Set,e.send(C(JSON.stringify({m:"quote_create_session",p:[i]}))),e.send(C(JSON.stringify({m:"quote_set_fields",p:[i,"lp","ask","bid"]}))),W.current.forEach(t=>{e.send(C(JSON.stringify({m:"quote_add_symbols",p:[i,t]}))),P.current.add(t)})},e.onmessage=i=>{const t=i.data;if(t.startsWith("~h~")){e.send(t);return}ce(t).forEach(l=>{try{const r=JSON.parse(l);if(r.m!=="qsd")return;const d=r.p[1],N=re(d.n),m=d.v;if(!m)return;let w=null;typeof m.lp=="number"&&m.lp>0?w=m.lp:typeof m.ask=="number"&&typeof m.bid=="number"&&m.ask>0&&(w=(m.ask+m.bid)/2),w!==null&&ee(T=>T[N]===w?T:{...T,[N]:w})}catch{}})},e.onclose=i=>{i.wasClean||($.current=setTimeout(F,3e3))},e.onerror=()=>{}},[]);p.useEffect(()=>(F(),()=>{var e;$.current&&clearTimeout($.current),(e=y.current)==null||e.close()}),[F]),p.useEffect(()=>{if(!a)return;const e=f.filter(t=>t.status==="active"),i=f.filter(t=>t.status==="waiting");e.forEach(t=>{const l=h[t.symbol];if(l==null)return;const r=t.id||t._id;if(L.current.has(r)||b[t.symbol])return;let d=null;t.takeProfit&&(t.direction==="buy"&&l>=t.takeProfit&&(d="tp"),t.direction==="sell"&&l<=t.takeProfit&&(d="tp")),!d&&t.stopLoss&&(t.direction==="buy"&&l<=t.stopLoss&&(d="sl"),t.direction==="sell"&&l>=t.stopLoss&&(d="sl")),d&&(L.current.add(r),v.put(`/tenant/${a}/trade-orders/${r}/close`,{closePrice:l,closeReason:d}).then(()=>x()).finally(()=>L.current.delete(r)))}),i.forEach(t=>{const l=h[t.symbol];if(l==null||t.targetPrice==null)return;const r=t.id||t._id;if(O.current.has(r))return;(t.triggerAbove?l>=t.targetPrice:l<=t.targetPrice)&&(O.current.add(r),v.put(`/tenant/${a}/trade-orders/${r}/execute`,{executionPrice:l}).then(()=>x()).finally(()=>O.current.delete(r)))})},[h,f,a,x,b]);const se=p.useCallback(async e=>{if(!a)return;const i=h[e.symbol],t=b[e.symbol],l=t&&i!=null?R(t):i;if(l==null)return;const r=e.id||e._id;_(r);try{await v.put(`/tenant/${a}/trade-orders/${r}/close`,{closePrice:l,closeReason:"manual"}),await x()}catch{alert("Failed to close position. Please try again.")}finally{_(null)}},[a,h,x,b]),te=p.useCallback(async e=>{if(!a)return;const i=e.id||e._id;M(i);try{await v.put(`/tenant/${a}/trade-orders/${i}/cancel`),await x()}catch{alert("Failed to cancel order. Please try again.")}finally{M(null)}},[a,x]),j=f.filter(e=>e.status==="active"),S=f.filter(e=>e.status==="waiting"),J=f.filter(e=>e.status==="closed"||e.status==="cancelled"),H=j.reduce((e,i)=>{const t=b[i.symbol],l=h[i.symbol]??null,r=t&&l!==null?R(t):l;return e+(G(i,r)??0)},0);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:ue}),s.jsxs("div",{className:"op-page",children:[s.jsx("div",{className:"op-header",children:s.jsx("div",{className:"op-title",children:"Orders"})}),s.jsxs("div",{className:"op-card",children:[s.jsxs("div",{className:"op-tabs",children:[s.jsxs("button",{className:`op-tab ${c==="positions"?"active":""}`,onClick:()=>g("positions"),children:["Positions",j.length>0&&s.jsx("span",{className:"op-badge",children:j.length})]}),s.jsxs("button",{className:`op-tab ${c==="pending"?"active":""}`,onClick:()=>g("pending"),children:["Pending",S.length>0&&s.jsx("span",{className:"op-badge",children:S.length})]}),s.jsx("button",{className:`op-tab ${c==="history"?"active":""}`,onClick:()=>g("history"),children:"History"})]}),X?s.jsx("div",{className:"op-skeleton-list",children:[1,2,3].map(e=>s.jsx("div",{className:"op-skeleton-row"},e))}):c==="positions"?s.jsxs(s.Fragment,{children:[j.length>0&&s.jsxs("div",{className:"op-summary",children:[s.jsx("span",{className:"op-summary-label",children:"Floating P&L"}),s.jsx("span",{className:`op-summary-val ${H>=0?"green":"red"}`,children:z(H)})]}),j.length===0?s.jsx("div",{className:"op-empty",children:"No open positions"}):j.map(e=>{const i=e.id||e._id,t=b[e.symbol],l=h[e.symbol]??null,r=t&&l!==null?R(t):l,d=G(e,r),N=Q===i,m=I(e.symbol)??{symbol:e.symbol,name:e.symbol};return s.jsxs("div",{className:"op-order-card",children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(D,{pair:m,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),e.orderType==="pending"&&s.jsx("span",{className:"op-tag op-tag-executed",children:"Executed"})]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]}),s.jsxs("span",{className:"op-lots",children:[e.multiplier,"×"]})]})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:u(e.entryPrice)}),s.jsx("span",{className:"op-arrow",children:"→"}),r!=null?s.jsx("span",{className:"op-live-price",children:u(r)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})})]}),(e.takeProfit||e.stopLoss)&&s.jsxs("div",{className:"op-sltp-row",children:[e.takeProfit&&s.jsxs("span",{className:"op-tp",children:["TP: ",u(e.takeProfit)]}),e.stopLoss&&s.jsxs("span",{className:"op-sl",children:["SL: ",u(e.stopLoss)]})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsxs("div",{className:"op-footer-left",children:[s.jsx("span",{className:`op-pnl ${d==null?"muted":d>=0?"green":"red"}`,children:d!=null?z(d):"—"}),s.jsx("span",{className:"op-date",children:k(e.openTime??e.createdAt)})]}),s.jsx("button",{className:"op-close-btn",onClick:()=>se(e),disabled:N||r==null,children:N?"Closing…":"Close Position"})]})]},i)})]}):c==="pending"?s.jsx(s.Fragment,{children:S.length===0?s.jsx("div",{className:"op-empty",children:"No pending orders"}):S.map(e=>{const i=e.id||e._id,t=h[e.symbol]??null,l=V===i,r=I(e.symbol)??{symbol:e.symbol,name:e.symbol},d=e.targetPrice&&e.referencePrice&&t!=null?(Math.abs(e.targetPrice-t)/e.referencePrice*100).toFixed(2):null;return s.jsxs("div",{className:"op-order-card",children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(D,{pair:r,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),s.jsx("span",{className:"op-tag op-tag-waiting",children:"Waiting"})]}),s.jsxs("div",{className:"op-badges",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-lots",children:[e.lots," Lots"]}),s.jsxs("span",{className:"op-lots",children:[e.multiplier,"×"]})]})]}),s.jsxs("div",{className:"op-pending-prices",children:[s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Trigger at"}),s.jsx("span",{className:"op-pending-target",children:u(e.targetPrice)})]}),s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Current price"}),t!=null?s.jsx("span",{className:"op-live-price",children:u(t)}):s.jsx("span",{className:"op-price-loading",children:s.jsx("span",{className:"op-dot-pulse"})})]}),d&&s.jsxs("div",{className:"op-pending-row",children:[s.jsx("span",{className:"op-pending-label",children:"Distance"}),s.jsxs("span",{className:"op-pending-dist",children:[d,"%"]})]})]}),(e.takeProfit||e.stopLoss)&&s.jsxs("div",{className:"op-sltp-row",children:[e.takeProfit&&s.jsxs("span",{className:"op-tp",children:["TP: ",u(e.takeProfit)]}),e.stopLoss&&s.jsxs("span",{className:"op-sl",children:["SL: ",u(e.stopLoss)]})]}),s.jsxs("div",{className:"op-order-footer",children:[s.jsx("div",{className:"op-footer-left",children:s.jsx("span",{className:"op-date",children:k(e.createdAt)})}),s.jsx("button",{className:"op-cancel-btn",onClick:()=>te(e),disabled:l,children:l?"Cancelling…":"Cancel Order"})]})]},i)})}):J.length===0?s.jsx("div",{className:"op-empty",children:"No order history yet"}):J.map(e=>{const i=e.id||e._id,t=e.pnl??0,l=I(e.symbol)??{symbol:e.symbol,name:e.symbol},r=Z===i,d=e.estimatedMargin??e.margin??0;return r?s.jsxs("div",{className:"op-detail-inline",children:[s.jsxs("div",{className:"op-di-head",children:[s.jsx("span",{className:"op-di-title",children:"Order Details"}),s.jsx("button",{className:"op-di-x",onClick:()=>B(null),children:"✕"})]}),s.jsxs("div",{className:"op-di-body",children:[s.jsxs("div",{className:"op-di-left",children:[s.jsx("div",{className:"op-di-sym",children:e.symbol}),s.jsxs("div",{className:"op-di-prices",children:[s.jsx("span",{className:"op-di-entry",children:u(e.entryPrice)}),e.closePrice!=null&&s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"op-di-arrow",children:" -> "}),s.jsx("span",{className:"op-di-close",children:u(e.closePrice)})]})]}),s.jsxs("div",{className:"op-di-meta",children:["Margin: ",Number(d).toFixed(3)]}),s.jsxs("div",{className:"op-di-meta",children:["Handling fee: ",Number(e.fee??0).toFixed(6)]}),s.jsxs("div",{className:"op-di-meta",children:["Orders ID #",e.orderNumber]}),s.jsx("div",{className:"op-di-meta",children:Y(e.openTime??e.createdAt)}),s.jsx("div",{className:"op-di-meta",children:Y(e.closeTime)})]}),s.jsxs("div",{className:"op-di-right",children:[s.jsxs("div",{className:"op-di-badges",children:[s.jsx("span",{className:`op-di-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{className:"op-di-lots",children:[e.lots," Lots"]})]}),e.status!=="cancelled"&&s.jsx("div",{className:`op-di-pnl ${t>=0?"green":"red"}`,children:Math.abs(t).toFixed(2)}),e.status==="cancelled"&&s.jsx("div",{className:"op-tag op-tag-cancelled",children:"Cancelled"})]})]})]},i):s.jsxs("div",{className:"op-history-card",onClick:()=>B(i),children:[s.jsxs("div",{className:"op-order-top",children:[s.jsxs("div",{className:"op-order-left",children:[s.jsx(D,{pair:l,size:"sm"}),s.jsx("span",{className:"op-sym",children:e.symbol}),e.status==="cancelled"&&s.jsx("span",{className:"op-tag op-tag-cancelled",children:"Cancelled"})]}),e.status!=="cancelled"&&s.jsx("span",{className:`op-pnl ${t>=0?"green":"red"}`,children:z(t)})]}),s.jsxs("div",{className:"op-price-row",children:[s.jsx("span",{className:"op-open-price",children:u(e.entryPrice)}),e.status!=="cancelled"&&e.closePrice&&s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"op-arrow",children:"→"}),s.jsx("span",{className:"op-live-price",children:u(e.closePrice)})]})]}),s.jsxs("div",{className:"op-hist-meta",children:[s.jsx("span",{className:`op-dir ${e.direction}`,children:e.direction==="buy"?"Buy":"Sell"}),s.jsxs("span",{children:[e.lots," Lots · ",e.multiplier,"×"]}),e.closeReason&&e.closeReason!=="manual"&&s.jsx("span",{className:`op-close-reason op-cr-${e.closeReason}`,children:e.closeReason.toUpperCase()}),s.jsx("span",{children:k(e.closeTime??e.createdAt)})]})]},i)})]})]}),o&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"op-overlay",onClick:()=>A(null)}),s.jsxs("div",{className:"op-detail-sheet",children:[s.jsx("div",{className:"op-detail-handle"}),s.jsx("button",{className:"op-detail-x",onClick:()=>A(null),children:"✕"}),s.jsx("div",{className:"op-detail-heading",children:"Order Details"}),[["Pair",o.symbol],["Direction",o.direction==="buy"?"Buy":"Sell",o.direction],["Order Type",o.orderType==="market"?"Market":"Pending"],["Status",o.status.charAt(0).toUpperCase()+o.status.slice(1)],["Lots",String(o.lots)],["Multiplier",`${o.multiplier}×`],["Margin",`$${(o.margin??0).toFixed(2)}`],["Fee",`$${(o.fee??0).toFixed(5)}`],o.entryPrice?["Open Price",u(o.entryPrice)]:null,o.closePrice?["Close Price",u(o.closePrice)]:null,o.targetPrice?["Trigger Price",u(o.targetPrice)]:null,o.status!=="cancelled"&&o.pnl!=null?["P&L",z(o.pnl),o.pnl>=0?"buy":"sell"]:null,o.takeProfit?["Take Profit",u(o.takeProfit)]:null,o.stopLoss?["Stop Loss",u(o.stopLoss)]:null,o.closeReason?["Close Reason",o.closeReason.toUpperCase()]:null,["Order #",o.orderNumber],["Opened",k(o.openTime??o.createdAt)],o.closeTime?["Closed",k(o.closeTime)]:null].filter(Boolean).map(([e,i,t])=>s.jsxs("div",{className:"op-detail-row",children:[s.jsx("span",{className:"op-detail-label",children:e}),s.jsx("span",{className:`op-detail-val ${t==="buy"?"green":t==="sell"?"red":""}`,children:i})]},e))]})]})]})},ue=`
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .op-page {
    max-width: 400px;
    margin: 0 auto;
    min-height: 100vh;
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .op-header {
    padding: 20px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .op-title {
    color: white;
    font-size: 17px;
    font-weight: 600;
  }

  .op-card {
    background: white;
    border-radius: 40px 40px 0 0;
    padding: 24px 16px 100px;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* Tabs */
  .op-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 4px;
  }
  .op-tab {
    flex: 1;
    padding: 10px 4px;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    background: #f0f2f5;
    color: #555;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .op-tab.active {
    background: #106cf5;
    color: white;
    font-weight: 600;
  }

  /* Count badge in tab */
  .op-badge {
    background: rgba(255,255,255,0.3);
    color: inherit;
    font-size: 10px;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 8px;
    min-width: 16px;
    text-align: center;
  }
  .op-tab:not(.active) .op-badge {
    background: #106cf5;
    color: white;
  }

  /* P&L summary banner */
  .op-summary {
    background: #f0f6ff;
    border: 1px solid #cce0ff;
    border-radius: 12px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .op-summary-label { font-size: 13px; color: #555; }
  .op-summary-val   { font-size: 20px; font-weight: 700; }

  /* Order cards */
  .op-order-card {
    background: #f8f9fb;
    border: 1px solid #edeef1;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .op-history-card {
    background: #f8f9fb;
    border: 1px solid #edeef1;
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .op-history-card:hover { background: #f0f2f5; transform: translateY(-1px); }

  /* ── Inline expanded detail (matches the order-details card) ── */
  .op-detail-inline {
    background: #fff;
    border: 1px solid #e7eaee;
    border-radius: 12px;
    padding: 14px 16px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  .op-di-head {
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid #f0f2f5; padding-bottom: 10px; margin-bottom: 12px;
  }
  .op-di-title { font-size: 16px; font-weight: 700; color: #1a1a1a; }
  .op-di-x {
    background: none; border: none; font-size: 16px; color: #999; cursor: pointer;
    width: 26px; height: 26px; border-radius: 6px;
  }
  .op-di-x:hover { background: #f0f2f5; color: #333; }
  .op-di-body { display: flex; justify-content: space-between; gap: 12px; }
  .op-di-left { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .op-di-sym { font-size: 14px; font-weight: 600; color: #1a1a1a; }
  .op-di-prices { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .op-di-entry { color: #1a1a1a; }
  .op-di-arrow { color: #999; }
  .op-di-close { color: #1a1a1a; }
  .op-di-meta { font-size: 12px; color: #9aa0a6; line-height: 1.6; }
  .op-di-right { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 10px; }
  .op-di-badges { display: flex; align-items: center; gap: 6px; }
  .op-di-dir { font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 6px; }
  .op-di-dir.buy  { background: #106cf5; color: #fff; }
  .op-di-dir.sell { background: #ff4d4d; color: #fff; }
  .op-di-lots { font-size: 12px; font-weight: 600; color: #106cf5; background: #e8f0ff; padding: 3px 8px; border-radius: 6px; }
  .op-di-pnl { font-size: 26px; font-weight: 800; }
  .op-di-pnl.green { color: #106cf5; }
  .op-di-pnl.red   { color: #ff4d4d; }

  /* Top row */
  .op-order-top  { display: flex; justify-content: space-between; align-items: center; }
  .op-order-left { display: flex; align-items: center; gap: 6px; }
  .op-sym        { font-size: 15px; font-weight: 600; color: #1a1a1a; }

  /* Tags */
  .op-tag {
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .op-tag-waiting   { background: #fff3cd; color: #856404; }
  .op-tag-executed  { background: #d1ecf1; color: #0c5460; }
  .op-tag-cancelled { background: #f8d7da; color: #721c24; }

  /* Badges row */
  .op-badges { display: flex; align-items: center; gap: 5px; }
  .op-dir {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 8px;
  }
  .op-dir.buy  { background: rgba(40,162,40,0.12); color: #28a228; }
  .op-dir.sell { background: rgba(224,48,48,0.12);  color: #e03030; }
  .op-lots {
    font-size: 11px;
    color: #666;
    background: white;
    border: 1px solid #ddd;
    padding: 3px 7px;
    border-radius: 8px;
  }

  /* Price row */
  .op-price-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .op-open-price { color: #888; font-weight: 500; }
  .op-arrow      { color: #ccc; font-size: 13px; }
  .op-live-price { color: #106cf5; font-weight: 600; }

  /* Pulsing dot */
  .op-price-loading { display: flex; align-items: center; }
  .op-dot-pulse {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #106cf5;
    animation: pulse 1.2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.25; transform: scale(0.8); }
    50%       { opacity: 1;    transform: scale(1.1); }
  }

  /* TP/SL row */
  .op-sltp-row {
    display: flex;
    gap: 10px;
    font-size: 12px;
  }
  .op-tp { color: #28a228; font-weight: 500; }
  .op-sl { color: #e03030; font-weight: 500; }

  /* Pending price rows */
  .op-pending-prices {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: white;
    border-radius: 8px;
    padding: 10px 12px;
    border: 1px solid #f0f0f0;
  }
  .op-pending-row    { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
  .op-pending-label  { color: #888; }
  .op-pending-target { color: #1a1a1a; font-weight: 600; }
  .op-pending-dist   { color: #f0a500; font-weight: 600; }

  /* Footer row */
  .op-order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0f0f0;
    padding-top: 10px;
  }
  .op-footer-left { display: flex; flex-direction: column; gap: 3px; }
  .op-pnl {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
  }
  .op-pnl.muted { font-size: 18px; color: #bbb; }
  .op-date { font-size: 11px; color: #aaa; white-space: nowrap; }

  /* Close button */
  .op-close-btn {
    background: #106cf5;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  .op-close-btn:disabled { opacity: 0.4; cursor: default; }
  .op-close-btn:hover:not(:disabled) { opacity: 0.85; }

  /* Cancel button */
  .op-cancel-btn {
    background: #fff1f1;
    color: #e03030;
    border: 1px solid #f8d7da;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .op-cancel-btn:disabled { opacity: 0.4; cursor: default; }
  .op-cancel-btn:hover:not(:disabled) { background: #ffe0e0; }

  /* History meta row */
  .op-hist-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    color: #888;
  }

  /* Close reason pill */
  .op-close-reason {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 6px;
    text-transform: uppercase;
  }
  .op-cr-tp         { background: rgba(40,162,40,0.12); color: #28a228; }
  .op-cr-sl         { background: rgba(224,48,48,0.12);  color: #e03030; }
  .op-cr-cancelled  { background: #f8d7da; color: #721c24; }

  /* Colors */
  .green { color: #28a228; }
  .red   { color: #e03030; }

  /* Empty state */
  .op-empty {
    text-align: center;
    padding: 48px 0;
    color: #bbb;
    font-size: 14px;
  }

  /* Skeleton */
  .op-skeleton-list { display: flex; flex-direction: column; gap: 10px; }
  .op-skeleton-row {
    height: 110px;
    border-radius: 12px;
    background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite linear;
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  /* Overlay */
  .op-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 200;
    animation: fadeIn 0.2s ease;
  }

  /* Detail bottom sheet */
  .op-detail-sheet {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 24px 24px 0 0;
    padding: 20px 24px 48px;
    z-index: 201;
    animation: slideUp 0.3s ease;
    max-height: 85vh;
    overflow-y: auto;
  }
  .op-detail-handle {
    width: 40px; height: 4px;
    background: #ddd; border-radius: 2px;
    margin: 0 auto 18px;
  }
  .op-detail-x {
    position: absolute;
    top: 18px; right: 18px;
    background: none; border: none;
    font-size: 18px; color: #aaa; cursor: pointer;
  }
  .op-detail-x:hover { color: #106cf5; }
  .op-detail-heading {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  .op-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 0;
    border-bottom: 1px solid #f4f4f4;
    font-size: 14px;
  }
  .op-detail-label { color: #888; }
  .op-detail-val   { font-weight: 600; color: #1a1a1a; }

  @keyframes fadeIn  { from { opacity: 0; }                       to { opacity: 1; } }
  @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }

  @media (min-width: 768px) { .op-card { border-radius: 30px 30px 0 0; } }
`;export{me as default};

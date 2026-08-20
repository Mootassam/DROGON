import{I as a,n as s,v as j,j as r,u as h,J as x}from"./index-ec312a38.js";import{S as b}from"./SubHeader-f6b49eac.js";import{D as y}from"./Dates-69fcf745.js";import{u as v}from"./useDispatch-1ec0682b.js";import"./v4-4a60fe23.js";const i=e=>e.product,k=a([i],e=>e.loading),S=a([i],e=>e.exportLoading),u=a([i],e=>e.rows),A=a([i],e=>e.sorter||{}),C=a([i],e=>{const n=e.sorter;if(!n||!n.field)return null;let c=n.order==="descend"?"DESC":"ASC";return`${n.field}_${c}`}),R=a([i],e=>e.filter),D=a([i],e=>e.rawFilter),F=a([i],e=>e.pagination.pageSize),B=a([i],e=>{const n=e.pagination;return!n||!n.pageSize?0:((n.current||1)-1)*n.pageSize}),w=a([i],e=>e.selectedKeys),L=a([i,u],(e,n)=>n.filter(c=>e.selectedKeys.includes(c.id))),z=a([u,w],(e,n)=>e.length===n.length),E=a([i],e=>e.news),I=a([i],e=>e.loadingnews),g={selectLoading:k,selectRows:u,selectOrderBy:C,selectLimit:F,selectFilter:R,selectOffset:B,selectSelectedKeys:w,selectSelectedRows:L,selectExportLoading:S,selectRawFilter:D,selectIsAllSelected:z,selectNews:E,selectloadingNews:I,selectSorter:A};function O(e){const{topic:n,loading:c}=e;return s.jsx(s.Fragment,{children:n==null?void 0:n.map((t,d)=>{var m,p;return s.jsxs("div",{className:"news-item",children:[s.jsxs("div",{className:"news-header",children:[s.jsx("div",{className:"news-source",children:s.jsx("i",{className:"fas fa-newspaper"})}),s.jsxs("div",{className:"news-info",children:[s.jsx("div",{className:"news-source-name",children:t==null?void 0:t.meta.sourceName}),s.jsxs("div",{className:"news-date",children:[" ",y.NewsDate(t.meta.updatedAt)]})]})]}),s.jsx("div",{className:"news-title",children:(m=t==null?void 0:t.meta)==null?void 0:m.title}),s.jsx("div",{className:"news-content",children:(p=t==null?void 0:t.meta)==null?void 0:p.subtitle}),s.jsx("img",{loading:"lazy",src:t==null?void 0:t.cover,className:"news-image"}),s.jsxs("div",{className:"news-footer",children:[s.jsx("div",{className:"news-tags",children:t.assets.map(o=>s.jsxs("span",{className:"news-tag",style:{display:"flex",alignItems:"center",gap:3},children:[s.jsx("img",{src:`https://s2.coinmarketcap.com/static/img/coins/64x64/${o.coinId}.png`,alt:"",style:{width:10,height:10}})," ",o.symbol]}))}),s.jsx("div",{className:"news-actions"})]})]},d)})})}const $=[{key:"news",coin:0,label:"All"},{key:"bitcoin",coin:1,label:"Bitcoin"},{key:"ethereum",coin:1027,label:"Ethereum"},{key:"USD",coin:825,label:"USD"},{key:"BNB",coin:1839,label:"BNB"},{key:"Solona",coin:5426,label:"Solona"},{key:"USDC",coin:3408,label:"USDC"},{key:"XRP",coin:52,label:"XRP"},{key:"toncoin",coin:11419,label:"TonCoin"}],P=()=>s.jsx("div",{className:"news-placeholder",children:[...Array(5)].map((e,n)=>s.jsxs("div",{className:"news-item-placeholder",children:[s.jsx("div",{className:"placeholder-image shimmer"}),s.jsxs("div",{className:"placeholder-content",children:[s.jsx("div",{className:"placeholder-line shimmer",style:{width:"80%",height:"16px",marginBottom:"8px"}}),s.jsx("div",{className:"placeholder-line shimmer",style:{width:"60%",height:"14px",marginBottom:"12px"}}),s.jsx("div",{className:"placeholder-line shimmer",style:{width:"40%",height:"12px"}})]})]},n))});function U(){const e=v(),[n,c]=r.useState("news"),t=h(g.selectNews),d=h(g.selectloadingNews);h(g.selectRows);const m=r.useMemo(()=>$,[]),p=r.useCallback((l,N)=>{c(l);const f={id:N,page:1,size:30};e(x.doFindNews(f))},[e]),o=r.useCallback(()=>{e(x.doFetch());const l={id:1,page:1,size:60};e(x.doFindNews(l))},[e]);return r.useEffect(()=>{o()},[o]),s.jsxs("div",{className:"container",children:[s.jsx(b,{title:"Crypto News"}),s.jsx("div",{className:"news-filters",children:m.map(l=>s.jsx("button",{className:`filter-button ${n===l.key?"active":""}`,onClick:()=>p(l.key,l.coin),children:l.label},l.key))}),s.jsxs("div",{className:"news-list",children:[s.jsx("div",{className:"news-section-title",children:"Latest News"}),d?s.jsx(P,{}):s.jsx(O,{topic:t,loading:d})]}),s.jsx("style",{children:`
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: #2A2A2A
          background-size: 800px 104px;
          position: relative;
        }
        
        .news-placeholder {
          margin-top: 16px;
        }
        
        .news-item-placeholder {
          display: flex;
          margin-bottom: 20px;
          padding: 16px;
          background: #1A1A1A;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .placeholder-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .placeholder-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .news-item-placeholder {
            flex-direction: column;
          }
          
          .placeholder-image {
            width: 100%;
            height: 160px;
            margin-right: 0;
            margin-bottom: 12px;
          }
        }
      `})]})}const J=j.memo(U);export{J as default};

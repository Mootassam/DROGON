import{j as i,n as e,T as y}from"./index-cf6de494.js";function j(){const[f,l]=i.useState([]),[b,c]=i.useState(!0),[d,p]=i.useState(null),r=async()=>{var t;c(!0),p(null);try{const s="https://feeds.bloomberg.com/markets/news.rss",a=await y.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(s)}`);if((t=a.data)!=null&&t.items){const k=a.data.items.slice(0,20).map(n=>{var g,m;let o=null;if(n.thumbnail)o=n.thumbnail;else if((g=n.enclosure)!=null&&g.link)o=n.enclosure.link;else if(n.description){const x=n.description.match(/<img[^>]+src="([^">]+)"/);x&&(o=x[1])}return o||(o="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop"),{title:n.title||"Market Update",link:n.link||"#",imageUrl:o,description:n.description?n.description.replace(/<[^>]*>/g,"").substring(0,120):"",pubDate:n.pubDate,category:((m=n.categories)==null?void 0:m[0])||"Markets"}});l(k)}else throw new Error("Invalid response")}catch(s){console.error("News fetch error:",s),p("Unable to load latest news."),l(u())}finally{c(!1)}},u=()=>[{title:"Federal Reserve hints at possible rate cut in September",cat:"Economy"},{title:"S&P 500 extends gains as tech earnings impress",cat:"Stocks"},{title:"Oil prices climb amid escalating geopolitical tensions",cat:"Commodities"},{title:"Bitcoin rallies past $70k on ETF inflows",cat:"Crypto"},{title:"EUR/USD breaks above 1.10 on dollar weakness",cat:"Forex"},{title:"Gold reaches three-month high on safe-haven demand",cat:"Commodities"},{title:"Bank of England holds rates steady at 5.25%",cat:"Economy"},{title:"Apple unveils new AI features at WWDC",cat:"Technology"},{title:"Tesla shares jump on strong delivery numbers",cat:"Stocks"},{title:"Japanese yen weakens to 34-year low",cat:"Forex"},{title:"Emerging markets see record inflows in Q2",cat:"Markets"},{title:"Global bond yields fall on growth concerns",cat:"Bonds"},{title:"US jobs report beats expectations",cat:"Economy"},{title:"Nasdaq hits all-time high as tech leads",cat:"Stocks"},{title:"Crude oil inventories drop unexpectedly",cat:"Commodities"},{title:"Ethereum upgrade drives price surge",cat:"Crypto"},{title:"Australian dollar rises on strong GDP data",cat:"Forex"},{title:"China stimulus hopes boost metals",cat:"Commodities"},{title:"UK inflation cools more than forecast",cat:"Economy"},{title:"Robinhood reports record crypto revenue",cat:"Crypto"}].map(s=>({title:s.title,link:"#",imageUrl:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop",description:"Latest market developments affecting global financial markets.",pubDate:new Date().toISOString(),category:s.cat}));i.useEffect(()=>{r();const t=setInterval(r,3e5);return()=>clearInterval(t)},[]);const h=(t,s=70)=>t?t.length>s?t.substring(0,s)+"...":t:"",w=t=>{if(!t)return"";const s=new Date(t),a=(new Date-s)/(1e3*60*60);return a<1?"Just now":a<24?`${Math.floor(a)}h ago`:a<48?"Yesterday":s.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return e.jsxs("div",{className:"home-container",children:[e.jsx("div",{className:"header",children:e.jsx("div",{className:"logo-area"})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("h3",{className:"section-title",children:"Latest Market News"}),e.jsxs("a",{href:"https://www.bloomberg.com/markets",target:"_blank",rel:"noopener noreferrer",className:"view-all",children:["Bloomberg ",e.jsx("i",{className:"fas fa-external-link-alt"})]})]}),b?e.jsx("div",{className:"news-grid",children:[...Array(12)].map((t,s)=>e.jsxs("div",{className:"news-card skeleton",children:[e.jsx("div",{className:"skeleton-img"}),e.jsxs("div",{className:"skeleton-body",children:[e.jsx("div",{className:"skeleton-line short"}),e.jsx("div",{className:"skeleton-line long"}),e.jsx("div",{className:"skeleton-line medium"})]})]},s))}):d?e.jsxs("div",{className:"error-box",children:[e.jsx("i",{className:"fas fa-exclamation-circle"})," ",d,e.jsx("button",{onClick:r,className:"retry-btn",children:"Retry"})]}):e.jsx("div",{className:"news-grid",children:f.map((t,s)=>e.jsxs("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"news-card",children:[e.jsxs("div",{className:"news-img-container",children:[e.jsx("img",{src:t.imageUrl,alt:"",onError:a=>{a.target.src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop"}}),e.jsx("span",{className:"news-category",children:t.category})]}),e.jsxs("div",{className:"news-card-body",children:[e.jsx("h4",{className:"news-title",children:h(t.title,55)}),e.jsx("p",{className:"news-desc",children:h(t.description,70)}),e.jsxs("div",{className:"news-meta",children:[e.jsx("span",{children:"Finalto News"}),t.pubDate&&e.jsx("span",{children:w(t.pubDate)})]})]})]},s))})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        body {
          background-color: #f5f7fa;
        }
        .home-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          position: relative;
        }

        /* Header – only logo, no buttons */
        .header {
          padding: 30px 20px 20px;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ps-icon {
          width: 38px;
          height: 38px;
          background: white;
          border-radius: 10px;
          color: #106cf5;
          font-weight: 800;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-name {
          color: white;
          font-weight: 600;
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        /* White content card – matches LoginPassword / MarketDetail */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 60px;
          box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
          min-height: calc(100vh - 100px);
        }

        /* Section header for news */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .view-all {
          color: #106cf5;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* News grid (2 columns) */
        .news-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .news-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e7eaee;
          text-decoration: none;
          color: #333;
          transition: 0.2s;
          display: flex;
          flex-direction: column;
        }
        .news-card:hover {
          border-color: #106cf5;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .news-img-container {
          width: 100%;
          height: 110px;
          overflow: hidden;
          background: #f0f2f5;
          position: relative;
        }
        .news-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .news-category {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(16,108,245,0.9);
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .news-card-body {
          padding: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .news-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
          line-height: 1.4;
          color: #1a1a1a;
        }
        .news-desc {
          font-size: 11px;
          color: #777;
          line-height: 1.4;
          margin-bottom: 10px;
          flex: 1;
        }
        .news-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #aaa;
        }

        /* Skeletons */
        .skeleton .skeleton-img {
          height: 110px;
          background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-body {
          padding: 12px;
        }
        .skeleton-line {
          background: #e0e3e8;
          border-radius: 4px;
          margin-bottom: 6px;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-line.short { height: 12px; width: 40%; }
        .skeleton-line.long { height: 14px; width: 90%; }
        .skeleton-line.medium { height: 12px; width: 60%; }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Error */
        .error-box {
          background: #fff5f5;
          border: 1px solid #ffcccc;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          color: #f56c6c;
          font-size: 14px;
        }
        .retry-btn {
          background: #106cf5;
          color: white;
          border: none;
          margin-top: 12px;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Mobile tweaks */
        @media (max-width: 380px) {
          .content-card {
            padding: 20px 16px 60px;
          }
          .news-img-container {
            height: 95px;
          }
        }
      `})]})}export{j as default};

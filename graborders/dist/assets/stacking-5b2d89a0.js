import{y as g,W as pa,n as s,i as m,o as j,p as ma,az as xa,t as ka,aA as ua,aB as I,x as U,j as a,aC as H}from"./index-a80de294.js";import{u as ha,y as fa,c as ba,F as va}from"./FormErrors-eee26248.js";import{y as u}from"./yupFormSchemas-d5778f86.js";import{F as ya}from"./FieldFormItem-80545088.js";import{S as ja}from"./SubHeader-1df93adb.js";import{D as K}from"./Dates-af3d9ff0.js";import{S as wa}from"./sucessModal-169b81d2.js";import{u as Na}from"./useDispatch-dda924b7.js";import"./v4-4a60fe23.js";const p=t=>t.plan.list,Sa=g([p],t=>t.loading),za=g([p],t=>t.exportLoading),C=g([p],t=>t.rows),P=g([p],t=>t.count),Da=g([P],t=>t>0),Ra=g([p],t=>t.sorter||{}),Fa=g([p],t=>{const c=t.sorter;if(!c||!c.field)return null;let h=c.order==="descend"?"DESC":"ASC";return`${c.field}_${h}`}),Ca=g([p],t=>t.filter),Pa=g([p],t=>t.rawFilter),Ma=g([p],t=>t.pagination.pageSize),Aa=g([p],t=>{const c=t.pagination;return!c||!c.pageSize?0:((c.current||1)-1)*c.pageSize}),Ea=g([p,P],(t,c)=>({...t.pagination,total:c})),W=g([p],t=>t.selectedKeys),$a=g([p,C],(t,c)=>c.filter(h=>t.selectedKeys.includes(h.id))),Ta=g([C,W],(t,c)=>t.length===c.length),La={selectLoading:Sa,selectRows:C,selectCount:P,selectOrderBy:Fa,selectLimit:Ma,selectFilter:Ca,selectOffset:Aa,selectPagination:Ea,selectSelectedKeys:W,selectSelectedRows:$a,selectHasRows:Da,selectExportLoading:za,selectRawFilter:Pa,selectIsAllSelected:Ta,selectSorter:Ra},w=t=>t.stacking.form,Ba=g([w],t=>t.record),Oa=g([w],t=>!!t.initLoading),Va=g([w],t=>!!t.saveLoading),Ia=g([w],t=>!!t.showModal),Ua={selectInitLoading:Oa,selectSaveLoading:Va,selectRecord:Ba,selectModal:Ia,selectRaw:w},Ha=pa().shape({user:u.relationToOne(s("entities.stacking.fields.user"),{}),plan:u.relationToOne(s("entities.stacking.fields.plan"),{}),amount:u.decimal(s("entities.stacking.fields.amount"),{required:!0}),status:u.enumerator(s("entities.stacking.fields.status"),{options:["active","completed","cancelled"]}),startDate:u.datetime(s("entities.stacking.fields.startDate"),{}),endDate:u.datetime(s("entities.stacking.fields.endDate"),{}),earnedRewards:u.decimal(s("entities.stacking.fields.earnedRewards"),{})});function Za(){const[t,c]=m.useState("options"),[h,M]=m.useState(!1),k=Na(),b=j(La.selectRows),q=j(ma.selectCurrentUser),z=j(xa.selectRows),N=j(ka.selectRows),[D,Y]=m.useState({}),[A,E]=m.useState({}),[_,G]=m.useState(""),$=j(Ua.selectModal),J=()=>{k(H.doClose())},[r,Q]=m.useState({crypto:"",daily:"",balance:0,min:0,max:0,symbol:"",plan:"",unstakingPeriod:""}),[f,R]=m.useState(""),[X]=m.useState(()=>({user:"",plan:"",amount:"",status:"",startDate:"",endDate:"",earnedRewards:""})),v=ha({resolver:fa.yupResolver(Ha),mode:"all",defaultValues:X}),T=ba({control:v.control,name:"amount",defaultValue:""}),Z=()=>{if(N&&N.length>0){const e=N.reduce((n,i)=>(i.symbol&&i.amount!==void 0&&(n[i.symbol]=parseFloat(i.amount)||0),n),{});E(e)}};m.useEffect(()=>{R(T||"")},[T]),m.useEffect(()=>{Z()},[N]);const aa=async e=>{e.startDate=new Date;const n=new Date(e.startDate);n.setDate(n.getDate()+parseInt(r.unstakingPeriod)),e.endDate=n.toISOString(),e.status="active",e.plan=r.plan,e.user=q.id,G(e.amount);try{await k(H.doCreate(e)),k(U.doFetch()),k(I.doFetch()),E(i=>({...i,[r.symbol]:(i[r.symbol]||0)-parseFloat(f)})),L()}catch(i){console.error("Staking failed:",i)}},ea=()=>{if(!f||isNaN(f)||f<=0)return"0";const e=parseFloat(f),n=parseFloat(r.daily),i=parseFloat(r.unstakingPeriod);return(e*(n/100)*i).toFixed(6)},sa=()=>{const e=parseFloat(f),n=A[r.symbol]||0;return isNaN(e)||e<=0?{isValid:!1,message:s("stake.enterAmount")}:e>n?{isValid:!1,message:s("stake.insufficientBalance")}:e<r.min?{isValid:!1,message:s("stake.minAmount",{min:r.min})}:e>r.max?{isValid:!1,message:s("stake.maxAmount",{max:r.max})}:{isValid:!0,message:s("stake.confirmStake")}},ta=(e,n,i,l,o,d,x,S)=>{Q({crypto:e,daily:n,balance:i,min:l,max:o,symbol:d,plan:x,unstakingPeriod:S}),M(!0),R(""),v.setValue("amount","")},L=()=>{M(!1),R(""),v.setValue("amount","")},na=async()=>{try{const n=[...new Set(b.map(o=>o.currency))].map(async o=>{if(o==="USD")return{currency:o,price:1};try{const x=await(await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${o}USD`)).json();return{currency:o,price:parseFloat(x.price)}}catch(d){return console.error(`Error fetching price for ${o}:`,d),{currency:o,price:0}}}),i=await Promise.all(n),l={};i.forEach(o=>{l[o.currency]=o.price}),Y(l)}catch(e){console.error("Error fetching crypto prices:",e)}},F=z.filter(e=>e.status==="active"),y=z.filter(e=>e.status==="completed"),ia=()=>{let e=0;return F.forEach(n=>{var d;const i=(d=n==null?void 0:n.plan)==null?void 0:d.currency,l=parseFloat(n.amount)||0,o=D[i]||0;e+=l*o}),e.toFixed(2)},oa=()=>{let e=0;return z.forEach(n=>{var d;const i=(d=n==null?void 0:n.plan)==null?void 0:d.currency,l=parseFloat(n.earnedRewards)||0,o=D[i]||0;e+=l*o}),e.toFixed(2)},ca=()=>{let e=0;return y.forEach(n=>{var d;const i=(d=n==null?void 0:n.plan)==null?void 0:d.currency,l=parseFloat(n.earnedRewards)||0,o=D[i]||0;e+=l*o}),e.toFixed(2)};m.useEffect(()=>(k(ua.doFetch()),k(I.doFetch()),k(U.doFetch()),()=>{}),[k]),m.useEffect(()=>{b.length>0&&na()},[b]);const B=sa(),O=!B.isValid,ra=B.message,la=e=>{const n=new Date,i=new Date(e.startDate);return Math.floor((n.getTime()-i.getTime())/(1e3*60*60*24))},da=e=>{const n=new Date,i=new Date(e.endDate),l=Math.floor((i.getTime()-n.getTime())/(1e3*60*60*24));return Math.max(0,l)},ga=()=>A[r.symbol]||0;return a.jsxs("div",{className:"stacking-container",children:[a.jsx("style",{children:`
        .stacking-container {
          max-width: 400px;
          margin: 0 auto;
          background-color: #0f0f0f;
          color: #ffffff;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* Header Section */
        .stacking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 15px;
          background-color: #0f0f0f;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .stacking-back-button {
          cursor: pointer;
          font-size: 18px;
        }

        .stacking-page-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-header-actions {
          display: flex;
          gap: 15px;
        }

        .stacking-header-icon {
          font-size: 20px;
          cursor: pointer;
        }

        /* Staking Overview */
        .stacking-overview {
          margin: 20px 15px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .stacking-balance {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
          color: #f3ba2f;
        }

        .stacking-label {
          color: #aaaaaa;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .stacking-rewards-earned {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          display: inline-block;
          margin-top: 10px;
        }

        /* Completed Rewards Overview - New Professional Design */
        .completed-rewards-overview {
          margin: 0 0px 20px;
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 16px;
          border-left: 4px solid #00c076;
          margin : 0 15px 15px;
        }

        .completed-rewards-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .completed-rewards-label {
          color: #aaaaaa;
          font-size: 13px;
          font-weight: 500;
        }

        .completed-rewards-count {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .completed-rewards-amount {
          font-size: 24px;
          font-weight: bold;
          color: #00c076;
          margin-bottom: 4px;
        }

        .completed-rewards-subtext {
          color: #666;
          font-size: 12px;
        }

        /* Toggle Section */
        .stacking-toggle-section {
          display: flex;
          background-color: #1a1a1a;
          margin: 0 15px 20px;
          border-radius: 12px;
          padding: 5px;
        }

        .stacking-toggle-option {
          flex: 1;
          padding: 12px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .stacking-toggle-active {
          background-color: #2a2a2a;
          color: #f3ba2f;
        }

        /* Staking Options */
        .stacking-options {
             margin: 0 0px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
       

        .stacking-option-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          transition: transform 0.2s ease;
          margin : 0 15px;
        }

        .stacking-option-card:hover {
          transform: translateY(-2px);
          border-color: #f3ba2f;
        }

        .stacking-option-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .stacking-option-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
        }

        .stacking-eth-icon {
          background-color: #627eea;
          color: #fff;
        }

        .stacking-btc-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-bnb-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-option-name {
          font-weight: bold;
          font-size: 16px;
        }

        .stacking-option-apy {
          margin-left: auto;
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: bold;
        }

        .stacking-option-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-detail-label {
          color: #aaaaaa;
          font-size: 14px;
        }

        .stacking-detail-value {
          font-weight: bold;
          font-size: 14px;
        }

        .stacking-stake-button {
          background-color: #f3ba2f;
          color: #0f0f0f;
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.2s ease;
        }

        .stacking-stake-button:hover {
          background-color: #e0a91c;
        }

        /* Active Stakes */
        .stacking-active-stakes {
          margin: 0 0px 20px;
          display: flex; 
          flex-direction :column ; 
          gap: 15px;
        }

        .stacking-completed-stakes {
          margin: 0 0px 20px;
        }

        .stacking-section-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stacking-view-all {
          color: #f3ba2f;
          font-size: 14px;
          cursor: pointer;
        }

        .stacking-stake-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          margin : 0 15px;
        }

        .stacking-completed-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #2a2a2a;
          position: relative;
          overflow: hidden;
          margin : 0 15px 15px ;
        }

        .stacking-completed-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: #00c076;
        }

        .stacking-stake-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .stacking-stake-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        .stacking-stake-crypto {
          font-weight: bold;
          font-size: 15px;
        }

        .stacking-stake-amount {
          margin-left: auto;
          font-weight: bold;
          font-size: 15px;
        }

        .stacking-status-badge {
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: bold;
          margin-left: 8px;
        }

        .stacking-status-active {
          background-color: rgba(243, 186, 47, 0.2);
          color: #f3ba2f;
        }

        .stacking-status-completed {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
        }

        .stacking-stake-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .stacking-stake-label {
          color: #aaaaaa;
          font-size: 12px;
        }

        .stacking-stake-value {
          font-size: 12px;
          font-weight: 500;
        }

        .stacking-value-positive {
          color: #00c076;
        }

        .stacking-value-completed {
          color: #00c076;
          font-weight: bold;
        }

        .stacking-completed-rewards {
          background-color: rgba(0, 192, 118, 0.1);
          border-radius: 8px;
          padding: 10px;
          margin-top: 10px;
          text-align: center;
        }

        .stacking-completed-rewards-label {
          color: #00c076;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .stacking-completed-rewards-amount {
          color: #00c076;
          font-size: 14px;
          font-weight: bold;
        }

        .stacking-progress-bar {
          height: 6px;
          background-color: #2a2a2a;
          border-radius: 3px;
          margin: 10px 0;
          overflow: hidden;
        }

        .stacking-progress-fill {
          height: 100%;
          background-color: #f3ba2f;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .stacking-progress-completed {
          background-color: #00c076;
        }

        /* Empty State Styles */
        .empty-stacking-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px 30px;
          text-align: center;
          color: #666;
          background-color: #1a1a1a;
          border-radius: 16px;
          margin: 20px 15px;
          border: 1px solid #2a2a2a;
        }

        .empty-stacking-state .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          color: #f3ba2f;
        }

        .empty-stacking-state .empty-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #ffffff;
        }

        .empty-stacking-state .empty-message {
          font-size: 14px;
          line-height: 1.5;
          color: #aaaaaa;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .start-staking-button {
          background-color: #f3ba2f;
          color: #0f0f0f;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 14px;
        }

        .start-staking-button:hover {
          background-color: #e6ab0a;
        }

        /* Modal */
        .stacking-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .stacking-modal-content {
          background-color: #1a1a1a;
          width: 90%;
          max-width: 400px;
          border-radius: 16px;
          padding: 20px;
        }

        .stacking-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stacking-modal-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-close-modal {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }

        .stacking-input-group {
          margin-bottom: 20px;
        }

        .stacking-input-label {
          display: block;
          color: #aaaaaa;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .stacking-amount-input {
          background-color: #2a2a2a;
          border: none;
          color: white;
          font-size: 18px;
          padding: 15px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }

        .stacking-balance-info {
          text-align: right;
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 5px;
        }

        .stacking-modal-details {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .stacking-modal-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-modal-detail:last-child {
          margin-bottom: 0;
        }

        .stacking-modal-button {
          background-color: #f3ba2f;
          color: #0f0f0f;
          text-align: center;
          padding: 16px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border: none;
          width: 100%;
          font-size: 16px;
        }

        .stacking-modal-button:hover:not(:disabled) {
          background-color: #e0a91c;
        }

        .stacking-modal-button-disabled {
          background-color: #2a2a2a !important;
          color: #aaaaaa !important;
          cursor: not-allowed !important;
        }

        @media (max-width: 350px) {
          .stacking-balance {
            font-size: 28px;
          }

          .completed-rewards-amount {
            font-size: 20px;
          }

          .stacking-option-icon {
            width: 36px;
            height: 36px;
          }

          .stacking-option-name {
            font-size: 14px;
          }

          .empty-stacking-state {
            padding: 40px 20px;
          }

          .empty-stacking-state .empty-icon {
            font-size: 48px;
          }

          .empty-stacking-state .empty-title {
            font-size: 18px;
          }
        }
      `}),a.jsx(ja,{title:s("pages.staking.title")}),a.jsxs("div",{className:"stacking-overview",children:[a.jsx("div",{className:"stacking-label",children:s("pages.staking.totalStakedBalance")}),a.jsxs("div",{className:"stacking-balance",children:["$",ia()]}),a.jsxs("div",{className:"stacking-rewards-earned",children:["+ $",oa()," ",s("pages.staking.earned")]})]}),a.jsxs("div",{className:"stacking-toggle-section",children:[a.jsx("div",{className:`stacking-toggle-option ${t==="options"?"stacking-toggle-active":""}`,onClick:()=>c("options"),children:s("pages.staking.tabs.options")}),a.jsx("div",{className:`stacking-toggle-option ${t==="active"?"stacking-toggle-active":""}`,onClick:()=>c("active"),children:s("pages.staking.tabs.active")}),a.jsx("div",{className:`stacking-toggle-option ${t==="completed"?"stacking-toggle-active":""}`,onClick:()=>c("completed"),children:s("pages.staking.tabs.completed")})]}),t==="options"&&a.jsx("div",{className:"stacking-options",children:b.length>0?b.map(e=>a.jsxs("div",{className:"stacking-option-card",children:[a.jsxs("div",{className:"stacking-option-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${e.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-option-name",children:e.currency})]}),a.jsxs("div",{className:"stacking-option-apy",children:[e.dailyRate,"% ",s("pages.staking.daily")]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:s("pages.staking.minimumStake")}),a.jsxs("div",{className:"stacking-detail-value",children:[e.minimumStake," ",e.currency]})]}),a.jsxs("div",{className:"stacking-option-details",children:[a.jsx("div",{className:"stacking-detail-label",children:s("pages.staking.unstakingPeriod")}),a.jsxs("div",{className:"stacking-detail-value",children:[e.unstakingPeriod," ",s("pages.staking.days")]})]}),a.jsx("div",{className:"stacking-stake-button",onClick:()=>ta(e.currency,e.dailyRate,e.earnedRewards,e.minimumStake,e.maxStake,e.currency,e.id,e.unstakingPeriod),children:s("pages.staking.stakeButton",e.currency)})]},e.currency)):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-coins"})}),a.jsx("div",{className:"empty-title",children:s("pages.staking.emptyStates.options.title")}),a.jsx("div",{className:"empty-message",children:s("pages.staking.emptyStates.options.message")})]})}),t==="active"&&a.jsx("div",{className:"stacking-active-stakes",children:F.length>0?F.map(e=>{var l,o,d,x,S,V;const n=Math.min(100,la(e)/((l=e==null?void 0:e.plan)==null?void 0:l.unstakingPeriod)*100),i=da(e);return a.jsxs("div",{className:"stacking-stake-item",children:[a.jsxs("div",{className:"stacking-stake-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(o=e==null?void 0:e.plan)==null?void 0:o.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-stake-crypto",children:(d=e==null?void 0:e.plan)==null?void 0:d.currency}),a.jsx("div",{className:"stacking-status-badge stacking-status-active",children:s("pages.staking.status.active")})]}),a.jsxs("div",{className:"stacking-stake-amount",children:[e.amount," ",(x=e==null?void 0:e.plan)==null?void 0:x.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.daily")}),a.jsxs("div",{className:"stacking-stake-value",children:[(S=e==null?void 0:e.plan)==null?void 0:S.dailyRate,"%"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.earned")}),a.jsxs("div",{className:"stacking-stake-value stacking-value-positive",children:[e.earnedRewards||0," ",(V=e==null?void 0:e.plan)==null?void 0:V.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.remaining")}),a.jsxs("div",{className:"stacking-stake-value",children:[i," ",s("pages.staking.days")]})]}),a.jsx("div",{className:"stacking-progress-bar",children:a.jsx("div",{className:"stacking-progress-fill",style:{width:`${n}%`}})})]},e.id)}):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-chart-line"})}),a.jsx("div",{className:"empty-title",children:s("pages.staking.emptyStates.active.title")}),a.jsx("div",{className:"empty-message",children:s("pages.staking.emptyStates.active.message")}),a.jsx("button",{className:"start-staking-button",onClick:()=>c("options"),children:s("pages.staking.exploreStakingOptions")})]})}),t==="completed"&&a.jsx("div",{className:"stacking-completed-stakes",children:y.length>0?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"completed-rewards-overview",children:[a.jsxs("div",{className:"completed-rewards-header",children:[a.jsx("div",{className:"completed-rewards-label",children:s("pages.staking.totalCompletedRewards")}),a.jsxs("div",{className:"completed-rewards-count",children:[y.length," ",y.length===1?s("pages.staking.stake"):s("pages.staking.stakes")]})]}),a.jsxs("div",{className:"completed-rewards-amount",children:["$",ca()]}),a.jsx("div",{className:"completed-rewards-subtext",children:s("pages.staking.allRewardsFromCompleted")})]}),y.map(e=>{var n,i,l,o,d,x;return a.jsxs("div",{className:"stacking-completed-item",children:[a.jsxs("div",{className:"stacking-stake-header",children:[a.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${(n=e==null?void 0:e.plan)==null?void 0:n.currency}.png`,style:{width:25,height:25},alt:e.currency}),a.jsx("div",{className:"stacking-stake-crypto",children:(i=e==null?void 0:e.plan)==null?void 0:i.currency}),a.jsx("div",{className:"stacking-status-badge stacking-status-completed",children:s("pages.staking.status.completed")})]}),a.jsxs("div",{className:"stacking-stake-amount",children:[e.amount," ",(l=e==null?void 0:e.plan)==null?void 0:l.currency]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.dailyRate")}),a.jsxs("div",{className:"stacking-stake-value",children:[(o=e==null?void 0:e.plan)==null?void 0:o.dailyRate,"%"]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.duration")}),a.jsxs("div",{className:"stacking-stake-value",children:[(d=e==null?void 0:e.plan)==null?void 0:d.unstakingPeriod," ",s("pages.staking.days")]})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.createdAt")}),a.jsx("div",{className:"stacking-stake-value",children:K.NewsDate(e==null?void 0:e.startDate)})]}),a.jsxs("div",{className:"stacking-stake-details",children:[a.jsx("div",{className:"stacking-stake-label",children:s("pages.staking.dateFinish")}),a.jsx("div",{className:"stacking-stake-value",children:K.NewsDate(e==null?void 0:e.endDate)})]}),a.jsxs("div",{className:"stacking-completed-rewards",children:[a.jsx("div",{className:"stacking-completed-rewards-label",children:s("pages.staking.totalRewardsEarned")}),a.jsxs("div",{className:"stacking-completed-rewards-amount",children:["+",e.earnedRewards||0," ",(x=e==null?void 0:e.plan)==null?void 0:x.currency]})]})]},e.id)})]}):a.jsxs("div",{className:"empty-stacking-state",children:[a.jsx("div",{className:"empty-icon",children:a.jsx("i",{className:"fas fa-check-circle"})}),a.jsx("div",{className:"empty-title",children:s("pages.staking.emptyStates.completed.title")}),a.jsx("div",{className:"empty-message",children:s("pages.staking.emptyStates.completed.message")}),a.jsx("button",{className:"start-staking-button",onClick:()=>c("options"),children:s("pages.staking.startStaking")})]})}),$&&a.jsx(wa,{isOpen:$,onClose:J,type:"staking",amount:String(_),coinType:r.crypto}),h&&a.jsx("div",{className:"stacking-modal-overlay",children:a.jsx("div",{className:"stacking-modal-content",children:a.jsx(va,{...v,children:a.jsxs("form",{onSubmit:v.handleSubmit(aa),children:[a.jsxs("div",{className:"stacking-modal-header",children:[a.jsxs("div",{className:"stacking-modal-title",children:[s("pages.staking.stakeModal.title")," ",a.jsx("span",{children:r.crypto})]}),a.jsx("div",{className:"stacking-close-modal",onClick:L,children:a.jsx("i",{className:"fas fa-times"})})]}),a.jsxs("div",{className:"stacking-input-group",children:[a.jsx(ya,{name:"amount",label:s("pages.staking.stakeModal.amountToStake"),className:"textField",className1:"inputField",className2:"inputLabel",className3:"inputWrapper",placeholder:s("pages.staking.stakeModal.enterAmount")}),a.jsxs("div",{className:"stacking-balance-info",children:[s("pages.staking.balance"),": ",a.jsx("span",{children:ga()})," ",a.jsx("span",{children:r.symbol})]})]}),a.jsxs("div",{className:"stacking-modal-details",children:[a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:s("pages.staking.daily")}),a.jsxs("span",{children:[r.daily,"%"]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:s("pages.staking.minimumStake")}),a.jsxs("span",{children:[r.min," ",r.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:s("pages.staking.maximumStake")}),a.jsxs("span",{children:[r.max," ",r.symbol]})]}),a.jsxs("div",{className:"stacking-modal-detail",children:[a.jsx("span",{children:s("pages.staking.estimatedTotalRewards")}),a.jsxs("span",{children:[ea()," ",r.symbol]})]})]}),a.jsx("button",{type:"submit",disabled:O,className:`stacking-modal-button ${O?"stacking-modal-button-disabled":""}`,children:ra})]})})})})]})}export{Za as default};

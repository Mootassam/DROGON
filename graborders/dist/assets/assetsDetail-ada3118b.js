import{y as D,ak as _,o as d,K as F,p as E,i as x,al as B,S,j as a,n as t,L as C}from"./index-3c74c896.js";import{S as M}from"./SubHeader-e602272c.js";import{u as z}from"./useDispatch-c7234b1e.js";const h=l=>l.assets.view,L=D([h],l=>l.record),P=D([h],l=>!!l.loading),A={selectLoading:P,selectRecord:L,selectRaw:h};function Y(){const{id:l}=_(),m=z(),n=d(A.selectRecord),v=d(F.selectRows),j=d(A.selectLoading),k=d(F.selectLoading),b=j||k,g=d(E.selectCurrentUser),[T,p]=x.useState(!1),[o,c]=x.useState({status:"all",type:"all",direction:"all",startDate:"",endDate:""});x.useEffect(()=>{Promise.all([m(B.doFind(l)),m(S.doFetch(l))])},[m,l]);const u=v.filter(s=>!(o.status!=="all"&&s.status!==o.status||o.type!=="all"&&s.type!==o.type||o.direction!=="all"&&s.direction!==o.direction||o.startDate&&new Date(s.dateTransaction)<new Date(o.startDate)||o.endDate&&new Date(s.dateTransaction)>new Date(o.endDate))),w=s=>{const i=new Date(s),r=new Date,e=i.toDateString()===r.toDateString(),f=new Date(r.setDate(r.getDate()-1)).toDateString()===i.toDateString();return e?`${t("pages.assetsDetail.today")}, ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:f?`${t("pages.assetsDetail.yesterday")}, ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`:i.toLocaleDateString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},y=(s,i,r)=>{const e={icon:"fa-exchange-alt",typeText:t("pages.assetsDetail.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:i==="in"?"#2ff378":"#FF6838"};switch(s){case"deposit":e.icon="fa-arrow-down",e.typeText=t("pages.assetsDetail.transactionTypes.deposit"),e.iconClass="deposit",e.color="#F3BA2F",e.amountColor="#2ff378";break;case"withdraw":e.icon="fa-arrow-up",e.typeText=t("pages.assetsDetail.transactionTypes.withdrawal"),e.iconClass="withdraw",e.color="#FF6838",e.amountColor="#FF6838";break;case"convert_in":e.icon="fa-exchange-alt",e.typeText=r?t("pages.assetsDetail.transactionTypes.convertedFrom",{asset:r}):t("pages.assetsDetail.transactionTypes.conversionIn"),e.iconClass="convert-in",e.color="#9C27B0",e.amountColor="#2ff378";break;case"convert_out":e.icon="fa-exchange-alt",e.typeText=r?t("pages.assetsDetail.transactionTypes.convertedTo",{asset:r}):t("pages.assetsDetail.transactionTypes.conversionOut"),e.iconClass="convert-out",e.color="#9C27B0",e.amountColor="#FF6838";break;case"stacking":e.icon="fa-coins",e.typeText=t("pages.assetsDetail.transactionTypes.stakedAmount"),e.iconClass="stacking",e.color="#FF9800",e.amountColor="#FFB74D";break;case"staking_reward":e.icon="fa-gift",e.typeText=t("pages.assetsDetail.transactionTypes.stakingRewards"),e.iconClass="staking_reward",e.color="#4CAF50",e.amountColor="#81C784";break;case"futures_reserved":e.icon="fa-lock",e.typeText=t("pages.assetsDetail.transactionTypes.futuresReserved"),e.iconClass="futures-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"futures_profit":e.icon="fa-chart-line",e.typeText=t("pages.assetsDetail.transactionTypes.futuresProfit"),e.iconClass="futures-profit",e.color="#00C076",e.amountColor="#00C076";break;case"futures_loss":e.icon="fa-chart-line",e.typeText=t("pages.assetsDetail.transactionTypes.futuresLoss"),e.iconClass="futures-loss",e.color="#FF6838",e.amountColor="#FF6838";break;case"futures_settlement":e.icon="fa-file-contract",e.typeText=t("pages.assetsDetail.transactionTypes.futuresSettlement"),e.iconClass="futures-settlement",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"futures_fee":e.icon="fa-receipt",e.typeText=t("pages.assetsDetail.transactionTypes.futuresFee"),e.iconClass="futures-fee",e.color="#607D8B",e.amountColor="#607D8B";break;case"futures_refund":e.icon="fa-undo",e.typeText=t("pages.assetsDetail.transactionTypes.futuresRefund"),e.iconClass="futures-refund",e.color="#4CAF50",e.amountColor="#4CAF50";break;case"futures_bonus":e.icon="fa-gift",e.typeText=t("pages.assetsDetail.transactionTypes.futuresBonus"),e.iconClass="futures-bonus",e.color="#E91E63",e.amountColor="#E91E63";break;case"futures_commission":e.icon="fa-handshake",e.typeText=t("pages.assetsDetail.transactionTypes.futuresCommission"),e.iconClass="futures-commission",e.color="#795548",e.amountColor="#795548";break;case"manual_profit":e.icon="fa-user-check",e.typeText=t("pages.assetsDetail.transactionTypes.manualProfit"),e.iconClass="manual-profit",e.color="#00C076",e.amountColor="#00C076";break;case"manual_loss":e.icon="fa-user-slash",e.typeText=t("pages.assetsDetail.transactionTypes.manualLoss"),e.iconClass="manual-loss",e.color="#FF6838",e.amountColor="#FF6838";break;case"manual_adjustment":e.icon="fa-cog",e.typeText=t("pages.assetsDetail.transactionTypes.manualAdjustment"),e.iconClass="manual-adjustment",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"spot_profit":e.icon="fa-coins",e.typeText=t("pages.assetsDetail.transactionTypes.spotTradingProfit"),e.iconClass="spot-profit",e.color="#4CAF50",e.amountColor="#2ff378";break;case"spot_loss":e.icon="fa-coins",e.typeText=t("pages.assetsDetail.transactionTypes.spotTradingLoss"),e.iconClass="spot-loss",e.color="#FF5722",e.amountColor="#FF6838";break;case"reward":e.icon="fa-hand-holding-dollar",e.typeText=t("pages.assetsDetail.transactionTypes.referralReward"),e.iconClass="spot-profit",e.color="#63f211ff",e.amountColor="#5ffc1bff";break;case"bonus":e.icon="fa-gift",e.typeText=t("pages.assetsDetail.transactionTypes.bonus"),e.iconClass="bonus",e.color="#E91E63",e.amountColor="#E91E63";break;case"referral_commission":e.icon="fa-users",e.typeText=t("pages.assetsDetail.transactionTypes.referralCommission"),e.iconClass="referral-commission",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_reserved":e.icon="fa-clock",e.typeText=t("pages.assetsDetail.transactionTypes.orderReserved"),e.iconClass="order-reserved",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_cancelled":e.icon="fa-ban",e.typeText=t("pages.assetsDetail.transactionTypes.orderCancelled"),e.iconClass="order-cancelled",e.color="#9E9E9E",e.amountColor="#9E9E9E";break;case"order_partial_fill":e.icon="fa-chart-pie",e.typeText=t("pages.assetsDetail.transactionTypes.orderPartialFill"),e.iconClass="order-partial",e.color="#FF9800",e.amountColor="#FF9800";break;case"order_completed":e.icon="fa-check-circle",e.typeText=t("pages.assetsDetail.transactionTypes.orderCompleted"),e.iconClass="order-completed",e.color="#4CAF50",e.amountColor="#4CAF50";break;case"fee_payment":e.icon="fa-receipt",e.typeText=t("pages.assetsDetail.transactionTypes.feePayment"),e.iconClass="fee-payment",e.color="#607D8B",e.amountColor="#607D8B";break;case"adjustment":e.icon="fa-sliders-h",e.typeText=t("pages.assetsDetail.transactionTypes.balanceAdjustment"),e.iconClass="adjustment",e.color="#9C27B0",e.amountColor="#9C27B0";break;case"transfer":e.icon="fa-exchange-alt",e.typeText=t("pages.assetsDetail.transactionTypes.transfer"),e.iconClass="transfer",e.color="#2196F3",e.amountColor="#2196F3";break;default:e.icon="fa-exchange-alt",e.typeText=t("pages.assetsDetail.transactionTypes.transaction"),e.iconClass="default",e.color="#627EEA",e.amountColor="#627EEA"}return e},N=()=>{c({status:"all",type:"all",direction:"all",startDate:"",endDate:""})};return a.jsxs("div",{className:"container",children:[a.jsx(M,{title:t("pages.assetsDetail.title")}),b?a.jsxs("div",{className:"asset-card-placeholder",children:[a.jsx("div",{className:"shimmer-circle"}),a.jsx("div",{className:"shimmer-line medium"}),a.jsx("div",{className:"shimmer-line large"})]}):a.jsxs("div",{className:"asset-card",children:[a.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${n==null?void 0:n.symbol}.png`,style:{width:60,height:60},alt:n==null?void 0:n.symbol,loading:"lazy"}),a.jsx("div",{className:"asset-name",children:n==null?void 0:n.coinName}),a.jsxs("div",{className:"asset-amount",children:[n==null?void 0:n.amount," ",n==null?void 0:n.symbol]})]}),a.jsxs("div",{className:"transaction-history",children:[a.jsxs("div",{className:"section-header",children:[a.jsx("div",{className:"section-title",children:t("pages.assetsDetail.transactionHistory.title")}),a.jsxs("div",{className:"filter-button",onClick:()=>p(!0),children:[a.jsx("i",{className:"fas fa-filter"}),t("pages.assetsDetail.filter")]})]}),a.jsx("div",{className:"transaction-list",children:b?Array.from({length:5}).map((s,i)=>a.jsxs("div",{className:"transaction-item-placeholder",children:[a.jsxs("div",{className:"transaction-info-placeholder",children:[a.jsx("div",{className:"shimmer-circle"}),a.jsxs("div",{className:"transaction-details-placeholder",children:[a.jsx("div",{className:"shimmer-line medium"}),a.jsx("div",{className:"shimmer-line small"})]})]}),a.jsxs("div",{className:"transaction-amount-placeholder",children:[a.jsx("div",{className:"shimmer-line medium"}),a.jsx("div",{className:"shimmer-line small"})]})]},i)):(u==null?void 0:u.length)>0?u.map(s=>{const{icon:i,typeText:r,iconClass:e,amountColor:f}=y(s.type,s.direction,s.relatedAsset);return a.jsxs("div",{className:"transaction-item",children:[a.jsxs("div",{className:"transaction-info",children:[a.jsx("div",{className:`transaction-icon ${e}`,style:{backgroundColor:y(s.type,s.direction,s.relatedAsset).color},children:a.jsx("i",{className:`fas ${i}`})}),a.jsxs("div",{className:"transaction-details",children:[a.jsx("div",{className:"transaction-type",children:r}),a.jsx("div",{className:"transaction-date",children:w(s.dateTransaction)})]})]}),a.jsxs("div",{className:"transaction-amount",children:[a.jsxs("div",{className:"transaction-value",style:{color:f},children:[s.direction==="in"?"+":"-",s.amount," ",s.asset]}),a.jsx("div",{className:`transaction-status ${s.status==="pending"?"pending":s.status==="canceled"?"canceled":""}`,children:t(`pages.assetsDetail.status.${s.status}`)})]})]},s._id)}):a.jsxs("div",{className:"no-transactions-container",children:[a.jsx("div",{className:"no-transactions-icon",children:a.jsx("i",{className:"fas fa-file-invoice-dollar"})}),a.jsx("h3",{children:t("pages.assetsDetail.noTransactions.title")}),a.jsx("p",{children:t("pages.assetsDetail.noTransactions.description")})]})})]}),T&&a.jsx("div",{className:"modal-backdrop",onClick:()=>p(!1),children:a.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[a.jsxs("div",{className:"modal-header",children:[a.jsx("h3",{children:t("pages.assetsDetail.filterModal.title")}),a.jsx("span",{className:"close",onClick:()=>p(!1),children:"×"})]}),a.jsxs("div",{className:"modal-body",children:[a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.status")}),a.jsxs("select",{value:o.status,onChange:s=>c({...o,status:s.target.value}),children:[a.jsx("option",{value:"all",children:t("pages.assetsDetail.filterModal.allStatuses")}),a.jsx("option",{value:"completed",children:t("pages.assetsDetail.filterModal.completed")}),a.jsx("option",{value:"pending",children:t("pages.assetsDetail.filterModal.pending")}),a.jsx("option",{value:"canceled",children:t("pages.assetsDetail.filterModal.canceled")})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.type")}),a.jsxs("select",{value:o.type,onChange:s=>c({...o,type:s.target.value}),children:[a.jsx("option",{value:"all",children:t("pages.assetsDetail.filterModal.allTypes")}),a.jsx("option",{value:"deposit",children:t("pages.assetsDetail.transactionTypes.deposit")}),a.jsx("option",{value:"withdraw",children:t("pages.assetsDetail.transactionTypes.withdrawal")}),a.jsx("option",{value:"convert_in",children:t("pages.assetsDetail.transactionTypes.conversionIn")}),a.jsx("option",{value:"convert_out",children:t("pages.assetsDetail.transactionTypes.conversionOut")}),a.jsx("option",{value:"stacking",children:t("pages.assetsDetail.transactionTypes.stakedAmount")}),a.jsx("option",{value:"futures_profit",children:t("pages.assetsDetail.transactionTypes.futuresProfit")}),a.jsx("option",{value:"futures_loss",children:t("pages.assetsDetail.transactionTypes.futuresLoss")}),a.jsx("option",{value:"spot_profit",children:t("pages.assetsDetail.transactionTypes.spotTradingProfit")}),a.jsx("option",{value:"spot_loss",children:t("pages.assetsDetail.transactionTypes.spotTradingLoss")})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.direction")}),a.jsxs("select",{value:o.direction,onChange:s=>c({...o,direction:s.target.value}),children:[a.jsx("option",{value:"all",children:t("pages.assetsDetail.filterModal.bothDirections")}),a.jsx("option",{value:"in",children:t("pages.assetsDetail.filterModal.incoming")}),a.jsx("option",{value:"out",children:t("pages.assetsDetail.filterModal.outgoing")})]})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.startDate")}),a.jsx("input",{type:"date",value:o.startDate,onChange:s=>c({...o,startDate:s.target.value})})]}),a.jsxs("div",{className:"filter-group",children:[a.jsx("label",{children:t("pages.assetsDetail.filterModal.endDate")}),a.jsx("input",{type:"date",value:o.endDate,onChange:s=>c({...o,endDate:s.target.value})})]})]}),a.jsxs("div",{className:"modal-footer",children:[a.jsx("button",{className:"btn-secondary",onClick:N,children:t("pages.assetsDetail.filterModal.resetFilters")}),a.jsx("button",{className:"btn-primary",onClick:()=>p(!1),children:t("pages.assetsDetail.filterModal.applyFilters")})]})]})}),a.jsx("div",{className:"action-buttons",children:(g==null?void 0:g.accountType)!=="demo"&&a.jsxs(a.Fragment,{children:[a.jsx(C,{to:"/deposit",className:"action-button deposit-button remove_blue",children:t("pages.assetsDetail.actions.deposit")}),a.jsx(C,{to:"/withdraw",className:"action-button withdraw-button remove_blue",children:t("pages.assetsDetail.actions.withdraw")})]})}),a.jsx("style",{children:`
                /* Enhanced transaction icons */
                .transaction-icon.deposit { background-color: #F3BA2F !important; color: #000; }
                .transaction-icon.withdraw { background-color: #FF6838 !important; color: #000; }
                .transaction-icon.convert-in { background-color: #9C27B0 !important; color: #FFF; }
                .transaction-icon.convert-out { background-color: #9C27B0 !important; color: #FFF; }
                .transaction-icon.stacking { background-color: #4CAF50 !important; color: #FFF; }
                .transaction-icon.futures-profit { background-color: #00BCD4 !important; color: #FFF; }
                .transaction-icon.futures-loss { background-color: #FF5722 !important; color: #FFF; }
                .transaction-icon.spot-profit { background-color: #4CAF50 !important; color: #FFF; }
                .transaction-icon.spot-loss { background-color: #FF5722 !important; color: #FFF; }
                .transaction-icon.default { background-color: #627EEA !important; color: #FFF; }
                .transaction-icon.swap { background-color: #627EEA !important; color: #FFF; }

                /* Shimmer animation for loading placeholders */
                @keyframes shimmer {
                    0% { background-position: -468px 0; }
                    100% { background-position: 468px 0; }
                }
                
                .shimmer {
                    animation-duration: 1.5s;
                    animation-fill-mode: forwards;
                    animation-iteration-count: infinite;
                    animation-name: shimmer;
                    animation-timing-function: linear;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    position: relative;
                    border-radius: 4px;
                }
                
                .shimmer-circle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin: 0 auto 15px;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    animation: shimmer 1.5s infinite linear;
                }
                
                .shimmer-line {
                    height: 16px;
                    margin: 8px auto;
                    background: #2A2A2A;
                    background: linear-gradient(to right, #2A2A2A 8%, #333333 18%, #2A2A2A 33%);
                    background-size: 800px 104px;
                    animation: shimmer 1.5s infinite linear;
                    border-radius: 4px;
                }
                
                .shimmer-line.small {
                    width: 60%;
                    height: 12px;
                }
                
                .shimmer-line.medium {
                    width: 70%;
                }
                
                .shimmer-line.large {
                    width: 80%;
                    height: 24px;
                }
                
                .asset-card-placeholder {
                    background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 25px;
                    text-align: center;
                }
                
                .transaction-item-placeholder {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background-color: #1A1A1A;
                    border-radius: 12px;
                }
                
                .transaction-info-placeholder {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .transaction-details-placeholder {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .transaction-amount-placeholder {
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                /* Enhanced No Transactions State */
                .no-transactions-container {
                    text-align: center;
                    padding: 40px 20px;
                    background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
                    border-radius: 16px;
                    margin: 20px 0;
                }
                
                .no-transactions-icon {
                    font-size: 60px;
                    color: #F3BA2F;
                    margin-bottom: 20px;
                    animation: pulse 2s infinite;
                }
                
                .no-transactions-container h3 {
                    font-size: 24px;
                    margin-bottom: 10px;
                    color: #FFFFFF;
                }
                
                .no-transactions-container p {
                    color: #AAAAAA;
                    margin-bottom: 30px;
                    line-height: 1.5;
                    max-width: 300px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .container {
                    max-width: 400px;
                    margin: 0 auto;
                    position: relative;
                }
                
                .asset-card {
                    background: linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 25px;
                    text-align: center;
                }
                
                .asset-name {
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .asset-amount {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .transaction-history {
                    margin-bottom: 80px;
                }
                
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .section-title {
                    font-weight: bold;
                    font-size: 18px;
                }
                
                .filter-button {
                    color: #CCCCCC;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .transaction-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .transaction-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background-color: #1A1A1A;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }
                
                .transaction-item:hover {
                    background-color: #2A2A2A;
                }
                
                .transaction-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .transaction-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                }
                
                .transaction-details {
                    display: flex;
                    flex-direction: column;
                }
                
                .transaction-type {
                    font-weight: bold;
                    margin-bottom: 4px;
                }
                
                .transaction-date {
                    color: #AAAAAA;
                    font-size: 12px;
                }
                
                .transaction-amount {
                    text-align: right;
                }
                
                .transaction-value {
                    font-weight: bold;
                    margin-bottom: 4px;
                }
                
                .transaction-status {
                    color: #2ff378;
                    font-size: 12px;
                }
                
                .transaction-status.pending {
                    color: #F3BA2F;
                }

                .transaction-status.canceled {
                    color: #FF6838;
                }
                
                // .action-buttons {
                //     display: flex;
                //     gap: 15px;
                //     position: fixed;
                //     bottom: 20px;
                //     left: 0;
                //     right: 0;
                //     max-width: 400px;
                //     margin: 0 auto;
                //     padding: 0 15px;
                // }
                
                .action-button {
                    flex: 1;
                    padding: 16px;
                    border-radius: 12px;
                    font-weight: bold;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    display: block;
                }
                
                .deposit-button {
                    background-color: #F3BA2F;
                    color: #000;
                }
                
                .withdraw-button {
                    background-color: #2A2A2A;
                    color: #FFF;
                    border: 1px solid #444;
                }
                
                .action-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                
                /* Modal Styles */
                .modal-backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(15px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background-color: #1A1A1A;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 400px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                    overflow: hidden;
                    animation: modal-appear 0.3s ease;
                }
                
                @keyframes modal-appear {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #2A2A2A;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    font-size: 18px;
                }
                
                .close {
                    font-size: 24px;
                    cursor: pointer;
                    color: #AAAAAA;
                }
                
                .close:hover {
                    color: #FFF;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .filter-group {
                    margin-bottom: 15px;
                }
                
                .filter-group label {
                    display: block;
                    margin-bottom: 5px;
                    color: #CCCCCC;
                    font-size: 14px;
                }
                
                .filter-group select, .filter-group input {
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    background-color: #2A2A2A;
                    border: 1px solid #444;
                    color: #FFF;
                }
                
                .modal-footer {
                    padding: 20px;
                    border-top: 1px solid #2A2A2A;
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }
                
                .modal-footer button {
                    flex: 1;
                    padding: 12px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    border: none;
                }
                
                .btn-secondary {
                    background-color: #2A2A2A;
                    color: #FFF;
                }
                
                .btn-primary {
                    background-color: #F3BA2F;
                    color: #000;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `})]})}export{Y as default};

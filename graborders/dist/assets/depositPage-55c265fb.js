import{o,an as n,i as a,ao as r,j as e,L as t}from"./index-c2732cf2.js";import{u as s}from"./useDispatch-578cdb5c.js";function p(){const i=s();return o(n.selectRows),o(n.selectLoading),a.useEffect(()=>{i(r.doFetch())},[i]),e.jsxs("div",{className:"deposit-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(t,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Deposit"}),e.jsx(t,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"deposit-content",children:e.jsxs("div",{className:"otc-section",children:[e.jsx("div",{className:"section-title",children:"Over-the-counter trading line"}),e.jsxs(t,{to:"/online-service",className:"otc-item",children:[e.jsx("div",{className:"otc-icon",children:e.jsx("i",{className:"fas fa-headset"})}),e.jsx("div",{className:"otc-name",children:"Online Customer Support"}),e.jsx("i",{className:"fas fa-chevron-right offsite-arrow"})]})]})})}),e.jsx("style",{children:`
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

                .deposit-container {
                    max-width: 400px;
                    margin: 0 auto;
                    position: relative;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                }

                /* Header Section - Matching HelpCenter */
                .header {
                    min-height: 60px;
                    position: relative;
                    padding: 15px 20px;
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

                .page-title {
                    color: white;
                    font-size: 17px;
                    font-weight: 600;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                /* Content Card - Matching HelpCenter */
                .content-card {
                    background: white;
                    border-radius: 40px 40px 0 0;
                    padding: 20px;
                    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
                    min-height: calc(100vh - 60px);
                }

                .deposit-content {
                    width: 100%;
                }

                .section-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 20px;
                    line-height: 1.4;
                }

                /* Cryptocurrency Grid */
                .crypto-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 30px;
                }

                .crypto-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 16px 8px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                    text-decoration: none;
                    color: inherit;
                }

                .crypto-item:hover {
                    background: #eef5ff;
                    transform: translateY(-2px);
                    border-color: #106cf5;
                    box-shadow: 0 4px 12px rgba(16, 108, 245, 0.15);
                }

                .crypto-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 8px;
                    overflow: hidden;
                }

                .crypto-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .crypto-icon:empty::after {
                    content: attr(data-symbol);
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .crypto-name {
                    font-size: 12px;
                    font-weight: 500;
                    color: #333;
                    text-align: center;
                }

                /* Offsite Links Section */
                .offsite-section {
                    margin-bottom: 30px;
                }

                .offsite-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .offsite-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .offsite-item:hover {
                    background: #eef5ff;
                    transform: translateX(4px);
                }

                .offsite-icon {
                    width: 21px;
                    height: 21px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 13px;
                    margin-right: 16px;
                }

                .offsite-name {
                    flex: 1;
                    font-size: 15px;
                    font-weight: 500;
                    color: #222;
                }

                .offsite-arrow {
                    color: #999;
                    font-size: 14px;
                }

                /* OTC Section */
                .otc-section {
                    margin-bottom: 20px;
                }

                .otc-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #f8f9fa;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                }

                .otc-item:hover {
                    background: #eef5ff;
                    transform: translateX(4px);
                }

                .otc-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 16px;
                    margin-right: 16px;
                }

                .otc-name {
                    flex: 1;
                    font-size: 13px;
                    color: #222;
                }

                /* Responsive adjustments */
                @media (max-width: 380px) {
                    .deposit-container {
                        padding: 0;
                    }

                    .header {
                        padding: 16px;
                        min-height: 50px;
                    }

                    .content-card {
                        padding: 16px;
                        border-radius: 30px 30px 0 0;
                    }

                    .section-title {
                        font-size: 15px;
                        margin-bottom: 16px;
                    }

                    .crypto-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    .crypto-item {
                        padding: 14px 6px;
                    }

                    .crypto-icon {
                        width: 40px;
                        height: 40px;
                        font-size: 13px;
                    }

                    .crypto-name {
                        font-size: 11px;
                    }

                    .offsite-item, .otc-item {
                        padding: 14px;
                    }

                    .offsite-icon, .otc-icon {
                        width: 36px;
                        height: 36px;
                        font-size: 15px;
                        margin-right: 14px;
                    }

                    .offsite-name, .otc-name {
                        font-size: 14px;
                    }
                }

                @media (min-width: 768px) {
                    .content-card {
                        border-radius: 30px 30px 0 0;
                    }

                    .deposit-content {
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .crypto-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 16px;
                    }
                }
            `})]})}export{p as default};

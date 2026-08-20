import{j as e,L as a}from"./index-c2732cf2.js";function t(){return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(a,{to:"/wallets",className:"back-arrow remove_blue",children:e.jsx("div",{className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})})}),e.jsx("div",{className:"page-title",children:"Swap"}),e.jsx("div",{className:"header-icon",children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"swap-container",children:e.jsxs("div",{className:"swap-card",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-title",children:"Consume"}),e.jsx("div",{className:"available-balance",children:"Available: 0"})]}),e.jsxs("div",{className:"token-selector",children:[e.jsxs("div",{className:"token-info",children:[e.jsx("div",{className:"token-icon",children:"USD"}),e.jsx("div",{className:"token-name",children:"USD"})]}),e.jsx("i",{className:"fas fa-chevron-down selector-arrow"})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("input",{type:"text",className:"input-field",placeholder:"Please enter the redemption quantity"}),e.jsxs("div",{className:"input-actions",children:[e.jsx("div",{className:"token-symbol",children:"USD"}),e.jsx("button",{className:"max-button",children:"All"})]})]}),e.jsx("div",{className:"swap-direction",children:e.jsx("div",{className:"swap-button",children:e.jsx("i",{className:"fas fa-exchange-alt"})})}),e.jsx("div",{className:"section-header",children:e.jsx("div",{className:"section-title",children:"Get"})}),e.jsxs("div",{className:"token-selector",children:[e.jsxs("div",{className:"token-info",children:[e.jsx("div",{className:"token-icon eth-icon",children:"ETH"}),e.jsx("div",{className:"token-name",children:"ETH"})]}),e.jsx("i",{className:"fas fa-chevron-down selector-arrow"})]}),e.jsx("input",{type:"text",className:"output-field",defaultValue:0}),e.jsx("div",{className:"exchange-rate",children:"1 USD ≈ 0.00034347618507 ETH"}),e.jsx("button",{className:"confirm-button",children:"Confirm exchange"})]})}),e.jsx("style",{children:` * {
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
            /* background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%); */
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

        /* Swap Container */
        .swap-container {
            padding: 20px;
            border-radius: 40px 40px 0 0;
            background: white;
            height: 100%
        }

        .swap-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); */
            margin-top: 10px;
        }

        /* Section Headers */
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .section-title {
            font-size: 12px;
            color: #666;
            font-weight: 500;
        }

        .available-balance {
            font-size: 12px;
            color: #999;
        }

        /* Token Selector */
        .token-selector {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 15px;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: border-color 0.3s ease;
        }

        .token-selector:hover {
            border-color: #106cf5;
        }

        .token-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .token-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #26a17b 0%, #1e8a63 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }

        .eth-icon {
            background: linear-gradient(135deg, #627eea 0%, #4c68c7 100%);
        }

        .token-name {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }

        .selector-arrow {
            color: #999;
            font-size: 12px;
        }

        /* Input Field */
        .input-group {
            position: relative;
            margin-bottom: 20px;
        }

        .input-field {
            width: 100%;
            padding: 16px;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            background: white;
            font-size: 12px;
            transition: border-color 0.3s ease;
        }

        .input-field:focus {
            outline: none;
            border-color: #106cf5;
        }

        .input-field::placeholder {
            color: #999;
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
            font-size: 14px;
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

        .max-button:hover {
            background: #d0e2ff;
        }

        /* Output Field */
        .output-field {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            background: #f8f9fa;
            font-size: 16px;
            color: #333;
            text-align: right;
        }

        /* Swap Button */
        .swap-direction {
            display: flex;
            justify-content: center;
            margin: 10px 0;
        }

        .swap-button {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: white;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .swap-button:hover {
            border-color: #106cf5;
            transform: rotate(180deg);
        }

        .swap-button i {
            color: #666;
            font-size: 16px;
        }

        /* Exchange Rate */
        .exchange-rate {
            text-align: center;
            margin: 20px 0;
            font-size: 14px;
            color: #666;
        }

        /* Confirm Button */
        .confirm-button {
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
            border: none;
            border-radius: 12px;
            padding: 16px 20px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 10px;
        }

        .confirm-button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .confirm-button:active {
            transform: translateY(0);
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
            .container {
                padding: 0;
            }

            .header,
            .swap-container {
                padding-left: 16px;
                padding-right: 16px;
            }

            .swap-card {
                padding: 16px;
            }
        }`})]})}export{t as default};

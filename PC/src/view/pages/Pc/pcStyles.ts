export const PC_CSS = `
  .pc-root {
    --primary: #0064FA; --green: #10b981; --red: #ef4444;
    --bg: #ffffff; --bg-light: #f7f8fa; --border: #e5e7eb; --text: #1a1d23; --muted: #6b7280;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    height: 100vh; display: flex; flex-direction: column; background: var(--bg-light); color: var(--text);
  }
  .pc-root * { box-sizing: border-box; }

  /* Header */
  .pc-header {
    height: 60px; flex-shrink: 0; background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
  }
  .pc-logo { font-size: 18px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px; }
  .pc-logo span { color: var(--text); }
  .pc-header-left img { height: 36px; width: auto; }
  .pc-header-center { flex: 1; display: flex; justify-content: center; }
  .pc-asset-chip { display: flex; align-items: center; gap: 8px; background: var(--bg-light); padding: 6px 14px; border-radius: 10px; font-size: 14px; }
  .pc-asset-price { font-weight: 700; color: var(--primary); }
  .pc-header-right { display: flex; align-items: center; gap: 10px; }
  .pc-lang { padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; background: #fff; cursor: pointer; outline: none; }
  .pc-btn-ghost { padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; background: #fff; color: var(--text); font-weight: 600; font-size: 14px; cursor: pointer; }
  .pc-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
  .pc-btn-primary { padding: 8px 18px; border: none; border-radius: 8px; background: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer; }
  .pc-btn-primary:disabled { opacity: .6; cursor: default; }

  /* Main layout */
  .pc-main { flex: 1; display: flex; overflow: hidden; }

  /* Left */
  .pc-left { width: 290px; flex-shrink: 0; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; }
  .pc-search { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .pc-search i { color: var(--muted); font-size: 13px; }
  .pc-search input { flex: 1; border: none; outline: none; font-size: 14px; }
  .pc-filter { padding: 10px 14px; border-bottom: 1px solid var(--border); }
  .pc-filter select { width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; outline: none; cursor: pointer; }
  .pc-market-list { flex: 1; overflow-y: auto; }
  .pc-market-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f4f5f7; transition: background .12s; }
  .pc-market-item:hover { background: var(--bg-light); }
  .pc-market-item.active { background: #e8f0ff; }
  .pc-market-info { flex: 1; min-width: 0; }
  .pc-market-symbol { font-weight: 700; font-size: 13px; }
  .pc-market-name { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pc-market-px { text-align: right; }
  .pc-market-price { font-weight: 600; font-size: 13px; font-family: monospace; }
  .pc-market-chg { font-size: 11px; }
  .pc-market-chg.pos { color: var(--green); }
  .pc-market-chg.neg { color: var(--red); }

  /* Center */
  .pc-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 16px; gap: 14px; min-width: 0; }
  .pc-chart-head { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .pc-chart-asset { display: flex; align-items: center; gap: 12px; }
  .pc-chart-name { font-size: 18px; font-weight: 800; }
  .pc-chart-sub { font-size: 12px; color: var(--muted); }
  .pc-chart-price { font-size: 26px; font-weight: 800; font-family: monospace; }
  .pc-chart-wrap { flex: 1; min-height: 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #fff; display: flex; flex-direction: column; }
  .pc-chart-wrap > div { flex: 1; }

  /* Trade panel */
  .pc-trade-panel { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; }
  .pc-trade-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; }
  .pc-trade-row label { color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .pc-trade-row select, .pc-trade-row > input { padding: 8px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; outline: none; width: 160px; text-align: right; }
  .pc-trade-row select:focus, .pc-trade-row > input:focus { border-color: var(--primary); }
  .pc-stepper { display: flex; align-items: center; gap: 6px; }
  .pc-stepper button { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--bg-light); border-radius: 7px; cursor: pointer; font-size: 16px; }
  .pc-stepper input { width: 84px; text-align: center; border: 1.5px solid var(--border); border-radius: 7px; padding: 6px; font-weight: 600; outline: none; }
  .pc-trade-info { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); font-size: 14px; color: var(--muted); }
  .pc-insufficient { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-weight: 500; text-align: center; }
  .pc-trade-actions, .pc-binary-actions { display: flex; gap: 12px; }
  .pc-buy, .pc-sell { flex: 1; padding: 13px; border: none; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; color: #fff; }
  .pc-buy { background: var(--green); }
  .pc-sell { background: var(--red); }
  .pc-buy:disabled, .pc-sell:disabled { opacity: .5; cursor: default; }

  /* Right */
  .pc-right { width: 320px; flex-shrink: 0; background: #fff; border-left: 1px solid var(--border); padding: 12px; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; }

  /* Available funds card (centered, blue) */
  .pc-funds { background: var(--primary); color: #fff; border-radius: 12px; padding: 12px; text-align: center; }
  .pc-funds-label { font-size: 12px; font-weight: 600; opacity: .95; }
  .pc-funds-amount { font-size: 20px; font-weight: 700; margin-top: 4px; letter-spacing: .5px; }

  /* Trade/order panel */
  .pc-trade-panel { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; }
  .pc-tp-symbol { font-size: 14px; font-weight: 700; color: var(--text); }
  .pc-tp-price { font-size: 19px; font-weight: 700; color: var(--primary); margin: 1px 0 8px; }
  .pc-tp-select {
    width: 100%; padding: 7px 12px; border: 1px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--text); background: #fff; outline: none; cursor: pointer; margin-bottom: 8px;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  .pc-tp-select:focus { border-color: var(--primary); }
  .pc-tp-label { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 5px; }

  /* Toggle row (Set Loss / Take Profit) */
  .pc-tp-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
  .pc-tp-toggle-row span { font-size: 12px; font-weight: 600; color: var(--text); }
  .pc-switch { position: relative; display: inline-block; width: 38px; height: 20px; }
  .pc-switch input { opacity: 0; width: 0; height: 0; }
  .pc-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 20px; transition: .2s; cursor: pointer; }
  .pc-slider::before { content: ''; position: absolute; height: 15px; width: 15px; left: 3px; bottom: 2.5px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .pc-switch input:checked + .pc-slider { background: var(--primary); }
  .pc-switch input:checked + .pc-slider::before { transform: translateX(18px); }

  /* Stepper (full-width) */
  .pc-stepper.full { display: flex; align-items: stretch; gap: 0; margin-bottom: 9px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .pc-stepper.full button {
    width: 38px; border: none; background: var(--bg-light); color: #374151; font-size: 17px; cursor: pointer; flex-shrink: 0;
  }
  .pc-stepper.full button:disabled { opacity: .5; cursor: default; }
  .pc-stepper.full input {
    flex: 1; min-width: 0; border: none; border-left: 1px solid var(--border); border-right: 1px solid var(--border);
    text-align: center; font-size: 13px; font-weight: 600; color: var(--text); outline: none; padding: 7px 6px;
  }
  .pc-stepper.full input:disabled { background: var(--bg-light); color: #9ca3af; }
  .pc-stepper.full input::-webkit-outer-spin-button, .pc-stepper.full input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  /* Info rows */
  .pc-tp-info { display: flex; flex-direction: column; gap: 5px; margin: 2px 0 10px; }
  .pc-tp-info-row { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--muted); }
  .pc-tp-info-row b { color: var(--text); font-weight: 600; }

  /* Buy / Sell pills */
  .pc-tp-actions { display: flex; gap: 10px; }
  .pc-buy2, .pc-sell2 { flex: 1; padding: 10px; border: none; border-radius: 22px; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; transition: opacity .15s; }
  .pc-buy2 { background: var(--primary); }
  .pc-sell2 { background: var(--red); }
  .pc-buy2:hover:not(:disabled), .pc-sell2:hover:not(:disabled) { opacity: .9; }
  .pc-buy2:disabled, .pc-sell2:disabled { opacity: .5; cursor: default; }
  .pc-insufficient { margin-bottom: 9px; padding: 7px 10px; font-size: 11.5px; }

  /* Confirm modal rows */
  .pc-summary-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; color: var(--muted); }
  .pc-summary-row strong { color: var(--text); }
  .pc-summary-row strong.pos { color: var(--green); }
  .pc-summary-row strong.neg { color: var(--red); }

  /* Modals shared */
  .pc-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; }
  .pc-confirm { background: #fff; border-radius: 14px; width: 360px; max-width: 92vw; padding: 22px; }
  .pc-confirm-title { font-size: 17px; font-weight: 800; margin-bottom: 16px; text-align: center; }
  .pc-confirm-actions { display: flex; gap: 10px; margin-top: 18px; }
  .pc-confirm-actions button { flex: 1; }

  /* Toast */
  .pc-toast { position: fixed; top: 76px; right: 20px; background: #fff; border-left: 4px solid var(--green); box-shadow: 0 8px 32px rgba(0,0,0,0.15); border-radius: 10px; padding: 14px 18px; font-weight: 600; font-size: 14px; z-index: 11000; }
`;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import assetsListActions from 'src/modules/assets/list/assetsListActions';
import assetsListSelectors from 'src/modules/assets/list/assetsListSelectors';
import authAxios from 'src/modules/shared/axios/authAxios';
import { PAIRS, getPairInfo, PairIcon } from 'src/view/shared/pairConfig';
import { getTvWsUrl } from 'src/view/shared/wsUrl';
import CustomTradingChart, { PriceInjection } from 'src/view/pages/Market/CustomTradingChart';
import useSymbolInjections from 'src/view/shared/useSymbolInjections';
import { getLanguageCode, getLanguages, i18n } from '../../../i18n';
import layoutActions from 'src/modules/layout/layoutActions';
import PcAuthModal from './PcAuthModal';
import PcProfileModal from './PcProfileModal';
import { PC_CSS } from './pcStyles';

const CONTRACT_SIZE = 100;

interface MarketData { symbol: string; ask: number; bid: number; lp?: number; chp?: number; }

function fmtChp(v: number | null | undefined): string {
  if (v == null) return '—';
  return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
}

function fmtPrice(p: number | null): string {
  if (p == null) return '—';
  if (p >= 10000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 100)   return p.toFixed(2);
  if (p >= 10)    return p.toFixed(3);
  return p.toFixed(5);
}

export default function PcTrading() {
  const dispatch      = useDispatch();
  const currentUser   = useSelector(authSelectors.selectCurrentUser);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);
  const listAssets    = useSelector(assetsListSelectors.selectRows);

  // ── UI state ────────────────────────────────────────────────────────────
  const [selectedCoin, setSelectedCoin] = useState('XAUUSD');
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [authModal, setAuthModal]       = useState<null | 'login' | 'register'>(null);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [lang, setLang] = useState(getLanguageCode());

  // ── Trade form ──────────────────────────────────────────────────────────
  const [multiplier, setMultiplier]       = useState(100);
  const [lots, setLots]                   = useState(0.01);
  const [lotsStr, setLotsStr]             = useState('0.01'); // editable text mirror
  const [useStopLoss, setUseStopLoss]     = useState(false);
  const [stopLossValue, setStopLossValue] = useState(0);
  const [useTakeProfit, setUseTakeProfit] = useState(false);
  const [takeProfitValue, setTakeProfitValue] = useState(0);
  const [confirm, setConfirm] = useState<null | 'buy' | 'sell'>(null);
  const [placing, setPlacing] = useState(false);
  const [toast, setToast]     = useState<string | null>(null);

  // ── Prices via WebSocket (all pairs for the list + selected) ─────────────
  const [markets, setMarkets] = useState<Record<string, MarketData>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const encode = (m: string) => `~m~${m.length}~m~${m}`;
  const parseMsgs = (data: string): string[] => {
    const out: string[] = []; let buf = data;
    while (buf.length > 0) {
      if (!buf.startsWith('~m~')) break;
      const second = buf.indexOf('~m~', 3);
      const len = parseInt(buf.substring(3, second));
      out.push(buf.substring(second + 3, second + 3 + len));
      buf = buf.substring(second + 3 + len);
    }
    return out;
  };
  const extractSym = (raw: string): string => {
    try { return JSON.parse(raw.replace(/^=\{/, '{')).symbol || raw; } catch { return raw; }
  };

  const connectWs = useCallback(() => {
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    const ws = new WebSocket(getTvWsUrl());
    wsRef.current = ws;
    ws.onopen = () => {
      const session = 'qs_' + Math.random().toString(36).substring(2, 12);
      ws.send(encode(JSON.stringify({ m: 'quote_create_session', p: [session] })));
      ws.send(encode(JSON.stringify({ m: 'quote_set_fields', p: [session, 'lp', 'ask', 'bid', 'chp'] })));
      ws.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [session, ...PAIRS.map(p => p.symbol)] })));
    };
    ws.onmessage = (event) => {
      const raw: string = event.data;
      if (raw.startsWith('~h~')) { ws.send(raw); return; }
      parseMsgs(raw).forEach(msg => {
        try {
          const json = JSON.parse(msg);
          if (json.m !== 'qsd') return;
          const payload = json.p[1];
          const sym = extractSym(payload.n);
          const v = payload.v;
          if (!v) return;
          setMarkets(prev => {
            const ex = prev[sym] || { symbol: sym, ask: 0, bid: 0 };
            const next: MarketData = {
              symbol: sym,
              ask: v.ask ?? ex.ask,
              bid: v.bid ?? ex.bid,
              lp:  typeof v.lp === 'number' ? v.lp : ex.lp,
              chp: typeof v.chp === 'number' ? v.chp : ex.chp,
            };
            if (ex.ask === next.ask && ex.bid === next.bid && ex.lp === next.lp && ex.chp === next.chp) return prev;
            return { ...prev, [sym]: next };
          });
        } catch { /* ignore */ }
      });
    };
    ws.onclose = (e) => { if (!e.wasClean) reconnectRef.current = setTimeout(connectWs, 3000); };
    ws.onerror = () => {};
  }, []);

  useEffect(() => {
    connectWs();
    return () => { if (reconnectRef.current) clearTimeout(reconnectRef.current); wsRef.current?.close(); };
  }, [connectWs]);

  // ── Global injections (shared with all users / visitors) ─────────────────
  const symbolInjections = useSymbolInjections();
  const serverInj = symbolInjections[selectedCoin];

  // Live price of selected coin (prefer last-price, fall back to mid)
  const realPrice = useMemo(() => {
    const m = markets[selectedCoin];
    if (!m) return null;
    if (m.lp && m.lp > 0) return m.lp;
    if (m.ask && m.bid) return (m.ask + m.bid) / 2;
    return null;
  }, [markets, selectedCoin]);

  // Full-height chart sizing
  const [chartHeight, setChartHeight] = useState(() =>
    typeof window !== 'undefined' ? Math.max(360, window.innerHeight - 60 - 88) : 480
  );
  useEffect(() => {
    const onResize = () => setChartHeight(Math.max(360, window.innerHeight - 60 - 88));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const livePriceRef = useRef<number | null>(null);
  useEffect(() => { livePriceRef.current = realPrice; }, [realPrice]);

  const priceInjection: PriceInjection | null = useMemo(() => {
    if (!serverInj) return null;
    return {
      symbol: serverInj.symbol, entryPrice: serverInj.entryPrice, targetPrice: serverInj.targetPrice,
      startedAt: serverInj.startedAt, durationMs: serverInj.durationMs, seed: serverInj.seed,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverInj?.symbol, serverInj?.startedAt, serverInj?.targetPrice, serverInj?.durationMs, serverInj?.entryPrice, serverInj?.seed]);

  // ── Balance ──────────────────────────────────────────────────────────────
  const [USDBalance, setUSDBalance] = useState(0);
  useEffect(() => {
    if (currentUser) dispatch(assetsListActions.doFetch());
  }, [dispatch, currentUser]);
  useEffect(() => {
    const usdt = listAssets?.find((a: any) => a.symbol === 'USDT');
    setUSDBalance(usdt?.amount || 0);
  }, [listAssets]);

  // ── Derived ────────────────────────────────────────────────────────────
  const currentPair = getPairInfo(selectedCoin) || { symbol: selectedCoin, name: selectedCoin } as any;
  const displayPrice = serverInj
    ? (livePriceRef.current ?? serverInj.targetPrice) // chart shows animation; header roughly tracks
    : realPrice;

  const estimatedMargin = useMemo(() => {
    const price = realPrice ?? 0;
    const leverage = multiplier / 100;
    const margin = (price * 100 * lots) / leverage;
    return margin;
  }, [realPrice, lots, multiplier]);

  const marginStr = estimatedMargin >= 100 ? estimatedMargin.toFixed(3) : estimatedMargin.toFixed(5);
  const insufficient = currentUser ? USDBalance < estimatedMargin && estimatedMargin > 0 : false;

  // Estimated handling fee + "Each Lots" label (mirrors the futures panel)
  const handlingFee = useMemo(() => {
    const notional = (realPrice ?? 0) * lots * 100;
    return (notional * 0.00001).toFixed(6);
  }, [realPrice, lots]);
  const eachLotValue = `1 Lots = 100 ${selectedCoin}`;

  // ── Market list (filtered) ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    return PAIRS.filter(p => {
      if (search && !(`${p.symbol} ${p.name}`.toLowerCase().includes(search.toLowerCase()))) return false;
      if (filter === 'All') return true;
      if (filter === 'Forex')   return !!p.baseFlag && !p.badgeColor && !/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(p.symbol);
      if (filter === 'Crypto')  return !!p.badgeColor && /BTC|ETH|LTC/.test(p.symbol);
      if (filter === 'Metals')  return /XAU|XAG/.test(p.symbol);
      if (filter === 'Indices') return /100|200|225|30|35|40|500|SPX|NAS|US30/.test(p.symbol);
      return true;
    });
  }, [search, filter]);

  // ── Order placement (reuses the trade-orders endpoint) ───────────────────
  const openConfirm = (dir: 'buy' | 'sell') => {
    if (!currentUser) { setAuthModal('login'); return; }
    setConfirm(dir);
  };

  const placeOrder = async () => {
    if (!confirm || !currentTenant?.id || realPrice == null) return;
    setPlacing(true);
    try {
      await authAxios.post(`/tenant/${currentTenant.id}/trade-orders`, {
        orderType:  'market',
        symbol:     selectedCoin,
        symbolName: currentPair.name,
        direction:  confirm,
        lots,
        multiplier,
        entryPrice: realPrice,
        takeProfit: useTakeProfit ? takeProfitValue : null,
        stopLoss:   useStopLoss ? stopLossValue : null,
      });
      setUSDBalance(prev => Math.max(0, prev - estimatedMargin));
      dispatch(assetsListActions.doFetch());
      setConfirm(null);
      setToast(`${confirm === 'buy' ? i18n('pc.buy') : i18n('pc.sell')} — ${i18n('pc.orderPlaced')} ${selectedCoin}`);
      setTimeout(() => setToast(null), 3500);
    } catch (e: any) {
      alert(e?.response?.data?.errors?.[0]?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  // Switch language for the WHOLE app: persist + reload so i18n re-initializes
  // and every translated string updates (same mechanism as the mobile app).
  const changeLang = (code: string) => { setLang(code); layoutActions.doChangeLanguage(code); };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="pc-root">
      <style>{PC_CSS}</style>

      {/* ===== HEADER ===== */}
      <header className="pc-header">
        <div className="pc-header-left">
<img src="/logo.png" alt="" />
        </div>

        <div className="pc-header-center">
      
        </div>

        <div className="pc-header-right">
          <select className="pc-lang" value={lang} onChange={(e) => changeLang(e.target.value)}>
            {getLanguages().map((l: any) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>

          {currentUser ? (
            <>
              <button className="pc-btn-ghost" onClick={() => setProfileOpen(true)}>
                <i className="fas fa-user" /> {i18n('pc.profile')}
              </button>
            </>
          ) : (
            <>
              <button className="pc-btn-ghost" onClick={() => setAuthModal('login')}>{i18n('pc.login')}</button>
              <button className="pc-btn-primary" onClick={() => setAuthModal('register')}>{i18n('pc.register')}</button>
            </>
          )}
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <div className="pc-main">
        {/* LEFT: market list (coin selector) */}
        <aside className="pc-left">
          <div className="pc-search">
            <i className="fas fa-search" />
            <input placeholder={i18n('pc.searchMarkets')} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="pc-filter">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {[['All','pc.all'],['Forex','pc.forex'],['Crypto','pc.crypto'],['Metals','pc.metals'],['Indices','pc.indices']].map(([val, key]) => (
                <option key={val} value={val}>{i18n(key)}</option>
              ))}
            </select>
          </div>
          <div className="pc-market-list">
            {filtered.map(p => {
              const m = markets[p.symbol];
              const wsPrice = m ? (m.lp && m.lp > 0 ? m.lp : (m.ask && m.bid ? (m.ask + m.bid) / 2 : null)) : null;
              const inj = symbolInjections[p.symbol];
              // During an injection show the animated price + synthetic change; else real-time
              const shown = inj ? inj.targetPrice : wsPrice;
              const chp = inj
                ? ((inj.targetPrice - inj.entryPrice) / inj.entryPrice) * 100
                : (m?.chp ?? null);
              const pos = (chp ?? 0) >= 0;
              return (
                <div
                  key={p.symbol}
                  className={`pc-market-item ${selectedCoin === p.symbol ? 'active' : ''}`}
                  onClick={() => setSelectedCoin(p.symbol)}
                >
                  <PairIcon pair={p} size="sm" />
                  <div className="pc-market-info">
                    <div className="pc-market-symbol">{p.symbol}</div>
                    <div className="pc-market-name">{p.name}</div>
                  </div>
                  <div className="pc-market-px">
                    <div className="pc-market-price">{fmtPrice(shown)}</div>
                    <div className={`pc-market-chg ${pos ? 'pos' : 'neg'}`}>
                      {pos ? '▲' : '▼'} {fmtChp(chp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER: full-height chart */}
        <section className="pc-center">
          <div className="pc-chart-head">
            <div className="pc-chart-asset">
              <PairIcon pair={currentPair} size="md" />
              <div>
                <div className="pc-chart-name">{selectedCoin}</div>
                <div className="pc-chart-sub">{currentPair.name}</div>
              </div>
            </div>
            <div className="pc-chart-price" style={{ color: serverInj ? (serverInj.targetPrice >= serverInj.entryPrice ? '#10b981' : '#ef4444') : '#1a1d23' }}>
              {fmtPrice(displayPrice)}
            </div>
          </div>

          <div className="pc-chart-wrap">
            <CustomTradingChart
              key={selectedCoin}
              symbol={selectedCoin}
              livePrice={realPrice}
              height={chartHeight}
              priceInjection={priceInjection}
            />
          </div>
        </section>

        {/* RIGHT: funds + trade options (matches futures order panel) */}
        <aside className="pc-right">
          {/* Available funds */}
          <div className="pc-funds">
            <div className="pc-funds-label">{i18n('pc.availableFunds')}</div>
            <div className="pc-funds-amount">{currentUser ? `$${USDBalance.toFixed(2)}` : '----'}</div>
          </div>

          <div className="pc-trade-panel">
            {/* Symbol + price */}
            <div className="pc-tp-symbol">{selectedCoin}</div>
            <div className="pc-tp-price">{fmtPrice(realPrice)}</div>

            {/* Order type */}
            <select className="pc-tp-select">
              <option>{i18n('pc.marketPrice')}</option>
            </select>

            {/* Multiplier */}
            <div className="pc-tp-label">{i18n('pc.multiplier')}</div>
            <select className="pc-tp-select" value={multiplier} onChange={(e) => setMultiplier(+e.target.value)}>
              {[100, 200, 300, 400, 500].map(v => <option key={v} value={v}>{v}</option>)}
            </select>

            {/* Set Loss */}
            <div className="pc-tp-toggle-row">
              <span>{i18n('pc.setLoss')}</span>
              <label className="pc-switch">
                <input type="checkbox" checked={useStopLoss} onChange={(e) => { setUseStopLoss(e.target.checked); setStopLossValue(e.target.checked && realPrice ? realPrice : 0); }} />
                <span className="pc-slider" />
              </label>
            </div>
            <div className="pc-stepper full">
              <button onClick={() => useStopLoss && setStopLossValue(v => Math.max(0, +(v - 0.01).toFixed(5)))} disabled={!useStopLoss}>−</button>
              <input type="number" step="any" min="0" disabled={!useStopLoss} value={stopLossValue} onChange={(e) => setStopLossValue(parseFloat(e.target.value) || 0)} />
              <button onClick={() => useStopLoss && setStopLossValue(v => +(v + 0.01).toFixed(5))} disabled={!useStopLoss}>+</button>
            </div>

            {/* Take Profit */}
            <div className="pc-tp-toggle-row">
              <span>{i18n('pc.takeProfit')}</span>
              <label className="pc-switch">
                <input type="checkbox" checked={useTakeProfit} onChange={(e) => { setUseTakeProfit(e.target.checked); setTakeProfitValue(e.target.checked && realPrice ? realPrice : 0); }} />
                <span className="pc-slider" />
              </label>
            </div>
            <div className="pc-stepper full">
              <button onClick={() => useTakeProfit && setTakeProfitValue(v => Math.max(0, +(v - 0.01).toFixed(5)))} disabled={!useTakeProfit}>−</button>
              <input type="number" step="any" min="0" disabled={!useTakeProfit} value={takeProfitValue} onChange={(e) => setTakeProfitValue(parseFloat(e.target.value) || 0)} />
              <button onClick={() => useTakeProfit && setTakeProfitValue(v => +(v + 0.01).toFixed(5))} disabled={!useTakeProfit}>+</button>
            </div>

            {/* Lots */}
            <div className="pc-tp-label">{i18n('pc.lots')}</div>
            <div className="pc-stepper full">
              <button onClick={() => { const nv = Math.max(0.01, +(lots - 0.01).toFixed(2)); setLots(nv); setLotsStr(String(nv)); }}>−</button>
              <input
                type="text"
                inputMode="decimal"
                value={lotsStr}
                onChange={(e) => {
                  // Allow free editing (digits + one dot); update numeric lots only when valid
                  const raw = e.target.value.replace(/[^0-9.]/g, '');
                  setLotsStr(raw);
                  const v = parseFloat(raw);
                  if (!isNaN(v) && v > 0) setLots(v);
                }}
                onBlur={() => {
                  // Clamp/normalize when the user finishes editing
                  let v = parseFloat(lotsStr);
                  if (isNaN(v) || v < 0.01) v = 0.01;
                  v = Math.round(v * 100) / 100;
                  setLots(v); setLotsStr(String(v));
                }}
              />
              <button onClick={() => { const nv = +(lots + 0.01).toFixed(2); setLots(nv); setLotsStr(String(nv)); }}>+</button>
            </div>

            {/* Info rows */}
            <div className="pc-tp-info">
              <div className="pc-tp-info-row"><span>{i18n('pc.eachLots')}</span><b>{eachLotValue}</b></div>
              <div className="pc-tp-info-row"><span>{i18n('pc.handlingFee')}</span><b>{handlingFee}</b></div>
              <div className="pc-tp-info-row"><span>{i18n('pc.estimatedMargin')}</span><b style={{ color: insufficient ? '#ef4444' : '#1a1d23' }}>{marginStr}</b></div>
            </div>

            {insufficient && <div className="pc-insufficient">⚠ {i18n('pc.insufficient')} (${marginStr})</div>}

            {/* Buy / Sell */}
            <div className="pc-tp-actions">
              <button className="pc-buy2" disabled={realPrice == null || insufficient} onClick={() => openConfirm('buy')}>{i18n('pc.buy')}</button>
              <button className="pc-sell2" disabled={realPrice == null || insufficient} onClick={() => openConfirm('sell')}>{i18n('pc.sell')}</button>
            </div>
          </div>
        </aside>
      </div>

      {/* ===== Confirm order ===== */}
      {confirm && (
        <div className="pc-modal-overlay" onClick={() => !placing && setConfirm(null)}>
          <div className="pc-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="pc-confirm-title">{confirm === 'buy' ? i18n('pc.confirmBuy') : i18n('pc.confirmSell')}</div>
            <div className="pc-summary-row"><span>{i18n('pc.symbol')}</span><strong>{selectedCoin}</strong></div>
            <div className="pc-summary-row"><span>{i18n('pc.direction')}</span><strong className={confirm === 'buy' ? 'pos' : 'neg'}>{confirm === 'buy' ? i18n('pc.buy') : i18n('pc.sell')}</strong></div>
            <div className="pc-summary-row"><span>{i18n('pc.price')}</span><strong>{fmtPrice(realPrice)}</strong></div>
            <div className="pc-summary-row"><span>{i18n('pc.lotsMult')}</span><strong>{lots.toFixed(2)} · {multiplier}×</strong></div>
            <div className="pc-summary-row"><span>{i18n('pc.estimatedMargin')}</span><strong>${marginStr}</strong></div>
            <div className="pc-confirm-actions">
              <button className="pc-btn-ghost" onClick={() => setConfirm(null)} disabled={placing}>{i18n('pc.cancel')}</button>
              <button className="pc-btn-primary" onClick={placeOrder} disabled={placing}>{placing ? i18n('pc.placing') : i18n('pc.confirm')}</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Toast ===== */}
      {toast && <div className="pc-toast">✓ {toast}</div>}

      {/* ===== Auth / Profile modals ===== */}
      {authModal && <PcAuthModal initialMode={authModal} onClose={() => setAuthModal(null)} />}
      {profileOpen && <PcProfileModal onClose={() => setProfileOpen(false)} />}
    </div>
  );
}

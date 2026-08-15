import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import authAxios from 'src/modules/shared/axios/authAxios';
import { PairIcon, getPairInfo } from 'src/view/shared/pairConfig';
import { getTvWsUrl } from 'src/view/shared/wsUrl';
import useSymbolInjections, { getInjectionDisplayPrice } from 'src/view/shared/useSymbolInjections';

// ── Types ──────────────────────────────────────────────────────────────────

interface TradeOrder {
  id: string;
  _id: string;
  orderType: 'market' | 'pending';
  symbol: string;
  symbolName: string;
  direction: 'buy' | 'sell';
  lots: number;
  multiplier: number;
  margin: number;
  estimatedMargin?: number;
  fee: number;
  entryPrice?: number;
  targetPrice?: number;
  referencePrice?: number;
  triggerAbove?: boolean;
  closePrice?: number;
  takeProfit?: number | null;
  stopLoss?: number | null;
  pnl: number;
  status: 'active' | 'waiting' | 'closed' | 'cancelled';
  closeReason?: 'manual' | 'tp' | 'sl' | 'cancelled';
  orderNumber: string;
  openTime?: string;
  closeTime?: string;
  createdAt: string;
}

// ── WebSocket helpers ──────────────────────────────────────────────────────

const encode = (msg: string) => `~m~${msg.length}~m~${msg}`;

function parseWsMessages(data: string): string[] {
  const out: string[] = [];
  let buf = data;
  while (buf.length > 0) {
    if (!buf.startsWith('~m~')) break;
    const second = buf.indexOf('~m~', 3);
    const len = parseInt(buf.substring(3, second));
    out.push(buf.substring(second + 3, second + 3 + len));
    buf = buf.substring(second + 3 + len);
  }
  return out;
}

function extractSym(n: string): string {
  try { return JSON.parse(n.replace(/^=\{/, '{')).symbol ?? n; }
  catch { return n; }
}

// ── Formatting ─────────────────────────────────────────────────────────────

function fmtPrice(p: number | null | undefined): string {
  if (p == null) return '—';
  if (p >= 10000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 100) return p.toFixed(2);
  if (p >= 10)  return p.toFixed(3);
  return p.toFixed(5);
}

function fmtPnl(pnl: number): string {
  return `${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}`;
}

function fmtDate(iso?: string): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } catch { return iso; }
}

function fmtDateTime(iso?: string): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  } catch { return iso; }
}

function calcPnl(order: TradeOrder, livePrice: number): number {
  if (!order.entryPrice) return 0;
  const diff = order.direction === 'buy'
    ? livePrice - order.entryPrice
    : order.entryPrice - livePrice;
  return parseFloat((diff * order.lots * 100 - order.fee).toFixed(5));
}

// ── Component ──────────────────────────────────────────────────────────────

const OrdersPage: React.FC = () => {
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);
  const tenantId = currentTenant?.id;

  const [activeTab, setActiveTab] = useState<'positions' | 'pending' | 'history'>('positions');
  const [orders, setOrders]       = useState<TradeOrder[]>([]);
  const [loading, setLoading]     = useState(true);
  const [closingId, setClosingId]     = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [detailOrder, setDetailOrder]   = useState<TradeOrder | null>(null);
  const [expandedId, setExpandedId]     = useState<string | null>(null);

  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  // Global chart injections (server-driven, all users)
  const symbolInjections = useSymbolInjections();

  // WS refs
  const wsRef          = useRef<WebSocket | null>(null);
  const sessionRef     = useRef<string | null>(null);
  const subscribedRef  = useRef<Set<string>>(new Set());
  const reconnectRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wantedSymsRef  = useRef<string[]>([]);

  // Prevent double-auto-close / double-auto-execute
  const autoClosingRef   = useRef<Set<string>>(new Set());
  const autoExecutingRef = useRef<Set<string>>(new Set());

  // ── Fetch ────────────────────────────────────────────────────────────────

  const fetchOrders = useCallback(async () => {
    if (!tenantId) return;
    try {
      const { data } = await authAxios.get(`/tenant/${tenantId}/trade-orders`);
      setOrders(data?.rows ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // Periodic refresh: ensures expired injections finalize (list.ts lazy-closes them)
  // and the wallet gets credited even while the user just watches this page.
  useEffect(() => {
    const id = setInterval(() => { fetchOrders(); }, 15_000);
    return () => clearInterval(id);
  }, [fetchOrders]);


  // ── Subscribe helper ─────────────────────────────────────────────────────

  const subscribeSymbols = useCallback((syms: string[]) => {
    const ws      = wsRef.current;
    const session = sessionRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !session) return;
    syms.forEach(sym => {
      if (!subscribedRef.current.has(sym)) {
        ws.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [session, sym] })));
        subscribedRef.current.add(sym);
      }
    });
  }, []);

  // Sync wanted symbols whenever orders change
  useEffect(() => {
    const syms = [...new Set(
      orders
        .filter(o => o.status === 'active' || o.status === 'waiting')
        .map(o => o.symbol)
    )];
    wantedSymsRef.current = syms;
    subscribeSymbols(syms);
  }, [orders, subscribeSymbols]);

  // ── WebSocket ────────────────────────────────────────────────────────────

  const connectWs = useCallback(() => {
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    const ws = new WebSocket(getTvWsUrl());
    wsRef.current = ws;

    ws.onopen = () => {
      const session = 'qs_' + Math.random().toString(36).substring(2, 12);
      sessionRef.current    = session;
      subscribedRef.current = new Set();
      ws.send(encode(JSON.stringify({ m: 'quote_create_session', p: [session] })));
      ws.send(encode(JSON.stringify({ m: 'quote_set_fields',     p: [session, 'lp', 'ask', 'bid'] })));
      wantedSymsRef.current.forEach(sym => {
        ws.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [session, sym] })));
        subscribedRef.current.add(sym);
      });
    };

    ws.onmessage = (event) => {
      const raw: string = event.data;
      if (raw.startsWith('~h~')) { ws.send(raw); return; }
      parseWsMessages(raw).forEach(msg => {
        try {
          const json = JSON.parse(msg);
          if (json.m !== 'qsd') return;
          const payload = json.p[1];
          const sym     = extractSym(payload.n);
          const v       = payload.v;
          if (!v) return;
          let price: number | null = null;
          if (typeof v.lp  === 'number' && v.lp  > 0) price = v.lp;
          else if (typeof v.ask === 'number' && typeof v.bid === 'number' && v.ask > 0)
            price = (v.ask + v.bid) / 2;
          if (price !== null) {
            setLivePrices(prev => prev[sym] === price ? prev : { ...prev, [sym]: price });
          }
        } catch { }
      });
    };

    ws.onclose = (e) => {
      if (!e.wasClean) reconnectRef.current = setTimeout(connectWs, 3000);
    };
    ws.onerror = () => {};
  }, []);

  useEffect(() => {
    connectWs();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connectWs]);

  // ── Auto TP/SL and pending trigger monitoring ─────────────────────────────

  useEffect(() => {
    if (!tenantId) return;

    const activeOrders  = orders.filter(o => o.status === 'active');
    const waitingOrders = orders.filter(o => o.status === 'waiting');

    activeOrders.forEach(order => {
      const lp = livePrices[order.symbol];
      if (lp == null) return;
      const oid = order.id || order._id;
      if (autoClosingRef.current.has(oid)) return;
      // Skip auto TP/SL while an admin injection is animating this symbol —
      // the admin-configured outcome must take precedence over the real price.
      if (symbolInjections[order.symbol]) return;

      let closeReason: 'tp' | 'sl' | null = null;
      if (order.takeProfit) {
        if (order.direction === 'buy'  && lp >= order.takeProfit) closeReason = 'tp';
        if (order.direction === 'sell' && lp <= order.takeProfit) closeReason = 'tp';
      }
      if (!closeReason && order.stopLoss) {
        if (order.direction === 'buy'  && lp <= order.stopLoss) closeReason = 'sl';
        if (order.direction === 'sell' && lp >= order.stopLoss) closeReason = 'sl';
      }

      if (closeReason) {
        autoClosingRef.current.add(oid);
        authAxios
          .put(`/tenant/${tenantId}/trade-orders/${oid}/close`, { closePrice: lp, closeReason })
          .then(() => fetchOrders())
          .finally(() => autoClosingRef.current.delete(oid));
      }
    });

    waitingOrders.forEach(order => {
      const lp = livePrices[order.symbol];
      if (lp == null || order.targetPrice == null) return;
      const oid = order.id || order._id;
      if (autoExecutingRef.current.has(oid)) return;

      const triggered = order.triggerAbove
        ? lp >= order.targetPrice
        : lp <= order.targetPrice;

      if (triggered) {
        autoExecutingRef.current.add(oid);
        authAxios
          .put(`/tenant/${tenantId}/trade-orders/${oid}/execute`, { executionPrice: lp })
          .then(() => fetchOrders())
          .finally(() => autoExecutingRef.current.delete(oid));
      }
    });
  }, [livePrices, orders, tenantId, fetchOrders, symbolInjections]);

  // ── Close active position (manual) ───────────────────────────────────────

  const handleClose = useCallback(async (order: TradeOrder) => {
    if (!tenantId) return;
    const wsLp = livePrices[order.symbol];
    const inj  = symbolInjections[order.symbol];
    const lp   = (inj && wsLp != null)
      ? getInjectionDisplayPrice(inj, wsLp)
      : wsLp;
    if (lp == null) return;
    const oid = order.id || order._id;
    setClosingId(oid);
    try {
      await authAxios.put(`/tenant/${tenantId}/trade-orders/${oid}/close`, {
        closePrice: lp, closeReason: 'manual',
      });
      await fetchOrders();
    } catch {
      alert('Failed to close position. Please try again.');
    } finally {
      setClosingId(null);
    }
  }, [tenantId, livePrices, fetchOrders, symbolInjections]);

  // ── Cancel waiting order ─────────────────────────────────────────────────

  const handleCancel = useCallback(async (order: TradeOrder) => {
    if (!tenantId) return;
    const oid = order.id || order._id;
    setCancellingId(oid);
    try {
      await authAxios.put(`/tenant/${tenantId}/trade-orders/${oid}/cancel`);
      await fetchOrders();
    } catch {
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancellingId(null);
    }
  }, [tenantId, fetchOrders]);

  // ── Derived ──────────────────────────────────────────────────────────────

  const activeOrders  = orders.filter(o => o.status === 'active');
  const waitingOrders = orders.filter(o => o.status === 'waiting');
  const historyOrders = orders.filter(o => o.status === 'closed' || o.status === 'cancelled');

  const totalPnl = activeOrders.reduce((sum, o) => {
    const inj   = symbolInjections[o.symbol];
    const wsLp  = livePrices[o.symbol] ?? null;
    const lp    = (inj && wsLp !== null)
      ? getInjectionDisplayPrice(inj, wsLp)
      : wsLp;
    return sum + (lp != null ? calcPnl(o, lp) : 0);
  }, 0);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{CSS}</style>
      <div className="op-page">

        <div className="op-header">
          <div className="op-title">Orders</div>
        </div>

        <div className="op-card">

          {/* Tabs */}
          <div className="op-tabs">
            <button
              className={`op-tab ${activeTab === 'positions' ? 'active' : ''}`}
              onClick={() => setActiveTab('positions')}
            >
              Positions{activeOrders.length > 0 && <span className="op-badge">{activeOrders.length}</span>}
            </button>
            <button
              className={`op-tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending{waitingOrders.length > 0 && <span className="op-badge">{waitingOrders.length}</span>}
            </button>
            <button
              className={`op-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          {loading ? (
            <div className="op-skeleton-list">
              {[1, 2, 3].map(i => <div key={i} className="op-skeleton-row" />)}
            </div>

          ) : activeTab === 'positions' ? (
            <>
              {activeOrders.length > 0 && (
                <div className="op-summary">
                  <span className="op-summary-label">Floating P&amp;L</span>
                  <span className={`op-summary-val ${totalPnl >= 0 ? 'green' : 'red'}`}>
                    {fmtPnl(totalPnl)}
                  </span>
                </div>
              )}

              {activeOrders.length === 0 ? (
                <div className="op-empty">No open positions</div>
              ) : activeOrders.map(order => {
                const oid  = order.id || order._id;
                const inj  = symbolInjections[order.symbol];
                const wsLp = livePrices[order.symbol] ?? null;
                // Use injection linear-interpolation for price display during animation
                const lp   = (inj && wsLp !== null)
                  ? getInjectionDisplayPrice(inj, wsLp)
                  : wsLp;
                const pnl       = lp != null ? calcPnl(order, lp) : null;
                const isClosing = closingId === oid;
                const pair      = getPairInfo(order.symbol) ?? { symbol: order.symbol, name: order.symbol };

                return (
                  <div key={oid} className="op-order-card">

                    <div className="op-order-top">
                      <div className="op-order-left">
                        <PairIcon pair={pair as any} size="sm" />
                        <span className="op-sym">{order.symbol}</span>
                        {order.orderType === 'pending' && (
                          <span className="op-tag op-tag-executed">Executed</span>
                        )}
                      </div>
                      <div className="op-badges">
                        <span className={`op-dir ${order.direction}`}>
                          {order.direction === 'buy' ? 'Buy' : 'Sell'}
                        </span>
                        <span className="op-lots">{order.lots} Lots</span>
                        <span className="op-lots">{order.multiplier}×</span>
                      </div>
                    </div>

                    <div className="op-price-row">
                      <span className="op-open-price">{fmtPrice(order.entryPrice)}</span>
                      <span className="op-arrow">→</span>
                      {lp != null
                        ? <span className="op-live-price">{fmtPrice(lp)}</span>
                        : <span className="op-price-loading"><span className="op-dot-pulse" /></span>
                      }
                    </div>

                    {(order.takeProfit || order.stopLoss) && (
                      <div className="op-sltp-row">
                        {order.takeProfit && <span className="op-tp">TP: {fmtPrice(order.takeProfit)}</span>}
                        {order.stopLoss   && <span className="op-sl">SL: {fmtPrice(order.stopLoss)}</span>}
                      </div>
                    )}

                    <div className="op-order-footer">
                      <div className="op-footer-left">
                        <span className={`op-pnl ${pnl == null ? 'muted' : pnl >= 0 ? 'green' : 'red'}`}>
                          {pnl != null ? fmtPnl(pnl) : '—'}
                        </span>
                        <span className="op-date">{fmtDate(order.openTime ?? order.createdAt)}</span>
                      </div>
                      <button
                        className="op-close-btn"
                        onClick={() => handleClose(order)}
                        disabled={isClosing || lp == null}
                      >
                        {isClosing ? 'Closing…' : 'Close Position'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </>

          ) : activeTab === 'pending' ? (
            <>
              {waitingOrders.length === 0 ? (
                <div className="op-empty">No pending orders</div>
              ) : waitingOrders.map(order => {
                const oid          = order.id || order._id;
                const lp           = livePrices[order.symbol] ?? null;
                const isCancelling = cancellingId === oid;
                const pair         = getPairInfo(order.symbol) ?? { symbol: order.symbol, name: order.symbol };
                const distancePct  = (order.targetPrice && order.referencePrice && lp != null)
                  ? (Math.abs(order.targetPrice - lp) / order.referencePrice * 100).toFixed(2)
                  : null;

                return (
                  <div key={oid} className="op-order-card">

                    <div className="op-order-top">
                      <div className="op-order-left">
                        <PairIcon pair={pair as any} size="sm" />
                        <span className="op-sym">{order.symbol}</span>
                        <span className="op-tag op-tag-waiting">Waiting</span>
                      </div>
                      <div className="op-badges">
                        <span className={`op-dir ${order.direction}`}>
                          {order.direction === 'buy' ? 'Buy' : 'Sell'}
                        </span>
                        <span className="op-lots">{order.lots} Lots</span>
                        <span className="op-lots">{order.multiplier}×</span>
                      </div>
                    </div>

                    <div className="op-pending-prices">
                      <div className="op-pending-row">
                        <span className="op-pending-label">Trigger at</span>
                        <span className="op-pending-target">{fmtPrice(order.targetPrice)}</span>
                      </div>
                      <div className="op-pending-row">
                        <span className="op-pending-label">Current price</span>
                        {lp != null
                          ? <span className="op-live-price">{fmtPrice(lp)}</span>
                          : <span className="op-price-loading"><span className="op-dot-pulse" /></span>
                        }
                      </div>
                      {distancePct && (
                        <div className="op-pending-row">
                          <span className="op-pending-label">Distance</span>
                          <span className="op-pending-dist">{distancePct}%</span>
                        </div>
                      )}
                    </div>

                    {(order.takeProfit || order.stopLoss) && (
                      <div className="op-sltp-row">
                        {order.takeProfit && <span className="op-tp">TP: {fmtPrice(order.takeProfit)}</span>}
                        {order.stopLoss   && <span className="op-sl">SL: {fmtPrice(order.stopLoss)}</span>}
                      </div>
                    )}

                    <div className="op-order-footer">
                      <div className="op-footer-left">
                        <span className="op-date">{fmtDate(order.createdAt)}</span>
                      </div>
                      <button
                        className="op-cancel-btn"
                        onClick={() => handleCancel(order)}
                        disabled={isCancelling}
                      >
                        {isCancelling ? 'Cancelling…' : 'Cancel Order'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </>

          ) : (
            /* History tab */
            historyOrders.length === 0 ? (
              <div className="op-empty">No order history yet</div>
            ) : historyOrders.map(order => {
              const oid        = order.id || order._id;
              const pnl        = order.pnl ?? 0;
              const pair       = getPairInfo(order.symbol) ?? { symbol: order.symbol, name: order.symbol };
              const isExpanded = expandedId === oid;
              const margin     = (order as any).estimatedMargin ?? order.margin ?? 0;

              // ── Expanded inline detail (like the shared screenshot) ──
              if (isExpanded) {
                return (
                  <div key={oid} className="op-detail-inline">
                    <div className="op-di-head">
                      <span className="op-di-title">Order Details</span>
                      <button className="op-di-x" onClick={() => setExpandedId(null)}>✕</button>
                    </div>

                    <div className="op-di-body">
                      <div className="op-di-left">
                        <div className="op-di-sym">{order.symbol}</div>
                        <div className="op-di-prices">
                          <span className="op-di-entry">{fmtPrice(order.entryPrice)}</span>
                          {order.closePrice != null && (
                            <>
                              <span className="op-di-arrow"> -&gt; </span>
                              <span className="op-di-close">{fmtPrice(order.closePrice)}</span>
                            </>
                          )}
                        </div>
                        <div className="op-di-meta">Margin: {Number(margin).toFixed(3)}</div>
                        <div className="op-di-meta">Handling fee: {Number(order.fee ?? 0).toFixed(6)}</div>
                        <div className="op-di-meta">Orders ID #{order.orderNumber}</div>
                        <div className="op-di-meta">{fmtDateTime(order.openTime ?? order.createdAt)}</div>
                        <div className="op-di-meta">{fmtDateTime(order.closeTime)}</div>
                      </div>

                      <div className="op-di-right">
                        <div className="op-di-badges">
                          <span className={`op-di-dir ${order.direction}`}>{order.direction === 'buy' ? 'Buy' : 'Sell'}</span>
                          <span className="op-di-lots">{order.lots} Lots</span>
                        </div>
                        {order.status !== 'cancelled' && (
                          <div className={`op-di-pnl ${pnl >= 0 ? 'green' : 'red'}`}>{Math.abs(pnl).toFixed(2)}</div>
                        )}
                        {order.status === 'cancelled' && (
                          <div className="op-tag op-tag-cancelled">Cancelled</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={oid} className="op-history-card" onClick={() => setExpandedId(oid)}>
                  <div className="op-order-top">
                    <div className="op-order-left">
                      <PairIcon pair={pair as any} size="sm" />
                      <span className="op-sym">{order.symbol}</span>
                      {order.status === 'cancelled' && (
                        <span className="op-tag op-tag-cancelled">Cancelled</span>
                      )}
                    </div>
                    {order.status !== 'cancelled' && (
                      <span className={`op-pnl ${pnl >= 0 ? 'green' : 'red'}`}>{fmtPnl(pnl)}</span>
                    )}
                  </div>

                  <div className="op-price-row">
                    <span className="op-open-price">{fmtPrice(order.entryPrice)}</span>
                    {order.status !== 'cancelled' && order.closePrice && (
                      <>
                        <span className="op-arrow">→</span>
                        <span className="op-live-price">{fmtPrice(order.closePrice)}</span>
                      </>
                    )}
                  </div>

                  <div className="op-hist-meta">
                    <span className={`op-dir ${order.direction}`}>
                      {order.direction === 'buy' ? 'Buy' : 'Sell'}
                    </span>
                    <span>{order.lots} Lots · {order.multiplier}×</span>
                    {order.closeReason && order.closeReason !== 'manual' && (
                      <span className={`op-close-reason op-cr-${order.closeReason}`}>
                        {order.closeReason.toUpperCase()}
                      </span>
                    )}
                    <span>{fmtDate(order.closeTime ?? order.createdAt)}</span>
                  </div>
                </div>
              );
            })
          )}

        </div>
      </div>

      {/* History / cancelled detail bottom-sheet */}
      {detailOrder && (
        <>
          <div className="op-overlay" onClick={() => setDetailOrder(null)} />
          <div className="op-detail-sheet">
            <div className="op-detail-handle" />
            <button className="op-detail-x" onClick={() => setDetailOrder(null)}>✕</button>
            <div className="op-detail-heading">Order Details</div>

            {([
              ['Pair',        detailOrder.symbol],
              ['Direction',   detailOrder.direction === 'buy' ? 'Buy' : 'Sell', detailOrder.direction],
              ['Order Type',  detailOrder.orderType === 'market' ? 'Market' : 'Pending'],
              ['Status',      detailOrder.status.charAt(0).toUpperCase() + detailOrder.status.slice(1)],
              ['Lots',        String(detailOrder.lots)],
              ['Multiplier',  `${detailOrder.multiplier}×`],
              ['Margin',      `$${(detailOrder.margin ?? 0).toFixed(2)}`],
              ['Fee',         `$${(detailOrder.fee ?? 0).toFixed(5)}`],
              detailOrder.entryPrice   ? ['Open Price',  fmtPrice(detailOrder.entryPrice)]  : null,
              detailOrder.closePrice   ? ['Close Price', fmtPrice(detailOrder.closePrice)]  : null,
              detailOrder.targetPrice  ? ['Trigger Price', fmtPrice(detailOrder.targetPrice)] : null,
              detailOrder.status !== 'cancelled' && detailOrder.pnl != null
                ? ['P&L', fmtPnl(detailOrder.pnl), detailOrder.pnl >= 0 ? 'buy' : 'sell']
                : null,
              detailOrder.takeProfit   ? ['Take Profit', fmtPrice(detailOrder.takeProfit)]  : null,
              detailOrder.stopLoss     ? ['Stop Loss',   fmtPrice(detailOrder.stopLoss)]    : null,
              detailOrder.closeReason  ? ['Close Reason', detailOrder.closeReason.toUpperCase()] : null,
              ['Order #',     detailOrder.orderNumber],
              ['Opened',      fmtDate(detailOrder.openTime ?? detailOrder.createdAt)],
              detailOrder.closeTime    ? ['Closed', fmtDate(detailOrder.closeTime)] : null,
            ] as any[]).filter(Boolean).map(([label, value, cls]: any) => (
              <div key={label} className="op-detail-row">
                <span className="op-detail-label">{label}</span>
                <span className={`op-detail-val ${cls === 'buy' ? 'green' : cls === 'sell' ? 'red' : ''}`}>
                  {value}
                </span>
              </div>
            ))}

          </div>
        </>
      )}
    </>
  );
};

// ── CSS ────────────────────────────────────────────────────────────────────

const CSS = `
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
`;

export default OrdersPage;

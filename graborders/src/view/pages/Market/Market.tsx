import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PAIRS, Pair, PairIcon } from 'src/view/shared/pairConfig';
import { getTvWsUrl } from 'src/view/shared/wsUrl';
import useSymbolInjections, { getInjectionDisplayPrice } from 'src/view/shared/useSymbolInjections';

// ----------------------------------------------------------------------
// Styles
// ----------------------------------------------------------------------
const styles = `
  :root {
    --green: #36f936;
    --red:   #ff4d4d;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f5f7fa;
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .market-page {
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
  }

  .market-header {
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    min-height: 60px;
    position: relative;
    padding: 20px;
  }

  .nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .page-title {
    color: white;
    font-size: 17px;
    font-weight: 600;
  }

  .content-card {
    background: white;
    border-radius: 40px 40px 0 0;
    padding: 24px 16px 100px;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
    min-height: calc(100vh - 60px);
  }

  .market-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* Skeleton */
  .skeleton-row {
    border-radius: 8px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: shimmer 1.4s infinite linear;
    background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  .skeleton-left  { display: flex; align-items: center; gap: 10px; flex: 1; }
  .skeleton-flags { width: 34px; height: 26px; border-radius: 4px; background: #e0e3e8; }
  .skeleton-symbol { width: 90px; height: 12px; border-radius: 6px; background: #e0e3e8; }
  .skeleton-right { display: flex; align-items: center; gap: 10px; }
  .skeleton-price  { width: 65px; height: 12px; border-radius: 6px; background: #e0e3e8; }
  .skeleton-change { width: 55px; height: 12px; border-radius: 6px; background: #e0e3e8; }

  /* Row */
  .row-link { text-decoration: none; color: inherit; display: block; }

  .currency-row {
    background: #f8f9fb;
    border-radius: 8px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.15s, transform 0.1s;
    border: 1px solid #edeef1;
  }

  .currency-row:hover { background: #f0f2f5; transform: translateY(-1px); }

  .left-section  { display: flex; align-items: center; gap: 10px; }
  .right-section { display: flex; align-items: center; gap: 10px; }

  .symbol-name {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
  }

  .price-value {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
    white-space: nowrap;
    min-width: 72px;
    text-align: right;
  }

  .change-percent {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 58px;
    justify-content: flex-end;
  }

  .arrow { font-size: 10px; line-height: 1; }
  .green { color: var(--green); }
  .red   { color: var(--red); }

  @media (max-width: 380px) {
    .market-header { padding: 16px; min-height: 50px; }
    .content-card  { padding: 20px 12px 100px; }
  }

  @media (min-width: 768px) {
    .content-card { border-radius: 30px 30px 0 0; }
  }
`;

// ----------------------------------------------------------------------
// WebSocket helpers
// ----------------------------------------------------------------------
const encode = (msg: string) => `~m~${msg.length}~m~${msg}`;

function parseMessages(data: string): string[] {
  const result: string[] = [];
  let buffer = data;
  while (buffer.length > 0) {
    if (!buffer.startsWith('~m~')) break;
    const second = buffer.indexOf('~m~', 3);
    const length = parseInt(buffer.substring(3, second));
    const message = buffer.substring(second + 3, second + 3 + length);
    result.push(message);
    buffer = buffer.substring(second + 3 + length);
  }
  return result;
}

function extractSymbol(raw: string): string {
  try {
    const obj = JSON.parse(raw.replace(/^=\{/, '{'));
    return obj.symbol || 'UNKNOWN';
  } catch {
    return raw;
  }
}

// ----------------------------------------------------------------------
// Live data hook – WebSocket only, subscribes all 37 pairs at once
// ----------------------------------------------------------------------
interface LiveData {
  price: number | null;
  chp: number | null;
}

function useMarketData(): Record<string, LiveData> {
  const [liveData, setLiveData] = useState<Record<string, LiveData>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connect = useCallback(() => {
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

      parseMessages(raw).forEach(msg => {
        try {
          const json = JSON.parse(msg);
          if (json.m !== 'qsd') return;

          const payload = json.p[1];
          const symbol: string = extractSymbol(payload.n);
          const v = payload.v;
          if (!v) return;

          let price: number | null = null;
          if (typeof v.lp === 'number' && v.lp > 0) {
            price = v.lp;
          } else if (typeof v.ask === 'number' && typeof v.bid === 'number' && v.ask > 0 && v.bid > 0) {
            price = (v.ask + v.bid) / 2;
          }
          const chp: number | null = typeof v.chp === 'number' ? v.chp : null;
          if (price === null && chp === null) return;

          setLiveData(prev => {
            const existing = prev[symbol];
            const next: LiveData = {
              price: price !== null ? price : (existing?.price ?? null),
              chp:   chp   !== null ? chp   : (existing?.chp   ?? null),
            };
            if (existing && existing.price === next.price && existing.chp === next.chp) return prev;
            return { ...prev, [symbol]: next };
          });
        } catch { /* ignore malformed frames */ }
      });
    };

    ws.onclose = (event) => {
      if (!event.wasClean) {
        reconnectRef.current = setTimeout(connect, 3000);
      }
    };

    ws.onerror = () => { /* reconnect handled by onclose */ };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  return liveData;
}

// ----------------------------------------------------------------------
// Formatting
// ----------------------------------------------------------------------
function fmtPrice(price: number | null): string {
  if (price === null) return '—';
  if (price >= 10000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (price >= 100)   return price.toFixed(2);
  if (price >= 10)    return price.toFixed(3);
  return price.toFixed(5);
}

function fmtChp(value: number | null): string {
  if (value === null) return '—';
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// ----------------------------------------------------------------------
// Skeleton row
// ----------------------------------------------------------------------
const SkeletonRow: React.FC = () => (
  <div className="skeleton-row">
    <div className="skeleton-left">
      <div className="skeleton-flags" />
      <div className="skeleton-symbol" />
    </div>
    <div className="skeleton-right">
      <div className="skeleton-price" />
      <div className="skeleton-change" />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// Market row
// ----------------------------------------------------------------------
const MarketRow: React.FC<{ pair: Pair; data?: LiveData; injectedPrice?: number | null; injChange?: number | null }> = ({ pair, data, injectedPrice, injChange }) => {
  const wsPrice  = data?.price ?? null;
  // During an injection the price + % change come from the animation, but they
  // are rendered exactly like a normal live row (no special colour/label).
  const price    = injectedPrice ?? wsPrice;
  const chp      = injectedPrice != null ? (injChange ?? 0) : (data?.chp ?? null);
  const positive = (chp ?? 0) >= 0;

  return (
    <Link to={`/market/detail/${pair.symbol}`} className="row-link">
      <div className="currency-row">
        <div className="left-section">
          <PairIcon pair={pair} size="sm" />
          <span className="symbol-name">{pair.name}</span>
        </div>
        <div className="right-section">
          <span className="price-value">{fmtPrice(price)}</span>
          <span className={`change-percent ${positive ? 'green' : 'red'}`}>
            <span className="arrow">{positive ? '▲' : '▼'}</span>
            {fmtChp(chp)}
          </span>
        </div>
      </div>
    </Link>
  );
};

// ----------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------
const MarketPage: React.FC = () => {
  const liveData       = useMarketData();
  const hasData        = Object.keys(liveData).length > 0;
  const symbolInjections = useSymbolInjections(); // global, server-driven

  return (
    <>
      <style>{styles}</style>
      <div className="market-page">
        <div className="market-header">
          <div className="nav-bar">
            <div className="page-title">Market</div>
          </div>
        </div>

        <div className="content-card">
          <div className="market-container">
            {PAIRS.map(pair => {
              if (!hasData) return <SkeletonRow key={pair.symbol} />;
              const inj  = symbolInjections[pair.symbol];
              // Deterministic injected price + a synthetic % change vs the entry,
              // both rendered like a normal live row.
              const injP = inj ? getInjectionDisplayPrice(inj) : null;
              const injChange = (inj && injP != null)
                ? ((injP - inj.entryPrice) / inj.entryPrice) * 100
                : null;
              return (
                <MarketRow
                  key={pair.symbol}
                  pair={pair}
                  data={liveData[pair.symbol]}
                  injectedPrice={injP}
                  injChange={injChange}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPage;

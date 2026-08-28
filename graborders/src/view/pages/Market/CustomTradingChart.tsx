import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import { isMarketOpen } from 'src/view/shared/marketHours';

// ── Public types ──────────────────────────────────────────────────────────────

export interface PriceInjection {
  symbol:      string;
  entryPrice:  number;   // animation start (trade open price, from server)
  targetPrice: number;   // animation end (close price, from server)
  startedAt:   number;   // ms epoch (from server)
  durationMs:  number;   // total animation window (from server)
  seed:        number;   // deterministic seed (from server) — identical on all devices
}

// ── Internal types ────────────────────────────────────────────────────────────

type TF = '1m' | '30m' | '1h' | 'D';
interface TFConfig { bucketMs: number; count: number; }

const TF_CONFIG: Record<TF, TFConfig> = {
  '1m':  { bucketMs:           60_000, count: 300 },
  '30m': { bucketMs:    30 * 60_000,   count: 300 },
  '1h':  { bucketMs:    60 * 60_000,   count: 300 },
  'D':   { bucketMs: 24 * 60 * 60_000, count: 365 },
};

interface OHLC { open: number; high: number; low: number; close: number; }
interface Bar extends OHLC { time: number; }

interface Props {
  symbol:          string;
  livePrice:       number | null;
  height?:         number;
  priceInjection?: PriceInjection | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getBucket(ms: number, bucketMs: number): number {
  return Math.floor(ms / bucketMs) * (bucketMs / 1000); // unix seconds
}

/** Deterministic pseudo-random in [-1, 1] from an integer seed (stable across devices). */
function seededNoise(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function baseVol(symbol: string): number {
  const s = symbol.toUpperCase();
  if (/BTC|ETH/.test(s))                                   return 0.0007;
  if (/LTC|SOL|ADA|DOT|AVAX|LINK|MATIC/.test(s))          return 0.0005;
  if (/XAU|GOLD/.test(s))                                  return 0.00015;
  if (/XAG|SILVER/.test(s))                                return 0.00020;
  if (/JPY/.test(s))                                        return 0.00022;
  if (/US30|NAS100|SPX|GER|UK100|FRA|AUS200|JPN/.test(s)) return 0.00025;
  if (/OIL|BRENT|WTI|CRUDE/.test(s))                      return 0.00035;
  return 0.0001;
}

const TF_VOL_SCALE: Record<TF, number> = { '1m': 1, '30m': 5.48, '1h': 7.75, 'D': 21.9 };

// ── Live (non-injection) random history ─────────────────────────────────────────

function generateHistory(currentPrice: number, symbol: string, tf: TF): Bar[] {
  const { bucketMs, count } = TF_CONFIG[tf];
  const vol   = baseVol(symbol) * TF_VOL_SCALE[tf];
  const nowMs = Date.now();

  const closes: number[] = [currentPrice];
  for (let i = 1; i <= count; i++) {
    const prev  = closes[i - 1];
    const delta = (Math.random() - 0.5) * 2 * vol * prev;
    closes.push(Math.max(prev * 0.5, prev - delta));
  }
  closes.reverse();

  const bars: Bar[] = [];
  for (let i = 0; i < count; i++) {
    const bucket = getBucket(nowMs - (count - i) * bucketMs, bucketMs);
    const open   = closes[i];
    const close  = closes[i + 1];
    const body   = Math.abs(close - open);
    const floor  = currentPrice * 0.00005;
    const wick   = Math.max(body, floor) * (0.5 + Math.random() * 2);
    bars.push({
      time:  bucket,
      open,
      high:  Math.max(open, close) + wick * (0.15 + Math.random() * 0.7),
      low:   Math.min(open, close) - wick * (0.15 + Math.random() * 0.7),
      close,
    });
  }
  return bars;
}

// ── Persistence: remember each symbol/timeframe's candle history across visits ──
// The candles above are synthetic (no real market-data backend), so without this
// a client leaving and returning to a symbol would see a brand-new random chart.
// Instead we save each symbol+timeframe's candles to localStorage and, on return,
// bridge the elapsed time with a short synthetic walk toward the live price —
// so the client finds the same chart, extended forward, not a fresh one.

const HISTORY_STORAGE_PREFIX = 'gc_chart_hist_v1_';

function historyKey(symbol: string, tf: TF): string {
  return HISTORY_STORAGE_PREFIX + symbol + '_' + tf;
}

function loadStoredCandles(symbol: string, tf: TF): Map<number, OHLC> | null {
  try {
    const raw = localStorage.getItem(historyKey(symbol, tf));
    if (!raw) return null;
    const entries: [number, OHLC][] = JSON.parse(raw);
    return entries.length ? new Map(entries) : null;
  } catch {
    return null;
  }
}

function saveStoredCandles(symbol: string, tf: TF, candles: Map<number, OHLC>): void {
  try {
    localStorage.setItem(historyKey(symbol, tf), JSON.stringify(Array.from(candles.entries())));
  } catch {
    // Storage full/unavailable — chart still works, just won't persist this update.
  }
}

/**
 * Candle map to show for (symbol, tf): the client's previously saved history,
 * bridged forward to "now" with a short synthetic walk toward currentPrice, or
 * a freshly generated history if nothing was saved yet for this symbol/tf.
 */
function loadOrCreateHistory(symbol: string, tf: TF, currentPrice: number): Map<number, OHLC> {
  const { bucketMs, count } = TF_CONFIG[tf];
  const bucketSec = bucketMs / 1000;
  const stored = loadStoredCandles(symbol, tf);

  if (stored && stored.size > 0) {
    const keys       = Array.from(stored.keys()).sort((a, b) => a - b);
    const lastBucket = keys[keys.length - 1];
    const nowBucket  = getBucket(Date.now(), bucketMs);
    const missing    = Math.round((nowBucket - lastBucket) / bucketSec);

    if (missing > 0) {
      const vol       = baseVol(symbol) * TF_VOL_SCALE[tf];
      const steps      = Math.min(missing, count);
      const fillStart  = nowBucket - (steps - 1) * bucketSec;
      let prevClose    = stored.get(lastBucket)!.close;

      for (let i = 0; i < steps; i++) {
        const bucket = fillStart + i * bucketSec;
        if (bucket <= lastBucket) continue;
        const isLast = i === steps - 1;
        const close  = isLast ? currentPrice
          : Math.max(prevClose * 0.5, prevClose - (Math.random() - 0.5) * 2 * vol * prevClose);
        const open   = prevClose;
        const body   = Math.abs(close - open);
        const floor  = currentPrice * 0.00005;
        const wick   = Math.max(body, floor) * (0.5 + Math.random() * 2);
        stored.set(bucket, {
          open, close,
          high: Math.max(open, close) + wick * (0.15 + Math.random() * 0.7),
          low:  Math.min(open, close) - wick * (0.15 + Math.random() * 0.7),
        });
        prevClose = close;
      }
    }

    const trimKeys = Array.from(stored.keys()).sort((a, b) => a - b);
    if (trimKeys.length > count) {
      for (const k of trimKeys.slice(0, trimKeys.length - count)) stored.delete(k);
    }

    saveStoredCandles(symbol, tf, stored);
    return stored;
  }

  const bars = generateHistory(currentPrice, symbol, tf);
  const fresh = new Map(bars.map(b => [b.time, { open: b.open, high: b.high, low: b.low, close: b.close }]));
  saveStoredCandles(symbol, tf, fresh);
  return fresh;
}

function applyCandlesToSeries(series: any, chart: any, candles: Map<number, OHLC>): void {
  const sorted = Array.from(candles.entries())
    .sort(([a], [b]) => a - b)
    .map(([t, cd]) => ({ time: t as any, ...cd }));
  series.setData(sorted as any);
  chart?.timeScale().scrollToPosition(5, false);
}

// ── Deterministic injection series (identical on every device) ──────────────────
//
// Builds a complete candlestick series (pre-injection history + revealed
// injection candles) entirely from the server-provided injection params + seed.
// • Spacing = the selected timeframe's bucket, so it looks like real candles on
//   1m / 30m / 1h / D (never a single vertical bar).
// • The move to the target is drawn as MANY small candles, each the same size as
//   the surrounding history candles (natural volatility), so the market trends
//   gradually — a few candles up, an occasional pull-back, then up again — and
//   never produces one oversized "manipulated"-looking candle.
// • Revealed progressively by real elapsed time, latest candle anchored to "now".
// • Pure function of (inj, tf, nowMs) → every client/device renders the same thing,
//   survives reload, and recomputes correctly on timeframe change.
function buildInjectionSeries(inj: PriceInjection, tf: TF, nowMs: number): Bar[] {
  const { bucketMs, count } = TF_CONFIG[tf];
  const bucketSec = bucketMs / 1000;

  const entry = inj.entryPrice;
  const target = inj.targetPrice;
  const dist  = target - entry;
  const prog  = Math.min(1, Math.max(0, (nowMs - inj.startedAt) / inj.durationMs));

  // One "natural" candle body for this symbol/timeframe (same size as the
  // history candles drawn to the left), used as the volatility floor.
  const natStep = Math.max(entry * baseVol(inj.symbol) * TF_VOL_SCALE[tf], entry * 1e-6);

  // Candle bodies must stay SMALL — the same size as the normal history candles
  // on the left (≈ natStep), never one tall candle. So we use as MANY candles as
  // the move needs: the average climb per candle is kept to ~0.4 of a normal
  // candle, which is smaller than the random swing below ⇒ small bodies + chop.
  const N = Math.max(
    50,
    Math.min(220, Math.round(Math.abs(dist) / (natStep * 0.4)) || 50)
  );
  const revealed = Math.max(1, Math.min(N, Math.round(prog * N)));

  const nowBucket = getBucket(nowMs, bucketMs);

  // The random swing MUST stay bigger than the per-candle climb on EVERY
  // timeframe, otherwise the climb dominates and the move collapses into a
  // straight diagonal line (which is what happened on 1m/30m). On 1D the climb
  // is small (~0.4·natStep) so the swing is just natStep; on 1m/30m the same
  // price move is squeezed into the 220-candle cap, making the climb larger — so
  // the swing scales up with it (2.5× the climb) to keep the candles choppy.
  const avgDrift = Math.abs(dist) / N;
  const swingAmp = Math.max(natStep, avgDrift * 2.5);

  // Injection close path c[0..N] — a HOMING random walk with small, uniform steps.
  //
  // • Each candle = the small drift still needed to reach the target (gap /
  //   candles-left, so it always converges) + a random swing (swingAmp). Because
  //   the swing is bigger than the drift, ~⅓ of candles close red → real
  //   pull-backs, and every body stays small/uniform (no tall single candles).
  // • The noise is lightly AUTO-CORRELATED (each step keeps part of the previous
  //   one), so reds and greens come in RUNS of several candles — "3 up, 2 down,
  //   4 up, 6 down…" — instead of alternating every single candle.
  // • Swing tapers to 0 over the last few candles so the path settles smoothly
  //   onto the target instead of snapping there with one big candle.
  const tail = Math.max(2, Math.round(N * 0.1));
  const c: number[] = new Array(N + 1);
  c[0] = entry;
  let mom = 0; // momentum carried between candles → multi-candle runs
  for (let i = 1; i <= N; i++) {
    const remaining   = N - (i - 1);
    const homeDrift   = (target - c[i - 1]) / remaining;
    const fresh       = seededNoise(inj.seed + i * 7);
    mom = 0.55 * mom + 0.85 * fresh;                       // auto-correlated noise
    const taper       = Math.min(1, (N - i) / tail);
    c[i] = c[i - 1] + homeDrift + mom * swingAmp * taper;
  }
  c[N] = target; // pin exactly onto the target close

  // Injection candles: i = 1..revealed, latest (i = revealed) sits at nowBucket.
  // open = previous close (continuous), so candle colour = sign(close − prevClose).
  const injBars: Bar[] = [];
  for (let i = 1; i <= revealed; i++) {
    const time  = nowBucket - (revealed - i) * bucketSec;
    const open  = c[i - 1];
    const close = c[i];
    const wickRef = Math.max(natStep, Math.abs(close - open));
    const wickUp = Math.abs(seededNoise(inj.seed + i * 13 + 1)) * wickRef * 0.5;
    const wickDn = Math.abs(seededNoise(inj.seed + i * 13 + 2)) * wickRef * 0.5;
    injBars.push({
      time,
      open,
      high: Math.max(open, close) + wickUp,
      low:  Math.min(open, close) - wickDn,
      close,
    });
  }

  // History before the injection, ending exactly at entry (c[0]); seeded so all
  // devices match. Placed contiguously to the left of the first injection candle.
  const firstInjTime = nowBucket - (revealed - 1) * bucketSec;
  const hvol = baseVol(inj.symbol) * TF_VOL_SCALE[tf];
  const hcloses: number[] = [entry];
  for (let k = 1; k <= count; k++) {
    const prev  = hcloses[k - 1];
    const delta = seededNoise(inj.seed + 9000 + k) * hvol * prev;
    hcloses.push(Math.max(prev * 0.5, prev - delta));
  }
  hcloses.reverse(); // oldest … entry (length count+1, last = entry)

  const histBars: Bar[] = [];
  for (let k = 0; k < count; k++) {
    const time  = firstInjTime - (count - k) * bucketSec;
    const open  = hcloses[k];
    const close = hcloses[k + 1];
    const body  = Math.abs(close - open);
    const floor = entry * 0.00005;
    const wick  = Math.max(body, floor) * (0.5 + Math.abs(seededNoise(inj.seed + 20000 + k)) * 1.6);
    histBars.push({
      time,
      open,
      high: Math.max(open, close) + wick * 0.4,
      low:  Math.min(open, close) - wick * 0.4,
      close,
    });
  }

  return [...histBars, ...injBars]; // strictly ascending by time
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CustomTradingChart({
  symbol, livePrice, height = 400, priceInjection,
}: Props) {

  const [tf, setTF] = useState<TF>('D');

  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef     = useRef<any>(null);
  const seriesRef    = useRef<any>(null);

  const livePriceRef = useRef<number | null>(livePrice);
  const tfRef        = useRef<TF>('D');
  const injRef       = useRef<PriceInjection | null>(null);
  const prevInjRef   = useRef<PriceInjection | null>(null);

  // Live (non-injection) candle buffer
  const candlesRef   = useRef<Map<number, OHLC>>(new Map());
  const prevLenRef   = useRef(0);
  const seenNullRef  = useRef(false);
  const histLoadedRef = useRef(false);
  const tickRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickCountRef = useRef(0);

  useEffect(() => { livePriceRef.current = livePrice; }, [livePrice]);
  useEffect(() => { tfRef.current = tf; }, [tf]);

  // ── Sync injection ref; rebuild immediately on start/end/change ─────────────
  useEffect(() => {
    const active = priceInjection && priceInjection.symbol === symbol ? priceInjection : null;

    if (active) {
      injRef.current = active;
      // Draw immediately so there's no 1s delay before the trend appears
      if (seriesRef.current) {
        seriesRef.current.setData(buildInjectionSeries(active, tfRef.current, Date.now()) as any);
      }
    } else {
      const wasInjecting = !!prevInjRef.current;
      injRef.current = null;
      // On injection end → reload a clean live history around the real price
      if (wasInjecting && seriesRef.current) {
        const lp = livePriceRef.current;
        if (lp && lp > 0) {
          const candles = loadOrCreateHistory(symbol, tfRef.current, lp);
          candlesRef.current = candles;
          prevLenRef.current = candles.size;
          applyCandlesToSeries(seriesRef.current, chartRef.current, candles);
        }
      }
    }
    prevInjRef.current = active;
  }, [priceInjection, symbol]);

  // ── Reset live buffer on symbol change ──────────────────────────────────────
  useEffect(() => {
    candlesRef.current    = new Map();
    prevLenRef.current    = 0;
    histLoadedRef.current = false;
    seenNullRef.current   = false;
    if (seriesRef.current && !injRef.current) seriesRef.current.setData([]);
  }, [symbol]);

  // ── Load live history once a real price arrives (only when NOT injecting) ───
  useEffect(() => {
    if (injRef.current) return;
    if (livePrice === null) { seenNullRef.current = true; return; }
    if (!seenNullRef.current || histLoadedRef.current || !seriesRef.current) return;
    histLoadedRef.current = true;
    const candles = loadOrCreateHistory(symbol, tf, livePrice);
    candlesRef.current = candles;
    prevLenRef.current = candles.size;
    applyCandlesToSeries(seriesRef.current, chartRef.current, candles);
  }, [livePrice, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Rebuild on timeframe change ─────────────────────────────────────────────
  useEffect(() => {
    if (!seriesRef.current) return;
    if (injRef.current) {
      seriesRef.current.setData(buildInjectionSeries(injRef.current, tf, Date.now()) as any);
      return;
    }
    const price = livePriceRef.current;
    if (!price) return;
    const candles = loadOrCreateHistory(symbol, tf, price);
    candlesRef.current = candles;
    prevLenRef.current = candles.size;
    applyCandlesToSeries(seriesRef.current, chartRef.current, candles);
  }, [tf, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Init chart ──────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width:  containerRef.current.clientWidth,
      height,
      layout: { background: { color: '#ffffff' }, textColor: '#666', fontSize: 12 },
      grid:   { vertLines: { color: '#f0f2f5' }, horzLines: { color: '#f0f2f5' } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: '#e0e3e8', scaleMargins: { top: 0.08, bottom: 0.08 } },
      timeScale: {
        borderColor: '#e0e3e8', timeVisible: true, secondsVisible: false,
        rightOffset: 6, lockVisibleTimeRangeOnResize: true,
      },
      handleScroll: true,
      handleScale:  true,
    });

    const series = chart.addSeries(CandlestickSeries as any, {
      upColor:       '#26a69a',
      downColor:     '#ef5350',
      borderVisible: false,
      wickUpColor:   '#26a69a',
      wickDownColor: '#ef5350',
    });

    chartRef.current  = chart;
    seriesRef.current = series;

    // Initial draw if we already have an injection or a live price
    if (injRef.current) {
      series.setData(buildInjectionSeries(injRef.current, tfRef.current, Date.now()) as any);
    } else if (livePriceRef.current) {
      const candles = loadOrCreateHistory(symbol, tfRef.current, livePriceRef.current);
      candlesRef.current = candles;
      prevLenRef.current = candles.size;
      histLoadedRef.current = true;
      applyCandlesToSeries(series, chart, candles);
    }

    const onResize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      chart.remove();
      chartRef.current  = null;
      seriesRef.current = null;
    };
  }, [height]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tick loop ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);

    tickRef.current = setInterval(() => {
      const series = seriesRef.current;
      if (!series) return;

      const inj = injRef.current;

      // ── Injection mode: deterministic rebuild from server params ──────────
      if (inj) {
        series.setData(buildInjectionSeries(inj, tfRef.current, Date.now()) as any);
        return;
      }

      // ── Live mode: accumulate WS price into candles ───────────────────────
      // Forex / metals / oil / indices are closed on the weekend — freeze the
      // chart (no new candles) so it doesn't fake movement while the real
      // market is shut. Crypto keeps ticking 24/7. Injections are unaffected.
      if (!isMarketOpen(symbol)) return;

      const price = livePriceRef.current;
      if (!price || price <= 0) return;

      const bucketMs = TF_CONFIG[tfRef.current].bucketMs;
      const bucket   = getBucket(Date.now(), bucketMs);
      const candles  = candlesRef.current;

      if (candles.has(bucket)) {
        const cd = candles.get(bucket)!;
        cd.high  = Math.max(cd.high, price);
        cd.low   = Math.min(cd.low,  price);
        cd.close = price;
      } else {
        const keys      = Array.from(candles.keys()).sort((a, b) => a - b);
        const prevClose = keys.length ? candles.get(keys[keys.length - 1])!.close : price;
        candles.set(bucket, { open: prevClose, high: Math.max(prevClose, price), low: Math.min(prevClose, price), close: price });
        if (candles.size > 400) candles.delete(keys[0]);
      }

      const currentLen = candles.size;
      if (currentLen !== prevLenRef.current) {
        const sorted = Array.from(candles.entries()).sort(([a], [b]) => a - b)
          .map(([t, cd]) => ({ time: t as any, ...cd }));
        series.setData(sorted as any);
        prevLenRef.current = currentLen;
        saveStoredCandles(symbol, tfRef.current, candles);
      } else {
        series.update({ time: bucket as any, ...candles.get(bucket)! } as any);
        // Periodically persist the still-forming candle too, not just completed ones.
        tickCountRef.current++;
        if (tickCountRef.current % 10 === 0) saveStoredCandles(symbol, tfRef.current, candles);
      }
    }, 1000);

    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>

      {/* Timeframe toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 10px 4px', borderBottom: '1px solid #f0f2f5' }}>
        {(['1m', '30m', '1h', 'D'] as TF[]).map(t => (
          <button key={t} onClick={() => setTF(t)} style={{
            padding: '4px 10px', borderRadius: 6, border: 'none',
            background: tf === t ? '#106cf5' : 'transparent',
            color:      tf === t ? '#fff'    : '#888',
            fontSize: 12, fontWeight: tf === t ? 700 : 500,
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {t}
          </button>
        ))}
        <div style={{ width: 1, height: 14, background: '#e0e3e8', margin: '0 6px' }} />
        <span style={{ fontSize: 11, color: '#bbb', userSelect: 'none', fontWeight: 600 }}>{symbol}</span>
      </div>

      {/* Chart canvas */}
      <div
        id={`chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`}
        ref={containerRef}
        style={{ width: '100%', height }}
      />
    </div>
  );
}

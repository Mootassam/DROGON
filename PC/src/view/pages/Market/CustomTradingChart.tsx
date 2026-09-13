import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, LineSeries, HistogramSeries, LineStyle, createSeriesMarkers } from 'lightweight-charts';
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

type TF = '1m' | '5m' | '10m' | '30m' | '1h' | 'D';
interface TFConfig { bucketMs: number; count: number; }

const TF_CONFIG: Record<TF, TFConfig> = {
  '1m':  { bucketMs:            60_000, count: 300 },
  '5m':  { bucketMs:     5 * 60_000,    count: 300 },
  '10m': { bucketMs:    10 * 60_000,    count: 300 },
  '30m': { bucketMs:    30 * 60_000,    count: 300 },
  '1h':  { bucketMs:    60 * 60_000,    count: 300 },
  'D':   { bucketMs: 24 * 60 * 60_000,  count: 365 },
};

interface OHLC { open: number; high: number; low: number; close: number; volume: number; }
interface Bar extends OHLC { time: number; }

interface Props {
  symbol:          string;
  livePrice:       number | null;
  height?:         number;
  priceInjection?: PriceInjection | null;
}

// ── Indicators ────────────────────────────────────────────────────────────────

type IndicatorKey =
  | 'ema50' | 'ema200' | 'bollinger' | 'vwap' | 'supportResistance'
  | 'macd'  | 'rsi'     | 'atr'       | 'stochastic' | 'volume'
  | 'candlePatterns' | 'marketStructure';

interface IndicatorEntry {
  series: any[];
  pane?: any;
  priceLines?: any[];
  markersPlugin?: any;
}

interface RenderCtx {
  chart: any;
  series: any;
  indicators: Map<IndicatorKey, IndicatorEntry>;
  tf: TF;
  symbol: string;
}

// Overlays render on the price pane; oscillators get their own pane below;
// patterns/structure attach marker plugins to the price series.
const OVERLAY_KEYS: IndicatorKey[]    = ['ema50', 'ema200', 'bollinger', 'vwap', 'supportResistance'];
const OSCILLATOR_KEYS: IndicatorKey[] = ['macd', 'rsi', 'atr', 'stochastic', 'volume'];
const PATTERN_KEYS: IndicatorKey[]    = ['candlePatterns'];
const STRUCTURE_KEYS: IndicatorKey[]  = ['marketStructure'];

const INDICATOR_LABELS: Record<IndicatorKey, string> = {
  ema50:              'EMA 50',
  ema200:             'EMA 200',
  bollinger:          'Bollinger Bands',
  vwap:               'VWAP',
  supportResistance:  'Support / Resistance',
  macd:               'MACD',
  rsi:                'RSI',
  atr:                'ATR (Average True Range)',
  stochastic:         'Stochastic Oscillator',
  volume:             'Volume',
  candlePatterns:     'Candlestick Patterns',
  marketStructure:    'Market Structure (HH/HL/LH/LL)',
};

const INDICATOR_PREFS_KEY = 'gc_chart_indicators_v1';

function loadIndicatorPrefs(): Set<IndicatorKey> {
  try {
    const raw = localStorage.getItem(INDICATOR_PREFS_KEY);
    if (!raw) return new Set();
    const all: IndicatorKey[] = [...OVERLAY_KEYS, ...OSCILLATOR_KEYS, ...PATTERN_KEYS, ...STRUCTURE_KEYS];
    const arr: string[] = JSON.parse(raw);
    return new Set(arr.filter((k): k is IndicatorKey => (all as string[]).includes(k)));
  } catch {
    return new Set();
  }
}

function saveIndicatorPrefs(keys: Set<IndicatorKey>): void {
  try {
    localStorage.setItem(INDICATOR_PREFS_KEY, JSON.stringify(Array.from(keys)));
  } catch {
    // ignore — indicator picks just won't persist across visits
  }
}

// Relative height budget: the price pane always keeps the lion's share; each
// active oscillator pane splits the remainder evenly. Total chart height never
// changes (some parent pages fix/clip the chart's height), so more oscillators
// means a smaller — never overflowing — price pane.
const PRICE_PANE_STRETCH      = 5;
const OSCILLATOR_PANE_STRETCH = 1;

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

// Per-candle volatility scales with sqrt(timeframe / 1m) — matches how a random
// walk's step size grows with elapsed time (30m/1h below were already tuned this
// way; 5m/10m follow the same sqrt(ratio) rule). 'D' is intentionally dampened
// below the pure sqrt value for a calmer daily chart.
const TF_VOL_SCALE: Record<TF, number> = { '1m': 1, '5m': 2.24, '10m': 3.16, '30m': 5.48, '1h': 7.75, 'D': 21.9 };

// ── Synthetic volume ─────────────────────────────────────────────────────────
// There's no real market-data backend, so volume (needed by the Volume pane and
// VWAP) is synthesized from candle size: bigger price moves ⇒ more "volume".

function volumeUnit(symbol: string, tf: TF): number {
  const s = symbol.toUpperCase();
  let unit = 5000;
  if (/BTC|ETH/.test(s))                                  unit = 500;
  else if (/LTC|SOL|ADA|DOT|AVAX|LINK|MATIC/.test(s))     unit = 2000;
  else if (/XAU|GOLD|XAG|SILVER/.test(s))                 unit = 800;
  else if (/JPY|USD|EUR|GBP|AUD|CHF|CAD|NZD/.test(s))     unit = 1_000_000;

  const scaleByTf: Record<TF, number> = { '1m': 1, '5m': 4.5, '10m': 8, '30m': 22, '1h': 40, 'D': 300 };
  return unit * scaleByTf[tf];
}

function estimateVolume(open: number, close: number, high: number, low: number, symbol: string, tf: TF): number {
  const unit       = volumeUnit(symbol, tf);
  const range       = Math.max(high - low, Math.abs(close - open), open * 1e-6);
  const bodyRatio   = range / open;
  const randomness  = 0.5 + Math.random() * 1.0;
  return Math.round(unit * randomness * (1 + bodyRatio * 50));
}

// ── Indicator math (pure functions over ascending Bar[]/closes[]) ──────────────

function sma(values: number[], period: number): (number | null)[] {
  const out: (number | null)[] = new Array(values.length).fill(null);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) out[i] = sum / period;
  }
  return out;
}

function ema(values: number[], period: number): (number | null)[] {
  const out: (number | null)[] = new Array(values.length).fill(null);
  if (values.length < period) return out;
  const k = 2 / (period + 1);
  let sum = 0;
  for (let i = 0; i < period; i++) sum += values[i];
  let prev = sum / period;
  out[period - 1] = prev;
  for (let i = period; i < values.length; i++) {
    prev = values[i] * k + prev * (1 - k);
    out[i] = prev;
  }
  return out;
}

function rsi(closes: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = new Array(closes.length).fill(null);
  if (closes.length < period + 1) return out;
  let gainSum = 0, lossSum = 0;
  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gainSum += diff; else lossSum -= diff;
  }
  let avgGain = gainSum / period;
  let avgLoss = lossSum / period;
  out[period] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    out[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  }
  return out;
}

function macd(closes: number[], fast = 12, slow = 26, signalPeriod = 9) {
  const emaFast = ema(closes, fast);
  const emaSlow = ema(closes, slow);
  const macdLine: (number | null)[] = closes.map((_, i) =>
    emaFast[i] != null && emaSlow[i] != null ? (emaFast[i] as number) - (emaSlow[i] as number) : null
  );

  const firstValid = macdLine.findIndex(v => v != null);
  const signal: (number | null)[] = new Array(closes.length).fill(null);
  if (firstValid >= 0) {
    const compact       = macdLine.slice(firstValid).map(v => v as number);
    const compactSignal = ema(compact, signalPeriod);
    compactSignal.forEach((v, idx) => { signal[firstValid + idx] = v; });
  }

  const hist: (number | null)[] = closes.map((_, i) =>
    macdLine[i] != null && signal[i] != null ? (macdLine[i] as number) - (signal[i] as number) : null
  );

  return { macdLine, signal, hist };
}

function bollinger(closes: number[], period = 20, mult = 2) {
  const basis = sma(closes, period);
  const upper: (number | null)[] = new Array(closes.length).fill(null);
  const lower: (number | null)[] = new Array(closes.length).fill(null);
  for (let i = period - 1; i < closes.length; i++) {
    const mean = basis[i] as number;
    let sumSq = 0;
    for (let j = i - period + 1; j <= i; j++) sumSq += (closes[j] - mean) ** 2;
    const sd = Math.sqrt(sumSq / period);
    upper[i] = mean + mult * sd;
    lower[i] = mean - mult * sd;
  }
  return { basis, upper, lower };
}

function atr(bars: Bar[], period = 14): (number | null)[] {
  const out: (number | null)[] = new Array(bars.length).fill(null);
  if (bars.length === 0) return out;
  const trs: number[] = new Array(bars.length).fill(0);
  for (let i = 0; i < bars.length; i++) {
    const { high, low } = bars[i];
    if (i === 0) { trs[i] = high - low; continue; }
    const prevClose = bars[i - 1].close;
    trs[i] = Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose));
  }
  if (bars.length < period) return out;
  let sum = 0;
  for (let i = 0; i < period; i++) sum += trs[i];
  let prev = sum / period;
  out[period - 1] = prev;
  for (let i = period; i < bars.length; i++) {
    prev = (prev * (period - 1) + trs[i]) / period;
    out[i] = prev;
  }
  return out;
}

function smoothSeries(values: (number | null)[], period: number): (number | null)[] {
  const out: (number | null)[] = new Array(values.length).fill(null);
  const window: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (v == null) { window.length = 0; continue; }
    window.push(v);
    if (window.length > period) window.shift();
    if (window.length === period) out[i] = window.reduce((a, b) => a + b, 0) / period;
  }
  return out;
}

function stochastic(bars: Bar[], kPeriod = 14, dPeriod = 3, smoothK = 3) {
  const rawK: (number | null)[] = new Array(bars.length).fill(null);
  for (let i = kPeriod - 1; i < bars.length; i++) {
    let hh = -Infinity, ll = Infinity;
    for (let j = i - kPeriod + 1; j <= i; j++) {
      hh = Math.max(hh, bars[j].high);
      ll = Math.min(ll, bars[j].low);
    }
    const range = hh - ll;
    rawK[i] = range === 0 ? 50 : ((bars[i].close - ll) / range) * 100;
  }
  const k = smoothK > 1 ? smoothSeries(rawK, smoothK) : rawK;
  const d = smoothSeries(k, dPeriod);
  return { k, d };
}

function vwap(bars: Bar[], tf: TF): (number | null)[] {
  const out: (number | null)[] = new Array(bars.length).fill(null);
  const resetDaily = tf !== 'D'; // 'D' bars are already daily — VWAP just accumulates across the series
  let cumPV = 0, cumVol = 0, lastDay = -1;
  for (let i = 0; i < bars.length; i++) {
    const b = bars[i];
    if (resetDaily) {
      const day = Math.floor(b.time / 86400);
      if (day !== lastDay) { cumPV = 0; cumVol = 0; lastDay = day; }
    }
    const typical = (b.high + b.low + b.close) / 3;
    const vol     = b.volume || 0;
    cumPV  += typical * vol;
    cumVol += vol;
    out[i] = cumVol > 0 ? cumPV / cumVol : typical;
  }
  return out;
}

/** Fractal swing highs/lows, clustered into a handful of horizontal levels. */
function detectSupportResistance(bars: Bar[], lookback = 3, maxLevels = 3): { price: number; kind: 'support' | 'resistance' }[] {
  if (bars.length < lookback * 2 + 1) return [];
  const swingHighs: number[] = [];
  const swingLows: number[]  = [];
  for (let i = lookback; i < bars.length - lookback; i++) {
    const h = bars[i].high;
    const l = bars[i].low;
    let isHigh = true, isLow = true;
    for (let j = i - lookback; j <= i + lookback; j++) {
      if (j === i) continue;
      if (bars[j].high >= h) isHigh = false;
      if (bars[j].low <= l)  isLow  = false;
    }
    if (isHigh) swingHighs.push(h);
    if (isLow)  swingLows.push(l);
  }

  const cluster = (arr: number[]): number[] => {
    if (arr.length === 0) return [];
    const sorted = [...arr].sort((a, b) => a - b);
    const clusters: number[][] = [[sorted[0]]];
    for (let i = 1; i < sorted.length; i++) {
      const v = sorted[i];
      const last = clusters[clusters.length - 1];
      if (Math.abs(v - last[last.length - 1]) / v < 0.0015) last.push(v);
      else clusters.push([v]);
    }
    return clusters
      .sort((a, b) => b.length - a.length)
      .slice(0, maxLevels)
      .map(c => c.reduce((a, b) => a + b, 0) / c.length);
  };

  const resistances = cluster(swingHighs).map(price => ({ price, kind: 'resistance' as const }));
  const supports    = cluster(swingLows).map(price => ({ price, kind: 'support' as const }));
  return [...resistances, ...supports];
}

/** Chronological swing highs/lows labeled HH/HL/LH/LL relative to the previous swing of the same kind. */
function detectMarketStructure(bars: Bar[], lookback = 3): { time: number; price: number; label: 'HH' | 'HL' | 'LH' | 'LL' }[] {
  if (bars.length < lookback * 2 + 1) return [];
  type Swing = { time: number; price: number; kind: 'high' | 'low' };
  const swings: Swing[] = [];
  for (let i = lookback; i < bars.length - lookback; i++) {
    const h = bars[i].high, l = bars[i].low;
    let isHigh = true, isLow = true;
    for (let j = i - lookback; j <= i + lookback; j++) {
      if (j === i) continue;
      if (bars[j].high >= h) isHigh = false;
      if (bars[j].low <= l)  isLow  = false;
    }
    if (isHigh) swings.push({ time: bars[i].time, price: h, kind: 'high' });
    if (isLow)  swings.push({ time: bars[i].time, price: l, kind: 'low' });
  }
  swings.sort((a, b) => a.time - b.time);

  const points: { time: number; price: number; label: 'HH' | 'HL' | 'LH' | 'LL' }[] = [];
  let lastHigh: number | null = null;
  let lastLow: number | null = null;
  for (const s of swings) {
    if (s.kind === 'high') {
      const label = lastHigh == null || s.price > lastHigh ? 'HH' : 'LH';
      points.push({ time: s.time, price: s.price, label });
      lastHigh = s.price;
    } else {
      const label = lastLow == null || s.price > lastLow ? 'HL' : 'LL';
      points.push({ time: s.time, price: s.price, label });
      lastLow = s.price;
    }
  }
  return points.slice(-24); // most recent swings only, to avoid clutter
}

/** Simple heuristic candlestick pattern scan (Doji, Engulfing, Hammer/Shooting Star, Morning/Evening Star). */
function detectCandlePatterns(bars: Bar[]): { time: number; label: string; bullish: boolean }[] {
  const hits: { time: number; label: string; bullish: boolean }[] = [];
  for (let i = 1; i < bars.length; i++) {
    const cur = bars[i], prev = bars[i - 1];
    const body       = Math.abs(cur.close - cur.open);
    const range      = cur.high - cur.low || 1e-9;
    const upperWick  = cur.high - Math.max(cur.open, cur.close);
    const lowerWick  = Math.min(cur.open, cur.close) - cur.low;
    const prevBody   = Math.abs(prev.close - prev.open);

    if (body / range < 0.1) {
      hits.push({ time: cur.time, label: 'Doji', bullish: cur.close >= cur.open });
      continue;
    }
    if (prev.close < prev.open && cur.close > cur.open && cur.close > prev.open && cur.open < prev.close) {
      hits.push({ time: cur.time, label: 'Bull Engulf', bullish: true });
      continue;
    }
    if (prev.close > prev.open && cur.close < cur.open && cur.open > prev.close && cur.close < prev.open) {
      hits.push({ time: cur.time, label: 'Bear Engulf', bullish: false });
      continue;
    }
    if (lowerWick > body * 2 && upperWick < body * 0.5 && body / range < 0.4) {
      hits.push({ time: cur.time, label: 'Hammer', bullish: true });
      continue;
    }
    if (upperWick > body * 2 && lowerWick < body * 0.5 && body / range < 0.4) {
      hits.push({ time: cur.time, label: 'Shooting Star', bullish: false });
      continue;
    }
    if (i >= 2) {
      const p2 = bars[i - 2];
      const p2Body = Math.abs(p2.close - p2.open);
      if (p2.close > p2.open && p2Body > range * 0.5 && prevBody < p2Body * 0.4 &&
          cur.close < cur.open && body > p2Body * 0.5 && cur.close < (p2.open + p2.close) / 2) {
        hits.push({ time: cur.time, label: 'Evening Star', bullish: false });
        continue;
      }
      if (p2.close < p2.open && p2Body > range * 0.5 && prevBody < p2Body * 0.4 &&
          cur.close > cur.open && body > p2Body * 0.5 && cur.close > (p2.open + p2.close) / 2) {
        hits.push({ time: cur.time, label: 'Morning Star', bullish: true });
        continue;
      }
    }
  }
  return hits.slice(-80); // most recent hits only, to avoid clutter
}

function toLineData(bars: Bar[], vals: (number | null)[]): { time: any; value: number }[] {
  const out: { time: any; value: number }[] = [];
  for (let i = 0; i < bars.length; i++) {
    if (vals[i] != null) out.push({ time: bars[i].time as any, value: vals[i] as number });
  }
  return out;
}

/** Recomputes and pushes data into every currently-active indicator series, plus the candles themselves. */
function renderChart(ctx: RenderCtx, bars: Bar[]): void {
  const { series, indicators, tf } = ctx;
  if (!series || bars.length === 0) return;

  series.setData(bars.map(b => ({ time: b.time as any, open: b.open, high: b.high, low: b.low, close: b.close })) as any);

  const closes = bars.map(b => b.close);

  const ema50 = indicators.get('ema50');
  if (ema50) ema50.series[0].setData(toLineData(bars, ema(closes, 50)) as any);

  const ema200 = indicators.get('ema200');
  if (ema200) ema200.series[0].setData(toLineData(bars, ema(closes, 200)) as any);

  const bb = indicators.get('bollinger');
  if (bb) {
    const { basis, upper, lower } = bollinger(closes, 20, 2);
    bb.series[0].setData(toLineData(bars, upper) as any);
    bb.series[1].setData(toLineData(bars, basis) as any);
    bb.series[2].setData(toLineData(bars, lower) as any);
  }

  const vw = indicators.get('vwap');
  if (vw) vw.series[0].setData(toLineData(bars, vwap(bars, tf)) as any);

  const sr = indicators.get('supportResistance');
  if (sr) {
    for (const line of sr.priceLines || []) series.removePriceLine(line);
    const levels = detectSupportResistance(bars);
    sr.priceLines = levels.map(lvl => series.createPriceLine({
      price:            lvl.price,
      color:            lvl.kind === 'resistance' ? '#ef5350' : '#26a69a',
      lineWidth:        1,
      lineStyle:        LineStyle.Dashed,
      axisLabelVisible: true,
      title:            lvl.kind === 'resistance' ? 'R' : 'S',
    } as any));
  }

  const macdEntry = indicators.get('macd');
  if (macdEntry) {
    const { macdLine, signal, hist } = macd(closes, 12, 26, 9);
    macdEntry.series[0].setData(
      bars.map((b, i) => (hist[i] == null
        ? { time: b.time as any }
        : { time: b.time as any, value: hist[i] as number, color: (hist[i] as number) >= 0 ? '#26a69a' : '#ef5350' })
      ) as any
    );
    macdEntry.series[1].setData(toLineData(bars, macdLine) as any);
    macdEntry.series[2].setData(toLineData(bars, signal) as any);
  }

  const rsiEntry = indicators.get('rsi');
  if (rsiEntry) rsiEntry.series[0].setData(toLineData(bars, rsi(closes, 14)) as any);

  const atrEntry = indicators.get('atr');
  if (atrEntry) atrEntry.series[0].setData(toLineData(bars, atr(bars, 14)) as any);

  const stochEntry = indicators.get('stochastic');
  if (stochEntry) {
    const { k, d } = stochastic(bars, 14, 3, 3);
    stochEntry.series[0].setData(toLineData(bars, k) as any);
    stochEntry.series[1].setData(toLineData(bars, d) as any);
  }

  const volEntry = indicators.get('volume');
  if (volEntry) {
    volEntry.series[0].setData(bars.map(b => ({
      time:  b.time as any,
      value: b.volume,
      color: b.close >= b.open ? 'rgba(38,166,154,0.6)' : 'rgba(239,83,80,0.6)',
    })) as any);
  }

  const patEntry = indicators.get('candlePatterns');
  if (patEntry?.markersPlugin) {
    const hits = detectCandlePatterns(bars);
    patEntry.markersPlugin.setMarkers(hits.map(h => ({
      time:     h.time as any,
      position: h.bullish ? 'belowBar' : 'aboveBar',
      shape:    h.bullish ? 'arrowUp' : 'arrowDown',
      color:    h.bullish ? '#26a69a' : '#ef5350',
      text:     h.label,
    })));
  }

  const msEntry = indicators.get('marketStructure');
  if (msEntry?.markersPlugin) {
    const points = detectMarketStructure(bars);
    msEntry.markersPlugin.setMarkers(points.map(p => ({
      time:     p.time as any,
      position: (p.label === 'HH' || p.label === 'LH') ? 'aboveBar' : 'belowBar',
      shape:    'circle',
      color:    p.label === 'HH' ? '#16a34a' : p.label === 'LH' ? '#f97316' : p.label === 'HL' ? '#2563eb' : '#ef4444',
      text:     p.label,
      size:     0.6,
    })));
  }
}

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
    const high   = Math.max(open, close) + wick * (0.15 + Math.random() * 0.7);
    const low    = Math.min(open, close) - wick * (0.15 + Math.random() * 0.7);
    bars.push({ time: bucket, open, high, low, close, volume: estimateVolume(open, close, high, low, symbol, tf) });
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

// Cap on persisted history per symbol/timeframe. Higher than the initial
// generation length so bars added by scroll-back lazy-loading (below) survive
// across visits instead of being trimmed back down on the next load.
const MAX_STORED_BARS = 5000;

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
    // Backward-compat: candles cached before the volume field existed.
    Array.from(stored.values()).forEach(cd => {
      if (cd.volume == null) cd.volume = estimateVolume(cd.open, cd.close, cd.high, cd.low, symbol, tf);
    });

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
        const high   = Math.max(open, close) + wick * (0.15 + Math.random() * 0.7);
        const low    = Math.min(open, close) - wick * (0.15 + Math.random() * 0.7);
        stored.set(bucket, { open, close, high, low, volume: estimateVolume(open, close, high, low, symbol, tf) });
        prevClose = close;
      }
    }

    const trimKeys = Array.from(stored.keys()).sort((a, b) => a - b);
    if (trimKeys.length > MAX_STORED_BARS) {
      for (const k of trimKeys.slice(0, trimKeys.length - MAX_STORED_BARS)) stored.delete(k);
    }

    saveStoredCandles(symbol, tf, stored);
    return stored;
  }

  const bars = generateHistory(currentPrice, symbol, tf);
  const fresh = new Map(bars.map(b => [b.time, { open: b.open, high: b.high, low: b.low, close: b.close, volume: b.volume }]));
  saveStoredCandles(symbol, tf, fresh);
  return fresh;
}

/**
 * Generates `addCount` more synthetic candles further back in time than the
 * earliest candle currently held, contiguous with it (the new segment's last
 * close feeds forward into the existing earliest candle's open) — used to
 * satisfy scroll-back requests past the initially loaded history so the user
 * never hits a blank wall when scrolling left.
 */
function prependHistory(symbol: string, tf: TF, candles: Map<number, OHLC>, addCount: number): Map<number, OHLC> {
  const { bucketMs } = TF_CONFIG[tf];
  const bucketSec = bucketMs / 1000;
  const keys = Array.from(candles.keys()).sort((a, b) => a - b);
  if (keys.length === 0) return candles;

  const earliestBucket = keys[0];
  const anchor = candles.get(earliestBucket)!.open;
  const vol    = baseVol(symbol) * TF_VOL_SCALE[tf];

  const closes: number[] = [anchor];
  for (let i = 1; i <= addCount; i++) {
    const prev  = closes[i - 1];
    const delta = (Math.random() - 0.5) * 2 * vol * prev;
    closes.push(Math.max(prev * 0.5, prev - delta));
  }

  for (let i = 0; i < addCount; i++) {
    const bucket = earliestBucket - (i + 1) * bucketSec;
    const close  = closes[i];
    const open   = closes[i + 1];
    const body   = Math.abs(close - open);
    const floor  = anchor * 0.00005;
    const wick   = Math.max(body, floor) * (0.5 + Math.random() * 2);
    const high   = Math.max(open, close) + wick * (0.15 + Math.random() * 0.7);
    const low    = Math.min(open, close) - wick * (0.15 + Math.random() * 0.7);
    candles.set(bucket, { open, close, high, low, volume: estimateVolume(open, close, high, low, symbol, tf) });
  }

  saveStoredCandles(symbol, tf, candles);
  return candles;
}

function applyCandlesToSeries(ctx: RenderCtx, candles: Map<number, OHLC>, currentBarsRef: { current: Bar[] }): void {
  const bars: Bar[] = Array.from(candles.entries())
    .sort(([a], [b]) => a - b)
    .map(([t, cd]) => ({ time: t, ...cd }));
  currentBarsRef.current = bars;
  renderChart(ctx, bars);
  ctx.chart?.timeScale().scrollToPosition(5, false);
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
  // history candles drawn to the left), used as the volatility floor — capped to
  // the actual distance being travelled. Without this cap, a small requested move
  // (e.g. the admin's entryPrice ± entryPrice*pct/10000 formula) can be much
  // smaller than a symbol's normal candle size on higher timeframes (Daily BTC
  // natural volatility ≈1.5% vs. a 10% "profit" move ≈0.1%), so the random-walk
  // noise would dwarf the move and the chart would swing/wick far past the
  // marked close price before snapping back in the final candles.
  const rawNatStep = Math.max(entry * baseVol(inj.symbol) * TF_VOL_SCALE[tf], entry * 1e-6);
  const natStep = Math.min(rawNatStep, Math.max(Math.abs(dist) * 0.5, entry * 1e-6));

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
    const high = Math.max(open, close) + wickUp;
    const low  = Math.min(open, close) - wickDn;
    injBars.push({ time, open, high, low, close, volume: estimateVolume(open, close, high, low, inj.symbol, tf) });
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
    const high  = Math.max(open, close) + wick * 0.4;
    const low   = Math.min(open, close) - wick * 0.4;
    histBars.push({ time, open, high, low, close, volume: estimateVolume(open, close, high, low, inj.symbol, tf) });
  }

  return [...histBars, ...injBars]; // strictly ascending by time
}

// ── Manual drawing tools (trend line, horizontal line, rectangle, pattern
//    polyline, text, ruler) ───────────────────────────────────────────────────
// Drawings are rendered on a plain <canvas> overlaid on top of the chart
// (redrawn continuously via requestAnimationFrame) rather than as lightweight-
// charts primitives, since they only ever target the price pane and this is
// far simpler than implementing the full ISeriesPrimitive contract. Points are
// stored as {time, price} so a drawing keeps its correct position no matter how
// the user pans/zooms.

type DrawingTool = 'cursor' | 'trendline' | 'hline' | 'rect' | 'pattern' | 'text' | 'ruler' | 'delete';
type DrawingType = 'trendline' | 'hline' | 'rect' | 'pattern' | 'text' | 'ruler';

interface DrawingPoint { time: number; price: number; }
interface Drawing {
  id:     string;
  type:   DrawingType;
  points: DrawingPoint[];
  text?:  string;
  color?: string;
}

const DRAWINGS_STORAGE_PREFIX = 'gc_chart_drawings_v1_';

function loadDrawings(symbol: string): Drawing[] {
  try {
    const raw = localStorage.getItem(DRAWINGS_STORAGE_PREFIX + symbol);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDrawings(symbol: string, drawings: Drawing[]): void {
  try {
    localStorage.setItem(DRAWINGS_STORAGE_PREFIX + symbol, JSON.stringify(drawings));
  } catch {
    // ignore — drawings just won't persist across visits
  }
}

function makeDrawingId(): string {
  return `d${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
}

type XY = { x: number; y: number };

function distToSegment(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = a.x + t * dx, cy = a.y + t * dy;
  return Math.hypot(p.x - cx, p.y - cy);
}

/** Redraws every persisted drawing plus the in-progress one being placed. */
function redrawOverlay(
  canvas: HTMLCanvasElement,
  chart: any,
  series: any,
  drawings: Drawing[],
  pending: DrawingPoint[],
  activeTool: DrawingTool,
  hover: DrawingPoint | null,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const cw = canvas.width / dpr, ch = canvas.height / dpr;
  ctx.clearRect(0, 0, cw, ch);

  const toXY = (p: DrawingPoint): XY | null => {
    const x = chart.timeScale().timeToCoordinate(p.time as any);
    const y = series.priceToCoordinate(p.price);
    return x == null || y == null ? null : { x, y };
  };

  const strokeLine = (a: XY, b: XY, color: string, width = 1.5, dash?: number[]) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
    ctx.restore();
  };

  for (const d of drawings) {
    const pts = d.points.map(toXY).filter((p): p is XY => p != null);
    if (pts.length === 0) continue;
    const color = d.color || '#2563eb';

    if (d.type === 'trendline' && pts.length >= 2) {
      strokeLine(pts[0], pts[1], color, 2);
    } else if (d.type === 'hline') {
      strokeLine({ x: 0, y: pts[0].y }, { x: cw, y: pts[0].y }, color, 1.5, [5, 3]);
    } else if (d.type === 'rect' && pts.length >= 2) {
      const x = Math.min(pts[0].x, pts[1].x), y = Math.min(pts[0].y, pts[1].y);
      const w = Math.abs(pts[1].x - pts[0].x), h = Math.abs(pts[1].y - pts[0].y);
      ctx.save();
      ctx.fillStyle = color + '22';
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      ctx.restore();
    } else if (d.type === 'pattern' && pts.length >= 2) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); }
      ctx.restore();
    } else if (d.type === 'text') {
      ctx.save();
      ctx.fillStyle = color;
      ctx.font = '12px sans-serif';
      ctx.fillText(d.text || '', pts[0].x + 4, pts[0].y - 4);
      ctx.restore();
    } else if (d.type === 'ruler' && pts.length >= 2) {
      strokeLine(pts[0], pts[1], '#111827', 1.5, [2, 2]);
      const midX = (pts[0].x + pts[1].x) / 2, midY = (pts[0].y + pts[1].y) / 2;
      const label = d.text || '';
      ctx.save();
      ctx.font = '11px sans-serif';
      const w = ctx.measureText(label).width + 10;
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#111827';
      ctx.lineWidth = 1;
      ctx.fillRect(midX - w / 2, midY - 10, w, 18);
      ctx.strokeRect(midX - w / 2, midY - 10, w, 18);
      ctx.fillStyle = '#111827';
      ctx.fillText(label, midX - w / 2 + 5, midY + 3);
      ctx.restore();
    }
  }

  // In-progress preview for the tool currently being used.
  if (pending.length >= 1) {
    const a = toXY(pending[pending.length - 1]);
    const b = hover ? toXY(hover) : null;
    if (activeTool === 'trendline' && a && b) {
      strokeLine(a, b, '#2563eb', 1.5, [4, 3]);
    } else if (activeTool === 'rect' && a && b) {
      ctx.save();
      ctx.strokeStyle = '#8b5cf6';
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      ctx.restore();
    } else if (activeTool === 'ruler' && a && b) {
      strokeLine(a, b, '#111827', 1.5, [2, 2]);
    } else if (activeTool === 'pattern') {
      if (a && b) strokeLine(a, b, '#ef4444', 1.5, [3, 2]);
      for (const p of pending) {
        const xy = toXY(p);
        if (xy) { ctx.beginPath(); ctx.arc(xy.x, xy.y, 3, 0, Math.PI * 2); ctx.fillStyle = '#ef4444'; ctx.fill(); }
      }
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CustomTradingChart({
  symbol, livePrice, height = 400, priceInjection,
}: Props) {

  const [tf, setTF] = useState<TF>('D');
  const [activeIndicators, setActiveIndicators] = useState<Set<IndicatorKey>>(() => loadIndicatorPrefs());
  const [showIndicatorMenu, setShowIndicatorMenu] = useState(false);
  const [activeTool, setActiveTool] = useState<DrawingTool>('cursor');
  const [showRiskPanel, setShowRiskPanel] = useState(false);
  const [riskDirection, setRiskDirection] = useState<'long' | 'short'>('long');
  const [riskEntry, setRiskEntry] = useState('');
  const [riskSL, setRiskSL] = useState('');
  const [riskTP, setRiskTP] = useState('');
  const [riskAccount, setRiskAccount] = useState('');
  const [riskPct, setRiskPct] = useState('1');

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef     = useRef<any>(null);
  const seriesRef    = useRef<any>(null);

  const livePriceRef = useRef<number | null>(livePrice);
  const tfRef        = useRef<TF>('D');
  const symbolRef    = useRef(symbol);
  const injRef       = useRef<PriceInjection | null>(null);
  const prevInjRef   = useRef<PriceInjection | null>(null);
  const isExtendingRef = useRef(false);

  // Live (non-injection) candle buffer
  const candlesRef   = useRef<Map<number, OHLC>>(new Map());
  const seenNullRef  = useRef(false);
  const histLoadedRef = useRef(false);
  const tickRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickCountRef = useRef(0);

  // Active indicator series/panes + the last rendered bars (for instant redraw on toggle)
  const indicatorSeriesRef = useRef<Map<IndicatorKey, IndicatorEntry>>(new Map());
  const currentBarsRef     = useRef<Bar[]>([]);

  // Manual drawing tools
  const activeToolRef     = useRef<DrawingTool>('cursor');
  const drawingsRef       = useRef<Drawing[]>([]);
  const pendingPointsRef  = useRef<DrawingPoint[]>([]);
  const hoverPointRef     = useRef<DrawingPoint | null>(null);

  // Risk management price lines
  const riskLinesRef = useRef<any[]>([]);

  useEffect(() => { livePriceRef.current = livePrice; }, [livePrice]);
  useEffect(() => { tfRef.current = tf; }, [tf]);
  useEffect(() => { symbolRef.current = symbol; }, [symbol]);
  useEffect(() => { activeToolRef.current = activeTool; }, [activeTool]);

  const getCtx = (): RenderCtx => ({
    chart:      chartRef.current,
    series:     seriesRef.current,
    indicators: indicatorSeriesRef.current,
    tf:         tfRef.current,
    symbol:     symbolRef.current,
  });

  // ── Indicator pane/series lifecycle ─────────────────────────────────────────
  const createIndicator = (key: IndicatorKey) => {
    const chart = chartRef.current;
    const mainSeries = seriesRef.current;
    if (!chart || !mainSeries || indicatorSeriesRef.current.has(key)) return;

    switch (key) {
      case 'ema50': {
        const s = chart.addSeries(LineSeries as any, { color: '#f59e0b', lineWidth: 2, priceLineVisible: false, lastValueVisible: false } as any, 0);
        indicatorSeriesRef.current.set(key, { series: [s] });
        break;
      }
      case 'ema200': {
        const s = chart.addSeries(LineSeries as any, { color: '#8b5cf6', lineWidth: 2, priceLineVisible: false, lastValueVisible: false } as any, 0);
        indicatorSeriesRef.current.set(key, { series: [s] });
        break;
      }
      case 'bollinger': {
        const upper = chart.addSeries(LineSeries as any, { color: 'rgba(96,165,250,0.7)', lineWidth: 1, priceLineVisible: false, lastValueVisible: false } as any, 0);
        const basis = chart.addSeries(LineSeries as any, { color: 'rgba(96,165,250,0.9)', lineWidth: 1, lineStyle: LineStyle.Dashed, priceLineVisible: false, lastValueVisible: false } as any, 0);
        const lower = chart.addSeries(LineSeries as any, { color: 'rgba(96,165,250,0.7)', lineWidth: 1, priceLineVisible: false, lastValueVisible: false } as any, 0);
        indicatorSeriesRef.current.set(key, { series: [upper, basis, lower] });
        break;
      }
      case 'vwap': {
        const s = chart.addSeries(LineSeries as any, { color: '#eab308', lineWidth: 2, priceLineVisible: false, lastValueVisible: false } as any, 0);
        indicatorSeriesRef.current.set(key, { series: [s] });
        break;
      }
      case 'supportResistance': {
        indicatorSeriesRef.current.set(key, { series: [], priceLines: [] });
        break;
      }
      case 'macd': {
        const pane = chart.addPane(true);
        pane.setStretchFactor(OSCILLATOR_PANE_STRETCH);
        const idx = pane.paneIndex();
        const hist   = chart.addSeries(HistogramSeries as any, { priceLineVisible: false, lastValueVisible: false } as any, idx);
        const macdL  = chart.addSeries(LineSeries as any, { color: '#2563eb', lineWidth: 1.5, priceLineVisible: false, lastValueVisible: false } as any, idx);
        const signal = chart.addSeries(LineSeries as any, { color: '#f97316', lineWidth: 1.5, priceLineVisible: false, lastValueVisible: false } as any, idx);
        indicatorSeriesRef.current.set(key, { series: [hist, macdL, signal], pane });
        break;
      }
      case 'rsi': {
        const pane = chart.addPane(true);
        pane.setStretchFactor(OSCILLATOR_PANE_STRETCH);
        const idx = pane.paneIndex();
        const s = chart.addSeries(LineSeries as any, { color: '#7c3aed', lineWidth: 1.5, priceLineVisible: false, lastValueVisible: false } as any, idx);
        s.createPriceLine({ price: 70, color: '#bbb', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '70' } as any);
        s.createPriceLine({ price: 30, color: '#bbb', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '30' } as any);
        indicatorSeriesRef.current.set(key, { series: [s], pane });
        break;
      }
      case 'atr': {
        const pane = chart.addPane(true);
        pane.setStretchFactor(OSCILLATOR_PANE_STRETCH);
        const idx = pane.paneIndex();
        const s = chart.addSeries(LineSeries as any, { color: '#0ea5e9', lineWidth: 1.5, priceLineVisible: false, lastValueVisible: false } as any, idx);
        indicatorSeriesRef.current.set(key, { series: [s], pane });
        break;
      }
      case 'stochastic': {
        const pane = chart.addPane(true);
        pane.setStretchFactor(OSCILLATOR_PANE_STRETCH);
        const idx = pane.paneIndex();
        const k = chart.addSeries(LineSeries as any, { color: '#2563eb', lineWidth: 1.5, priceLineVisible: false, lastValueVisible: false } as any, idx);
        const d = chart.addSeries(LineSeries as any, { color: '#f97316', lineWidth: 1.5, priceLineVisible: false, lastValueVisible: false } as any, idx);
        k.createPriceLine({ price: 80, color: '#bbb', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '80' } as any);
        k.createPriceLine({ price: 20, color: '#bbb', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: '20' } as any);
        indicatorSeriesRef.current.set(key, { series: [k, d], pane });
        break;
      }
      case 'volume': {
        const pane = chart.addPane(true);
        pane.setStretchFactor(OSCILLATOR_PANE_STRETCH);
        const idx = pane.paneIndex();
        const s = chart.addSeries(HistogramSeries as any, { priceLineVisible: false, lastValueVisible: false } as any, idx);
        indicatorSeriesRef.current.set(key, { series: [s], pane });
        break;
      }
      case 'candlePatterns':
      case 'marketStructure': {
        const markersPlugin = createSeriesMarkers(mainSeries, []);
        indicatorSeriesRef.current.set(key, { series: [], markersPlugin });
        break;
      }
    }
  };

  const removeIndicator = (key: IndicatorKey) => {
    const chart = chartRef.current;
    const mainSeries = seriesRef.current;
    const entry = indicatorSeriesRef.current.get(key);
    if (!chart || !entry) return;

    if (entry.priceLines && mainSeries) {
      for (const line of entry.priceLines) mainSeries.removePriceLine(line);
    }
    entry.markersPlugin?.detach();
    for (const s of entry.series) chart.removeSeries(s);
    if (entry.pane) chart.removePane(entry.pane.paneIndex());

    indicatorSeriesRef.current.delete(key);
  };

  const handleToggleIndicator = (key: IndicatorKey) => {
    setActiveIndicators(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        removeIndicator(key);
      } else {
        next.add(key);
        createIndicator(key);
        if (currentBarsRef.current.length) renderChart(getCtx(), currentBarsRef.current);
      }
      saveIndicatorPrefs(next);
      return next;
    });
  };

  // ── Manual drawing tools ─────────────────────────────────────────────────────
  const finalizePendingPattern = () => {
    if (pendingPointsRef.current.length >= 2) {
      drawingsRef.current.push({ id: makeDrawingId(), type: 'pattern', points: [...pendingPointsRef.current], color: '#ef4444' });
      saveDrawings(symbolRef.current, drawingsRef.current);
    }
    pendingPointsRef.current = [];
  };

  const selectTool = (tool: DrawingTool) => {
    if (activeToolRef.current === 'pattern' && tool !== 'pattern') finalizePendingPattern();
    if (tool === 'pattern' && activeToolRef.current === 'pattern') { finalizePendingPattern(); setActiveTool('pattern'); return; }
    pendingPointsRef.current = [];
    setActiveTool(tool);
  };

  const clearAllDrawings = () => {
    if (drawingsRef.current.length === 0) return;
    if (!window.confirm('Clear all drawings on this chart?')) return;
    drawingsRef.current = [];
    pendingPointsRef.current = [];
    saveDrawings(symbolRef.current, []);
  };

  // Input is handled via native pointer events attached directly to our overlay
  // canvas (see the effect below) — not React's onClick/onMouseMove props, and
  // not lightweight-charts' chart.subscribeClick/subscribeCrosshairMove (those
  // fire relative to internal pane bookkeeping that isn't reliable across chart
  // versions/layouts, e.g. paneIndex being undefined on a single-pane chart).
  // Native listeners + pointer events are the most predictable way to capture
  // clicks/taps on a canvas across mouse, touch and pen input.
  type PointerLike = { clientX: number; clientY: number };

  const canvasPointFromEvent = (e: PointerLike): DrawingPoint | null => {
    const chart = chartRef.current;
    const series = seriesRef.current;
    const canvas = overlayCanvasRef.current;
    if (!chart || !series || !canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const price = series.coordinateToPrice(y);
    const time  = chart.timeScale().coordinateToTime(x);
    if (price == null || time == null) return null;
    return { time: time as number, price };
  };

  const handleCanvasMouseMove = (e: PointerLike) => {
    if (activeToolRef.current === 'cursor') return;
    hoverPointRef.current = canvasPointFromEvent(e);
  };

  const handleCanvasMouseLeave = () => { hoverPointRef.current = null; };

  const handleCanvasClick = (e: PointerLike) => {
    const tool = activeToolRef.current;
    if (tool === 'cursor') return;
    const chart = chartRef.current;
    const mainSeries = seriesRef.current;
    const canvas = overlayCanvasRef.current;
    if (!chart || !mainSeries || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const pt = canvasPointFromEvent(e);
    if (!pt) return;

    if (tool === 'delete') {
      const TOL = 8;
      const drawings = drawingsRef.current;
      for (let i = drawings.length - 1; i >= 0; i--) {
        const d = drawings[i];
        const pts = d.points.map(dp => {
          const x = chart.timeScale().timeToCoordinate(dp.time as any);
          const y = mainSeries.priceToCoordinate(dp.price);
          return x == null || y == null ? null : { x: x as number, y: y as number };
        }).filter((p): p is XY => p != null);
        if (pts.length === 0) continue;

        let hit = false;
        if (d.type === 'hline') {
          hit = Math.abs(pts[0].y - clickY) <= TOL;
        } else if (d.type === 'text') {
          hit = Math.hypot(pts[0].x - clickX, pts[0].y - clickY) <= 14;
        } else if (d.type === 'rect' && pts.length >= 2) {
          const rx = Math.min(pts[0].x, pts[1].x), ry = Math.min(pts[0].y, pts[1].y);
          const rw = Math.abs(pts[1].x - pts[0].x), rh = Math.abs(pts[1].y - pts[0].y);
          const nearBorder = clickX >= rx - TOL && clickX <= rx + rw + TOL && clickY >= ry - TOL && clickY <= ry + rh + TOL &&
            (clickX <= rx + TOL || clickX >= rx + rw - TOL || clickY <= ry + TOL || clickY >= ry + rh - TOL);
          hit = nearBorder;
        } else if (pts.length >= 2) {
          for (let k = 0; k < pts.length - 1; k++) {
            if (distToSegment({ x: clickX, y: clickY }, pts[k], pts[k + 1]) <= TOL) { hit = true; break; }
          }
        }
        if (hit) {
          drawings.splice(i, 1);
          saveDrawings(symbolRef.current, drawings);
          break;
        }
      }
      return;
    }

    if (tool === 'hline') {
      drawingsRef.current.push({ id: makeDrawingId(), type: 'hline', points: [pt], color: '#f59e0b' });
      saveDrawings(symbolRef.current, drawingsRef.current);
      return;
    }

    if (tool === 'text') {
      const label = window.prompt('Label text:');
      if (label && label.trim()) {
        drawingsRef.current.push({ id: makeDrawingId(), type: 'text', points: [pt], text: label.trim(), color: '#111827' });
        saveDrawings(symbolRef.current, drawingsRef.current);
      }
      return;
    }

    if (tool === 'pattern') {
      pendingPointsRef.current.push(pt);
      return;
    }

    // trendline / rect / ruler — two-click tools
    pendingPointsRef.current.push(pt);
    if (pendingPointsRef.current.length >= 2) {
      const [a, b] = pendingPointsRef.current;
      if (tool === 'ruler') {
        const priceDiff = b.price - a.price;
        const pctDiff   = a.price !== 0 ? (priceDiff / a.price) * 100 : 0;
        const barsDiff  = Math.round(Math.abs(b.time - a.time) / (TF_CONFIG[tfRef.current].bucketMs / 1000));
        const label = `${priceDiff >= 0 ? '+' : ''}${priceDiff.toFixed(4)} (${pctDiff >= 0 ? '+' : ''}${pctDiff.toFixed(2)}%) · ${barsDiff} bars`;
        drawingsRef.current.push({ id: makeDrawingId(), type: 'ruler', points: [a, b], text: label, color: '#111827' });
      } else {
        drawingsRef.current.push({ id: makeDrawingId(), type: tool as DrawingType, points: [a, b], color: tool === 'trendline' ? '#2563eb' : '#8b5cf6' });
      }
      saveDrawings(symbolRef.current, drawingsRef.current);
      pendingPointsRef.current = [];
    }
  };

  // Native listeners (not React's onClick/onMouseMove props) so drawing input
  // doesn't depend on React's synthetic event system reaching a <canvas> that
  // sits visually above lightweight-charts' own canvases.
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const onDown  = (e: PointerEvent) => handleCanvasClick(e);
    const onMove  = (e: PointerEvent) => handleCanvasMouseMove(e);
    const onLeave = () => handleCanvasMouseLeave();
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Risk management tool ─────────────────────────────────────────────────────
  const clearRiskLines = () => {
    const series = seriesRef.current;
    if (series) riskLinesRef.current.forEach(l => series.removePriceLine(l));
    riskLinesRef.current = [];
  };

  const openRiskPanel = () => {
    if (!riskEntry) {
      const last = currentBarsRef.current[currentBarsRef.current.length - 1];
      const price = livePriceRef.current ?? (last ? last.close : null);
      if (price) {
        const sl = riskDirection === 'long' ? price * 0.98 : price * 1.02;
        const tp = riskDirection === 'long' ? price * 1.04 : price * 0.96;
        setRiskEntry(price.toFixed(5));
        setRiskSL(sl.toFixed(5));
        setRiskTP(tp.toFixed(5));
      }
    }
    setShowRiskPanel(true);
  };

  const entryNum   = parseFloat(riskEntry);
  const slNum      = parseFloat(riskSL);
  const tpNum      = parseFloat(riskTP);
  const accountNum = parseFloat(riskAccount);
  const pctNum     = parseFloat(riskPct);
  const riskPerUnit   = isFinite(entryNum) && isFinite(slNum) ? Math.abs(entryNum - slNum) : null;
  const rewardPerUnit = isFinite(entryNum) && isFinite(tpNum) ? Math.abs(tpNum - entryNum) : null;
  const rrRatio       = riskPerUnit && riskPerUnit > 0 && rewardPerUnit != null ? rewardPerUnit / riskPerUnit : null;
  const riskAmount    = isFinite(accountNum) && isFinite(pctNum) ? accountNum * (pctNum / 100) : null;
  const positionSize  = riskAmount != null && riskPerUnit && riskPerUnit > 0 ? riskAmount / riskPerUnit : null;

  const applyRiskLines = () => {
    const series = seriesRef.current;
    if (!series) return;
    clearRiskLines();
    if (isFinite(entryNum)) riskLinesRef.current.push(series.createPriceLine({ price: entryNum, color: '#2563eb', lineWidth: 2, lineStyle: LineStyle.Solid, axisLabelVisible: true, title: 'Entry' } as any));
    if (isFinite(slNum))    riskLinesRef.current.push(series.createPriceLine({ price: slNum, color: '#ef4444', lineWidth: 2, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: 'SL' } as any));
    if (isFinite(tpNum))    riskLinesRef.current.push(series.createPriceLine({ price: tpNum, color: '#22c55e', lineWidth: 2, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: 'TP' } as any));
  };

  // ── Sync injection ref; rebuild immediately on start/end/change ─────────────
  useEffect(() => {
    const active = priceInjection && priceInjection.symbol === symbol ? priceInjection : null;

    if (active) {
      injRef.current = active;
      // Draw immediately so there's no 1s delay before the trend appears
      if (seriesRef.current) {
        const bars = buildInjectionSeries(active, tfRef.current, Date.now());
        currentBarsRef.current = bars;
        renderChart(getCtx(), bars);
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
          applyCandlesToSeries(getCtx(), candles, currentBarsRef);
        }
      }
    }
    prevInjRef.current = active;
  }, [priceInjection, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reset live buffer + indicators + drawings on symbol change ─────────────
  useEffect(() => {
    candlesRef.current    = new Map();
    histLoadedRef.current = false;
    seenNullRef.current   = false;
    currentBarsRef.current = [];
    drawingsRef.current    = loadDrawings(symbol);
    pendingPointsRef.current = [];
    setRiskEntry(''); setRiskSL(''); setRiskTP('');
    clearRiskLines();
    if (seriesRef.current && !injRef.current) {
      seriesRef.current.setData([]);
      indicatorSeriesRef.current.forEach(entry => {
        entry.series.forEach(s => s.setData([]));
        entry.markersPlugin?.setMarkers([]);
        if (entry.priceLines && entry.priceLines.length && seriesRef.current) {
          entry.priceLines.forEach((line: any) => seriesRef.current.removePriceLine(line));
          entry.priceLines = [];
        }
      });
    }
  }, [symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Load live history once a real price arrives (only when NOT injecting) ───
  useEffect(() => {
    if (injRef.current) return;
    if (livePrice === null) { seenNullRef.current = true; return; }
    if (!seenNullRef.current || histLoadedRef.current || !seriesRef.current) return;
    histLoadedRef.current = true;
    const candles = loadOrCreateHistory(symbol, tf, livePrice);
    candlesRef.current = candles;
    applyCandlesToSeries(getCtx(), candles, currentBarsRef);
  }, [livePrice, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Rebuild on timeframe change ─────────────────────────────────────────────
  useEffect(() => {
    if (!seriesRef.current) return;
    if (injRef.current) {
      const bars = buildInjectionSeries(injRef.current, tf, Date.now());
      currentBarsRef.current = bars;
      renderChart(getCtx(), bars);
      return;
    }
    const price = livePriceRef.current;
    if (!price) return;
    const candles = loadOrCreateHistory(symbol, tf, price);
    candlesRef.current = candles;
    applyCandlesToSeries(getCtx(), candles, currentBarsRef);
  }, [tf, symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Init chart ──────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width:  containerRef.current.clientWidth,
      height,
      layout: { background: { color: '#ffffff' }, textColor: '#666', fontSize: 12, attributionLogo: false },
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

    chart.panes()[0]?.setStretchFactor(PRICE_PANE_STRETCH);

    chartRef.current  = chart;
    seriesRef.current = series;
    indicatorSeriesRef.current.clear();
    drawingsRef.current = loadDrawings(symbolRef.current);
    pendingPointsRef.current = [];

    // Restore whichever indicators the user had enabled before (empty until data loads below).
    loadIndicatorPrefs().forEach(key => createIndicator(key));

    // Initial draw if we already have an injection or a live price
    if (injRef.current) {
      const bars = buildInjectionSeries(injRef.current, tfRef.current, Date.now());
      currentBarsRef.current = bars;
      renderChart(getCtx(), bars);
    } else if (livePriceRef.current) {
      const candles = loadOrCreateHistory(symbol, tfRef.current, livePriceRef.current);
      candlesRef.current = candles;
      histLoadedRef.current = true;
      applyCandlesToSeries(getCtx(), candles, currentBarsRef);
    }

    // ── Drawing overlay canvas sizing ───────────────────────────────────────
    const resizeOverlay = () => {
      const canvas = overlayCanvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth, h = container.clientHeight;
      canvas.width  = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      const octx = canvas.getContext('2d');
      octx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeOverlay();

    const onResize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
      resizeOverlay();
    };
    window.addEventListener('resize', onResize);

    // Continuously redraw the overlay so it tracks panning/zooming/live updates.
    let rafId = 0;
    const loop = () => {
      const canvas = overlayCanvasRef.current;
      if (canvas && chartRef.current && seriesRef.current) {
        redrawOverlay(canvas, chartRef.current, seriesRef.current, drawingsRef.current, pendingPointsRef.current, activeToolRef.current, hoverPointRef.current);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ── Scroll-back lazy loading ────────────────────────────────────────────
    // Only `count` bars are generated up front; without this, scrolling past
    // the oldest loaded candle hits a blank wall. When the visible range nears
    // the start of the data, silently prepend more synthetic history and shift
    // the visible range by the same amount so the scroll position doesn't jump.
    const LOAD_BACK_THRESHOLD = 15;
    const LOAD_BACK_COUNT     = 200;
    const handleVisibleRangeChange = (range: { from: number; to: number } | null) => {
      if (!range || range.from > LOAD_BACK_THRESHOLD) return;
      if (injRef.current || isExtendingRef.current) return;
      const candles = candlesRef.current;
      if (candles.size === 0 || candles.size >= MAX_STORED_BARS) return;

      isExtendingRef.current = true;
      const extended = prependHistory(symbolRef.current, tfRef.current, candles, LOAD_BACK_COUNT);
      candlesRef.current = extended;

      const bars: Bar[] = Array.from(extended.entries()).sort(([a], [b]) => a - b)
        .map(([t, cd]) => ({ time: t, ...cd }));
      currentBarsRef.current = bars;
      renderChart(getCtx(), bars);
      chart.timeScale().setVisibleLogicalRange({ from: range.from + LOAD_BACK_COUNT, to: range.to + LOAD_BACK_COUNT });

      requestAnimationFrame(() => { isExtendingRef.current = false; });
    };
    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleRangeChange);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
      chart.remove();
      chartRef.current  = null;
      seriesRef.current = null;
      indicatorSeriesRef.current.clear();
    };
  }, [height]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tick loop ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);

    tickRef.current = setInterval(() => {
      const series = seriesRef.current;
      if (!series) return;

      const ctx = getCtx();
      const inj = injRef.current;

      // ── Injection mode: deterministic rebuild from server params ──────────
      if (inj) {
        const bars = buildInjectionSeries(inj, tfRef.current, Date.now());
        currentBarsRef.current = bars;
        renderChart(ctx, bars);
        return;
      }

      // ── Live mode: accumulate WS price into candles ───────────────────────
      // Forex / metals / oil / indices are closed on the weekend — freeze the
      // chart (no new candles) so it doesn't fake movement while the real
      // market is shut. Crypto keeps ticking 24/7. Injections are unaffected.
      const symbolNow = symbolRef.current;
      if (!isMarketOpen(symbolNow)) return;

      const price = livePriceRef.current;
      if (!price || price <= 0) return;

      const tfNow    = tfRef.current;
      const bucketMs = TF_CONFIG[tfNow].bucketMs;
      const bucket   = getBucket(Date.now(), bucketMs);
      const candles  = candlesRef.current;

      const tickVolInc = Math.max(1, Math.round(volumeUnit(symbolNow, tfNow) / (bucketMs / 1000) * (0.5 + Math.random())));

      let isNewBucket = false;
      if (candles.has(bucket)) {
        const cd = candles.get(bucket)!;
        cd.high   = Math.max(cd.high, price);
        cd.low    = Math.min(cd.low,  price);
        cd.close  = price;
        cd.volume = (cd.volume || 0) + tickVolInc;
      } else {
        isNewBucket = true;
        const keys      = Array.from(candles.keys()).sort((a, b) => a - b);
        const prevClose = keys.length ? candles.get(keys[keys.length - 1])!.close : price;
        candles.set(bucket, {
          open: prevClose, high: Math.max(prevClose, price), low: Math.min(prevClose, price), close: price,
          volume: tickVolInc,
        });
        if (candles.size > 400) candles.delete(keys[0]);
      }

      const sorted: Bar[] = Array.from(candles.entries()).sort(([a], [b]) => a - b)
        .map(([t, cd]) => ({ time: t, ...cd }));
      currentBarsRef.current = sorted;
      renderChart(ctx, sorted);

      tickCountRef.current++;
      if (isNewBucket || tickCountRef.current % 10 === 0) saveStoredCandles(symbolNow, tfNow, candles);
    }, 1000);

    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Drawing tool icon buttons ─────────────────────────────────────────────
  const DRAW_TOOLS: { key: DrawingTool; label: string; icon: JSX.Element }[] = [
    { key: 'cursor', label: 'Cursor', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 2v3M8 11v3M2 8h3M11 8h3" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ) },
    { key: 'trendline', label: 'Trend Line', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="3" y1="13" x2="13" y2="3" />
        <circle cx="3" cy="13" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="13" cy="3" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ) },
    { key: 'hline', label: 'Horizontal Line', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="2" y1="8" x2="14" y2="8" />
        <circle cx="2" cy="8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="14" cy="8" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ) },
    { key: 'rect', label: 'Rectangle', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2.5" y="4" width="11" height="8" rx="1" />
      </svg>
    ) },
    { key: 'pattern', label: 'Pattern (click points, click tool again to finish)', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M2 13L6 6L10 10L14 3" />
        <circle cx="2" cy="13" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="6" cy="6" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="10" cy="10" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="14" cy="3" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ) },
    { key: 'text', label: 'Text', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 3h10M8 3v10" strokeLinecap="round" />
      </svg>
    ) },
    { key: 'ruler', label: 'Measure', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="2" y1="14" x2="14" y2="2" strokeLinecap="round" />
        <path d="M5 11l1.4-1.4M8 8l1.4-1.4M11 5l1.4-1.4" strokeLinecap="round" />
      </svg>
    ) },
    { key: 'delete', label: 'Erase (click a drawing to remove it)', icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3.5 5h9M6.5 5V3.3h3V5M5.5 5l.8 8.7h3.4l.8-8.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>

      {/* Toolbar row 1: timeframe buttons + indicators menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px 4px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{ display: 'flex', gap: 2, overflowX: 'auto', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
          {(['1m', '5m', '10m', '30m', '1h', 'D'] as TF[]).map(t => (
            <button key={t} onClick={() => setTF(t)} style={{
              padding: '4px 8px', borderRadius: 6, border: 'none', flexShrink: 0,
              background: tf === t ? '#106cf5' : 'transparent',
              color:      tf === t ? '#fff'    : '#888',
              fontSize: 12, fontWeight: tf === t ? 700 : 500,
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setShowIndicatorMenu(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 8px', borderRadius: 6, border: '1px solid #e0e3e8',
              background: showIndicatorMenu ? '#f0f4ff' : '#fff',
              color: '#444', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            Indicators{activeIndicators.size > 0 ? ` (${activeIndicators.size})` : ''} ▾
          </button>

          {showIndicatorMenu && (
            <>
              <div onClick={() => setShowIndicatorMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 19 }} />
              <div style={{
                position: 'absolute', top: '110%', right: 0, zIndex: 20,
                background: '#fff', border: '1px solid #e0e3e8', borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)', padding: 10, width: 200,
                maxHeight: Math.max(180, height - 60), overflowY: 'auto',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: 0.4, marginBottom: 2 }}>OVERLAYS</div>
                {OVERLAY_KEYS.map(key => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px', fontSize: 12, color: '#333', cursor: 'pointer' }}>
                    <input type="checkbox" checked={activeIndicators.has(key)} onChange={() => handleToggleIndicator(key)} />
                    {INDICATOR_LABELS[key]}
                  </label>
                ))}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: 0.4, margin: '8px 0 2px' }}>OSCILLATORS</div>
                {OSCILLATOR_KEYS.map(key => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px', fontSize: 12, color: '#333', cursor: 'pointer' }}>
                    <input type="checkbox" checked={activeIndicators.has(key)} onChange={() => handleToggleIndicator(key)} />
                    {INDICATOR_LABELS[key]}
                  </label>
                ))}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: 0.4, margin: '8px 0 2px' }}>PATTERNS</div>
                {PATTERN_KEYS.map(key => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px', fontSize: 12, color: '#333', cursor: 'pointer' }}>
                    <input type="checkbox" checked={activeIndicators.has(key)} onChange={() => handleToggleIndicator(key)} />
                    {INDICATOR_LABELS[key]}
                  </label>
                ))}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: 0.4, margin: '8px 0 2px' }}>STRUCTURE</div>
                {STRUCTURE_KEYS.map(key => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px', fontSize: 12, color: '#333', cursor: 'pointer' }}>
                    <input type="checkbox" checked={activeIndicators.has(key)} onChange={() => handleToggleIndicator(key)} />
                    {INDICATOR_LABELS[key]}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toolbar row 2: drawing tools + risk management */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{ display: 'flex', gap: 2, overflowX: 'auto', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
          {DRAW_TOOLS.map(({ key, label, icon }) => (
            <button
              key={key}
              title={label}
              onClick={() => selectTool(key)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 26, height: 26, borderRadius: 6, border: 'none', flexShrink: 0,
                background: activeTool === key ? '#106cf5' : 'transparent',
                color: activeTool === key ? '#fff' : '#666',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {icon}
            </button>
          ))}
          <button
            title="Clear all drawings"
            onClick={clearAllDrawings}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: 6, border: 'none', flexShrink: 0,
              background: 'transparent', color: '#999', cursor: 'pointer',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M3.5 5h9M6.5 5V3.3h3V5M5.5 5l.8 8.7h3.4l.8-8.7" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1.5" y1="1.5" x2="14.5" y2="14.5" />
            </svg>
          </button>
        </div>

        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => (showRiskPanel ? setShowRiskPanel(false) : openRiskPanel())}
            style={{
              padding: '4px 8px', borderRadius: 6, border: '1px solid #e0e3e8',
              background: showRiskPanel ? '#f0f4ff' : '#fff',
              color: '#444', fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            Risk Mgmt
          </button>

          {showRiskPanel && (
            <>
              <div onClick={() => setShowRiskPanel(false)} style={{ position: 'fixed', inset: 0, zIndex: 19 }} />
              <div style={{
                position: 'absolute', top: '110%', right: 0, zIndex: 20,
                background: '#fff', border: '1px solid #e0e3e8', borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)', padding: 12, width: 220,
                maxHeight: Math.max(220, height - 60), overflowY: 'auto',
              }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  {(['long', 'short'] as const).map(d => (
                    <button key={d} onClick={() => setRiskDirection(d)} style={{
                      flex: 1, padding: '4px 0', borderRadius: 6, border: 'none',
                      background: riskDirection === d ? (d === 'long' ? '#26a69a' : '#ef5350') : '#f0f2f5',
                      color: riskDirection === d ? '#fff' : '#666',
                      fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase',
                    }}>
                      {d}
                    </button>
                  ))}
                </div>

                {[
                  { label: 'Entry', value: riskEntry, set: setRiskEntry },
                  { label: 'Stop Loss', value: riskSL, set: setRiskSL },
                  { label: 'Take Profit', value: riskTP, set: setRiskTP },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>{f.label}</div>
                    <input
                      type="text" inputMode="decimal" value={f.value}
                      onChange={e => f.set(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '4px 6px', borderRadius: 6, border: '1px solid #e0e3e8', fontSize: 12 }}
                    />
                  </div>
                ))}

                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Account $</div>
                    <input
                      type="text" inputMode="decimal" value={riskAccount} onChange={e => setRiskAccount(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '4px 6px', borderRadius: 6, border: '1px solid #e0e3e8', fontSize: 12 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: '#999', marginBottom: 2 }}>Risk %</div>
                    <input
                      type="text" inputMode="decimal" value={riskPct} onChange={e => setRiskPct(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '4px 6px', borderRadius: 6, border: '1px solid #e0e3e8', fontSize: 12 }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: 11, color: '#333', lineHeight: 1.6, background: '#f8f9fb', borderRadius: 6, padding: '6px 8px', marginBottom: 8 }}>
                  <div>Risk/unit: {riskPerUnit != null ? riskPerUnit.toFixed(5) : '—'}</div>
                  <div>Reward/unit: {rewardPerUnit != null ? rewardPerUnit.toFixed(5) : '—'}</div>
                  <div>R:R = {rrRatio != null ? `1:${rrRatio.toFixed(2)}` : '—'}</div>
                  {riskAmount != null && <div>Risk amount: ${riskAmount.toFixed(2)}</div>}
                  {positionSize != null && <div>Position size: {positionSize.toFixed(4)} units</div>}
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={applyRiskLines} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', background: '#106cf5', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    Apply to chart
                  </button>
                  <button onClick={clearRiskLines} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: '1px solid #e0e3e8', background: '#fff', color: '#666', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    Clear
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {activeTool !== 'cursor' && (
        <div style={{ padding: '4px 10px', fontSize: 11, color: '#888', background: '#f8f9fb', borderBottom: '1px solid #f0f2f5' }}>
          {activeTool === 'pattern'
            ? 'Click to add points to the pattern outline; click the Pattern tool again to finish.'
            : activeTool === 'delete'
              ? 'Click a drawing to remove it.'
              : 'Click the chart to place this drawing.'}
        </div>
      )}

      {/* Chart canvas + drawing overlay */}
      <div style={{ position: 'relative', width: '100%', height }}>
        <div
          id={`chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`}
          ref={containerRef}
          style={{ width: '100%', height: '100%' }}
        />
        <canvas
          ref={overlayCanvasRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 5,
            pointerEvents: activeTool === 'cursor' ? 'none' : 'auto',
            touchAction: activeTool === 'cursor' ? 'auto' : 'none',
            cursor: activeTool === 'cursor' ? 'default' : activeTool === 'delete' ? 'not-allowed' : 'crosshair',
          }}
        />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Market trading hours
// ----------------------------------------------------------------------
// Crypto trades 24/7. Forex / metals / oil / indices follow the FX week:
// the market opens Sunday 22:00 UTC and closes Friday 22:00 UTC, and is
// fully closed on Saturday and most of Sunday. We freeze all simulated
// price movement (chart candles, order book, recent trades) while a
// symbol's market is closed so the app behaves like a real broker.
// ----------------------------------------------------------------------

// Symbols that trade around the clock, every day of the week.
const CRYPTO_RE = /BTC|ETH|LTC|XRP|ADA|DOGE|SOL|BNB|DOT|AVAX|LINK|MATIC|TRX|BCH|XLM|ATOM|UNI|USDT|USDC/;

/** True when the symbol is a cryptocurrency (open 24/7). */
export function isCrypto(symbol: string): boolean {
  return CRYPTO_RE.test((symbol || '').toUpperCase());
}

/**
 * Whether the given symbol's market is currently open.
 * Crypto is always open. Everything else is closed on the FX weekend
 * (Fri 22:00 UTC → Sun 22:00 UTC).
 */
export function isMarketOpen(symbol: string, now: Date = new Date()): boolean {
  if (isCrypto(symbol)) return true;

  const day  = now.getUTCDay();   // 0 = Sunday … 6 = Saturday
  const hour = now.getUTCHours(); // 0 … 23

  if (day === 6) return false;                 // all of Saturday
  if (day === 0 && hour < 22) return false;    // Sunday before 22:00 UTC
  if (day === 5 && hour >= 22) return false;   // Friday from 22:00 UTC

  return true;
}

/** Convenience inverse of isMarketOpen. */
export function isMarketClosed(symbol: string, now: Date = new Date()): boolean {
  return !isMarketOpen(symbol, now);
}

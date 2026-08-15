import { useState, useEffect } from 'react';
import authAxios from 'src/modules/shared/axios/authAxios';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SymbolInjection {
  orderId:     string;
  symbol:      string;
  entryPrice:  number;   // animation start price (trade open)
  targetPrice: number;   // animation end price (close price)
  startedAt:   number;   // ms since epoch
  durationMs:  number;
  seed:        number;   // deterministic seed shared across all devices
}

// ── Easing (must match CustomTradingChart for header/chart agreement) ──────────

export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Deterministic current price for an injection at "now".
 * Identical on every device because it only depends on server-provided data.
 */
export function getInjectionDisplayPrice(inj: SymbolInjection, _fallback?: number): number {
  const prog = Math.min(1, Math.max(0, (Date.now() - inj.startedAt) / inj.durationMs));
  return inj.entryPrice + easeInOutSine(prog) * (inj.targetPrice - inj.entryPrice);
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Polls the server every 8 s for active global chart injections.
 * Returns a map of symbol → SymbolInjection.
 *
 * Uses the PUBLIC endpoint (no auth, no tenant required) so EVERY visitor —
 * signed in or not, on any device — receives the same data and every chart
 * animates identically. No localStorage involved.
 */
export default function useSymbolInjections(): Record<string, SymbolInjection> {
  const [injections, setInjections] = useState<Record<string, SymbolInjection>>({});

  useEffect(() => {
    let alive = true;
    const poll = async () => {
      try {
        const { data } = await authAxios.get(`/symbol-injections-public`);
        if (!alive) return;
        const arr: SymbolInjection[] = data?.injections ?? [];
        const nowMs = Date.now();
        const map: Record<string, SymbolInjection> = {};
        arr.forEach(inj => {
          if (inj.startedAt + inj.durationMs > nowMs) map[inj.symbol] = inj;
        });
        setInjections(map);
      } catch {
        /* keep last known state */
      }
    };

    poll();
    const id = setInterval(poll, 8_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  return injections;
}

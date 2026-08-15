import React from 'react';

// ----------------------------------------------------------------------
// Pair definitions – single source of truth for all pages
// ----------------------------------------------------------------------
export interface Pair {
  symbol: string;
  name: string;
  // Country flags (flagcdn.com 2-letter codes). undefined = show badge.
  baseFlag?: string;
  quoteFlag?: string;
  // Colored badge for metals & crypto
  badgeColor?: string;
  badgeLetter?: string;
}

export const PAIRS: Pair[] = [
  // Metals
  { symbol: 'XAUUSD', name: 'Gold',         badgeColor: '#d4af37', badgeLetter: 'Au' },
  { symbol: 'XAGUSD', name: 'Silver',        badgeColor: '#9ea3a8', badgeLetter: 'Ag' },
  // Forex majors
  { symbol: 'EURUSD', name: 'EUR / USD',     baseFlag: 'eu', quoteFlag: 'us' },
  { symbol: 'GBPUSD', name: 'GBP / USD',     baseFlag: 'gb', quoteFlag: 'us' },
  { symbol: 'AUDUSD', name: 'AUD / USD',     baseFlag: 'au', quoteFlag: 'us' },
  { symbol: 'USDJPY', name: 'USD / JPY',     baseFlag: 'us', quoteFlag: 'jp' },
  { symbol: 'NZDUSD', name: 'NZD / USD',     baseFlag: 'nz', quoteFlag: 'us' },
  { symbol: 'USDCHF', name: 'USD / CHF',     baseFlag: 'us', quoteFlag: 'ch' },
  { symbol: 'USDCAD', name: 'USD / CAD',     baseFlag: 'us', quoteFlag: 'ca' },
  // Forex crosses
  { symbol: 'EURJPY', name: 'EUR / JPY',     baseFlag: 'eu', quoteFlag: 'jp' },
  { symbol: 'EURCHF', name: 'EUR / CHF',     baseFlag: 'eu', quoteFlag: 'ch' },
  { symbol: 'EURNZD', name: 'EUR / NZD',     baseFlag: 'eu', quoteFlag: 'nz' },
  { symbol: 'EURAUD', name: 'EUR / AUD',     baseFlag: 'eu', quoteFlag: 'au' },
  { symbol: 'EURCAD', name: 'EUR / CAD',     baseFlag: 'eu', quoteFlag: 'ca' },
  { symbol: 'EURGBP', name: 'EUR / GBP',     baseFlag: 'eu', quoteFlag: 'gb' },
  { symbol: 'GBPJPY', name: 'GBP / JPY',     baseFlag: 'gb', quoteFlag: 'jp' },
  { symbol: 'GBPAUD', name: 'GBP / AUD',     baseFlag: 'gb', quoteFlag: 'au' },
  { symbol: 'GBPNZD', name: 'GBP / NZD',     baseFlag: 'gb', quoteFlag: 'nz' },
  { symbol: 'AUDJPY', name: 'AUD / JPY',     baseFlag: 'au', quoteFlag: 'jp' },
  { symbol: 'AUDNZD', name: 'AUD / NZD',     baseFlag: 'au', quoteFlag: 'nz' },
  { symbol: 'CADJPY', name: 'CAD / JPY',     baseFlag: 'ca', quoteFlag: 'jp' },
  { symbol: 'NZDJPY', name: 'NZD / JPY',     baseFlag: 'nz', quoteFlag: 'jp' },
  // Oil
  { symbol: 'USOIL',  name: 'US Oil',        baseFlag: 'us' },
  { symbol: 'UKOIL',  name: 'UK Oil',        baseFlag: 'gb' },
  // Crypto
  { symbol: 'BTCUSD', name: 'Bitcoin',       badgeColor: '#F7931A', badgeLetter: '₿' },
  { symbol: 'ETHUSD', name: 'Ethereum',      badgeColor: '#627EEA', badgeLetter: 'Ξ' },
  { symbol: 'LTCUSD', name: 'Litecoin',      badgeColor: '#345D9D', badgeLetter: 'Ł' },
  // Indices
  { symbol: 'NAS100', name: 'Nasdaq 100',    baseFlag: 'us' },
  { symbol: 'SPX500', name: 'S&P 500',       baseFlag: 'us' },
  { symbol: 'US30',   name: 'Dow Jones 30',  baseFlag: 'us' },
  { symbol: 'UK100',  name: 'FTSE 100',      baseFlag: 'gb' },
  { symbol: 'GER30',  name: 'DAX 30',        baseFlag: 'de' },
  { symbol: 'FRA40',  name: 'CAC 40',        baseFlag: 'fr' },
  { symbol: 'ESP35',  name: 'IBEX 35',       baseFlag: 'es' },
  { symbol: 'AUS200', name: 'ASX 200',       baseFlag: 'au' },
  { symbol: 'JPN225', name: 'Nikkei 225',    baseFlag: 'jp' },
];

/** Lookup a pair by symbol. Returns undefined if not in the list. */
export function getPairInfo(symbol: string): Pair | undefined {
  return PAIRS.find(p => p.symbol === symbol);
}

// ----------------------------------------------------------------------
// PairIcon – shared visual component used by Market, MarketDetail, Futures
// Size variants: 'sm' (28px) for lists, 'md' (36px) for page headers
// ----------------------------------------------------------------------
interface PairIconProps {
  pair: Pair;
  size?: 'sm' | 'md';
}

export const PairIcon: React.FC<PairIconProps> = ({ pair, size = 'sm' }) => {
  const isMd = size === 'md';

  // Dimensions
  const baseSize  = isMd ? 32 : 24;
  const quoteSize = isMd ? 22 : 18;
  const singleSize = isMd ? 36 : 28;
  const badgeSize  = isMd ? 36 : 28;
  const containerW = pair.quoteFlag ? (isMd ? 46 : 34) : (isMd ? 40 : 32);
  const containerH = isMd ? 36 : 26;

  const flagUrl = (code: string) => `https://flagcdn.com/w40/${code}.png`;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: containerW,
    height: containerH,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
  };

  const circleBase: React.CSSProperties = {
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1.5px solid #fff',
    background: '#e9ebef',
  };

  // Badge (metals / crypto)
  if (pair.badgeColor) {
    return (
      <div style={containerStyle}>
        <div style={{
          ...circleBase,
          width: badgeSize,
          height: badgeSize,
          background: pair.badgeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMd ? 13 : 11,
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-0.3px',
          border: 'none',
        }}>
          {pair.badgeLetter}
        </div>
      </div>
    );
  }

  // Two overlapping country flags (forex crosses)
  if (pair.baseFlag && pair.quoteFlag) {
    return (
      <div style={containerStyle}>
        <img
          src={flagUrl(pair.baseFlag)}
          alt=""
          style={{ ...circleBase, width: baseSize, height: baseSize, position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <img
          src={flagUrl(pair.quoteFlag)}
          alt=""
          style={{ ...circleBase, width: quoteSize, height: quoteSize, position: 'absolute', right: 0, bottom: 0, zIndex: 2 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    );
  }

  // Single country flag (oil, indices)
  if (pair.baseFlag) {
    return (
      <div style={containerStyle}>
        <img
          src={flagUrl(pair.baseFlag)}
          alt=""
          style={{ ...circleBase, width: singleSize, height: singleSize }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    );
  }

  // Fallback letter badge
  return (
    <div style={containerStyle}>
      <div style={{
        ...circleBase,
        width: badgeSize,
        height: badgeSize,
        background: '#aaa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isMd ? 13 : 11,
        fontWeight: 700,
        color: 'white',
        border: 'none',
      }}>
        {pair.name.charAt(0)}
      </div>
    </div>
  );
};

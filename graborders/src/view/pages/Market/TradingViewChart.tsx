import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
  height?: number;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  height = 500,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  const tvSymbol = useMemo(() => {
    const s = symbol.toUpperCase();

    const cryptoSymbols = [
      'BTCUSD','ETHUSD','XRPUSD','SOLUSD','ADAUSD','DOGEUSD','DOTUSD','AVAXUSD',
      'LINKUSD','MATICUSD','UNIUSD','ATOMUSD','LTCUSD','BCHUSD','NEARUSD','ALGOUSD',
      'VETUSD','FILUSD','THETAUSD','AXSUSD','SANDUSD','MANAUSD','ENJUSD','CHZUSD','APEUSD'
    ];
    if (cryptoSymbols.includes(s)) {
      return `BINANCE:${s.replace('USD','')}USDT`;
    }

    const forexSymbols = [
      'EURUSD','GBPUSD','USDJPY','AUDUSD','USDCAD','USDCHF','NZDUSD','EURGBP','EURJPY',
      'GBPJPY','AUDJPY','EURAUD','GBPAUD','USDMXN','USDTRY','USDZAR','USDSGD','USDHKD',
      'USDKRW','USDINR','EURCHF','EURNZD','GBPEUR','AUDNZD','CADJPY','CHFJPY','NZDJPY',
      'SGDJPY','HKDJPY','ZARJPY'
    ];
    if (forexSymbols.includes(s)) {
      return `FX:${s}`;
    }

    if (['XAUUSD','XAGUSD','XPTUSD','XPDUSD','XAUEUR','XAGEUR','XPTEUR','XAUGBP','XAGGBP'].includes(s)) {
      return `OANDA:${s}`;
    }

    if (['USOIL','UKOIL','BRENT','WTI','CRUDE','NGAS','HEAT','GAS'].includes(s)) {
      return `OANDA:${s}`;
    }

    const indexSymbols = [
      'US30','US500','NAS100','US2000','GER40','UK100','FRA40','EU50','JP225','HK50',
      'AUS200','TWII','KR100','IN50','TECH100'
    ];
    if (indexSymbols.includes(s)) {
      return `TVC:${s}`;
    }

    return s;
  }, [symbol]);

  // Load TradingView script once globally
  useEffect(() => {
    if (!document.getElementById('tradingview-widget-script')) {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Create or update chart widget
  useLayoutEffect(() => {
    const initWidget = () => {
      if (!containerRef.current || !window.TradingView) return;

      containerRef.current.innerHTML = '';

      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: tvSymbol,
        interval: '1D',
        timezone: 'Etc/UTC',
        theme: 'light',                        // ✅ changed from 'dark' to 'light'
        style: '1',
        locale: 'en',
        toolbar_bg: '#f8f9fb',                 // ✅ light background matching the market page
        enable_publishing: false,
        allow_symbol_change: false,
        container_id: containerRef.current.id,
        height,
        width: '100%',
        studies: [],
        withdateranges: false,
      });
    };

    if (window.TradingView) {
      initWidget();
    } else {
      const timer = setInterval(() => {
        if (window.TradingView) {
          clearInterval(timer);
          initWidget();
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [tvSymbol, height]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      widgetRef.current = null;
    };
  }, []);

  return (
    <div
      id={`tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`}
      ref={containerRef}
      style={{ width: '100%', height }}
    />
  );
};

export default TradingViewChart;
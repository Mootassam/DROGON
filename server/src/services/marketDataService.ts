import axios from 'axios';
import { RedisService } from '../database/redisConnection';

// Symbol mappings
const YAHOO_SYMBOLS: Record<string, string> = {
  // Forex
  EURUSD: 'EURUSD=X', GBPUSD: 'GBPUSD=X', USDJPY: 'USDJPY=X',
  AUDUSD: 'AUDUSD=X', USDCAD: 'USDCAD=X', USDCHF: 'USDCHF=X',
  NZDUSD: 'NZDUSD=X', EURGBP: 'EURGBP=X', EURJPY: 'EURJPY=X',
  GBPJPY: 'GBPJPY=X', AUDJPY: 'AUDJPY=X', EURAUD: 'EURAUD=X',
  GBPAUD: 'GBPAUD=X', USDMXN: 'USDMXN=X', USDTRY: 'USDTRY=X',
  USDZAR: 'USDZAR=X', USDSGD: 'USDSGD=X', USDHKD: 'USDHKD=X',
  USDKRW: 'USDKRW=X', USDINR: 'USDINR=X',
  // Metals
  XAUUSD: 'GC=F', XAGUSD: 'SI=F', XPTUSD: 'PL=F', XPDUSD: 'PA=F',
  // Oil & Gas
  USOIL: 'CL=F', UKOIL: 'BZ=F', NGAS: 'NG=F',
  // Indices
  US30: 'YM=F', US500: 'ES=F', NAS100: 'NQ=F', US2000: 'RTY=F',
  GER40: 'DAX', UK100: 'FTSE', FRA40: 'FCHI', EU50: 'STOXX50E', JP225: 'N225',
};

const BINANCE_SYMBOLS: Record<string, string> = {
  BTCUSD: 'BTCUSDT', ETHUSD: 'ETHUSDT', XRPUSD: 'XRPUSDT',
  SOLUSD: 'SOLUSDT', ADAUSD: 'ADAUSDT', DOGEUSD: 'DOGEUSDT',
  DOTUSD: 'DOTUSDT', AVAXUSD: 'AVAXUSDT', LINKUSD: 'LINKUSDT',
  UNIUSD: 'UNIUSDT', ATOMUSD: 'ATOMUSDT', LTCUSD: 'LTCUSDT',
  BCHUSD: 'BCHUSDT', NEARUSD: 'NEARUSDT', ALGOUSD: 'ALGOUSDT',
  VETUSD: 'VETUSDT', FILUSD: 'FILUSDT', THETAUSD: 'THETAUSDT',
  AXSUSD: 'AXSUSDT', SANDUSD: 'SANDUSDT', MANAUSD: 'MANAUSDT',
  ENJUSD: 'ENJUSDT', CHZUSD: 'CHZUSDT', APEUSD: 'APEUSDT',
};

type PriceData = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
};

class MarketDataService {
  private redis = RedisService.getClient();
  private readonly CACHE_KEY = 'market:data';
  private readonly CACHE_TTL = 5; // seconds

  /**
   * Fetch all market data from Yahoo Finance (Forex, Metals, Oil, Indices)
   */
  async fetchYahooData(symbols: string[]): Promise<Record<string, PriceData>> {
    const results: Record<string, PriceData> = {};

    // Yahoo allows batch query with comma-separated symbols
    const yahooIds = symbols.map(s => YAHOO_SYMBOLS[s] || s).join(',');
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooIds}?interval=1m&range=1d`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });

      const data = response.data;
      const chartResults = data?.chart?.result || [];

      for (const result of chartResults) {
        const meta = result.meta;
        const symbolKey = meta?.symbol?.replace('=', '') || '';
        // Find our symbol by reverse lookup
        const ourSymbol = Object.keys(YAHOO_SYMBOLS).find(
          key => YAHOO_SYMBOLS[key] === meta?.symbol
        );

        if (!ourSymbol) continue;

        const price = meta.regularMarketPrice;
        const previousClose = meta.previousClose || meta.chartPreviousClose || price;
        const change = price - previousClose;
        const changePercent = previousClose ? (change / previousClose) * 100 : 0;

        results[ourSymbol] = {
          symbol: ourSymbol,
          price,
          change,
          changePercent,
          high: meta.regularMarketDayHigh || price,
          low: meta.regularMarketDayLow || price,
          volume: meta.regularMarketVolume || 0,
          timestamp: Date.now(),
        };
      }
    } catch (error) {
      console.error('Yahoo Finance fetch error:', error.message);
    }

    return results;
  }

  /**
   * Fetch Binance crypto data via REST (fallback)
   */
  async fetchBinanceData(symbols: string[]): Promise<Record<string, PriceData>> {
    const results: Record<string, PriceData> = {};
    const binancePairs = symbols.map(s => BINANCE_SYMBOLS[s] || s.replace('USD', 'USDT')).join(',');

    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${binancePairs.split(',').map(s => `"${s}"`).join(',')}]`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
      });

      const data = response.data;
      if (Array.isArray(data)) {
        for (const item of data) {
          const binanceSymbol = item.symbol;
          const ourSymbol = Object.keys(BINANCE_SYMBOLS).find(
            key => BINANCE_SYMBOLS[key] === binanceSymbol
          );

          if (!ourSymbol) continue;

          const price = parseFloat(item.lastPrice);
          const change = parseFloat(item.priceChange);
          const changePercent = parseFloat(item.priceChangePercent);
          const high = parseFloat(item.highPrice);
          const low = parseFloat(item.lowPrice);
          const volume = parseFloat(item.volume);

          results[ourSymbol] = {
            symbol: ourSymbol,
            price,
            change,
            changePercent,
            high,
            low,
            volume,
            timestamp: Date.now(),
          };
        }
      }
    } catch (error) {
      console.error('Binance REST fetch error:', error.message);
    }

    return results;
  }

  /**
   * Get market data with Redis cache
   */
  async getMarketData(forceRefresh = false): Promise<Record<string, PriceData>> {
    if (!forceRefresh) {
      const cached = await this.redis.get(this.CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    }

    const allSymbols = [...Object.keys(YAHOO_SYMBOLS), ...Object.keys(BINANCE_SYMBOLS)];
    const yahooSymbols = allSymbols.filter(s => YAHOO_SYMBOLS[s]);
    const binanceSymbols = allSymbols.filter(s => BINANCE_SYMBOLS[s]);

    const [yahooData, binanceData] = await Promise.all([
      this.fetchYahooData(yahooSymbols),
      this.fetchBinanceData(binanceSymbols),
    ]);

    const combined = { ...yahooData, ...binanceData };

    // Cache for 5 seconds
    await this.redis.setex(this.CACHE_KEY, this.CACHE_TTL, JSON.stringify(combined));

    return combined;
  }

  /**
   * Get single symbol data
   */
  async getSymbolData(symbol: string): Promise<PriceData | null> {
    const allData = await this.getMarketData();
    return allData[symbol] || null;
  }
}

export default new MarketDataService();

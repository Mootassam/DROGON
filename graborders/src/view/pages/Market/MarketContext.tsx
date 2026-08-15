import React, { createContext, useContext, useRef, useCallback, useEffect } from "react";

// Shared crypto price cache - used by all market components
export interface CryptoPrice {
  price: number;
  change: number;
  timestamp: number;
}

export interface MarketContextType {
  getCryptoPrice: (symbol: string) => CryptoPrice | null;
  getAllCryptoPrices: () => Record<string, CryptoPrice>;
}

const cryptoCoinIds: Record<string, string> = {
  BTCUSD: "bitcoin", ETHUSD: "ethereum", XRPUSD: "ripple", SOLUSD: "solana",
  ADAUSD: "cardano", DOGEUSD: "dogecoin", DOTUSD: "polkadot", AVAXUSD: "avalanche-2",
  LINKUSD: "chainlink", MATICUSD: "matic-network", UNIUSD: "uniswap", ATOMUSD: "cosmos",
  LTCUSD: "litecoin", BCHUSD: "bitcoin-cash", NEARUSD: "near-protocol", ALGOUSD: "algorand",
  VETUSD: "vechain", FILUSD: "filecoin", THETAUSD: "theta-token", AXSUSD: "axie-infinity",
  SANDUSD: "the-sandbox", MANAUSD: "decentraland", ENJUSD: "enjincoin", CHZUSD: "chiliz", APEUSD: "apecoin",
};

const allCryptoSymbols = Object.keys(cryptoCoinIds);

// Singleton cache - shared across all components
const cryptoPriceCache: Record<string, CryptoPrice> = {};

// Fetch all crypto prices at once
const fetchAllCryptoPrices = async (): Promise<Record<string, CryptoPrice>> => {
  if (allCryptoSymbols.length === 0) return {};
  
  try {
    const ids = allCryptoSymbols.map(s => cryptoCoinIds[s]).join(",");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      { headers: { Accept: "application/json" } }
    );
    
    if (response.ok) {
      const data = await response.json();
      const prices: Record<string, CryptoPrice> = {};
      
      allCryptoSymbols.forEach(symbol => {
        const coinId = cryptoCoinIds[symbol];
        if (data[coinId]) {
          prices[symbol] = {
            price: data[coinId].usd,
            change: data[coinId].usd_24h_change || 0,
            timestamp: Date.now(),
          };
          // Update cache
          cryptoPriceCache[symbol] = prices[symbol];
        }
      });
      
      return prices;
    }
  } catch (error) {
    console.error("Crypto fetch error:", error);
  }
  
  return {};
};

// Context
const MarketContext = createContext<MarketContextType>({
  getCryptoPrice: (symbol: string) => cryptoPriceCache[symbol] || null,
  getAllCryptoPrices: () => ({ ...cryptoPriceCache }),
});

// Provider component
export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isComponentMounted = useRef(true);

  // Initial fetch
  useEffect(() => {
    fetchAllCryptoPrices();
    
    // Set up interval for updates
    intervalRef.current = setInterval(() => {
      if (isComponentMounted.current) {
        fetchAllCryptoPrices();
      }
    }, 3000); // Update every 3 seconds

    return () => {
      isComponentMounted.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getCryptoPrice = useCallback((symbol: string): CryptoPrice | null => {
    return cryptoPriceCache[symbol] || null;
  }, []);

  const getAllCryptoPrices = useCallback((): Record<string, CryptoPrice> => {
    return { ...cryptoPriceCache };
  }, []);

  return (
    <MarketContext.Provider value={{ getCryptoPrice, getAllCryptoPrices }}>
      {children}
    </MarketContext.Provider>
  );
};

// Hook to use crypto prices
export const useCryptoPrices = () => useContext(MarketContext);

// Export for use in components that can't use context
export { fetchAllCryptoPrices, cryptoCoinIds, allCryptoSymbols };
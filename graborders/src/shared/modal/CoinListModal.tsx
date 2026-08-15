import axios from "axios";
import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { i18n } from "../../i18n";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Total traded base asset volume
  p: string; // Price change
}

// Interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
}

const CoinListModal = ({ isOpen, onClose, onSelectCoin }) => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  // Fetch initial market data
  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
        
        // Process only USD pairs
        const USDPairs = response.data.filter((item: any) => 
          item.symbol.endsWith('USD') && 
          !item.symbol.includes('UP') && 
          !item.symbol.includes('DOWN') &&
          !item.symbol.includes('BEAR') && 
          !item.symbol.includes('BULL')
        );
        
        // Sort by volume to get most important pairs
        USDPairs.sort((a: any, b: any) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume));
        
        // Take top 100 pairs by volume
        const topPairs = USDPairs.slice(0, 100);
        
        const formattedData: { [key: string]: CryptoData } = {};
        
        topPairs.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USD", "");
          const isPositive = !item.priceChangePercent.startsWith("-");
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);
          
          // Format volume
          const volumeNum = Number(item.volume);
          let volumeFormatted = volumeNum.toFixed(0);
          if (volumeNum >= 1000000000) {
            volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
          } else if (volumeNum >= 1000000) {
            volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
          }
          
          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USD`,
            price: Number(item.lastPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: Number(item.lastPrice) < 1 ? 6 : 4,
            }),
            change: item.priceChange,
            changePercent: changePercent,
            volume: item.volume,
            volumeFormatted: volumeFormatted,
            isPositive: isPositive,
          };
        });
        
        setCryptoData(formattedData);
        setIsLoading(false);
        
      } catch (error) {
        setIsLoading(false);
      }
    };
    
    fetchAllPrices();
  }, []);

  // Setup WebSocket for real-time updates
  useEffect(() => {
    // Create WebSocket connection for all tickers
    ws.current = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    
    ws.current.onmessage = (event) => {
      const data: BinanceTicker[] = JSON.parse(event.data);
      
      // Update crypto data with real-time information
      setCryptoData(prevData => {
        const newData = {...prevData};
        
        data.forEach((ticker) => {
          if (newData[ticker.s]) {
            const isPositive = !ticker.P.startsWith("-");
            const changePercent = Math.abs(Number(ticker.P)).toFixed(2);
            
            // Format volume
            const volumeNum = Number(ticker.v);
            let volumeFormatted = volumeNum.toFixed(0);
            if (volumeNum >= 1000000000) {
              volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
            } else if (volumeNum >= 1000000) {
              volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
            }
            
            newData[ticker.s] = {
              ...newData[ticker.s],
              price: Number(ticker.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(ticker.c) < 1 ? 6 : 4,
              }),
              change: ticker.p,
              changePercent: changePercent,
              volume: ticker.v,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive,
            };
          }
        });
        
        return newData;
      });
    };
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Filter and sort cryptocurrencies
  const filteredCrypto = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);
    
    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTermLower) ||
        crypto.symbol.toLowerCase().includes(searchTermLower)
      );
    }

    // Apply tab filters
    switch (activeTab) {
      case "Gainers":
        return filtered
          .filter((crypto) => crypto.isPositive)
          .sort((a, b) => Number(b.changePercent) - Number(a.changePercent));
      case "Losers":
        return filtered
          .filter((crypto) => !crypto.isPositive)
          .sort((a, b) => Number(a.changePercent) - Number(b.changePercent));
      case "Favorites":
        return filtered.filter((crypto) =>
          ["BTCUSD", "ETHUSD", "BNBUSD"].includes(crypto.symbol)
        ).sort((a, b) => Number(b.volume) - Number(a.volume));
      default:
        return filtered.sort((a, b) => Number(b.volume) - Number(a.volume));
    }
  }, [cryptoData, searchTerm, activeTab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCoinSelect = (coin) => {
    onSelectCoin(coin.symbol);
    onClose();
  };

  if (!isOpen) return null;
  
  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="coin-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="coin-modal-header">
          <div className="coin-modal-title">{i18n("components.coinListModal.title")}</div>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder={i18n("components.coinListModal.search.placeholder")}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>{i18n("components.coinListModal.loading")}</p>
          </div>
        )}

        {/* Coin List */}
        {!isLoading && (
          <>
            <div className="coin-list">
              {filteredCrypto.length > 0 ? (
                filteredCrypto.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="coin-item"
                    onClick={() => handleCoinSelect(coin)}
                  >
                    <div className="coin-info">
                      <div className={`coin-icon ${coin.name.toLowerCase()}`}>
                        <img
                          src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                            coin.name.split("/")[0]
                          }.png`}
                          style={{ width: 40, height: 40 }}
                          alt={coin.name.split("/")[0]}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/3a3a3a/ffffff?text=${coin.name.split("/")[0].charAt(0)}`;
                          }}
                        />
                        <i className="fas fa-coins" style={{display: 'none'}}></i>
                      </div>
                      <div className="coin-details">
                        <div className="coin-symbol">{coin.symbol}</div>
                        <div className="coin-name">{coin.name}</div>
                      </div>
                    </div>
                    <div className="coin-price-info">
                      <div className="coin-price">${coin.price}</div>
                      <div
                        className={`coin-change ${
                          coin.isPositive ? "positive" : "negative"
                        }`}
                      >
                        {coin.change}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <i className="fas fa-search"></i>
                  <p>{i18n("components.coinListModal.noResults")}</p>
                </div>
              )}
            </div>

            {/* Popular Cryptocurrencies Quick Select */}
            <div className="quick-select-section">
              <div className="section-label">{i18n("components.coinListModal.popular")}</div>
              <div className="quick-select-chips">
                <button className="chip" onClick={() => setSearchTerm("BTC")}>
                  BTC
                </button>
                <button className="chip" onClick={() => setSearchTerm("ETH")}>
                  ETH
                </button>
                <button className="chip" onClick={() => setSearchTerm("BNB")}>
                  BNB
                </button>
                <button className="chip" onClick={() => setSearchTerm("SOL")}>
                  SOL
                </button>
              </div>
            </div>
          </>
        )}
      </div>


      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .coin-modal-container {
          background-color: #2a2a2a;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Section */
        .coin-modal-header {
          background-color: #1a1a1a;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .coin-modal-title {
          font-weight: bold;
          font-size: 18px;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #AAAAAA;
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
        }
        
        .close-btn:hover {
          color: #FFFFFF;
        }
        
        /* Search Section */
        .search-section {
          padding: 15px;
          border-bottom: 1px solid #3a3a3a;
        }
        
        .search-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          color: #AAAAAA;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 40px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #F3BA2F;
        }
        
        .clear-search {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #AAAAAA;
          cursor: pointer;
        }
        
        .clear-search:hover {
          color: #FFFFFF;
        }
        
        /* Loading State */
        .loading-state, .error-state {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .loading-state i, .error-state i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .error-state button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #F3BA2F;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Coin List */
        .coin-list {
          flex: 1;
          overflow-y: auto;
          max-height: 40vh;
        }
        
        .coin-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .coin-item:hover {
          background-color: #3a3a3a;
        }
        
        .coin-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .coin-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3a3a3a;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          overflow: hidden;
        }
        
        .coin-icon img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        
        .coin-details {
          display: flex;
          flex-direction: column;
        }
        
        .coin-symbol {
          font-weight: bold;
          font-size: 16px;
        }
        
        .coin-name {
          font-size: 12px;
          color: #AAAAAA;
        }
        
        .coin-price-info {
          text-align: right;
        }
        
        .coin-price {
          font-weight: bold;
          font-size: 14px;
        }
        
        .coin-change {
          font-size: 12px;
        }
        
        .coin-change.positive {
          color: #00C076;
        }
        
        .coin-change.negative {
          color: #FF6838;
        }
        
        .no-results {
          padding: 40px 20px;
          text-align: center;
          color: #AAAAAA;
        }
        
        .no-results i {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        /* Quick Select Section */
        .quick-select-section {
          padding: 15px;
          border-top: 1px solid #3a3a3a;
        }
        
        .section-label {
          font-size: 14px;
          color: #AAAAAA;
          margin-bottom: 10px;
        }
        
        .quick-select-chips {
          display: flex;
          gap: 8px;
        }
        
        .chip {
          padding: 8px 16px;
          background-color: #3a3a3a;
          border: 1px solid #4a4a4a;
          border-radius: 20px;
          color: #FFFFFF;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .chip:hover {
          background-color: #4a4a4a;
          border-color: #F3BA2F;
        }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CoinListModal;
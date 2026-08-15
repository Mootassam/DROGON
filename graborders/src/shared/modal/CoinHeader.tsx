import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

// Interface for Binance ticker data
interface BinanceTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Last price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  P: string; // Price change percent
}

function CoinHeader() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const handleOpenCoinModal = () => {
    // setIsCoinModalOpen(true);
  };
  const [marketPrice, setMarketPrice] = useState<string | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<string | null>(null);
  const [highPrice, setHighPrice] = useState<string | null>(null);
  const [lowPrice, setLowPrice] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState(id || "BTCUSD");
  const [isLoading, setIsLoading] = useState(true);

  const tickerWs = useRef<WebSocket | null>(null);

  // Format number with commas and fixed decimals
  const formatNumber = (num: string, decimals: number = 2) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Format volume in billions
  const formatVolume = (vol: string) => {
    const volumeNum = Number(vol);
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + "B";
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + "M";
    } else {
      return formatNumber(vol, 0);
    }
  };



  // Fetch initial data via REST API before WebSocket connects
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const tickerResponse = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`);
        
        // Set initial data from REST API
        const tickerData = tickerResponse.data;
        setMarketPrice(tickerData.lastPrice);
        setPriceChangePercent(tickerData.priceChangePercent);
        setHighPrice(tickerData.highPrice);
        setLowPrice(tickerData.lowPrice);
        setVolume(tickerData.volume);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [selectedCoin]);

  // WebSocket connection for ticker data (price, 24h stats)
  useEffect(() => {
    if (!selectedCoin) return;

    const connectTickerWebSocket = () => {
      // Close previous connection if it exists
      if (tickerWs.current) {
        tickerWs.current.close();
      }

      // Connect to ticker stream
      tickerWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`
      );

      tickerWs.current.onopen = () => {
      };

      tickerWs.current.onmessage = (event: MessageEvent) => {
        const tickerData: BinanceTicker = JSON.parse(event.data);

        // Update market data
        setMarketPrice(tickerData.c);
        setPriceChangePercent(tickerData.P);
        setHighPrice(tickerData.h);
        setLowPrice(tickerData.l);
        setVolume(tickerData.v);
      };

      tickerWs.current.onerror = (error: Event) => {
        console.error("Ticker WebSocket error:", error);
      };

      tickerWs.current.onclose = (event: CloseEvent) => {

        // Auto-reconnect after a short delay
        setTimeout(() => {
          if (selectedCoin) {
            connectTickerWebSocket();
          }
        }, 2000);
      };
    };

    connectTickerWebSocket();

    return () => {
      if (tickerWs.current && tickerWs.current.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
    };
  }, [selectedCoin]);

  useEffect(() => {
    if (id) {
      setSelectedCoin(id);
    }

    return () => {
      // Clean up WebSocket connections
      if (tickerWs.current) tickerWs.current.close();
    };
  }, [id]);

  const goBack = () => {
    history.goBack();
  };

  // Loading placeholder component
  const LoadingPlaceholder = ({ width = "100%", height = "1em" }: { width?: string, height?: string }) => (
    <div 
      className="loading-placeholder" 
      style={{ width, height }}
    />
  );

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <div className="market-icon">
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${
                  selectedCoin.split("USD")[0]
                }.png`}
                style={{ width: 30, height: 30 }}
                alt={selectedCoin}
                loading="lazy"
              />
            </div>
            <div className="market-name">{selectedCoin}</div>
            <div
              className="market-change"
              style={{
                color: priceChangePercent && priceChangePercent.startsWith("-")
                  ? "#FF6838"
                  : "#00C076",
              }}
            >
              {priceChangePercent !== null ? (
                `${priceChangePercent}%`
              ) : (
                <LoadingPlaceholder width="50px" height="16px" />
              )}
            </div>
               <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
          </div>
          <div style={{ width: 20 }} />
        </div>
        <div className="market-price">
          {marketPrice !== null ? (
            `$${formatNumber(marketPrice)}`
          ) : (
            <LoadingPlaceholder width="120px" height="28px" />
          )}
        </div>
        <div className="market-stats">
          <span>
            24h High:{" "}
            {highPrice !== null ? (
              `$${formatNumber(highPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            24h Vol:{" "}
            {volume !== null ? (
              `${formatVolume(volume)} ${selectedCoin.replace("USD", "")}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
          <span>
            24h Low:{" "}
            {lowPrice !== null ? (
              `$${formatNumber(lowPrice)}`
            ) : (
              <LoadingPlaceholder width="80px" height="12px" />
            )}
          </span>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding-bottom: 70px;
          background-color: #0f0f0f;
          color: #FFFFFF;
          min-height: 100vh;
        }
        
        /* Header Section */
        .header {
          background-color: #0f0f0f;
          padding: 20px 15px 15px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .market-info {
          display: flex;
          align-items: center;
        }
        
        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #F3BA2F;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .market-name {
          font-weight: bold;
          font-size: 18px;
          margin-right: 10px;
        }
        
        .market-change {
          font-size: 14px;
          font-weight: bold;
        }
        
        .market-price {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #AAAAAA;
          flex-wrap: wrap;
        }
        
        .market-stats span {
          margin-right: 10px;
          margin-bottom: 5px;
        }
        
        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #2A2A2A;
          border-radius: 4px;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default CoinHeader;
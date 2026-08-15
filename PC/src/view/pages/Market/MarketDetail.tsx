import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import CustomTradingChart, { PriceInjection } from "./CustomTradingChart";
import useSymbolInjections, { getInjectionDisplayPrice } from "src/view/shared/useSymbolInjections";
import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import { Link } from "react-router-dom";
import { PAIRS, getPairInfo, PairIcon } from "src/view/shared/pairConfig";
import { getTvWsUrl } from "src/view/shared/wsUrl";
import { isMarketOpen } from "src/view/shared/marketHours";

// ----------------------------------------------------------------------
// Types (unchanged)
// ----------------------------------------------------------------------
interface ForexTrade {
  id: string;
  price: number;
  quantity: number;
  time: number;
  side: 'buy' | 'sell';
}

interface ForexOrderBook {
  bids: [number, number][];
  asks: [number, number][];
  lastUpdateId: number;
}

interface MarketData {
  symbol: string;
  ask: number;
  bid: number;
}

interface Coin {
  symbol: string;
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
function MarketDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  // ----- WebSocket real market data (unchanged) -----
  const wsRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<string | null>(null);
  const subscribedSymbolRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedCoinRef = useRef(id || "EURUSD");
  const [markets, setMarkets] = useState<MarketData[]>([]);

  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<number | null>(null);
  const initialPriceRef = useRef<{ [symbol: string]: number }>({});

  const [selectedCoin, setSelectedCoin] = useState(id || "EURUSD");
  const [orderBook, setOrderBook] = useState<ForexOrderBook | null>(null);
  const [recentTrades, setRecentTrades] = useState<ForexTrade[]>([]);
  const [activeTab, setActiveTab] = useState<'orderBook' | 'transactions'>('orderBook');
  const [showCoinSelector, setShowCoinSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Global chart injections (server-driven, same for all users)
  const symbolInjections = useSymbolInjections();
  const serverInj = symbolInjections[selectedCoin] ?? null;

  // 1 s ticker so the deterministic injected price animates smoothly
  const [, setNowTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNowTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Deterministic injected price (identical on all devices, no localStorage)
  const injectedPrice = serverInj ? getInjectionDisplayPrice(serverInj) : null;

  // Stable injection object for the chart — all fields from the server
  const chartInjection = useMemo<PriceInjection | null>(() => {
    if (!serverInj) return null;
    return {
      symbol:      serverInj.symbol,
      entryPrice:  serverInj.entryPrice,
      targetPrice: serverInj.targetPrice,
      startedAt:   serverInj.startedAt,
      durationMs:  serverInj.durationMs,
      seed:        serverInj.seed,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverInj?.symbol, serverInj?.startedAt, serverInj?.targetPrice, serverInj?.durationMs, serverInj?.entryPrice, serverInj?.seed]);

  useEffect(() => {
    selectedCoinRef.current = selectedCoin;
  }, [selectedCoin]);

  // ----- Helper functions (unchanged) -----
  const encode = useCallback((msg: string) => `~m~${msg.length}~m~${msg}`, []);

  const parseMessages = useCallback((data: string): string[] => {
    const result: string[] = [];
    let buffer = data;
    while (buffer.length > 0) {
      if (!buffer.startsWith("~m~")) break;
      const second = buffer.indexOf("~m~", 3);
      const length = parseInt(buffer.substring(3, second));
      const message = buffer.substring(second + 3, second + 3 + length);
      result.push(message);
      buffer = buffer.substring(second + 3 + length);
    }
    return result;
  }, []);

  const extractSymbol = useCallback((raw: string): string => {
    try {
      const cleaned = raw.replace(/^=\{/, "{");
      const obj = JSON.parse(cleaned);
      return obj.symbol || "UNKNOWN";
    } catch {
      return raw;
    }
  }, []);

  const subscribeToSymbol = useCallback((symbol: string) => {
    const ws = wsRef.current;
    const session = sessionRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !session) return;

    if (subscribedSymbolRef.current === symbol) return;

    if (subscribedSymbolRef.current) {
      ws.send(encode(JSON.stringify({ m: "quote_remove_symbols", p: [session, subscribedSymbolRef.current] })));
    }

    ws.send(encode(JSON.stringify({ m: "quote_add_symbols", p: [session, symbol] })));
    subscribedSymbolRef.current = symbol;

    setMarkets([]);
    setCurrentPrice(null);
    setPriceChangePercent(null);
    setIsLoading(true);
    delete initialPriceRef.current[symbol];
  }, [encode]);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const ws = new WebSocket(getTvWsUrl());
    wsRef.current = ws;

    ws.onopen = () => {
      const session = "qs_" + Math.random().toString(36).substring(2, 12);
      sessionRef.current = session;

      ws.send(encode(JSON.stringify({ m: "quote_create_session", p: [session] })));
      ws.send(encode(JSON.stringify({ m: "quote_set_fields", p: [session, "ask", "bid"] })));

      subscribeToSymbol(selectedCoinRef.current);
    };

    ws.onmessage = (event) => {
      const raw = event.data;
      if (raw.startsWith("~h~")) {
        ws.send(raw);
        return;
      }

      const messages = parseMessages(raw);
      messages.forEach((msg) => {
        try {
          const json = JSON.parse(msg);
          if (json.m === "qsd") {
            const payload = json.p[1];
            const symbol = extractSymbol(payload.n);
            const values = payload.v;
            if (!values) return;

            const market: MarketData = {
              symbol,
              ask: values.ask ?? 0,
              bid: values.bid ?? 0,
            };

            setMarkets((prev) => {
              const filtered = prev.filter((m) => m.symbol !== symbol);
              return [...filtered, market];
            });
          }
        } catch (err) {
          // ignore non-json frames
        }
      });
    };

    ws.onclose = (event) => {
      subscribedSymbolRef.current = null;
      if (!event.wasClean) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  }, [encode, parseMessages, extractSymbol, subscribeToSymbol]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connectWebSocket]);

  useEffect(() => {
    subscribeToSymbol(selectedCoin);
  }, [selectedCoin, subscribeToSymbol]);

  // ----- Derive price & change (unchanged) -----
  useEffect(() => {
    const market = markets.find((m) => m.symbol === selectedCoin);
    if (!market || !market.ask || !market.bid) return;

    const midPrice = (market.ask + market.bid) / 2;
    setCurrentPrice(midPrice);
    setIsLoading(false);

    if (initialPriceRef.current[selectedCoin] === undefined) {
      initialPriceRef.current[selectedCoin] = midPrice;
      setPriceChangePercent(0);
    } else {
      const initial = initialPriceRef.current[selectedCoin];
      const change = ((midPrice - initial) / initial) * 100;
      setPriceChangePercent(change);
    }
  }, [markets, selectedCoin]);

  // ----- Mock order book & trades (unchanged) -----
  const getDecimalPlaces = useCallback((symbol: string): number => {
    if (["XAUUSD", "XAUEUR", "XAUGBP"].includes(symbol)) return 2;
    if (["XAGUSD", "XAGEUR", "XAGGBP"].includes(symbol)) return 2;
    if (["XPTUSD", "XPTEUR"].includes(symbol)) return 2;
    if (["XPDUSD"].includes(symbol)) return 2;
    if (["USOIL", "UKOIL", "BRENT", "WTI", "CRUDE"].includes(symbol)) return 2;
    if (["NGAS", "HEAT", "GAS"].includes(symbol)) return 3;
    if (["BTCUSD", "ETHUSD"].includes(symbol)) return 2;
    if (["XRPUSD", "ADAUSD", "DOGEUSD", "MATICUSD", "UNIUSD", "THETAUSD", "CHZUSD", "APEUSD"].includes(symbol)) return 4;
    if (["LTCUSD", "BCHUSD", "FILUSD", "AXSUSD", "SANDUSD", "MANAUSD", "ENJUSD"].includes(symbol)) return 2;
    if (["DOTUSD", "AVAXUSD", "LINKUSD", "ATOMUSD", "NEARUSD"].includes(symbol)) return 2;
    if (["ALGOUSD", "VETUSD"].includes(symbol)) return 4;
    if (["US30", "US500", "NAS100", "US2000", "GER40", "UK100", "FRA40", "EU50", "JP225", "HK50", "AUS200", "TWII", "KR100", "IN50", "TECH100"].includes(symbol)) return 0;
    if (symbol.endsWith("JPY")) return 3;
    if (symbol.includes("USD") && !symbol.startsWith("USD")) return 5;
    return 2;
  }, []);

  const formatNumber = useCallback((num: number, symbol?: string): string => {
    if (num === null || isNaN(num)) return "0.00000";
    const decimals = symbol ? getDecimalPlaces(symbol) : 5;
    return num.toFixed(decimals);
  }, [getDecimalPlaces]);

  const formatVolume = useCallback((vol: number): string => {
    if (vol === null || isNaN(vol)) return "0.00";
    if (vol >= 1000000) return (vol / 1000000).toFixed(2) + "M";
    if (vol >= 1000) return (vol / 1000).toFixed(2) + "K";
    return vol.toFixed(2);
  }, []);

  const generateOrderBook = useCallback((price: number, symbol: string): ForexOrderBook => {
    const decimals = getDecimalPlaces(symbol);
    const spread = price * 0.0002;
    const bids: [number, number][] = [];
    const asks: [number, number][] = [];
    for (let i = 1; i <= 10; i++) {
      const bidPrice = price - spread * i * (0.5 + Math.random() * 0.5);
      const askPrice = price + spread * i * (0.5 + Math.random() * 0.5);
      const quantity = Math.random() * 1000000 + 500000;
      bids.push([Number(bidPrice.toFixed(decimals)), Number(quantity.toFixed(2))]);
      asks.push([Number(askPrice.toFixed(decimals)), Number(quantity.toFixed(2))]);
    }
    bids.sort((a, b) => b[0] - a[0]);
    asks.sort((a, b) => a[0] - b[0]);
    return { lastUpdateId: Date.now(), bids, asks };
  }, [getDecimalPlaces]);

  const generateTrades = useCallback((price: number, symbol: string, count: number = 10): ForexTrade[] => {
    const trades: ForexTrade[] = [];
    const decimals = getDecimalPlaces(symbol);
    const now = Date.now();
    for (let i = 0; i < count; i++) {
      const side = Math.random() > 0.5 ? 'buy' : 'sell';
      const variation = (Math.random() * 2 - 1) * 0.0001 * price;
      const tradePrice = price + variation;
      const quantity = Math.random() * 100000 + 50000;
      trades.push({
        id: `${now - i * 1000}-${i}`,
        price: Number(tradePrice.toFixed(decimals)),
        quantity: Number(quantity.toFixed(2)),
        time: now - i * 1000,
        side,
      });
    }
    return trades.sort((a, b) => b.time - a.time);
  }, [getDecimalPlaces]);

  useEffect(() => {
    if (currentPrice === null) return;
    const interval = setInterval(() => {
      // Don't print new trades / reshuffle the book when the market is closed
      // (forex/metals/oil/indices on the weekend) — only crypto keeps moving.
      if (!isMarketOpen(selectedCoin)) return;
      setOrderBook(generateOrderBook(currentPrice, selectedCoin));
      setRecentTrades(generateTrades(currentPrice, selectedCoin, 10));
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPrice, selectedCoin, generateOrderBook, generateTrades]);

  useEffect(() => {
    if (currentPrice !== null) {
      setOrderBook(generateOrderBook(currentPrice, selectedCoin));
      setRecentTrades(generateTrades(currentPrice, selectedCoin, 10));
    }
  }, [currentPrice, selectedCoin, generateOrderBook, generateTrades]);

  // Use the shared PAIRS list (37 pairs)
  const availableCoins = PAIRS.map(p => ({ symbol: p.symbol, name: p.name }));

  // ----- Navigation & coin selection -----
  const goBack = useCallback(() => history.goBack(), [history]);
  const handleCoinSelect = (coinSymbol: string) => {
    if (coinSymbol === selectedCoin) {
      setShowCoinSelector(false);
      return;
    }
    setSelectedCoin(coinSymbol);
    history.push(`/market/detail/${coinSymbol}`);
  };
  const toggleCoinSelector = () => setShowCoinSelector(prev => !prev);

  const currentPair = useMemo(() => {
    return getPairInfo(selectedCoin) || {
      symbol: selectedCoin,
      name: selectedCoin.replace(/(.{3})(.{3})/, '$1 / $2'),
    };
  }, [selectedCoin]);

  // ----- Loading placeholder (light version) -----
  const LoadingPlaceholder = ({ width = "100%", height = "1em" }) => (
    <div className="loading-placeholder" style={{ width, height }} />
  );

  // ----- Order book heatmap (unchanged) -----
  const orderBookData = useMemo(() => {
    if (!orderBook || !orderBook.bids.length || !orderBook.asks.length) {
      return { buySide: [], sellSide: [] };
    }
    const calculateIntensity = (orders: [number, number][]) => {
      if (!orders.length) return [];
      const quantities = orders.map(o => o[1]);
      const maxQty = Math.max(...quantities);
      const minQty = Math.min(...quantities);
      return orders.slice(0, 10).map(order => {
        const qty = order[1];
        let intensity = maxQty > minQty ? ((qty - minQty) / (maxQty - minQty)) * 100 : 0;
        intensity = Math.max(intensity, 10);
        return {
          amount: formatVolume(qty),
          price: formatNumber(order[0], selectedCoin),
          intensity: Math.min(intensity, 95),
        };
      });
    };
    const buySide = calculateIntensity(orderBook.bids);
    const sellSide = calculateIntensity(orderBook.asks);
    while (buySide.length < 10) buySide.push({ amount: "0.00", price: "0.00000", intensity: 10 });
    while (sellSide.length < 10) sellSide.push({ amount: "0.00", price: "0.00000", intensity: 10 });
    return { buySide, sellSide };
  }, [orderBook, selectedCoin, formatNumber, formatVolume]);

  // ----------------------------------------------------------------------
  // Render (new light-themed JSX)
  // ----------------------------------------------------------------------
  return (
    <div className="market-detail-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link className="back-arrow" to="/market">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="trading-pair" onClick={toggleCoinSelector}>
            <PairIcon pair={currentPair} size="sm" />
            {currentPair.name}
            <i className={`fas fa-chevron-down dropdown-arrow ${showCoinSelector ? 'rotate' : ''}`}></i>
          </div>
          <div className="header-icon" onClick={toggleCoinSelector}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>

      {/* White content card – all sections inside */}
      <div className="content-card">
        {/* Price Section */}
        {(() => {
          // Effective price + change look completely real (no "closing" styling).
          const effPrice = injectedPrice ?? currentPrice;
          const injChange = (serverInj && injectedPrice != null)
            ? ((injectedPrice - serverInj.entryPrice) / serverInj.entryPrice) * 100
            : null;
          const changePct = injChange != null ? injChange : priceChangePercent;
          const down = changePct !== null && changePct < 0;
          // Forex / metals / oil / indices are shut on the weekend.
          const marketOpen = isMarketOpen(selectedCoin);
          return (
            <div className="price-section">
              <div className="price-main-row">
                <div className="price-left-section">
                  <div className="current-price">
                    {effPrice !== null ? (
                      <span style={{ color: down ? '#f56c6c' : '#37b66a' }}>
                        {formatNumber(effPrice, selectedCoin)}
                      </span>
                    ) : (
                      <LoadingPlaceholder width="120px" height="28px" />
                    )}
                  </div>
                  <div className="price-info-row">
                    <div className="usd-price">
                      {effPrice !== null ? `$${effPrice.toFixed(2)}` : '$0.00'}
                    </div>
                    <div className="price-change" style={{ color: down ? '#f56c6c' : '#37b66a' }}>
                      {changePct !== null ? (
                        `${changePct < 0 ? '−' : '+'}${Math.abs(changePct).toFixed(2)}%`
                      ) : (
                        <LoadingPlaceholder width="60px" height="16px" />
                      )}
                    </div>
                    {!marketOpen && (
                      <div className="market-closed-badge">
                        <span className="dot" /> Market closed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Chart Section */}
        <div className="chart-section">
          <CustomTradingChart
            key={selectedCoin}
            symbol={selectedCoin}
            livePrice={currentPrice}
            height={400}
            priceInjection={chartInjection}
          />
        </div>

        {/* Tabs (Order Book / Transactions) */}
        <div className="tabs-section">
          <div className="tabs-header">
            <div
              className={`tab ${activeTab === 'orderBook' ? 'active' : ''}`}
              onClick={() => setActiveTab('orderBook')}
            >
              {i18n("pages.marketDetail.tabs.orderBook")}
            </div>
            <div
              className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              {i18n("pages.marketDetail.tabs.transactions")}
            </div>
          </div>

          <div className="tab-content">
            {activeTab === 'orderBook' && (
              <div className="modern-order-book">
                <div className="order-book-table">
                  <div className="table-header">
                    <div className="buy-section">
                      <div className="column-header">{i18n("pages.marketDetail.orderBook.buy")}</div>
                      <div className="column-header">{i18n("pages.marketDetail.orderBook.quantity")}</div>
                      <div className="column-header">{i18n("pages.marketDetail.orderBook.price")}</div>
                    </div>
                    <div className="sell-section">
                      <div className="column-header">{i18n("pages.marketDetail.orderBook.price")}</div>
                      <div className="column-header">{i18n("pages.marketDetail.orderBook.quantity")}</div>
                      <div className="column-header" style={{ textAlign: 'right' }}>
                        {i18n("pages.marketDetail.orderBook.sell")}
                      </div>
                    </div>
                  </div>
                  <div className="table-body">
                    {orderBookData.buySide.map((buyOrder, index) => {
                      const sellOrder = orderBookData.sellSide[index] || { amount: '0.00', price: '0.00000', intensity: 10 };
                      return (
                        <div key={index} className="table-row">
                          <div className="buy-section">
                            <div className="cell buy-cell">{index + 1}</div>
                            <div className="cell quantity">{buyOrder.amount}</div>
                            <div className="cell price-cell">
                              <div className="heatmap-bar buy-heatmap" style={{ width: `${buyOrder.intensity}%` }}></div>
                              <span className="price-value buy-price">{buyOrder.price}</span>
                            </div>
                          </div>
                          <div className="sell-section">
                            <div className="cell price-cell">
                              <div className="heatmap-bar sell-heatmap" style={{ width: `${sellOrder.intensity}%` }}></div>
                              <span className="price-value sell-price">{sellOrder.price}</span>
                            </div>
                            <div className="cell quantity">{sellOrder.amount}</div>
                            <div className="cell sell-cell">{index + 1}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="transactions-container">
                <div className="transactions-header">
                  <div className="header-item">{i18n("pages.marketDetail.recentTrades.time")}</div>
                  <div className="header-item">{i18n("pages.marketDetail.recentTrades.price")}</div>
                  <div className="header-item">{i18n("pages.marketDetail.recentTrades.amount")}</div>
                </div>
                <div className="transactions-list">
                  {recentTrades.length > 0 ? (
                    recentTrades.slice(0, 10).map((trade) => (
                      <div key={trade.id} className="transaction-item">
                        <div className="transaction-time">
                          {new Date(trade.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div className={`transaction-price ${trade.side === 'buy' ? 'buy' : 'sell'}`}>
                          {formatNumber(trade.price, selectedCoin)}
                        </div>
                        <div className="transaction-amount">{formatVolume(trade.quantity)}</div>
                      </div>
                    ))
                  ) : (
                    Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="transaction-item">
                        <div className="transaction-time"><LoadingPlaceholder width="50px" height="14px" /></div>
                        <div className="transaction-price"><LoadingPlaceholder width="60px" height="14px" /></div>
                        <div className="transaction-amount"><LoadingPlaceholder width="50px" height="14px" /></div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coin Selector Sidebar (unchanged) */}
      <CoinSelectorSidebar
        isOpen={showCoinSelector}
        onClose={() => setShowCoinSelector(false)}
        selectedCoin={selectedCoin}
        onCoinSelect={handleCoinSelect}
        availableCoins={availableCoins}
        title={i18n("pages.marketDetail.coinSelector.title")}
      />

      {/* Light theme CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .market-detail-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header – identical to LoginPassword */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .trading-pair {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trading-pair:hover {
          opacity: 0.9;
        }

        .dropdown-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .header-icon {
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .header-icon:hover {
          opacity: 0.8;
        }

        /* Content Card – white, rounded top, same as LoginPassword */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Price Section */
        .price-section {
          margin-bottom: 20px;
        }

        .price-main-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-left-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .current-price {
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .usd-price {
          font-size: 14px;
          color: #888;
        }

        .price-change {
          font-size: 14px;
          font-weight: 500;
        }

        .market-closed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #8a94a6;
          background: #f0f2f5;
          border: 1px solid #e2e6ec;
          border-radius: 999px;
          padding: 2px 10px;
        }

        .market-closed-badge .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c0c6d0;
          display: inline-block;
        }

        /* Chart Section */
        .chart-section {
          margin-bottom: 20px;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e7eaee;
        }

        /* Tabs Section */
        .tabs-section {
          background-color: #fff;
          border-radius: 12px;
          border: 1px solid #e7eaee;
          overflow: hidden;
        }

        .tabs-header {
          display: flex;
          border-bottom: 1px solid #e7eaee;
        }

        .tab {
          flex: 1;
          padding: 12px;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          color: #106cf5;
          border-bottom: 2px solid #106cf5;
          font-weight: 600;
        }

        .tab:hover:not(.active) {
          color: #333;
        }

        .tab-content {
          padding: 16px;
        }

        /* Order Book */
        .modern-order-book {
          width: 100%;
        }

        .order-book-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: flex;
          margin-bottom: 8px;
          font-size: 11px;
          color: #888;
          font-weight: 500;
        }

        .buy-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .sell-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .column-header {
          flex: 1;
          text-align: left;
        }

        .table-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .table-row {
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .cell {
          flex: 1;
          text-align: left;
          padding: 4px 0;
          color: #333;
        }

        .price-cell {
          position: relative;
          display: flex;
          align-items: center;
        }

        .heatmap-bar {
          position: absolute;
          left: 0;
          height: 100%;
          opacity: 0.12;
          z-index: 0;
          border-radius: 2px;
        }

        .buy-heatmap {
          background-color: #37b66a;
        }

        .sell-heatmap {
          background-color: #f56c6c;
        }

        .price-value {
          position: relative;
          z-index: 1;
        }

        .buy-price {
          color: #37b66a;
        }

        .sell-price {
          color: #f56c6c;
        }

        .buy-cell, .sell-cell {
          color: #888;
          font-size: 11px;
        }

        .quantity {
          color: #555;
        }

        /* Transactions */
        .transactions-container {
          width: 100%;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 11px;
          color: #888;
          border-bottom: 1px solid #e7eaee;
          margin-bottom: 8px;
        }

        .header-item {
          flex: 1;
          text-align: left;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          border-bottom: 1px solid #f0f2f5;
        }

        .transaction-time {
          flex: 1;
          color: #888;
        }

        .transaction-price {
          flex: 1;
          font-weight: 500;
        }

        .transaction-price.buy {
          color: #37b66a;
        }

        .transaction-price.sell {
          color: #f56c6c;
        }

        .transaction-amount {
          flex: 1;
          text-align: right;
          color: #333;
        }

        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: #e9ebef;
          border-radius: 4px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 25px 16px 100px;
          }
          .current-price {
            font-size: 24px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `}</style>
    </div>
  );
}

export default React.memo(MarketDetail);
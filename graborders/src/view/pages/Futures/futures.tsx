import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";
import FuturesModal from "src/shared/modal/FuturesModal";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresListSelectors from "src/modules/futures/list/futuresListSelectors";
import assetsListAction from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/list/assetsListSelectors";
import { i18n } from '../../../i18n';
import CustomTradingChart, { PriceInjection } from "../Market/CustomTradingChart";
import useSymbolInjections, { getInjectionDisplayPrice } from "src/view/shared/useSymbolInjections";
import authSelectors from "src/modules/auth/authSelectors";
import { getPairInfo, PairIcon } from "src/view/shared/pairConfig";
import { getTvWsUrl } from "src/view/shared/wsUrl";
import authAxios from "src/modules/shared/axios/authAxios";

// ----------------------------------------------------------------------
// Types & Helpers
// ----------------------------------------------------------------------
interface MarketData {
  symbol: string;
  ask: number;
  bid: number;
}


const availableCoins = [
  { symbol: "XAUUSD", name: "Gold" },
  { symbol: "EURUSD", name: "EUR / USD" },
  { symbol: "GBPUSD", name: "GBP / USD" },
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Ethereum" },
  { symbol: "XAGUSD", name: "Silver" },
  { symbol: "AUDUSD", name: "AUD / USD" },
  { symbol: "USDJPY", name: "USD / JPY" },
  { symbol: "NZDUSD", name: "NZD / USD" },
  { symbol: "USDCHF", name: "USD / CHF" },
  { symbol: "USDCAD", name: "USD / CAD" },
  { symbol: "LTCUSD", name: "Litecoin" },
  { symbol: "USOIL", name: "US Oil" },
  { symbol: "UKOIL", name: "UK Oil" },
  { symbol: "EURJPY", name: "EUR / JPY" },
  { symbol: "EURCHF", name: "EUR / CHF" },
  { symbol: "AUDNZD", name: "AUD / NZD" },
  { symbol: "GBPAUD", name: "GBP / AUD" },
  { symbol: "AUDJPY", name: "AUD / JPY" },
  { symbol: "EURNZD", name: "EUR / NZD" },
  { symbol: "CADJPY", name: "CAD / JPY" },
  { symbol: "NZDJPY", name: "NZD / JPY" },
  { symbol: "EURAUD", name: "EUR / AUD" },
  { symbol: "GBPJPY", name: "GBP / JPY" },
  { symbol: "EURCAD", name: "EUR / CAD" },
  { symbol: "GBPNZD", name: "GBP / NZD" },
  { symbol: "EURGBP", name: "EUR / GBP" },
  { symbol: "NAS100", name: "Nasdaq 100" },
  { symbol: "AUS200", name: "ASX 200" },
  { symbol: "ESP35", name: "IBEX 35" },
  { symbol: "FRA40", name: "CAC 40" },
  { symbol: "GER30", name: "DAX 30" },
  { symbol: "SPX500", name: "S&P 500" },
  { symbol: "US30", name: "Dow Jones 30" },
  { symbol: "UK100", name: "FTSE 100" },
  { symbol: "JPN225", name: "Nikkei 225" },
];

interface Order {
  id: number;
  pair: string;
  direction: string;
  status: string;
  investment: number;
  openPrice: number;
  openTime: string;
  leverage: number;
  pnl?: number;
  closePrice?: number;
  closeTime?: string;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  orderType: string;
  margin: number;
  fee: number;
}

function Futures() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux
  const listAssets = useSelector(selector.selectRows);
  const pendingList = useSelector(futuresListSelectors.pendingRows);
  const pendingCount = useSelector(futuresListSelectors.pendingcount);
  const pendingLoading = useSelector(futuresListSelectors.pendingLoading);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);

  // ----- WebSocket real‑time data -----
  const wsRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<string | null>(null);
  const subscribedSymbolRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const livePriceRef = useRef<number | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<number | null>(null);
  const initialPriceRef = useRef<{ [symbol: string]: number }>({});
  const highRef = useRef<{ [symbol: string]: number }>({});
  const lowRef = useRef<{ [symbol: string]: number }>({});

  // UI state
  const [selectedCoin, setSelectedCoin] = useState("EURUSD");
  const [activeInfoTab, setActiveInfoTab] = useState<"marketPrice" | "pendingOrders">("marketPrice"); // ✅ new tabs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeDirection, setTradeDirection] = useState<"up" | "down" | null>(null);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [USDBalance, setUSDBalance] = useState<number>(0);
  const [openingOrders, setOpeningOrders] = useState<any[]>([]);

  const [isDemoAccount, setIsDemoAccount] = useState<boolean>(false);

  // Global chart injections from server (all users see the same animation)
  const symbolInjections = useSymbolInjections();

  // 1 s ticker so the header injected price animates smoothly (deterministic)
  const [, setNowTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNowTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Trading form state – new
  const [multiplier, setMultiplier] = useState(100);
  const [useStopLoss, setUseStopLoss] = useState(false);
  const [stopLossValue, setStopLossValue] = useState(0);
  const [useTakeProfit, setUseTakeProfit] = useState(false);
  const [takeProfitValue, setTakeProfitValue] = useState(0);
  const [lots, setLots] = useState(0.01);
  // Raw text shown in the Lots input so the user can freely clear / type a
  // number; the numeric `lots` above is only normalised on blur.
  const [lotsText, setLotsText] = useState("0.01");

  // Free typing: keep whatever the user types, and update the numeric lots
  // whenever the current text is a valid positive number.
  const handleLotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setLotsText(raw);
    const v = parseFloat(raw);
    if (!isNaN(v) && v > 0) setLots(Math.round(v * 100) / 100);
  };

  // On blur, clamp to the minimum lot and sync the text back to the final value.
  const handleLotsBlur = () => {
    const v = parseFloat(lotsText);
    const next = isNaN(v) || v < 0.01 ? 0.01 : Math.round(v * 100) / 100;
    setLots(next);
    setLotsText(next.toString());
  };

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmDirection, setConfirmDirection] = useState<'buy' | 'sell'>('buy');
  const [confirmOrderType, setConfirmOrderType] = useState<'market' | 'pending'>('market');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // Pending order trigger price
  const [triggerPrice, setTriggerPrice] = useState<number>(0);

  // Success toast
  const [successToast, setSuccessToast] = useState<{ type: 'market' | 'pending'; direction: 'buy' | 'sell'; symbol: string } | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----------------------------------------------------------------------
  // WebSocket and price logic (unchanged)
  // ----------------------------------------------------------------------
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
    delete highRef.current[symbol];
    delete lowRef.current[symbol];
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
      const currentSymbol = selectedCoinRef.current;
      subscribeToSymbol(currentSymbol);
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
        } catch (err) { }
      });
    };
    ws.onclose = (event) => {
      subscribedSymbolRef.current = null;
      if (!event.wasClean) {
        reconnectTimeoutRef.current = setTimeout(() => connectWebSocket(), 3000);
      }
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
  }, [encode, parseMessages, extractSymbol, subscribeToSymbol]);

  const selectedCoinRef = useRef(selectedCoin);
  useEffect(() => { selectedCoinRef.current = selectedCoin; }, [selectedCoin]);
  useEffect(() => { livePriceRef.current = currentPrice; }, [currentPrice]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connectWebSocket]);

  useEffect(() => { subscribeToSymbol(selectedCoin); }, [selectedCoin, subscribeToSymbol]);

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
    if (!highRef.current[selectedCoin] || midPrice > highRef.current[selectedCoin])
      highRef.current[selectedCoin] = midPrice;
    if (!lowRef.current[selectedCoin] || midPrice < lowRef.current[selectedCoin])
      lowRef.current[selectedCoin] = midPrice;
  }, [markets, selectedCoin]);

  // Balance
  const calculateBalances = useCallback(() => {
    if (listAssets?.length > 0) {
      const USDAsset = listAssets.find((asset: any) => asset.symbol === 'USDT');
      setUSDBalance(USDAsset?.amount || 0);
    }
  }, [listAssets]);
  useEffect(() => { calculateBalances(); }, [calculateBalances]);

  // Fetch pending orders on mount
  useEffect(() => {
    dispatch(futuresListAction.doFetchPending());
    dispatch(assetsListAction.doFetch());
  }, [dispatch]);

  // Derive priceInjection for the currently selected symbol from server data.
  // All fields (entry, target, started, duration, seed) come from the server so
  // every device renders the exact same animation. Memoized on injection identity.
  const serverInj = symbolInjections[selectedCoin];
  const priceInjection: PriceInjection | null = useMemo(() => {
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

  // Header injected price (deterministic; re-evaluated by the 1 s ticker)
  const headerInjectedPrice = serverInj ? getInjectionDisplayPrice(serverInj) : null;

  // Formatting helpers
  const formatNumber = useCallback((num: any, decimals?: number): string => {
    if (num === null || num === undefined) return "0.00";
    const numValue = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(numValue)) return "0.00";
    return numValue.toFixed(decimals ?? 5);
  }, []);

  const formatDateTime = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      if (isToday) {
        return i18n('pages.history.dateFormats.today', date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
      return i18n('pages.history.dateFormats.yesterday', date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (error) {
      return dateString;
    }
  }, []);

  const formatDateTimeDetailed = useCallback((dateString: string): string => {
    if (!dateString) return i18n('pages.assetsDetail.status.pending');
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return `${date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
    } catch (error) {
      return dateString;
    }
  }, []);

  const safeToFixed = useCallback((value: any, decimals: number = 2): string => {
    if (value === null || value === undefined) return "0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.00" : num.toFixed(decimals);
  }, []);


  // Confirm order handler
  const handleOpenConfirm = (direction: 'buy' | 'sell', orderType: 'market' | 'pending' = 'market') => {
    setConfirmDirection(direction);
    setConfirmOrderType(orderType);
    setConfirmError(
      insufficientBalance
        ? `Insufficient balance. Required: $${estimatedMargin}, Available: $${USDBalance.toFixed(2)}`
        : null
    );
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = async () => {
    if (!currentTenant?.id || currentPrice === null) return;
    setConfirmLoading(true);
    setConfirmError(null);
    try {
      const payload: any = {
        orderType: confirmOrderType,
        symbol: selectedCoin,
        symbolName: displayName,
        direction: confirmDirection,
        lots,
        multiplier,
        takeProfit: useTakeProfit ? takeProfitValue : null,
        stopLoss: useStopLoss ? stopLossValue : null,
      };
      if (confirmOrderType === 'market') {
        payload.entryPrice = currentPrice;
      } else {
        payload.targetPrice    = triggerPrice;
        payload.referencePrice = currentPrice;
      }
      await authAxios.post(`/tenant/${currentTenant.id}/trade-orders`, payload);
      // Immediately reflect the deducted margin in the UI balance
      setUSDBalance(prev => Math.max(0, prev - marginNeeded));
      // Re-fetch assets from server to get the authoritative balance
      dispatch(assetsListAction.doFetch());
      setShowConfirmModal(false);
      // Show success toast
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      setSuccessToast({ type: confirmOrderType, direction: confirmDirection, symbol: selectedCoin });
      successTimerRef.current = setTimeout(() => setSuccessToast(null), 4000);
    } catch (err: any) {
      const msg = err?.response?.data?.errors?.[0]?.message || 'Failed to place order. Please try again.';
      setConfirmError(msg);
    } finally {
      setConfirmLoading(false);
    }
  };

  // Modal handlers
  const handleOpenCoinModal = () => setIsCoinModalOpen(true);
  const handleCloseCoinModal = () => setIsCoinModalOpen(false);
  const handleSelectCoin = (coin: string) => {
    setCurrentPrice(null); // ensure livePrice=null before remount so history uses the correct new price
    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
  };

  const handleOpenModal = (direction: "up" | "down") => {
    dispatch(assetsListAction.doFetch());
    setTradeDirection(direction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTradeDirection(null);
  };

  const handleOpenOrderModal = (order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };
  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  // Derived values
  const displayName = useMemo(() => {
    const coin = availableCoins.find(c => c.symbol === selectedCoin);
    return coin?.name || selectedCoin.replace(/(.{3})(.{3})/, "$1 / $2");
  }, [selectedCoin]);

  const currentPair = useMemo(
    () => getPairInfo(selectedCoin) || { symbol: selectedCoin, name: displayName },
    [selectedCoin, displayName]
  );

  const high = highRef.current[selectedCoin] ?? (currentPrice ?? 0);
  const low = lowRef.current[selectedCoin] ?? (currentPrice ?? 0);

  // ----- Trading form helpers -----

  // Adaptive pip step: large step for high-value pairs (indices/metals/BTC), tiny for forex
  const priceStep = useMemo(() => {
    const p = currentPrice ?? 1;
    if (p >= 10000) return 1;
    if (p >= 100)   return 0.01;
    if (p >= 10)    return 0.001;
    return 0.00001;
  }, [currentPrice]);

  // Format SL/TP values to match price magnitude
  const fmtSLTP = useCallback((val: number): string => {
    if (val === 0) return '0';
    const p = currentPrice ?? val;
    if (p >= 10000) return val.toFixed(2);
    if (p >= 100)   return val.toFixed(3);
    if (p >= 10)    return val.toFixed(3);
    return val.toFixed(5);
  }, [currentPrice]);

  // Toggle Stop Loss: seed with live price when enabling
  const handleToggleStopLoss = useCallback((checked: boolean) => {
    setUseStopLoss(checked);
    setStopLossValue(checked && currentPrice !== null ? currentPrice : 0);
  }, [currentPrice]);

  // Toggle Take Profit: seed with live price when enabling
  const handleToggleTakeProfit = useCallback((checked: boolean) => {
    setUseTakeProfit(checked);
    setTakeProfitValue(checked && currentPrice !== null ? currentPrice : 0);
  }, [currentPrice]);

  const stepStopLoss = (delta: number) => {
    if (!useStopLoss) return;
    setStopLossValue(prev => {
      const next = prev + delta;
      return next < 0 ? 0 : +next.toFixed(10);
    });
  };
  const stepTakeProfit = (delta: number) => {
    if (!useTakeProfit) return;
    setTakeProfitValue(prev => {
      const next = prev + delta;
      return next < 0 ? 0 : +next.toFixed(10);
    });
  };
  const stepLots = (delta: number) => {
    setLots(prev => {
      const next = Math.max(0.01, +(prev + delta).toFixed(2));
      setLotsText(next.toString());
      return next;
    });
  };

  const stepTriggerPrice = (delta: number) => {
    setTriggerPrice(prev => {
      const next = prev + delta;
      return next <= 0 ? 0 : +next.toFixed(10);
    });
  };

  // Seed trigger price from live price when switching to pending tab
  useEffect(() => {
    if (activeInfoTab === 'pendingOrders' && currentPrice !== null && triggerPrice === 0) {
      setTriggerPrice(currentPrice);
    }
  }, [activeInfoTab, currentPrice]);

  // "1 Lots = 100 USDJPY" – 100 units of the selected pair per lot
  const eachLotValue = `1 Lots = 100 ${selectedCoin}`;

  const handlingFee = "0.000012";

  // Estimated Margin = (price × 100 × lots) / (multiplier / 100)
  //   At multiplier=100, lots=0.01 → equals pair price  (e.g. 1.0820 for EURUSD)
  //   At multiplier=200 → halves;  multiplier=500 → divides by 5
  const estimatedMargin = useMemo(() => {
    const price = currentPrice ?? 0;
    const leverage = multiplier / 100;          // 100→1, 200→2, …, 500→5
    const margin = (price * 100 * lots) / leverage;  // = price * 10000 * lots / multiplier
    if (margin === 0) return '0.00';
    if (margin >= 10000) return margin.toFixed(2);
    if (margin >= 100)   return margin.toFixed(3);
    if (margin >= 10)    return margin.toFixed(4);
    return margin.toFixed(5);
  }, [lots, currentPrice, multiplier]);

  const marginNeeded = parseFloat(estimatedMargin) || 0;
  const insufficientBalance = USDBalance < marginNeeded && marginNeeded > 0;

  return (
    <div className="container">
      {/* Header – transparent, inheriting the gradient from the container */}
      <div className="header">
        <div className="header-top">
          <div className="market-info">
            <PairIcon pair={currentPair} size="md" />
            <div className="market-name">{displayName}</div>
            <div
              className="market-change"
              style={{ color: (priceChangePercent ?? 0) < 0 ? '#ff4d4d' : '#36f936' }}
            >
              {currentPrice !== null ? (
                `${(priceChangePercent ?? 0) > 0 ? '+' : ''}${(priceChangePercent ?? 0).toFixed(2)}%`
              ) : (
                <div className="loading-placeholder" style={{ width: '50px', height: '16px' }} />
              )}
            </div>
          </div>
          <div className="additional-actions" onClick={handleOpenCoinModal}>
            <i className="fas fa-filter" />
          </div>
        </div>
        <div
          className="market-price"
          style={{ color: headerInjectedPrice != null
            ? ((serverInj && serverInj.targetPrice >= serverInj.entryPrice) ? '#36f936' : '#ff4d4d')
            : (priceChangePercent ?? 0) < 0 ? '#ff4d4d' : '#36f936' }}
        >
          {headerInjectedPrice != null ? (
            `$${formatNumber(headerInjectedPrice)}`
          ) : currentPrice !== null ? (
            `$${formatNumber(currentPrice)}`
          ) : (
            <div className="loading-placeholder" style={{ width: '120px', height: '28px' }} />
          )}
        </div>
        <div className="market-stats">
          <span>
            {i18n('pages.marketDetail.stats.high')}:{' '}
            {currentPrice !== null ? `$${formatNumber(high)}` : <div className="loading-placeholder" style={{ width: '80px', height: '12px' }} />}
          </span>
          <span>
            {i18n('pages.marketDetail.stats.low')}:{' '}
            {currentPrice !== null ? `$${formatNumber(low)}` : <div className="loading-placeholder" style={{ width: '80px', height: '12px' }} />}
          </span>
        </div>
      </div>

      {/* White content card */}
      <div className="content-card">
        <CustomTradingChart
          key={selectedCoin}
          symbol={selectedCoin}
          livePrice={currentPrice}
          height={400}
          priceInjection={priceInjection}
        />

        {/* ✅ New pill-shaped tabs */}
        <div className="pill-tabs">
          <div
            className={`pill-tab ${activeInfoTab === "marketPrice" ? "active" : ""}`}
            onClick={() => setActiveInfoTab("marketPrice")}
          >
            Market Price
          </div>
          <div
            className={`pill-tab ${activeInfoTab === "pendingOrders" ? "active" : ""}`}
            onClick={() => setActiveInfoTab("pendingOrders")}
          >
            Pending Orders
          </div>
        </div>

        {/* ✅ Content based on active tab */}
        {activeInfoTab === "marketPrice" ? (
          <>
            {/* Trading Form */}
            <div className="trading-form">
              {/* Multiplier row */}
              <div className="form-row">
                <span className="form-label">Multiplier</span>
                <select
                  className="multiplier-select"
                  value={multiplier}
                  onChange={(e) => setMultiplier(+e.target.value)}
                >
                  {[100, 200, 300, 400, 500].map(v => (
                    <option key={v} value={v}>{v}×</option>
                  ))}
                </select>
              </div>

              {/* Set Loss row */}
              <div className="form-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={useStopLoss}
                    onChange={(e) => handleToggleStopLoss(e.target.checked)}
                    className="form-checkbox"
                  />
                </div>
                <span className="form-label">Set Loss</span>
                <div className="stepper">
                  <button
                    className="step-btn"
                    onClick={() => stepStopLoss(-priceStep)}
                    disabled={!useStopLoss}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="step-value"
                    value={stopLossValue}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v) && v >= 0) setStopLossValue(v);
                    }}
                    disabled={!useStopLoss}
                    step="any"
                    min="0"
                  />
                  <button
                    className="step-btn"
                    onClick={() => stepStopLoss(priceStep)}
                    disabled={!useStopLoss}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Take Profit row */}
              <div className="form-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={useTakeProfit}
                    onChange={(e) => handleToggleTakeProfit(e.target.checked)}
                    className="form-checkbox"
                  />
                </div>
                <span className="form-label">Take Profit</span>
                <div className="stepper">
                  <button
                    className="step-btn"
                    onClick={() => stepTakeProfit(-priceStep)}
                    disabled={!useTakeProfit}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="step-value"
                    value={takeProfitValue}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v) && v >= 0) setTakeProfitValue(v);
                    }}
                    disabled={!useTakeProfit}
                    step="any"
                    min="0"
                  />
                  <button
                    className="step-btn"
                    onClick={() => stepTakeProfit(priceStep)}
                    disabled={!useTakeProfit}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Lots (Step:0.01) row */}
              <div className="form-row">
                <span className="form-label">Lots (Step:0.01)</span>
                <div className="stepper">
                  <button className="step-btn" onClick={() => stepLots(-0.01)}>−</button>
                  <input
                    type="number"
                    className="step-value"
                    value={lotsText}
                    onChange={handleLotsChange}
                    onBlur={handleLotsBlur}
                    step="0.01"
                    min="0.01"
                  />
                  <button className="step-btn" onClick={() => stepLots(0.01)}>+</button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="form-divider"></div>

            {/* Information section */}
            <div className="info-section">
              <div className="info-row">
                <span className="info-label">Each Lots</span>
                <span className="info-value">{eachLotValue}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estimated Handling Fee</span>
                <span className="info-value">{handlingFee}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estimated Margin</span>
                <span className="info-value" style={{ color: insufficientBalance ? '#ff4d4d' : undefined }}>
                  ${estimatedMargin}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Balance</span>
                <span className="info-value">${USDBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Insufficient balance warning */}
            {insufficientBalance && (
              <div className="balance-insufficient-msg">
                ⚠ Insufficient balance. Need ${estimatedMargin}, you have ${USDBalance.toFixed(2)}.
              </div>
            )}

            {/* Buy / Sell buttons */}
            <div className="future-action-buttons">
              <button
                className="action-button buy-button"
                onClick={() => handleOpenConfirm('buy')}
                disabled={currentPrice === null || insufficientBalance}
              >
                {i18n('pages.futures.actions.buyUp')}
              </button>
              <button
                className="action-button sell-button"
                onClick={() => handleOpenConfirm('sell')}
                disabled={currentPrice === null || insufficientBalance}
              >
                {i18n('pages.futures.actions.buyDown')}
              </button>
            </div>
          </>
        ) : (
          /* ── Pending Orders Form ── */
          <>
            <div className="trading-form">
              {/* Multiplier row */}
              <div className="form-row">
                <span className="form-label">Multiplier</span>
                <select
                  className="multiplier-select"
                  value={multiplier}
                  onChange={(e) => setMultiplier(+e.target.value)}
                >
                  {[100, 200, 300, 400, 500].map(v => (
                    <option key={v} value={v}>{v}×</option>
                  ))}
                </select>
              </div>

              {/* Trigger Price row */}
              <div className="form-row">
                <span className="form-label">Trigger Price</span>
                <div className="stepper">
                  <button className="step-btn" onClick={() => stepTriggerPrice(-priceStep)}>−</button>
                  <input
                    type="number"
                    className="step-value"
                    value={triggerPrice}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v) && v >= 0) setTriggerPrice(v);
                    }}
                    step="any"
                    min="0"
                  />
                  <button className="step-btn" onClick={() => stepTriggerPrice(priceStep)}>+</button>
                </div>
              </div>

              {/* Stop Loss row */}
              <div className="form-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={useStopLoss}
                    onChange={(e) => handleToggleStopLoss(e.target.checked)}
                    className="form-checkbox"
                  />
                </div>
                <span className="form-label">Set Loss</span>
                <div className="stepper">
                  <button className="step-btn" onClick={() => stepStopLoss(-priceStep)} disabled={!useStopLoss}>−</button>
                  <input
                    type="number"
                    className="step-value"
                    value={stopLossValue}
                    onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0) setStopLossValue(v); }}
                    disabled={!useStopLoss}
                    step="any"
                    min="0"
                  />
                  <button className="step-btn" onClick={() => stepStopLoss(priceStep)} disabled={!useStopLoss}>+</button>
                </div>
              </div>

              {/* Take Profit row */}
              <div className="form-row">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={useTakeProfit}
                    onChange={(e) => handleToggleTakeProfit(e.target.checked)}
                    className="form-checkbox"
                  />
                </div>
                <span className="form-label">Take Profit</span>
                <div className="stepper">
                  <button className="step-btn" onClick={() => stepTakeProfit(-priceStep)} disabled={!useTakeProfit}>−</button>
                  <input
                    type="number"
                    className="step-value"
                    value={takeProfitValue}
                    onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0) setTakeProfitValue(v); }}
                    disabled={!useTakeProfit}
                    step="any"
                    min="0"
                  />
                  <button className="step-btn" onClick={() => stepTakeProfit(priceStep)} disabled={!useTakeProfit}>+</button>
                </div>
              </div>

              {/* Lots row */}
              <div className="form-row">
                <span className="form-label">Lots (Step:0.01)</span>
                <div className="stepper">
                  <button className="step-btn" onClick={() => stepLots(-0.01)}>−</button>
                  <input
                    type="number"
                    className="step-value"
                    value={lotsText}
                    onChange={handleLotsChange}
                    onBlur={handleLotsBlur}
                    step="0.01"
                    min="0.01"
                  />
                  <button className="step-btn" onClick={() => stepLots(0.01)}>+</button>
                </div>
              </div>
            </div>

            <div className="form-divider" />

            <div className="info-section">
              <div className="info-row">
                <span className="info-label">Current Price</span>
                <span className="info-value">{currentPrice !== null ? currentPrice.toFixed(5) : '—'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Trigger at</span>
                <span className="info-value" style={{ color: '#106cf5' }}>{fmtSLTP(triggerPrice)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Estimated Margin</span>
                <span className="info-value" style={{ color: insufficientBalance ? '#ff4d4d' : undefined }}>
                  ${estimatedMargin}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Balance</span>
                <span className="info-value">${USDBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Insufficient balance warning */}
            {insufficientBalance && (
              <div className="balance-insufficient-msg">
                ⚠ Insufficient balance. Need ${estimatedMargin}, you have ${USDBalance.toFixed(2)}.
              </div>
            )}

            <div className="future-action-buttons">
              <button
                className="action-button buy-button"
                onClick={() => handleOpenConfirm('buy', 'pending')}
                disabled={currentPrice === null || triggerPrice <= 0 || insufficientBalance}
              >
                Buy Pending
              </button>
              <button
                className="action-button sell-button"
                onClick={() => handleOpenConfirm('sell', 'pending')}
                disabled={currentPrice === null || triggerPrice <= 0 || insufficientBalance}
              >
                Sell Pending
              </button>
            </div>
          </>
        )}

        {/* Order detail modal (unchanged) */}
        {isOrderModalOpen && selectedOrder && (
          <OrderDetailModal
            selectedOrder={selectedOrder}
            onClose={handleCloseOrderModal}
            formatDateTimeDetailed={formatDateTimeDetailed}
            safeToFixed={safeToFixed}
          />
        )}
      </div>

      {/* ── Order Confirmation Modal (z-index 8000) ── */}
      {showConfirmModal && (
        <>
          <div
            className="confirm-overlay"
            onClick={() => !confirmLoading && setShowConfirmModal(false)}
          />
          <div className="confirm-sheet">
            <div className="confirm-handle" />
            <div className="confirm-title">
              {confirmOrderType === 'market' ? 'Confirm Market Order' : 'Confirm Pending Order'}
            </div>
            <div className="confirm-summary">
              <span className={`confirm-dir ${confirmDirection === 'buy' ? 'buy' : 'sell'}`}>
                {confirmDirection === 'buy' ? 'Buy' : 'Sell'}{confirmOrderType === 'pending' ? ' Pending' : ''}
              </span>
              <span className="confirm-pair">{selectedCoin}</span>
              <span className="confirm-meta">{lots.toFixed(2)} Lots · {multiplier}×</span>
              {confirmOrderType === 'market'
                ? <span className="confirm-price">@ {currentPrice !== null ? currentPrice.toFixed(5) : '—'} (market)</span>
                : <span className="confirm-price">Trigger @ {fmtSLTP(triggerPrice)} · Now {currentPrice !== null ? currentPrice.toFixed(5) : '—'}</span>
              }
              <span className="confirm-margin">Estimated Margin: <strong>${estimatedMargin}</strong></span>
            </div>
            {confirmError && <div className="confirm-error">{confirmError}</div>}
            <div className="confirm-buttons">
              <button
                className="confirm-btn-primary"
                onClick={handleConfirmOrder}
                disabled={confirmLoading}
              >
                {confirmLoading ? 'Placing…' : 'Confirmation'}
              </button>
              <button
                className="confirm-btn-secondary"
                onClick={() => { setShowConfirmModal(false); history.push('/ordersPage'); }}
                disabled={confirmLoading}
              >
                Order Page
              </button>
            </div>
          </div>
        </>
      )}

      <FuturesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        direction={tradeDirection}
        dispatch={dispatch}
        listAssets={listAssets}
        selectedCoin={selectedCoin}
        marketPrice={currentPrice?.toString() ?? "0"}
        availableBalance={USDBalance}
        setOpeningOrders={setOpeningOrders}
        isDemoAccount={isDemoAccount}
      />

      <CoinSelectorSidebar
        isOpen={isCoinModalOpen}
        onClose={handleCloseCoinModal}
        selectedCoin={selectedCoin}
        onCoinSelect={handleSelectCoin}
        availableCoins={availableCoins.map(c => ({ symbol: c.symbol, name: c.name }))}
        title={i18n('pages.marketDetail.coinSelector.title')}
      />

      {/* ── Success Toast ── */}
      {successToast && (
        <div className="success-toast" onClick={() => setSuccessToast(null)}>
          <div className="success-toast-icon">✓</div>
          <div className="success-toast-body">
            <div className="success-toast-title">Order Placed Successfully!</div>
            <div className="success-toast-sub">
              {successToast.direction === 'buy' ? 'Buy' : 'Sell'}{' '}
              {successToast.type === 'pending' ? 'Pending' : 'Market'} · {successToast.symbol}
            </div>
            <div className="success-toast-note">
              {successToast.type === 'market'
                ? 'Your position is now active. Track it in Orders.'
                : 'Your pending order is waiting for the trigger price.'}
            </div>
          </div>
        </div>
      )}

      {/* CSS – updated with new styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          padding: 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          color: white;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .market-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .market-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        .market-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .market-name {
          font-weight: 600;
          font-size: 17px;
          white-space: nowrap;
        }

        .market-change {
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          margin-left: 8px;
        }

        .additional-actions {
          color: rgba(255,255,255,0.8);
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        .additional-actions:hover {
          color: white;
        }

        .market-price {
          font-size: 24px;
          font-weight: 700;
          margin: 8px 0 4px;
          color: white;
        }

        .market-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          flex-wrap: wrap;
          gap: 8px;
        }

        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ✅ Pill-shaped tabs */
        .pill-tabs {
          display: flex;
          gap: 8px;
          margin-top: 0;
          padding: 0;
        }

        .pill-tab {
          flex: 1;
          text-align: center;
          padding: 10px 0;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: #f0f2f5;
          color: #555;
          transition: all 0.2s;
        }

        .pill-tab.active {
          background: #106cf5;
          color: white;
          font-weight: 600;
        }

        /* ✅ Trading form */
        .trading-form {
          background: white;
          border-radius: 12px;
          padding: 0 4px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .form-label {
          flex: 0 0 100px;
          color: #555;
          font-weight: 500;
        }

        .multiplier-select {
          margin-left: auto;
          background: #f0f2f5;
          border: 1.5px solid #e0e3e8;
          border-radius: 8px;
          padding: 7px 28px 7px 14px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: border-color 0.2s, background-color 0.2s;
          min-width: 90px;
        }

        .multiplier-select:focus {
          border-color: #106cf5;
          background-color: #fff;
        }

        .checkbox-container {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
        }

        .step-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #ddd;
          background: #f8f9fb;
          border-radius: 6px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          transition: all 0.2s;
        }

        .step-btn:hover:not(:disabled) {
          background: #e6efff;
        }

        .step-btn:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .step-value {
          width: 80px;
          min-width: 60px;
          text-align: center;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 14px;
          border: 1.5px solid #e0e3e8;
          border-radius: 7px;
          padding: 5px 6px;
          background: #f8f9fb;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -moz-appearance: textfield;
        }
        .step-value::-webkit-inner-spin-button,
        .step-value::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .step-value:focus {
          border-color: #106cf5;
          background: #fff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.12);
        }
        .step-value:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f0f2f5;
        }

        .form-divider {
          height: 1px;
          background: #edeef1;
          margin: 4px 0;
        }

        /* Info section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .info-label {
          color: #777;
        }

        .info-value {
          color: #1a1a1a;
          font-weight: 500;
        }

        .future-action-buttons {
          display: flex;
          gap: 12px;
          margin: 6px 0 0;
        }

        .action-button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .buy-button { background: #36f936; color: white; }
        .sell-button { background: #ff4d4d; color: white; }

        .action-button:hover { opacity: 0.9; }

        /* Pending orders list */
        .pending-orders-container {
          margin-top: 4px;
        }

        .order-card {
          background: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .order-card:hover {
          background: #f0f2f5;
          transform: translateY(-1px);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .order-pair {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 15px;
        }

        .order-direction {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .order-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .order-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .order-status.open { color: #36f936; font-size: 12px; margin-bottom: 8px; }

        .order-details { border-top: 1px solid #edeef1; padding-top: 10px; }

        .order-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 13px;
        }

        .order-label { color: #777; }
        .order-value { font-weight: 500; color: #1a1a1a; }

        .no-orders {
          text-align: center;
          padding: 30px 0;
          color: #999;
        }

        /* Loading placeholder */
        .loading-placeholder {
          animation: shimmer 1.4s infinite linear;
          background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Modals – dark style kept for contrast */
        .modal-overlays {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #1c1c1c;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid #2a2a2a;
          color: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .modal-header h2 { font-size: 18px; font-weight: 600; }

        .modal-close {
          background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer;
        }

        .modal-close:hover { color: #36f936; }

        .modal-body { padding: 20px; }

        .modal-footer {
          display: flex; justify-content: flex-end; padding: 20px; border-top: 1px solid #2a2a2a;
          gap: 10px;
        }

        .modal-button {
          background: #2a2a2a; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .modal-button:hover { background: #106cf5; }

        .close-order-button {
          background: #ff4d4d; color: white; border: none; border-radius: 6px; padding: 10px 20px;
          cursor: pointer; font-weight: 600;
        }

        .close-order-button:hover { background: #ff3333; }

        .order-detail-section { margin-bottom: 20px; }

        .order-detail-section h3 {
          font-size: 14px; color: #aaaaaa; margin-bottom: 12px; text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
        }

        .detail-pair { font-weight: 600; font-size: 18px; color: #ffffff; }

        .detail-direction {
          font-size: 14px; padding: 4px 8px; border-radius: 4px; font-weight: 600;
        }

        .detail-direction.buy { background: rgba(54,249,54,0.15); color: #36f936; }
        .detail-direction.sell { background: rgba(255,77,77,0.15); color: #ff4d4d; }

        .detail-status { font-size: 14px; margin-bottom: 15px; }
        .detail-status.open { color: #36f936; }
        .detail-status.closed { color: #999; }

        .detail-row {
          display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;
        }

        .detail-label { color: #aaaaaa; }
        .detail-value { font-weight: 500; color: #ffffff; }
        .detail-value.profit { color: #36f936; }
        .detail-value.loss { color: #ff4d4d; }

        /* ── Order Confirmation Modal ── */
        .confirm-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.55);
          z-index: 7999;
          animation: fadeIn 0.2s ease;
        }

        .confirm-sheet {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 24px 24px 0 0;
          padding: 20px 24px 40px;
          z-index: 8000;
          animation: slideUp 0.3s ease;
        }

        .confirm-handle {
          width: 40px; height: 4px;
          background: #ddd; border-radius: 2px;
          margin: 0 auto 20px;
        }

        .confirm-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 20px;
        }

        .confirm-summary {
          background: #f8f9fb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .confirm-dir {
          font-size: 16px;
          font-weight: 700;
        }
        .confirm-dir.buy  { color: #36c836; }
        .confirm-dir.sell { color: #ff4d4d; }

        .confirm-pair   { font-weight: 600; color: #1a1a1a; }
        .confirm-meta   { color: #666; }
        .confirm-price  { color: #106cf5; font-weight: 600; }
        .confirm-margin { color: #555; font-size: 13px; }
        .confirm-margin strong { color: #1a1a1a; }

        .balance-insufficient-msg {
          background: #fff3f3;
          border: 1px solid #ffb3b3;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #cc0000;
          font-weight: 500;
          text-align: center;
        }

        .confirm-error {
          color: #ff4d4d;
          font-size: 13px;
          text-align: center;
          margin-bottom: 12px;
        }

        .confirm-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .confirm-btn-primary {
          width: 100%;
          padding: 15px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .confirm-btn-primary:disabled { opacity: 0.6; cursor: default; }
        .confirm-btn-primary:hover:not(:disabled) { opacity: 0.9; }

        .confirm-btn-secondary {
          width: 100%;
          padding: 15px;
          background: white;
          color: #106cf5;
          border: 1.5px solid #106cf5;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .confirm-btn-secondary:disabled { opacity: 0.6; cursor: default; }
        .confirm-btn-secondary:hover:not(:disabled) { background: #f0f6ff; }

        @keyframes fadeIn  { from { opacity: 0; }               to { opacity: 1; } }
        @keyframes slideUp { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }

        /* ── Success Toast ── */
        .success-toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 368px;
          background: #fff;
          border-radius: 16px;
          padding: 16px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(16,108,245,0.10);
          border-left: 5px solid #22c55e;
          z-index: 9999;
          cursor: pointer;
          animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .success-toast-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-toast-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .success-toast-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .success-toast-sub {
          font-size: 13px;
          font-weight: 600;
          color: #106cf5;
        }

        .success-toast-note {
          font-size: 12px;
          color: #666;
          margin-top: 2px;
          line-height: 1.4;
        }

        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)      scale(1);    }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header { padding: 16px; min-height: 50px; }
          .content-card { padding: 25px 16px 100px; }
        }
        @media (min-width: 768px) {
          .content-card { border-radius: 30px 30px 0 0; }
        }
      `}</style>
    </div>
  );
}

// ---------- OrderDetailModal (unchanged) ----------
const OrderDetailModal = ({
  selectedOrder,
  onClose,
  formatDateTimeDetailed,
  safeToFixed
}: any) => (
  <div className="modal-overlays" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{i18n('pages.futures.orderDetails.title')}</h2>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="modal-body">
        <div className="order-detail-section">
          <div className="detail-header">
            <span className="detail-pair">{selectedOrder.symbol || selectedOrder.pair}</span>
            <span className={`detail-direction ${selectedOrder.futuresStatus === "long" || selectedOrder.direction === "BUY UP" ? "buy" : "sell"}`}>
              {selectedOrder.futuresStatus === "long"
                ? i18n('pages.futures.actions.buyUp')
                : selectedOrder.futuresStatus === "short"
                  ? i18n('pages.futures.actions.buyDown')
                  : selectedOrder.direction}
            </span>
          </div>
          <div className={`detail-status ${selectedOrder.finalized ? "closed" : "open"}`}>
            ● {selectedOrder.finalized ? i18n('pages.futures.orderDetails.closed') : i18n('pages.futures.orderDetails.open')}
          </div>
        </div>
        <div className="order-detail-section">
          <OrderDetailRow label={i18n('pages.futures.orderDetails.futuresAmount')} value={`${selectedOrder.futuresAmount || selectedOrder.investment} USD`} />
          {selectedOrder.contractDuration && (
            <OrderDetailRow label={i18n('pages.futures.orderDetails.contractDuration')} value={`${selectedOrder.contractDuration} ${i18n('pages.futures.orderDetails.seconds')}`} />
          )}
          <OrderDetailRow label={i18n('pages.futures.orderDetails.futuresStatus')} value={selectedOrder.closePositionTime ? i18n('pages.futures.orderDetails.completed') : i18n('pages.futures.orderDetails.open')} />
          <OrderDetailRow label={i18n('pages.futures.orderDetails.openPositionPrice')} value={selectedOrder.openPositionPrice || selectedOrder.openPrice} />
          <OrderDetailRow label={i18n('pages.futures.orderDetails.openPositionTime')} value={formatDateTimeDetailed(selectedOrder.openPositionTime || selectedOrder.openTime)} />
          {selectedOrder.closePositionPrice && <OrderDetailRow label={i18n('pages.futures.orderDetails.closePositionPrice')} value={selectedOrder.closePositionPrice} />}
          {selectedOrder.closePositionTime && <OrderDetailRow label={i18n('pages.futures.orderDetails.closePositionTime')} value={formatDateTimeDetailed(selectedOrder.closePositionTime)} />}
          <OrderDetailRow label={i18n('pages.futures.orderDetails.profitLossAmount')} value={(selectedOrder.profitAndLossAmount || selectedOrder.pnl) ? `${safeToFixed(selectedOrder.profitAndLossAmount || selectedOrder.pnl, 2)} USD` : "__"} className={selectedOrder.control === "profit" ? "profit" : "loss"} />
          <OrderDetailRow label={i18n('pages.futures.orderDetails.leverage')} value={`${selectedOrder.leverage}X`} />
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-button" onClick={onClose}>{i18n('pages.futures.orderDetails.done')}</button>
      </div>
    </div>
  </div>
);

const OrderDetailRow = ({ label, value, className = "" }: any) => (
  <div className="detail-row">
    <span className="detail-label">{label}</span>
    <span className={`detail-value ${className}`}>{value}</span>
  </div>
);

export default Futures;
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsFormAction from "src/modules/assets/form/assetsFormActions";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/form/assetsFormSelectors";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import { i18n } from "../../../i18n";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Volume
  p: string; // Price change
  q: string; // Quote volume (USD volume)
}

function Conversion() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0.0");
  const [conversionRate, setConversionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [conversionFee, setConversionFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [frozenConversionData, setFrozenConversionData] = useState({
    rate: 0,
    fromAmount: 0,
    toAmount: 0,
    finalAmount: 0,
    fee: 0
  });
  const [conversionSuccessData, setConversionSuccessData] = useState({
    amount: "0",
    coinType: "USD"
  });
  const selectModal = useSelector(selector.selectModal);
  const assetsBalance = useSelector(assetsListSelectors.selectRows);
  const ws = useRef<WebSocket | null>(null);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);
  const priceUpdateInterval = useRef<NodeJS.Timeout | null>(null);

  // List of allowed coins (11 coins as specified) with Binance symbols
  const allowedCoins = [
    { code: "USD", name: "Tether USD", color: "#26A17B", symbol: "USD", binanceSymbol: "USDUSD" },
    { code: "ETH", name: "Ethereum", color: "#627EEA", symbol: "ETH", binanceSymbol: "ETHUSD" },
    { code: "BTC", name: "Bitcoin", color: "#F7931A", symbol: "BTC", binanceSymbol: "BTCUSD" },
    { code: "USDC", name: "USD Coin", color: "#2775CA", symbol: "USDC", binanceSymbol: "USDCUSD" },
    { code: "DAI", name: "Dai", color: "#F4B731", symbol: "DAI", binanceSymbol: "DAIUSD" },
    { code: "SHIB", name: "Shiba Inu", color: "#FFC107", symbol: "SHIB", binanceSymbol: "SHIBUSD" },
    { code: "XRP", name: "Ripple", color: "#23292F", symbol: "XRP", binanceSymbol: "XRPUSD" },
    { code: "TRX", name: "TRON", color: "#FF001A", symbol: "TRX", binanceSymbol: "TRXUSD" },
    { code: "SOL", name: "Solana", color: "#00FFA3", symbol: "SOL", binanceSymbol: "SOLUSD" },
    { code: "BNB", name: "Binance Coin", color: "#F0B90B", symbol: "BNB", binanceSymbol: "BNBUSD" },
    { code: "DOGE", name: "Dogecoin", color: "#C2A633", symbol: "DOGE", binanceSymbol: "DOGEUSD" }
  ];

  // Initialize balances from assets
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initializeBalances = () => {
      if (assetsBalance?.length) {
        const formatted = assetsBalance.reduce(
          (acc: { [key: string]: number }, item) => {
            acc[item.symbol] = item.amount;
            return acc;
          },
          {}
        );
        setBalances(formatted);
      }
    };

    initializeBalances();
  }, [assetsBalance]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Redux success modal
  useEffect(() => {
    if (selectModal && conversionSuccessData.amount !== "0") {
      setShowSuccessModal(true);
    }
  }, [selectModal, conversionSuccessData]);

  // Fetch assets and initial prices from Binance
  useEffect(() => {
    dispatch(assetsActions.doFetch());

    const fetchInitialPrices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");

        const initialPrices: { [key: string]: number } = { USD: 1 };

        allowedCoins.forEach(coin => {
          if (coin.code === "USD") return;

          const coinData = response.data.find((item: any) =>
            item.symbol === coin.binanceSymbol
          );

          if (coinData) {
            initialPrices[coin.code] = parseFloat(coinData.lastPrice);
          } else {
            const fallbackPrices: { [key: string]: number } = {
              ETH: 3000,
              BTC: 45000,
              USDC: 1,
              DAI: 1,
              SHIB: 0.00002,
              XRP: 0.6,
              TRX: 0.1,
              SOL: 100,
              BNB: 350,
              DOGE: 0.08
            };
            initialPrices[coin.code] = fallbackPrices[coin.code] || 1;
          }
        });

        setPrices(initialPrices);
        setIsLoading(false);

        // Set up interval for price updates (every 10 seconds)
        setupPriceUpdates();

      } catch (error) {
        console.error("Error fetching initial prices:", error);
        setIsLoading(false);
        const fallbackPrices: { [key: string]: number } = {
          USD: 1,
          BTC: 45000,
          ETH: 3000,
          USDC: 1,
          DAI: 1,
          SHIB: 0.00002,
          XRP: 0.6,
          TRX: 0.1,
          SOL: 100,
          BNB: 350,
          DOGE: 0.08
        };
        setPrices(fallbackPrices);
      }
    };

    fetchInitialPrices();

    // Cleanup on unmount
    return () => {
      if (priceUpdateInterval.current) {
        clearInterval(priceUpdateInterval.current);
      }
    };
  }, [dispatch]);

  // Set up periodic price updates (every 10 seconds)
  const setupPriceUpdates = () => {
    // Clear existing interval
    if (priceUpdateInterval.current) {
      clearInterval(priceUpdateInterval.current);
    }

    // Set new interval for price updates
    priceUpdateInterval.current = setInterval(async () => {
      try {
        // Only update if confirmation modal is NOT open
        if (!showConfirmationModal && !isConverting) {
          const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");

          const updatedPrices: { [key: string]: number } = { USD: 1 };

          allowedCoins.forEach(coin => {
            if (coin.code === "USD") return;

            const coinData = response.data.find((item: any) =>
              item.symbol === coin.binanceSymbol
            );

            if (coinData) {
              updatedPrices[coin.code] = parseFloat(coinData.lastPrice);
            }
          });

          setPrices(prev => ({
            ...prev,
            ...updatedPrices
          }));
        }
      } catch (error) {
        console.error("Error updating prices:", error);
      }
    }, 10000); // Update every 10 seconds
  };

  // Get coin info
  const getCoinInfo = (code: string) => {
    return allowedCoins.find(coin => coin.code === code) || allowedCoins[0];
  };

  // Calculate conversion
  const calculateConversion = useCallback(() => {
    const fromPrice = prices[fromCurrency] || 1;
    const toPrice = prices[toCurrency] || 1;

    if (fromPrice && toPrice && fromPrice > 0 && toPrice > 0) {
      const rate = fromPrice / toPrice;
      setConversionRate(rate);

      if (fromAmount) {
        const amount = parseFloat(fromAmount);
        if (!isNaN(amount) && amount > 0) {
          const result = amount * rate;
          setToAmount(result.toFixed(8));

          // Calculate fee (0.1%)
          const fee = amount * 0.001;
          setConversionFee(fee);
          setFinalAmount(result * 0.999); // After fee
        } else {
          setToAmount("0.0");
          setFinalAmount(0);
        }
      } else {
        setToAmount("0.0");
        setFinalAmount(0);
      }
    }
  }, [fromCurrency, toCurrency, fromAmount, prices]);

  // Recalculate on changes
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  // Check balance
  const hasSufficientBalance = useMemo(() => {
    if (!fromCurrency || !fromAmount) return false;
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) return false;
    const balance = balances[fromCurrency] || 0;
    return amount <= balance;
  }, [fromAmount, fromCurrency, balances]);

  // Input handlers
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  const handleSetMaxAmount = () => {
    setFromAmount(balances[fromCurrency]?.toString() || "0");
  };

  const switchCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    // Also swap amounts
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleCloseModal = () => {
    dispatch(assetsFormAction.doClose());
    setFromAmount("");
    setToAmount("0.0");
    setFinalAmount(0);
    setConversionFee(0);
    setShowSuccessModal(false);
    setConversionSuccessData({ amount: "0", coinType: "USD" });
    dispatch(assetsActions.doFetch());
  };

  // Open confirmation modal with frozen conversion data
  const handleOpenConfirmationModal = () => {
    // Freeze the current conversion data
    setFrozenConversionData({
      rate: conversionRate,
      fromAmount: parseFloat(fromAmount),
      toAmount: parseFloat(toAmount),
      finalAmount: finalAmount,
      fee: conversionFee
    });

    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const performConversion = () => {
    if (!hasSufficientBalance) return;
    setIsConverting(true);

    // Store conversion data for success modal
    const convertedAmount = frozenConversionData.finalAmount.toFixed(8);
    const convertedCoinType = toCurrency;

    setConversionSuccessData({
      amount: convertedAmount,
      coinType: convertedCoinType
    });

    setTimeout(() => {
      const values = {
        user: currentUser.id,
        fromSymbol: fromCurrency,
        fromAmount: frozenConversionData.fromAmount,
        toSymbol: toCurrency,
        coinName: toCurrency,
        toAmount: convertedAmount,
        status: "available",
      };

      dispatch(assetsFormAction.doCreate(values));

      // Update local balances
      setBalances(prev => ({
        ...prev,
        [fromCurrency]: (prev[fromCurrency] || 0) - frozenConversionData.fromAmount,
        [toCurrency]: (prev[toCurrency] || 0) + frozenConversionData.finalAmount
      }));

      setIsConverting(false);
      setShowConfirmationModal(false);
      setFromAmount("");

      setTimeout(() => {
        dispatch(assetsActions.doFetch());
      }, 500);
    }, 1500);
  };

  // Get balance for display
  const getBalance = (currency: string) => {
    return balances[currency]?.toFixed(8) || "0";
  };

  // Format exchange rate
  const formatExchangeRate = (rate: number = conversionRate) => {
    if (!rate || rate <= 0) return "0.00000000";

    if (rate < 0.0001) {
      return rate.toFixed(12);
    } else if (rate < 1) {
      return rate.toFixed(8);
    } else if (rate < 100) {
      return rate.toFixed(4);
    } else {
      return rate.toFixed(2);
    }
  };

  // Select coin from dropdown
  const selectFromCoin = (code: string) => {
    setFromCurrency(code);
    setShowFromDropdown(false);
  };

  const selectToCoin = (code: string) => {
    setToCurrency(code);
    setShowToDropdown(false);
  };

  // Get current coin image
  const getCoinImage = (code: string) => {
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${code}.png`;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    } else if (price >= 0.01) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    } else {
      return price.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 12 });
    }
  };

  return (
    <div className="container">
      {/* Header Section - Matching Swap Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow remove_blue">
            <div className="back-arrow">
              <i className="fas fa-arrow-left" />
            </div>
          </Link>
          <div className="page-title">{i18n("pages.conversion.title") || "Conversion"}</div>
          <Link to="/history"  className="header-icon-link remove_blue">
            <div className="header-icon">
              <i className="fas fa-receipt" />
            </div>
          </Link>
        </div>
      </div>

      {/* Swap Container */}
      <div className="swap-container">
        <div className="swap-card">
          {/* From Section */}
          <div className="section-header">
            <div className="section-title">{i18n("pages.conversion.youSend") || "You Send"}</div>
            <div className="available-balance">
              Available: {getBalance(fromCurrency)} {fromCurrency}
            </div>
          </div>

          {/* From Token Selector */}
          <div className="custom-select-wrapper" ref={fromDropdownRef}>
            <div className="token-selector" onClick={() => setShowFromDropdown(!showFromDropdown)}>
              <div className="token-info">
                <div className="token-icon">
                  <img
                    src={getCoinImage(fromCurrency)}
                    alt={fromCurrency}
                    className="coin-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${fromCurrency}.png`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="token-name">{fromCurrency}</div>
              </div>
              <i className={`fas fa-chevron-down selector-arrow ${showFromDropdown ? 'rotated' : ''}`} />
            </div>

            {showFromDropdown && (
              <div className="custom-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-title">Select Coin</div>
                  <div className="dropdown-count">{allowedCoins.length} coins</div>
                </div>
                <div className="dropdown-list">
                  {allowedCoins.map((coin) => (
                    <div
                      key={coin.code}
                      className={`dropdown-item ${fromCurrency === coin.code ? 'selected' : ''}`}
                      onClick={() => selectFromCoin(coin.code)}
                    >
                      <div className="item-icon">
                        <img
                          src={getCoinImage(coin.code)}
                          alt={coin.code}
                          className="coin-image"
                          onError={(e) => {
                            e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coin.code}.png`;
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                      <div className="item-info">
                        <div className="item-code">{coin.code}</div>
                        <div className="item-name">{coin.name}</div>
                      </div>
                      <div className="item-price">
                        ${prices[coin.code] ? formatPrice(prices[coin.code]) : '0.00'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* From Input Field */}
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder={i18n("pages.conversion.enterAmount") || "Please enter the amount"}
              value={fromAmount}
              onChange={handleFromAmountChange}
            />
            <div className="input-actions">
              <div className="token-symbol">{fromCurrency}</div>
              <button className="max-button" onClick={handleSetMaxAmount}>All</button>
            </div>
          </div>

          {/* Price Display */}
          <div className="price-display">
            {prices[fromCurrency] ? (
              <>
                1 {fromCurrency} = ${formatPrice(prices[fromCurrency])}
                <span className="price-update-indicator">
                  <i className="fas fa-sync-alt" /> Updated every 10s
                </span>
              </>
            ) : (
              <div className="price-loading">
                <i className="fas fa-spinner fa-spin" /> Loading price...
              </div>
            )}
          </div>

          {/* Swap Direction Button */}
          <div className="swap-direction">
            <div className="swap-button" onClick={switchCurrencies}>
              <i className="fas fa-exchange-alt" />
            </div>
          </div>

          {/* To Section */}
          <div className="section-header">
            <div className="section-title">{i18n("pages.conversion.youReceive") || "You Receive"}</div>
            <div className="available-balance">
              Available: {getBalance(toCurrency)} {toCurrency}
            </div>
          </div>

          {/* To Token Selector */}
          <div className="custom-select-wrapper" ref={toDropdownRef}>
            <div className="token-selector" onClick={() => setShowToDropdown(!showToDropdown)}>
              <div className="token-info">
                <div className="token-icon">
                  <img
                    src={getCoinImage(toCurrency)}
                    alt={toCurrency}
                    className="coin-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${toCurrency}.png`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="token-name">{toCurrency}</div>
              </div>
              <i className={`fas fa-chevron-down selector-arrow ${showToDropdown ? 'rotated' : ''}`} />
            </div>

            {showToDropdown && (
              <div className="custom-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-title">Select Coin</div>
                  <div className="dropdown-count">{allowedCoins.length} coins</div>
                </div>
                <div className="dropdown-list">
                  {allowedCoins.map((coin) => (
                    <div
                      key={coin.code}
                      className={`dropdown-item ${toCurrency === coin.code ? 'selected' : ''}`}
                      onClick={() => selectToCoin(coin.code)}
                    >
                      <div className="item-icon">
                        <img
                          src={getCoinImage(coin.code)}
                          alt={coin.code}
                          className="coin-image"
                          onError={(e) => {
                            e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coin.code}.png`;
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                      <div className="item-info">
                        <div className="item-code">{coin.code}</div>
                        <div className="item-name">{coin.name}</div>
                      </div>
                      <div className="item-price">
                        ${prices[coin.code] ? formatPrice(prices[coin.code]) : '0.00'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Output Field */}
          <input
            type="text"
            className="output-field"
            value={toAmount}
            readOnly
          />

          {/* Price Display */}
          <div className="price-display">
            {prices[toCurrency] ? (
              <>
                1 {toCurrency} = ${formatPrice(prices[toCurrency])}
                <span className="price-update-indicator">
                  <i className="fas fa-sync-alt" /> Updated every 10s
                </span>
              </>
            ) : (
              <div className="price-loading">
                <i className="fas fa-spinner fa-spin" /> Loading price...
              </div>
            )}
          </div>

          {/* Exchange Rate */}
          <div className="exchange-rate">
            1 {fromCurrency} ≈ {formatExchangeRate()} {toCurrency}
          </div>

          {/* Price Update Indicator */}
          <div className="realtime-indicator">
            <i className="fas fa-clock" /> Prices update every 10 seconds
          </div>

          {/* Confirm Button */}
          <button
            className="confirm-button"
            onClick={handleOpenConfirmationModal}
            disabled={isLoading || !fromAmount || !hasSufficientBalance || fromCurrency === toCurrency || parseFloat(fromAmount) <= 0}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Loading prices...
              </>
            ) : fromCurrency === toCurrency ? (
              i18n("pages.conversion.selectDifferentCurrencies") || "Select different currencies"
            ) : !hasSufficientBalance ? (
              i18n("pages.conversion.insufficientBalance") || "Insufficient balance"
            ) : (
              i18n("pages.conversion.confirmExchange") || "Confirm exchange"
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModalComponent
          isOpen={showSuccessModal}
          onClose={handleCloseModal}
          type='convert'
          amount={conversionSuccessData.amount}
          coinType={conversionSuccessData.coType}
        />
      )}

      {/* SIMPLIFIED Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            {/* Modal Header */}
            <div className="confirmation-header">
              <div className="confirmation-nav-bar">
                <div className="confirmation-title">Confirm Conversion</div>
                <button
                  className="confirmation-close"
                  onClick={() => !isConverting && setShowConfirmationModal(false)}
                  disabled={isConverting}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            {/* Modal Body - Simplified */}
            <div className="confirmation-body">
              {/* Icon Section - Keep this part */}
              <div className="confirmation-icon-section">
                <div className="from-coin-icon">
                  <img
                    src={getCoinImage(fromCurrency)}
                    alt={fromCurrency}
                    className="coin-image-large"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${fromCurrency}.png`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>

                <div className="conversion-direction">
                  <div className="direction-line"></div>
                  <div className="direction-icon">
                    <i className="fas fa-arrow-right" />
                  </div>
                  <div className="direction-line"></div>
                </div>

                <div className="to-coin-icon">
                  <img
                    src={getCoinImage(toCurrency)}
                    alt={toCurrency}
                    className="coin-image-large"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${toCurrency}.png`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
              </div>

              {/* Amount Display - Simplified */}
              <div className="confirmation-amounts">
                <div className="amount-from">
                  <div className="amount-label">You Send</div>
                  <div className="amount-value">{frozenConversionData.fromAmount.toFixed(8)}</div>
                  <div className="amount-currency">{fromCurrency}</div>
                </div>

                <div className="amount-to">
                  <div className="amount-label">You Receive</div>
                  <div className="amount-value" style={{ color: '#106cf5' }}>
                    {frozenConversionData.finalAmount.toFixed(8)}
                  </div>
                  <div className="amount-currency">{toCurrency}</div>
                </div>
              </div>

              {/* Exchange Rate - Important */}
              <div className="confirmation-rate">
                <span className="rate-label">Exchange Rate:</span>
                <span className="rate-value">
                  1 {fromCurrency} = {formatExchangeRate(frozenConversionData.rate)} {toCurrency}
                </span>
              </div>

              {/* Fee Information - Important */}
              <div className="confirmation-fee">
                <div className="fee-item">
                  <span className="fee-label">Network Fee:</span>
                  <span className="fee-value">{frozenConversionData.fee.toFixed(8)} {fromCurrency}</span>
                </div>
                <div className="fee-item">
                  <span className="fee-label">Total Cost:</span>
                  <span className="fee-value">
                    {(frozenConversionData.fromAmount + frozenConversionData.fee).toFixed(8)} {fromCurrency}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="confirmation-actions">
                <button
                  className="confirm-action-btn"
                  onClick={performConversion}
                  disabled={isConverting}
                >
                  {isConverting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-exchange-alt" />
                      Confirm Conversion
                    </>
                  )}
                </button>

                <button
                  className="cancel-action-btn"
                  onClick={() => setShowConfirmationModal(false)}
                  disabled={isConverting}
                >
                  <i className="fas fa-times" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Confirmation Modal - Simplified Styles */
        .confirmation-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 16px;
        }

        .confirmation-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 380px;
          overflow: hidden;
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header */
        .confirmation-header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          padding: 16px 20px;
        }

        .confirmation-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .confirmation-title {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .confirmation-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s;
        }

        .confirmation-close:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
        }

        .confirmation-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Body */
        .confirmation-body {
          padding: 20px;
        }

        /* Icon Section */
        .confirmation-icon-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .from-coin-icon, .to-coin-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #f0f2f5;
        }

        .coin-image-large {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .conversion-direction {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .direction-line {
          width: 15px;
          height: 2px;
          background: #e7eaee;
        }

        .direction-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #106cf5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }

        /* Amounts */
        .confirmation-amounts {
          margin: 20px 0;
        }

        .amount-from, .amount-to {
          margin: 15px 0;
          text-align: center;
        }

        .amount-label {
          font-size: 12px;
          color: #888f99;
          margin-bottom: 4px;
        }

        .amount-value {
          font-size: 24px;
          font-weight: 700;
          color: #222;
          line-height: 1.2;
        }

        .amount-currency {
          font-size: 14px;
          color: #555;
          margin-top: 4px;
        }

        /* Rate */
        .confirmation-rate {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 12px 16px;
          margin: 15px 0;
          text-align: center;
          border: 1px solid #e7eaee;
        }

        .rate-label {
          font-size: 12px;
          color: #888f99;
          margin-right: 8px;
        }

        .rate-value {
          font-size: 14px;
          font-weight: 600;
          color: #106cf5;
        }

        /* Fee */
        .confirmation-fee {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 16px;
          margin: 15px 0;
          border: 1px solid #e7eaee;
        }

        .fee-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e7eaee;
        }

        .fee-item:last-child {
          border-bottom: none;
        }

        .fee-label {
          font-size: 13px;
          color: #555;
        }

        .fee-value {
          font-size: 14px;
          font-weight: 600;
          color: #222;
        }

        /* Actions */
        .confirmation-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0 10px;
        }

        .confirm-action-btn {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border: none;
          border-radius: 12px;
          padding: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .confirm-action-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .confirm-action-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-action-btn {
          background: transparent;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 12px;
          color: #888f99;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .cancel-action-btn:hover:not(:disabled) {
          background: #f8f9fa;
          color: #222;
        }

        .cancel-action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Price Update Indicator */
        .price-update-indicator {
          color: #888f99;
          font-size: 10px;
          margin-left: 8px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .price-update-indicator i {
          font-size: 8px;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .confirmation-modal {
            max-width: 100%;
            border-radius: 16px;
          }

          .confirmation-header {
            padding: 14px 16px;
          }

          .confirmation-body {
            padding: 16px;
          }

          .from-coin-icon, .to-coin-icon {
            width: 50px;
            height: 50px;
          }

          .amount-value {
            font-size: 22px;
          }

          .confirmation-rate,
          .confirmation-fee {
            padding: 12px;
          }
        }

             
        /* Add these new styles to your existing CSS */
        
        .price-display {
          font-size: 12px;
          color: #888f99;
          text-align: center;
          margin: 10px 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .price-update-indicator {
          color: #2ff378;
          font-size: 8px;
          animation: pricePulse 2s infinite;
        }
        
        @keyframes pricePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .price-loading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #106cf5;
        }
        
        .realtime-indicator {
          text-align: center;
          color: #888f99;
          font-size: 11px;
          margin: 15px 0 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        
        .realtime-indicator i {
          color: #106cf5;
          font-size: 10px;
        }
        
        .item-price {
          font-size: 12px;
          font-weight: 600;
          color: #106cf5;
          margin-left: 10px;
          text-align: right;
          min-width: 80px;
        }
        
        /* Existing styles remain the same, just adding the new ones above */
        
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

        .container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
          padding: 15px 20px;
          color: white;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
        }

        .remove_blue {
          color: white;
          text-decoration: none;
        }

        .page-title {
          font-size: 18px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .header-icon {
          font-size: 16px;
          cursor: pointer;
        }

        /* Swap Container */
        .swap-container {
          padding: 20px;
          border-radius: 40px 40px 0 0;
          background: white;
          height: 100%;
          overflow-y: auto;
        }

        .swap-card {
          background: white;
          border-radius: 16px;
          margin-top: 10px;
        }

        /* Section Headers */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .available-balance {
          font-size: 12px;
          color: #999;
        }

        /* Custom Select Wrapper */
        .custom-select-wrapper {
          position: relative;
          margin-bottom: 12px;
          // z-index: 2;
        }

        /* Token Selector */
        .token-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          position: relative;
          z-index: 1;
        }

        .token-selector:hover {
          border-color: #106cf5;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.1);
        }

        .token-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .token-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
        }

        .coin-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .token-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .selector-arrow {
          color: #999;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .selector-arrow.rotated {
          transform: rotate(180deg);
        }

        /* Custom Dropdown */
        .custom-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          margin-top: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 10;
          max-height: 300px;
          overflow-y: auto;
        }

        .dropdown-header {
          padding: 15px 20px;
          border-bottom: 1px solid #e7eaee;
          background: #f8f9fa;
        }

        .dropdown-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .dropdown-count {
          font-size: 12px;
          color: #888f99;
        }

        .dropdown-list {
          padding: 8px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f5f5f5;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .dropdown-item.selected {
          background-color: #e6f0ff;
        }

        .item-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          flex-shrink: 0;
          background: #f8f9fa;
        }

        .item-info {
          flex: 1;
          min-width: 0;
        }

        .item-code {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .item-name {
          font-size: 12px;
          color: #888f99;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-balance {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-left: 10px;
        }

        /* Input Field */
        .input-group {
          position: relative;
          margin-bottom: 10px;
        }

        .input-field {
          width: 100%;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: white;
          font-size: 12px;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #106cf5;
        }

        .input-field::placeholder {
          color: #999;
        }

        .input-actions {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .token-symbol {
          font-size: 14px;
          color: #666;
        }

        .max-button {
          background: #e6f0ff;
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          color: #106cf5;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .max-button:hover {
          background: #d0e2ff;
        }

        /* Output Field */
        .output-field {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: #f8f9fa;
          font-size: 16px;
          color: #333;
          text-align: right;
        }

        /* Swap Button */
        .swap-direction {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }

        .swap-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .swap-button:hover {
          border-color: #106cf5;
          transform: rotate(180deg);
        }

        .swap-button i {
          color: #666;
          font-size: 16px;
        }


        /* Exchange Rate */
        .exchange-rate {
          text-align: center;
          margin: 20px 0;
          font-size: 14px;
          color: #666;
        }

        /* Confirm Button */
        .confirm-button {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border: none;
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }

        .confirm-button:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.3);
        }

        .confirm-button:disabled {
          background: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          transform: none;
        }

        /* Confirmation Modal Styles */
        .confirmation-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .confirmation-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e7eaee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 18px;
          color: #222;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: #888f99;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f8f9fa;
          color: #222;
        }

        .modal-body {
          padding: 20px;
        }

        .conversion-summary {
          text-align: center;
          margin-bottom: 30px;
        }

        .from-amount, .to-amount {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px;
          margin: 10px 0;
        }

        .from-amount .amount,
        .to-amount .amount {
          font-size: 24px;
          font-weight: 700;
          color: #222;
        }

        .from-amount .currency,
        .to-amount .currency {
          font-size: 14px;
          color: #888f99;
          margin-top: 4px;
        }

        .conversion-arrow {
          color: #106cf5;
          font-size: 16px;
        }

        .conversion-details {
          border-top: 1px solid #e7eaee;
          padding-top: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-row span:first-child {
          color: #888f99;
          font-size: 14px;
        }

        .detail-row span:last-child {
          color: #222;
          font-weight: 500;
          font-size: 14px;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e7eaee;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .confirm-btn {
          padding: 16px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #0a4fc4;
        }

        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-btn {
          padding: 16px;
          background: transparent;
          color: #888f99;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #f8f9fa;
          color: #222;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .container {
            padding: 0;
          }

          .header,
          .swap-container {
            padding-left: 16px;
            padding-right: 16px;
          }

          .swap-card {
            padding: 16px;
          }

          .confirmation-modal {
            max-width: 100%;
          }

          .token-icon {
            width: 28px;
            height: 28px;
          }

          .token-name {
            font-size: 13px;
          }

          .dropdown-item {
            padding: 10px 16px;
          }

          .item-price {
            font-size: 11px;
            min-width: 70px;
          }
        }


        /* Your existing styles for other components... */
      `}</style>
    </div>
  );
}

export default Conversion;
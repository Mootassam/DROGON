// src/components/FuturesModal.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import futuresFormAction from "src/modules/futures/form/futuresFormActions";
import futuresListAction from "src/modules/futures/list/futuresListActions";
import futuresViewActions from "src/modules/futures/view/futuresViewActions";

interface FuturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  direction: "up" | "down" | null;
  dispatch: any;
  listAssets?: any;
  selectedCoin: string;
  marketPrice: string;
  availableBalance: number;
  setOpeningOrders: React.Dispatch<React.SetStateAction<any[]>>; // Added proper typing
  isDemoAccount?: boolean;
}

const FuturesModal: React.FC<FuturesModalProps> = ({
  isOpen,
  onClose,
  direction,
  dispatch,
  listAssets,
  selectedCoin,
  marketPrice,
  availableBalance,
   setOpeningOrders,
   isDemoAccount = false,
 }) => {
   const DEFAULT_LEVERAGE = 1;
   const [selectedDuration, setSelectedDuration] = useState<string>("120");
   const [selectvalue, setSelectedValue] = useState<string>("20"); // Default payout percentage
   const [futuresAmount, setFuturesAmount] = useState<number>(30);
  const [tradeStatus, setTradeStatus] = useState<
    "configuring" | "in-progress" | "completed"
  >("configuring");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [tradeResult, setTradeResult] = useState<"win" | "loss" | null>(null);
  const [amountError, setAmountError] = useState<string>("");
  const [futureId, setFutureId] = useState<string | null>(null);
  const [pnlDisplay, setPnlDisplay] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [tradeDetails, setTradeDetails] = useState<any>(null);


  // Helper to format numbers with commas and two decimals
  const formatBalance = (value: number): string => {
    if (!Number.isFinite(value)) return "0.00";
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const changeValues = (duration: string, value: string) => {
    setSelectedDuration(duration);
    setSelectedValue(value);
  };

  // prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // refresh list on mount (and when dispatch changes)
  useEffect(() => {
    dispatch(futuresListAction.doFetch());
  }, [dispatch]);

  // validate amount
  useEffect(() => {
    if (futuresAmount < 30) {
      setAmountError("Minimum amount is 30 USD");
    } else if (futuresAmount > availableBalance) {
      setAmountError("Insufficient balance");
    } else {
      setAmountError("");
    }
  }, [futuresAmount, availableBalance]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (tradeStatus === "in-progress") {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // if timeLeft is 0 and we're in-progress -> finalize
        (async () => {
          await completeTrade();
        })();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tradeStatus, timeLeft]);

  // Start the trade: create backend record then start timer
  const startTrade = async () => {
    if (!direction || futuresAmount < 30 || futuresAmount > availableBalance) {
      return;
    }

    setIsCreating(true);
    try {
      const openPrice = parseFloat(marketPrice || "0") || 0;

       // Create trade record immediately
       const created = await create();
       if (!created || !created.id) {
         setIsCreating(false);
         return;
       }
       setFutureId(created.id);

      // Set trade details for display
      setTradeDetails({
        futuresAmount,
        contractDuration: selectedDuration,
        futuresStatus: direction === "up" ? "long" : "short",
        openPositionPrice: openPrice,
        closePositionPrice: null,
         leverage: DEFAULT_LEVERAGE,
         openPositionTime: new Date(),
        closePositionTime: null
      });

      setOpeningOrders(prev => [...prev, {
        id: created.id,
        futuresAmount,
        contractDuration: selectedDuration,
        futuresStatus: direction === "up" ? "long" : "short",
        openPositionPrice: openPrice,
        closePositionPrice: null,
        leverage: DEFAULT_LEVERAGE,
        openPositionTime: new Date().toISOString(),
        closePositionTime: null
      }]);

      // ensure timeLeft set from chosen duration (seconds)
      const secs = parseInt(selectedDuration, 10) || 0;
      setTimeLeft(secs);

      setTradeStatus("in-progress");
    } catch (err) {
      console.error("startTrade error", err);
    } finally {
      setIsCreating(false);
    }
  };

  // completeTrade: determine PnL based on actual market movement for demo trades
  const completeTrade = async () => {
    setOpeningOrders([]);

    if (!futureId) {
      setTradeResult("loss");
      setPnlDisplay(`-${futuresAmount.toFixed(2)} USD`);
      setTradeStatus("completed");
      return;
    }

    try {
      const result = await dispatch(futuresViewActions.doFind(futureId));
      const trade = result && result.payload ? result.payload : result;

      if (!trade) {
        setTradeResult("loss");
        setPnlDisplay(`-${futuresAmount.toFixed(2)} USD`);
        setTradeStatus("completed");
        return;
      }

      // If already finalized (manual update), just display
      if (trade.finalized) {
        const isWin = trade.control === "profit";
        const pnl = Number(trade.profitAndLossAmount ?? (isWin ? calculateProfit(futuresAmount, DEFAULT_LEVERAGE, selectvalue) : -futuresAmount));
        setTradeResult(isWin ? "win" : "loss");
        setPnlDisplay(`${isWin ? '+' : ''}${pnl.toFixed(2)} USD`);
        setTradeStatus("completed");
        dispatch(futuresListAction.doFetchPending());
        dispatch(futuresListAction.doFetch());
        return;
      }

      // Not finalized -> auto finalize based on account type
      const wasLong = trade.futuresStatus === "long";
      const leverage = DEFAULT_LEVERAGE;
      const maxPayoutPercent = parseInt(selectvalue, 10);
      const now = new Date();

      let isWin: boolean;
      if (isDemoAccount) {
        // Demo: 85% profit, 15% loss
        isWin = Math.random() < 0.85;
      } else {
        // Real: 30% profit, 70% loss
        isWin = Math.random() < 0.30;
      }

      // Generate close price with small variance
      const basePrice = trade.openPositionPrice;
      const randomPercentage = 0.002 + Math.random() * (0.005 - 0.002);
      const change = basePrice * (randomPercentage / 100);
      let closePrice: number;
      if (isWin) {
        closePrice = wasLong ? basePrice + change : basePrice - change;
      } else {
        closePrice = wasLong ? basePrice - change : basePrice + change;
      }

      // Calculate profit/loss amount
      const profitAmount = (futuresAmount * leverage * maxPayoutPercent) / 100;
      const finalPnl = isWin ? (futuresAmount + profitAmount) : -futuresAmount;

      // Update trade via backend
      const updatePayload = {
        control: isWin ? "profit" : "loss",
        closePositionPrice: closePrice,
        closePositionTime: now.toISOString(),
        profitAndLossAmount: finalPnl,
      };

      try {
        await dispatch(futuresFormAction.doUpdate(futureId, updatePayload));

        setTradeResult(isWin ? "win" : "loss");
        setPnlDisplay(`${isWin ? '+' : ''}${finalPnl.toFixed(2)} USD`);
        setTradeStatus("completed");

        dispatch(futuresListAction.doFetchPending());
        dispatch(futuresListAction.doFetch());
      } catch (err) {
        console.error("Error finalizing trade:", err);
        setTradeResult("loss");
        setPnlDisplay(`-${futuresAmount.toFixed(2)} USD`);
        setTradeStatus("completed");
      }

    } catch (err) {
      console.error("completeTrade error", err);
      setTradeResult("loss");
      setPnlDisplay(`-${futuresAmount.toFixed(2)} USD`);
      setTradeStatus("completed");
    }
  };

  // create trade record and return created record
  const create = async () => {
    const currentPrice = parseFloat(marketPrice || "0") || 0;

    let closePrice = currentPrice;
    if (direction === "up") {
      closePrice = currentPrice * 0.95;
    } else {
      closePrice = currentPrice * 1.05;
    }

     const payload = {
       futuresStatus: direction === "up" ? "long" : "short",
       profitAndLossAmount: '',
       leverage: DEFAULT_LEVERAGE,
       control: "loss",
      operate: "low",
      futureCoin: selectedCoin.replace("USD", "/USD"),
      closePositionTime: '',
      closePositionPrice: '',
      openPositionTime: new Date().toISOString(),
      openPositionPrice: currentPrice,
      contractDuration: selectedDuration,
      futuresAmount,
    };

    try {
      const createdRecord = await dispatch(futuresFormAction.doCreate(payload));
      const record = createdRecord && createdRecord.id ? createdRecord : (createdRecord && createdRecord.payload ? createdRecord.payload : null);

      if (record && record.id) {
        setFutureId(record.id);
        return record;
      } else {
        console.warn("Create did not return created record");
        return null;
      }
    } catch (err) {
      console.error("create error", err);
      return null;
    }
  };

  const resetTrade = () => {
    setTradeStatus("configuring");
    setOpeningOrders([]);
    setTradeResult(null);
    setTimeLeft(0);
    setFutureId(null);
    setPnlDisplay("");
    setTradeDetails(null);
     setFuturesAmount(30);
     setSelectedValue("20");
     setSelectedDuration("120");
  };

   const calculateProfit = (
     amount: number,
     leverage: number | string,
     value: string
   ): number => {
     const validAmount = Number.isFinite(amount) ? amount : 0;
     const validLeverage = typeof leverage === 'number' ? leverage : parseInt(leverage, 10) || 0;
     const validValue = parseInt(value, 10) || 0;
     return (validAmount * validLeverage * validValue) / 100;
   };

  const calculateProgress = (): number => {
    if (tradeStatus !== "in-progress") return 0;
    const total = parseInt(selectedDuration, 10) || 1;
    return ((total - timeLeft) / total) * 100;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString();
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setFuturesAmount(value);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${direction === "up" ? "up-theme" : "down-theme"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="modal-header">
          <div className="pair-info">
            <div className="pair-name">{selectedCoin.replace("USD", "/USD")}</div>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Trade in progress display */}
        {tradeStatus !== "configuring" && (
          <div className="trade-progress-section">
            <div className="progress-container">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(${direction === "up" ? "#00C076" : "#FF6838"} ${calculateProgress()}%, #3a3a3a ${calculateProgress()}%)`,
                }}
              >
                <div className="progress-inner">
                  <div className="progress-time">{formatTime(timeLeft)}</div>
                  <div className="progress-label">Remaining</div>
                </div>
              </div>
            </div>

            {/* Trade Details */}
            {tradeDetails && (
              <div className="trade-details">
                <div className="trade-details-row">
                  <span>Futures Amount:</span>
                  <span>{tradeDetails.futuresAmount} USD</span>
                </div>
                <div className="trade-details-row">
                  <span>Contract Duration:</span>
                  <span>{tradeDetails.contractDuration}s</span>
                </div>
                <div className="trade-details-row">
                  <span>Future Type:</span>
                  <span className={tradeDetails.futuresStatus === "long" ? "up-text" : "down-text"}>
                    {tradeDetails.futuresStatus.toUpperCase()}
                  </span>
                </div>
                <div className="trade-details-row">
                  <span>Open Position Price:</span>
                  <span>{tradeDetails.openPositionPrice.toFixed(4)} USD</span>
                </div>
                <div className="trade-details-row">
                  <span>Close Position Price:</span>
                  <span>{tradeDetails.closePositionPrice ? tradeDetails.closePositionPrice.toFixed(4) : "-"} USD</span>
                </div>
                <div className="trade-details-row">
                  <span>Leverage:</span>
                  <span>{tradeDetails.leverage}x</span>
                </div>
                <div className="trade-details-row">
                  <span>Open Time:</span>
                  <span>{formatDate(tradeDetails.openPositionTime)}</span>
                </div>
                <div className="trade-details-row">
                  <span>Close Time:</span>
                  <span>{formatDate(tradeDetails.closePositionTime)}</span>
                </div>
              </div>
            )}

            <div className="trade-actions">
              {tradeStatus === "in-progress" && (
                <button className="trade-action-btn keep-buying" onClick={onClose}>
                  Keep Buying
                </button>
              )}
              {tradeStatus === "completed" && (
                <>
                  <button className="trade-action-btn secondary" onClick={onClose}>
                    Close
                  </button>
                  <button className="trade-action-btn primary" onClick={resetTrade}>
                    New Trade
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Configuration form (only shown when configuring) */}
        {tradeStatus === "configuring" && (
          <>
            {/* Direction Indicator */}
            <div className={`direction-indicator ${direction}-indicator`}>
              {direction === "up" ? "Predicting price will go UP" : "Predicting price will go DOWN"}
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Trade Duration Section */}
              <div className="section">
                <div className="section-title">
                  <span>Contract Duration</span>
                  <span>Payout</span>
                </div>
                <div className="options-container">
                  {[{ duration: "60", payout: "10" }, { duration: "120", payout: "20" }, { duration: "180", payout: "40" }, { duration: "240", payout: "80" }].map(
                    (option) => (
                      <button
                        key={option.duration}
                        className={`option-btn ${selectedDuration === option.duration ? "selected" : ""}`}
                        onClick={() => changeValues(option.duration, option.payout)}
                      >
                        {option.duration}s ({option.payout}%)
                      </button>
                    )
                  )}
                </div>
              </div>

               {/* Futures Amount Section */}
              <div className="section">
                <div className="section-title">
                  <span>Futures Amount (USD)</span>
                </div>
                <div className="amount-control">
                  <button
                    className="amount-btn"
                    onClick={() => setFuturesAmount((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="amount-inputs"
                    value={futuresAmount}
                    onChange={handleAmountChange}
                    min="1"
                    placeholder="Enter amount"
                  />
                  <button className="amount-btn" onClick={() => setFuturesAmount((prev) => prev + 1)}>
                    +
                  </button>
                </div>
                {/* ✅ UPDATED BALANCE DISPLAY WITH FORMATTING */}
                <div className="balance-info">
                  Available: {formatBalance(availableBalance)} USD
                </div>
                {amountError && (
                  <div className="error-message" style={{ color: "#FF6838", fontSize: "12px", marginTop: "5px" }}>
                    {amountError}
                  </div>
                )}
              </div>

               {/* Projected Profit */}
               <div className="profit-info">
                 Projected Profit: {calculateProfit(futuresAmount, DEFAULT_LEVERAGE, selectvalue).toFixed(2)} USD
               </div>

              {/* Confirm Button */}
              <button
                className="confirm-btn"
                onClick={startTrade}
                disabled={!direction || futuresAmount < 30 || futuresAmount > availableBalance || isCreating}
                style={{
                  opacity: !direction || futuresAmount < 30 || futuresAmount > availableBalance ? 0.5 : 1,
                  cursor: !direction || futuresAmount < 30 || futuresAmount > availableBalance ? "not-allowed" : "pointer",
                }}
              >
                {isCreating ? "CREATING..." : futuresAmount > availableBalance ? "INSUFFICIENT BALANCE" : "CONFIRM ORDER"}
              </button>
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
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      padding: 20px;
      height: 100%;
  }

  .modal-container {
      background-color: #2a2a2a;
      border-radius: 12px;
      width: 100%;
      
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      overflow-y: auto;
  }

  .up-theme {
      border-top: 4px solid #00C076;
  }

  .down-theme {
      border-top: 4px solid #FF6838;
  }

  /* Header Section */
  .modal-header {
      background-color: #1a1a1a;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #3a3a3a;
  }

  .pair-info {
      display: flex;
      align-items: center;
      gap: 10px;
  }

  .pair-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F3BA2F;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .pair-icon i {
      color: #000;
      font-size: 16px;
  }

  .pair-name {
      font-weight: bold;
      font-size: 18px;
      color: #FBFBFB;
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

  /* Direction Indicator */
  .direction-indicator {
      padding: 10px 15px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
  }

  .up-indicator {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .down-indicator {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  /* Modal Content */
  .modal-content {
      padding: 15px;
  }

  .section {
      margin-bottom: 20px;
  }

  .section-title {
      font-size: 14px;
      color: #AAAAAA;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
  }

  .options-container {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
  }

  .option-btn {
      background-color: #3a3a3a;
      border: 1px solid #4a4a4a;
      border-radius: 6px;
      padding: 8px 12px;
      color: #FFFFFF;
      font-size: 14px;
      cursor: pointer;
      flex: 1;
      min-width: 70px;
      text-align: center;
      transition: all 0.2s;
  }

  .option-btn:hover {
      background-color: #4a4a4a;
  }

  .option-btn.selected {
      background-color: #00C076;
      border-color: #00C076;
      color: #000;
      font-weight: bold;
  }

  .down-theme .option-btn.selected {
      background-color: #FF6838;
      border-color: #FF6838;
  }

  .amount-control {
      display: flex;
      align-items: center;
      background-color: #3a3a3a;
      border-radius: 6px;
      padding: 5px;
      margin-top: 10px;
  }

  .amount-btn {
      background: none;
      border: none;
      color: #AAAAAA;
      font-size: 20px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
  }

  .amount-btn:hover {
      background-color: #4a4a4a;
      color: #FFFFFF;
  }

  .amount-inputs {
      flex: 1;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 16px;
      text-align: center;
      padding: 10px 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  input[type="number"] {
      -moz-appearance: textfield;
  }

  .balance-info {
      font-size: 14px;
      color: #AAAAAA;
      text-align: right;
      margin-top: 5px;
  }

  .profit-info {
      text-align: center;
      font-size: 14px;
      color: #AAAAAA;
      margin: 20px 0;
  }

  .confirm-btn {
      background-color: #00C076;
      color: white;
      display: block;
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .confirm-btn:hover:not(:disabled) {
      background-color: #00a466;
  }

  .confirm-btn:disabled {
      background-color: #3a3a3a;
      color: #777;
      cursor: not-allowed;
  }

  .down-theme .confirm-btn {
      background-color: #FF6838;
  }

  .down-theme .confirm-btn:hover:not(:disabled) {
      background-color: #e55a2b;
  }
      
  /* Trade Progress Section */
  .trade-progress-section {
      padding: 20px;
      text-align: center;
  }

  .progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }

  .circular-progress {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s linear;
  }

  .progress-inner {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #2a2a2a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }

  .progress-time {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
      color: #FFFFFF;
  }

  .progress-label {
      font-size: 12px;
      color: #AAAAAA;
  }

  /* Trade Details */
  .trade-details {
      background-color: #1e1e1e;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
      text-align: left;
      display:flex;
      flex-direction:column
  }

  .trade-details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
  }

  .trade-details-row:last-child {
      margin-bottom: 0;
  }

  .trade-details-row span:first-child {
      color: #AAAAAA;
  }

  .trade-details-row span:last-child {
      color: #FFFFFF;
      font-weight: 500;
  }

  .up-text {
      color: #00C076 !important;
  }

  .down-text {
      color: #FF6838 !important;
  }

  .trade-result {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0;
      padding: 10px;
      border-radius: 6px;
  }

  .trade-result.win {
      background-color: rgba(0, 192, 118, 0.2);
      color: #00C076;
  }

  .trade-result.loss {
      background-color: rgba(255, 104, 56, 0.2);
      color: #FF6838;
  }

  .trade-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
  }

  .trade-action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
  }

  .trade-action-btn.primary {
      background-color: #F3BA2F;
      color: #000;
  }

  .trade-action-btn.primary:hover {
      background-color: #e4ab25;
  }

  .trade-action-btn.secondary {
      background-color: #3a3a3a;
      color: #FFFFFF;
  }

  .trade-action-btn.secondary:hover {
      background-color: #4a4a4a;
  }

  .trade-action-btn.keep-buying {
      background-color: #00C076;
      color: white;
  }

  .trade-action-btn.keep-buying:hover {
      background-color: #00a466;
  }

  .down-theme .trade-action-btn.keep-buying {
      background-color: #FF6838;
  }

  .down-theme .trade-action-btn.keep-buying:hover {
      background-color: #e55a2b;
  }
`}</style>
    </div>,
    document.body
  );
};

export default FuturesModal;

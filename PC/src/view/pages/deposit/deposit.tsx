
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import method from "src/modules/depositMethod/list/depositMethodListActions";
import selectors from "src/modules/depositMethod/list/depositMethodSelectors";
import depositActions from "src/modules/deposit/form/depositFormActions";
import FieldFormItem from "src/shared/form/FieldFormItem";

// Currency configurations
const CURRENCIES = [
  "USDT", "ETH", "BTC", "USDC", "DAI",
  "SHIB", "XRP", "TRX", "SOL", "BNB", "DOGE"
];

// Minimum deposit in USD
const MIN_DEPOSIT_USD = 200;

// Decimal places for each currency
const CURRENCY_DECIMALS = {
  USDT: 2,
  ETH: 6,
  BTC: 8,
  USDC: 2,
  DAI: 2,
  SHIB: 0,
  XRP: 2,
  TRX: 2,
  SOL: 4,
  BNB: 6,
  DOGE: 2,
};

interface CurrencyType {
  _id?: string;
  name?: string;
  symbol?: string;
  network?: any[];
  address?: string;
  minDeposit?: number;
  minimumAmount?: number;
  [key: string]: any;
}

// Helper to format numbers consistently - MOVED TO TOP LEVEL
const formatNumberHelper = (value: number, symbol?: string, decimals?: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "0";
  }
  
  const decimalPlaces = decimals !== undefined ? decimals : (CURRENCY_DECIMALS[symbol?.toUpperCase()] || 2);
  
  // For very small numbers, show more precision but not scientific notation
  if (value > 0 && value < 0.000001) {
    return value.toFixed(decimalPlaces > 8 ? decimalPlaces : 8);
  }
  
  // For regular numbers
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

// Helper to format USD values - MOVED TO TOP LEVEL
const formatUSDHelper = (value: number) => {
  if (typeof value !== "number" || !isFinite(value) || value === 0) {
    return "$0.00";
  }
  
  // For very small USD values, show more precision
  if (value > 0 && value < 0.01) {
    return `$${value.toFixed(6)}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(value);
};

function Deposit() {
  const dispatch = useDispatch();
  const params = useParams();
  const symbol = (params?.id || "").toString();

  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  const [showToast, setShowToast] = useState(false);
  const [copiedText, setCopiedText] = useState("Address copied");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [loadingRates, setLoadingRates] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType | null>(null);
  const [networkOptions, setNetworkOptions] = useState<Array<{ _id: string; name: string; wallet: string; raw: any }>>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [minDepositAmount, setMinDepositAmount] = useState(0);
  const [submittedAmount, setSubmittedAmount] = useState("");

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setLoadingRates(true);
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/pricemulti",
          {
            params: {
              fsyms: CURRENCIES.join(","),
              tsyms: "USD",
            },
          }
        );
        
        if (response.data && response.data.Response !== "Error") {
          const rates: Record<string, number> = {};
          CURRENCIES.forEach(currency => {
            if (response.data[currency]?.USD) {
              rates[currency] = response.data[currency].USD;
            }
          });
          setExchangeRates(rates);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setLoadingRates(false);
      }
    };

    fetchExchangeRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate minimum deposit in selected currency
  const minInCurrency = useMemo(() => {
    if (!symbol || !exchangeRates[symbol.toUpperCase()]) return 0;
    const rate = exchangeRates[symbol.toUpperCase()];
    return MIN_DEPOSIT_USD / rate;
  }, [symbol, exchangeRates]);

  // Format minimum amount for display
  const formattedMinAmount = useMemo(() => {
    if (minInCurrency === 0) return "0";
    return formatNumberHelper(minInCurrency, symbol);
  }, [minInCurrency, symbol]);

  // Dynamic validation schema based on minInCurrency - FIXED: Use formattedMinAmount directly
  const schema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required")
        .min(minInCurrency || 0, `Minimum deposit is ${formattedMinAmount} ${symbol}`),
      txid: yup.string().required("Transaction ID is required"),
    });
  }, [minInCurrency, formattedMinAmount, symbol]);

  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      txid: "",
    },
  });

  // Memoized version of formatNumber for component use
  const formatNumber = useCallback((value: number, decimals?: number) => {
    return formatNumberHelper(value, symbol, decimals);
  }, [symbol]);

  // Memoized version of formatUSD for component use
  const formatUSD = useCallback((value: number) => {
    return formatUSDHelper(value);
  }, []);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // When listMethod or symbol changes, find currency and setup network options
  useEffect(() => {
    if (!listMethod || !symbol) {
      return;
    }

    // Find currency by symbol (case-insensitive)
    const currency = listMethod.find((item) => {
      if (!item || !item.symbol) return false;
      return item.symbol.toString().toLowerCase() === symbol.toString().toLowerCase();
    });

    if (!currency) {
      // No matching currency found
      setCurrentCurrency(null);
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
      return;
    }

    setCurrentCurrency(currency);

    // Update min deposit amount
    setMinDepositAmount(minInCurrency);

    // Normalize networks
    if (Array.isArray(currency.network) && currency.network.length > 0) {
      const normalized = currency.network.map((n, idx) => ({
        _id: n._id ?? `${currency._id ?? symbol}-network-${idx}`,
        name: n.name ?? n.network ?? `${currency.name ?? symbol} Network`,
        wallet: n.wallet ?? n.address ?? n.depositAddress ?? "",
        raw: n,
      }));
      setNetworkOptions(normalized);

      // default to first network's id (or keep the current selectedNetwork if it exists in normalized)
      const defaultNet = normalized.find(n => n._id === selectedNetwork) || normalized[0];
      setSelectedNetwork(defaultNet._id);
      setCurrentAddress(defaultNet.wallet || "");
    } else if (currency.address) {
      // Currency has a direct address (no separate networks)
      const single = {
        _id: currency._id ?? `${symbol}-single`,
        name: `${currency.name ?? symbol} Network`,
        wallet: currency.address,
        raw: null,
      };
      setNetworkOptions([single]);
      setSelectedNetwork(single._id);
      setCurrentAddress(single.wallet || "");
    } else {
      // No networks and no direct address
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
    }
  }, [listMethod, symbol, minInCurrency]);

  // Update currentAddress when selectedNetwork changes
  useEffect(() => {
    if (!selectedNetwork) {
      return;
    }
    const found = networkOptions.find((n) => n._id === selectedNetwork);
    if (found) {
      setCurrentAddress(found.wallet || "");
    }
  }, [selectedNetwork, networkOptions]);

  // Copy address to clipboard with feedback
  const copyAddressToClipboard = useCallback(async () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(currentAddress);
      setCopiedText("Address copied");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy address: ", err);
      setCopiedText("Failed to copy address");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [currentAddress]);

  // Save QR code as PNG
  const saveQRCode = useCallback(() => {
    const canvas = document.querySelector(".qr-box canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("QR canvas not found");
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      const link = document.createElement("a");
      const networkNameSafe = (networkOptions.find(n => n._id === selectedNetwork)?.name || "deposit").replace(/\s+/g, "-");
      link.download = `${symbol}-${networkNameSafe}-address.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCopiedText("QR code saved");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to save QR code", err);
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [networkOptions, selectedNetwork, symbol]);

  // Handle network selection change
  const handleNetworkSelect = useCallback((event) => {
    const networkId = event.target.value;
    setSelectedNetwork(networkId);
    // clear amount to avoid mismatched validation if min changes
    formMethods.setValue("amount", "");
    formMethods.clearErrors("amount");
  }, [formMethods]);

  // Handle form submit
  const onSubmit = useCallback(async (data) => {
    if (!selectedNetwork || !currentCurrency || !currentAddress) {
      console.error("Missing required information");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
      const orderno = `RE${year}${month}${day}${randomDigits}`;
      const depositData = {
        orderno,
        amount: data.amount,
        txid: data.txid,
        rechargechannel: symbol,
        status: "pending",
        network: selectedNetwork,
        rechargetime: now.toISOString()
      };

      setSubmittedAmount(data.amount);

      await dispatch(depositActions.doCreate(depositData));

      setShowSuccessModal(true);
      formMethods.reset();
    } catch (error) {
      console.error("Deposit submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedNetwork, currentCurrency, currentAddress, symbol, dispatch, formMethods]);

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
    setSubmittedAmount("");
  }, []);

  // Get currency icon URL
  const getCurrencyIcon = useCallback((sym: string) => {
    const cleanSymbol = sym ? sym.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  }, []);

  // Calculate USD value of entered amount
  const enteredAmount = formMethods.watch("amount");
  const enteredAmountUSD = useMemo(() => {
    if (!enteredAmount || !exchangeRates[symbol?.toUpperCase()]) return 0;
    const amountNum = Number(enteredAmount);
    if (isNaN(amountNum) || !isFinite(amountNum)) return 0;
    return amountNum * exchangeRates[symbol.toUpperCase()];
  }, [enteredAmount, symbol, exchangeRates]);

  return (
    <div className="deposit-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/deposit" className="back-arrow" aria-label="Back to deposits">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Deposit {symbol || "..."}</div>
        </div>
      </div>

      {/* Content */}
      <div className="content-card">
        <div className="deposit-content">
          {/* Minimum deposit requirement */}
          {symbol && exchangeRates[symbol.toUpperCase()] && (
            <div className="info-box">
              <div className="info-row">
                <span className="info-label">Minimum deposit:</span>
                <span className="info-value">
                  {formattedMinAmount} {symbol} ({formatUSD(MIN_DEPOSIT_USD)})
                </span>
              </div>
              {loadingRates && (
                <div className="rate-loading">
                  <i className="fas fa-spinner fa-spin" /> Loading rates...
                </div>
              )}
            </div>
          )}

          {/* Currency display */}
          <div className="section">
            <div className="section-label">Deposit currency</div>
            <div className="currency-display">
              <div className="currency-icon" aria-hidden>
                <img
                  src={getCurrencyIcon(symbol)}
                  alt={symbol}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      parent.textContent = (symbol && symbol.charAt(0)) || "C";
                      parent.style.background = "#f0f0f0";
                      parent.style.color = "#333";
                      parent.style.fontSize = "12px";
                      parent.style.fontWeight = "bold";
                      parent.style.display = "inline-flex";
                      parent.style.alignItems = "center";
                      parent.style.justifyContent = "center";
                      parent.style.width = "36px";
                      parent.style.height = "36px";
                      parent.style.borderRadius = "6px";
                    }
                  }}
                />
              </div>
              <div className="currency-details">
                <div className="currency-name">{currentCurrency?.name || symbol}</div>
                {exchangeRates[symbol?.toUpperCase()] && (
                  <div className="currency-rate">
                    1 {symbol} ≈ {formatUSD(exchangeRates[symbol.toUpperCase()])}
                  </div>
                )}
              </div>
            </div>
            <div className="section-note">Fixed currency - cannot be changed</div>
          </div>

          {/* Network select */}
          {networkOptions.length > 0 && (
            <div className="section">
              <div className="section-label">Deposit network</div>
              <div className="network-select-wrapper">
                <select
                  className="network-select"
                  value={selectedNetwork || ""}
                  onChange={handleNetworkSelect}
                  aria-label="Select deposit network"
                >
                  {networkOptions.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <i className="fas fa-chevron-down" />
                </div>
              </div>
            </div>
          )}

          {/* QR code & address */}
          {currentAddress && (
            <div className="qr-section">
              <div className="section-label">Save QR code</div>
              <div className="qr-container">
                <div className="qr-box" aria-hidden>
                  <QRCodeCanvas
                    value={currentAddress}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="address-section">
                  <div className="address-label">Wallet Address</div>
                  <div className="address-text" id="walletAddress">
                    {currentAddress}
                  </div>
                  <div className="address-actions">
                    <button
                      type="button"
                      className="action-btn copy-btn"
                      onClick={copyAddressToClipboard}
                      aria-label="Copy address"
                    >
                      <i className="fas fa-copy" /> Copy Address
                    </button>
                    <button
                      type="button"
                      className="action-btn save-btn"
                      onClick={saveQRCode}
                      aria-label="Save QR code"
                    >
                      <i className="fas fa-download" /> Save QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposit form */}
          {currentAddress && (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="deposit-form">
                <div className="section">
                  <div className="form-group">
                    <div className="input-with-usd">
                      <FieldFormItem
                        name="amount"
                        label={`Amount (${symbol})`}
                        placeholder={`Minimum: ${formattedMinAmount} ${symbol}`}
                        className="form-input"
                      />
                      {enteredAmountUSD > 0 && (
                        <div className="usd-value-display">
                          ≈ {formatUSD(enteredAmountUSD)}
                        </div>
                      )}
                    </div>
                    <div className="min-amount-note">
                      Minimum deposit: {formattedMinAmount} {symbol} ({formatUSD(MIN_DEPOSIT_USD)})
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="form-group">
                    <FieldFormItem
                      name="txid"
                      label="Transaction ID"
                      placeholder="Enter your transaction ID"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                    aria-disabled={!formMethods.formState.isValid || isSubmitting || loadingRates}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Processing...
                      </>
                    ) : loadingRates ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Loading rates...
                      </>
                    ) : (
                      "Confirm Deposit"
                    )}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-section" role="status" aria-live="polite">
              <div className="spinner" />
              <div>Loading deposit information...</div>
            </div>
          )}

          {/* No address found */}
          {!loading && !currentAddress && symbol && (
            <div className="error-section" role="alert">
              <i className="fas fa-exclamation-triangle" />
              <div>No deposit address found for {symbol}</div>
              <div className="error-note">Please contact support or try another currency.</div>
            </div>
          )}

          {/* Hint Section */}
          <div className="hint-section">
            <div className="hint-title">Important Notes</div>
            <div className="hint-content">
              <div className="hint-item">
                1. Send only {symbol} to this deposit address. Sending other currencies may result in permanent loss.
              </div>
              <div className="hint-item">2. Ensure you are using the correct network ({networkOptions.find(n => n._id === selectedNetwork)?.name}).</div>
              <div className="hint-item">
                3. Minimum deposit amount: {formattedMinAmount} {symbol} (${MIN_DEPOSIT_USD} USD equivalent)
              </div>
              <div className="hint-item">4. Transactions typically require 1-3 network confirmations before being credited to your account.</div>
              <div className="hint-item">5. Always double-check the address before sending funds.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? "visible" : ""}`} role="status" aria-live="polite">
        <i className="fas fa-check-circle toast-icon" />
        {copiedText}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Deposit Under Review</h3>
              <button className="modal-close" onClick={handleCloseModal} aria-label="Close">
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon"><i className="fas fa-hourglass-half" /></div>
              <div className="success-message">
                Your deposit of {submittedAmount} {symbol} has been submitted and is now under review.
              </div>
              <div className="success-details">
                <p>Our team will verify your transaction and confirm it shortly.</p>
                <p>You can track the status in your transaction history.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}

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

        .deposit-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
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

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .deposit-content {
          width: 100%;
        }

        /* Info Box */
        .info-box {
          background: #e8f4ff;
          border: 1px solid #b6d9ff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .info-label {
          font-size: 12px;
          color: #106cf5;
          font-weight: 500;
        }

        .info-value {
          font-size: 12px;
          font-weight: 600;
          color: #222;
        }

        .rate-loading {
          font-size: 11px;
          color: #666;
          text-align: center;
          margin-top: 4px;
        }

        .rate-loading .fa-spin {
          margin-right: 6px;
        }

        .section {
          margin-bottom: 14px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          margin-bottom: 8px;
        }

        .currency-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          overflow: hidden;
          flex-shrink: 0;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-details {
          flex: 1;
        }

        .currency-name {
          font-size: 13px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .currency-rate {
          font-size: 11px;
          color: #666;
        }

        .section-note {
          font-size: 12px;
          color: #666;
          font-style: italic;
        }

        .network-select-wrapper {
          position: relative;
        }

        .network-select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .network-select:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        .qr-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .qr-box {
          display: flex;
          justify-content: center;
          padding: 10px;
          background: white;
          border-radius: 8px;
        }

        .qr-box canvas {
          border-radius: 8px;
        }

        .address-section {
          text-align: center;
        }

        .address-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 12px;
        }

        .address-text {
          font-size: 13px;
          color: #333;
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          word-break: break-all;
          font-family: monospace;
          line-height: 1.4;
        }

        .address-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .action-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .copy-btn {
          background: #106cf5;
          color: white;
        }

        .copy-btn:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .save-btn {
          background: white;
          color: #106cf5;
          border: 1px solid #106cf5;
        }

        .save-btn:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        .deposit-form {
          margin-top: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .input-with-usd {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .usd-value-display {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #666;
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .error-message {
          color: #ff4757;
          font-size: 12px;
          margin-top: 4px;
        }

        .min-amount-note {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
          font-style: italic;
        }

        .form-actions {
          margin-top: 24px;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }

        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-overlay {
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
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 90%;
          
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #222;
        }

        .modal-close {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #ff4757;
        }

        .modal-body {
          padding: 30px 20px;
          text-align: center;
        }

        .success-icon {
          font-size: 60px;
          color: #f5a623;
          margin-bottom: 20px;
        }

        .success-message {
          font-size: 16px;
          color: #222;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .success-details {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .success-details p {
          margin: 10px 0;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .modal-btn {
          width: 100%;
          padding: 14px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .modal-btn:hover {
          background: #0a4fc4;
        }

        .loading-section {
          text-align: center;
          padding: 40px 0;
          color: #666;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #106cf5;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-section {
          text-align: center;
          padding: 40px 20px;
          color: #ff4757;
        }

        .error-section i {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .error-note {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

        .hint-section {
          margin-top: 24px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .hint-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .hint-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hint-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
          position: relative;
          padding-left: 12px;
        }

        .hint-item::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #106cf5;
          font-weight: bold;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .toast.visible {
          transform: translateX(-50%) translateY(0);
        }

        .toast-icon {
          color: #4CAF50;
        }

        @media (max-width: 380px) {
          .deposit-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-display {
            padding: 12px;
          }

          .currency-icon {
            width: 36px;
            height: 36px;
          }

          .currency-name {
            font-size: 15px;
          }

          .network-select {
            padding: 12px 14px;
            font-size: 14px;
          }

          .qr-container {
            padding: 20px;
          }

          .qr-box canvas {
            width: 160px;
            height: 160px;
          }

          .address-text {
            font-size: 12px;
            padding: 10px;
          }

          .address-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .form-input {
            padding: 12px 14px;
            font-size: 14px;
          }

          .submit-btn {
            padding: 14px;
            font-size: 15px;
          }

          .hint-section {
            padding: 16px;
          }

          .hint-title {
            font-size: 13px;
          }

          .hint-item {
            font-size: 9px;
          }

          .modal-content {
            width: 95%;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .deposit-content {
            max-width: 500px;
            margin: 0 auto;
          }

          .address-actions {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}

export default Deposit;

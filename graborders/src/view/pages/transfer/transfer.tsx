import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
import actions from 'src/modules/assets/form/assetsFormActions';
import selectors from 'src/modules/assets/form/assetsFormSelectors';
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { useDispatch, useSelector } from 'react-redux';
import assetsListActions from 'src/modules/assets/list/assetsListActions';

function Transfer() {
    const dispatch = useDispatch();
    const loading = useSelector(selectors.selectSaveLoading);
    const record = useSelector(selectors.selectRecord);
    const listAssets = useSelector(assetsListSelectors.selectRows);

    // State for transfer
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [showCurrencyModal, setShowCurrencyModal] = useState(false);
    const [fromAccount, setFromAccount] = useState("exchange");
    const [toAccount, setToAccount] = useState("trade");
    const [amount, setAmount] = useState("");
    const [availableBalance, setAvailableBalance] = useState(0);
    const [showAccountDropdown, setShowAccountDropdown] = useState({
        from: false,
        to: false
    });

    // Refs for click outside
    const fromAccountRef = useRef<HTMLDivElement>(null);
    const toAccountRef = useRef<HTMLDivElement>(null);

    // List of allowed coins (same as conversion page)
    const allowedCoins = [
        { code: "USD", name: "Tether USD", color: "#26A17B", symbol: "USD" },
        { code: "ETH", name: "Ethereum", color: "#627EEA", symbol: "ETH" },
        { code: "BTC", name: "Bitcoin", color: "#F7931A", symbol: "BTC" },
        { code: "USDC", name: "USD Coin", color: "#2775CA", symbol: "USDC" },
        { code: "DAI", name: "Dai", color: "#F4B731", symbol: "DAI" },
        { code: "SHIB", name: "Shiba Inu", color: "#FFC107", symbol: "SHIB" },
        { code: "XRP", name: "Ripple", color: "#23292F", symbol: "XRP" },
        { code: "TRX", name: "TRON", color: "#FF001A", symbol: "TRX" },
        { code: "SOL", name: "Solana", color: "#00FFA3", symbol: "SOL" },
        { code: "BNB", name: "Binance Coin", color: "#F0B90B", symbol: "BNB" },
        { code: "DOGE", name: "Dogecoin", color: "#C2A633", symbol: "DOGE" }
    ];

    // Account types
    const accountTypes = [
        { code: "exchange", name: "Exchange" },
        { code: "trade", name: "Trade" },
        { code: "perpetual", name: "Perpetual" }
    ];

    const doTransfer = (values) => {
        dispatch(actions.doTransfer(values));
    };

    // Fetch assets
    useEffect(() => {
        let isMounted = true;
        const fetchAssets = async () => {
            try {
                await dispatch(assetsListActions.doFetch());
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching assets:", error);
                }
            }
        };
        fetchAssets();
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    // Calculate available balance based on selected currency and fromAccount
    useEffect(() => {
        if (listAssets && listAssets.length > 0) {
            // Find the wallet for selected currency and fromAccount
            const wallet = listAssets.find(item =>
                item.symbol === selectedCurrency &&
                item.accountType === fromAccount
            );

            if (wallet) {
                setAvailableBalance(wallet.amount || 0);
            } else {
                setAvailableBalance(0);
            }
        } else {
            setAvailableBalance(0);
        }
    }, [listAssets, selectedCurrency, fromAccount]);

    // Handle click outside account dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fromAccountRef.current && !fromAccountRef.current.contains(event.target)) {
                setShowAccountDropdown(prev => ({ ...prev, from: false }));
            }
            if (toAccountRef.current && !toAccountRef.current.contains(event.target)) {
                setShowAccountDropdown(prev => ({ ...prev, to: false }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle currency selection
    const handleCurrencySelect = (currencyCode) => {
        setSelectedCurrency(currencyCode);
        setShowCurrencyModal(false);
        setAmount(""); // Reset amount when currency changes
    };

    // Handle account selection
    const handleAccountSelect = (account, type) => {
        if (type === 'from') {
            setFromAccount(account);
            // Prevent selecting same account for from and to
            if (account === toAccount) {
                setToAccount(account === 'exchange' ? 'trade' : 'exchange');
            }
        } else {
            setToAccount(account);
            // Prevent selecting same account for from and to
            if (account === fromAccount) {
                setFromAccount(account === 'exchange' ? 'trade' : 'exchange');
            }
        }
        setShowAccountDropdown(prev => ({ ...prev, [type]: false }));
    };

    // Handle amount input
    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and one decimal point
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    // Handle max amount
    const handleMaxAmount = () => {
        setAmount(availableBalance.toString());
    };

    // Handle swap accounts
    const handleSwapAccounts = () => {
        const temp = fromAccount;
        setFromAccount(toAccount);
        setToAccount(temp);
    };

    // Handle transfer submission
    const handleTransfer = () => {
        const transferAmount = parseFloat(amount);

        if (!transferAmount || transferAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (transferAmount > availableBalance) {
            alert("Insufficient balance");
            return;
        }

        if (fromAccount === toAccount) {
            alert("Cannot transfer to the same account");
            return;
        }

        // Find the coin info for selected currency
        const coinInfo = allowedCoins.find(coin => coin.code === selectedCurrency);

        const transferData = {
            symbol: selectedCurrency,
            fromAccount: fromAccount,
            toAccount: toAccount,
            amount: transferAmount,
            status: "completed",
        };

        console.log("Transfer data:", transferData);
        doTransfer(transferData);

        // Reset form after transfer
        setAmount("");
    };

    // Get coin icon style
    const getCoinColor = (currency) => {
        const coin = allowedCoins.find(c => c.code === currency);
        return coin ? coin.color : "#26A17B";
    };

    // Get account name
    const getAccountName = (accountCode) => {
        const account = accountTypes.find(a => a.code === accountCode);
        return account ? account.name : accountCode;
    };

    // Check if transfer button should be enabled
    const isTransferEnabled = () => {
        const transferAmount = parseFloat(amount);
        return (
            transferAmount > 0 &&
            transferAmount <= availableBalance &&
            fromAccount !== toAccount &&
            !loading
        );
    };

    // Get current wallet for selected currency and account
    const getCurrentWallet = () => {
        return listAssets?.find(item =>
            item.symbol === selectedCurrency &&
            item.accountType === fromAccount
        );
    };

    return (
        <>
            <div className="container">
                {/* Header Section */}
                <div className="header">
                    <div className="nav-bar">
                        <Link to="/wallets" className="back-arrow remove_blue">
                            <div className="back-arrow">
                                <i className="fas fa-arrow-left" />
                            </div>
                        </Link>
                        <div className="page-title">Transfer</div>
                        <Link to="/transferAll" className="header-icon remove_blue">

                            <div className="header-icon">
                                <i className="fas fa-receipt" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Content Section */}
                <div className="content-card">
                    {/* Currency Selector */}
                    <div className="currency-selector">
                        <div className="selector-header">
                            <div className="selector-label">Select currency</div>
                        </div>
                        <div
                            className="selected-currency"
                            onClick={() => setShowCurrencyModal(true)}
                        >
                            <div
                                className="currency-icon"

                            >
                                <img src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedCurrency}.png`} style={{
                                    width
                                        : '100%'
                                }} />

                                <span>

                                    {selectedCurrency}

                                </span>
                            </div>
                            <div className="currency-name" style={{ paddingLeft: 10 }}>
                                {selectedCurrency}
                            </div>
                            <i className="fas fa-chevron-down selector-arrow" />
                        </div>
                        <div className="warning-messages">
                            {availableBalance === 0 ? "There are currently no assets available, please select another" : ""}
                        </div>
                    </div>

                    {/* Wallet Section */}
                    <div className="wallet-section">
                        <div className="wallet-card">
                            {/* From Account */}
                            <div className="wallet-row" ref={fromAccountRef}>
                                <div className="wallet-label">From:</div>
                                <div
                                    className="wallet-value"
                                    onClick={() => setShowAccountDropdown(prev => ({ ...prev, from: !prev.from }))}
                                >
                                    {getAccountName(fromAccount)}
                                    <i className="fas fa-chevron-right wallet-arrow" />

                                    {/* From Account Dropdown */}
                                    {showAccountDropdown.from && (
                                        <div className="account-dropdown">
                                            {accountTypes.map(account => (
                                                <div
                                                    key={`from-${account.code}`}
                                                    className={`account-item ${fromAccount === account.code ? 'selected' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAccountSelect(account.code, 'from');
                                                    }}
                                                >
                                                    {account.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Transfer Direction Arrow */}
                            <div className="transfer-direction">
                                <div className="direction-arrow">
                                    <i className="fas fa-arrow-down" />
                                </div>
                            </div>

                            {/* To Account */}
                            <div className="wallet-row" ref={toAccountRef}>
                                <div className="wallet-label">To:</div>
                                <div
                                    className="wallet-value"
                                    onClick={() => setShowAccountDropdown(prev => ({ ...prev, to: !prev.to }))}
                                >
                                    {getAccountName(toAccount)}
                                    <i className="fas fa-chevron-right wallet-arrow" />

                                    {/* To Account Dropdown */}
                                    {showAccountDropdown.to && (
                                        <div className="account-dropdown">
                                            {accountTypes.map(account => (
                                                <div
                                                    key={`to-${account.code}`}
                                                    className={`account-item ${toAccount === account.code ? 'selected' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAccountSelect(account.code, 'to');
                                                    }}
                                                >
                                                    {account.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Swap Accounts Button */}
                        <div
                            className="swap-wallets"
                            onClick={handleSwapAccounts}
                        >
                            <i className="fas fa-exchange-alt" />
                        </div>
                    </div>

                    {/* Quantity Section */}
                    <div className="quantity-section">
                        <div className="input-group">
                            <input
                                type="text"
                                className="input-field"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0.0"
                            />
                            <div className="input-actions">
                                <div className="token-symbol">{selectedCurrency}</div>
                                <button
                                    className="max-button"
                                    onClick={handleMaxAmount}
                                    disabled={availableBalance === 0}
                                >
                                    Maximum
                                </button>
                            </div>
                        </div>
                        <div className="balance-info">
                            Available: {availableBalance.toFixed(8)} {selectedCurrency}
                        </div>
                    </div>

                    {/* Transfer Button */}
                    <button
                        className={`transfer-button ${isTransferEnabled() ? 'enabled' : ''}`}
                        onClick={handleTransfer}
                        disabled={!isTransferEnabled() || loading}
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin" /> Processing...
                            </>
                        ) : (
                            'Transfer'
                        )}
                    </button>
                </div>
            </div>

            {/* Currency Selection Modal */}
            {showCurrencyModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowCurrencyModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div className="modal-title">Select Currency</div>
                            <button
                                className="modal-close"
                                onClick={() => setShowCurrencyModal(false)}
                            >
                                <i className="fas fa-times" />
                            </button>
                        </div>
                        <ul className="currency-list">
                            {allowedCoins.map((coin) => (
                                <li
                                    key={coin.code}
                                    className={`currency-item ${selectedCurrency === coin.code ? 'selected' : ''}`}
                                    onClick={() => handleCurrencySelect(coin.code)}
                                >
                                    <div
                                        className="currency-icon"

                                    >
                                        <img src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coin.code}.png`} style={{
                                            width
                                                : '100%'
                                        }} />
                                    </div>
                                    <div className="currency-name">
                                        <div className="item-code">{coin.code}</div>
                                        <div className="item-name">{coin.name}</div>
                                    </div>
                                    <i className="fas fa-check check-icon" />
                                </li>
                            ))}
                        </ul>
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

                /* Content Section */
                .content-card {
                    background: white;
                    border-radius: 40px 40px 0 0;
                    height: calc(100% - 60px);
                    padding: 30px 20px 100px;
                    overflow-y: auto;
                }

                .section-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: #333;
                }

                /* Currency Selector */
                .currency-selector {
                    margin-bottom: 20px;
                }

                .selector-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .selector-label {
                    font-size: 12px;
                    color: #666;
                    font-weight: 500;
                }

                .selected-currency {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    background: white;
                    cursor: pointer;
                    position: relative;
                }

                .currency-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                }

                .currency-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    flex: 1;
                }

                .selector-arrow {
                    color: #999;
                    font-size: 12px;
                }

                .warning-messages {
                    color: #d40000;
                    font-size: 12px;
                    padding-left: 5px;
                    margin-top: 5px;
                    min-height: 18px;
                }

                /* Wallet Section */
                .wallet-section {
                    margin-bottom: 20px;
                    position: relative;
                    display: flex;
                }

                .wallet-card {
                    background: white;
                    width: 100%;
                    padding: 20px;
                    border: 1px solid #e0e0e0;
                    position: relative;
                }

                .wallet-row {
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    gap: 20px;
                    position: relative;
                }

                .wallet-row:first-child {
                    border-bottom: 1px solid #f0f0f0;
                }

                .wallet-label {
                    font-size: 12px;
                    color: #666;
                    min-width: 40px;
                }

                .wallet-value {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #000;
                    cursor: pointer;
                    position: relative;
                }

                .wallet-arrow {
                    font-size: 13px;
                    color: #666;
                }

                /* Account Dropdown */
                .account-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    z-index: 10;
                    min-width: 120px;
                    margin-top: 5px;
                }

                .account-item {
                    padding: 10px 15px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .account-item:hover {
                    background: #f5f5f5;
                }

                .account-item.selected {
                    background: #e6f0ff;
                    color: #106cf5;
                }

                .transfer-direction {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                }

                .direction-arrow {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 12px;
                }

      .swap-wallets {

    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    display: flex;
    align-items: center;
    /* justify-content: center; */
    color: white;
    padding: 8px;
}

                .swap-wallets:hover {
                    opacity: 0.9;
                }

                /* Quantity Section */
                .quantity-section {
                    margin-bottom: 30px;
                }

                .input-group {
                    position: relative;
                    margin-bottom: 10px;
                }

                .input-field {
                    width: 100%;
                    padding: 16px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    background: white;
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }

                .input-field:focus {
                    outline: none;
                    border-color: #106cf5;
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
                    font-size: 12px;
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

                .max-button:hover:not(:disabled) {
                    background: #d0e2ff;
                }

                .max-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .balance-info {
                    font-size: 13px;
                    color: #666;
                    text-align: right;
                }

                /* Transfer Button */
                .transfer-button {
                    background: #ccc;
                    border: none;
                    border-radius: 8px;
                    padding: 12px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: not-allowed;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .transfer-button.enabled {
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    cursor: pointer;
                }

                .transfer-button.enabled:hover:not(:disabled) {
                    opacity: 0.9;
                }

                .transfer-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* Modal Styles */
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
                    padding: 16px;
                }

                .modal-content {
                    background: white;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 350px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    color: #999;
                    cursor: pointer;
                    padding: 5px;
                }

                .currency-list {
                    list-style: none;
                    padding: 0;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .currency-item {
                    padding: 12px 20px;
                    border-bottom: 1px solid #f0f0f0;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .currency-item:hover {
                    background: #f8f9fa;
                }

                .currency-item.selected {
                    background: #e6f0ff;
                }

                .currency-item .currency-name {
                    flex: 1;
                }

                .currency-item .item-code {
                    font-size: 14px;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 2px;
                }

                .currency-item .item-name {
                    font-size: 12px;
                    color: #888f99;
                }

                .check-icon {
                    color: #106cf5;
                    font-size: 12px;
                    display: none;
                }

                .currency-item.selected .check-icon {
                    display: block;
                }

                /* Responsive adjustments */
                @media (max-width: 380px) {
                    .container {
                        padding: 0;
                    }

                    .header {
                        padding: 16px;
                    }

                    .content-card {
                        padding: 25px 16px 100px;
                    }

                    .currency-selector,
                    .wallet-section,
                    .quantity-section {
                        padding: 0;
                    }
                    
                    .wallet-card {
                        padding: 16px;
                    }
                }
            `}</style>
        </>
    )
}

export default Transfer;
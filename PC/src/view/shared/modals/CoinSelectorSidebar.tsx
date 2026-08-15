import React, { useState, useMemo, useRef, useEffect } from 'react';

export const defaultPairs = [
  { symbol: "XAUUSD",  name: "Gold" },
  { symbol: "EURUSD",  name: "EUR / USD" },
  { symbol: "GBPUSD",  name: "GBP / USD" },
  { symbol: "BTCUSD",  name: "Bitcoin" },
  { symbol: "ETHUSD",  name: "Ethereum" },
  { symbol: "XAGUSD",  name: "Silver" },
  { symbol: "AUDUSD",  name: "AUD / USD" },
  { symbol: "USDJPY",  name: "USD / JPY" },
  { symbol: "NZDUSD",  name: "NZD / USD" },
  { symbol: "USDCHF",  name: "USD / CHF" },
  { symbol: "USDCAD",  name: "USD / CAD" },
  { symbol: "LTCUSD",  name: "Litecoin" },
  { symbol: "USOIL",   name: "US Oil" },
  { symbol: "UKOIL",   name: "UK Oil" },
  { symbol: "EURJPY",  name: "EUR / JPY" },
  { symbol: "EURCHF",  name: "EUR / CHF" },
  { symbol: "AUDNZD",  name: "AUD / NZD" },
  { symbol: "GBPAUD",  name: "GBP / AUD" },
  { symbol: "AUDJPY",  name: "AUD / JPY" },
  { symbol: "EURNZD",  name: "EUR / NZD" },
  { symbol: "CADJPY",  name: "CAD / JPY" },
  { symbol: "NZDJPY",  name: "NZD / JPY" },
  { symbol: "EURAUD",  name: "EUR / AUD" },
  { symbol: "GBPJPY",  name: "GBP / JPY" },
  { symbol: "EURCAD",  name: "EUR / CAD" },
  { symbol: "GBPNZD",  name: "GBP / NZD" },
  { symbol: "EURGBP",  name: "EUR / GBP" },
  { symbol: "NAS100",  name: "Nasdaq 100" },
  { symbol: "AUS200",  name: "ASX 200" },
  { symbol: "ESP35",   name: "IBEX 35" },
  { symbol: "FRA40",   name: "CAC 40" },
  { symbol: "GER30",   name: "DAX 30" },
  { symbol: "SPX500",  name: "S&P 500" },
  { symbol: "US30",    name: "Dow Jones 30" },
  { symbol: "UK100",   name: "FTSE 100" },
  { symbol: "JPN225",  name: "Nikkei 225" },
];

interface CoinSelectorSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCoin: string;
    onCoinSelect: (symbol: string) => void;
    availableCoins?: Array<{ symbol: string; name: string }>;
    title?: string;
}

const CoinSelectorSidebar: React.FC<CoinSelectorSidebarProps> = ({
    isOpen,
    onClose,
    selectedCoin,
    onCoinSelect,
    availableCoins = defaultPairs,
    title = "Select Trading Pair"
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Filter coins based on search
    const filteredCoins = useMemo(() => {
        return availableCoins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, availableCoins]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target;
            if (sidebarRef.current && target instanceof Node && !sidebarRef.current.contains(target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            setSearchTerm("");
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handle coin selection
    const handleCoinSelect = (coinSymbol: string) => {
        if (coinSymbol === selectedCoin) {
            onClose();
            return;
        }
        onCoinSelect(coinSymbol);
    };

    // Handle escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div className="sidebar-overlay"></div>
            <div className="coin-selector-sidebar" ref={sidebarRef}>
                <div className="sidebar-header">
                    <div className="sidebar-title">{title}</div>
                    <div className="close-sidebar" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Search pairs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        autoFocus
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

                <div className="pairs-list">
                    {filteredCoins.map((pair) => (
                        <div
                            key={pair.symbol}
                            className={`pair-item ${selectedCoin === pair.symbol ? 'selected' : ''}`}
                            onClick={() => handleCoinSelect(pair.symbol)}
                        >
                            <div className="pair-name">{pair.name}</div>
                            <div className="pair-symbol">{pair.symbol}</div>
                        </div>
                    ))}

                    {filteredCoins.length === 0 && (
                        <div className="no-results">
                            <i className="fas fa-search"></i>
                            <div>No pairs found</div>
                            <div className="no-results-sub">Try different search terms</div>
                        </div>
                    )}
                </div>

                <style>{`
                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 1000;
                        animation: fadeIn 0.2s ease;
                    }

                    .coin-selector-sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 90%;
                        max-width: 280px;
                        height: 100%;
                        background: #ffffff;
                        z-index: 1001;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                        animation: slideFromLeft 0.2s ease;
                        overflow: hidden;
                        border-right: 1px solid #edeef1;
                    }

                    .sidebar-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px;
                        border-bottom: 1px solid #edeef1;
                        background: #ffffff;
                    }

                    .sidebar-title {
                        font-size: 17px;
                        font-weight: 600;
                        color: #1a1a1a;
                    }

                    .close-sidebar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: #f0f2f5;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        color: #777777;
                    }

                    .close-sidebar:hover {
                        background: #e6efff;
                        color: #106cf5;
                    }

                    .search-container {
                        position: relative;
                        padding: 16px 20px;
                        border-bottom: 1px solid #edeef1;
                    }

                    .search-icon {
                        position: absolute;
                        left: 36px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #999999;
                        font-size: 14px;
                    }

                    .search-input {
                        width: 100%;
                        padding: 10px 40px 10px 36px;
                        border: 1px solid #edeef1;
                        border-radius: 10px;
                        font-size: 14px;
                        background: #f8f9fb;
                        color: #1a1a1a;
                        transition: all 0.2s ease;
                    }

                    .search-input:focus {
                        outline: none;
                        border-color: #106cf5;
                        background: #ffffff;
                        box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
                    }

                    .search-input::placeholder {
                        color: #aaaaaa;
                    }

                    .clear-search {
                        position: absolute;
                        right: 36px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: #999999;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                        transition: all 0.2s ease;
                    }

                    .clear-search:hover {
                        background: #f0f2f5;
                        color: #106cf5;
                    }

                    .pairs-list {
                        flex: 1;
                        overflow-y: auto;
                        padding: 8px 0;
                    }

                    .pair-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 14px 20px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        border-bottom: 1px solid #f0f2f5;
                    }

                    .pair-item:hover {
                        background: #f8f9fb;
                    }

                    .pair-item.selected {
                        background: #e6efff;
                        border-left: 3px solid #106cf5;
                    }

                    .pair-item.selected .pair-name {
                        color: #106cf5;
                        font-weight: 600;
                    }

                    .pair-item.selected .pair-symbol {
                        color: #106cf5;
                    }

                    .pair-name {
                        font-size: 14px;
                        font-weight: 500;
                        color: #1a1a1a;
                    }

                    .pair-symbol {
                        font-size: 12px;
                        color: #888888;
                        font-weight: 400;
                    }

                    .no-results {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 60px 20px;
                        color: #999999;
                        text-align: center;
                        font-size: 14px;
                    }

                    .no-results i {
                        font-size: 36px;
                        margin-bottom: 12px;
                        opacity: 0.4;
                        color: #106cf5;
                    }

                    .no-results-sub {
                        font-size: 12px;
                        margin-top: 6px;
                        opacity: 0.7;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideFromLeft {
                        from {
                            transform: translateX(-100%);
                        }
                        to {
                            transform: translateX(0);
                        }
                    }

                    @media (max-width: 380px) {
                        .coin-selector-sidebar {
                            width: 85%;
                        }
                    }
                `}</style>
            </div>
        </>
    );
};

export default CoinSelectorSidebar;
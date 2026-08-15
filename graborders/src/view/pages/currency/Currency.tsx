// CurrencyModal Component - Can be used anywhere in the app
const CurrencyModal = ({ isOpen, onClose, selectedCurrency, onSelectCurrency }) => {
    const currencies = [
        { symbol: "$", code: "USD", name: "US Dollar" },
        { symbol: "HK$", code: "HKD", name: "Hong Kong Dollar" },
        { symbol: "€", code: "EUR", name: "Euro" },
        { symbol: "C$", code: "CAD", name: "Canadian Dollar" },
        { symbol: "¥", code: "JPY", name: "Japanese Yen" },
        { symbol: "NZ$", code: "NZD", name: "New Zealand Dollar" },
        { symbol: "NT$", code: "TWD", name: "New Taiwan Dollar" },
        { symbol: "S$", code: "SGD", name: "Singapore Dollar" },
        { symbol: "₱", code: "PHP", name: "Philippine Peso" },
        { symbol: "฿", code: "THB", name: "Thai Baht" },
        { symbol: "₽", code: "RUB", name: "Russian Ruble" },
        { symbol: "AU$", code: "AUD", name: "Australian Dollar" },
        { symbol: "£", code: "GBP", name: "British Pound" },
        { symbol: "₩", code: "KRW", name: "South Korean Won" },
        { symbol: "RM", code: "MYR", name: "Malaysian Ringgit" },
        { symbol: "₫", code: "VND", name: "Vietnamese Dong" },
        { symbol: "Rp", code: "IDR", name: "Indonesian Rupiah" }
    ];

    const handleCurrencyClick = (currency) => {
        onSelectCurrency(currency);
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="currency-modal-overlay" onClick={onClose}>
                <div className="currency-modal-container" onClick={(e) => e.stopPropagation()}>
                    {/* Modal Header */}
                    <div className="currency-modal-header">
                        <div className="currency-modal-drag-handle"></div>
                        <div className="currency-modal-title-wrapper">
                            <div className="currency-modal-title">Please select pricing currency</div>
                            <button className="currency-modal-close-btn" onClick={onClose}>
                                <i className="fas fa-times" />
                            </button>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="currency-modal-content">
                        <div className="currency-modal-list">
                            {currencies.map((currency) => (
                                <div
                                    key={currency.code}
                                    className={`currency-modal-item ${selectedCurrency.code === currency.code ? "selected" : ""
                                        }`}
                                    onClick={() => handleCurrencyClick(currency)}
                                >
                                    <div className="currency-modal-symbol">({currency.symbol})</div>
                                    <div className="currency-modal-info">
                                        <div className="currency-modal-code">{currency.code}</div>
                                        <div className="currency-modal-name">{currency.name}</div>
                                    </div>
                                    {selectedCurrency.code === currency.code && (
                                        <div className="currency-modal-checkmark">
                                            <i className="fas fa-check" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .currency-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: currencyModalFadeIn 0.3s ease;
        }

        .currency-modal-container {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 400px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
          animation: currencyModalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .currency-modal-header {
          padding: 16px 20px 8px 20px;
          border-bottom: 1px solid #eef2f7;
          position: relative;
        }

        .currency-modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }

        .currency-modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .currency-modal-title {
          font-size: 17px;
          font-weight: 700;
          color: #222;
          flex: 1;
          padding-right: 10px;
        }

        .currency-modal-close-btn {
          background: #f5f7fa;
          border: none;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .currency-modal-close-btn:hover {
          background: #eef2f7;
          color: #333;
        }

        .currency-modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;
          max-height: calc(85vh - 100px);
        }

        .currency-modal-list {
          padding: 0;
          max-height: calc(85vh - 100px);
          overflow-y: auto;
              padding-bottom: 90px;
        }

        .currency-modal-list::-webkit-scrollbar {
          width: 4px;
        }

        .currency-modal-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .currency-modal-list::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }

        .currency-modal-list::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }

        .currency-modal-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f5f7fa;
        }

        .currency-modal-item:last-child {
          border-bottom: none;
        }

        .currency-modal-item:hover {
          background-color: #f8fafd;
        }

        .currency-modal-item.selected {
          background-color: #f0f7ff;
        }

        .currency-modal-symbol {
          font-size: 16px;
          font-weight: 600;
          color: #106cf5;
          min-width: 55px;
          flex-shrink: 0;
        }

        .currency-modal-info {
          flex: 1;
          margin-left: 0;
        }

        .currency-modal-code {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .currency-modal-name {
          font-size: 13px;
          color: #666;
          font-weight: 400;
        }

        .currency-modal-checkmark {
          color: #106cf5;
          font-size: 16px;
          margin-left: 10px;
          flex-shrink: 0;
          animation: currencyModalFadeInScale 0.3s ease;
        }

        @keyframes currencyModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes currencyModalSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes currencyModalFadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 380px) {
          .currency-modal-container {
            max-height: 90vh;
          }

          .currency-modal-header {
            padding: 12px 16px 6px 16px;
          }

          .currency-modal-title {
            font-size: 16px;
          }

          .currency-modal-item {
            padding: 14px 16px;
          }

          .currency-modal-code {
            font-size: 15px;
          }

          .currency-modal-symbol {
            font-size: 15px;
            min-width: 50px;
          }

          .currency-modal-drag-handle {
            width: 36px;
            height: 3px;
            margin-bottom: 10px;
          }
        }

        @media (min-width: 401px) {
          .currency-modal-overlay {
            align-items: flex-end;
            justify-content: center;
          }
        }
      `}</style>
        </>
    );
};


export default CurrencyModal
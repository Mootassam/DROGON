import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function p2p() {
  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="P2P Trading" />
      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-header">
          <div className="filter-title">Filters</div>
          <div className="reset-filters">Reset</div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">I want to pay with</label>
            <select className="filter-select">
              <option>All Payments</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Cash in Person</option>
              <option>Wise</option>
              <option>Revolut</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">I want to buy</label>
            <select className="filter-select">
              <option>USD</option>
              <option>BTC</option>
              <option>ETH</option>
              <option>BNB</option>
            </select>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Amount</label>
            <input
              type="number"
              className="amount-input"
              placeholder="Enter amount"
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Currency</label>
            <select className="filter-select">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>CAD</option>
            </select>
          </div>
        </div>
      </div>
      {/* P2P Listings */}
      <div className="p2p-listings">
        <div className="listing-header">
          <div className="listing-title">Recommended Sellers</div>
          <div className="view-all">View All</div>
        </div>
        {/* P2P Listing 1 */}
        <div className="p2p-item">
          <div className="trader-info">
            <div className="trader-avatar">
              <i className="fas fa-user" />
            </div>
            <div className="trader-details">
              <div className="trader-name">CryptoTrader89</div>
              <div className="trader-rating">
                <span className="stars">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </span>
                4.7 (128 trades)
                <span className="completion-rate">100%</span>
              </div>
            </div>
          </div>
          <div className="trade-details">
            <div className="detail-item">
              <div className="detail-value">$1.02</div>
              <div className="detail-label">Price/USD</div>
            </div>
            <div className="detail-item">
              <div className="detail-value">5,240</div>
              <div className="detail-label">Available</div>
            </div>
            <div className="detail-item">
              <div className="detail-value">2 min</div>
              <div className="detail-label">Avg. Release</div>
            </div>
          </div>
          <div className="payment-methods">
            <i className="fas fa-university payment-icon" />
            <div className="payment-list">
              <span className="payment-badge">Bank Transfer</span>
              <span className="payment-badge">Wise</span>
              <span className="payment-badge">PayPal</span>
            </div>
          </div>
          <div className="trade-action">
            <div className="trade-limits">Limit: $50 - $2,400</div>
            <button className="trade-button">Buy USD</button>
          </div>
        </div>
        {/* P2P Listing 2 */}
        <div className="p2p-item">
          <div className="trader-info">
            <div className="trader-avatar">
              <i className="fas fa-user-tie" />
            </div>
            <div className="trader-details">
              <div className="trader-name">BitcoinExpert</div>
              <div className="trader-rating">
                <span className="stars">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </span>
                4.9 (342 trades)
                <span className="completion-rate">99.8%</span>
              </div>
            </div>
          </div>
          <div className="trade-details">
            <div className="detail-item">
              <div className="detail-value">$1.01</div>
              <div className="detail-label">Price/USD</div>
            </div>
            <div className="detail-item">
              <div className="detail-value">8,750</div>
              <div className="detail-label">Available</div>
            </div>
            <div className="detail-item">
              <div className="detail-value">5 min</div>
              <div className="detail-label">Avg. Release</div>
            </div>
          </div>
          <div className="payment-methods">
            <i className="fas fa-money-bill-wave payment-icon" />
            <div className="payment-list">
              <span className="payment-badge">Cash Deposit</span>
              <span className="payment-badge">Zelle</span>
              <span className="payment-badge">Venmo</span>
            </div>
          </div>
          <div className="trade-action">
            <div className="trade-limits">Limit: $100 - $5,000</div>
            <button className="trade-button">Buy USD</button>
          </div>
        </div>
        {/* P2P Listing 3 */}
        <div className="p2p-item">
          <div className="trader-info">
            <div className="trader-avatar">
              <i className="fas fa-user-graduate" />
            </div>
            <div className="trader-details">
              <div className="trader-name">DigitalAssetsPro</div>
              <div className="trader-rating">
                <span className="stars">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="far fa-star" />
                </span>
                4.2 (89 trades)
                <span className="completion-rate">97.5%</span>
              </div>
            </div>
          </div>
          <div className="trade-details">
            <div className="detail-item">
              <div className="detail-value">$1.03</div>
              <div className="detail-label">Price/USD</div>
            </div>
            <div className="detail-item">
              <div className="detail-value">3,200</div>
              <div className="detail-label">Available</div>
            </div>
            <div className="detail-item">
              <div className="detail-value">10 min</div>
              <div className="detail-label">Avg. Release</div>
            </div>
          </div>
          <div className="payment-methods">
            <i className="fab fa-paypal payment-icon" />
            <div className="payment-list">
              <span className="payment-badge">PayPal</span>
              <span className="payment-badge">Revolut</span>
              <span className="payment-badge">Cash App</span>
            </div>
          </div>
          <div className="trade-action">
            <div className="trade-limits">Limit: $30 - $1,500</div>
            <button className="trade-button">Buy USD</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default p2p;

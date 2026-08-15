import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "src/view/shared/Header/SubHeader";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import SingleItem from "./SingleItem";

// Define filter options in a constant to avoid recreation on each render
const FILTER_OPTIONS = [
  { key: "news", coin: 0, label: "All" },
  { key: "bitcoin", coin: 1, label: "Bitcoin" },
  { key: "ethereum", coin: 1027, label: "Ethereum" },
  { key: "USD", coin: 825, label: "USD" },
  { key: "BNB", coin: 1839, label: "BNB" },
  { key: "Solona", coin: 5426, label: "Solona" },
  { key: "USDC", coin: 3408, label: "USDC" },
  { key: "XRP", coin: 52, label: "XRP" },
  { key: "toncoin", coin: 11419, label: "TonCoin" },
];

// Loading placeholder component
const NewsPlaceholder = () => (
  <div className="news-placeholder">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="news-item-placeholder">
        <div className="placeholder-image shimmer"></div>
        <div className="placeholder-content">
          <div className="placeholder-line shimmer" style={{ width: '80%', height: '16px', marginBottom: '8px' }}></div>
          <div className="placeholder-line shimmer" style={{ width: '60%', height: '14px', marginBottom: '12px' }}></div>
          <div className="placeholder-line shimmer" style={{ width: '40%', height: '12px' }}></div>
        </div>
      </div>
    ))}
  </div>
);

function News() {
  const dispatch = useDispatch();
  const [newselected, setNewSelected] = useState("news");

  // Select data from Redux store
  const selectNews = useSelector(productListSelectors.selectNews);
  const selectloadingNews = useSelector(productListSelectors.selectloadingNews);
  const record = useSelector(selector.selectRows);

  // Memoized filter option to prevent unnecessary recalculations
  const filterOptions = useMemo(() => FILTER_OPTIONS, []);

  // Memoized event handler to prevent unnecessary re-renders of filter buttons
  const handleFilterClick = useCallback((item, coin) => {
    setNewSelected(item);
    const data = {
      id: coin,
      page: 1,
      size: 30
    }
    dispatch(productListActions.doFindNews(data));
  }, [dispatch]);

  // Memoized fetch function with useCallback
  const fetchCoins = useCallback(() => {
    dispatch(productListActions.doFetch());
    const data = {
      id: 1,
      page: 1,
      size: 60
    }
    dispatch(productListActions.doFindNews(data));
  }, [dispatch]);

  // Fetch data on component mount
  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  return (
    <div className="container">
      {/* Header Section */}
      <SubHeader title="Crypto News" />

      {/* News Filters */}
      <div className="news-filters">
        {filterOptions.map((filter) => (
          <button
            key={filter.key}
            className={`filter-button ${newselected === filter.key ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.key, filter.coin)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="news-list">
        <div className="news-section-title">Latest News</div>

        {/* Show loading placeholders while data is loading */}
        {selectloadingNews ? (
          <NewsPlaceholder />
        ) : (
          <SingleItem topic={selectNews} loading={selectloadingNews} />
        )}
      </div>

      <style>{`
        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
          background: #2A2A2A;
          background: #2A2A2A
          background-size: 800px 104px;
          position: relative;
        }
        
        .news-placeholder {
          margin-top: 16px;
        }
        
        .news-item-placeholder {
          display: flex;
          margin-bottom: 20px;
          padding: 16px;
          background: #1A1A1A;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .placeholder-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          margin-right: 16px;
          flex-shrink: 0;
        }
        
        .placeholder-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .placeholder-line {
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .news-item-placeholder {
            flex-direction: column;
          }
          
          .placeholder-image {
            width: 100%;
            height: 160px;
            margin-right: 0;
            margin-bottom: 12px;
          }
        }
      `}</style>
    </div>
  );
}

// Use React.memo to prevent unnecessary re-renders if props don't change
export default React.memo(News);
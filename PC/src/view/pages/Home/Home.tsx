import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  // ── Fetch news (unchanged logic) ──
  const fetchNews = async () => {
    setLoadingNews(true);
    setNewsError(null);
    try {
      const rssUrl = 'https://feeds.bloomberg.com/markets/news.rss';
      const response = await axios.get(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      );
      if (response.data?.items) {
        const articles = response.data.items.slice(0, 20).map(item => {
          let imageUrl = null;
          if (item.thumbnail) imageUrl = item.thumbnail;
          else if (item.enclosure?.link) imageUrl = item.enclosure.link;
          else if (item.description) {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) imageUrl = imgMatch[1];
          }
          if (!imageUrl) imageUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop';

          return {
            title: item.title || 'Market Update',
            link: item.link || '#',
            imageUrl,
            description: item.description
              ? item.description.replace(/<[^>]*>/g, '').substring(0, 120)
              : '',
            pubDate: item.pubDate,
            category: item.categories?.[0] || 'Markets',
          };
        });
        setNewsArticles(articles);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('News fetch error:', error);
      setNewsError('Unable to load latest news.');
      setNewsArticles(generateFallbackNews());
    } finally {
      setLoadingNews(false);
    }
  };

  // Fallback news (20 articles)
  const generateFallbackNews = () => {
    const headlines = [
      { title: 'Federal Reserve hints at possible rate cut in September', cat: 'Economy' },
      { title: 'S&P 500 extends gains as tech earnings impress', cat: 'Stocks' },
      { title: 'Oil prices climb amid escalating geopolitical tensions', cat: 'Commodities' },
      { title: 'Bitcoin rallies past $70k on ETF inflows', cat: 'Crypto' },
      { title: 'EUR/USD breaks above 1.10 on dollar weakness', cat: 'Forex' },
      { title: 'Gold reaches three-month high on safe-haven demand', cat: 'Commodities' },
      { title: 'Bank of England holds rates steady at 5.25%', cat: 'Economy' },
      { title: 'Apple unveils new AI features at WWDC', cat: 'Technology' },
      { title: 'Tesla shares jump on strong delivery numbers', cat: 'Stocks' },
      { title: 'Japanese yen weakens to 34-year low', cat: 'Forex' },
      { title: 'Emerging markets see record inflows in Q2', cat: 'Markets' },
      { title: 'Global bond yields fall on growth concerns', cat: 'Bonds' },
      { title: 'US jobs report beats expectations', cat: 'Economy' },
      { title: 'Nasdaq hits all-time high as tech leads', cat: 'Stocks' },
      { title: 'Crude oil inventories drop unexpectedly', cat: 'Commodities' },
      { title: 'Ethereum upgrade drives price surge', cat: 'Crypto' },
      { title: 'Australian dollar rises on strong GDP data', cat: 'Forex' },
      { title: 'China stimulus hopes boost metals', cat: 'Commodities' },
      { title: 'UK inflation cools more than forecast', cat: 'Economy' },
      { title: 'Robinhood reports record crypto revenue', cat: 'Crypto' },
    ];
    return headlines.map(h => ({
      title: h.title,
      link: '#',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop',
      description: 'Latest market developments affecting global financial markets.',
      pubDate: new Date().toISOString(),
      category: h.cat,
    }));
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  // Helpers
  const truncateText = (text, max = 70) =>
    text ? (text.length > max ? text.substring(0, max) + '...' : text) : '';

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const diffHours = (new Date() - date) / (1000 * 60 * 60);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="home-container">
      {/* Minimal Header – only logo */}
      <div className="header">
        <div className="logo-area">

       </div>
      </div>

      {/* White content card with news */}
      <div className="content-card">
        <div className="section-header">
          <h3 className="section-title">Latest Market News</h3>
          <a
            href="https://www.bloomberg.com/markets"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all"
          >
            Bloomberg <i className="fas fa-external-link-alt" />
          </a>
        </div>

        {loadingNews ? (
          <div className="news-grid">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="news-card skeleton">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                </div>
              </div>
            ))}
          </div>
        ) : newsError ? (
          <div className="error-box">
            <i className="fas fa-exclamation-circle" /> {newsError}
            <button onClick={fetchNews} className="retry-btn">
              Retry
            </button>
          </div>
        ) : (
          <div className="news-grid">
            {newsArticles.map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
              >
                <div className="news-img-container">
                  <img
                    src={article.imageUrl}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=160&fit=crop';
                    }}
                  />
                  <span className="news-category">{article.category}</span>
                </div>
                <div className="news-card-body">
                  <h4 className="news-title">{truncateText(article.title, 55)}</h4>
                  <p className="news-desc">{truncateText(article.description, 70)}</p>
                  <div className="news-meta">
                    <span>GrandCapital News</span>
                    {article.pubDate && <span>{formatDate(article.pubDate)}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ── Styles ── */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        body {
          background-color: #f5f7fa;
        }
        .home-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          position: relative;
        }

        /* Header – only logo, no buttons */
        .header {
          padding: 30px 20px 20px;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ps-icon {
          width: 38px;
          height: 38px;
          background: white;
          border-radius: 10px;
          color: #106cf5;
          font-weight: 800;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-name {
          color: white;
          font-weight: 600;
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        /* White content card – matches LoginPassword / MarketDetail */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 60px;
          box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
          min-height: calc(100vh - 100px);
        }

        /* Section header for news */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .view-all {
          color: #106cf5;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* News grid (2 columns) */
        .news-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .news-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e7eaee;
          text-decoration: none;
          color: #333;
          transition: 0.2s;
          display: flex;
          flex-direction: column;
        }
        .news-card:hover {
          border-color: #106cf5;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .news-img-container {
          width: 100%;
          height: 110px;
          overflow: hidden;
          background: #f0f2f5;
          position: relative;
        }
        .news-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .news-category {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(16,108,245,0.9);
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .news-card-body {
          padding: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .news-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
          line-height: 1.4;
          color: #1a1a1a;
        }
        .news-desc {
          font-size: 11px;
          color: #777;
          line-height: 1.4;
          margin-bottom: 10px;
          flex: 1;
        }
        .news-meta {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #aaa;
        }

        /* Skeletons */
        .skeleton .skeleton-img {
          height: 110px;
          background: linear-gradient(90deg, #f0f2f5 25%, #e5e8ec 50%, #f0f2f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-body {
          padding: 12px;
        }
        .skeleton-line {
          background: #e0e3e8;
          border-radius: 4px;
          margin-bottom: 6px;
          animation: shimmer 1.4s infinite;
        }
        .skeleton-line.short { height: 12px; width: 40%; }
        .skeleton-line.long { height: 14px; width: 90%; }
        .skeleton-line.medium { height: 12px; width: 60%; }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Error */
        .error-box {
          background: #fff5f5;
          border: 1px solid #ffcccc;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          color: #f56c6c;
          font-size: 14px;
        }
        .retry-btn {
          background: #106cf5;
          color: white;
          border: none;
          margin-top: 12px;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Mobile tweaks */
        @media (max-width: 380px) {
          .content-card {
            padding: 20px 16px 60px;
          }
          .news-img-container {
            height: 95px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
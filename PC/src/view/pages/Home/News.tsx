import React, { useState } from "react";
import { Link } from "react-router-dom";

function News(props) {
  const { topic, loading } = props;
  
  return (
    <div className="crypto-news-container" style={{maxWidth: '400px'}}>
      {/* News Section Header */}
      <div className="news-section-header">
        <div className="news-sections-title">Crypto News</div>
        <Link to="/news" className="news-see-all remove_blue">
          See All →
        </Link>
      </div>
      
      {/* News Items */}
      {topic?.map((item, index) => (
        <div key={index} className="news-item-card">
          <div>
            <img
              src={item?.cover}
              className="news-image-placeholder"
              loading="lazy"
              alt="News cover"
            />
          </div>
          <div className="news-content-wrapper">
            <div 
              className="news-headline"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item?.meta?.title}
            </div>
            <div 
              className="news-summary"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item?.meta?.subtitle}
            </div>
            {/* <div className="news-meta-info">2 hours ago • CryptoDaily</div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
export default News;

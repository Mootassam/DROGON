import React, { useState } from "react";

const CryptoImage = ({ symbol = "BTC", size = 50 }) => {
  const [imgError, setImgError] = useState(false);

  const imageUrl = `https://bin.bnbstatic.com/static/assets/logos/BTC.png`;

  if (imgError) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        {symbol}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={symbol}
      loading="lazy"
      onError={() => setImgError(true)}
      style={{
        width: size,
        height: size,
        borderRadius: "8px",
      }}
    />
  );
};

export default CryptoImage;

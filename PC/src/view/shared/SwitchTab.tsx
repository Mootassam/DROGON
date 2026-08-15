import React from "react";
function SwitchTab(props) {
  return (
    <div className="app__switchtab">
      <input type="radio" name="slider" id="news" />
      <input type="radio" name="slider" id="trading" />
      <input type="radio" name="slider" id="bitcoin" />
      <input type="radio" name="slider" id="blockchain" />
      <input type="radio" name="slider" id="ethereum" />
      <input type="radio" name="slider" id="altcoins" />
      <input type="radio" name="slider" id="metaverse" />
      <nav>
        <label
          htmlFor="trading"
          className="news"
          onClick={() => props.showTopic("news")}
        >
          News
        </label>
        <label
          htmlFor="trading"
          className="trading"
          onClick={() => props.showTopic("trading")}
        >
          trading
        </label>
        <label
          htmlFor="bitcoin"
          className="bitcoin"
          onClick={() => props.showTopic("bitcoin")}
        >
          bitcoin
        </label>
        <label
          htmlFor="blockchain"
          className="blockchain"
          onClick={() => props.showTopic("blockchain")}
        >
          blockchain
        </label>
        <label
          htmlFor="ethereum"
          className="ethereum"
          onClick={() => props.showTopic("ethereum")}
        >
          ethereum
        </label>
        <label
          htmlFor="altcoins"
          className="altcoins"
          onClick={() => props.showTopic("altcoins")}
        >
          altcoins
        </label>
        <label
          htmlFor="metaverse"
          className="metaverse"
          onClick={() => props.showTopic("metaverse")}
        >
          metaverse
        </label>
        <div className="slider"></div>
      </nav>
    </div>
  );
}

export default SwitchTab;

import SubHeader from "src/view/shared/Header/SubHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { i18n } from "../../../i18n";

function WirthdrawAddress() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const currencyOptions = [
    {
      path: "/formwithdrawaddress/BTC",
      label: i18n("pages.withdrawAddress.currencies.btc"),
      icon: "fab fa-bitcoin",
      symbol: "BTC",
      id: "BTC",
    },
    {
      path: "/formwithdrawaddress/ETH",
      label: i18n("pages.withdrawAddress.currencies.eth"),
      icon: "fab fa-ethereum",
      symbol: "ETH",
      id: "ETH",
    },
    {
      path: "/formwithdrawaddress/USD",
      label: i18n("pages.withdrawAddress.currencies.USD"),
      icon: "fas fa-chevron-right",
      symbol: "USD",
      id: "USD",
    },
    {
      path: "/formwithdrawaddress/SOL",
      label: i18n("pages.withdrawAddress.currencies.sol"),
      icon: "fas fa-chevron-right",
      symbol: "SOL",
      id: "SOL",
    },
    {
      path: "/formwithdrawaddress/XRP",
      label: i18n("pages.withdrawAddress.currencies.xrp"),
      icon: "fas fa-chevron-right",
      symbol: "XRP",
      id: "XRP",
    },
  ];
  
  return (
    <div className="container">
      {/* Currency Selection Page */}
      <div id="currency-page">
        <SubHeader title={i18n("pages.withdrawAddress.title")} />
        <div className="card">
          <h2 className="card-title">{i18n("pages.withdrawAddress.cardTitle")}</h2>
          <div className="currency-options">
            {currencyOptions.map((item, index) => (
              <Link
                to={item.path}
                className="currency-option remove_blue"
                key={index}
              >
                <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item.symbol}.png`}
                  style={{ width: 26, height: 26 }}
                  alt={item.symbol}
                />
                <div className="currency-name">{item.label}</div>
                {currentUser &&
                currentUser?.wallet &&
                currentUser?.wallet[item.id] ? (
                  <i className="fas fa-check" />
                ) : (
                  <div className="currency-arrow">
                    <i className="fas fa-chevron-right" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WirthdrawAddress;
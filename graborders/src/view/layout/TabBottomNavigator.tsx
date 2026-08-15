
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

interface TabItem {
  icon: string;      // Font Awesome class, e.g., "fas fa-home"
  path: string;
  name: string;
}

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs: TabItem[] = [
    {
      icon: "fas fa-chart-line",
      path: "/market",
      name: i18n("components.bottomNav.market"),
    },
     {
      icon: "fas fa-list",
      path: "/ordersPage",
      name: i18n("components.bottomNav.orders"),
    },

    {
      icon: "fas fa-chart-bar",   // will be replaced by custom image for futures
      path: "/futures",
      name: i18n("components.bottomNav.trade"),
    },
  

     {
      icon: "fas fa-newspaper",
      path: "/",
      name: i18n("components.bottomNav.news"),
    },
    {
      icon: "fas fa-user",
      path: "/profile",
      name: i18n("components.bottomNav.profile"),
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((item, index) => {
        const isFutures = item.path === "/futures";

        return (
          <Link
            key={index}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""} ${isFutures ? "futures-tab" : ""
              }`}
          >
            {isFutures ? (
              <img
                src="/icons/logo.png"
                alt="Futures"
                className="futures-icon"
              />
            ) : (
              <i className={item.icon}></i>
            )}
            {!isFutures && <span className="nav-label">{item.name}</span>}
          </Link>
        );
      })}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --primary: #0064FA;
          --primary-light: #e8f0ff;
          --text-secondary: #6b7280;
          --border: #e5e7eb;
          --bg-white: #ffffff;
          --shadow-sm: 0 -1px 4px rgba(0, 0, 0, 0.04);
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 400px;
          margin: 0 auto;
          background-color: #ffffff;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 8px 0 10px;
          z-index: 100;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
          border-top: 1px solid var(--border);
          font-family: 'Inter', system-ui, sans-serif;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 4px 6px;
          border-radius: 10px;
          gap: 3px;
          min-width: 60px;
        }

        .nav-item i {
          font-size: 22px;
          transition: color 0.2s;
        }

        .nav-item.active {
          color: var(--primary);
        }

        .nav-item.active i {
          color: var(--primary);
        }

        .nav-item.active .nav-label {
          font-weight: 600;
        }

        /* subtle background for active */
        .nav-item.active {
          background-color: var(--primary-light);
        }

        .nav-label {
          line-height: 1.2;
        }

        /* ----- Futures tab custom styles ----- */
        .futures-tab {
          margin-top: -18px;
          position: relative;
        }

        .futures-icon {
          width: 50px;
          height: 50px;
          object-fit: contain;
          transform: translateY(-6px);
          filter: drop-shadow(0 2px 6px rgba(0, 100, 250, 0.25));
          transition: filter 0.2s;
        }

        .futures-tab.active .futures-icon {
          filter: drop-shadow(0 4px 8px rgba(0, 100, 250, 0.4));
        }

        /* ensure no label pushes layout */
        .futures-tab .nav-label {
          display: none;
        }

        /* Ensure page content isn't hidden behind the fixed nav */
        body {
          padding-bottom: 70px;
        }
      `}</style>
    </nav>
  );
}

export default TabBottomNavigator;
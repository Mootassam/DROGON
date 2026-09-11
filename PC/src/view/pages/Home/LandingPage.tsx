import React, { useState } from "react";
import { Link } from "react-router-dom";

// ── Content data ──────────────────────────────────────────────────────────────

const PILLARS = [
  {
    key: "trade",
    icon: "fas fa-chart-line",
    title: "Trade",
    text:
      "Make wealth with Grand Capital: low spreads, fast execution, and guaranteed fund protection. Trade a wide range of instruments anytime, anywhere.",
  },
  {
    key: "invest",
    icon: "fas fa-seedling",
    title: "Invest",
    text:
      "Invest and earn with the best. Copy trades of successful traders automatically or trust our experts to build a safe and profitable portfolio for you. Start growing your capital with Grand Capital today.",
  },
  {
    key: "multiply",
    icon: "fas fa-layer-group",
    title: "Multiply",
    text:
      "Increase your income with our lucrative affiliate programs. Receive payments of up to 50% of the company's profit or up to 25 USD per lot — the choice is yours. Join Grand Capital and start earning more today!",
  },
];

const ACCOUNT_TYPES = [
  {
    key: "standard",
    label: "Standard",
    tagline: "The choice of the majority",
    description: "The widest range of trading instruments.",
    tags: ["Gold", "Crypto", "Forex"],
    subDescription: "Best choice for Forex trading.",
    features: ["multicurrency account", "loyalty programs", "500+ CFD & Forex"],
  },
  {
    key: "mt5",
    label: "MT5",
    tagline: "The newest version of the classic platform",
    description: "Unique options available for trading:",
    tags: ["Low spreads", "Asian stocks"],
    subDescription: "Make use of all the advantages of a professional platform.",
    features: ["400+ instruments", "deposit from 100 USD", "comfortable spreads"],
  },
  {
    key: "micro",
    label: "Micro",
    tagline: "The cent account",
    description: "Minimum trade size - 0.001 lot.",
    tags: [],
    subDescription: "The best choice for beginners.",
    features: ["deposit from 10 USD", "60 trading instruments", "up to 1:500 leverage"],
  },
  {
    key: "ecn",
    label: "ECN Prime",
    tagline: "Account with ECN execution",
    description: "Advantages:",
    tags: ["The fastest execution", "Low spreads", "Low commissions"],
    subDescription: "Choice of the professional traders.",
    features: ["deposit from 500 USD", "up to 1:3000 leverage", "execution from 30 ms"],
  },
  {
    key: "swapfree",
    label: "Swap Free",
    tagline: "Islamic account",
    description: "Same as Standard, but no swap.",
    tags: [],
    subDescription: "The account for Muslim traders.",
    features: ["deposit from 100 USD", "without swaps", "bonus programs available"],
  },
];

const STOCKS = [
  { symbol: "#TESLA", y1: "+110%", y5: "+815%", since2023: "+8%", y2022: "-61%" },
  { symbol: "#APPLE", y1: "+44%", y5: "+343%", since2023: "+28%", y2022: "-26%" },
  { symbol: "#FERRARI", y1: "+59%", y5: "+174%", since2023: "+38%", y2022: "-7%" },
  { symbol: "#FACEBOOK", y1: "+188%", y5: "+134%", since2023: "+162%", y2022: "-62%" },
  { symbol: "#NVIDIA", y1: "+236%", y5: "+1612%", since2023: "+215%", y2022: "-40%" },
];

const FAQS: { group: string; items: { q: string; a: string[] }[] }[] = [
  {
    group: "Ready to begin?",
    items: [
      {
        q: "What would be a good initial deposit at Grand Capital?",
        a: [
          "In most cases, the recommended starting amount is 1,000 USD. This sum is sufficient for trading any instruments, can withstand a drawdown, allows to hedge volatility risks in currency markets with commodity CFD trades.",
        ],
      },
      {
        q: "How to open a trading account?",
        a: [
          "After you register, a Standard trading account will be created for you automatically. Make a deposit using a bank card, a payment system, or cryptocurrency. If you deposit via bank card, you'll have to pass a verification procedure and provide all the necessary documents required by the processing system.",
        ],
      },
      {
        q: "What's next?",
        a: [
          "Start trading. First, you'll need to download a trading platform: MT4, MT5 (for experienced traders), choose an instrument and start trading. The most popular currency pairs for trading are EUR/USD, USD/CHF, USD/JPY, BTC/USD, ETH/USD, LTC/USD.",
          "If you prefer trading commodities, turn your attention to oil, gas and metals, and if you're interested in stocks and indices, you can choose from our wide selection of these instruments.",
          "If you don't know what to start with, visit our page for beginners or contact your personal manager through the ticket system in your Private Office.",
        ],
      },
    ],
  },
  {
    group: "What we offer?",
    items: [
      {
        q: "What investment and management services are available to you?",
        a: [
          "Copy trading is for investment and management. Connect to the available strategies that are proven successful and create your own. The service is fully automated and easy to use, provides a high level of capital protection, allows setting limits for profit and loss, weekly profit.",
          "The recommended initial deposit is 2,000 USD. The minimum amount of investment in one strategy is 50 USD. Open a copy trading account.",
          "Choose an investment portfolio and make money from stocks of major corporations.",
          "Readily available ideas for trading, free advice, high profit rate.",
          "You can also take advantage of our free service and order a custom portfolio.",
        ],
      },
      {
        q: "What trading instruments do we have for beginners and professionals?",
        a: [
          "We offer 500 instruments for trading: CFDs on stocks, indices, metals, commodities, currency pairs, cryptocurrency.",
          "ECN and Crypto accounts are available to professional traders. Beginners may be interested in our cent account Micro. For most clients, the recommended account type is Standard. Algorithmic trading is available on all accounts, including the possibility to create your own robots in MetaTrader 5. The following trading platforms are available at Grand Capital: MetaTrader 4 and MetaTrader 5 in desktop and mobile versions.",
        ],
      },
      {
        q: "What are our guarantees?",
        a: [
          "We set high requirements for liquidity providers and aim to provide the most favorable conditions for your work with the market: small fees, highly liquid instruments, immediate execution, 24/7 support. We allow using any robots and EAs, high-margin trading is available. Risk diversification is possible thanks to the variety of accounts and instruments.",
        ],
      },
    ],
  },
  {
    group: "Our support",
    items: [
      {
        q: "What makes Grand Capital different from other companies?",
        a: [
          "We profit when you profit.",
          "Grand Capital is a provider of technology for trading in currency and derivatives markets, active since 2006. Over these years, we have become a financial partner of more than 1,500,000 traders all over the world. The stable and reliable operation of the company paired with its vast experience in the field has allowed us to implement the concept of a long-term mutually beneficial partnership. High standards of the provided services and technology earned prestigious awards from the professional community. Our work is for the benefit of the client, and our income relies on fees for using our services and instruments.",
        ],
      },
      {
        q: "What privileges do you get with Grand Capital?",
        a: [
          "You become a part of the international trading community and use the most advanced services in the field of trading and investing. You participate in loyalty programs and get firsthand access to new instruments and technologies as they are introduced by the company. Each client gets their own personal manager who will help them become more successful. Working with a stable world-class company, you won't have to worry about the safety of your funds.",
        ],
      },
      {
        q: "How to start working with Grand Capital if you have no experience?",
        a: [
          "First, you need to decide whether you want to work as an independent trader or invest funds. If you plan to trade on your own, start with our classic account Standard, the recommended deposit amount is 500 USD. Download the mobile app. Visit our page for beginners.",
          "If you plan to start as an investor, open a Copy trading account and start copying the top-performing strategies in the rating: it's really a low-risk and profitable way of earning for investors of any level of experience with any budget.",
        ],
      },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeAccount, setActiveAccount] = useState(ACCOUNT_TYPES[0].key);
  const [copyView, setCopyView] = useState<"investors" | "traders">("investors");
  const [openFaq, setOpenFaq] = useState<string | null>("0-0");

  const currentAccount = ACCOUNT_TYPES.find((a) => a.key === activeAccount) || ACCOUNT_TYPES[0];

  const toggleFaq = (id: string) => setOpenFaq((prev) => (prev === id ? null : id));

  return (
    <div className="lp-root">
      <style>{LP_CSS}</style>

      {/* ===== HEADER ===== */}
      <header className="lp-header">
        <div className="lp-header-inner">
          <img className="lp-logo" src="/logo.png" alt="Grand Capital" />
          <nav className="lp-nav">
            <a href="#trade">Trade</a>
            <a href="#instruments">Instruments</a>
            <a href="#copy">Invest</a>
            <a href="#partners">Partners</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="lp-header-actions">
            <Link to="/trading" className="lp-btn lp-btn-ghost">Log In</Link>
            <Link to="/trading" className="lp-btn lp-btn-primary">Start Trading</Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="lp-hero">
        <video className="lp-hero-video" autoPlay muted loop playsInline preload="auto">
          <source src="https://grandcapital.net/static/img/pages/main/video.mp4" type="video/mp4" />
        </video>
        <div className="lp-hero-overlay" />
        <div className="lp-hero-glow lp-hero-glow-a" />
        <div className="lp-hero-glow lp-hero-glow-b" />

        <div className="lp-hero-inner">
          <div className="lp-badge">19 years of helping traders unlock their potential</div>
          <h1>Increase your income with our platform</h1>
          <p className="lp-hero-sub">Demo or Live — get started in minutes.</p>
          <div className="lp-hero-actions">
            <Link to="/trading" className="lp-btn lp-btn-white">Open Free Demo</Link>
            <Link to="/trading" className="lp-btn lp-btn-outline-light">Start Trading Now</Link>
          </div>

          <div className="lp-hero-stats">
            <div className="lp-hero-stat"><strong>500+</strong><span>Instruments</span></div>
            <div className="lp-hero-stat-sep" />
            <div className="lp-hero-stat"><strong>1,500,000+</strong><span>Clients</span></div>
            <div className="lp-hero-stat-sep" />
            <div className="lp-hero-stat"><strong>19</strong><span>Years in business</span></div>
          </div>
        </div>

        <div className="lp-hero-scroll"><i className="fas fa-chevron-down" /></div>
      </section>

      {/* ===== TRADE / INVEST / MULTIPLY ===== */}
      <section className="lp-section" id="trade">
        <div className="lp-pillars">
          {PILLARS.map((p) => (
            <div className="lp-pillar-card" key={p.key}>
              <div className="lp-pillar-icon"><i className={p.icon} /></div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <Link to="/trading" className="lp-link-cta">Learn more <i className="fas fa-arrow-right" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRADING INSTRUMENTS ===== */}
      <section className="lp-section lp-section-alt" id="instruments">
        <div className="lp-section-head">
          <h2>Trading Instruments</h2>
          <div className="lp-stat-pills">
            <span className="lp-pill"><strong>500+</strong> assets</span>
            <span className="lp-pill"><strong>11</strong> classes</span>
            <span className="lp-pill"><i className="fas fa-user-tie" /> personal manager</span>
          </div>
          <p className="lp-lead">
            We offer a wide range of financial instruments for online trading, putting the market in your hands. Always. Anywhere.
          </p>
          <div className="lp-hero-actions lp-center">
            <Link to="/trading" className="lp-btn lp-btn-outline">All instruments</Link>
            <Link to="/trading" className="lp-btn lp-btn-primary">Start trading</Link>
          </div>
        </div>

        {/* Account type tabs */}
        <div className="lp-tabs">
          {ACCOUNT_TYPES.map((a) => (
            <button
              key={a.key}
              className={`lp-tab ${activeAccount === a.key ? "active" : ""}`}
              onClick={() => setActiveAccount(a.key)}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="lp-account-panel">
          <div className="lp-account-main">
            <h3>{currentAccount.label}</h3>
            <div className="lp-account-tagline">{currentAccount.tagline}</div>
            <p>{currentAccount.description}</p>
            {currentAccount.tags.length > 0 && (
              <div className="lp-tag-row">
                {currentAccount.tags.map((t) => (
                  <span className="lp-tag" key={t}>{t}</span>
                ))}
              </div>
            )}
            <div className="lp-account-sub">{currentAccount.subDescription}</div>
          </div>
          <ul className="lp-feature-list">
            {currentAccount.features.map((f) => (
              <li key={f}><i className="fas fa-check-circle" /> {f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== COPY TRADING ===== */}
      <section className="lp-section" id="copy">
        <div className="lp-split">
          <div className="lp-split-text">
            <div className="lp-toggle-row">
              <button className={`lp-toggle ${copyView === "investors" ? "active" : ""}`} onClick={() => setCopyView("investors")}>for investors</button>
              <button className={`lp-toggle ${copyView === "traders" ? "active" : ""}`} onClick={() => setCopyView("traders")}>for traders</button>
            </div>
            <h2>Copy trading platform</h2>
            <p className="lp-lead">
              Modern investment service combining greater risk control and extensive profit-generating opportunities.
            </p>
            <ul className="lp-check-list">
              <li><i className="fas fa-check-circle" /> A large community of conservative and aggressive traders - the choice is yours</li>
              <li><i className="fas fa-check-circle" /> High returns, low commissions</li>
              <li><i className="fas fa-check-circle" /> Flexible risk management</li>
              <li><i className="fas fa-check-circle" /> Copy multiplier</li>
              <li><i className="fas fa-check-circle" /> Manage your profits</li>
            </ul>
            <div className="lp-hero-actions">
              <Link to="/trading" className="lp-btn lp-btn-outline">See ratings</Link>
              <Link to="/trading" className="lp-btn lp-btn-primary">Copy trades</Link>
            </div>
          </div>
          <div className="lp-split-visual">
            <i className="fas fa-people-arrows" />
          </div>
        </div>
      </section>

      {/* ===== INVESTMENT PORTFOLIO ===== */}
      <section className="lp-section lp-section-alt">
        <div className="lp-split lp-split-reverse">
          <div className="lp-split-visual">
            <i className="fas fa-chart-pie" />
          </div>
          <div className="lp-split-text">
            <h2>Investment portfolio</h2>
            <p className="lp-lead">
              A portfolio is a universal tool suitable both for beginners and experienced traders.
              It allows distributing funds between several instruments and, as a result, to achieve higher profitability.
              The key of success of a portfolio lies in the balance of assets.
            </p>
            <ul className="lp-check-list">
              <li><i className="fas fa-check-circle" /> Invest in blue chips - shares of leading companies</li>
              <li><i className="fas fa-check-circle" /> Capital protection</li>
              <li><i className="fas fa-check-circle" /> A six-year success story</li>
              <li><i className="fas fa-check-circle" /> Flexible margin terms</li>
              <li><i className="fas fa-check-circle" /> Free investment portfolio for our clients</li>
              <li><i className="fas fa-check-circle" /> Assets, chosen by top analysts</li>
            </ul>
            <div className="lp-hero-actions">
              <Link to="/trading" className="lp-btn lp-btn-outline">Ready-made portfolios</Link>
              <Link to="/trading" className="lp-btn lp-btn-primary">Buy shares</Link>
            </div>
          </div>
        </div>

        {/* Stock profitability cards */}
        <div className="lp-stock-grid">
          {STOCKS.map((s) => (
            <div className="lp-stock-card" key={s.symbol}>
              <div className="lp-stock-symbol">{s.symbol}</div>
              <div className="lp-stock-row"><span>Profitability for 12 months</span><strong className="up">{s.y1}</strong></div>
              <div className="lp-stock-row"><span>For the last 5 years</span><strong className="up">{s.y5}</strong></div>
              <div className="lp-stock-row"><span>Since 2023</span><strong className="up">{s.since2023}</strong></div>
              <div className="lp-stock-row"><span>Changes for 2022</span><strong className="down">{s.y2022}</strong></div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AFFILIATE PROGRAM ===== */}
      <section className="lp-section" id="partners">
        <div className="lp-section-head">
          <h2>Grand Capital's affiliate program</h2>
          <div className="lp-stat-pills">
            <span className="lp-pill">three reward models</span>
            <span className="lp-pill">rewards, paid daily</span>
            <span className="lp-pill">multilevel affiliate program</span>
          </div>
          <p className="lp-lead">
            We offer flexible conditions and an individual approach to every partner.
            Join the affiliate program and negotiate your reward model with a personal manager.
          </p>
          <div className="lp-hero-actions lp-center">
            <Link to="/trading" className="lp-btn lp-btn-outline">Learn more</Link>
            <Link to="/trading" className="lp-btn lp-btn-primary">Become a partner</Link>
          </div>
        </div>

        <div className="lp-stats-row">
          <div className="lp-stat"><div className="lp-stat-num">2,762</div><div className="lp-stat-label">Partners</div></div>
          <div className="lp-stat"><div className="lp-stat-num">144</div><div className="lp-stat-label">Countries</div></div>
          <div className="lp-stat"><div className="lp-stat-num">4,328,993 USD</div><div className="lp-stat-label">Paid in the last year</div></div>
        </div>

        <div className="lp-steps">
          <div className="lp-step"><div className="lp-step-icon"><i className="fas fa-user-plus" /></div><div>Acquire customers<br />in any way you can</div></div>
          <i className="fas fa-chevron-right lp-step-arrow" />
          <div className="lp-step"><div className="lp-step-icon"><i className="fas fa-chart-line" /></div><div>Customers trade<br />on our platform</div></div>
          <i className="fas fa-chevron-right lp-step-arrow" />
          <div className="lp-step"><div className="lp-step-icon"><i className="fas fa-hand-holding-usd" /></div><div>You get rewarded<br />for every customer's trade</div></div>
        </div>
      </section>

      {/* ===== COMPANY STATS ===== */}
      <section className="lp-section lp-section-dark">
        <div className="lp-stats-row lp-stats-row-dark">
          <div className="lp-stat"><div className="lp-stat-num">2006</div><div className="lp-stat-label">In business since</div></div>
          <div className="lp-stat"><div className="lp-stat-num">32</div><div className="lp-stat-label">Professional awards</div></div>
          <div className="lp-stat"><div className="lp-stat-num">1,500,000</div><div className="lp-stat-label">Clients</div></div>
        </div>
        <p className="lp-license-note">
          A Licensed broker. License by the Mwali International Services Authority (MISA, Union of the Comoros).
        </p>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="lp-cta-banner">
        <h2>Ready to begin?</h2>
        <Link to="/trading" className="lp-btn lp-btn-white lp-btn-lg">Start Trading Now</Link>
      </section>

      {/* ===== FAQ ===== */}
      <section className="lp-section" id="faq">
        <h2 className="lp-faq-title">Frequently Asked Questions</h2>
        {FAQS.map((group, gi) => (
          <div className="lp-faq-group" key={group.group}>
            <div className="lp-faq-group-title">{group.group}</div>
            {group.items.map((item, ii) => {
              const id = `${gi}-${ii}`;
              const isOpen = openFaq === id;
              return (
                <div className={`lp-faq-item ${isOpen ? "open" : ""}`} key={id}>
                  <button className="lp-faq-question" onClick={() => toggleFaq(id)}>
                    {item.q}
                    <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`} />
                  </button>
                  {isOpen && (
                    <div className="lp-faq-answer">
                      {item.a.map((p, pi) => <p key={pi}>{p}</p>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-links">
            <a href="#terms">Terms and Definitions</a>
            <a href="#risk">Risk disclosure</a>
            <a href="#privacy">Privacy policy</a>
            <a href="#aml">AML and KYC policy</a>
          </div>
        </div>

        <p className="lp-footer-note">
          Risk disclosure: before starting to trade on currency exchange markets, please make sure that you understand the risks connected with leverage trading and that you have a sufficient level of training.
        </p>
        <p className="lp-footer-note">
          Privacy policy describes how the company collects, stores and protects the personal data of clients.
        </p>

        <div className="lp-footer-legal">
          <p>This information is intended for non-US investors who are not citizens of the US or Japan.</p>
          <p>
            Grand Capital Limited is an International Business Company registered in the Seychelles and duly licensed in Comoros. It provides international electronic money brokerage services through access to the MetaQuotes platform.
          </p>
          <p>
            Please note that the information provided on our platform is for informational purposes only and should not be considered legal or financial advice. We endeavor to ensure that our services comply with all applicable regulatory requirements. However, it is the responsibility of users to understand and comply with the laws relevant to their specific jurisdiction. By using our services, you are acknowledging and agreeing to these terms.
          </p>
          <p>
            Please note that Grand Capital does not operate in the United States, Seychelles, Saint Vincent and the Grenadines, Japan, Spain, Italy, France, Germany, Portugal, Denmark, Estonia, Slovenia, Greece, Malaysia and the Russian Federation. If you are a resident of one of these countries, please be aware that using our services would be outside the scope of our Terms and Conditions, and Grand Capital Limited cannot be held responsible for any resulting issues.
          </p>
          <p>Please read Grand Capital's Risk Disclosure statement.</p>
          <p>
            Our services are provided "as is", without any express or implied warranty. For detailed legal and compliance information, please refer to our full legal documentation or consult with a qualified legal advisor.
          </p>
          <p>
            Before you start trading in the currency exchange markets, please make sure that you understand the risks associated with leverage trading and that you have a sufficient level of education. You should not risk more than you are ready to lose.
          </p>
        </div>

        <div className="lp-footer-registration">
          <p>Grand Capital Ltd, registered number: HT01124138,</p>
          <p>Brokerage License No.: BFX2024219 (issued 09/11/2024),</p>
          <p>registered at: Office F2-2A | Second Floor | Oceanic House | Providence Estate, Mahé, Seychelles,</p>
          <p>located at: Office C4-R5, Xvision House, Providence Estate, Mahé, Seychelles,</p>
          <p>licensed and regulated by the Mwali International Services Authority (MISA) under the International Business Companies Act 2014 and the Brokerage Act 2013.</p>
        </div>
      </footer>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const LP_CSS = `
  .lp-root {
    --primary: #0064FA; --primary-dark: #0048c2; --green: #10b981; --red: #ef4444;
    --bg: #ffffff; --bg-light: #f7f8fa; --border: #e5e7eb; --text: #1a1d23; --muted: #6b7280;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    color: var(--text); background: var(--bg); overflow-x: hidden;
  }
  .lp-root * { box-sizing: border-box; }
  .lp-root a { text-decoration: none; color: inherit; }
  .lp-root h1, .lp-root h2, .lp-root h3 { margin: 0; }

  /* Header */
  .lp-header { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
  .lp-header-inner { max-width: 1200px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; gap: 24px; }
  .lp-logo { height: 34px; width: auto; }
  .lp-nav { display: flex; gap: 22px; flex: 1; }
  .lp-nav a { font-size: 14px; font-weight: 600; color: var(--muted); transition: color .15s; }
  .lp-nav a:hover { color: var(--primary); }
  .lp-header-actions { display: flex; gap: 10px; }

  /* Buttons — compounded with .lp-btn so these beat the ".lp-root a { color: inherit }" reset above */
  .lp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 22px; border-radius: 10px; font-weight: 700; font-size: 14px; cursor: pointer; border: none; transition: all .18s; white-space: nowrap; }
  .lp-btn.lp-btn-primary { background: var(--primary); color: #fff; }
  .lp-btn.lp-btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); }
  .lp-btn.lp-btn-ghost { background: transparent; color: var(--text); border: 1.5px solid var(--border); }
  .lp-btn.lp-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
  .lp-btn.lp-btn-outline { background: transparent; color: var(--primary); border: 1.5px solid var(--primary); }
  .lp-btn.lp-btn-outline:hover { background: rgba(0,100,250,0.06); }
  .lp-btn.lp-btn-white { background: #fff; color: var(--primary); }
  .lp-btn.lp-btn-white:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
  .lp-btn.lp-btn-outline-light { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.6); }
  .lp-btn.lp-btn-outline-light:hover { background: rgba(255,255,255,0.12); }
  .lp-btn.lp-btn-lg { padding: 14px 32px; font-size: 16px; }

  /* Hero — full-screen with a looping video background */
  .lp-hero {
    position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0064FA 0%, #003a99 100%); color: #fff;
    padding: 120px 24px 100px; overflow: hidden; text-align: center;
  }
  .lp-hero-video {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    z-index: 0; pointer-events: none;
  }
  .lp-hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(160deg, rgba(0,20,70,0.82) 0%, rgba(0,58,153,0.72) 55%, rgba(0,100,250,0.65) 100%);
  }
  .lp-hero-glow { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .35; pointer-events: none; z-index: 1; }
  .lp-hero-glow-a { width: 420px; height: 420px; background: #4da3ff; top: -160px; left: -100px; }
  .lp-hero-glow-b { width: 380px; height: 380px; background: #7dd3fc; bottom: -180px; right: -80px; }
  .lp-hero-inner { position: relative; z-index: 2; max-width: 820px; margin: 0 auto; }
  .lp-badge { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 6px 16px; border-radius: 30px; font-size: 13px; font-weight: 600; margin-bottom: 22px; backdrop-filter: blur(4px); }
  .lp-hero h1 { font-size: 52px; font-weight: 800; line-height: 1.18; margin-bottom: 18px; text-shadow: 0 4px 24px rgba(0,0,0,0.25); }
  .lp-hero-sub { font-size: 18px; opacity: .95; margin-bottom: 36px; }
  .lp-hero-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .lp-hero-actions.lp-center { margin-top: 24px; }
  .lp-hero-stats { display: flex; align-items: center; justify-content: center; gap: 28px; margin-top: 56px; flex-wrap: wrap; }
  .lp-hero-stat { display: flex; flex-direction: column; gap: 4px; }
  .lp-hero-stat strong { font-size: 26px; font-weight: 800; }
  .lp-hero-stat span { font-size: 12px; color: rgba(255,255,255,0.75); font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
  .lp-hero-stat-sep { width: 1px; height: 34px; background: rgba(255,255,255,0.25); }
  .lp-hero-scroll {
    position: absolute; z-index: 2; bottom: 28px; left: 50%; transform: translateX(-50%);
    color: rgba(255,255,255,0.75); font-size: 18px; animation: lpBounce 2s infinite;
  }
  @keyframes lpBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  /* Sections */
  .lp-section { max-width: 1200px; margin: 0 auto; padding: 80px 24px; }
  .lp-section-alt { background: var(--bg-light); max-width: none; }
  .lp-section-alt > * { max-width: 1200px; margin-left: auto; margin-right: auto; }
  .lp-section-head { text-align: center; max-width: 720px; margin: 0 auto 44px; }
  .lp-section-head h2 { font-size: 32px; font-weight: 800; margin-bottom: 18px; }
  .lp-lead { color: var(--muted); font-size: 15px; line-height: 1.7; }
  .lp-stat-pills { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 18px; }
  .lp-pill { background: #fff; border: 1px solid var(--border); border-radius: 30px; padding: 7px 16px; font-size: 13px; font-weight: 600; color: var(--text); }
  .lp-pill strong { color: var(--primary); margin-right: 4px; }

  /* Pillars (Trade/Invest/Multiply) */
  .lp-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .lp-pillar-card { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 32px 26px; transition: all .2s; }
  .lp-pillar-card:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.08); transform: translateY(-4px); border-color: transparent; }
  .lp-pillar-icon { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #0064FA, #4da3ff); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 18px; }
  .lp-pillar-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 10px; }
  .lp-pillar-card p { color: var(--muted); font-size: 14px; line-height: 1.7; margin-bottom: 16px; }
  .lp-link-cta { color: var(--primary); font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
  .lp-link-cta i { font-size: 12px; transition: transform .15s; }
  .lp-link-cta:hover i { transform: translateX(3px); }

  /* Tabs (account types) */
  .lp-tabs { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
  .lp-tab { padding: 10px 20px; border-radius: 10px; border: 1.5px solid var(--border); background: #fff; color: var(--text); font-weight: 700; font-size: 14px; cursor: pointer; transition: all .15s; }
  .lp-tab:hover { border-color: var(--primary); color: var(--primary); }
  .lp-tab.active { background: var(--primary); border-color: var(--primary); color: #fff; }
  .lp-account-panel { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 34px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 30px; align-items: center; }
  .lp-account-main h3 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
  .lp-account-tagline { color: var(--primary); font-weight: 700; font-size: 14px; margin-bottom: 12px; }
  .lp-account-main p { font-size: 15px; margin-bottom: 12px; }
  .lp-tag-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .lp-tag { background: var(--bg-light); border-radius: 8px; padding: 5px 12px; font-size: 12px; font-weight: 600; color: var(--text); }
  .lp-account-sub { color: var(--muted); font-size: 14px; }
  .lp-feature-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  .lp-feature-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; background: var(--bg-light); border-radius: 10px; padding: 12px 16px; }
  .lp-feature-list i { color: var(--green); }

  /* Split sections (copy trading / portfolio) */
  .lp-split { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 50px; align-items: center; }
  .lp-split-reverse { grid-template-columns: 0.9fr 1.1fr; }
  .lp-split-reverse .lp-split-visual { order: -1; }
  .lp-toggle-row { display: inline-flex; background: var(--bg-light); border-radius: 30px; padding: 4px; margin-bottom: 20px; }
  .lp-toggle { border: none; background: transparent; padding: 8px 18px; border-radius: 26px; font-weight: 700; font-size: 13px; color: var(--muted); cursor: pointer; }
  .lp-toggle.active { background: var(--primary); color: #fff; }
  .lp-split-text h2 { font-size: 30px; font-weight: 800; margin-bottom: 14px; }
  .lp-check-list { list-style: none; margin: 20px 0 26px; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  .lp-check-list li { display: flex; gap: 10px; font-size: 14px; align-items: flex-start; }
  .lp-check-list i { color: var(--green); margin-top: 2px; flex-shrink: 0; }
  .lp-split-visual { aspect-ratio: 1; max-height: 300px; border-radius: 24px; background: linear-gradient(135deg, #0064FA, #4da3ff); display: flex; align-items: center; justify-content: center; }
  .lp-split-visual i { font-size: 90px; color: rgba(255,255,255,0.9); }

  /* Stock cards */
  .lp-stock-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 56px; }
  .lp-stock-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
  .lp-stock-symbol { font-weight: 800; font-size: 15px; margin-bottom: 14px; }
  .lp-stock-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--muted); padding: 7px 0; border-top: 1px solid var(--border); }
  .lp-stock-row:first-of-type { border-top: none; }
  .lp-stock-row strong { font-size: 13px; }
  .lp-stock-row strong.up { color: var(--green); }
  .lp-stock-row strong.down { color: var(--red); }

  /* Stats row */
  .lp-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 760px; margin: 40px auto 0; text-align: center; }
  .lp-stat-num { font-size: 30px; font-weight: 800; color: var(--primary); }
  .lp-stat-label { color: var(--muted); font-size: 13px; margin-top: 4px; }
  .lp-stats-row-dark .lp-stat-num { color: #fff; }
  .lp-stats-row-dark .lp-stat-label { color: rgba(255,255,255,0.7); }

  /* Steps */
  .lp-steps { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 50px; flex-wrap: wrap; }
  .lp-step { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; font-size: 13px; font-weight: 600; max-width: 150px; }
  .lp-step-icon { width: 56px; height: 56px; border-radius: 50%; background: var(--bg-light); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 20px; }
  .lp-step-arrow { color: var(--border); font-size: 18px; }

  /* Dark section */
  .lp-section-dark { background: linear-gradient(135deg, #101a2e, #16213e); color: #fff; text-align: center; padding: 70px 24px; }
  .lp-license-note { color: rgba(255,255,255,0.65); font-size: 13px; margin-top: 30px; max-width: 560px; margin-left: auto; margin-right: auto; }

  /* CTA banner */
  .lp-cta-banner { background: linear-gradient(135deg, #0064FA, #003a99); color: #fff; text-align: center; padding: 64px 24px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
  .lp-cta-banner h2 { font-size: 30px; font-weight: 800; }

  /* FAQ */
  .lp-faq-title { text-align: center; font-size: 30px; font-weight: 800; margin-bottom: 40px; }
  .lp-faq-group { max-width: 820px; margin: 0 auto 36px; }
  .lp-faq-group-title { font-size: 13px; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
  .lp-faq-item { border-bottom: 1px solid var(--border); }
  .lp-faq-question { width: 100%; background: none; border: none; text-align: left; padding: 18px 0; font-size: 15px; font-weight: 700; color: var(--text); cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .lp-faq-question i { color: var(--muted); font-size: 13px; flex-shrink: 0; }
  .lp-faq-item.open .lp-faq-question { color: var(--primary); }
  .lp-faq-answer { padding: 0 0 20px; color: var(--muted); font-size: 14px; line-height: 1.75; display: flex; flex-direction: column; gap: 10px; }

  /* Footer */
  .lp-footer { background: #0d1424; color: rgba(255,255,255,0.6); padding: 50px 24px 40px; font-size: 12px; line-height: 1.7; }
  .lp-footer-top { max-width: 1000px; margin: 0 auto 26px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 16px; padding-bottom: 26px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .lp-footer-links { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; }
  .lp-footer-links a:hover { color: #fff; }
  .lp-footer-note, .lp-footer-legal p, .lp-footer-registration p { max-width: 1000px; margin: 0 auto 10px; }
  .lp-footer-legal { margin-top: 20px; }
  .lp-footer-registration { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }

  /* Responsive */
  @media (max-width: 980px) {
    .lp-nav { display: none; }
    .lp-pillars { grid-template-columns: 1fr; }
    .lp-account-panel { grid-template-columns: 1fr; }
    .lp-split, .lp-split-reverse { grid-template-columns: 1fr; }
    .lp-split-reverse .lp-split-visual { order: 0; }
    .lp-split-visual { max-height: 220px; }
    .lp-stock-grid { grid-template-columns: repeat(2, 1fr); }
    .lp-stats-row { grid-template-columns: 1fr; gap: 30px; }
    .lp-hero { min-height: 92vh; padding: 100px 20px 80px; }
    .lp-hero h1 { font-size: 34px; }
    .lp-hero-stats { gap: 18px; }
    .lp-hero-stat-sep { display: none; }
  }
  @media (max-width: 560px) {
    .lp-stock-grid { grid-template-columns: 1fr; }
    .lp-header-actions .lp-btn-ghost { display: none; }
  }
`;

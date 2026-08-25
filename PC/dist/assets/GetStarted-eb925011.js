import{j as o,n as e,H as c}from"./index-bf9bb85f.js";function d(){const r=[{url:"https://www.icmarkets.com/assets/images/home-banner/mobile-45.webp",content:e.jsxs(e.Fragment,{children:[e.jsxs("h2",{children:["Different arenas.",e.jsx("br",{}),"Same pursuit of excellence."]}),e.jsx("p",{children:"Built for high-performance trading. Official FX Partner of TGR Haas F1 Team."})]})},{url:"https://www.icmarkets.com/assets/images/home-banner/mobile-35.webp",content:e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"100% Bonus on Your First Deposit"}),e.jsx("p",{children:"Plus 50% Extra Every Time You Top Up*."})]})},{url:"https://www.icmarkets.com/assets/images/home-banner/mobile-37.png",content:e.jsxs(e.Fragment,{children:[e.jsx("img",{src:"https://www.icmarkets.com/assets/images/icyourtrade06.png",alt:"IC Your Trade",className:"podcast-logo"}),e.jsx("p",{children:"A new episode every fortnight: tune into uncut conversations with the people transforming the world’s biggest industries."}),e.jsxs("div",{className:"socials",children:[e.jsx("a",{href:"https://www.youtube.com/watch?v=SVDvl3cShK8",target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:"https://www.icmarkets.com/assets/images/youtube.png",alt:"Youtube"})}),e.jsx("a",{href:"https://open.spotify.com/show/2AiLwj7vvsAuw8FOiuz4oL",target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:"https://www.icmarkets.com/assets/images/spotify.png",alt:"Spotify"})}),e.jsx("a",{href:"https://music.amazon.com/podcasts/e60aeba3-a32f-4f3e-99ac-7069a03e8009/ic-your-trade-6",target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:"https://www.icmarkets.com/assets/images/amazonmusic.png",alt:"Amazon Music"})}),e.jsx("a",{href:"https://podcasts.apple.com/au/podcast/ic-your-trade-6/id1569147826",target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:"https://www.icmarkets.com/assets/images/podcast.png",alt:"Apple Podcasts"})})]})]})},{url:"https://www.icmarkets.com/assets/images/home-banner/mobile-34.webp",content:e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"Experience Raw Spread Trading with a Regulated Forex & CFD Broker"}),e.jsx("p",{children:"Trade Indices, Shares, Commodities, and Crypto with lightning-fast execution and deep liquidity across global markets."})]})},{url:"https://www.icmarkets.com/assets/images/home-banner/mobile-40.webp",content:e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"Regional Partner Program"}),e.jsxs("p",{children:["Partner with us to launch your own trading office backed by a global brand.",e.jsx("br",{}),"*Terms and Conditions apply."]})]})}],[a,i]=o.useState(0),n=s=>{i(s)};return e.jsxs("div",{className:"get-started-wrapper",children:[e.jsxs("div",{className:"slider-container",children:[r.map((s,t)=>e.jsx("div",{className:`slide ${t===a?"active":""}`,style:{backgroundImage:`url(${s.url})`},children:e.jsx("div",{className:"overlay",children:e.jsxs("div",{className:"content",children:[s.content,e.jsx(c,{to:"/auth/signin",className:"get-started-btn",children:"Get Started"})]})})},t)),e.jsx("div",{className:"dots",children:r.map((s,t)=>e.jsx("span",{className:`dot ${t===a?"active":""}`,onClick:()=>n(t)},t))})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .get-started-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #000;
        }

        .slider-container {
          position: relative;
          width: 100%;
          
          height: 100vh;
          overflow: hidden;
          margin: 0 auto;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.6s ease-in-out;
          z-index: 0;
        }

        .slide.active {
          opacity: 1;
          z-index: 1;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
        }

        .content {
          max-width: 90%;
          color: white;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        }

        .content h2 {
          font-size: clamp(1.5rem, 6vw, 2.2rem);
          margin-bottom: 1rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .content p {
          font-size: clamp(0.9rem, 4vw, 1.1rem);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        /* Podcast logo image */
        .podcast-logo {
          max-width: 180px;
          width: 80%;
          margin-bottom: 1rem;
        }

        /* Social media icons */
        .socials {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin: 1.5rem 0 0.5rem;
        }

        .socials a {
          display: inline-block;
          transition: transform 0.2s;
        }

        .socials a:hover {
          transform: scale(1.1);
        }

        /* Get Started Button - now applied to Link */
        .get-started-btn {
          background: #36f936;
          color: black;
          border: none;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: transform 0.2s, opacity 0.2s;
          font-family: inherit;
          display: inline-block;    /* Makes Link behave like a button */
          text-decoration: none;    /* Removes underline */
          text-align: center;       /* Centers text */
        }

        .get-started-btn:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }

        /* Dots */
        .dots {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 12px;
          z-index: 10;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dot.active {
          background: #36f936;
          transform: scale(1.2);
        }

        @media (max-width: 400px) {
          .slider-container {
            max-width: 100%;
          }
          .overlay {
            padding: 1rem;
          }
          .get-started-btn {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }
          .socials img {
            width: 32px;
            height: 32px;
          }
        }
      `})]})}export{d as default};

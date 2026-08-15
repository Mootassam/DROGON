import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Tawk.to live chat (inline-embedded into the page)
const TAWK_SRC = 'https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq';
const CONTAINER_ID = 'tawk-embed-container';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

function LiveChat() {
  const history = useHistory();

  useEffect(() => {
    // Fully remove any previous Tawk instance (script, iframes, injected DOM
    // and globals) so a fresh load re-embeds into THIS container. Without this
    // full teardown the chat fails to reappear after navigating away & back.
    const teardown = () => {
      try { document.getElementById('tawk-js')?.remove(); } catch {}
      try {
        document
          .querySelectorAll('iframe[src*="tawk.to"], iframe[title*="chat" i]')
          .forEach((el) => el.remove());
      } catch {}
      try {
        document
          .querySelectorAll('[id^="tawkchat"], [class*="tawk-"], [id^="tawk-bubble"], [id^="tawk-tooltip"]')
          .forEach((el) => { if (el.id !== CONTAINER_ID) el.remove(); });
      } catch {}
      try {
        Object.keys(window).forEach((k) => {
          if (/tawk/i.test(k)) { try { delete (window as any)[k]; } catch { (window as any)[k] = undefined; } }
        });
      } catch {}
    };

    teardown(); // clean slate before (re)loading

    window.Tawk_API = { embedded: CONTAINER_ID } as any;
    window.Tawk_LoadStart = new Date();

    const s = document.createElement('script');
    s.id = 'tawk-js';
    s.async = true;
    s.setAttribute('charset', 'UTF-8');
    s.setAttribute('crossorigin', '*');
    s.src = TAWK_SRC;
    document.body.appendChild(s);

    return teardown;
  }, []);

  return (
    <div className="livechat-container">
      <div className="livechat-header">
        <div className="livechat-back" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left" />
          <span>Back</span>
        </div>
        <div className="livechat-title">Live Support</div>
        <div className="livechat-spacer" />
      </div>

      <div className="livechat-body">
        {/* Tawk.to renders the chat inside this container */}
        <div id={CONTAINER_ID} className="livechat-embed" />
        <div className="livechat-loading">
          <i className="fas fa-comments" />
          <p>Connecting you to support…</p>
        </div>
      </div>

      <style>{`
        .livechat-container {
          max-width: 400px; margin: 0 auto; min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex; flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .livechat-header {
          min-height: 60px; padding: 16px 20px; display: flex; align-items: center;
          justify-content: space-between; color: #fff; flex-shrink: 0;
        }
        .livechat-back { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; cursor: pointer; opacity: .9; }
        .livechat-back:hover { opacity: 1; }
        .livechat-title { font-size: 17px; font-weight: 600; }
        .livechat-spacer { width: 48px; }
        .livechat-body {
          position: relative; flex: 1; background: #fff;
          border-radius: 28px 28px 0 0; overflow: hidden;
        }
        /* The Tawk container fills the white area; its iframe is forced to 100% */
        .livechat-embed { position: absolute; inset: 0; z-index: 2; }
        .livechat-embed iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
        /* Placeholder sits behind the chat until it loads */
        .livechat-loading {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; color: #8a93a2;
        }
        .livechat-loading i { font-size: 44px; color: #106cf5; margin-bottom: 14px; }
        .livechat-loading p { font-size: 15px; }
      `}</style>
    </div>
  );
}

export default LiveChat;

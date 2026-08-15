import { useEffect } from 'react';

// Tawk.to live chat (inline-embedded into the page / modal)
const TAWK_SRC = 'https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq';
const CONTAINER_ID = 'tawk-embed-container';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

function LiveChat() {
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
    <div className="pc-livechat">
      <div id={CONTAINER_ID} className="pc-livechat-embed" />
      <div className="pc-livechat-loading">
        <i className="fas fa-comments" />
        <p>Connecting you to support…</p>
      </div>

      <style>{`
        .pc-livechat {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 560px;
          background: #fff;
        }
        .pc-livechat-embed { position: absolute; inset: 0; z-index: 2; }
        .pc-livechat-embed iframe { width: 100% !important; height: 100% !important; border: 0 !important; }
        .pc-livechat-loading {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; color: #8a93a2;
        }
        .pc-livechat-loading i { font-size: 44px; color: #0064FA; margin-bottom: 14px; }
        .pc-livechat-loading p { font-size: 15px; }
      `}</style>
    </div>
  );
}

export default LiveChat;

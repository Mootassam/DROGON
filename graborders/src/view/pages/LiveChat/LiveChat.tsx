import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import categoryService from 'src/modules/category/categoryService';

// Tawk.to live chat (inline-embedded into the page)
const TAWK_SRC_FALLBACK = 'https://embed.tawk.to/6a299dc55bdfa41c2ccf5d9e/1jqp90jhq';
const CONTAINER_ID = 'tawk-embed-container';
const TAWK_URL_REGEX = /https?:\/\/embed\.tawk\.to\/[\w-]+\/[\w-]+/i;

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

// Admins paste either the raw widget URL or the full Tawk.to embed snippet;
// only ever pull out a same-origin tawk.to URL, never inject pasted markup directly.
function extractTawkSrc(code?: string | null) {
  if (!code) return null;
  const match = String(code).match(TAWK_URL_REGEX);
  return match ? match[0] : null;
}

function whatsAppLink(number: string) {
  const digits = String(number || '').replace(/[^\d]/g, '');
  return `https://wa.me/${digits}`;
}

function telegramLink(number: string) {
  const handle = String(number || '')
    .trim()
    .replace(/^https?:\/\/t\.me\//i, '')
    .replace(/^@/, '');
  return `https://t.me/${handle}`;
}

function LiveChat() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [contactMethod, setContactMethod] = useState<'livechat' | 'category'>('livechat');
  const [tawkSrc, setTawkSrc] = useState(TAWK_SRC_FALLBACK);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const tenantId = AuthCurrentTenant.get();
        const settings = await authAxios
          .get(`/tenant/${tenantId}/settings`)
          .then((response) => response.data);

        if (!mounted) return;

        const method = settings?.contactMethod === 'livechat' ? 'livechat' : 'category';
        setContactMethod(method);

        if (method === 'livechat') {
          setTawkSrc(extractTawkSrc(settings?.liveChatCode) || TAWK_SRC_FALLBACK);
        } else {
          const result = await categoryService.list({ status: 'enable' }, '', 0, 0);
          const rows = (result?.rows || []).filter(
            (row) => row.type === 'whatsApp' || row.type === 'telegram',
          );
          if (mounted) setContacts(rows);
        }
      } catch (error) {
        console.error('Failed to load customer support settings:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading || contactMethod !== 'livechat') {
      return;
    }

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
    s.src = tawkSrc;
    document.body.appendChild(s);

    return teardown;
  }, [loading, contactMethod, tawkSrc]);

  const showLiveChat = !loading && contactMethod === 'livechat';
  const showContacts = !loading && contactMethod === 'category';

  return (
    <div className="livechat-container">
      <div className="livechat-header">
        <div className="livechat-back" onClick={() => history.goBack()}>
          <i className="fas fa-arrow-left" />
          <span>Back</span>
        </div>
        <div className="livechat-title">
          {showContacts ? 'Contact Us' : 'Live Support'}
        </div>
        <div className="livechat-spacer" />
      </div>

      <div className="livechat-body">
        {showContacts ? (
          <div className="contact-options">
            {contacts.length === 0 && (
              <p className="contact-options-empty">
                No contact options are available right now.
              </p>
            )}

            {contacts.map((contact) => (
              <a
                key={contact.id}
                href={
                  contact.type === 'whatsApp'
                    ? whatsAppLink(contact.number)
                    : telegramLink(contact.number)
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-option contact-option-${contact.type}`}
              >
                <i
                  className={
                    contact.type === 'whatsApp'
                      ? 'fab fa-whatsapp'
                      : 'fab fa-telegram-plane'
                  }
                />
                <span>
                  {contact.name ||
                    (contact.type === 'whatsApp' ? 'WhatsApp' : 'Telegram')}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <>
            {/* Tawk.to renders the chat inside this container */}
            <div id={CONTAINER_ID} className="livechat-embed" />
            <div className="livechat-loading">
              <i className="fas fa-comments" />
              <p>Connecting you to support…</p>
            </div>
          </>
        )}
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

        .contact-options {
          padding: 28px 20px; display: flex; flex-direction: column; gap: 14px;
        }
        .contact-options-empty {
          text-align: center; color: #8a93a2; margin-top: 40px;
        }
        .contact-option {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 16px; text-decoration: none;
          font-size: 16px; font-weight: 600; color: #fff;
        }
        .contact-option i { font-size: 26px; }
        .contact-option-whatsApp { background: #25d366; }
        .contact-option-telegram { background: #229ed9; }
      `}</style>
    </div>
  );
}

export default LiveChat;

// ── In-memory OTP store ──────────────────────────────────────────────────────
// Short-lived email verification codes for signup. Codes expire after 5 minutes.
// (In-memory is fine for OTP: codes are short-lived and a server restart simply
//  forces the user to request a new code.)

interface OtpRecord {
  code: string;
  expiresAt: number;
  verified: boolean;
  attempts: number;
}

const store = new Map<string, OtpRecord>();
const TTL_MS = 5 * 60 * 1000; // 5 minutes

function key(email: string): string {
  return String(email || '').trim().toLowerCase();
}

export const otpStore = {
  set(email: string, code: string) {
    store.set(key(email), { code, expiresAt: Date.now() + TTL_MS, verified: false, attempts: 0 });
  },
  get(email: string): OtpRecord | undefined {
    return store.get(key(email));
  },
  markVerified(email: string) {
    const rec = store.get(key(email));
    if (rec) rec.verified = true;
  },
  isVerified(email: string): boolean {
    const rec = store.get(key(email));
    return !!rec && rec.verified && Date.now() <= rec.expiresAt;
  },
  delete(email: string) {
    store.delete(key(email));
  },
};

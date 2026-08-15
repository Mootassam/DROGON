import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthService from 'src/modules/auth/authService';
import { i18n } from '../../../i18n';

interface Props {
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

/**
 * Desktop login / register modal.
 * Mirrors the inputs + functions of the mobile Signin.tsx and Signup.tsx:
 *   • Login:    email, password, rememberMe, "Login to Demo Account"
 *   • Register: email (with OTP email verification), phone, password, confirm
 * Uses the exact same auth actions (doSigninWithEmailAndPassword,
 * doRegisterEmailAndPassword, doDemoLogin, doClearErrorMessage).
 */
export default function PcAuthModal({ initialMode = 'login', onClose }: Props) {
  const dispatch = useDispatch();
  const loading  = useSelector(authSelectors.selectLoading);
  const errorMsg = useSelector(authSelectors.selectErrorMessage);

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // ── Sign-in fields ───────────────────────────────────────────────────────
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [rememberMe, setRemember] = useState(true);

  // ── Sign-up extra fields ──────────────────────────────────────────────────
  const [phone, setPhone]               = useState('');
  const [confirmPassword, setConfirm]   = useState('');
  const [localError, setLocalError]     = useState<string | null>(null);

  // ── OTP email verification ──
  const [otp, setOtp]               = useState('');
  const [otpSent, setOtpSent]       = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying]   = useState(false);
  const [otpInfo, setOtpInfo]       = useState<string | null>(null);

  useEffect(() => {
    dispatch(authActions.doClearErrorMessage());
  }, [dispatch]);

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setLocalError(null);
    setOtpInfo(null);
    dispatch(authActions.doClearErrorMessage());
  };

  const handleSendOtp = useCallback(async () => {
    setLocalError(null); setOtpInfo(null);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setLocalError('Please enter a valid email address first.'); return; }
    setSendingOtp(true);
    try {
      await AuthService.sendOtp(email);
      setOtpSent(true); setOtpVerified(false); setOtp('');
      setOtpInfo('We sent a 6-digit code to your email.');
    } catch (err: any) {
      setLocalError(err?.response?.data?.errors?.[0]?.message || 'Failed to send code. Try again.');
    } finally { setSendingOtp(false); }
  }, [email]);

  const handleVerifyOtp = useCallback(async () => {
    setLocalError(null); setOtpInfo(null);
    if (!otp || otp.length < 4) { setLocalError('Enter the code from your email.'); return; }
    setVerifying(true);
    try {
      await AuthService.verifyOtp(email, otp);
      setOtpVerified(true); setOtpInfo('Email verified ✓');
    } catch (err: any) {
      setOtpVerified(false);
      setLocalError(err?.response?.data?.errors?.[0]?.message || 'Invalid code.');
    } finally { setVerifying(false); }
  }, [email, otp]);

  // ── Submit handlers (same actions as mobile) ──────────────────────────────
  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email || !password) { setLocalError(i18n('pc.emailPwRequired')); return; }
    dispatch(authActions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const submitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email || !password || !phone) { setLocalError(i18n('pc.fillRequired')); return; }
    if (password.length < 8) { setLocalError(i18n('pc.pwMin')); return; }
    if (password !== confirmPassword) { setLocalError(i18n('pc.pwMismatch')); return; }
    if (!otpVerified) { setLocalError('Please verify your email before signing up.'); return; }
    dispatch(authActions.doRegisterEmailAndPassword(email, password, phone));
  };

  const onDemoLogin = () => dispatch(authActions.doDemoLogin());

  const shownError = localError || errorMsg;

  return (
    <div className="pc-modal-overlay" onClick={onClose}>
      <div className="pc-auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pc-modal-x" onClick={onClose}>✕</button>

        <div className="pc-auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>{i18n('pc.login')}</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>{i18n('pc.register')}</button>
        </div>

        {shownError && <div className="pc-auth-error">{shownError}</div>}
        {!shownError && otpInfo && <div className="pc-auth-ok">{otpInfo}</div>}

        {mode === 'login' ? (
          <form className="pc-auth-form" onSubmit={submitLogin}>
            <label>{i18n('pc.email')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus />

            <label>{i18n('pc.password')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />

            <div className="pc-auth-remember">
              <label><input type="checkbox" checked={rememberMe} onChange={(e) => setRemember(e.target.checked)} /> {i18n('pc.rememberMe')}</label>
            </div>

            <button type="submit" className="pc-auth-submit" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> {i18n('pc.signingIn')}</> : i18n('pc.login')}
            </button>

            <button type="button" className="pc-auth-demo" onClick={onDemoLogin} disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> {i18n('pc.loading')}</> : i18n('pc.demoLogin')}
            </button>
          </form>
        ) : (
          <form className="pc-auth-form" onSubmit={submitRegister}>
            <label>{i18n('pc.email')}</label>
            <div className="pc-otp-email-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus />
              <button type="button" className="pc-otp-send" onClick={handleSendOtp} disabled={sendingOtp || otpVerified}>
                {otpVerified ? 'Verified' : sendingOtp ? 'Sending…' : otpSent ? 'Resend' : 'Send Code'}
              </button>
            </div>

            {otpSent && (
              <>
                <label>Email Verification Code</label>
                <div className="pc-otp-code-row">
                  <input
                    type="text" inputMode="numeric" maxLength={6}
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/[^0-9]/g, '')); setOtpVerified(false); }}
                    placeholder="6-digit code" disabled={otpVerified}
                  />
                  <button type="button" className="pc-otp-verify" onClick={handleVerifyOtp} disabled={verifying || otpVerified}>
                    {otpVerified ? '✓' : verifying ? '…' : 'Verify'}
                  </button>
                </div>
              </>
            )}

            <label>{i18n('pc.phone')}</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={i18n('pc.phone')} autoComplete="tel" />

            <label>{i18n('pc.password')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={i18n('pc.passwordHint')} autoComplete="new-password" />

            <label>{i18n('pc.confirmPassword')}</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} placeholder={i18n('pc.reenterPassword')} autoComplete="new-password" />

            <button type="submit" className="pc-auth-submit" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin" /> {i18n('pc.creatingAccount')}</> : i18n('pc.createAccount')}
            </button>
          </form>
        )}

        <div className="pc-auth-switch">
          {mode === 'login' ? (
            <span>{i18n('pc.noAccount')} <a onClick={() => switchMode('register')}>{i18n('pc.register')}</a></span>
          ) : (
            <span>{i18n('pc.haveAccount')} <a onClick={() => switchMode('login')}>{i18n('pc.login')}</a></span>
          )}
        </div>
      </div>

      <style>{`
        .pc-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
        }
        .pc-auth-modal {
          background: #fff; border-radius: 16px; width: 400px; max-width: 92vw;
          padding: 28px; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          max-height: 92vh; overflow-y: auto;
        }
        .pc-modal-x { position: absolute; top: 14px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; }
        .pc-auth-tabs { display: flex; gap: 8px; margin-bottom: 18px; }
        .pc-auth-tabs button { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; background: #f0f2f5; color: #6b7280; font-weight: 600; font-size: 14px; }
        .pc-auth-tabs button.active { background: #0064FA; color: #fff; }
        .pc-auth-form { display: flex; flex-direction: column; gap: 5px; }
        .pc-auth-form label { font-size: 12px; color: #6b7280; font-weight: 600; margin-top: 8px; }
        .pc-auth-form input[type=email], .pc-auth-form input[type=password], .pc-auth-form input[type=tel], .pc-auth-form input[type=text] {
          padding: 11px 13px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: border-color .15s; width: 100%;
        }
        .pc-auth-form input:focus { border-color: #0064FA; }
        .pc-auth-remember { margin-top: 10px; font-size: 13px; color: #6b7280; }
        .pc-auth-remember label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        /* OTP email verification */
        .pc-otp-email-row, .pc-otp-code-row { display: flex; gap: 8px; align-items: stretch; }
        .pc-otp-email-row input, .pc-otp-code-row input { flex: 1; }
        .pc-otp-code-row input { letter-spacing: 4px; font-weight: 700; }
        .pc-otp-send, .pc-otp-verify {
          flex: 0 0 auto; padding: 0 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap;
        }
        .pc-otp-send { border: none; background: #0064FA; color: #fff; }
        .pc-otp-send:hover:not(:disabled) { background: #0052d4; }
        .pc-otp-verify { border: 1.5px solid #0064FA; background: #fff; color: #0064FA; }
        .pc-otp-verify:hover:not(:disabled) { background: #e8f0ff; }
        .pc-otp-send:disabled, .pc-otp-verify:disabled { opacity: .6; cursor: default; }
        .pc-auth-error { color: #dc2626; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
        .pc-auth-ok { color: #15803d; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; }
        .pc-auth-submit { margin-top: 16px; padding: 13px; border: none; border-radius: 10px; background: #0064FA; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pc-auth-submit:disabled { opacity: .6; cursor: default; }
        .pc-auth-demo { margin-top: 10px; padding: 12px; border: 1.5px solid #0064FA; border-radius: 10px; background: #fff; color: #0064FA; font-weight: 700; font-size: 14px; cursor: pointer; }
        .pc-auth-demo:hover:not(:disabled) { background: #e8f0ff; }
        .pc-auth-demo:disabled { opacity: .6; cursor: default; }
        .pc-auth-switch { text-align: center; margin-top: 16px; font-size: 13px; color: #6b7280; }
        .pc-auth-switch a { color: #0064FA; cursor: pointer; font-weight: 600; }
      `}</style>
    </div>
  );
}

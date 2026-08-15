import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local imports
import actions from "src/modules/auth/authActions";
import AuthService from "src/modules/auth/authService";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectors.selectLoading);
  const errorMessage = useSelector(selectors.selectErrorMessage);

  // ── OTP email verification state ──
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpInfo, setOtpInfo] = useState<string | null>(null);

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  // Validation schema (captcha removed → replaced by email OTP)
  const schema = yup.object().shape({
    email: yupFormSchemas.string(i18n("pages.signup.labels.email"), {
      required: true,
    }),
    password: yupFormSchemas.string(i18n("pages.signup.labels.password"), {
      required: true,
      min: 8,
    }),
    newPasswordConfirmation: yupFormSchemas
      .string(i18n("pages.signup.labels.confirmPassword"), {
        required: true,
      })
      .oneOf(
        [yup.ref("password"), null],
        i18n("auth.passwordChange.mustMatch")
      ),
    phoneNumber: yupFormSchemas.string(i18n("pages.signup.labels.phoneNumber"), {
      required: true,
    }),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      newPasswordConfirmation: "",
      phoneNumber: "",
    },
  });

  // Send the OTP code to the entered email
  const handleSendOtp = useCallback(async () => {
    setOtpError(null);
    setOtpInfo(null);
    const email = String(form.getValues("email") || "").trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setOtpError("Please enter a valid email address first.");
      return;
    }
    setSendingOtp(true);
    try {
      await AuthService.sendOtp(email);
      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setOtpInfo("We sent a 6-digit code to your email.");
    } catch (e: any) {
      setOtpError(e?.response?.data?.errors?.[0]?.message || "Failed to send code. Try again.");
    } finally {
      setSendingOtp(false);
    }
  }, [form]);

  // Verify the entered OTP
  const handleVerifyOtp = useCallback(async () => {
    setOtpError(null);
    setOtpInfo(null);
    const email = String(form.getValues("email") || "").trim();
    if (!otp || otp.length < 4) {
      setOtpError("Enter the code from your email.");
      return;
    }
    setVerifying(true);
    try {
      await AuthService.verifyOtp(email, otp);
      setOtpVerified(true);
      setOtpInfo("Email verified ✓");
    } catch (e: any) {
      setOtpVerified(false);
      setOtpError(e?.response?.data?.errors?.[0]?.message || "Invalid code.");
    } finally {
      setVerifying(false);
    }
  }, [form, otp]);

  const onSubmit = useCallback(
    async (data) => {
      const { email, password, phoneNumber } = data;
      if (!otpVerified) {
        setOtpError("Please verify your email before signing up.");
        return;
      }
      dispatch(
        actions.doRegisterEmailAndPassword(email, password, phoneNumber)
      );
    },
    [dispatch, otpVerified]
  );

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="signup-container">
      {/* ── Header (blue gradient, like Market/Futures) ── */}
      <div className="signup-header">
        <div className="header-left" onClick={goBack}>
          <i className="fas fa-arrow-left" />
          <span>Back</span>
        </div>
        <div className="header-title">Create Account</div>
        <div className="header-right" /> {/* Spacer to help centre the title */}
      </div>

      {/* ── White content card ── */}
      <div className="signup-card">
        <div className="form-heading">Create your account</div>

        <FormProvider {...form}>
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email + Send Code */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.email")}</label>
              <div className="otp-email-row">
                <div style={{ flex: 1 }}>
                  <InputFormItem
                    type="email"
                    name="email"
                    placeholder={i18n("pages.signup.placeholders.email")}
                    className="input-field"
                    externalErrorMessage={null}
                    autoComplete="email"
                  />
                </div>
                <button
                  type="button"
                  className="otp-send-btn"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || otpVerified}
                >
                  {otpVerified ? "Verified" : sendingOtp ? "Sending…" : otpSent ? "Resend" : "Send Code"}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.phoneNumber")}</label>
              <InputFormItem
                type="tel"
                name="phoneNumber"
                placeholder={i18n("pages.signup.placeholders.phoneNumber")}
                className="input-field"
                autoComplete="tel"
              />
            </div>

            {/* Email OTP code */}
            {otpSent && (
              <div className="form-group">
                <label className="form-label">Email Verification Code</label>
                <div className="otp-code-row">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/[^0-9]/g, "")); setOtpVerified(false); }}
                    placeholder="6-digit code"
                    className="input-field otp-code-input"
                    disabled={otpVerified}
                  />
                  <button
                    type="button"
                    className="otp-verify-btn"
                    onClick={handleVerifyOtp}
                    disabled={verifying || otpVerified}
                  >
                    {otpVerified ? "✓" : verifying ? "…" : "Verify"}
                  </button>
                </div>
              </div>
            )}

            {otpError && <div className="otp-msg otp-msg-err">{otpError}</div>}
            {otpInfo && <div className="otp-msg otp-msg-ok">{otpInfo}</div>}

            {/* Password */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.password")}</label>
              <InputFormItem
                type="password"
                name="password"
                placeholder={i18n("pages.signup.placeholders.password")}
                className="input-field"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">{i18n("pages.signup.labels.confirmPassword")}</label>
              <InputFormItem
                type="password"
                name="newPasswordConfirmation"
                placeholder={i18n("pages.signup.placeholders.confirmPassword")}
                className="input-field"
                autoComplete="new-password"
              />
            </div>

            {/* Sign Up Button */}
            <button
              className="signup-button"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                  {i18n("pages.signup.creatingAccount")}
                </span>
              ) : (
                <span>{i18n("pages.signup.createAccount")}</span>
              )}
            </button>

            {/* Already have an account */}
            <div className="login-link">
              <Link to="/auth/signin">{i18n("pages.signup.alreadyHaveAccount")}</Link>
            </div>
          </form>
        </FormProvider>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .signup-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .signup-header {
          background: transparent;
          min-height: 60px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-left:hover {
          opacity: 1;
        }
        .header-left i {
          font-size: 16px;
        }

        .header-title {
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .header-right {
          width: 60px; /* to balance the layout */
        }

        /* ── White content card ── */
        .signup-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .form-heading {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 6px;
        }

        .input-field {
          background-color: #ffffff;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 46px;
          width: 100%;
          padding: 0 14px;
          color: #1a1a1a;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: 0.2s;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .input-field::placeholder {
          color: #aaa;
        }

        .captcha-wrapper {
          display: flex;
          gap: 10px;
        }

        .captcha-display {
          background-color: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          cursor: pointer;
          flex: 1;
          transition: 0.2s;
        }
        .captcha-display:hover {
          border-color: #106cf5;
          background-color: #e6efff;
        }

        .captcha-text {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #1a1a1a;
          user-select: none;
        }

        .captcha-refresh {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #106cf5;
          font-size: 12px;
          font-weight: 500;
        }

        .captcha-input {
          flex: 0 0 120px;
        }

        /* ── OTP email verification ── */
        .otp-email-row { display: flex; gap: 8px; align-items: flex-start; }
        .otp-send-btn {
          flex: 0 0 auto; height: 48px; padding: 0 14px; border: none; border-radius: 8px;
          background: #106cf5; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer;
          white-space: nowrap; transition: 0.2s;
        }
        .otp-send-btn:hover:not(:disabled) { background: #0a4fc4; }
        .otp-send-btn:disabled { opacity: 0.6; cursor: default; }
        .otp-code-row { display: flex; gap: 8px; }
        .otp-code-input { flex: 1; letter-spacing: 4px; font-weight: 700; }
        .otp-verify-btn {
          flex: 0 0 auto; height: 48px; padding: 0 18px; border: 1px solid #106cf5; border-radius: 8px;
          background: #fff; color: #106cf5; font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s;
        }
        .otp-verify-btn:hover:not(:disabled) { background: #e6efff; }
        .otp-verify-btn:disabled { opacity: 0.6; cursor: default; }
        .otp-msg { font-size: 13px; margin: -6px 0 14px; padding: 8px 12px; border-radius: 8px; }
        .otp-msg-err { color: #cc0000; background: #fff5f5; border: 1px solid #ffcccc; }
        .otp-msg-ok  { color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; }

        .signup-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin: 20px 0 16px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
        }
        .signup-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-link {
          text-align: right;
        }
        .login-link a {
          color: #106cf5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }
        .login-link a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: #ff4d4d;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px 12px;
          background-color: #fff5f5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #ffcccc;
        }
      `}</style>
    </div>
  );
}

export default Signup;
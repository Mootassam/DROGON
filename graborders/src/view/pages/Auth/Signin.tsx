import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import actions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import I18nSelect from "src/view/layout/I18nSelect";
import { i18n } from "../../../i18n";

const schema = yup.object().shape({
  email: yupFormSchemas
    .string(i18n("user.fields.username"), { required: true })
    .email(i18n("validation.email")),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
    min: 6,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const onDemoLogin = () => {
    dispatch(actions.doDemoLogin());
  };

  const goBack = () => {
    history.goBack();
  };

  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  return (
    <div className="signin-container">
      {/* ── Blue gradient header with back button, title, and globe ── */}
      <div className="signin-header">
        <div className="header-left" onClick={goBack}>
          <i className="fas fa-arrow-left" />
          <span>Back</span>
        </div>
        <div className="header-title">Sign In</div>
        <div className="header-right" onClick={openLanguageModal}>
          <i className="fas fa-globe" />
        </div>
      </div>

      {/* ── White content card ── */}
      <div className="signin-card">
        <div className="logo-container">
          <img
            className="logo-img"
            src="/logo.png"
            alt="FXCC Logo"
          />
        </div>

        <div className="form-heading">Sign in to Secure Client Area</div>

        <FormProvider {...form}>
          {externalErrorMessage && (
            <div className="error-message">{externalErrorMessage}</div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              type="email"
              name="email"
              placeholder={i18n("auth.fields.emailPlaceholder")}
              className="input-field"
            />
            <InputFormItem
              type="password"
              name="password"
              placeholder={i18n("auth.fields.passwordPlaceholder")}
              className="input-field"
              autoComplete="current-password"
            />

            <div className="forgot-link">
              <Link to="/online-service">
                {i18n("auth.signin.forgetPassword")}
              </Link>
            </div>

            <button className="login-button" disabled={loading} type="submit">
              {loading ? (
                <>
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ marginRight: "8px" }}
                  ></i>
                  {i18n("auth.signin.signingIn")}
                </>
              ) : (
                i18n("auth.signin.button")
              )}
            </button>

            <button
              className="demo-login-button"
              onClick={onDemoLogin}
              disabled={loading}
              type="button"
            >
              {loading ? (
                <>
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Loading...
                </>
              ) : (
                "Login to Demo Account"
              )}
            </button>
          </form>
        </FormProvider>

        <Link to="/auth/signup" className="bottom-text">
          <p>Don&apos;t have an account?</p>
        </Link>
      </div>

      {/* Language Modal – unchanged style but now sits above white card */}
      {isLanguageModalOpen && (
        <div className="modal-overlay" onClick={closeLanguageModal}>
          <div
            className="modal-container-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-bottom">
              <div className="modal-drag-handle"></div>
              <div className="modal-title-wrapper">
                <div className="modal-title">
                  {i18n("auth.common.selectLanguage")}
                </div>
                <button
                  className="modal-close-btn-bottom"
                  onClick={closeLanguageModal}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="modal-content-bottom">
              <I18nSelect isInModal={true} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .signin-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .signin-header {
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
        }

        .header-right {
          font-size: 18px;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-right:hover {
          opacity: 1;
        }

        /* ── White content card ── */
        .signin-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .logo-img {
          height: 36px;
          width: auto;
        }

        .form-heading {
          text-align: center;
          font-size: 15px;
          color: #555;
          margin-bottom: 28px;
          font-weight: 500;
        }

        .input-field {
          background-color: #ffffff;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 48px;
          width: 100%;
          padding: 0 14px;
          color: #1a1a1a;
          font-size: 14px;
          outline: none;
          margin-bottom: 14px;
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

        .forgot-link {
          text-align: right;
          margin-bottom: 20px;
        }
        .forgot-link a {
          color: #106cf5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }

        .login-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 18px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
        }
        .login-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .demo-login-button {
          background: white;
          color: #106cf5;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: 1px solid #106cf5;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: inherit;
        }
        .demo-login-button:hover {
          background: #e6efff;
          border-color: #0a4fc4;
          color: #0a4fc4;
          transform: translateY(-1px);
        }
        .demo-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .bottom-text {
          text-align: center;
          font-size: 14px;
          color: #777;
          text-decoration: none;
          display: block;
          margin-top: 10px;
        }
        .bottom-text p {
          margin: 5px 0;
        }
        .bottom-text:hover p {
          color: #106cf5;
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

        /* ── Language Modal (bottom sheet, light) ── */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container-bottom {
          background-color: #ffffff;
          width: 100%;
          max-width: 400px;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 20px 16px 24px;
          box-sizing: border-box;
          color: #1a1a1a;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }
        .modal-header-bottom {
          margin-bottom: 16px;
        }
        .modal-drag-handle {
          width: 36px;
          height: 4px;
          background-color: #d1d5db;
          border-radius: 2px;
          margin: 0 auto 14px;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 17px;
          font-weight: 700;
        }
        .modal-close-btn-bottom {
          background: none;
          border: none;
          color: #777;
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: 0.2s;
        }
        .modal-close-btn-bottom:hover {
          background: #f0f2f5;
          color: #1a1a1a;
        }
        .modal-content-bottom {
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

export default Signin;
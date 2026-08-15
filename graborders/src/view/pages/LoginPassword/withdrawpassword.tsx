
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import actions from "src/modules/auth/authActions";
import FieldFormItem from "src/shared/form/fieldFormItem";

function WithdrawPassword() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const loading = useSelector(authSelectors.selectLoadingPasswordChange);

  const hasWithdrawPassword = !!currentUser?.withdrawPassword;

  const schema = useMemo(() => {
    const passwordFields = {
      newPassword: yupFormSchemas.string(
        i18n("pages.withdrawPassword.fields.newPassword"),
        { required: true }
      ),
      newPasswordConfirmation: yupFormSchemas
        .string(i18n("pages.withdrawPassword.fields.newPasswordConfirmation"), {
          required: true,
        })
        .oneOf(
          [yup.ref("newPassword"), null],
          i18n("pages.withdrawPassword.validation.mustMatch")
        ),
    };

    if (hasWithdrawPassword) {
      return yup.object().shape({
        oldPassword: yupFormSchemas.string(
          i18n("pages.withdrawPassword.fields.oldPassword"),
          { required: true }
        ),
        ...passwordFields,
      });
    }

    return yup.object().shape(passwordFields);
  }, [hasWithdrawPassword]);

  const [initialValues] = useState(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(
      actions.doChangeWithdrawalPassword(
        hasWithdrawPassword ? values.oldPassword : undefined,
        values.newPassword
      )
    );
  };

  const pageTitle = hasWithdrawPassword
    ? "Change Withdraw Password"
    : "Set a new Withdraw Password";

  return (
    <div className="withdrawpassword-container">
      <div className="header">
        <div className="nav-bar">
          <Link to="/passwordtype" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{pageTitle}</div>
        </div>
      </div>

      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="password-form">
              {hasWithdrawPassword && (
                <div className="form-group">
                  <FieldFormItem
                    name="oldPassword"
                    type="password"
                    label={i18n("pages.withdrawPassword.fields.oldPassword")}
                    className="form-input"
                    className1="form-group-inner"
                    className2="form-label"
                    className3="password-input-container"
                    placeholder={i18n("pages.withdrawPassword.placeholders.oldPassword")}
                  />
                </div>
              )}

              <div className="form-group">
                <FieldFormItem
                  name="newPassword"
                  type="password"
                  label={
                    hasWithdrawPassword
                      ? i18n("pages.withdrawPassword.fields.newPassword")
                      : "New Withdraw Password"
                  }
                  className="form-input"
                  className1="form-group-inner"
                  className2="form-label"
                  className3="password-input-container"
                  placeholder={i18n("pages.withdrawPassword.placeholders.newPassword")}
                />
              </div>

              <div className="form-group">
                <FieldFormItem
                  name="newPasswordConfirmation"
                  type="password"
                  label={
                    hasWithdrawPassword
                      ? i18n("pages.withdrawPassword.fields.newPasswordConfirmation")
                      : "Confirm New Withdraw Password"
                  }
                  className="form-input"
                  className1="form-group-inner"
                  className2="form-label"
                  className3="password-input-container"
                  placeholder={i18n("pages.withdrawPassword.placeholders.confirmPassword")}
                />
              </div>

              <button
                type="submit"
                className="save-button"
                disabled={loading}
              >
                {loading
                  ? "..."
                  : hasWithdrawPassword
                  ? i18n("pages.withdrawPassword.buttons.saveChanges")
                  : i18n("pages.withdrawPassword.buttons.setPassword")}
              </button>

              {hasWithdrawPassword ? (
                <div className="warning-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {i18n("pages.withdrawPassword.warningMessage")}
                </div>
              ) : (
                <div className="info-message">
                  <i className="fas fa-info-circle"></i>
                  {i18n("pages.withdrawPassword.infoMessage")}
                </div>
              )}
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

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .withdrawpassword-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .password-form {
          width: 100%;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 16px;
          width: 100%;
        }

        .form-group-inner {
          width: 100%;
        }

        .form-label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .password-input-container {
          width: 100%;
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          font-size: 12px;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
          color: #333;
          height: 40px;
        }

        .form-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .form-input::placeholder {
          color: #aaa;
          font-size: 12px;
        }

        .save-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          margin-bottom: 16px;
        }

        .save-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .save-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .save-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .warning-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 8px;
          font-size: 12px;
          color: #ff7a00;
          line-height: 1.4;
        }

        .info-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #e8f0fe;
          border: 1px solid #b3cffe;
          border-radius: 8px;
          font-size: 12px;
          color: #1a56db;
          line-height: 1.4;
        }

        .warning-message i,
        .info-message i {
          font-size: 14px;
          flex-shrink: 0;
        }

        .form-input.error {
          border-color: #f44336;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
        }

        .error-message {
          font-size: 11px;
          color: #f44336;
          margin-top: 4px;
          display: block;
        }

        @media (max-width: 380px) {
          .withdrawpassword-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .form-input {
            padding: 6px 10px;
            height: 38px;
            font-size: 11px;
          }

          .save-button {
            padding: 10px;
            font-size: 13px;
          }

          .warning-message,
          .info-message {
            font-size: 11px;
            padding: 10px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `}</style>
    </div>
  );
}

export default WithdrawPassword;

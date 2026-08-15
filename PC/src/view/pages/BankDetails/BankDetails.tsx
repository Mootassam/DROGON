import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import actions from "src/modules/user/form/userFormActions";
import authActions from "src/modules/auth/authActions";

const schema = yup.object().shape({
  accountHolder: yupFormSchemas.string(i18n("entities.transaction.fields.accountHolder"), {
    required: true,
  }),
  ibanNumber: yupFormSchemas.string(i18n("entities.transaction.fields.ibanNumber"), {
    required: true,
  }),
  bankName: yupFormSchemas.string(i18n("entities.transaction.fields.bankName"), {
    required: true,
  }),
  ifscCode: yupFormSchemas.string(i18n("entities.transaction.fields.ifscCode"), {
    required: true,
  }),
});

function BankDetails() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  const refreshItems = useCallback(async () => {
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  const onSubmit = async ({ accountHolder, ibanNumber, bankName, ifscCode }) => {
    const values = {
      accountHolder,
      ibanNumber,
      bankName,
      ifscCode,
    };
    await dispatch(actions.doUpdateBank(values));
    await refreshItems();
  };

  const initialValues = {
    accountHolder: currentUser?.accountHolder || "",
    ibanNumber: currentUser?.ibanNumber || "",
    bankName: currentUser?.bankName || "",
    ifscCode: currentUser?.ifscCode || "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  return (
    <div className="bank-details-container">
      {/* Header Section – identical to LoginPassword */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.bankDetails.title")}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bank-form">
              {/* Account Holder */}
              <div className="form-group">
                <label className="form-label">
                  <span className="required-star">*</span>
                  {i18n("entities.transaction.fields.accountHolder")}
                </label>
                <InputFormItem
                  type="text"
                  name="accountHolder"
                  placeholder={i18n("entities.transaction.fields.accountHolder")}
                  className="form-input"
                />
              </div>

              {/* IBAN Number */}
              <div className="form-group">
                <label className="form-label">
                  <span className="required-star">*</span>
                  {i18n("entities.transaction.fields.ibanNumber")}
                </label>
                <InputFormItem
                  type="text"
                  name="ibanNumber"
                  placeholder={i18n("entities.transaction.fields.ibanNumber")}
                  className="form-input"
                />
              </div>

              {/* Bank Name */}
              <div className="form-group">
                <label className="form-label">
                  <span className="required-star">*</span>
                  {i18n("entities.transaction.fields.bankName")}
                </label>
                <InputFormItem
                  type="text"
                  name="bankName"
                  placeholder={i18n("entities.transaction.fields.bankName")}
                  className="form-input"
                />
              </div>

              {/* IFSC Code */}
              <div className="form-group">
                <label className="form-label">
                  <span className="required-star">*</span>
                  {i18n("entities.transaction.fields.ifscCode")}
                </label>
                <InputFormItem
                  type="text"
                  name="ifscCode"
                  placeholder={i18n("entities.transaction.fields.ifscCode")}
                  className="form-input"
                />
              </div>

              {/* Submit Button – styled exactly like save button */}
              <button type="submit" className="save-button">
                <i className="fas fa-check" style={{ marginRight: "8px" }}></i>
                {i18n("pages.withdraw.confirm")}
              </button>
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

        .bank-details-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header – identical to LoginPassword */
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

        /* Content Card – identical to LoginPassword */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Form wrapper */
        .bank-form {
          width: 100%;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 16px;
          width: 100%;
        }

        /* Label – identical to LoginPassword’s .form-label */
        .form-label {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .required-star {
          color: #f44336;
          font-size: 12px;   /* same size as label, not bigger */
          margin-right: 2px;
        }

        /* Input – identical to LoginPassword’s .form-input */
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

        /* Submit button – identical to LoginPassword’s .save-button */
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
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-button:hover {
          background: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        .save-button:active {
          transform: translateY(0);
        }

        /* Error styling (if InputFormItem adds an error class) */
        .form-input.error {
          border-color: #f44336;
        }

        .form-input.error:focus {
          box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
        }

        /* Responsive adjustments – identical to LoginPassword */
        @media (max-width: 380px) {
          .bank-details-container {
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

export default BankDetails;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import actions from "src/modules/auth/authActions";
import InputFormItem from "src/shared/form/InputFormItem";
import selector from "src/modules/auth/authSelectors";
import SelectFormItem from "src/shared/form/SelectFormItem";
import userEnumerators from "src/modules/user/userEnumerators";

const schema = yup.object().shape({
  preferredcoin: yupFormSchemas.enumerator(i18n("user.fields.status"), {
    options: userEnumerators.wallet,
    required: true,
  }),
  trc20: yupFormSchemas.string(i18n("user.fields.walletAddress"), {
    required: true,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
});

function WalletSettings() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selector.selectCurrentUser);

  const [initialValues] = useState(() => {
    return {
      trc20: currentUser.trc20 || "",
      walletname: currentUser.walletname || "",
      usernamewallet: currentUser.usernamewallet || "",
      balance: currentUser?.balance || "",
      preferredcoin: currentUser?.preferredcoin || "",
    };
  });
  
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });
  
  const onSubmit = ({
    preferredcoin,
    withdrawPassword,
    trc20,
    walletname,
    usernamewallet,
  }) => {
    const values = {
      trc20: trc20,
      walletname: walletname,
      usernamewallet: usernamewallet,
      balance: currentUser?.balance,
      withdrawPassword: withdrawPassword,
      preferredcoin: preferredcoin,
    };
    dispatch(actions.doUpdateProfileWallet(values));
  };
  
  return (
    <div className="wallet-settings-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.wallet.withdrawalMethod')}</div>
        </div>
      </div>

      {/* Content Card */}
      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="settings-form">
            <div className="form-section">
              <div className="form-group">
                <div className="label__form">
                  <span className="required-star">*</span>
                  <span className="label-text">{i18n('pages.wallet.username')}</span>
                </div>
                <InputFormItem
                  type="text"
                  name="usernamewallet"
                  placeholder={i18n("user.fields.username")}
                  className="withdraw-input"
                />
              </div>

              <div className="form-group">
                <div className="label__form">
                  <span className="required-star">*</span>
                  <span className="label-text">{i18n('pages.wallet.walletName')}</span>
                </div>
                <InputFormItem
                  type="text"
                  name="walletname"
                  placeholder={i18n("user.fields.walletName")}
                                className="withdraw-input"

                />
              </div>

              <div className="form-group">
                <div className="label__form">
                  <span className="required-star">*</span>
                  <span className="label-text">{i18n('pages.wallet.choosePreferredCoin')}</span>
                </div>
                <SelectFormItem
                  name="preferredcoin"
                  options={userEnumerators.wallet.map((value) => ({
                    value,
                    label: i18n(`user.enumerators.status.${value}`),
                  }))}
                  required={true}
                  className="settings-select"
                />
              </div>

              <div className="form-group">
                <div className="label__form">
                  <span className="required-star">*</span>
                  <span className="label-text">{i18n('pages.wallet.walletAddress')}</span>
                </div>
                <InputFormItem
                  type="text"
                  name="trc20"
                  placeholder={i18n("user.fields.walletAddress")}
                                 className="withdraw-input"

                />
              </div>

              <div className="form-group">
                <div className="label__form">
                  <span className="required-star">*</span>
                  <span className="label-text">{i18n('pages.wallet.withdrawPassword')}</span>
                </div>
                <InputFormItem
                  type="password"
                  name="withdrawPassword"
                  placeholder={i18n("user.fields.withdrawPassword")}
                                  className="withdraw-input"

                />
              </div>
            </div>

            <div className="form-footer">
              <button className="submit-btn" type="submit">
                {i18n('pages.wallet.submit')}
              </button>
              <span className="note-text">
                <b>Note:</b> {i18n('pages.wallet.note')}
              </span>
            </div>
          </form>
        </FormProvider>
      </div>

      <style>{`
        /* Container – matches profile/wallet theme */
        .wallet-settings-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #0f0f0f;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header */
        .header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
          flex: 1;
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          border-top: 2px solid #39FF14;
        }

        /* Form */
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

     

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .label__form {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          color: #ffffff;
        }

        .required-star {
          color: #ff6b6b;
          font-size: 16px;
          line-height: 1;
        }

        .label-text {
          font-weight: 500;
        }

        /* Input fields */
        .settings-input input,
        .settings-input .input__withdraw {
          width: 100%;
          padding: 12px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .settings-input input:focus,
        .settings-input .input__withdraw:focus {
          outline: none;
          border-color: #39FF14;
        }

        /* Select field */
        .settings-select select {
          width: 100%;
          padding: 12px;
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
          appearance: none;
          cursor: pointer;
        }

        .settings-select select:focus {
          outline: none;
          border-color: #39FF14;
        }

        /* Form footer */
        .form-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }

        .submit-btn {
          width: 100%;
          background-color: #39FF14;
          color: #0f0f0f;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
 .withdraw-input {
          background-color: #2a2a2a;
          border: 1px solid #3a3a3a;
          border-radius: 8px;
          padding: 12px;
          color: #ffffff;
          font-size: 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .withdraw-input:focus {
          border-color: #39FF14;
        }
        .withdraw-input::placeholder {
          color: #777777;
        }

        .submit-btn:hover {
          background-color: #2ecc10;
        }

        .note-text {
          font-size: 13px;
          color: #aaaaaa;
          line-height: 1.5;
        }

        .note-text b {
          color: #39FF14;
        }

        /* Responsive */
        @media (max-width: 360px) {
          .content-card {
            padding: 20px 16px;
          }
        }

        /* Remove blue highlight on tap */
        .back-arrow, .submit-btn {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default WalletSettings;
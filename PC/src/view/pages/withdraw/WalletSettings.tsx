import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import actions from "src/modules/auth/authActions";
import InputFormItem from "src/shared/form/InputFormItem";
import SelectFormItem from "src/shared/form/SelectFormItem";
import selector from "src/modules/auth/authSelectors";
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
    { required: true }
  ),
});

function WalletSettings() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selector.selectCurrentUser);

  const [initialValues] = useState(() => ({
    trc20: currentUser?.trc20 || "",
    walletname: currentUser?.walletname || "",
    usernamewallet: currentUser?.usernamewallet || "",
    balance: currentUser?.balance || 0,
    preferredcoin: currentUser?.preferredcoin || "",
  }));

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
      trc20,
      walletname,
      usernamewallet,
      balance: currentUser?.balance,
      withdrawPassword,
      preferredcoin,
    };
    // dispatch(actions.doUpdateProfileWallet(values));
  };

  return (
    <div className="wallet-settings-container">
      {/* Header Section – matches Profile */}
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.wallet.username')}
              </label>
              <InputFormItem
                type="text"
                name="usernamewallet"
                placeholder={i18n("user.fields.username")}
                className="wallet-input"
              />
            </div>

            {/* Wallet Name */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.wallet.walletName')}
              </label>
              <InputFormItem
                type="text"
                name="walletname"
                placeholder={i18n("user.fields.walletName")}
                className="wallet-input"
              />
            </div>

            {/* Preferred Coin */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.wallet.choosePreferredCoin')}
              </label>
              <SelectFormItem
                name="preferredcoin"
                options={userEnumerators.wallet.map((value) => ({
                  value,
                  label: i18n(`user.enumerators.status.${value}`),
                }))}
                required={true}
                className="wallet-select"
              />
            </div>

            {/* Wallet Address */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.wallet.walletAddress')}
              </label>
              <InputFormItem
                type="text"
                name="trc20"
                placeholder={i18n("user.fields.walletAddress")}
                className="wallet-input"
              />
            </div>

            {/* Withdraw Password */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.wallet.withdrawPassword')}
              </label>
              <InputFormItem
                type="password"
                name="withdrawPassword"
                placeholder={i18n("user.fields.withdrawPassword")}
                className="wallet-input"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="wallet-button">
              <i className="fas fa-check" style={{ marginRight: '8px' }}></i>
              {i18n('pages.wallet.submit')}
            </button>

            {/* Note */}
            <p className="note-text">
              <b>{i18n('common.note')}:</b> {i18n('pages.wallet.note')}
            </p>
          </form>
        </FormProvider>
      </div>

      <style>{`
       
      `}</style>
    </div>
  );
}

export default WalletSettings;
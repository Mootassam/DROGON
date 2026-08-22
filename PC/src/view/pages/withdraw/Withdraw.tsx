import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import actions from "src/modules/withdraw/form/withdrawFormActions";
import selectors from "src/modules/withdraw/form/withdrawFormSelectors";
import authActions from "src/modules/auth/authActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";

// Custom Modal Component (light theme)
const CustomModal = ({ visible, title, onClose, children }) => {
  if (!visible) return null;

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .modal-container {
          background-color: #ffffff;
          border-radius: 16px;
          width: 90%;
          
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          animation: slideIn 0.3s ease;
        }
        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e7eaee;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 {
          margin: 0;
          color: #222;
          font-size: 18px;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #106cf5;
        }
        .modal-body {
          padding: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// Extended validation schema – includes all missing fields (optional or computed)
const schema = yup.object().shape({
  amount: yupFormSchemas.integer(i18n("entities.transaction.fields.amount"), {
    required: true,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    { required: true }
  ),
  withdrawalMethod: yup.string().required(i18n("pages.withdraw.validation.selectMethod")),
  currency: yup.string().default("USD"),
  withdrawAddress: yup.string(),
  network: yup.string(),
  fee: yup.number().default(0),
  totalAmount: yup.number().default(0),
  orderNo: yup.string(),
});

function Withdraw() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  const listAssets = useSelector(assetsListSelectors.selectRows);
  const loadingAssets = useSelector(assetsListSelectors.selectLoading);

  const [showBankModal, setShowBankModal]     = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [showSuccess, setShowSuccess]         = useState(false);

  const refreshItems = useCallback(async () => {
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  // Fetch assets on mount
  useEffect(() => {
    let isMounted = true;
    const fetchAssets = async () => {
      if (!isMounted) return;
      try {
        await dispatch(assetsActions.doFetch(null, "USD"));
      } catch (error) {
        if (isMounted) {
          console.error(i18n("pages.wallet.errors.fetchAssets"), error);
        }
      }
    };
    fetchAssets();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Find USDT asset
  const usdtAsset = useMemo(() => {
    return listAssets.find(asset => asset.symbol === "USDT");
  }, [listAssets]);

  const usdtBalance = usdtAsset?.amount || 0;

  const hasCompleteBankDetails = useCallback(() => {
    if (!currentUser) return false;
    return (
      currentUser.accountHolder?.trim() &&
      currentUser.ibanNumber?.trim() &&
      currentUser.bankName?.trim() &&
      currentUser.ifscCode?.trim()
    );
  }, [currentUser]);

  const hasCompleteCryptoDetails = useCallback(() => {
    if (!currentUser) return false;
    return (
      currentUser.trc20?.trim() &&
      currentUser.walletname?.trim() &&
      currentUser.usernamewallet?.trim() &&
      currentUser.preferredcoin?.trim()
    );
  }, [currentUser]);

  const getMissingBankFields = useCallback(() => {
    const missing = [];
    if (!currentUser?.accountHolder) missing.push(i18n("entities.transaction.fields.accountHolder"));
    if (!currentUser?.ibanNumber) missing.push(i18n("entities.transaction.fields.ibanNumber"));
    if (!currentUser?.bankName) missing.push(i18n("entities.transaction.fields.bankName"));
    if (!currentUser?.ifscCode) missing.push(i18n("entities.transaction.fields.ifscCode"));
    return missing;
  }, [currentUser]);

  const getMissingCryptoFields = useCallback(() => {
    const missing = [];
    if (!currentUser?.trc20) missing.push(i18n("user.fields.trc20"));
    if (!currentUser?.walletname) missing.push(i18n("pages.wallet.walletName"));
    if (!currentUser?.usernamewallet) missing.push(i18n("pages.wallet.username"));
    if (!currentUser?.preferredcoin) missing.push(i18n("pages.wallet.choosePreferredCoin"));
    return missing;
  }, [currentUser]);

  const onSubmit = async ({ amount, withdrawPassword, withdrawalMethod }) => {
    if (withdrawalMethod === "bank" && !hasCompleteBankDetails()) {
      setShowBankModal(true);
      return;
    }
    if (withdrawalMethod === "crypto" && !hasCompleteCryptoDetails()) {
      setShowCryptoModal(true);
      return;
    }

    const currency = "USDT";
    let withdrawAddress = "";
    let network = "";
    let fee = 0;
    let totalAmount = Number(amount);

    const FEE_USD = 5;
    fee = FEE_USD;
    totalAmount = Math.max(Number(amount) - fee, 0);

    if (withdrawalMethod === "crypto") {
      withdrawAddress = currentUser?.trc20 || "";
      network = "TRC20";
    } else if (withdrawalMethod === "bank") {
      withdrawAddress = `${currentUser?.bankName} - ${currentUser?.accountHolder} (${currentUser?.ibanNumber})`;
      network = "BANK";
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const randomDigits = Math.floor(Math.random() * 1e7).toString().padStart(7, "0");
    const orderNo = `RE${dateStr}${randomDigits}`;

    const values = {
      currency: "USDT",
      date: new Date(),
      totalAmount: Number(amount),
      orderNo: orderNo,
      status: "pending",
      withdrawPassword,
      withdrawAmount: Number(amount),
      withdrawType: withdrawalMethod
    };

    try {
      await dispatch(actions.doCreate(values));
      await refreshItems();
      form.reset();
      setShowSuccess(true);
    } catch {
      // errors are handled inside the action
    }
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      amount: "",
      withdrawalMethod: "",
      currency: "USDT",
      withdrawAddress: "",
      network: "",
      fee: 0,
      totalAmount: 0,
      orderNo: "",
    },
  });

  return (
    <div className="withdraw-container">
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n('pages.withdraw.title')}</div>
        </div>
      </div>

      <div className="content-card">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Hidden fields for missing data */}
            <input type="hidden" {...form.register("currency")} />
            <input type="hidden" {...form.register("withdrawAddress")} />
            <input type="hidden" {...form.register("network")} />
            <input type="hidden" {...form.register("fee")} />
            <input type="hidden" {...form.register("totalAmount")} />
            <input type="hidden" {...form.register("orderNo")} />

            {/* Available Balance */}
            <div className="balance-info">
              <i className="fas fa-wallet"></i>
              {i18n('pages.withdraw.availableBalance')} :{" "}
              {loadingAssets ? (
                <span className="balance-placeholder">--</span>
              ) : (
                `${usdtBalance.toFixed(2)} USD`
              )}
            </div>

            {/* Amount Field */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.withdraw.withdrawAmount')}
              </label>
              <InputFormItem
                type="number"
                name="amount"
                placeholder={i18n('pages.withdraw.amountPlaceholder')}
                className="withdraw-input"
              />
            </div>

            {/* Withdrawal Method Selection */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.withdraw.selectMethod')}
              </label>

              <div className="method-selection">
          

                <div
                  className={`method-card ${form.watch('withdrawalMethod') === 'bank' ? 'selected' : ''}`}
                  onClick={() => form.setValue('withdrawalMethod', 'bank', { shouldValidate: true })}
                >
                  <i className="fas fa-university method-icon"></i>
                  <div className="method-label">{i18n('pages.withdraw.methods.bank')}</div>
                  <div className={`method-status ${hasCompleteBankDetails() ? 'complete' : 'incomplete'}`}>
                    {hasCompleteBankDetails() ? i18n('pages.withdraw.status.complete') : i18n('pages.withdraw.status.incomplete')}
                  </div>
                  <div className="method-network-hint">{i18n('pages.withdraw.methods.bankNetworks')}</div>
                </div>
              </div>

              <input type="hidden" {...form.register('withdrawalMethod')} />
              {form.formState.errors.withdrawalMethod && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {form.formState.errors.withdrawalMethod.message}
                </div>
              )}
            </div>

            {/* Selected Method Preview */}
            {form.watch('withdrawalMethod') === 'crypto' && hasCompleteCryptoDetails() && (
              <div className="preview-box">
                <i className="fab fa-bitcoin"></i>
                <strong>{i18n('pages.withdraw.withdrawingTo')}</strong><br />
                <span className="preview-detail">
                  {currentUser?.preferredcoin?.toUpperCase()}: {currentUser?.trc20?.substring(0, 12)}...
                </span>
              </div>
            )}
            {form.watch('withdrawalMethod') === 'bank' && hasCompleteBankDetails() && (
              <div className="preview-box">
                <i className="fas fa-university"></i>
                <strong>{i18n('pages.withdraw.withdrawingTo')}</strong><br />
                <span className="preview-detail">
                  {currentUser?.bankName} - {currentUser?.accountHolder}
                </span>
              </div>
            )}

            {/* Withdraw Password Field */}
            <div className="form-group">
              <label className="input-label">
                <span className="required-star">*</span>
                {i18n('pages.withdraw.withdrawPassword')}
              </label>
              <InputFormItem
                type="password"
                name="withdrawPassword"
                placeholder={i18n('pages.withdraw.withdrawPasswordPlaceholder')}
                className="withdraw-input"
              />
            </div>

            {/* Announcement */}
            <div className="announcement-container">
              <i className="fas fa-volume-high speaker"></i>
              <div className="announcement-text">
                {i18n('pages.withdraw.announcement')}
              </div>
            </div>

            {/* Submit Button */}
            <button className="withdraw-button" type="submit">
              <i className="fas fa-check"></i>
              {i18n('pages.withdraw.confirm')}
            </button>

            {currentUser?.accountType !== 'demo' && (!hasCompleteBankDetails() || !hasCompleteCryptoDetails()) && (
              <div className="tip-box">
                <i className="fas fa-info-circle"></i>
                <span>
                  {i18n('pages.withdraw.completeDetailsIn')}{' '}
                  <Link to="/bind-account" className="tip-link">
                    {i18n('pages.bindAccount.title')}
                  </Link>
                  {i18n('pages.withdraw.enableAllOptions')}
                </span>
              </div>
            )}
          </form>
        </FormProvider>
      </div>

      {/* Bank Details Modal */}
      <CustomModal
        visible={showBankModal}
        title={i18n('pages.withdraw.bankModal.title')}
        onClose={() => setShowBankModal(false)}
      >
        <div className="modal-content-centered">
          <i className="fas fa-exclamation-circle modal-warning-icon"></i>
          <h3 className="modal-subtitle">{i18n('pages.withdraw.bankModal.required')}</h3>
          <p className="modal-description">{i18n('pages.withdraw.bankModal.description')}</p>
          <ul className="missing-fields-list">
            {getMissingBankFields().map((field, index) => (
              <li key={index}><i className="fas fa-times"></i> {field}</li>
            ))}
          </ul>
          <div className="modal-actions">
            <button className="modal-cancel-btn" onClick={() => setShowBankModal(false)}>
              {i18n('common.cancel')}
            </button>
            {currentUser?.accountType !== 'demo' && (
              <Link to="/bind-account" className="modal-action-link">
                <button className="modal-action-btn">
                  {i18n('pages.withdraw.goToBindAccount')}
                </button>
              </Link>
            )}
          </div>
        </div>
      </CustomModal>

      {/* Crypto Details Modal */}
      <CustomModal
        visible={showCryptoModal}
        title={i18n('pages.withdraw.cryptoModal.title')}
        onClose={() => setShowCryptoModal(false)}
      >
        <div className="modal-content-centered">
          <i className="fas fa-exclamation-circle modal-warning-icon"></i>
          <h3 className="modal-subtitle">{i18n('pages.withdraw.cryptoModal.required')}</h3>
          <p className="modal-description">{i18n('pages.withdraw.cryptoModal.description')}</p>
          <ul className="missing-fields-list">
            {getMissingCryptoFields().map((field, index) => (
              <li key={index}><i className="fas fa-times"></i> {field}</li>
            ))}
          </ul>
          <div className="modal-actions">
            <button className="modal-cancel-btn" onClick={() => setShowCryptoModal(false)}>
              {i18n('common.cancel')}
            </button>
            {currentUser?.accountType !== 'demo' && (
              <Link to="/bind-account" className="modal-action-link">
                <button className="modal-action-btn">
                  {i18n('pages.withdraw.goToBindAccount')}
                </button>
              </Link>
            )}
          </div>
        </div>
      </CustomModal>

      {/* ── Withdrawal Success Modal ── */}
      {showSuccess && (
        <div className="wd-success-overlay">
          <div className="wd-success-card">

            {/* Animated checkmark */}
            <div className="wd-success-icon-wrap">
              <svg className="wd-check-svg" viewBox="0 0 52 52">
                <circle className="wd-check-circle" cx="26" cy="26" r="25" fill="none" />
                <path   className="wd-check-tick"   fill="none" d="M14 27l8 8 16-16" />
              </svg>
            </div>

            <div className="wd-success-title">Request Submitted</div>

            <p className="wd-success-msg">
              Dear client, your request is being processed.
              <br />
              It will take <strong>24 hours</strong>.
              <br />
              You will receive your withdrawal soon.
            </p>

            <div className="wd-success-ref">
              <i className="fas fa-clock" />
              &nbsp;Processing time: up to 24 hours
            </div>

            <button className="wd-success-btn" onClick={() => setShowSuccess(false)}>
              OK, Got it
            </button>
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

        body {
          background-color: #f5f7fa;
          color: #333;
        }

        .withdraw-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .header {
          min-height: 60px;
          padding: 20px;
          position: relative;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
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
          flex: 1;
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          margin-bottom: 6px;
        }

        .required-star {
          color: #f44336;
          font-size: 16px;
          margin-right: 2px;
        }

        .withdraw-input {
          background-color: #fff;
          border: 1px solid #e7eaee;
          border-radius: 8px;
          padding: 12px 16px;
          color: #333;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .withdraw-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }
        .withdraw-input::placeholder {
          color: #aaa;
        }

        .balance-info {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          font-size: 16px;
          font-weight: 500;
          color: #222;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .balance-info i {
          color: #106cf5;
          font-size: 18px;
        }
        .balance-placeholder {
          opacity: 0.5;
        }

        .method-selection {
          display: flex;
          gap: 12px;
          margin: 8px 0 12px;
        }

        .method-card {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .method-card.selected {
          border-color: #106cf5;
          background-color: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
          transform: translateY(-2px);
        }
        .method-card:hover {
          border-color: #106cf5;
          background-color: #f5f8ff;
        }

        .method-icon {
          font-size: 28px;
          color: #106cf5;
          margin-bottom: 8px;
        }

        .method-label {
          font-weight: 600;
          color: #222;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .method-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 6px;
        }
        .method-status.complete {
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
        }
        .method-status.incomplete {
          color: #ff7a00;
          background-color: rgba(255, 122, 0, 0.1);
        }

        .method-network-hint {
          font-size: 11px;
          color: #999;
        }

        .preview-box {
          background: #f8f9fa;
          border: 1px solid #106cf5;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 20px;
          font-size: 13px;
          color: #333;
        }
        .preview-box i {
          color: #106cf5;
          margin-right: 8px;
        }
        .preview-detail {
          color: #666;
          font-size: 12px;
        }

        .error-message {
          color: #f44336;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .announcement-container {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 20px 0;
          padding: 16px;
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          color: #ff7a00;
        }
        .speaker {
          font-size: 18px;
          color: #ff7a00;
          margin-top: 2px;
        }
        .announcement-text {
          font-size: 13px;
          color: #cc6600;
          line-height: 1.5;
        }

        .withdraw-button {
          background-color: #106cf5;
          color: white;
          border: none;
          height: 48px;
          width: 100%;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .withdraw-button:hover {
          background-color: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }
        .withdraw-button:active {
          transform: translateY(0);
        }
        .withdraw-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .tip-box {
          margin-top: 20px;
          padding: 12px 16px;
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 8px;
          font-size: 13px;
          color: #555;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .tip-box i {
          color: #106cf5;
          font-size: 16px;
          margin-top: 2px;
        }
        .tip-link {
          color: #106cf5;
          text-decoration: none;
          font-weight: 500;
        }
        .tip-link:hover {
          text-decoration: underline;
        }

        /* Modal content inside CustomModal (unchanged structure, just visual) */
        .modal-content-centered {
          text-align: center;
          color: #333;
        }
        .modal-warning-icon {
          font-size: 48px;
          color: #ff7a00;
          margin-bottom: 16px;
        }
        .modal-subtitle {
          color: #222;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .modal-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }
        .missing-fields-list {
          text-align: left;
          margin-bottom: 24px;
          list-style: none;
          padding: 0;
        }
        .missing-fields-list li {
          margin-bottom: 8px;
          padding: 8px 12px;
          background-color: #f8f9fa;
          border-radius: 6px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          border: 1px solid #e7eaee;
        }
        .missing-fields-list i {
          color: #f44336;
          font-size: 14px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .modal-cancel-btn {
          flex: 1;
          background: #f8f9fa;
          border: 1px solid #e7eaee;
          color: #666;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .modal-cancel-btn:hover {
          border-color: #106cf5;
          color: #106cf5;
        }
        .modal-action-link {
          flex: 1;
          text-decoration: none;
        }
        .modal-action-btn {
          width: 100%;
          background-color: #106cf5;
          border: none;
          color: white;
          padding: 10px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-action-btn:hover {
          background-color: #0a4fc4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.2);
        }

        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }
          .method-card {
            padding: 12px 4px;
          }
          .method-icon {
            font-size: 24px;
          }
          .method-label {
            font-size: 13px;
          }
        }

        /* ── Withdrawal Success Modal ── */
        .wd-success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          animation: wdFadeIn 0.25s ease;
        }

        .wd-success-card {
          background: #ffffff;
          border-radius: 24px;
          width: 88%;
          max-width: 360px;
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.22);
          animation: wdSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Animated SVG checkmark */
        .wd-success-icon-wrap {
          width: 72px;
          height: 72px;
        }
        .wd-check-svg {
          width: 72px;
          height: 72px;
        }
        .wd-check-circle {
          stroke: #22c55e;
          stroke-width: 2;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-linecap: round;
          animation: wdCircleDraw 0.5s ease forwards 0.1s;
        }
        .wd-check-tick {
          stroke: #22c55e;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: wdTickDraw 0.35s ease forwards 0.55s;
        }

        .wd-success-title {
          font-size: 20px;
          font-weight: 700;
          color: #111;
          text-align: center;
        }

        .wd-success-msg {
          font-size: 14px;
          color: #555;
          text-align: center;
          line-height: 1.7;
        }
        .wd-success-msg strong {
          color: #111;
          font-weight: 700;
        }

        .wd-success-ref {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 13px;
          color: #15803d;
          font-weight: 600;
          width: 100%;
          text-align: center;
        }

        .wd-success-btn {
          margin-top: 4px;
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          letter-spacing: 0.2px;
        }
        .wd-success-btn:hover  { opacity: 0.9; transform: translateY(-1px); }
        .wd-success-btn:active { transform: translateY(0); }

        @keyframes wdFadeIn  { from { opacity: 0; }                        to { opacity: 1; } }
        @keyframes wdSlideUp { from { transform: translateY(30px) scale(0.95); opacity: 0; }
                               to   { transform: translateY(0)     scale(1);    opacity: 1; } }
        @keyframes wdCircleDraw { to { stroke-dashoffset: 0; } }
        @keyframes wdTickDraw   { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}

export default Withdraw;
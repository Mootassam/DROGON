import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from 'react-hook-form';
import stackingPlanListActions from "src/modules/stackingPlan/list/stackingPlanListActions";
import stackingPlanListSelectros from "src/modules/stackingPlan/list/stackingPlanListSelectors";
import stackingListSelectors from "src/modules/stacking/list/stackingListSelectors";
import stackingListActions from "src/modules/stacking/list/stackingListActions";
import assetsListSelector from "src/modules/assets/list/assetsListSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import stackingFormAction from "src/modules/stacking/form/stackingFormActions";
import selector from "src/modules/stacking/form/stackingFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import SubHeader from "src/view/shared/Header/SubHeader";
import Dates from "src/view/shared/utils/Dates";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";

const schema = yup.object().shape({
  user: yupFormSchemas.relationToOne(i18n("entities.stacking.fields.user"), {}),
  plan: yupFormSchemas.relationToOne(i18n("entities.stacking.fields.plan"), {}),
  amount: yupFormSchemas.decimal(i18n("entities.stacking.fields.amount"), {
    required: true,
  }),
  status: yupFormSchemas.enumerator(i18n("entities.stacking.fields.status"), {
    options: ["active", "completed", "cancelled"],
  }),
  startDate: yupFormSchemas.datetime(
    i18n("entities.stacking.fields.startDate"),
    {}
  ),
  endDate: yupFormSchemas.datetime(
    i18n("entities.stacking.fields.endDate"),
    {}
  ),
  earnedRewards: yupFormSchemas.decimal(
    i18n("entities.stacking.fields.earnedRewards"),
    {}
  ),
});

function StackingPage() {
  const [activeTab, setActiveTab] = useState("options");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listPlanStacking = useSelector(stackingPlanListSelectros.selectRows);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const listStacking = useSelector(stackingListSelectors.selectRows);
  const assets = useSelector(assetsListSelector.selectRows);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  const [amount, setAmount] = useState('')
  const showModal = useSelector(selector.selectModal)


  const handleCloseModal = () => {
    dispatch(stackingFormAction.doClose())

  };


  const [modalData, setModalData] = useState({
    crypto: "",
    daily: "",
    balance: 0,
    min: 0,
    max: 0,
    symbol: "",
    plan: "",
    unstakingPeriod: "",
  });

  const [stakeAmount, setStakeAmount] = useState("");
  const [initialValues] = useState(() => {
    return {
      user: "",
      plan: "",
      amount: "",
      status: "",
      startDate: "",
      endDate: "",
      earnedRewards: "",
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Use useWatch to get the amount field value from react-hook-form
  const watchedAmount = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: ''
  });

  // Process assets to create balances object
  const processAssets = () => {
    if (assets && assets.length > 0) {
      const formattedBalances = assets.reduce((acc, item) => {
        if (item.symbol && item.amount !== undefined) {
          acc[item.symbol] = parseFloat(item.amount) || 0;
        }
        return acc;
      }, {});
      setBalances(formattedBalances);
    }
  };

  // Update stakeAmount when the form field changes
  useEffect(() => {
    setStakeAmount(watchedAmount || '');
  }, [watchedAmount]);

  // Process assets when they are loaded
  useEffect(() => {
    processAssets();
  }, [assets]);

  const onSubmit = async (values) => {
    values.startDate = new Date();

    // Calculate the endDate by adding unstakingPeriod days to startDate
    const endDate = new Date(values.startDate);
    endDate.setDate(endDate.getDate() + parseInt(modalData.unstakingPeriod));
    values.endDate = endDate.toISOString();

    values.status = "active";
    values.plan = modalData.plan;
    values.user = currentUser.id;

    setAmount(values.amount)

    try {
      await dispatch(stackingFormAction.doCreate(values));

      // Refresh assets data after successful stake
      dispatch(assetsActions.doFetch());
      dispatch(stackingListActions.doFetch());

      // Update the local balances state immediately
      setBalances(prev => ({
        ...prev,
        [modalData.symbol]: (prev[modalData.symbol] || 0) - parseFloat(stakeAmount)
      }));

      closeStakeModal();
    } catch (error) {
      console.error("Staking failed:", error);
    }

  };

  const calculateRewards = () => {
    if (!stakeAmount || isNaN(stakeAmount) || stakeAmount <= 0) return "0";

    const amount = parseFloat(stakeAmount);
    const dailyRate = parseFloat(modalData.daily);
    const unstakingPeriod = parseFloat(modalData.unstakingPeriod);

    // Total Reward = Amount * (Daily Rate / 100) * Unstaking Period
    const totalReward = amount * (dailyRate / 100) * unstakingPeriod;

    return totalReward.toFixed(6);
  };

const validateStake = () => {
    const amount = parseFloat(stakeAmount);
    const userBalance = balances[modalData.symbol] || 0;

    // Check if input is a valid number
    if (isNaN(amount) || amount <= 0) {
      return { isValid: false, message: i18n("stake.enterAmount") };
    }

    // Check if user has enough balance
    if (amount > userBalance) {
      return { isValid: false, message: i18n("stake.insufficientBalance") };
    }

    // Check if amount is within plan limits
    if (amount < modalData.min) {
      return { isValid: false, message: i18n("stake.minAmount", { min: modalData.min }) };
    }

    if (amount > modalData.max) {
      return { isValid: false, message: i18n("stake.maxAmount", { max: modalData.max }) };
    }

    // If all checks pass
    return { isValid: true, message: i18n("stake.confirmStake") };
};

  const openStakeModal = (
    crypto,
    daily,
    balance,
    min,
    max,
    symbol,
    plan,
    unstakingPeriod
  ) => {
    setModalData({
      crypto,
      daily,
      balance,
      min,
      max,
      symbol,
      plan,
      unstakingPeriod,
    });
    setIsModalOpen(true);
    setStakeAmount(""); // Reset amount when opening modal
    form.setValue('amount', ''); // Also reset the form value
  };

  const closeStakeModal = () => {
    setIsModalOpen(false);
    setStakeAmount("");
    form.setValue('amount', ''); // Reset form value when closing modal
  };

  // Fetch cryptocurrency prices
  const fetchCryptoPrices = async () => {
    try {
      // Get unique currencies from stacking plans
      const currencies = [...new Set(listPlanStacking.map(plan => plan.currency))];

      // Fetch prices for each currency
      const pricePromises = currencies.map(async (currency) => {
        if (currency === 'USD') return { currency, price: 1 };

        try {
          const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${currency}USD`);
          const data = await response.json();
          return { currency, price: parseFloat(data.price) };
        } catch (error) {
          console.error(`Error fetching price for ${currency}:`, error);
          return { currency, price: 0 };
        }
      });

      const prices = await Promise.all(pricePromises);
      const priceMap = {};
      prices.forEach(item => {
        priceMap[item.currency] = item.price;
      });

      setCryptoPrices(priceMap);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  };

  // Filter stakes by status
  const activeStakes = listStacking.filter(stake => stake.status === 'active');
  const completedStakes = listStacking.filter(stake => stake.status === 'completed');

  // Calculate total staked value in USD
  const calculateTotalStakedValue = () => {
    let total = 0;

    activeStakes.forEach(stake => {
      const currency = stake?.plan?.currency;
      const amount = parseFloat(stake.amount) || 0;
      const price = cryptoPrices[currency] || 0;

      total += amount * price;
    });

    return total.toFixed(2);
  };

  // Calculate total earned rewards in USD
  const calculateTotalEarnedRewards = () => {
    let total = 0;

    listStacking.forEach(stake => {
      const currency = stake?.plan?.currency;
      const earned = parseFloat(stake.earnedRewards) || 0;
      const price = cryptoPrices[currency] || 0;

      total += earned * price;
    });

    return total.toFixed(2);
  };

  // Calculate total completed rewards in USD
  const calculateTotalCompletedRewards = () => {
    let total = 0;

    completedStakes.forEach(stake => {
      const currency = stake?.plan?.currency;
      const earned = parseFloat(stake.earnedRewards) || 0;
      const price = cryptoPrices[currency] || 0;

      total += earned * price;
    });

    return total.toFixed(2);
  };

  useEffect(() => {
    dispatch(stackingPlanListActions.doFetch());
    dispatch(stackingListActions.doFetch());
    dispatch(assetsActions.doFetch());

    return () => { };
  }, [dispatch]);

  // Fetch crypto prices when component mounts and when stacking data changes
  useEffect(() => {
    if (listPlanStacking.length > 0) {
      fetchCryptoPrices();
    }
  }, [listPlanStacking]);

  // Get validation result for the button
  const validation = validateStake();
  const isButtonDisabled = !validation.isValid;
  const buttonText = validation.message;

  const daysElapsed = (item) => {
    const now = new Date();
    const startDate = new Date(item.startDate);
    const elapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return elapsed;
  }

  const daysRemaining = (item) => {
    const now = new Date();
    const endDate = new Date(item.endDate);
    const remaining = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, remaining);
  }

  // Get current balance for modal display
  const getCurrentBalance = () => {
    return balances[modalData.symbol] || 0;
  }

  return (
    <div className="stacking-container">
      <style>{`
        .stacking-container {
          max-width: 400px;
          margin: 0 auto;
          background-color: #0f0f0f;
          color: #ffffff;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        /* Header Section */
        .stacking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 15px;
          background-color: #0f0f0f;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .stacking-back-button {
          cursor: pointer;
          font-size: 18px;
        }

        .stacking-page-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-header-actions {
          display: flex;
          gap: 15px;
        }

        .stacking-header-icon {
          font-size: 20px;
          cursor: pointer;
        }

        /* Staking Overview */
        .stacking-overview {
          margin: 20px 15px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .stacking-balance {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
          color: #f3ba2f;
        }

        .stacking-label {
          color: #aaaaaa;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .stacking-rewards-earned {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 14px;
          display: inline-block;
          margin-top: 10px;
        }

        /* Completed Rewards Overview - New Professional Design */
        .completed-rewards-overview {
          margin: 0 0px 20px;
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 16px;
          border-left: 4px solid #00c076;
          margin : 0 15px 15px;
        }

        .completed-rewards-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .completed-rewards-label {
          color: #aaaaaa;
          font-size: 13px;
          font-weight: 500;
        }

        .completed-rewards-count {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .completed-rewards-amount {
          font-size: 24px;
          font-weight: bold;
          color: #00c076;
          margin-bottom: 4px;
        }

        .completed-rewards-subtext {
          color: #666;
          font-size: 12px;
        }

        /* Toggle Section */
        .stacking-toggle-section {
          display: flex;
          background-color: #1a1a1a;
          margin: 0 15px 20px;
          border-radius: 12px;
          padding: 5px;
        }

        .stacking-toggle-option {
          flex: 1;
          padding: 12px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .stacking-toggle-active {
          background-color: #2a2a2a;
          color: #f3ba2f;
        }

        /* Staking Options */
        .stacking-options {
             margin: 0 0px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
       

        .stacking-option-card {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          transition: transform 0.2s ease;
          margin : 0 15px;
        }

        .stacking-option-card:hover {
          transform: translateY(-2px);
          border-color: #f3ba2f;
        }

        .stacking-option-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .stacking-option-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
        }

        .stacking-eth-icon {
          background-color: #627eea;
          color: #fff;
        }

        .stacking-btc-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-bnb-icon {
          background-color: #f3ba2f;
          color: #000;
        }

        .stacking-option-name {
          font-weight: bold;
          font-size: 16px;
        }

        .stacking-option-apy {
          margin-left: auto;
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: bold;
        }

        .stacking-option-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-detail-label {
          color: #aaaaaa;
          font-size: 14px;
        }

        .stacking-detail-value {
          font-weight: bold;
          font-size: 14px;
        }

        .stacking-stake-button {
          background-color: #f3ba2f;
          color: #0f0f0f;
          text-align: center;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.2s ease;
        }

        .stacking-stake-button:hover {
          background-color: #e0a91c;
        }

        /* Active Stakes */
        .stacking-active-stakes {
          margin: 0 0px 20px;
          display: flex; 
          flex-direction :column ; 
          gap: 15px;
        }

        .stacking-completed-stakes {
          margin: 0 0px 20px;
        }

        .stacking-section-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stacking-view-all {
          color: #f3ba2f;
          font-size: 14px;
          cursor: pointer;
        }

        .stacking-stake-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #2a2a2a;
          margin : 0 15px;
        }

        .stacking-completed-item {
          background-color: #1a1a1a;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #2a2a2a;
          position: relative;
          overflow: hidden;
          margin : 0 15px 15px ;
        }

        .stacking-completed-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: #00c076;
        }

        .stacking-stake-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .stacking-stake-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        .stacking-stake-crypto {
          font-weight: bold;
          font-size: 15px;
        }

        .stacking-stake-amount {
          margin-left: auto;
          font-weight: bold;
          font-size: 15px;
        }

        .stacking-status-badge {
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: bold;
          margin-left: 8px;
        }

        .stacking-status-active {
          background-color: rgba(243, 186, 47, 0.2);
          color: #f3ba2f;
        }

        .stacking-status-completed {
          background-color: rgba(0, 192, 118, 0.2);
          color: #00c076;
        }

        .stacking-stake-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .stacking-stake-label {
          color: #aaaaaa;
          font-size: 12px;
        }

        .stacking-stake-value {
          font-size: 12px;
          font-weight: 500;
        }

        .stacking-value-positive {
          color: #00c076;
        }

        .stacking-value-completed {
          color: #00c076;
          font-weight: bold;
        }

        .stacking-completed-rewards {
          background-color: rgba(0, 192, 118, 0.1);
          border-radius: 8px;
          padding: 10px;
          margin-top: 10px;
          text-align: center;
        }

        .stacking-completed-rewards-label {
          color: #00c076;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .stacking-completed-rewards-amount {
          color: #00c076;
          font-size: 14px;
          font-weight: bold;
        }

        .stacking-progress-bar {
          height: 6px;
          background-color: #2a2a2a;
          border-radius: 3px;
          margin: 10px 0;
          overflow: hidden;
        }

        .stacking-progress-fill {
          height: 100%;
          background-color: #f3ba2f;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .stacking-progress-completed {
          background-color: #00c076;
        }

        /* Empty State Styles */
        .empty-stacking-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px 30px;
          text-align: center;
          color: #666;
          background-color: #1a1a1a;
          border-radius: 16px;
          margin: 20px 15px;
          border: 1px solid #2a2a2a;
        }

        .empty-stacking-state .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          color: #f3ba2f;
        }

        .empty-stacking-state .empty-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #ffffff;
        }

        .empty-stacking-state .empty-message {
          font-size: 14px;
          line-height: 1.5;
          color: #aaaaaa;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .start-staking-button {
          background-color: #f3ba2f;
          color: #0f0f0f;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 14px;
        }

        .start-staking-button:hover {
          background-color: #e6ab0a;
        }

        /* Modal */
        .stacking-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .stacking-modal-content {
          background-color: #1a1a1a;
          width: 90%;
          max-width: 400px;
          border-radius: 16px;
          padding: 20px;
        }

        .stacking-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .stacking-modal-title {
          font-weight: bold;
          font-size: 18px;
        }

        .stacking-close-modal {
          color: #aaaaaa;
          font-size: 20px;
          cursor: pointer;
        }

        .stacking-input-group {
          margin-bottom: 20px;
        }

        .stacking-input-label {
          display: block;
          color: #aaaaaa;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .stacking-amount-input {
          background-color: #2a2a2a;
          border: none;
          color: white;
          font-size: 18px;
          padding: 15px;
          border-radius: 8px;
          width: 100%;
          outline: none;
        }

        .stacking-balance-info {
          text-align: right;
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 5px;
        }

        .stacking-modal-details {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .stacking-modal-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .stacking-modal-detail:last-child {
          margin-bottom: 0;
        }

        .stacking-modal-button {
          background-color: #f3ba2f;
          color: #0f0f0f;
          text-align: center;
          padding: 16px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border: none;
          width: 100%;
          font-size: 16px;
        }

        .stacking-modal-button:hover:not(:disabled) {
          background-color: #e0a91c;
        }

        .stacking-modal-button-disabled {
          background-color: #2a2a2a !important;
          color: #aaaaaa !important;
          cursor: not-allowed !important;
        }

        @media (max-width: 350px) {
          .stacking-balance {
            font-size: 28px;
          }

          .completed-rewards-amount {
            font-size: 20px;
          }

          .stacking-option-icon {
            width: 36px;
            height: 36px;
          }

          .stacking-option-name {
            font-size: 14px;
          }

          .empty-stacking-state {
            padding: 40px 20px;
          }

          .empty-stacking-state .empty-icon {
            font-size: 48px;
          }

          .empty-stacking-state .empty-title {
            font-size: 18px;
          }
        }
      `}</style>

      {/* Header Section */}
{/* Header Section */}
<SubHeader title={i18n("pages.staking.title")} />

{/* Staking Overview */}
<div className="stacking-overview">
  <div className="stacking-label">{i18n("pages.staking.totalStakedBalance")}</div>
  <div className="stacking-balance">${calculateTotalStakedValue()}</div>
  <div className="stacking-rewards-earned">+ ${calculateTotalEarnedRewards()} {i18n("pages.staking.earned")}</div>
</div>

{/* Toggle Section */}
<div className="stacking-toggle-section">
  <div
    className={`stacking-toggle-option ${activeTab === "options" ? "stacking-toggle-active" : ""
      }`}
    onClick={() => setActiveTab("options")}
  >
    {i18n("pages.staking.tabs.options")}
  </div>
  <div
    className={`stacking-toggle-option ${activeTab === "active" ? "stacking-toggle-active" : ""
      }`}
    onClick={() => setActiveTab("active")}
  >
    {i18n("pages.staking.tabs.active")}
  </div>
  <div
    className={`stacking-toggle-option ${activeTab === "completed" ? "stacking-toggle-active" : ""
      }`}
    onClick={() => setActiveTab("completed")}
  >
    {i18n("pages.staking.tabs.completed")}
  </div>
</div>

{/* Staking Options */}
{activeTab === "options" && (
  <div className="stacking-options">
    {listPlanStacking.length > 0 ? (
      listPlanStacking.map((item) => (
        <div className="stacking-option-card" key={item.currency}>
          <div className="stacking-option-header">
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item.currency}.png`}
                style={{ width: 25, height: 25 }}
                alt={item.currency}
              />
              <div className="stacking-option-name">{item.currency}</div>
            </div>
            <div className="stacking-option-apy">
              {item.dailyRate}% {i18n("pages.staking.daily")}
            </div>
          </div>

          <div className="stacking-option-details">
            <div className="stacking-detail-label">{i18n("pages.staking.minimumStake")}</div>
            <div className="stacking-detail-value">
              {item.minimumStake} {item.currency}
            </div>
          </div>

          <div className="stacking-option-details">
            <div className="stacking-detail-label">{i18n("pages.staking.unstakingPeriod")}</div>
            <div className="stacking-detail-value">
              {item.unstakingPeriod} {i18n("pages.staking.days")}
            </div>
          </div>

          <div
            className="stacking-stake-button"
            onClick={() =>
              openStakeModal(
                item.currency,
                item.dailyRate,
                item.earnedRewards,
                item.minimumStake,
                item.maxStake,
                item.currency,
                item.id,
                item.unstakingPeriod
              )
            }
          >
            {i18n("pages.staking.stakeButton", item.currency)}
          </div>
        </div>
      ))
    ) : (
      <div className="empty-stacking-state">
        <div className="empty-icon">
          <i className="fas fa-coins" />
        </div>
        <div className="empty-title">{i18n("pages.staking.emptyStates.options.title")}</div>
        <div className="empty-message">
          {i18n("pages.staking.emptyStates.options.message")}
        </div>
      </div>
    )}
  </div>
)}

{/* Active Stakes */}
{activeTab === "active" && (
  <div className="stacking-active-stakes">
    {activeStakes.length > 0 ? (
      activeStakes.map((item) => {
        const progressPercentage = Math.min(100, (daysElapsed(item) / item?.plan?.unstakingPeriod) * 100);
        const remainingDays = daysRemaining(item);

        return (
          <div className="stacking-stake-item" key={item.id}>
            <div className="stacking-stake-header">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item?.plan?.currency}.png`}
                  style={{ width: 25, height: 25 }}
                  alt={item.currency}
                />
                <div className="stacking-stake-crypto">
                  {item?.plan?.currency}
                </div>
                <div className="stacking-status-badge stacking-status-active">
                  {i18n("pages.staking.status.active")}
                </div>
              </div>
              <div className="stacking-stake-amount">
                {item.amount} {item?.plan?.currency}
              </div>
            </div>
            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.daily")}</div>
              <div className="stacking-stake-value">
                {item?.plan?.dailyRate}%
              </div>
            </div>
            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.earned")}</div>
              <div className="stacking-stake-value stacking-value-positive">
                {item.earnedRewards || 0} {item?.plan?.currency}
              </div>
            </div>
            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.remaining")}</div>
              <div className="stacking-stake-value">
                {remainingDays} {i18n("pages.staking.days")}
              </div>
            </div>
            <div className="stacking-progress-bar">
              <div
                className="stacking-progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        );
      })
    ) : (
      <div className="empty-stacking-state">
        <div className="empty-icon">
          <i className="fas fa-chart-line" />
        </div>
        <div className="empty-title">{i18n("pages.staking.emptyStates.active.title")}</div>
        <div className="empty-message">
          {i18n("pages.staking.emptyStates.active.message")}
        </div>
        <button
          className="start-staking-button"
          onClick={() => setActiveTab("options")}
        >
          {i18n("pages.staking.exploreStakingOptions")}
        </button>
      </div>
    )}
  </div>
)}

{/* Completed Stakes */}
{activeTab === "completed" && (
  <div className="stacking-completed-stakes">
    {completedStakes.length > 0 ? (
      <>
        {/* New Professional Completed Rewards Overview */}
        <div className="completed-rewards-overview">
          <div className="completed-rewards-header">
            <div className="completed-rewards-label">{i18n("pages.staking.totalCompletedRewards")}</div>
            <div className="completed-rewards-count">
              {completedStakes.length} {completedStakes.length === 1 ? i18n("pages.staking.stake") : i18n("pages.staking.stakes")}
            </div>
          </div>
          <div className="completed-rewards-amount">${calculateTotalCompletedRewards()}</div>
          <div className="completed-rewards-subtext">{i18n("pages.staking.allRewardsFromCompleted")}</div>
        </div>

        {/* Completed Stakes List */}
        {completedStakes.map((item) => (
          <div className="stacking-completed-item" key={item.id}>
            <div className="stacking-stake-header">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${item?.plan?.currency}.png`}
                  style={{ width: 25, height: 25 }}
                  alt={item.currency}
                />
                <div className="stacking-stake-crypto">
                  {item?.plan?.currency}
                </div>
                <div className="stacking-status-badge stacking-status-completed">
                  {i18n("pages.staking.status.completed")}
                </div>
              </div>
              <div className="stacking-stake-amount">
                {item.amount} {item?.plan?.currency}
              </div>
            </div>
            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.dailyRate")}</div>
              <div className="stacking-stake-value">
                {item?.plan?.dailyRate}%
              </div>
            </div>
            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.duration")}</div>
              <div className="stacking-stake-value">
                {item?.plan?.unstakingPeriod} {i18n("pages.staking.days")}
              </div>
            </div>

            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.createdAt")}</div>
              <div className="stacking-stake-value">
                {Dates.NewsDate(item?.startDate)}
              </div>
            </div>

            <div className="stacking-stake-details">
              <div className="stacking-stake-label">{i18n("pages.staking.dateFinish")}</div>
              <div className="stacking-stake-value">
                {Dates.NewsDate(item?.endDate)}
              </div>
            </div>
            
            {/* Rewards Highlight Section */}
            <div className="stacking-completed-rewards">
              <div className="stacking-completed-rewards-label">{i18n("pages.staking.totalRewardsEarned")}</div>
              <div className="stacking-completed-rewards-amount">
                +{item.earnedRewards || 0} {item?.plan?.currency}
              </div>
            </div>
          </div>
        ))}
      </>
    ) : (
      <div className="empty-stacking-state">
        <div className="empty-icon">
          <i className="fas fa-check-circle" />
        </div>
        <div className="empty-title">{i18n("pages.staking.emptyStates.completed.title")}</div>
        <div className="empty-message">
          {i18n("pages.staking.emptyStates.completed.message")}
        </div>
        <button
          className="start-staking-button"
          onClick={() => setActiveTab("options")}
        >
          {i18n("pages.staking.startStaking")}
        </button>
      </div>
    )}
  </div>
)}

{showModal &&
  <SuccessModalComponent
    isOpen={showModal}
    onClose={handleCloseModal}
    type='staking'
    amount={String(amount)}
    coinType={modalData.crypto} />
}

{/* Stake Modal */}
{isModalOpen && (
  <div className="stacking-modal-overlay">
    <div className="stacking-modal-content">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="stacking-modal-header">
            <div className="stacking-modal-title">
              {i18n("pages.staking.stakeModal.title")} <span>{modalData.crypto}</span>
            </div>
            <div
              className="stacking-close-modal"
              onClick={closeStakeModal}
            >
              <i className="fas fa-times" />
            </div>
          </div>
          <div className="stacking-input-group">
            <FieldFormItem
              name="amount"
              label={i18n("pages.staking.stakeModal.amountToStake")}
              className="textField"
              className1="inputField"
              className2="inputLabel"
              className3="inputWrapper"
              placeholder={i18n("pages.staking.stakeModal.enterAmount")}
            />
            <div className="stacking-balance-info">
              {i18n("pages.staking.balance")}: <span>{getCurrentBalance()}</span>{" "}
              <span>{modalData.symbol}</span>
            </div>
          </div>
          <div className="stacking-modal-details">
            <div className="stacking-modal-detail">
              <span>{i18n("pages.staking.daily")}</span>
              <span>{modalData.daily}%</span>
            </div>
            <div className="stacking-modal-detail">
              <span>{i18n("pages.staking.minimumStake")}</span>
              <span>
                {modalData.min} {modalData.symbol}
              </span>
            </div>
            <div className="stacking-modal-detail">
              <span>{i18n("pages.staking.maximumStake")}</span>
              <span>
                {modalData.max} {modalData.symbol}
              </span>
            </div>
            <div className="stacking-modal-detail">
              <span>{i18n("pages.staking.estimatedTotalRewards")}</span>
              <span>
                {calculateRewards()} {modalData.symbol}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`stacking-modal-button ${isButtonDisabled ? 'stacking-modal-button-disabled' : ''
              }`}
          >
            {buttonText}
          </button>
        </form>
      </FormProvider>
    </div>
  </div>
)}
    </div>
  );
}

export default StackingPage;
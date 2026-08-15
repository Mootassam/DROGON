import { databaseInit } from "../databaseConnection";
import Stacking from "../models/stacking";
import StackingPlan from "../models/stakeProgram";
import Wallet from "../models/wallet";
import Transaction from "../models/transaction";
import Notification from "../models/notification";
import User from "../models/user";
import axios from "axios"; // Add axios import for API calls

export async function autoFinalizeStackingJob(job) {
  if (!job?.data) {
    console.error("autoFinalizeStackingJob: No job data provided");
    return;
  }

  let mongoose;
  try {
    mongoose = await databaseInit();
    const { stackingId, tenantId } = job.data;

    if (!stackingId || !tenantId) {
      console.error("autoFinalizeStackingJob: missing stackingId or tenantId");
      return;
    }

    const stackingModel = Stacking(mongoose);
    const stackingRecord = await stackingModel
      .findOne({ _id: stackingId, tenant: tenantId })
      .populate("plan")
      .populate("user")
      .lean();

    if (!stackingRecord) {
      console.warn(`Stacking record ${stackingId} not found for tenant ${tenantId}`);
      return;
    }

    if (stackingRecord.status !== "active") {
      console.log(`Stacking ${stackingId} already processed with status: ${stackingRecord.status}`);
      return;
    }

    // Ensure plan data
    let plan = stackingRecord.plan;
    if (!plan || !plan.dailyRate || plan.unstakingPeriod === undefined) {
      const stackingPlanModel = StackingPlan(mongoose);
      plan = await stackingPlanModel.findById(stackingRecord.plan).lean();
      if (!plan) {
        console.error(`Plan ${stackingRecord.plan} not found for stacking ${stackingId}`);
        return;
      }
    }

    // Calculate rewards - FIXED CALCULATION
    const amount = Number(stackingRecord.amount);
    const dailyRatePercent = Number(plan.dailyRate || 0);
    const unstakingPeriod = Number(plan.unstakingPeriod || 0);

    // Calculate total rewards for the entire stacking period
    const earnedRewards = Number((amount * (dailyRatePercent / 100) * unstakingPeriod).toFixed(8));
    const totalToCredit = Number((amount + earnedRewards).toFixed(8));
    const currency = plan.currency || "USDT";

    const walletModel = Wallet(mongoose);
    const txModel = Transaction(mongoose);
    const notifModel = Notification(mongoose);
    const userModel = User(mongoose);

    // ✅ Update stacking record
    await stackingModel.updateOne(
      { _id: stackingId, tenant: tenantId },
      {
        $set: {
          status: "completed",
          earnedRewards,
          completedAt: new Date(),
          updatedBy: null,
        },
      }
    );

    // ✅ Update user's wallet (principal + reward)
    const updatedWallet = await walletModel.findOneAndUpdate(
      { user: stackingRecord.user._id, symbol: currency, tenant: tenantId },
      {
        $inc: { amount: totalToCredit },
        $set: { updatedBy: null, updatedAt: new Date() }
      },
      { new: true, upsert: true, runValidators: true }
    );

    // ✅ Create staking reward transaction
    await txModel.create({
      type: "staking_reward",
      referenceId: stackingRecord._id,
      wallet: updatedWallet._id,
      asset: currency,
      amount: totalToCredit,
      status: "completed",
      direction: "in",
      user: stackingRecord.user._id,
      tenant: tenantId,
      dateTransaction: new Date(),
      createdBy: null,
      updatedBy: null,
    });

    // ✅ Create staking reward notification
    await notifModel.create({
      userId: stackingRecord.user._id,
      type: "staking",
      message: `Your stacking of ${amount} ${currency} has been completed. You earned ${earnedRewards} ${currency}.`,
      tenant: tenantId,
      forAdmin: false,
      status: "unread",
      createdBy: null,
      updatedBy: null,
    });

    // ✅ REFERRAL COMMISSION FOR EVERY STACKING (REMOVED FIRST STACKING CONDITION)
    const currentUser = await userModel.findById(stackingRecord.user._id);
    if (!currentUser) {
      console.warn(`User ${stackingRecord.user._id} not found for referral commission`);
      return;
    }

    // ✅ CURRENCY CONVERSION TO USDT FOR COMMISSION CALCULATION
    let commissionBaseAmount = earnedRewards;

    if (currency !== "USDT") {
      try {
        const coinMap = {
          BTC: "bitcoin",
          ETH: "ethereum",
          SOL: "solana",
          XRP: "ripple",
          USDT: "tether",
          BNB: "binancecoin",
          ADA: "cardano",
          DOGE: "dogecoin",
          DOT: "polkadot",
        };

        const coinId = coinMap[currency.toUpperCase()];
        if (!coinId) {
          console.warn(`Unsupported coin for conversion: ${currency}`);
          // If unsupported coin, skip commission to avoid errors
          return;
        }

        const resp = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: coinId,
              vs_currencies: "usd",
            },
            timeout: 10000, // 10 second timeout
          }
        );

        const price = Number(resp.data[coinId]?.usd || 0);
        if (!price || price <= 0) {
          console.warn(`Invalid price for ${currency}: ${price}`);
          // Skip commission if price is invalid
          return;
        }

        commissionBaseAmount = earnedRewards * price;
        console.log(`Converted ${earnedRewards} ${currency} to ${commissionBaseAmount} USDT at rate: ${price}`);

      } catch (error: any) {
        console.error(`Error converting ${currency} to USDT:`, error.message);
        // Skip commission if conversion fails
        return;
      }
    }

    // ✅ COMMISSION FOR EVERY STACKING (NOT JUST FIRST)
    const commissionLevels = [10, 7, 4]; // 3 levels: 10%, 7%, 4%
    let refSourceUser = currentUser;

    for (let level = 1; level <= 3; level++) {
      if (!refSourceUser.invitationcode) break;

      const refUser = await userModel.findOne({
        refcode: refSourceUser.invitationcode,
      });

      if (!refUser) break;

      const commission = Number((commissionBaseAmount * commissionLevels[level - 1]) / 100);

      // Update referrer wallet in USDT
      const refWallet = await walletModel.findOneAndUpdate(
        { user: refUser._id, symbol: "USDT", tenant: tenantId },
        { $inc: { amount: commission } },
        { new: true, upsert: true, runValidators: true }
      );

      // Create commission transaction
      await txModel.create({
        type: "referral_commission",
        referenceId: stackingRecord._id,
        wallet: refWallet._id,
        asset: "USDT",
        amount: commission,
        status: "completed",
        direction: "in",
        user: refUser._id,
        tenant: tenantId,
        dateTransaction: new Date(),
        createdBy: stackingRecord.user._id,
        updatedBy: null,
      });

      // Create notification for referrer
      await notifModel.create({
        userId: refUser._id,
        type: "commission",
        message: `You earned ${commission.toFixed(2)} USDT as level ${level} stacking commission from ${currentUser.email || "a user"}.`,
        tenant: tenantId,
        forAdmin: false,
        status: "unread",
        createdBy: stackingRecord.user._id,
        updatedBy: null,
      });

      console.log(`💰 Paid level ${level} commission: ${commission.toFixed(2)} USDT to ${refUser.email || refUser._id}`);

      // Move up the chain
      refSourceUser = refUser;
    }

    console.log(`✅ Auto-finalized stacking ${stackingId}: Credited ${totalToCredit} ${currency}`);

  } catch (error) {
    console.error("Error in autoFinalizeStackingJob:", error);
    throw error; // Re-throw to let the job queue handle retries
  }
}
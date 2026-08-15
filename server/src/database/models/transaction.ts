
import mongoose from "mongoose";

import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("transaction");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TransactionSchema = new Schema(
    {
      // ✅ Deposit, Withdraw, Convert
      type: {
        type: String,
        enum: [
          // Basic Operations
          "deposit",
          "withdraw",

          // Conversion
          "convert_in",
          "convert_out",

          // Investment
          "stacking",
          "staking_reward",
          "unstaking",

          // Trading - Futures
          "futures_profit",
          "futures_loss",
          "futures_fee",

          // Trading - Spot
          "spot_profit",
          "spot_loss",
          "spot_fee",

          "futures_reserved",      // ✅ Funds reserved when futures trade opens


          "futures_settlement",    // ✅ Final settlement transaction

          "futures_refund",        // ✅ Refund if trade fails to open

          // Manual Operations
          "manual_profit",         // ✅ Admin manually set profit

          "manual_adjustment",     // ✅ Manual balance adjustment

          // Order Management - NEW
          "order_reserved",        // ✅ Funds reserved for limit orders
          "order_cancelled",       // ✅ Funds released after cancellation
          "order_partial_fill",    // ✅ Partial order execution
          "order_completed",       // ✅ Full order completion

          // Rewards & Bonuses
          "reward",
          "bonus",
          "referral_commission",


        ],
        required: true,
      },
      referenceId: {
        type: Schema.Types.ObjectId,

      },
      // ✅ Which coin (BTC, ETH, USDT, etc.)
      wallet: {
        type: Schema.Types.ObjectId,
        ref: "wallet",
      },
      asset: {
        type: String,
      },

      // ✅ If conversion, show the "other side" of the trade
      relatedAsset: {
        type: String,
      },

      // ✅ Amount in that asset
      amount: {
        type: Number,
        required: true,
      },

      // ✅ Status of transaction
      status: {
        type: String,
        enum: ["pending", "canceled", "completed"],
        default: "pending",
      },

      // ✅ Direction (in/out) helps for UI
      direction: {
        type: String,
        enum: ["in", "out"],
        required: true,
      },

      // ✅ User reference
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      // ✅ Date of transaction
      dateTransaction: {
        type: Date,
        default: Date.now,
      },

      // ✅ Multi-tenancy (if you need it)
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      importHash: { type: String },
    },
    { timestamps: true }
  );

  TransactionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  TransactionSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TransactionSchema.set("toJSON", {
    getters: true,
  });

  TransactionSchema.set("toObject", {
    getters: true,
  });

  return database.model("transaction", TransactionSchema);
};

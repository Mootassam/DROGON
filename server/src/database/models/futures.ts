import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("futures");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const FuturesSchema = new Schema(
    {
      futuresAmount: { type: Number, required: true },

      contractDuration: {
        type: String, // '60s', '5m', '1h' etc.
        required: true
      },

      futuresStatus: {
        type: String,
        enum: ["long", "short"],
        default: "long"
      },
      futureCoin: {
        type: String,
      },

      openPositionPrice: { type: Number, required: true },
      openPositionTime: { type: Date, required: true },

      closePositionPrice: { type: Number },
      closePositionTime: { type: Date },

      profitAndLossAmount: { type: Number, default: 0 },
      leverage: { type: Number, default: 1 },

      // ✅ Manual control field
      control: {
        type: String,
        enum: ["loss", "profit"],
        default: "loss",
      },

      // ✅ Lock mechanism
      finalized: {
        type: Boolean,
        default: false,
      },

      finalizedAt: {
        type: Date,
      },

      // ✅ Store expiry directly
      expiryTime: {
        type: Date,
      },

      operate: {
        type: String,
        enum: ["high", "low"],
        default: "low"
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "user" },
      updatedBy: { type: Schema.Types.ObjectId, ref: "user" },

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true
      },

      importHash: { type: String },

      // 🆕 Account type (real/demo) - denormalized from user for fast filtering
      accountType: {
        type: String,
        enum: ["real", "demo"],
        default: "real"
      },
    },
    { timestamps: true }
  );


  FuturesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  // Index for efficient auto-finalization of expired futures
  FuturesSchema.index({ expiryTime: 1, finalized: 1 });
  FuturesSchema.index({ accountType: 1, finalized: 1, expiryTime: 1 });

  FuturesSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  FuturesSchema.set("toJSON", { getters: true });
  FuturesSchema.set("toObject", { getters: true });

  return database.model("futures", FuturesSchema);
};

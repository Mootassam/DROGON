import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("spot");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const SpotSchema = new Schema(
    {
      orderNo: {
        type: String,
        required: true,
        unique: true,
      },
      orderType: {
        type: String,
        enum: ["limit", "market"],
        required: true,
      },
      userAccount: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      tradingPair: {
        type: String, // e.g., BTC/USDT
        required: true,
      },
       status: {
        type: String,
        enum: ["pending", "completed","canceled"], // Direction of position
        default: "pending",
      }, 
      direction: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true,
      },

      delegateType: {
        type: String, // e.g., Limited Price, Market Price
        required: true,
      },

      delegateState: {
        type: String, // e.g., Sold, Pending
        required: true,
      },

      orderQuantity: {
        type: Number,
        required: true,
      },

      commissionPrice: {
        type: Number,
        required: true,
      },

      entrustedValue: {
        type: Number,
        required: true,
      },

      transactionQuantity: {
        type: Number,
      },

      transactionValue: {
        type: Number,
      },

      closingPrice: {
        type: Number,
      },

      handlingFee: {
        type: Number,
      },

      commissionTime: {
        type: Date,
      },

      closingTime: {
        type: Date,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      importHash: { type: String },
    },
    { timestamps: true }
  );

  SpotSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  SpotSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SpotSchema.set("toJSON", { getters: true });
  SpotSchema.set("toObject", { getters: true });

  return database.model("spot", SpotSchema);
};

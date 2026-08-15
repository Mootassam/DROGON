import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("withdraw");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const WithdrawSchema = new Schema(
    {

      withdrawType: {
        type: String,
        enum: ["bank", "crypto",]
      },
      orderNo: {
        type: String,
      },

      currency: {
        type: String,
      },
      withdrawAdress: {
        type: String,
      },

      withdrawAmount: {
        type: Number,
        required: true,
      },

      fee: {
        type: Number,
        required: true,
        default: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      auditor: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      acceptTime: {
        type: Date,
      },

      status: {
        type: String,
        enum: ["pending", "canceled", "success"],
        default: "pending",
      },

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

  WithdrawSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  WithdrawSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WithdrawSchema.set("toJSON", { getters: true });
  WithdrawSchema.set("toObject", { getters: true });

  return database.model("withdraw", WithdrawSchema);
};

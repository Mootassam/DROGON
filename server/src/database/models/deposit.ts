import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("deposit");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DepositSchema = new Schema(
    {

      depositType: {
        type: String,
        enum: ["bank", "crypto",]
      },

      orderno: {
        type: String,
      },
      amount: {
        type: String,
        required: true,
      },


      txid: {
        type: String,
      },
      network: {
        type: String,
        ref: "depositNetwork",
      },

      rechargechannel: {
        type: String,
      },
      rechargetime: {
        type: String,
        required: true,
      },
      auditor: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      acceptime: {
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

  DepositSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  DepositSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DepositSchema.set("toJSON", {
    getters: true,
  });

  DepositSchema.set("toObject", {
    getters: true,
  });

  return database.model("deposit", DepositSchema);
};

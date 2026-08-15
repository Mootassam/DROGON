import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("depositMethod");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DepositMethodSchema = new Schema(
    {
      symbol: {
        type: String,
        required: true,
        unique: true, // e.g. BTC, ETH, USDT
        uppercase: true,
        trim: true,
      },

      network: [
        {
          type: Schema.Types.ObjectId,
          ref: "depositNetwork",
          required: true,
        }
      ],


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

  DepositMethodSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  DepositMethodSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DepositMethodSchema.set("toJSON", {
    getters: true,
  });

  DepositMethodSchema.set("toObject", {

    getters: true,
  });

  return database.model("depositMethod", DepositMethodSchema);
};
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("depositNetwork");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DepositNetworkSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      wallet: {
        type: String,
        required: true,
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

  DepositNetworkSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  DepositNetworkSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DepositNetworkSchema.set("toJSON", {
    getters: true,
  });

  DepositNetworkSchema.set("toObject", {
    getters: true,
  });

  return database.model("depositNetwork", DepositNetworkSchema);
};

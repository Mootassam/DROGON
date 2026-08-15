import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("kyc");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const KycSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      Documenttype: {
        type: String,
      },
      realname: {
        type: String,
      },
      idnumer: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      front: [FileSchema],
      back: [FileSchema],
      selfie: [FileSchema],
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

  KycSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  KycSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  KycSchema.set("toJSON", {
    getters: true,
  });

  KycSchema.set("toObject", {
  
    getters: true,
  });

  return database.model("kyc", KycSchema);
};
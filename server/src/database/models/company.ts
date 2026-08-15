import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("company");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CompanySchema = new Schema(
    {
      name: {
        type: String,
      },
      companydetails: {
        type: String,
      },
      tc: {
        type: String,
      },
      faqs: {
        type: String,
      },
      photo: [FileSchema],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
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

  CompanySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  CompanySchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CompanySchema.set("toJSON", {
    getters: true,
  });

  CompanySchema.set("toObject", {
    getters: true,
  });

  return database.model("company", CompanySchema);
};

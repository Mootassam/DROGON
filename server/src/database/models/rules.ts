import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("rules");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RulesSchema = new Schema(
    {
      question: {
        type: String,
      },
      description: {
        type: String,
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

  RulesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  RulesSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RulesSchema.set("toJSON", {
    getters: true,
  });

  RulesSchema.set("toObject", {
    getters: true,
  });

  return database.model("rules", RulesSchema);
};

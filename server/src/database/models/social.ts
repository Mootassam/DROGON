import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("social");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SocialSchema = new Schema(
    {
      number: {
        type: String,
        required: true,
      },

      type: {
        type: String,
        required: true,
        enum: ["whatsApp", "telegram"],
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

  SocialSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  SocialSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SocialSchema.set("toJSON", {
    getters: true,
  });

  SocialSchema.set("toObject", {
    getters: true,
  });

  return database.model("social", SocialSchema);
};

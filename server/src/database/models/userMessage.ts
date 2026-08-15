import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("userMessage");
  } catch (error) {
    // continue, because model doesn't exist
  }

  const UserMessageSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        required: true,
      },

      content: {
        type: String,
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

      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },

      importHash: { type: String },
    },
    { timestamps: true }
  );

  UserMessageSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  UserMessageSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  UserMessageSchema.set("toJSON", { getters: true });
  UserMessageSchema.set("toObject", { getters: true });

  return database.model("userMessage", UserMessageSchema);
};

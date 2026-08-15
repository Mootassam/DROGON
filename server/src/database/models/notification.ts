import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default
  (database) => {
    try {
      return database.model("notification");
    } catch (error) {
      // continue, because model doesn't exist
    }

    const NotificationSchema = new Schema(
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: false
        },

        type: {
          type: String,
          enum: [
            "deposit",
            "withdraw",
            "staking",
            "kyc",
            "commission",
            "futures",
            "accountActivated",
            "custom",
            "cancel_deposit",
            "cancel_withdraw",
            "cancel_activated"
          ],
          required: true,
        },

        message: {
          type: String,
          required: true
        },

        status: {
          type: String,
          enum: ["unread", "read"],
          default: "unread",

        },

        forAdmin: {
          type: Boolean,
          default: false,
        },

        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: false,
        },

        updatedBy: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: false,
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

    NotificationSchema.index(
      { importHash: 1, tenant: 1 },
      {
        unique: true,
        partialFilterExpression: {
          importHash: { $type: "string" },
        },
      }
    );

    NotificationSchema.virtual("id").get(function () {
      // @ts-ignore
      return this._id.toHexString();
    });

    NotificationSchema.set("toJSON", { getters: true });
    NotificationSchema.set("toObject", { getters: true });

    return database.model("notification", NotificationSchema);
  };

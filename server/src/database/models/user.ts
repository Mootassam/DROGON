
import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
import TenantUserSchema from "./schemas/tenantUserSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("user");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const UserSchema = new Schema(
    {
      fullName: { type: String, maxlength: 255 },
      username: { type: String },
      refcode: { type: String, unique: true },

      invitationcode: {
        type: String,
        default: "NX25306510",
      },
      hasDeposited: { type: Boolean, default: false },

      // 🟩 New field to track if user completed their first deposit
      firstDepositDone: { type: Boolean, default: false },
      firstStackingDone: { type: Boolean, default: false },

      // 🆕 Demo/Real account type
      accountType: {
        type: String,
        enum: ["real", "demo"],
        default: "real"
      },

      phoneNumber: { type: String, maxlength: 24 },
      gender: { type: String, maxlength: 24 },
      ipAddress: { type: String },
      country: { type: String },
      withdrawPassword: { type: String },
      walletname: { type: String },
      usernamewallet: { type: String },
      erc20: {
        type: String,
      },
      trc20: {
        type: String,
      },


      preferredcoin: {
        type: String,
        enum: ["trc20", "erc20"],
        default: "trc20",
      },
      accountHolder: { type: String, },
      ibanNumber: { type: String, },
      bankName: { type: String, },
      ifscCode: { type: String, },
      wallet: {
        USDT: { address: "" },
        BTC: { address: "" },
        ETH: { address: "" },
        SOL: { address: "" },
        XRP: { address: "" },
      },
      // grab: { type: Boolean, default: false },
      // withdraw: { type: Boolean, default: false },
      // tasksDone: { type: Number, default: 0 },
      // balance: { type: Number, default: 0 },
      // freezeblance: { type: Number, default: 0 },
      score: { type: Number, default: 100 },
      email: { type: String, maxlength: 255, index: { unique: true } },
      password: { type: String, maxlength: 255, select: false },
      kyc: { type: Boolean, default: false },
      emailVerified: { type: Boolean, default: false },
      emailVerificationToken: { type: String, maxlength: 255, select: false },
      emailVerificationTokenExpiresAt: { type: Date },
      passwordResetToken: { type: String, maxlength: 255, select: false },
      passwordResetTokenExpiresAt: { type: Date },
      avatars: [FileSchema],
      tenants: [TenantUserSchema],
      jwtTokenInvalidBefore: { type: Date },
      createdBy: { type: Schema.Types.ObjectId, ref: "user" },
      updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
      importHash: { type: String, maxlength: 255 },
    },
    {
      timestamps: true,
    }
  );


  UserSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  UserSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  UserSchema.set("toJSON", {
    getters: true,
  });

  UserSchema.set("toObject", {
    getters: true,
  });

  return database.model("user", UserSchema);
};

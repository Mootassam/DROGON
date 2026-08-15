
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("stacking");
    
  } catch (error) {
    // continue, because model doesn't exist
  }
const StackingSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true, // tracks which user made this stake
      },
      plan: {
        type: Schema.Types.ObjectId,
        ref: "stakeProgram",
        required: true, // reference to the staking plan chosen
      },
      amount: {
        type: Number,
        required: true, // how much the user staked
      },
      status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active",
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date, // calculated based on plan.unstakingPeriod
      },
      earnedRewards: {
        type: Number,
        default: 0, // updated over time
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      createdBy: { type: Schema.Types.ObjectId, ref: "user" },
      updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
      importHash: { type: String },
    },
    { timestamps: true }
  );


  StackingSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StackingSchema.set("toJSON", {
    getters: true,
  });

  StackingSchema.set("toObject", {
    getters: true,
  });

  return database.model("stacking", StackingSchema);
};

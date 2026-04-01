const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "follwer is required"],
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "following is required"],
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "rejected", "accepted"],
        message:"status can only be pending, accepted or rejected."
      },
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;

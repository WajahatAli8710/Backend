const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "required for like post."],
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
      enum: ["post", "reel"],
    },
    type: {
      type: String,
      required: [true, "required for like post"],
    },
  },

  {
    timestamps: true,
  },
);

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    entityType: {
      type: String,
      required: true,
      enum: ["post", "reel"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;

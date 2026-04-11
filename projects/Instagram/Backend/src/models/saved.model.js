const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "required for saved post."],
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
      type: Boolean,
      default: false,
      required: [true, "required for saved post."],
    },
  },
  {
    timestamps: true,
  },
);

const savedModel = new mongoose.model("saved", savedSchema);

module.exports = savedModel;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
      mediaUrl: {
        type: [String],
        required: [true, "media url is required for creating an post"],
      },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    type: {
      type: String,
      enum: ["post", "reel"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required for creating an post"],
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;

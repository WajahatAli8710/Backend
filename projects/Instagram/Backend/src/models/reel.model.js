const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: [String],
      required: [true, "video url is required for creating an reel"],
    },
    type: {
      type: String,
      default: "reel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required for creating an reel"],
    },
  },
  {
    timestamps: true,
  },
);

const reelModel = mongoose.model("reel", reelSchema);

module.exports = reelModel;

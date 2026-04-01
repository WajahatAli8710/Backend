const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "required for like post."],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "required for like post."],
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

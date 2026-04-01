const mongoose = require("mongoose");

const savedPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "required for saved post."],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: [true, "required for saved post."],
  },
  type:{
    type:Boolean,
    default:false,
    required:[true, "required for saved post."],
  }
},
{
    timestamps:true
});

const savedPostModel = new mongoose.model("saved" , savedPostSchema)

module.exports = savedPostModel
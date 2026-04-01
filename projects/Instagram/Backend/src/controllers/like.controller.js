const likeModel = require("../models/like.model")
const postModel = require("../models/post.model");

async function likePostController(req, res) {
  const user = req.user.id;
  const post = req.params.postId;
  let isLike;

  const isPostExists = await postModel.findById(post);

  if (!isPostExists) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  const isAlreadyLike = await likeModel.findOne({
    user,
    post,
  });

  if (isAlreadyLike) {
    if (isAlreadyLike.type === "like") {
      isAlreadyLike.type = "dislike";
      await isAlreadyLike.save();
    } else {
      isAlreadyLike.type = "like";
      await isAlreadyLike.save();
    }
    return res.status(200).json({
      message:
        isAlreadyLike.type === "like"
          ? "post like successfully"
          : "post dislike successfully",
      data: isAlreadyLike,
    });
  } else {
    isLike = await likeModel.create({
      user,
      post,
      type: "like",
    });
    return res.status(201).json({
      message: "post like successfully",
      data: isLike,
    });
  }
}

module.exports = likePostController
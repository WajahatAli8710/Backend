const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");
const reelModel = require("../models/reel.model");

async function likePostController(req, res) {
  const user = req.user.id;
  const entityId = req.params.entityId;

  let isLike;
  let isEntityExists;

  if (!entityId) {
    return res.status(400).json({
      message: "id is required in params.",
    });
  }

  isEntityExists = await postModel.findById({ _id: entityId });

  if (!isEntityExists) {
    isEntityExists = await reelModel.findOne({ _id: entityId });
  }

  if (!isEntityExists) {
    return res.status(404).json({
      message: "not found",
    });
  }

  const isAlreadyLike = await likeModel.findOne({
    user,
    entityId: isEntityExists._id,
    entityType: isEntityExists.type,
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
        // isAlreadyLike.type === "like"
        //   ? "post like successfully"
        //   : "post dislike successfully",

        isAlreadyLike.type === "like"
          ? isAlreadyLike.entityType === "post"
            ? "post like successfully"
            : "reel like successfully"
          : isAlreadyLike.entityType === "post"
            ? "post  dislike successfully"
            : "reel dislike successfully",

      data: isAlreadyLike,
    });
  } else {
    isLike = await likeModel.create({
      user,
      entityId: isEntityExists._id,
      entityType: isEntityExists.type,
      type: "like",
    });
    return res.status(201).json({
      message:
        isLike.entityType === "post"
          ? "post like successfully"
          : "reel like successfully ",
      data: isLike,
    });
  }
}

module.exports = likePostController;

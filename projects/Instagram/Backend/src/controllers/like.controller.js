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
  // agar pehle se like hai to delete (unlike)
  await likeModel.findByIdAndDelete(isAlreadyLike._id);

  return res.status(204).json({
    message:
      isAlreadyLike.entityType === "post"
        ? "post unlike successfully"
        : "reel unlike successfully",
  });
} else {
  // agar like nahi hai to create karo
  const isLike = await likeModel.create({
    user,
    entityId: isEntityExists._id,
    entityType: isEntityExists.type,
    type: "like",
  });

  return res.status(201).json({
    message:
      isLike.entityType === "post"
        ? "post like successfully"
        : "reel like successfully",
    data: isLike,
  });
}
}

module.exports = likePostController;

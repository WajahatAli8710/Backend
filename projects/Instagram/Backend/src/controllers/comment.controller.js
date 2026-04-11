const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");
const reelModel = require("../models/reel.model")

async function createPostCommentController(req, res) {
  const { text } = req.body;
  const postId = req.params.id;

  const isPostExist = await postModel.findOne({
    _id: postId,
  });

  if (!isPostExist) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  if (!text) {
    return res.status(400).json({ message: "comment text required" });
  }

  const data = await commentModel.create({
    entityId: postId,
    entityType: "post",
    user: req.user.id,
    text: text,
  });

  return res.status(201).json({
    message: "add post comment successfully.",
    data,
  });
}

async function createReelCommentController(req, res) {
  const { text } = req.body;
  const reelId = req.params.id;
  const isReelExist = await reelModel.findOne({
    _id: reelId,
  });

  if (!isReelExist) {
    return res.status(404).json({
      message: "reel not found.",
    });
  }

  if (!text) {
    return res.status(400).json({ message: "comment text required" });
  }

  const data = await commentModel.create({
    entityId: reelId,
    entityType: "reel",
    user: req.user.id,
    text: text,
  });

  return res.status(201).json({
    message: "add reel comment successfully.",
    data,
  });
}

async function getPostCommentController(req, res) {
  const { postId } = req.params;

  const postComments = await commentModel
    .find({ entityId: postId, entityType: "post" })
    .populate("user");

  return res.status(200).json({
    message: "post comments fetch successfully.",
    data: postComments,
  });
}

async function getReelCommentController(req, res) {
  const { reelId } = req.params;

  const reelComments = await commentModel
    .find({ entityId: reelId, entityType: "reel" })
    .populate("user");

  return res.status(200).json({
    message: "reel comments fetch successfully.",
    data: reelComments,
  });
}

async function deleteCommentController(req, res) {
  const { commentId } = req.params;
  const user = req.user.id;

  const comment = await commentModel.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: "comment not found." });
  }

  if (comment.user.toString() !== user.toString()) {
    return res.status(403).json({ message: "Unauthorized access." });
  }

  await commentModel.findByIdAndDelete({ _id: comment._id });

  return res.status(204).end();
}

module.exports = {
  createPostCommentController,
  createReelCommentController,
  getPostCommentController,
  getReelCommentController,
  deleteCommentController,
};

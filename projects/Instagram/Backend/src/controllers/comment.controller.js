const commentModel = require("../models/comment.model");
const postModel = require("../models/post.model");

async function createCommentController(req, res) {
  const { text } = req.body;
  const postId = req.params.postId;

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
    post: postId,
    user: req.user.id,
    text,
  });

  return res.status(201).json({
    message: "add comment successfully.",
    data,
  });
}

async function getPostCommentController(req, res) {
  const { postId } = req.params;

  const comments = await commentModel.find({ post: postId }).populate("user");

  return res.status(200).json({
    message: "comments fetch successfully.",
    data: comments,
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

  await commentModel.findByIdAndDelete({_id:comment._id});

  return res.status(204).end()
}

module.exports = {
  createCommentController,
  getPostCommentController,
  deleteCommentController
};

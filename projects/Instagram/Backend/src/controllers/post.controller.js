const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const followModel = require("../models/follow.model");
const savedModel = require("../models/saved.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const commentModel = require("../models/comment.model");
const { fileTypeFromBuffer } = require("file-type");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"];

async function createPostController(req, res) {
  const { caption } = req.body;
  const files = req.files;

  let uploadedImages = [];
  let type;
  let actualImage = [];

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "no files uploaded" });
  }

  for (let file of files) {
    type = await fileTypeFromBuffer(file.buffer);

    if (!type) {
      return res.status(400).json({ message: "invalid file" });
    }

    if (!allowedMimeTypes.includes(type.mime)) {
      return res.status(400).json({ message: "only images are allowed" });
    }

    actualImage.push(file);
  }

  for (let image of actualImage) {
    const uploadedFile = await client.files.upload({
      file: await toFile(Buffer.from(image.buffer), "file"),
      fileName: image.originalname,
      folder: "/instagram/posts",
    });

    uploadedImages.push(uploadedFile.url);
  }

  const { id } = req.user;

  const post = await postModel.create({
    caption,
    imageUrl: uploadedImages,
    user: id,
  });

  res.status(201).json({
    message: "post created successfully",
    data: post,
  });
}

async function getPostController(req, res) {
  const user = req.user.id;

  const posts = await Promise.all(
    (await reelModel.find({ user: user.id }).lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: user.id,
        entityId: post._id,
        entityType: "post",
      });

      const commentsCount = await commentModel.aggregate([
        { $match: { entityId: post._id, entityType: "post" } },
        { $group: { _id: "$post", count: { $sum: 1 } } },
      ]);

      const likeCount = await likeModel.aggregate([
        { $match: { entityId: post._id, entityType: "post" } },
        { $group: { _id: "$post", count: { $sum: 1 } } },
      ]);

      post.isLiked = !!isLiked;
      post.commentsCount = commentsCount;
      post.likeCount = likeCount;

      return post;
    }),
  );

  if (!posts) {
    return res.status(404).json({
      message: "posts not found.",
    });
  }

  res.status(200).json({
    message: "posts fetch successfully",
    data: posts,
  });
}

async function getPostDetailController(req, res) {
  const postId = req.params;
  const user = req.user.id;

  const post = await postModel
    .findOne({
      _id: postId.id,
    })
    .populate("user")
    .lean();

  if (!post) {
    res.status(404).json({
      message: "post not found.",
    });
  }

  const isValidUser = post.user.toString() === user.id;

  if (!isValidUser) {
    return res.status(403).json({
      message: "not permission, Forbidden access.",
    });
  }

  const isLiked = await likeModel.findOne({
    user: user.id,
    entityId: post._id,
    entityType: "post",
  });

  const isSaved = await savedModel.findOne({
    user: user.id,
    entityId: post._id,
    entityType: "post",
  });

  const likeCount = await likeModel.aggregate([
    { $match: { entityId: post._id, entityType: "post" } },
    { $group: { _id: "$post", count: { $sum: 1 } } },
  ]);

  post.isLiked = !!isLiked;
  post.isSaved = !!isSaved;
  post.likeCount = likeCount;

  res.status(200).json({
    message: "post fetch successfully",
    data: post,
  });
}

async function getFeedController(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: post.user._id,
        entityId: post._id,
        entityType: "post",
      });

      const isFollowed = await followModel.findOne({
        follower: user.id,
        following: post.user._id,
      });

      const isSaved = await savedModel.findOne({
        user: user.id,
        entityId: post._id,
        entityType: "post",
      });

      const commentsCount = await commentModel.aggregate([
        { $match: { entityId: post._id, entityType: "post" } },
        { $group: { _id: "$post", count: { $sum: 1 } } },
      ]);

      const likeCount = await likeModel.aggregate([
        { $match: { entityId: post._id, entityType: "post" } },
        { $group: { _id: "$post", count: { $sum: 1 } } },
      ]);

      post.isLiked = !!isLiked;
      post.isFollowed = !!isFollowed;
      post.isSaved = !!isSaved;
      post.commentsCount = commentsCount;
      post.likeCount = likeCount;

      return post;
    }),
  );

  res.status(200).json({
    message: "get feed successfully",
    data: posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  getFeedController,
};

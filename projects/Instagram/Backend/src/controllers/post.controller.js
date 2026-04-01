const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const followModel = require("../models/follow.model");
const savedPostModel = require("../models/savedPost.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const commentModel = require("../models/comment.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "no files uploaded" });
  }
  let uploadedImages = [];

  for (let file of files) {
    const uploadedFile = await client.files.upload({
      file: await toFile(Buffer.from(file.buffer), "file"),
      fileName: "fileName",
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
  const posts = await postModel.find({
    user: req.user.id,
  });

  if (!posts) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  res.status(200).json({
    message: "post fetch successfully",
    data: posts,
  });
}

async function getPostDetailController(req, res) {
  const postId = req.params;

  let post;
  try {
    post = await postModel.findOne({
      _id: postId.id,
    });
  } catch (err) {
    return res.status(404).json({
      message: "post not found.",
    });
  }

  const isValidUser = post.user.toString() === req.user.id;

  if (!isValidUser) {
    return res.status(403).json({
      message: "not permission, Forbidden access.",
    });
  }

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
        user: user.id,
        post: post._id,
      });

      const isFollowed = await followModel.findOne({
        follower: user.id,
        following: post.user._id,
      });

      const isSaved = await savedPostModel.findOne({
        user: user.id,
        post: post._id,
      });

      const commentsCount = await commentModel.aggregate([
        { $match: { post: post._id } },
        { $group: { _id: "$post", count: { $sum: 1 } } },
      ]);

      const likeCount = await likeModel.aggregate([
        { $match: { post: post._id } },
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

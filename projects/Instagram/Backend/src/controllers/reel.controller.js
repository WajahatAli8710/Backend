const reelModel = require("../models/reel.model");
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

const allowedMimeTypes = ["video/mp4", "video/avi", "video/mkv"];

async function createReelController(req, res) {
  const { caption } = req.body;
  const file = req.file;

  let uploadedVideo;
  let type;

  if (!file) {
    return res.status(400).json({ message: "no file uploaded" });
  }

  type = await fileTypeFromBuffer(file.buffer);

  if (!type) {
    return res.status(400).json({ message: "invalid file" });
  }

  if (!allowedMimeTypes.includes(type.mime)) {
    return res.status(400).json({ message: "only video are allowed" });
  }

  const uploadedFile = await client.files.upload({
    file: await toFile(Buffer.from(file.buffer), "file"),
    fileName: file.originalname,
    folder: "/instagram/reels",
  });

  uploadedVideo = uploadedFile.url;

  const { id } = req.user;

  const reel = await reelModel.create({
    caption,
    videoUrl: uploadedVideo,
    user: id,
  });

  res.status(201).json({
    message: "reel created successfully",
    data: reel,
  });
}

async function getReelController(req, res) {
  const user = req.user.id;

  const reels = await Promise.all(
    (await reelModel.find({ user: req.user.id }).populate("user").lean()).map(
      async (reel) => {
        const isLiked = await likeModel.findOne({
          user: user.id,
          entityId: reel._id,
          entityType: "reel",
        });

        const commentsCount = await commentModel.aggregate([
          { $match: { entityId: reel._id, entityType: "reel" } },
          { $group: { _id: "$post", count: { $sum: 1 } } },
        ]);

        const likeCount = await likeModel.aggregate([
          { $match: { entityId: reel._id, entityType: "reel" } },
          { $group: { _id: "$post", count: { $sum: 1 } } },
        ]);

        reel.isLiked = !!isLiked;
        reel.commentsCount = commentsCount;
        reel.likeCount = likeCount;

        return reel;
      },
    ),
  );

  if (!reels) {
    return res.status(404).json({
      message: "reels not found.",
    });
  }

  res.status(200).json({
    message: "reels fetch successfully",
    data: reels,
  });
}

async function getReelDetailController(req, res) {
  const reelId = req.params;
  const user = req.user.id;

  const reel = await reelModel
    .findOne({
      _id: reelId.id,
    })
    .populate("user")
    .lean();

  if (!reel) {
    res.status(404).json({
      message: "reel not found.",
    });
  }

  const isValidUser = reel.user.toString() === user.id;

  if (!isValidUser) {
    return res.status(403).json({
      message: "not permission, Forbidden access.",
    });
  }

  const isLiked = await likeModel.findOne({
    user: user.id,
    entityId: reel._id,
    entityType: "reel",
  });

  const isSaved = await savedModel.findOne({
    user: user.id,
    entityId: reel._id,
    entityType: "reel",
  });

  const likeCount = await likeModel.aggregate([
    { $match: { entityId: reel._id, entityType: "reel" } },
    { $group: { _id: "$post", count: { $sum: 1 } } },
  ]);

  reel.isLiked = !!isLiked;
  reel.isSaved = !!isSaved;
  reel.likeCount = likeCount;

  res.status(200).json({
    message: "reel fetch successfully",
    data: reel,
  });
}

async function getFeedController(req, res) {
  const user = req.user;

  const reels = await Promise.all(
    (await reelModel.find().sort({ createdAt: -1 }).populate("user").lean()).map(async (reel) => {
      const isLiked = await likeModel.findOne({
        user: user.id,
        entityId: reel._id,
        entityType: "reel",
      });

      const isFollowed = await followModel.findOne({
        follower: user.id,
        following: reel.user._id,
      });

      const isSaved = await savedModel.findOne({
        user: user.id,
        entityId: reel._id,
        entityType: "reel",
      });

      const commentsCount = await commentModel.aggregate([
        { $match: { entityId: reel._id, entityType: "reel" } },
        { $group: { _id: "$reel", count: { $sum: 1 } } },
      ]);

      const likeCount = await likeModel.aggregate([
        { $match: { entityId: reel._id, entityType: "reel" } },
        { $group: { _id: "$reel", count: { $sum: 1 } } },
      ]);
      const savedCount = await savedModel.aggregate([
        { $match: { entityId: reel._id, entityType: "reel" } },
        { $group: { _id: "$reel", count: { $sum: 1 } } },
      ]);

      reel.isLiked = !!isLiked;
      reel.isFollowed = !!isFollowed;
      reel.isSaved = !!isSaved;
      reel.commentsCount = commentsCount;
      reel.likeCount = likeCount;
      reel.savedCount = savedCount  

      return reel;
    }),
  );

  if (!reels) {
    return res.status(404).json({ message: "reels not found." });
  }

  res.status(200).json({
    message: "get feed successfully",
    data: reels,
  });
}

module.exports = {
  createReelController,
  getReelController,
  getReelDetailController,
  getFeedController,
};

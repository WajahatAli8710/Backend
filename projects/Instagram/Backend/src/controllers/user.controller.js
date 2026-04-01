const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const follower = req.user.id;

  const following = req.params.userId;

  if (follower === following) {
    return res.status(400).json({
      message: "you cant following your self.",
    });
  }

  const isFollowingExists = await userModel.findOne({
    _id: following,
  });

  if (!isFollowingExists) {
    return res.status(404).json({
      message: "following user cant exists.",
    });
  }

  const isAlreadyFollow = await followModel.findOne({
    follower,
    following,
  });

  if (isAlreadyFollow) {
    return res.status(409).json({
      message: "you are already following.",
    });
  }

  const follow = await followModel.create({
    follower,
    following,
  });

  res.status(201).json({
    message: "you are successfully following",
  });
}

async function unfollowUserController(req, res) {
  const follower = req.user.id;
  const following = req.params.userId;

  if (follower === following) {
    return res.status(400).json({
      message: "you cant Unfollowing your self.",
    });
  }

  const isFollowingExists = await followModel.findOne({
    follower,
    following,
  });

  if (!isFollowingExists) {
    return res.status(404).json({
      message: "you cant following this user.",
    });
  }

  const unfollow = await followModel.findByIdAndDelete(isFollowingExists._id);
  res.status(204);
}

async function setFollowStatusUserController(req, res) {
  const followRequestId = req.params.id;
  const following = req.user.id;
  const status = req.body.status;

  const isUserFollowing = await followModel.findOne({
    _id: followRequestId,
  });

  if (!isUserFollowing) {
    return res.status(404).json({
      message: "follow request not found.",
    });
  }

  const isFollowingAuth = following === isUserFollowing.following.toString();

  if (!isFollowingAuth) { 
    return res.status(403).json({
      message: "you are not allowed to update this follow request.",
    });
  }

  const isAlreadyFollowUpdated = isUserFollowing.status === "pending";

  if (!isAlreadyFollowUpdated) {
    return res.status(400).json({
      message: "follow request already processed",
    });
  }

  await followModel.findByIdAndUpdate(
    isUserFollowing._id,
    { status: status },
  );

   const followStatusUpdated = await followModel.findOne({_id:followRequestId})

  res.status(200).json({
    message: "follow request status updated successfully",
    followStatusUpdated,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  setFollowStatusUserController,
};

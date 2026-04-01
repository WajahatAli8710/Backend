const postModel = require("../models/post.model");
const savedPostModel = require("../models/savedPost.model");

async function savedPostController(req, res) {
  const user = req.user.id;
  const post = req.params.postId;
  let isSaved;

  const isPostExists = await postModel.findOne({ _id: post });

  if (!isPostExists) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isAlreadySaved = await savedPostModel.findOne({
    user,
    post,
  });

  if (isAlreadySaved) {
    if (isAlreadySaved.type === true) {
      isAlreadySaved.type = false;
      await isAlreadySaved.save();
    } else {
      isAlreadySaved.type = true;
      await isAlreadySaved.save();
    }
    return res.status(200).json({
      message:
        isAlreadySaved.type === true
          ? "post saved successfully"
          : "post not saved",
      data: isAlreadySaved,
    });
  } else {
    isSaved = await savedPostModel.create({
      user,
      post,
      type: true,
    });
  }

  return res.status(201).json({
    message: "post saved successfully",
    data: isSaved,
  });
}

module.exports = savedPostController;

const postModel = require("../models/post.model");
const reelModel = require("../models/reel.model");
const savedModel = require("../models/saved.model");

async function savedController(req, res) {
  const user = req.user.id;
  const entityId = req.params.entityId;
  let isSaved;

  let isEntityExists;

  if (!entityId) {
    return res.status(400).json({
      message: "id is required in params.",
    });
  }

  isEntityExists = await postModel.findOne({ _id: entityId });

  if (!isEntityExists) {
    isEntityExists = await reelModel.findOne({ _id: entityId });
  }

  if (!isEntityExists) {
    return res.status(404).json({
      message: "not found",
    });
  }

  const isAlreadySaved = await savedModel.findOne({
    user,
    entityId: isEntityExists._id,
    entityType: isEntityExists.type,
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
          ? isAlreadySaved.entityType === "post"
            ? "post saved successfully"
            : "reel saved successfully"
          : isAlreadySaved.entityType === "post"
            ? "post not saved"
            : "reel not saved",
      data: isAlreadySaved,
    });
  } else {
    isSaved = await savedModel.create({
      user,
      entityId: isEntityExists._id,
      entityType: isEntityExists.type,
      type: true,
    });
  }

  return res.status(201).json({
    message:
      isSaved.entityType === "post"
        ? "post saved successfully"
        : "reel saved successfully ",
    data: !!isSaved,
  });
}

module.exports = savedController;

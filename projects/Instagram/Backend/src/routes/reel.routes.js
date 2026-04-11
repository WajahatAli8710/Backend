const express = require("express");
const reelController = require("../controllers/reel.controller");
const multer = require("multer");
const reelRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")

const upload = multer({ storage: multer.memoryStorage() });

reelRouter.post("/",upload.single("videoUrl"),identifyUser , reelController.createReelController);

reelRouter.get("/",identifyUser, reelController.getReelController);

reelRouter.get("/detail/:id",identifyUser, reelController.getReelDetailController);

reelRouter.get("/get-feed" , identifyUser, reelController.getFeedController)



module.exports = reelRouter;

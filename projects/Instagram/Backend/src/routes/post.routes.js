const express = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const postRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/",upload.array("imageUrl", 5),identifyUser , postController.createPostController);

postRouter.get("/",identifyUser, postController.getPostController);

postRouter.get("/detail/:id",identifyUser, postController.getPostDetailController);

postRouter.get("/get-feed" , identifyUser, postController.getFeedController)



module.exports = postRouter;

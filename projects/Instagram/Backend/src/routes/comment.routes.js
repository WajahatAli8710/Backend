const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const commentController = require("../controllers/comment.controller")

const commentRouter = express.Router()

commentRouter.post("/post/:id" , identifyUser , commentController.createPostCommentController )
commentRouter.post("/reel/:id" , identifyUser , commentController.createReelCommentController )
commentRouter.get("/post/:id" , identifyUser , commentController.getPostCommentController)
commentRouter.get("/reel/:id" , identifyUser , commentController.getReelCommentController)
commentRouter.delete("/:commentId", identifyUser , commentController.deleteCommentController)


module.exports = commentRouter
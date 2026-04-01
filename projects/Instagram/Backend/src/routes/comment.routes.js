const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const commentController = require("../controllers/comment.controller")

const commentRouter = express.Router()

commentRouter.post("/:postId" , identifyUser , commentController.createCommentController )
commentRouter.get("/:postId" , identifyUser , commentController.getPostCommentController)
commentRouter.delete("/:commentId", identifyUser , commentController.deleteCommentController)

module.exports = commentRouter
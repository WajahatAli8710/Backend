const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


const userRouter = express.Router()

userRouter.post("/follow/:userId" , identifyUser , userController.followUserController)
userRouter.post("/unfollow/:userId" , identifyUser , userController.unfollowUserController)
userRouter.patch("/follow/:id" , identifyUser ,userController.setFollowStatusUserController )

module.exports = userRouter

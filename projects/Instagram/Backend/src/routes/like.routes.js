const express = require("express");
const likePostController = require("../controllers/like.controller");
const identifyUser = require("../middlewares/auth.middleware")
const likeRouter = express.Router();


likeRouter.post("/:entityId" , identifyUser ,likePostController)

module.exports = likeRouter;

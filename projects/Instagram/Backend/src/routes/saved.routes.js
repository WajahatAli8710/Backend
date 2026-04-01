const express = require("express");
const savedPostController = require("../controllers/saved.controller");
const savedRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")

savedRouter.post("/:postId" , identifyUser , savedPostController)

module.exports = savedRouter;

const express = require("express");
const savedController = require("../controllers/saved.controller");
const savedRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware")

savedRouter.post("/:entityId" , identifyUser , savedController)

module.exports = savedRouter;

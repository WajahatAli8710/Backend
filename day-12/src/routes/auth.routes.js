const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "user already exists with this email",
    });
  }

  const hashPassword = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    user,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }

  const isPasswordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatch) {
    res.status(401).json({
      message: "Invaild password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "user login successfully",
  });
});
module.exports = authRouter;

const express = require("express");
const userModel = require("../models/auth.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existsUser = await userModel.findOne({ email });

  if (existsUser) {
    return res.status(409).json({
      message: "User already exists try another email",
    });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(201).json({
    message: "user reqister successfully",
    newUser,
  });
});

authRouter.get("/getme", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }

  const user = await userModel.findById(decodedToken.id);

  res.status(200).json({ message: "user successfully get", user });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isPasswordVaild = user.password === hashPassword;

  if (!isPasswordVaild) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "User login successfully",
  });
});

module.exports = authRouter;

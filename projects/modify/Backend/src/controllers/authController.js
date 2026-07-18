const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegister) {
    return res.status(409).json({
      message: "user already exists.",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfully.",
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUser) {
    return res.status(400).json({
      message: "Invaild credentials",
    });
  }

  const isPasswordVaild = await bcrypt.compare(password, isUser.password);

  if (!isPasswordVaild) {
    return res.status(400).json({
      message: "Invaild credentials",
    });
  }

  const token = jwt.sign(
    {
      id: isUser._id,
      username: isUser.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      username: isUser.username,
      email: isUser.email,
      password: isUser.password,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
};

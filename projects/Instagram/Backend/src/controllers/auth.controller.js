const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function reqisterController(req, res) {
  const { name , username, email, password, bio, profilePic } = req.body;

  const isUserAlreadyExixts = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExixts) {
    return res.status(409).json({
      message:
        "user already exists " +
        (isUserAlreadyExixts.email === email
          ? "email conflict"
          : "username conflict"),
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
    bio,
    profilePic,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user register successfully",
    user: {
      name : user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Unauthorize access",
    });
  }

  const compairePassword = await bcrypt.compare(password, user.password);

  if (!compairePassword) {
    return res.status(401).json({
      message: "Unauthorize access",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    },
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;
  const user = await userModel.findById(userId)
  return res.send(user);
}

module.exports = {
  reqisterController,
  loginController,
  getMeController
};

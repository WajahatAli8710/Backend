const jwt = require("jsonwebtoken");

function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not provided, unauthorize access.",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      message: "invaild token, unauthorize access.",
    });
  }

  req.user = decoded;
  next();
}

module.exports = identifyUser;

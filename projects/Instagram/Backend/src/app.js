const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const reelRouter = require("./routes/reel.routes");
const userRouter = require("./routes/user.routes");
const likeRouter = require("./routes/like.routes");
const savedRouter = require("./routes/saved.routes");
const commentRouter = require("./routes/comment.routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/reel", reelRouter);
app.use("/api/user", userRouter);
app.use("/api/like", likeRouter);
app.use("/api/saved", savedRouter);
app.use("/api/comment", commentRouter);

module.exports = app;

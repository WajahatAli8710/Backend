const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./router/auth.routes");

const app = express();

app.use(cookieParser());
app.use(express.json());

// router
app.use('/api/auth' , router)

module.exports = app;

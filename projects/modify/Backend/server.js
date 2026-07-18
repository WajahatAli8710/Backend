require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, function () {
  console.log("server is runing on port 3000");
});

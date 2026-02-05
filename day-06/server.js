require("dotenv").config()
const app = require("./src/app");


const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      process.env.MongoDB_URI
    )
    .then(() => {
      console.log("Connect to Db.");
    });
}

connectToDb()

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

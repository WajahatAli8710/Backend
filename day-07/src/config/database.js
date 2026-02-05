const mongoose = require("mongoose")

function connectToDB(){
     mongoose.connect(process.env.Mongo_URI)
     .then(()=>{
        console.log("Connect to db");
        
     })
}

module.exports = connectToDB
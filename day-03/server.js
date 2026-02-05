const express = require("express");

const app = express();
const notes = [];
app.use(express.json());

app.post("/notes", (req, res) => {
  notes.push(req.body);
    console.log(notes);
    
  res.send("note created");
});

app.get("/notes" , (req , res)=>{
    console.log(notes);

    res.send(notes)
    
})

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});

const express = require("express");

const app = express();
app.use(express.json());
const notes = [];
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "notes created successfully",
    notes,
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "fetch successufully",
    notes,
  });
});

app.get("/notes/:idx", (req, res) => {
  res.status(200).json({
    message: "fetch indiviual successfully",
    notes: notes[req.params.idx],
  });

  console.log(notes[1]);
  
});

app.delete("/notes/:idx", (req, res) => {
  delete notes[req.params.idx];

  res.status(204);
});

app.patch("/notes/:idx", (req, res) => {
  notes[req.params.idx].description = req.body.description;

  res.status(200).json({
    message: "update notes successfully",
    notes: notes[req.params.idx],
  });
});
module.exports = app;

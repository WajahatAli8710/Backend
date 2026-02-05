const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.send("notes created successfully");
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].description = req.body.description;

  res.send("notes updated successfully");
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];

  res.send("notes deleted successfully");
});
module.exports = app;

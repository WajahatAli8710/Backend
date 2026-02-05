const express = require("express");
const app = express();
const notesModel = require("./models/notes.model");

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "notes created successfully",
    notes,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: "notes Fetched successfully",
    notes,
  });

  console.log("llllll");
});

module.exports = app;

const notes = require('express').Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("../db.json").then((data) => res.json(JSON.parse(data)));
});


notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuid(),
    };

    readAndAppend(newNote, "../db.json");
    res.json(``);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
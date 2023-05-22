const notes = require('express').Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const fs = require('fs');

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title: title,
      text: text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(``);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  const noteId = req.params.id;

  const notes = JSON.parse(fs.readFileSync("./db/db.json"));

  const filteredNotes = notes.filter((note) => note.id !== noteId);

  fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes));

  res.status(200).send(`Note with id ${noteId} deleted.`);
});


module.exports = notes;
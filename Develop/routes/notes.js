const notes = require('express').Router();
const { text } = require('express');
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db.json").then((data) => res.json(JSON.parse(data)));
});


notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a tip`);
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

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

module.exports = notes;
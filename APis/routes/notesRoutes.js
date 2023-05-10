const express = require("express");
const { getNotes, createNotes, deleteNotes, updateNotes } = require("../controllers/noteController");
const auth = require("../middleware/auth");
const noteRoute = express.Router();

noteRoute.get("/", auth ,getNotes);

noteRoute.post("/", auth ,createNotes);

noteRoute.delete("/:id",auth,deleteNotes);
noteRoute.patch("/:id",auth,updateNotes);
module.exports = noteRoute;    



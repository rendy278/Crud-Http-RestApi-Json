import { Router } from "express";
import Database from "../Database.js";
let router = Router();

router.get("/", async (req, res) => {
  try {
    let db = await Database.init();
    res.json(db.notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to load database" });
  }
});

router.post("/", async (req, res) => {
  try {
    let db = await Database.init();
    db.notes.push(req.body.note);
    await Database.save(db);
    res.status(200).json(db.notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to send database" });
  }
});

router.put("/", async (req, res) => {
  try {
    let db = await Database.init();
    let indexToUpdate = db.notes.findIndex((note) => {
      return note.id === req.body.note.id;
    });
    db.notes[indexToUpdate] = req.body.note;
    await Database.save(db);
    res.status(200).json(db.notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit database" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let db = await Database.init();
    let idToDelete = req.params.id;
    let indexToDelete = db.notes.findIndex((note) => {
      return note.id === idToDelete;
    });
    db.notes.splice(indexToDelete);
    await Database.save(db);
    res.status(200).json(db.notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete database" });
  }
});

export default router;

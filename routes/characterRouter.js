import express from "express";
import {
  getCharacters,
  getCharacterName,
  createCharacter,
  updateCharacter,
  murderCharacter
} from "../models/characterModels.js";
const router = express.Router();

router.get("/", async function (req, res) {
  if (req.query.char_name !== undefined) {
    const character = await getCharacterName(req.query.char_name);
    return res.json({ success: true, payload: character });
  } else {
    const characters = await getCharacters();
    return res.json({ success: true, payload: characters });
  }
});

router.post("/", async function (req, res) {
  const character = req.body;
  const newCharacter = await createCharacter(character);
  res.json({ success: true, payload: newCharacter });
});

router.patch("/:id", async function (req, res) {
  console.log("req.body:", req.body, req.params.id);
  const editCharacter = (req.body, req.params.id);
  const editedCharacter = await updateCharacter(editCharacter);
  console.log("edited:", editedCharacter);
  res.json({ success: true, payload: editedCharacter });
});

router.delete("/", async function (req, res) {
  const deletedCharacter = await murderCharacter(req.params.id);
  res.json({ success: true, payload: deletedCharacter });
});

export default router;

import express from "express";
import {
  getCharacters,
  getCharacterName,
  createCharacter,
  updateCharacter,
  murderCharacter,
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

// router.get("/", async function (req, res) {
//     const character = await getCharacterName();
//     res.json({ success: true, payload: character });
// });

router.post("/", async function (req, res) {
  const character = req.body;
  const newCharacter = await createCharacter(character);
  res.json({ success: true, payload: newCharacter });
});

router.patch("/", async function (req, res) {
  const editCharacter = req.body;
  const editedCharacter = await updateCharacter(editCharacter);
  res.json({ success: true, payload: editedCharacter });
});

router.delete("/", async function (req, res) {
  const deletedCharacter = await murderCharacter(req.params.id);
  res.json({ success: true, payload: deletedCharacter });
});

export default router;

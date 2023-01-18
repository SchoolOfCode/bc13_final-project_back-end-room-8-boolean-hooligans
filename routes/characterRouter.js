import express from "express";
import {
  getCharacters,
  getCharacterName,
  createCharacter,
  updateCharacter,
  murderCharacter,
  getUsersCharacters
} from "../models/characterModels.js";
const router = express.Router();


//Get all characters and search by parameter

router.get("/", async function (req, res) {
  if (req.query.user_id !== undefined) {
    const character = await getUsersCharacters(req.query.char_name);
    return res.json({ success: true, payload: character })}
  if (req.query.char_name !== undefined) {
    const character = await getCharacterName(req.query.char_name);
    return res.json({ success: true, payload: character });
  } else {
    const characters = await getCharacters();
    return res.json({ success: true, payload: characters });
  }
});


//Create Character

router.post("/", async function (req, res) {
  const character = req.body;
  const newCharacter = await createCharacter(character);
  res.json({ success: true, payload: newCharacter });
});


//Edit/Update Character 

router.patch("/:id", async function (req, res){
  const result = await updateCharacter(req.params.id, req.body)
  res.json({ success: true, payload: result });
})


// Delete Character

router.delete("/:id", async function (req, res) {
  const deletedCharacter = await murderCharacter(req.params.id);
  res.json({ success: true, payload: deletedCharacter });
});

export default router;

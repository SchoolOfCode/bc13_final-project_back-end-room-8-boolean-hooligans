import express from "express";
const router = express.Router();
import db from "..db/db.js";
import {
    getCharacters,
    getCharacterName,
    createCharacter,
    updateCharacter,
    murderCharacter
} from "../models/characterModels";

router.get("/", async function (req, res) {
    const characters = await getCharacters();
    res.json({ success: true, payload: characters });
});

router.get("/", async function (req, res) {
    const character = await getCharacterName();
    res.json({ success: true, payload: character });
});

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

})
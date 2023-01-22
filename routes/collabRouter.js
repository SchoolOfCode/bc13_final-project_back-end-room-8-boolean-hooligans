import express from "express";

import {
  getAllCollabData,
  getUsersSharedCharacters,
  shareCharacter
} from "../models/CollabModels.js";

const collabRouter = express.Router();

collabRouter.get("/", async function (req, res) {
  if (req.query.user_email !== undefined) {
    const characters = await getUsersSharedCharacters(req.query.user_email);
    return res.json({ success: true, payload: characters });
  } else {
    const characters = await getAllCollabData();

    return res.json({ success: true, payload: characters });
  }
});

//Create Character

collabRouter.post("/", async function (req, res) {
  const character = req.body;
  const newCharacter = await shareCharacter(character);
  res.json({ success: true, payload: newCharacter });
});

export default collabRouter;

import query from "../db/db.js";

export async function getAllCollabData() {
  const retrieveCharacters = await query("SELECT * FROM Collab");
  return retrieveCharacters.rows;
}
//**********Get user specific characters**********

export async function getUsersSharedCharacters(email) {
  const retrieveCharacters = await query(
    "SELECT * FROM CharacterTable JOIN Collab ON CharacterTable.character_id = Collab.character_id WHERE Collab.user_email = $1",
    [email]
  );
  return retrieveCharacters.rows;
}

export async function shareCharacter(data) {
  const createCharacter = await query(
    "INSERT INTO Collab (user_email, character_id) VALUES ($1, $2) RETURNNING *",
    [data.user_email, data.character_id]
  );
  const newCharacter = createCharacter.rows[0];
  return newCharacter;
}

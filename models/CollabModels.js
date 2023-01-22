import query from "../db/db.js";

export async function getAllCollabData() {
    const retrieveCharacters = await query("SELECT * FROM Collab");
    return retrieveCharacters.rows;
  }
  //**********Get user specific characters**********
  
  export async function getUsersSharedCharacters(email) {
    const retrieveCharacters = await query("SELECT * FROM CharacterTable JOIN Collab ON CharacterTable.character_id = Collab.character_id WHERE Collab.user_email = $1", [email]);
    return retrieveCharacters.rows;
  }
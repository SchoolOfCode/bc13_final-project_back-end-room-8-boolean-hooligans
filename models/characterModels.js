import query from "../db/db.js";

export async function getCharacters() {
    const retrieveCharacters = await query ("SELECT * FROM CharacterTable");
    return retrieveCharacters.rows;
}

export async function getCharacterName(name) {
    const retrieveCharacter = await query
    ("SELECT * FROM CharacterTable WHERE char_name LIKE $1", [`%${name}%`]);
    return retrieveCharacter.rows;
}
// more dynamic - allow empty fields
export async function createCharacter(data) {
    const createCharacter = await query ("INSERT INTO CharacterTable (char_name, char_height, char_age, char_alive) VALUES ($1, $2, $3, $4", [data.char_name, data.char_height, data.char_age, data.char_alive]);
    const newCharacter = createCharacter.rows[0];
    return newCharacter;
}
// make this more dynamic - certain things may be blank
export async function updateCharacter(id, data) {
    const updateCharacter = await query ("UPDATE CharacterTable SET * char_name = $1, char_height = $2, char_age = $3, char_alive = $4 WHERE char_id = $5", [data.char_name, data.char_height, data.char_age, data.char_alive, id]);
    const updatedCharacter = updateCharacter.rows;
    return updatedCharacter;
}

export async function murderCharacter(id) {
    const murderCharacter = await query ("DELETE * FROM CharacterTable WHERE char_id = $1, RETURNING *", [id]);
    const murderedCharacter = murderCharacter.rows[0];
    return murderedCharacter;
}
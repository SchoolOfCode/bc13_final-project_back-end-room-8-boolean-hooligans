import query from "../db/db.js";

//**********Get all characters**********

export async function getCharacters() {
  const retrieveCharacters = await query("SELECT * FROM CharacterTable");
  return retrieveCharacters.rows;
}

//**********Search for character by name**********

export async function getCharacterName(name) {
  const retrieveCharacter = await query(
    "SELECT * FROM CharacterTable WHERE char_name ILIKE $1",
    [`${name}%`]
  );
  return retrieveCharacter.rows;
}

//**********Edit/Update Character by ID**********
// make this more dynamic - certain things may be blank

// export async function updateCharacter(id, data) {
//   const update = await query(
//     "UPDATE CharacterTable SET user_id = $1, char_name = $2, char_height = $3, char_age = $4, char_alive = $5 WHERE character_id = $6 returning *",
//     [
//       data.user_id,
//       data.char_name,
//       data.char_height,
//       data.char_age,
//       data.char_alive,
//       id
//     ]
//   );

//   return update.rows;
// }



export async function updateCharacter(id, data) {

let thingToEdit = Object.keys(data)[1]

const update = await query(`UPDATE CharacterTable SET ${thingToEdit} = $1 WHERE character_id = $2 returning *`,[data[thingToEdit], id])
console.log(update)
return update.rows;
}




//**********Delete character by ID**********

export async function murderCharacter(id) {
  const murderCharacter = await query(
    "DELETE FROM CharacterTable WHERE character_id = $1 RETURNING *",
    [id]
  );
  const murderedCharacter = murderCharacter.rows[0];
  return murderedCharacter;
}

//**********Create new character**********
// not dynamic version (leaving for now in case of emergencies - this works if everything is filled in and is much simpler)

// export async function createCharacter(data) {
//   const createCharacter = await query(
//     "INSERT INTO CharacterTable (user_id, char_name, char_height, char_age, char_alive) VALUES ($1, $2, $3, $4, $5)",
//     [
//       data.user_id,
//       data.char_name,
//       data.char_height,
//       data.char_age,
//       data.char_alive
//     ]
//   );
//   const newCharacter = createCharacter.rows[0];
//   return newCharacter;
// }

//dynamic version

export async function createCharacter(data) {
  let params = [data.user_id, data.char_name];
  let paramCount = 2;
  let dollarParams = ") VALUES ($1, $2";

  let sqlquery = "INSERT INTO CharacterTable (user_id, char_name";
  if (data.char_height) {
    sqlquery += ", char_height";
    params.push(data.char_height);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_age) {
    sqlquery += ", char_age";
    params.push(data.char_age);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_alive) {
    sqlquery += ", char_alive";
    params.push(data.char_alive);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  sqlquery += dollarParams + ") returning *";

  const result = await query(`${sqlquery}`, params);
  return result.rows;
}

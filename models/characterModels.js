import query from "../db/db.js";

//**********Get all characters**********

export async function getCharacters() {
  const retrieveCharacters = await query("SELECT * FROM CharacterTable");
  return retrieveCharacters.rows;
}
//**********Get user specific characters**********

export async function getUsersCharacters(email) {
  const retrieveCharacters = await query("SELECT * FROM CharacterTable WHERE user_email = $1", [email]);
  return retrieveCharacters.rows;
}

//**********Search for character by name**********

export async function getCharacterName(name, email) {
  const retrieveCharacter = await query(
    "SELECT * FROM CharacterTable WHERE char_name ILIKE $1 AND user_email = $2 ",
    [`${name}%`, email]
  );
  return retrieveCharacter.rows;
}

//**********Ed it/Update Character by ID**********
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
  


// export async function updateCharacter(id, data) {

// let thingToEdit = Object.keys(data)[1]

// const update = await query(`UPDATE CharacterTable SET ${thingToEdit} = $1 WHERE character_id = $2 returning *`,[data[thingToEdit], id])
// console.log(update)
// return update.rows;
// }




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
  let params = [data.user_email, data.char_name];
  let paramCount = 2;
  let dollarParams = ") VALUES ($1, $2";

  let sqlquery = "INSERT INTO CharacterTable (user_email, char_name";
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

  if (data.char_background) {
    sqlquery += ", char_background";
    params.push(data.char_background);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_desc) {
    sqlquery += ", char_desc";
    params.push(data.char_desc);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_disabilities) {
    sqlquery += ", char_disabilities";
    params.push(data.char_disabilities);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_eyeColour) {
    sqlquery += ", char_eyeColour";
    params.push(data.char_eyeColour);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_fears) {
    sqlquery += ", char_fears";
    params.push(data.char_fears);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_features) {
    sqlquery += ", char_features";
    params.push(data.char_features);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_gender) {
    sqlquery += ", char_gender";
    params.push(data.char_gender);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_hairColour) {
    sqlquery += ", char_hairColour";
    params.push(data.char_hairColour);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_height) {
    sqlquery += ", char_height";
    params.push(data.char_height);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_hopes) {
    sqlquery += ", char_hopes";
    params.push(data.char_hopes);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_img) {
    sqlquery += ", char_img";
    params.push(data.char_img);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_job) {
    sqlquery += ", char_job";
    params.push(data.char_job);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_likes) {
    sqlquery += ", char_likes";
    params.push(data.char_likes);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_morality) {
    sqlquery += ", char_morality";
    params.push(data.char_morality);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_notes) {
    sqlquery += ", char_notes";
    params.push(data.char_notes);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_pronouns) {
    sqlquery += ", char_pronouns";
    params.push(data.char_pronouns);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_relationships) {
    sqlquery += ", char_relationships";
    params.push(data.char_relationships);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_sexuality) {
    sqlquery += ", char_sexuality";
    params.push(data.char_sexuality);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_skills) {
    sqlquery += ", char_skills";
    params.push(data.char_skills);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_skinColour) {
    sqlquery += ", char_skinColour";
    params.push(data.char_skinColour);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_species) {
    sqlquery += ", char_species";
    params.push(data.char_species);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_speech) {
    sqlquery += ", char_speech";
    params.push(data.char_speech);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }

  if (data.char_weight) {
    sqlquery += ", char_weight";
    params.push(data.char_weight);
    paramCount++;
    dollarParams += ", $" + paramCount;
  }
  
  sqlquery += dollarParams + ") returning *";

  const result = await query(`${sqlquery}`, params);
  return result.rows;
}

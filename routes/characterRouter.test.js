import supertest from "supertest";
import app from "../app.js";
import { test, expect } from "@jest/globals";

/* Jest test to make sure getCharacters request returns the correct data type and the response status is 200*/
test("GET characters", async () => {
  const response = await supertest(app).get("/characters");
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body).toStrictEqual({
    success: true,
    payload: expect.any(Array)
  });
});

test("GET specific character by name", async () => {
  const response = await supertest(app).get("/characters?char_name=Betty");
  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body).toStrictEqual({
    success: true,
    payload: expect.any(Array)
  });
});

test('update character test', async() => {
  const payload = {
        user_id: 4,
        char_name: "Updated",
        char_height: 6,
        char_age: 32,
        char_alive: false
      };
 
  const response = await supertest(app)
  .patch('/characters/4')
  .send(payload)
  .set('Accept', 'application/json')
 
  expect(response.status).toBe(200)
  expect(response.body.success).toBeTruthy
  expect(response.body.payload.length).toEqual(1)
  expect(response.body.payload[0].char_name).toMatch('Updated')
  })


test('test delete', async function(){
    const response = await supertest(app).del('/characters/11');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
   
  });

// this test currently not working
/*test("POST a new character", async() => {
    const payload = {
        "user_id": 3,
        "char_name": 'Dani',
        "char_height": 6,
        "char_age": 32,
        "char_alive": false,
    };
    const response = await supertest(app)
    .post("/characters")
    .send(payload);
    // .set("Accept", "application.json");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.payload[0].user_id).toEqual(Number);

});*/

// // this test currently not working
// test("POST a new character", async () => {
//   const payload = {
//     user_id: 3,
//     char_name: "Dani",
//     char_height: 6,
//     char_age: 32,
//     char_alive: false
//   };
//   const response = await supertest(app)
//     .post("/characters")
//     .set("Accept", "application/json")
//     .send(payload);
//   console.log("response:", response.body.payload);
//   expect(response.status).toBe(200);
//   expect(response.body.success).toBe(true);
//   expect(response.body.payload[0]).toEqual(Object);
// });


test('post new character test', async() => {
  const payload = {
        user_id: 3,
        char_name: "Filip",
        char_height: 6,
        char_age: 32,
        char_alive: false
      };
 
  const response = await supertest(app)
  .post('/characters')
  .send(payload)
  .set('Accept', 'application/json')
 
  expect(response.status).toBe(200)
  expect(response.body.success).toBeTruthy
  expect(response.body.payload.length).toEqual(1)

  //check response data:
  //expect(response.body.payload[0].user_id).toEqual(3)
  expect(response.body.payload[0].char_name).toMatch('Filip')
  
  })


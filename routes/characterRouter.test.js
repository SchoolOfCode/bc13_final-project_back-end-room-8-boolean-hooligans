import supertest from "supertest";
import app from "../app.js";
import { test, expect } from "@jest/globals";

/* Jest test to make sure getCharacters request returns the correct data type and the response status is 200*/
test("GET characters",  async() => {
    const response = await supertest(app).get("/characters");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toStrictEqual({ success: true, payload: expect.any(Array)}
    );
});

/*Containing([
            expect.objectContaining({
                character_id: expect.any(Number),
                user_id: expect.any(Number),
                char_name: expect.any(String),
                char_height: expect.any(Number),
                char_age: expect.any(Number),
                char_alive: expect.any(Boolean),
            })
        ])*/
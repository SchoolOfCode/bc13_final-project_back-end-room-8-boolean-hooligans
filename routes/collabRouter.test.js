


test("GET collab data", async () => {
    const response = await supertest(app).get("/collab");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array)
    });
  });
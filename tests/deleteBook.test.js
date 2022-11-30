const request = require("supertest");
const app = require("../app");

const userToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg3NThiNDBmMjMwYmQ4MWJhZmFkMDciLCJpYXQiOjE2Njk4MTUxNTB9.VZND1qIcHca7ms42BA1JJdJGfopUiyBf9xn16Ak3PdU";

test("Delete Book By BookOwner", async () => {
  await request(app)
    .delete("/book/delete/63875c1f46a513b6590d8ba3")
    .set("Authorization", userToken)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Delete Book By BookOwner Error", async () => {
    await request(app)
      .delete("/book/delete/6387489fb2fc911471fdfe")
      .set("Authorization", userToken)
      .expect("Content-Type", /json/)
      .expect(400);
  });
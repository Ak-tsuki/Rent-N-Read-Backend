const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NjkzODUwMTZ9.FEbjNJrfqdWQddMqA-IZuqnYVC0hXsbakLMZCmfCejs";

test("Rented books by user", async () => {
  await request(app)
    .get("/rented_books/get")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(200);
});

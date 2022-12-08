const request = require("supertest");
const app = require("../app");

const userToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzA0Njg5MjV9.jdf2na_9wB3z_uluy-GzhwEUpehwqNP-JIh8k1fdnAc";

test("Get Similar Books by author", async () => {
  await request(app)
    .get("/book/getauthor/Collen Hoover")
    .expect("Content-Type", /json/)
    .expect(200);
});

test("Recommend Books according to the recently rented book of user", async () => {
  await request(app)
    .get("/book/recommendation")
    .set("Authorization", userToken)
    .expect("Content-Type", /json/)
    .expect(200);
});

const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NjkwOTg5MzF9.Eosh0eVPCCRUaiI0B4I13huQjrFDZSlAZE8uC1mMjoM";

test("Buy ebook", async () => {
  await request(app)
    .post("/buy/insert")
    .set("Authorization", token)
    .send({
      ebookId: "6390629ce895bc8961b0a1b3",
      bought_date: "2022/07/14",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Buy ebook mistake id", async () => {
  await request(app)
    .post("/buy/insert")
    .set("Authorization", token)
    .send({
      ebookId: "6390629ce895bc8961b0a1b3",
      bought_date: "2022/07/14",
    })
    .expect("Content-Type", /json/)
    .expect(400);
});

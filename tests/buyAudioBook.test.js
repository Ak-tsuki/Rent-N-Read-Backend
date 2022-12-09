const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NjkwOTg5MzF9.Eosh0eVPCCRUaiI0B4I13huQjrFDZSlAZE8uC1mMjoM";

test("Buy audiobook", async () => {
  await request(app)
    .post("/audiobook/buy")
    .set("Authorization", token)
    .send({
        audiobookId:"6391f7a37b7ea521a6b38704",
        bought_date:"2022/07/14",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Buy audiobook mistake id", async () => {
    await request(app)
      .post("/audiobook/buy")
      .set("Authorization", token)
      .send({
          audiobookId:"6391f7aasdsd7ea521a6b38704",
          bought_date:"2022/07/14",
      })
      .expect("Content-Type", /json/)
      .expect(400);
  });


const buffer = Buffer.from("some data");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzcyNDdlMmRiNTM4ZDhkYTdmZWFhM2IiLCJpYXQiOjE2NzA5MjIwMjl9.FcnY3RuWFo3aYSsp5w_C7mEZWtXsEDlUOnmN2GFu7RQ";

const request = require("supertest");
const app = require("../app");
jest.setTimeout(20000);

// new conversation
test("new conversation", async () => {
    await request(app)
      .post("/conversation/post")
      .set("Authorization", token)
      .send({
         senderId : "tsering12",
         receiverId: "Aayush"
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

// get conversation
test("get conversation", async () => {
  await request(app)
    .get("/conversation/getbyusername/tsering12")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});
const request = require("supertest");
const app = require("../app");

const usertoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdmMDI0MzIwNWU5YjI5MDZmM2FkODciLCJpYXQiOjE2NzExOTAxODd9.CWPgxeQwwsb16mB0bRTsNzg5RijwRqI0DQCPlVLJdvs";

test("Get bought Audio books bought by user", async () => {
  await request(app)
    .get("/boughtaudiobook/get")
    .set("Authorization", usertoken)
    .expect("Content-Type", /json/)
    .expect(200);
});

const request = require("supertest");
const app = require("../app");

test("Get login sucess", async () => {
  await request(app)
    .get("/login/sucess")
    .expect("Content-Type", /json/)
    .expect(200);
});

test("Get login failed", async () => {
  await request(app)
    .get("/login/failed")
    .expect("Content-Type", /json/)
    .expect(401);
});

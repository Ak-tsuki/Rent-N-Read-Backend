const request = require("supertest");
const app = require("../app");

const adminToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2Njg3NTY2ODB9.rBZOiO-atoztvUEPKXKdmP64ezcZBRpJWT8-i0cFGwE";

test("Approve Book By Admin", async () => {
  await request(app)
    .put("/book/approve")
    .send({
      id: "637594392f1a5abdebee45bf",
      status: "Approved",
    })
    .set("Authorization", adminToken)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Approve Book By Admin Mistake", async () => {
  await request(app)
    .put("/book/approve")
    .send({
      id: "6374d25948ce0552b0254asdc7",
      status: "Approved",
    })
    .set("Authorization", adminToken)
    .expect("Content-Type", /json/)
    .expect(400);
});

test("Reject Book By Admin Mistake", async () => {
  await request(app)
    .put("/book/reject")
    .send({
      id: "637594392f5415asdabdebee45bf",
      status: "Rejected",
    })
    .set("Authorization", adminToken)
    .expect("Content-Type", /json/)
    .expect(400);
});

test("Reject Book By Admin", async () => {
  await request(app)
    .put("/book/reject")
    .send({
      id: "6374d25948ce0552b02383c7",
      status: "Rejected",
    })
    .set("Authorization", adminToken)
    .expect("Content-Type", /json/)
    .expect(201);
});

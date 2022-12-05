const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzAyMzk1Mzh9.bLGvIC2wx5do-cH8eJQinVqFBhNd6qN3lDoz-_Lkmnw";

test("Send book exchange request to book owner", async () => {
  await request(app)
    .post("/exchange_request")
    .set("Authorization", token)
    .send({
      bookId: "637594392f1a5abdebee45bf",
      requestedUserId: "6375e24c167db565308054be",
      bookOwnerId: "637247e2db538d8da7feaa3b",
      exchangeBookId: "637a25b398432cac48b331da",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Approve Exchange Request By Book Owner", async () => {
  await request(app)
    .put("/exchange/approve")
    .send({
      id: "638d85a6bbe2336d082a31c7",
    })
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Reject Exchange Request By Book Owner", async () => {
  await request(app)
    .put("/exchange/reject")
    .set("Authorization", token)
    .send({
      id: "638d85a6bbe2336d082a31c7",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Exchange request by book owner", async () => {
  await request(app)
    .get("/book_owner/exchange_requests")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

test(" All exchange request history book by bookowner", async () => {
  await request(app)
    .get("/book_owner/exchange_history")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

test(" Books by user who send the exchange request", async () => {
  await request(app)
    .get("/user/exchange_requests")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

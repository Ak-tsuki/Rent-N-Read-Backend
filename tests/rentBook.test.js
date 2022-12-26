const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzcyNDdlMmRiNTM4ZDhkYTdmZWFhM2IiLCJpYXQiOjE2NzIwNjgzMjR9.Bhq7G2ozy9OO9OmxMAVEmONIhPQ6c0hgTLx_uvhFelM";

test("Send book rent request to book owner", async () => {
  await request(app)
    .post("/rent/insert")
    .set("Authorization", token)
    .send({
      bookId: "6374d25948ce0552b02383c7",
      start_date: "2022-22-11",
      end_date: "2022-22-14",
      no_of_days: "3",
      userId: "6368c95bde5fb0d32de200bb",
      total_price: "200",
      contact_no: "9873242332",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Approve Rent Request By Book Owner", async () => {
  await request(app)
    .put("/rent/approve")
    .send({
      id: "637c6e42127cedc5274c08c9",
    })
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Reject Rent Request By Book Owner", async () => {
  await request(app)
    .put("/rent/reject")
    .set("Authorization", token)
    .send({
      id: "637c6e42127cedc5274c08c9",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Update payment status after payment process", async () => {
  await request(app)
    .put("/rent/paymentPaid")
    .send({
      id: "637dd267a798af498252f8b0",
    })
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("get book according to rentstatus aaproved", async () => {
  await request(app)
    .get("/rented_books/getApproved")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(200);
});

test("get ebook according to rentstatus aaproved", async () => {
  await request(app)
    .get("/rented_ebooks/getApproved")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(200);
});

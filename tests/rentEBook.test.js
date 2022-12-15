const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NjkwOTg5MzF9.Eosh0eVPCCRUaiI0B4I13huQjrFDZSlAZE8uC1mMjoM";

test("Send book rent request", async () => {
  await request(app)
    .post("/rentEbook/add")
    .set("Authorization", token)
    .send({
      ebookId: "6390629ce895bc8961b0a1b3",
      start_date: "2022-12-11",
      end_date: "2022-12-15",
      no_of_days: "4",
      userId: "6368c95bde5fb0d32de200bb",
      total_price: "200",
      contact_no: "9873242332",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Update payment status after payment process", async () => {
  await request(app)
    .put("/rent/paymentPaid")
    .send({
      id: "6399f19bbe19ca24b8d122f7",
    })
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

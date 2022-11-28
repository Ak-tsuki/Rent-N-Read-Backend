const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2Njk2NTA3Nzd9.aaRqLgRTAsZPkCUWXOgF-UKZb2HIMt4cD6sJcahakhI";

// return rentbook with correct book id
test("Return Rentbook By rented user with correct book id", async () => {
  await request(app)
    .put("/rent/returnBook")
    .set("Authorization", token)
    .send({
      id: "637dd267a798af498252f8b0",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

// return rentbook with incorrect book id
test("Return Rentbook By rented user with incorrect book id", async () => {
  await request(app)
    .put("/rent/returnBook")
    .set("Authorization", token)
    .send({
      id: "637c6e42127cedc5274c0",
    })
    .expect("Content-Type", /json/)
    .expect(400);
});

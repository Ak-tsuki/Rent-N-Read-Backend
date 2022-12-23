const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzE3ODA2Nzl9.vENW1ZeurH2wMxCnCgts8LCenxlm1sqwjZrPvW_21-A";

const admintoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2NzE3OTU3MTV9.GcNktn03le8GqDrLfz5gRBBNV11GJHUXIIYvv3Q9Yj8";

// Update profile details of users
test("Update profile details of users", async () => {
  await request(app)
    .put("/profile/update")
    .set("Authorization", token)
    .send({
      first_name: "Rijwol",
      last_name: "Shakya",
      address: "Banepa-07",
      contact_no: "9861291534",
      gender: "Male",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

// Update user account password
test("Update user account password", async () => {
  await request(app)
    .put("/password/update")
    .set("Authorization", token)
    .send({
      old_password: "Rijwol_Shakya09",
      new_password: "shakyarijwol09",
    })
    .expect("Content-Type", /json/)
    .expect(200);
});

// Update profile details of users
test("Update profile details of users", async () => {
  await request(app)
    .put("/profile/updateadmin")
    .set("Authorization", admintoken)
    .send({
      first_name: "Tsering123",
      last_name: "Sherpa123",
      address: "Kapan-07",
      contact_no: "98453454654",
      gender: "Male",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

// Update user account password
test("Update user account password", async () => {
  await request(app)
    .put("/password/updateadmin")
    .set("Authorization", admintoken)
    .send({
      old_password: "admin",
      new_password: "admin22",
    })
    .expect("Content-Type", /json/)
    .expect(200);
});

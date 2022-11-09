const request = require("supertest");
const app = require("../app");

// Creating new user without email
test("Sign up testing for a new user without email", async () => {
  await request(app)
    .post("/user/register")
    .send({
      username: "tsering",
      contact_no: "988734345",
      password: "1234556",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "User Registered Successfully",
          success: true,
        }),
      ]);
    });
});

// Creating new user
test("Sign up testing for a new user", async () => {
  await request(app)
    .post("/user/register")
    .send({
      username: "tsering",
      email: "ts12@gmail.com",
      contact_no: "988734345",
      password: "1234556",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "User Registered Successfully",
          success: true,
        }),
      ]);
    });
});

// Creating account with existing user
test("Sign up testing for a exiting user", async () => {
  await request(app)
    .post("/user/register")
    .send({
      username: "tsering",
      email: "ts12@gmail.com",
      contact_no: "988734345",
      password: "1234556",
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Username Already Exists",
          success: "exists",
        }),
      ]);
    });
});

// Creating account without JSON formats
test("Sign up testing for a user not in Json Format", async () => {
  await request(app)
    .post("/user/register")
    .send(
      "username: tsering",
      "email: ts12@gmail.com",
      "contact_no: 977342232",
      "password: 12344342"
    )
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Something Went Wrong, Please Try Again!! ",
        }),
      ]);
    });
});

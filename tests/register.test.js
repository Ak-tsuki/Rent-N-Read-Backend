const request = require("supertest");
const app = require("../app");

// Creating new user
test("Sign up testing for a new user", async () => {
  await request(app)
    .post("/user/register")
    .send({
      username: "username",
      email: "email",
      contact_no: "contact_no",
      password: "hashed_pw",
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
      username: "username",
      email: "email",
      contact_no: "contact_no",
      password: "hashed_pw",
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
      "password: 1234"
    )
    .expect("Content-Type", /json/)
    .expect(400)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Something Went Wrong, Please Try Again!! ",
        }),
      ]);
    });
});

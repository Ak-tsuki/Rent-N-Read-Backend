const request = require("supertest");
const app = require("../app");

// Login user with incorrect password
test("Sign in testing for user with incorrect password", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "ts12@gmail.com",
      password: "12345567",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          token: expect.any(String),
          userType: expect.any(String),
        }),
      ]);
    });
});

// Login user with correct email and password
test("Sign in testing for user with correct email and password", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "ts12@gmail.com",
      password: "1234556",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          token: expect.any(String),
          userType: expect.any(String),
        }),
      ]);
    });
});

// Login user with incorrect email
test("Sign in testing for user with incorrect email", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "ts12@gmail.comcvx",
      password: "12345567",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          token: expect.any(String),
          userType: expect.any(String),
        }),
      ]);
    });
});

// Login user with incorrect email
test("Sign in testing for user with incorrect email with response code 404", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "ts12@gmail.comcvx",
      password: "12345567",
    })
    .expect("Content-Type", /json/)
    .expect(404)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid Credentials!!!",
        }),
      ]);
    });
});

// Login user with incorrect password
test("Sign in testing for user with incorrect password with response code 401", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "ts12@gmail.com",
      password: "12345567",
    })
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid Credentials!!!",
        }),
      ]);
    });
});

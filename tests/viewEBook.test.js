const request = require("supertest");
const app = require("../app");

const admintoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2NzExOTAxNTh9.3W4-0SFixVljPv0ZxcE8zEGIFudZ9yCPJmPh52_ZF4g";

const usertoken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdmMDI0MzIwNWU5YjI5MDZmM2FkODciLCJpYXQiOjE2NzExOTAxODd9.CWPgxeQwwsb16mB0bRTsNzg5RijwRqI0DQCPlVLJdvs";

test("Get Ebook By Admin", async () => {
  await request(app)
    .get("/eBook/getbyadmin")
    .set("Authorization", admintoken)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Get Ebook By all user", async () => {
  await request(app)
    .get("/ebook/get")
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Get one Ebook By ebook id", async () => {
  await request(app)
    .get("/ebook/getone/6390629ce895bc8961b0a1b3")
    .expect("Content-Type", /json/)
    .expect(200);
});

test("Get Ebook By Author", async () => {
  await request(app)
    .get("/ebook/getauthor/Carl Fallberg")
    .expect("Content-Type", /json/)
    .expect(200);
});

test("Get bought Ebook by user", async () => {
  await request(app)
    .get("/bought_ebooks/get")
    .set("Authorization", usertoken)
    .expect("Content-Type", /json/)
    .expect(200);
});

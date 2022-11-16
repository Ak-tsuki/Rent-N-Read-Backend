// import fs from "fs";
const buffer = Buffer.from("some data");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc0NmQyYTA3ZGNlZTliZTY4MDE1NjMiLCJpYXQiOjE2Njg1OTA2NzF9.5klG_PTYSlj9acaNnN9UGCkg8I8m4irl5Y6NPocYCDk";

const request = require("supertest");
const app = require("../app");

//Adding book without book image
test("Add Book without book image", async () => {
  await request(app)
    .post("/book/add")
    .set("Authorization", token)
    .send({
      name: "Harry Portter",
      rich_desc: "kjdfkj skdfkj ksdbf kdbf kdb",
      desc: "skjdf ksjdbfk ksbdufb skdbfi sdkfsbdk fksbdf ksdbfk sdkb",
      author: "JK Rolling",
      category: "Drama",
      rent_const_perday: "50",
      bookOwner: "Aaron Man Thaku",
    })
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid file formate",
        }),
      ]);
    });
});

test("Add Book without book description", async () => {
  await request(app)
    .post("/book/add")
    .set("Authorization", token)
    .send({
      name: "Harry Portter",
      rich_desc: "kjdfkj skdfkj ksdbf kdbf kdb",
      author: "JK Rolling",
      category: "Drama",
      rent_const_perday: "50",
      bookOwner: "Aaron Man Thaku",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          success: true,
          msg: "Book uploaded Successfully",
        }),
      ]);
    });
});

// get books by all user

test("Add Book with book image", async () => {
  jest.setTimeout(6000);
  await request(app)
    .post("/book/add")
    .set("Authorization", token)
    .attach("book_img", "C:/Users/Aaron Thaku/Downloads/B1.png")
    .field("name", "slim")
    .field("rich_desc", "slim")
    .field("desc", "slim")
    .field("author", "slim")
    .field("category", "slim")
    .field("rent_cost_perday", "30")
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          success: true,
          msg: "Book uploaded Successfully",
        }),
      ]);
    });
});

test("Show All Books", async () => {
  await request(app)
    .get("/book/get")
    .expect("Content-Type", /json/)
    .expect(200);
});

// get one book by all user
test("Show one books by id ", async () => {
  await request(app)
    .get("/book/getone/6373b4d2bad9a0131c9ed7eb")
    .expect("Content-Type", /json/)
    .expect(200);
});

const buffer = Buffer.from("some data");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2Njk4ODY3MjN9.gVOC1CeG_1qRKEdeOBS61B-m1b7sKOORik_EiPL1tiw";

const request = require("supertest");
const app = require("../app");
jest.setTimeout(20000);

// Adding EBook by Admin with book image and pdf
test("Add EBook with book image and pdf file", async () => {
  await request(app)
    .post("/eBook/add")
    .set("Authorization", token)
    .attach("book_img", "C:/Users/lenovo/Downloads/A1.png")
    .attach("e_book", "C:/Users/lenovo/Downloads/disney.pdf")
    .field("name", "slim")
    .field("rich_desc", "slim")
    .field("author", "slim")
    .field("category", "slim")
    .field("rent_cost_perday", "30")
    .field("price", "30")
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          success: true,
          msg: "EBook uploaded Successfully",
        }),
      ]);
    });
});

// Adding EBook by Admin with book image and pdf
test("Add EBook without book image", async () => {
  await request(app)
    .post("/ebook/add")
    .set("Authorization", token)
    .attach("e_book", "C:/Users/lenovo/Downloads/disney.pdf")
    .field("name", "slim")
    .field("rich_desc", "slim")
    .field("author", "slim")
    .field("category", "slim")
    .field("rent_cost_perday", "30")
    .field("price", "30")
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid Image formate",
        }),
      ]);
    });
});

// Adding EBook by Admin with book image and pdf
test("Add EBook without pdf file", async () => {
  await request(app)
    .post("/ebook/add")
    .set("Authorization", token)
    .attach("book_img", "C:/Users/lenovo/Downloads/A1.png")
    .field("name", "slim")
    .field("rich_desc", "slim")
    .field("author", "slim")
    .field("category", "slim")
    .field("rent_cost_perday", "30")
    .field("price", "30")
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid Ebook formate",
        }),
      ]);
    });
});

test("get All EBooks by admin", async () => {
  await request(app)
    .get("/ebook/getbyadmin")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

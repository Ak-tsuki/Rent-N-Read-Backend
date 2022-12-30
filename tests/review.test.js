const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NzI0MDUyMTJ9.fkXXPi6ZGS0LhmzX8EquiBKlX4WnzqKPU0ccX-wDBWg";

test("Add a Review for book", async () => {
  await request(app)
    .post("/add_review")
    .set("Authorization", token)
    .send({
      bookId: "63905f81e895bc8961b0a101",
      rating: 5,
      review: "hi",
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

test("get book review by id", async () => {
  await request(app)
    .get("/get/book_reviews/63905f81e895bc8961b0a101")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(200);
});

test("get ebook review by id", async () => {
  await request(app)
    .get("/get/ebook_reviews/6390629ce895bc8961b0a1b3")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(200);
});

test("get audio book review by id", async () => {
  await request(app)
    .get("/get/audiobook_reviews/639061e6e895bc8961b0a1a6")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(200);
});

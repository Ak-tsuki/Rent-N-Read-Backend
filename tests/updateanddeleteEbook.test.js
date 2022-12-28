const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2NzIyMjk3MTh9.jRt_4HSvw1PRsLz2Qtph2FJCXOQTYsSufspSKeHxhYU";

// Update ebook details
test("Update details of Ebooks", async () => {
  await request(app)
    .put("/ebook/update")
    .set("Authorization", token)
    .send({
      id: "63ac19b6f85da163edc1e458",
      name: "Harry Potter2",
      rich_desc:
        "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
      desc: "Harry Potter and the deathly hollows",
      author: "J.K. ROWLING2",
      category: "Historical,Adventure",
      rent_cost_perday: 12,
      price: 200,
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

// Deleteing ebook
test("Delete Ebook", async () => {
  await request(app)
    .delete("/Ebook/delete/63ac19b6f85da163edc1e458")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2NzIyMjk3MTh9.jRt_4HSvw1PRsLz2Qtph2FJCXOQTYsSufspSKeHxhYU";

// Update Audiobook details
test("Update details of Audiobooks", async () => {
  await request(app)
    .put("/audiobook/update")
    .set("Authorization", token)
    .send({
      id: "63ac24435affc4a8f8f286bc",
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

// Deleteing Audiobook
test("Delete Audiobook by id", async () => {
  await request(app)
    .delete("/audiobook/delete/63ac24435affc4a8f8f286bc")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

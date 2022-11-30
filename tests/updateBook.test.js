const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2Njk2NTA3Nzd9.aaRqLgRTAsZPkCUWXOgF-UKZb2HIMt4cD6sJcahakhI";

// Update book details
test("Update details of listed books", async () => {
  await request(app)
    .put("/book/update")
    .set("Authorization", token)
    .send({
      _id: "6374d25948ce0552b02383c7",
      name: "Harry Potter2",
      rich_desc:
        "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
      desc: "Harry Potter and the deathly hollows",
      author: "J.K. ROWLING2",
      category: "Historical,Adventure",
      rent_cost_perday: 12,
    })
    .expect("Content-Type", /json/)
    .expect(201);
});

// Update book without sending a required property
test("Update details with no required rent cost property", async () => {
  await request(app)
    .put("/book/update")
    .set("Authorization", token)
    .send({
      _id: "6374d25948cdsfe0552b02383c7",
      name: "Harry Potter2",
      rich_desc:
        "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
      desc: "Harry Potter and the deathly hollows",
      author: "J.K. ROWLING2",
      category: "Fantasy,Adventure",
      rent_cost_perday: 12,
    })
    .expect("Content-Type", /json/)
    .expect(400);
});

const request = require("supertest");
const app = require("../app");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzcyNDdlMmRiNTM4ZDhkYTdmZWFhM2IiLCJpYXQiOjE2NzE1MDQzMDR9.8BNkOJ7L94_la0OltdiWalxzE2C_DW6EP-nnepRFVEc";

  // Add books in wishlist
test("Add Books in wistlist", async () => {
  await request(app)
    .post("/wishlist/insert/")
    .set("Authorization", token)
    .send({
        bookId:"63905f81e895bc8961b0a101",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then(() => {
        expect.arrayContaining([
          expect.objectContaining({
            msg: "Book Added To Wishlist Successfully",
            success: true,
          }),
        ]);
      });
});


// delete wishlist 
test("Delete Books By User", async () => {
    await request(app)
      .delete("/wishlist/delete/63a1cec4afa183a4f6a34d5e")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201);
  });


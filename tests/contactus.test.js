const request = require("supertest");
const app = require("../app");

// contacting with the admin
test("Contact with admin of the website", async () => {
  await request(app)
    .post("/contactus/send")
    .send({

      first_name: "AayuAaaashs",
      last_name: "shreaAAsthas",
      contact_no: "1234123556",
      email: "emails",
      message: "messages",
      subject: "subjects",
    })
    .expect("Content-Type", /json/)
    .expect(201)
    .then(() => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Successfully sent",
          success: true,
        }),
      ]);
    });
});

// Reply by admin to the sender
test("Reply by admin to the sender", async () => {
  await request(app)
    .post("/contactus/reply")
    .send({
      reply: "add book rent book and buy book",
      email: "shakyarijwol09@gmail.com"
      
    })
    .expect("Content-Type", /json/)
    .expect(201)
    // .then(() => {
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       msg: "Successfully sent",
    //       success: true,
    //     }),
    //   ]);
    // });
});
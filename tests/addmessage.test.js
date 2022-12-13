const buffer = Buffer.from("some data");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2Njk4ODY3MjN9.gVOC1CeG_1qRKEdeOBS61B-m1b7sKOORik_EiPL1tiw";

const request = require("supertest");
const app = require("../app");
jest.setTimeout(20000);

// Adding message by user with book owner
test("Adding message by user ", async () =>{
    await request(app)
    .post("/message/add")
    .set("Authorization", token)
    .send({
        sender: "tsering12",
        text: "hello"      
    })
    
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) =>{
        expect.arrayContaining([
            expect.objectContaining({
                success: true,
                // data: savedMessage
            }),
        ]);
    });
});


// get message 
test("get message from the user", async() => {
    await request(app)
    .get("/message/getbyconversationId/63981a592854b6fddbf5e694")
    .set("Authorization", token)
    // .send({
    //     conversationId: "63981a592854b6fddbf5e694",
    //   })
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) =>{
        expect.arrayContaining([
            expect.objectContaining({
                success: true
            }),
        ]);
    });

})
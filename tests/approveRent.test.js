const request = require("supertest");
const app = require("../app");

const userToken = 
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZTI0YzE2N2RiNTY1MzA4MDU0YmUiLCJpYXQiOjE2NjkyNzI1MTV9.yxqDMbvOdpj_QJuZBAhPvOCZG3f-eJ9-4WxYQVe32aE";

test("Approve rent request by BookOwner", async () =>{
    await request(app)
    .put("/rent/approve")
    .send({
        id: "637ed5515cfb9d42c9984d76",
        rent_status: "Approved"
    })
    .set("Authorization", userToken)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("reject rent request by BookOwner", async () =>{
    await request(app)
    .put("/rent/reject")
    .send({
        id:"637ed53c5cfb9d42c9984d6f",
        rent_status: "Rejected",
    })
    .set("Authorization", userToken)
    .expect("Content-Type", /json/)
    .expect(400);
})

test("Reject Approved rent request by BookOwner", async () =>{
    await request(app)
    .put("/rent/reject")
    .send({
        id: "637ed5515cfb9d42c9984d76",
        rent_status: "Rejected"
    })
    .set("Authorization", userToken)
    .expect("Content-Type", /json/)
    .expect(201);
});

test("Approve rejected rent request by BookOwner", async () =>{
    await request(app)
    .put("/rent/approve")
    .send({
        id:"637ed53c5cfb9d42c9984d6f",
        rent_status: "Approved",
    })
    .set("Authorization", userToken)
    .expect("Content-Type", /json/)
    .expect(400);
})
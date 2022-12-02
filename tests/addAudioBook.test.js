const buffer = Buffer.from("some data");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzc1ZjBkZjgxOGEyMTAzYTQ5ZmRhNDMiLCJpYXQiOjE2Njk4ODY3MjN9.gVOC1CeG_1qRKEdeOBS61B-m1b7sKOORik_EiPL1tiw";

const request = require("supertest");
const app = require("../app");
jest.setTimeout(20000);

// Adding AudioBook by Admin with book image and audio
test("Add AudiBook with book image and audio file", async () => {
  await request(app)
    .post("/audiobook/add")
    .set("Authorization", token)
    .attach("book_img", "C:/Users/shaky/Downloads/wallpaperflare.com_wallpaper.jpg")
    .attach("audio_book", "C:/Users/shaky/Downloads/Justin_Bieber_Peaches.mp3")
    .field("name", "slim")
    .field("rich_desc", "slim")
    .field("author", "slim")
    .field("category", "slim")
    .field("price", "30")
    .expect("Content-Type", /json/)
    .expect(201)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          success: true,
          msg: "AudioBook Uploaded Successfully",
        }),
      ]);
    });
});

// Adding Audio Book by Admin without book image
test("Add Audio Book without book image", async () => {
  await request(app)
  .post("/audiobook/add")
  .set("Authorization", token)
  .attach("audio_book", "C:/Users/shaky/Downloads/Justin_Bieber_Peaches.mp3")
  .field("name", "slim")
  .field("rich_desc", "slim")
  .field("author", "slim")
  .field("category", "slim")
  .field("price", "30")
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid Image format",
        }),
      ]);
    });
});

// Adding Audio Book by Admin without Audio File
test("Add Audio Book without Audio File", async () => {
  await request(app)
  .post("/audiobook/add")
  .set("Authorization", token)
  .attach("book_img", "C:/Users/shaky/Downloads/wallpaperflare.com_wallpaper.jpg")
  .field("name", "slim")
  .field("rich_desc", "slim")
  .field("author", "slim")
  .field("category", "slim")
  .field("price", "30")
    .expect("Content-Type", /json/)
    .expect(401)
    .then((res) => {
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Invalid Audio format",
        }),
      ]);
    });
});

test("get All Audio Book by admin", async () => {
  await request(app)
    .get("/audiobook/getbyadmin")
    .set("Authorization", token)
    .expect("Content-Type", /json/)
    .expect(201);
});

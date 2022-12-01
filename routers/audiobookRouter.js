const express = require("express");
const router = express.Router();

//Model Imports
const AudioBook = require("../models/audiobookModel");

const auth = require("../middleware/auth");
const uploadFile = require("../file/uploadFile");

// route to add audiobook by admin
router.post(
  "/audiobook/add",
  auth.adminGuard,
  uploadFile.fields([
    {
      name: "book_img",
      maxCount: 1,
    },
    {
      name: "audio_book",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    if (req.files.book_img == undefined) {
      return res.status(401).json({
        msg: "Invalid Image formate",
      });
    }
    if (req.files.audio_book == undefined) {
      return res.status(401).json({
        msg: "Invalid Audio formate",
      });
    }

    const book_pic = req.files.book_img[0].filename;
    const audio_book = req.files.audio_book[0].filename;
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const author = req.body.author;
    const category = req.body.category.split(",");
    const price = req.body.price;
    const userId = req.adminInfo._id;

    const data = new AudioBook({
      book_pic: book_pic,
      audio_book: audio_book,
      name: name,
      rich_desc: rich_desc,
      author: author,
      category: category,
      price: price,
      userId: userId,
    });
    data
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          msg: "AudioBook uploaded Successfully",
        });
      })
      .catch((e) => {
        res.json({
          msg: e,
        });
      });
  }
);

// route to get audiobooks by admin
router.get("/audiobook/getbyadmin", auth.adminGuard, (req, res) => {
  AudioBook.find()
    .sort({
      createdAt: "desc",
    })
    .then((audiobook) => {
      res.status(201).json({
        success: true,
        data: audiobook,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;
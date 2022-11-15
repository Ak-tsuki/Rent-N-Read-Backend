const express = require("express");
const router = express.Router();

//Model Imports
const Book = require("../models/bookModel");

const auth = require("../middleware/auth");
const uploadBookImg = require("../file/bookImg");

// route to add book by bookowner
router.post(
  "/book/add",
  auth.userGuard,
  uploadBookImg.single("book_img"),
  (req, res) => {
    if (req.file == undefined) {
      return res.status(401).json({
        msg: "Invalid file formate",
      });
    }

    const book_pic = req.file.filename;
    const book_name = req.body.book_name;
    const book_rich_desc = req.body.book_rich_desc;
    const book_desc = req.body.book_desc;
    const book_author = req.body.book_author;
    const book_category = req.body.book_category;
    const book_rent_cost_perday = req.body.book_rent_cost_perday;
    const bookOwner = req.userInfo._id;

    const data = new Book({
      book_pic: book_pic,
      book_name: book_name,
      book_rich_desc: book_rich_desc,
      book_desc: book_desc,
      book_author: book_author,
      book_category: book_category,
      book_rent_cost_perday: book_rent_cost_perday,
      bookOwner: bookOwner,
    });
    data
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          msg: "Book uploaded Successfully",
        });
      })
      .catch((e) => {
        res.json({
          msg: e,
        });
      });
  }
);

// route to get books by all user
router.get("/book/get", (req, res) => {
  Book.find()
    .then((book) => {
      if (book != null) {
        res.status(200).json({
          success: true,
          data: book,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get one book by all user
router.get("/book/getone/:id", (req, res) => {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      if (book != null) {
        res.status(200).json({
          success: true,
          data: book,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

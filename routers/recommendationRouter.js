const express = require("express");
const router = express.Router();

//Model Imports
const Book = require("../models/bookModel");

const auth = require("../middleware/auth");
const uploadFile = require("../file/uploadFile");
const Rent = require("../models/rentModel");

// recommedation book by category
router.get("/book/recommendation", auth.userGuard, (req, res) => {
  Rent.findOne({ userId: req.userInfo._id })
    .sort({ _id: -1 })
    .then((rent) => {
      if (rent != null) {
        Book.findOne({ _id: rent.bookId }).then((mainbook) => {
          console.log(mainbook.category);
          Book.find({ category: { $in: mainbook.category } }).then((book) => {
            res.status(200).json({
              success: true,
              data: book,
            });
          });
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

const express = require("express");
const router = express.Router();

//Model Imports
const EBook = require("../models/e_bookModel");

const auth = require("../middleware/auth");
const uploadFile = require("../file/uploadFile");

// route to add audiobook by admin
router.post(
  "/eBook/add",
  auth.adminGuard,
  uploadFile.fields([
    {
      name: "book_img",
      maxCount: 1,
    },
    {
      name: "e_book",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    if (req.files.book_img == undefined) {
      return res.status(401).json({
        msg: "Invalid Image formate",
      });
    }
    if (req.files.e_book == undefined) {
      return res.status(401).json({
        msg: "Invalid Ebook formate",
      });
    }

    const book_pic = req.files.book_img[0].filename;
    const e_book = req.files.e_book[0].filename;
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const author = req.body.author;
    const rent_cost_perday = req.body.rent_cost_perday;
    const category = req.body.category.split(",");
    const price = req.body.price;
    const userId = req.adminInfo._id;

    const data = new EBook({
      book_pic: book_pic,
      e_book: e_book,
      name: name,
      rich_desc: rich_desc,
      author: author,
      rent_cost_perday: rent_cost_perday,
      category: category,
      price: price,
      userId: userId,
    });
    data
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          msg: "EBook uploaded Successfully",
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
router.get("/eBook/getbyadmin", auth.adminGuard, (req, res) => {
  EBook.find()
    .sort({
      createdAt: "desc",
    })
    .then((ebook) => {
      res.status(201).json({
        success: true,
        data: ebook,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

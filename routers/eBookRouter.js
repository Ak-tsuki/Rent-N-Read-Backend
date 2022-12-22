const express = require("express");
const router = express.Router();

//Model Imports
const EBook = require("../models/e_bookModel");
const BuyEbook = require("../models/buyEbookModel");

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
        msg: "Invalid Image format",
      });
    }
    if (req.files.e_book == undefined) {
      return res.status(401).json({
        msg: "Invalid Ebook format",
      });
    }

    const book_pic = req.files.book_img[0].filename;
    const e_book = req.files.e_book[0].filename;
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const desc = req.body.desc;
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
      desc: desc,
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

// route to get audiobooks by all user
router.get("/ebook/get", (req, res) => {
  EBook.find({
    status: "Approved",
  })
    .then((ebook) => {
      if (ebook != null) {
        res.status(201).json({
          success: true,
          data: ebook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get one ebook by all user
router.get("/ebook/getone/:id", (req, res) => {
  EBook.findOne({
    _id: req.params.id,
  })
    .then((ebook) => {
      if (ebook != null) {
        res.status(200).json({
          success: true,
          data: ebook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// get ebook by author (recommedation book)
router.get("/ebook/getauthor/:author", (req, res) => {
  EBook.find({
    author: req.params.author,
  })
    .then((ebook) => {
      if (ebook != null) {
        res.status(200).json({
          success: true,
          data: ebook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//route to get bought ebooks by user
router.get("/bought_ebooks/get", auth.userGuard, (req, res) => {
  BuyEbook.find({ userId: req.userInfo._id })
    .sort({
      createdAt: "desc",
    })
    .populate("ebookId")
    .populate("userId")
    .then((buy) => {
      res.status(200).json({
        success: true,
        data: buy,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

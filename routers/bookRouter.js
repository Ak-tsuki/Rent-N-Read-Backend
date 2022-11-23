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
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const desc = req.body.desc;
    const author = req.body.author;
    const category = req.body.category.split(",");
    const rent_cost_perday = req.body.rent_cost_perday;
    const bookOwner = req.userInfo._id;

    const data = new Book({
      book_pic: book_pic,
      name: name,
      rich_desc: rich_desc,
      desc: desc,
      author: author,
      category: category,
      rent_cost_perday: rent_cost_perday,
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

// route to get books by bookowner
router.get("/book/getbyOwner", auth.userGuard, (req, res) => {
  Book.find({ bookOwner: req.userInfo._id })
    .sort({
      createdAt: "desc",
    })
    .then((book) => {
      res.status(201).json({
        success: true,
        data: book,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get books by all user
router.get("/book/get", (req, res) => {
  Book.find({
    status: "Approved",
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

// route to get all requested books by admin
router.get("/book/getallbyadmin", auth.adminGuard, (req, res) => {
  Book.find()
    .populate("bookOwner")
    .sort({
      createdAt: "desc",
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

// router to approve book
router.put("/book/approve", auth.adminGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: "Approved",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Approved successful",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});
// router to reject book
router.put("/book/reject", auth.adminGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: "Rejected",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Rejected successful",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});





module.exports = router;

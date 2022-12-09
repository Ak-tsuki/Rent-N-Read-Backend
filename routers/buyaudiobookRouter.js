const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const AudioBook = require("../models/audiobookModel");

// Route To Buy Audio Books By User
router.post("/audiobook/buy", auth.userGuard, (req, res) => {
  const data = AudioBook({
    audiobookId: req.body.audiobookId,
    bought_date: req.body.bought_date,
    userId: req.userInfo._id,
    payment_method: req.body.payment_method,
    bookOwner: req.body.bookOwner,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "Audio Book Bought Successfully",
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

//route to get pending rent request book by bookowner
router.get("/rent/get", auth.userGuard, (req, res) => {
  Rent.find({
    $and: [{ bookOwner: req.userInfo._id }, { rent_status: "Pending" }],
  })
    .sort({
      createdAt: "desc",
    })
    .populate("bookId")
    .populate("userId")
    .then((rent) => {
      res.status(201).json({
        success: true,
        data: rent,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//route to get all rent request book by bookowner
router.get("/rent/getHistory", auth.userGuard, (req, res) => {
  Rent.find({
    $and: [
      { bookOwner: req.userInfo._id },
      { $or: [{ rent_status: "Approved" }, { rent_status: "Rejected" }] },
    ],
  })
    .sort({
      createdAt: "desc",
    })
    .populate("bookId")
    .populate("userId")
    .then((rent) => {
      res.status(201).json({
        success: true,
        data: rent,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//route to get rented books by user
router.get("/rented_books/get", auth.userGuard, (req, res) => {
  Rent.find({ userId: req.userInfo._id })
    .sort({
      createdAt: "desc",
    })
    .populate("bookId")
    .populate("userId")
    .then((rent) => {
      res.status(200).json({
        success: true,
        data: rent,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});



module.exports = router;

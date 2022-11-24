const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Rent = require("../models/rentModel");
const Book = require("../models/bookModel");

// Route To Rent Books By User
router.post("/rent/insert", auth.userGuard, (req, res) => {
  const data = Rent({
    bookId: req.body.bookId,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    no_of_days: req.body.no_of_days,
    userId: req.userInfo._id,
    total_price: req.body.total_price,
    payment_method: req.body.payment_method,
    bookOwner: req.body.bookOwner,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "Book Rented Successfully",
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// Router to approve Rent
router.put("/rent/approve", auth.userGuard, (req, res) => {
  Rent.updateOne(
    {
      _id: req.body.id,
    },
    {
      rent_status: "Approved",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Rent Book Approved Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});
// router to reject book
router.put("/rent/reject", auth.userGuard, (req, res) => {
  Rent.updateOne(
    {
      _id: req.body.id,
    },
    {
      rent_status: "Rejected",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Rent Book Rejected Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
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
    $and: [{ bookOwner: req.userInfo._id }, { $or: [{ rent_status: "Approved" }, { rent_status: "Rejected" }] }],
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
  Rent.find({
    $and: [{ userId: req.userInfo._id }, { rent_status: "Approved" }],
  })
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

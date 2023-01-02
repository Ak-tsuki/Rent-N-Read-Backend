const express = require("express");
const router = new express.Router();
const Review = require("../models/reviewModel");
const auth = require("../middleware/auth");

router.post("/add_review", auth.userGuard, (req, res) => {
  const data = new Review({
    bookId: req.body.bookId,
    ebookId: req.body.ebookId,
    audioBookId: req.body.audioBookId,
    rating: req.body.rating,
    review: req.body.review,
    userId: req.userInfo._id,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "Review added successfully!",
      });
    })
    .catch((e) => {
      res.json({
        success: false,
        msg: e,
      });
    });
});

router.get("/get/book_reviews/:id", (req, res) => {
  Review.find({ bookId: req.params.id })
    .populate("userId")
    .then((reviews) => {
      res.status(200).json({
        success: true,
        reviews: reviews,
      });
    })
    .catch((e) => {
      res.status(404).json({
        success: false,
        msg: "No reviews found",
      });
    });
});
router.get("/get/ebook_reviews/:id", (req, res) => {
  Review.find({ ebookId: req.params.id })
    .populate("userId")
    .then((reviews) => {
      res.status(200).json({
        success: true,
        reviews: reviews,
      });
    })
    .catch((e) => {
      res.status(404).json({
        success: false,
        msg: "No reviews found",
      });
    });
});
router.get("/get/audiobook_reviews/:id", (req, res) => {
  Review.find({ audioBookId: req.params.id })
    .populate("userId")
    .then((reviews) => {
      res.status(200).json({
        success: true,
        reviews: reviews,
      });
    })
    .catch((e) => {
      res.status(404).json({
        success: false,
        msg: "No reviews found",
      });
    });
});

router.get("/check/reviewexist/:id", auth.userGuard, (req, res) => {
  Review.findOne({
    $and: [
      { userId: req.userInfo._id },
      {
        $or: [
          { bookId: req.params.id },
          { ebookId: req.params.id },
          { audioBookId: req.params.id },
        ],
      },
    ],
  })
    .then((data) => {
      if (data !== null) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(200).json({
          success: false,
        });
      }
    })
    .catch((e) => {
      res.status(404).json({
        success: false,
      });
    });
});

module.exports = router;

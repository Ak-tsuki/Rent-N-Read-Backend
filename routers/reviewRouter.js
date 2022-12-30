const express = require("express");
const router = new express.Router();
const Review = require("../models/reviewModel");
const auth = require("../middleware/auth");

router.post("/add_review", auth.userGuard, (req, res) => {
  const data = Review({
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

module.exports = router;

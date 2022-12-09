const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const BuyAudioBook = require("../models/buyaudiobookModel");

// Route To Buy Audio Books By User
router.post("/audiobook/buy", auth.userGuard, (req, res) => {
  const data = BuyAudioBook({
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
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

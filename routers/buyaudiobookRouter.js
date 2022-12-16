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

// get audio book by user(only the user buyed)
router.get("/boughtaudiobook/get", auth.userGuard, (req, res) => {
  BuyAudioBook.find({ userId: req.userInfo._id })
    .sort({
      createdAt: "desc",
    })
    .populate("audiobookId")
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


//Router To Delete Audio Book
router.delete("/boughtaudiobook/delete/:_id", auth.userGuard, (req, res) => {
  console.log(req.params._id);
  BuyAudioBook.deleteOne({ _id: req.params._id })
    .then(() => {
      res.status(201).json({ msg: "Audio Book Deleted Successfully", success: true });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

module.exports = router;

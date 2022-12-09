const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Buy = require("../models/buyEbookModel");

// Route To Buy EBooks By User
router.post("/buy/insert", auth.userGuard, (req, res) => {
  const data = Buy({
    ebookId: req.body.ebookId,
    userId: req.userInfo._id,
    bought_date: req.body.bought_date,
    payment_method: req.body.payment_method,
    bookOwner: req.body.bookOwner,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "EBook Bought Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// Router to make Payment status Paid
router.put("/buy/paymentPaid", auth.userGuard, (req, res) => {
  Buy.updateOne(
    {
      _id: req.body.id,
    },
    {
      payment_status: "Paid",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Payment Successful",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

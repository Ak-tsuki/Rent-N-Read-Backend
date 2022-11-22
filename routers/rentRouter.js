const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Rent = require("../models/rentModel");

// Route To Rent Books By User
router.post("/rent/insert", auth.userGuard, (req, res) => {
    const data= Rent({
        bookId: req.body.bookId,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        no_of_days: req.body.no_of_days,
        userId: req.userInfo._id,
        total_price: req.body.total_price,
        payment_method: req.body.payment_method,
        contact_no: req.body.contact_no,
    });
    data.save()
    .then(()=>{
        res.status(201).json({
            success: true,
            msg: "Book Rented Successfully",
        });
    })
    .catch((e)=>{
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

module.exports = router;
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const RentEbook = require("../models/rentEbookModel");
const EBook = require("../models/e_bookModel");

// Route To Rent EBooks By User
router.post("/rentEbook/add", auth.userGuard, (req, res) => {
  const data = RentEbook({
    ebookId: req.body.ebookId,
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
        msg: "EBook Rented Successfully",
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// // Router to approve Rent ebook
// router.put("/rentEbook/approve", auth.userGuard, (req, res) => {
//   RentEbook.updateOne(
//     {
//       _id: req.body.id,
//     },
//     {
//       rent_status: "Approved",
//     }
//   )
//     .then(() => {
//       res.status(201).json({
//         msg: "Rent EBook Approved Successfully",
//       });
//     })
//     .catch((e) => {
//       res.status(400).json({
//         msg: e,
//       });
//     });
// });
// // router to reject ebook
// router.put("/rentEbook/reject", auth.userGuard, (req, res) => {
//   RentEbook.updateOne(
//     {
//       _id: req.body.id,
//     },
//     {
//       rent_status: "Rejected",
//     }
//   )
//     .then(() => {
//       res.status(201).json({
//         msg: "Rent EBook Rejected Successfully",
//       });
//     })
//     .catch((e) => {
//       res.status(400).json({
//         msg: e,
//       });
//     });
// });

//route to get pending rent request ebook by bookowner admin
router.get("/rentEbook/get", auth.adminGuard, (req, res) => {
  RentEbook.find({})
    .sort({
      createdAt: "desc",
    })
    .populate("ebookId")
    .populate("userId")
    .then((rentEbook) => {
      res.status(201).json({
        success: true,
        data: rentEbook,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//route to get all rent request ebook by bookowner
router.get("/rentEbook/getHistory", auth.adminGuard, (req, res) => {
  RentEbook.find({})
    .sort({
      createdAt: "desc",
    })
    .populate("ebookId")
    .populate("userId")
    .then((rentEbook) => {
      res.status(201).json({
        success: true,
        data: rentEbook,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//route to get rented ebooks by user
router.get("/rented_ebooks/get", auth.userGuard, (req, res) => {
  RentEbook.find({ userId: req.userInfo._id })
    .sort({
      createdAt: "desc",
    })
    .populate("ebookId")
    .populate("userId")
    .then((rentEbook) => {
      res.status(200).json({
        success: true,
        data: rentEbook,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get one rentedbook
router.get("/rented_ebooks/getone/:id", auth.userGuard, (req, res) => {
  RentEbook.findOne({
    _id: req.params.id,
  })
    .then((rentEbook) => {
      if (rentEbook != null) {
        res.status(200).json({
          success: true,
          data: rentEbook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// Router to make Payment status Paid
router.put("/rentEbook/paymentPaid", auth.userGuard, (req, res) => {
  RentEbook.updateOne(
    {
      _id: req.body.id,
    },
    {
      rent_status: "Reading",
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

// Router to return rented book
router.put("/rentEbook/returnBook/:id", (req, res) => {
  RentEbook.updateOne(
    {
      _id: req.params.id,
    },
    {
      rent_status: "Returned",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "EBook returned Successful",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

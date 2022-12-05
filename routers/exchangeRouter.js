const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Exchange = require("../models/exchangeModel");
const Book = require("../models/bookModel");

router.post("/exchange_request", auth.userGuard, (req, res) => {
  const data = Exchange({
    bookId: req.body.bookId,
    requestedUserId: req.userInfo._id,
    bookOwnerId: req.body.bookOwnerId,
    exchangeBookId: req.body.exchangeBookId,
  });
  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "Exchange Request sent successfully",
      });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// First method
router.put("/exchange/approve", auth.userGuard, (req, res) => {
  Exchange.updateOne(
    {
      _id: req.body.id,
    },
    {
      exchangeStatus: "Approved",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Exchange Request Approved Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// Reject exchange request
router.put("/exchange/reject", auth.userGuard, (req, res) => {
  Exchange.updateOne(
    {
      _id: req.body.id,
    },
    {
      exchangeStatus: "Rejected",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Exchange Request Rejected Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// Second Method
// router.delete("/exchange", auth.userGuard, (req, res) => {
//   Exchange.deleteOne({
//     _id: req.body.id,
//   })
//     .then(() => {
//       res.status(201).json({
//         msg: "Book Exchanged Successfully",
//       });
//     })
//     .catch((e) => {
//       res.status(400).json({
//         msg: e,
//       });
//     });
// });

router.put("/exchange_book", auth.userGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.bookId,
    },
    {
      bookOwner: req.body.requestedUserId,
    }
  )
    .then(() => {
      Book.updateOne(
        { _id: req.body.exchangeBookId },
        {
          bookOwner: req.userInfo._id,
        }
      );
    })
    .then(() => {
      res.status(201).json({
        msg: "Book Exchanged Successfully",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// // get all exchange requests by bookOwner
// router.get("/book_owner/exchange_requests", auth.userGuard, (req, res) => {
//   Exchange.find({ bookOwnerId: req.userInfo._id })
//     .populate("requestedUserId")
//     .populate("bookId")
//     .populate("exchangeBookId")
//     .sort({
//       createdAt: "desc",
//     })
//     .then((book) => {
//       res.status(201).json({
//         success: true,
//         data: book,
//       });
//     })
//     .catch((e) => {
//       res.status(400).json({
//         msg: e,
//       });
//     });
// });

// get all pending exchange requests by bookOwner
router.get("/book_owner/exchange_requests", auth.userGuard, (req, res) => {
  Exchange.find({
    $and: [{ bookOwnerId: req.userInfo._id }, { exchangeStatus: "Pending" }],
  })
    .populate("requestedUserId")
    .populate("bookId")
    .populate("exchangeBookId")
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

//route to get all exchange request history book by bookowner
router.get("/book_owner/exchange_history", auth.userGuard, (req, res) => {
  Exchange.find({
    $and: [
      { bookOwnerId: req.userInfo._id },
      { $or: [{ exchangeStatus: "Approved" }, { exchangeStatus: "Rejected" }] },
    ],
  })
    .populate("requestedUserId")
    .populate("bookId")
    .populate("exchangeBookId")
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

// get books by user who send the exchange request
router.get("/user/exchange_requests", auth.userGuard, (req, res) => {
  Exchange.find({ requestedUserId: req.userInfo._id })
    .populate("bookOwnerId")
    .populate("bookId")
    .populate("exchangeBookId")
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

module.exports = router;

const express = require("express");
const router = new express.Router();

//Importing Model
const Wishlist = require("../Models/wishlistModel");
const auth = require("../middleware/auth");

//Route To Insert Guitar To Wishlist By Customer
router.post("/wishlist/insert/", auth.userGuard, (req, res) => {
  Wishlist.find({
    $or: [
      { bookId: req.body.bookId },
      { ebookId: req.body.ebookId },
      { audiobookId: req.body.audiobookId },
    ],
  })
    .then((wishlist) => {
      if (wishlist) {
        res
          .status(201)
          .json({ msg: "Book Already Added To Wishlist", success: true });
      } else {
        const userId = req.userInfo._id;
        const bookId = req.body.bookId;
        const ebookId = req.body.ebookId;
        const audiobookId = req.body.audiobookId;

        const data = new Wishlist({
          userId: userId,
          bookId: bookId,
          ebookId: ebookId,
          audiobookId: audiobookId,
        });
        data
          .save()
          .then(() => {
            res.status(201).json({
              msg: "Book Added To Wishlist Successfully",
              success: true,
            });
          })
          .catch((e) => {
            res
              .status(400)
              .json({ msg: "Something Went Wrong, Please Try Again!!!" });
          });
      }
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

//Wishlist Get
router.get("/wishlist/get", auth.userGuard, (req, res) => {
  Wishlist.find({ userId: req.userInfo._id })
    .populate("bookId")
    .populate("ebookId")
    .populate("audiobookId")
    .then((wishlist) => {
      if (wishlist != null) {
        res.status(201).json({
          success: true,
          data: wishlist,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//Wishlist Delete
router.delete("/wishlist/delete/:id", auth.userGuard, (req, res) => {
  Wishlist.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({
        msg: "Book Deleted From Wishlist Successfully",
        success: true,
      });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

module.exports = router;

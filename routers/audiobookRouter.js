const express = require("express");
const router = express.Router();

//Model Imports
const AudioBook = require("../models/audiobookModel");
const BuyAudioBook = require("../models/buyaudiobookModel");
const auth = require("../middleware/auth");
const uploadFile = require("../file/uploadFile");

// route to add audiobook by admin
router.post(
  "/audiobook/add",
  auth.adminGuard,
  uploadFile.fields([
    {
      name: "book_img",
      maxCount: 1,
    },
    {
      name: "audio_book",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    if (req.files.book_img == undefined) {
      return res.status(401).json({
        msg: "Invalid Image format",
      });
    }
    if (req.files.audio_book == undefined) {
      return res.status(401).json({
        msg: "Invalid Audio format",
      });
    }

    const book_pic = req.files.book_img[0].filename;
    const audio_book = req.files.audio_book[0].filename;
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const desc = req.body.desc;
    const author = req.body.author;
    const category = req.body.category.split(",");
    const price = req.body.price;
    const userId = req.adminInfo._id;

    const data = new AudioBook({
      book_pic: book_pic,
      audio_book: audio_book,
      name: name,
      rich_desc: rich_desc,
      desc: desc,
      author: author,
      category: category,
      price: price,
      userId: userId,
    });
    data
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          msg: "AudioBook uploaded Successfully",
        });
      })
      .catch((e) => {
        res.json({
          msg: e,
        });
      });
  }
);

//Router To Update AudioBook
router.put(
  "/audiobook/update",
  auth.adminGuard,
  uploadFile.fields([
    {
      name: "book_img",
      maxCount: 1,
    },
    {
      name: "audio_book",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const desc = req.body.desc;
    const author = req.body.author;
    const category = req.body.category.split(",");
    const rent_cost_perday = req.body.rent_cost_perday;
    const price = req.body.price;
    const id = req.body._id;
    console.log(name);
    if (req.files.book_img == undefined && req.files.audio_book == undefined) {
      AudioBook.updateOne(
        { _id: id },
        {
          name: name,
          rich_desc: rich_desc,
          desc: desc,
          author: author,
          category: category,
          rent_cost_perday: rent_cost_perday,
          price: price,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ msg: "AudioBook Updated Successfully", success: true });
        })
        .catch((e) => {
          res.status(400).json({ msg: e });
        });
    } else if (req.files.book_img == undefined) {
      AudioBook.updateOne(
        { _id: id },
        {
          name: name,
          rich_desc: rich_desc,
          desc: desc,
          author: author,
          category: category,
          rent_cost_perday: rent_cost_perday,
          price: price,
          audio_book: req.files.audio_book[0].filename,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ msg: "AudioBook Updated Successfully", success: true });
        })
        .catch((e) => {
          res
            .status(400)
            .json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    } else if (req.files.audio_book == undefined) {
      AudioBook.updateOne(
        { _id: id },
        {
          name: name,
          rich_desc: rich_desc,
          desc: desc,
          author: author,
          category: category,
          rent_cost_perday: rent_cost_perday,
          price: price,
          book_pic: req.files.book_img[0].filename,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ msg: "AudioBook Updated Successfully", success: true });
        })
        .catch((e) => {
          res
            .status(400)
            .json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    } else {
      AudioBook.updateOne(
        { _id: id },
        {
          name: name,
          rich_desc: rich_desc,
          desc: desc,
          author: author,
          category: category,
          rent_cost_perday: rent_cost_perday,
          price: price,
          book_pic: req.files.book_img[0].filename,
          audio_book: req.files.audio_book[0].filename,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ msg: "AudioBook Updated Successfully", success: true });
        })
        .catch((e) => {
          res
            .status(400)
            .json({ msg: "Something Went Wrong, Please Try Again!!!" });
        });
    }
  }
);

//Router To Delete Book
router.delete("/audiobook/delete/:audiobookId", auth.adminGuard, (req, res) => {
  console.log(req.params.audiobookId);
  AudioBook.deleteOne({ _id: req.params.audiobookId })
    .then(() => {
      res
        .status(201)
        .json({ msg: "audioBook Deleted Successfully", success: true });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

// route to get audiobooks by admin
router.get("/audiobook/getbyadmin", auth.adminGuard, (req, res) => {
  AudioBook.find()
    .sort({
      createdAt: "desc",
    })
    .then((audiobook) => {
      res.status(201).json({
        success: true,
        data: audiobook,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get audiobooks by all user
router.get("/audiobook/get", (req, res) => {
  AudioBook.find({
    status: "Approved",
  })
    .then((audiobook) => {
      if (audiobook != null) {
        res.status(201).json({
          success: true,
          data: audiobook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get one book by all user
router.get("/audiobook/getone/:id", (req, res) => {
  AudioBook.findOne({
    _id: req.params.id,
  })
    .then((audiobook) => {
      if (audiobook != null) {
        res.status(200).json({
          success: true,
          data: audiobook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// get book by author (recommedation book)
router.get("/audiobook/getauthor/:author", (req, res) => {
  AudioBook.find({
    author: req.params.author,
  })
    .then((book) => {
      if (book != null) {
        res.status(200).json({
          success: true,
          data: book,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get audiobooks filtered through category by all user
router.get("/audiobook/filter/:category", (req, res) => {
  AudioBook.find({
    $and: [
      { status: "Approved" },
      { is_available: true },
      { category: req.params.category },
    ],
  })
    .then((audiobook) => {
      console.log("hgghg");
      if (audiobook != null) {
        console.log(audiobook);
        // Book.find({ category: { $in: book.category } }).then((book) => {
        //   res.status(200).json({
        //     success: true,
        //     data: book,
        //   });
        // });
        res.status(200).json({
          success: true,
          data: audiobook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get audiobooks filtered through category by all user main
router.get("/audiobook/filter/:category", (req, res) => {
  const category = req.params.category.split(",");
  AudioBook.find({
    $and: [
      { status: "Approved" },
      { is_available: true },
      { category: { $in: category } },
    ],
  })
    .then((audiobook) => {
      console.log("hgghg");
      if (audiobook != null) {
        console.log(audiobook);
        res.status(200).json({
          success: true,
          data: audiobook,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// route to get audiobooks filtered through price by all user
router.get("/audiobook/pricefilter/:priceone/:pricetwo", (req, res) => {
  AudioBook.find({
    $and: [
      { status: "Approved" },
      { is_available: true },
      { price: { $gte: req.params.priceone } },
      { price: { $lte: req.params.pricetwo } },
    ],
  })
    .then((book) => {
      if (book != null) {
        console.log(book);
        res.status(200).json({
          success: true,
          data: book,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

module.exports = router;

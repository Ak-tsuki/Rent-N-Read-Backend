const express = require("express");
const router = express.Router();

//Model Imports
const Book = require("../models/bookModel");

const auth = require("../middleware/auth");
const uploadFile = require("../file/uploadFile");

// route to add book by bookowner
router.post(
  "/book/add",
  auth.userGuard,
  uploadFile.single("book_img"),
  (req, res) => {
    if (req.file == undefined) {
      return res.status(401).json({
        msg: "Invalid file formate",
      });
    }

    const book_pic = req.file.filename;
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const desc = req.body.desc;
    const author = req.body.author;
    const category = req.body.category.split(",");
    const rent_cost_perday = req.body.rent_cost_perday;
    const bookOwner = req.userInfo._id;

    const data = new Book({
      book_pic: book_pic,
      name: name,
      rich_desc: rich_desc,
      desc: desc,
      author: author,
      category: category,
      rent_cost_perday: rent_cost_perday,
      bookOwner: bookOwner,
    });
    data
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          msg: "Book uploaded Successfully",
        });
      })
      .catch((e) => {
        res.json({
          msg: e,
        });
      });
  }
);

// route to get books by bookowner
router.get("/book/getbyOwner", auth.userGuard, (req, res) => {
  Book.find({ bookOwner: req.userInfo._id })
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

// route to get books by all user
router.get("/book/get", (req, res) => {
  Book.find({
    status: "Approved",
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

// route to get one book by all user
router.get("/book/getone/:id", (req, res) => {
  Book.findOne({
    _id: req.params.id,
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

// route to get all requested books by admin
router.get("/book/getallbyadmin", auth.adminGuard, (req, res) => {
  Book.find()
    .populate("bookOwner")
    .sort({
      createdAt: "desc",
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

// router to approve book
router.put("/book/approve", auth.adminGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: "Approved",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Approved successful",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});
// router to reject book
router.put("/book/reject", auth.adminGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: "Rejected",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Rejected successful",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

//Router To Update Book
router.put(
  "/book/update",
  auth.userGuard,
  uploadFile.single("book_img"),
  (req, res) => {
    const name = req.body.name;
    const rich_desc = req.body.rich_desc;
    const desc = req.body.desc;
    const author = req.body.author;
    const category = req.body.category.split(",");
    const rent_cost_perday = req.body.rent_cost_perday;
    const id = req.body._id;
    console.log(name);
    if (req.file == undefined) {
      Book.updateOne(
        { _id: id },
        {
          name: name,
          rich_desc: rich_desc,
          desc: desc,
          author: author,
          category: category,
          rent_cost_perday: rent_cost_perday,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ msg: "Book Updated Successfully", success: true });
        })
        .catch((e) => {
          res.status(400).json({ msg: e });
        });
    } else {
      Book.updateOne(
        { _id: id },
        {
          name: name,
          rich_desc: rich_desc,
          desc: desc,
          author: author,
          category: category,
          rent_cost_perday: rent_cost_perday,
          book_pic: req.file.filename,
        }
      )
        .then(() => {
          res
            .status(201)
            .json({ msg: "Book Updated Successfully", success: true });
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
router.delete("/book/delete/:bookId", auth.userGuard, (req, res) => {
  console.log(req.params.bookId);
  Book.deleteOne({ _id: req.params.bookId })
    .then(() => {
      res.status(201).json({ msg: "Book Deleted Successfully", success: true });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});

router.put("/book/isAvailable", auth.userGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.id,
    },
    {
      is_available: true,
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "book is available",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.put("/book/isNotAvailable", auth.userGuard, (req, res) => {
  Book.updateOne(
    {
      _id: req.body.id,
    },
    {
      is_available: false,
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Book is not available",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// get book by author (recommedation book)
router.get("/book/getauthor", (req, res) => {
  Book.find({
    author: req.body.author,
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

module.exports = router;

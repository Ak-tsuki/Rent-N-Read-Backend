const mongoose = require("mongoose");

//Book Model Collection Create
const Book = new mongoose.Schema({
  book_pic: {
    type: String,
  },
  book_name: {
    type: String,
    required: true,
  },
  book_rich_desc: {
    type: String,
    required: true,
  },
  book_desc: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  book_category: {
    type: String,
    required: true,
  },
  book_rent_cost_perday: {
    type: Number,
    required: true,
  },
  book_status: {
    type: String,
    default: "Requested",
  },
  bookOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Book", Book);

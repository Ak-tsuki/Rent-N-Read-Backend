const mongoose = require("mongoose");

//Book Model Collection Create
const Book = new mongoose.Schema({
  book_pic: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  rich_desc: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      required: true,
    },
  ],
  rent_cost_perday: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  bookOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Book", Book);

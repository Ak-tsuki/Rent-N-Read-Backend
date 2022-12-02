const mongoose = require("mongoose");

//Book Model Collection Create
const EBook = new mongoose.Schema({
  book_pic: {
    type: String,
  },
  e_book: {
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
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("EBook", EBook);

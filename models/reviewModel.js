const mongoose = require("mongoose");

const Review = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  ebookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ebook",
  },
  audioBookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AudioBook",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Review", Review);

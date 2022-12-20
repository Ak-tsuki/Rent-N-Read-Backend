const mongoose = require("mongoose");

const Wishlist = new mongoose.Schema({
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
    ref: "EBook",
  },
  audiobookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AudioBook",
  },
});

module.exports = mongoose.model("Wishlist", Wishlist);

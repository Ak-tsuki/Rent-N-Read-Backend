const mongoose = require("mongoose");

const Wishlist = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", Wishlist);

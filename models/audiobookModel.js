const mongoose = require("mongoose");

//Book Model Collection Create
const AudioBook = new mongoose.Schema({
  book_pic: {
    type: String,
  },
  audio_book: {
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
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("AudioBook", AudioBook);

const mongoose = require("mongoose");
const { default: isBoolean } = require("validator/lib/isboolean");

//Rent Book Model Collection Create
const BuyAudioBook = new mongoose.Schema(
  {
    audiobookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AudioBook",
      required: true,
    },
    bookOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bought_date: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_method: {
      type: String,
      default: "Khalti",
    },
    payment_status: {
      type: String,
      default: "Paid",
    },
    contact_no: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BuyAudioBook", BuyAudioBook);

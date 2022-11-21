const mongoose = require("mongoose");

//Rent Book Model Collection Create
const Rent = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    no_of_days: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
    },
    contact_no: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rent", Rent);

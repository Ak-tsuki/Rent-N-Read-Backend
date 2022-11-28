const mongoose = require("mongoose");
const { default: isBoolean } = require("validator/lib/isboolean");

//Rent Book Model Collection Create
const Rent = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    bookOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
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
    rent_status: {
      type: String,
      default: "Pending",
    },
    payment_method: {
      type: String,
    },
    payment_status: {
      type: String,
      default: "Pending",
    },
    contact_no: {
      type: String,
    },

    is_returned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rent", Rent);

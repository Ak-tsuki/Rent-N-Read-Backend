const mongoose = require("mongoose");
const { default: isBoolean } = require("validator/lib/isboolean");

//Rent Book Model Collection Create
const RentEbook = new mongoose.Schema(
  {
    ebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EBook",
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
      default: "Approved",
    },
    payment_method: {
      type: String,
      default: "Khalti",
    },
    payment_status: {
      type: String,
      default: "Pending",
    },
    contact_no: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RentEbook", RentEbook);
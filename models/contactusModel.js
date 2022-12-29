const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contactus = new mongoose.Schema(
  {
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
    },
    contact_no: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contactus", Contactus);

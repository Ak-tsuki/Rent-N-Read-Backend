const mongoose = require("mongoose");
const { default: isBoolean } = require("validator/lib/isboolean");

//Buy eBook Model Collection Create
const Buy = new mongoose.Schema(
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
      default: "eSewa",
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
module.exports = mongoose.model("Buy", Buy);

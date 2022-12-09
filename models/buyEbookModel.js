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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bought_date: {
      type: String,
    },

    payment_status: {
      type: String,
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Buy", Buy);

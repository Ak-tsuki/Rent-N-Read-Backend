const mongoose = require("mongoose");

const message = mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    postdatetime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", message);

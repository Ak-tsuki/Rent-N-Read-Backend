const express = require("express");
const router = new express.Router();
const Message = require("../models/messageModel");

// add
router.post("/message/add", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json({
      success: true,
      data: savedMessage,
    });
  } catch (e) {
    res.status(500).json({
      msg: e,
    });
  }
});

// get converation of a user
router.get("/message/getbyconversationId/:id", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(201).json({
      success: true,
      data: messages,
    });
  } catch (e) {
    res.status(500).json({
      msg: e,
    });
  }
});

module.exports = router;

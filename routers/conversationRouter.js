const express = require("express");
const router = new express.Router();
const Conversation = require("../models/coversationModel");
const auth = require("../middleware/auth");

// new conversation
router.post("/conversation/post", auth.userGuard, (req, res) => {
  Conversation.findOne({
    $or: [
      { members: [req.body.senderId, req.body.receiverId] },
      { members: [req.body.receiverId, req.body.senderId] },
    ],
  })
    .then((conversation) => {
      if (conversation != null) {
        res.json({ msg: "Conversation already exists" });
        return;
      }
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });

      newConversation
        .save()
        .then(() => {
          res.status(201).json({
            success: true,
            msg: "new conversation created",
          });
        })
        .catch((e) => {
          res.status(500).json({
            msg: e,
          });
        });
    })
    .catch((e) => {
      res.json({
        msg: e,
      });
    });
});

// get converation of a user
router.get("/conversation/getbyusername/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (e) {
    res.status(500).json({
      msg: e,
    });
  }
});

module.exports = router;
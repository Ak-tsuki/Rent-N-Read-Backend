const express = require("express");
const router = express.Router();

router.get("/login/sucess", (res, req) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

module.exports = router;

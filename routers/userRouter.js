const bcryptjs = require("bcryptjs");
const express = require("express");
const app = express();
const router = new express.Router();
const jwt = require("jsonwebtoken");

//Model Imports
const User = require("../models/userModel");
const auth = require("../middleware/auth");

// For Registering Process of User
router.post("/user/register", (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username })
    .then((user_data) => {
      if (user_data != null) {
        res.json({ msg: "Username Already Exists", success: "exists" });
        return;
      }
      const username = req.body.username;
      const email = req.body.email;
      const contact_no = req.body.contact_no;
      const password = req.body.password;

      bcryptjs.hash(password, 10, (e, hashed_pw) => {
        const data = new User({
          username: username,
          email: email,
          contact_no: contact_no,
          password: hashed_pw,
          userType: "user",
        });
        data
          .save()
          .then(() => {
            res.json({ msg: "User Registered Successfully", success: true });
          })
          .catch((e) => {
            res.json({ msg: "Something Went Wrong, Please Try Again!! " });
          });
      });
    })
    .catch();
});

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

router.get(
  "/payment/khalti/verification/:token/:amount/:secretKey",
  auth.userGuard,
  async (req, res, next) => {
    const data = {
      token: req.params.token,
      amount: req.params.amount,
    };
    const config = {
      headers: { Authorization: req.params.secretKey },
    };
    try {
      const res = await axios.post(
        "https://khalti.com/api/v2/payment/verify/",
        data,
        config
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

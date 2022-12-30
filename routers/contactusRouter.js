const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const Contactus = require("../models/contactusModel");
const User = require("../models/userModel");

router.post("/contactus/send", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const contact_no = req.body.contact_no;
  const email = req.body.email;
  const message = req.body.message;
  const subject = req.body.subject;

  const data = new Contactus({
    first_name: first_name,
    last_name: last_name,
    email: email,
    contact_no: contact_no,
    message: message,
    subject: subject,
  });

  data
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        msg: "Successfully sent",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.post("/contactus/reply", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tsukiak2@gmail.com",
      pass: "tfvkvcpsdhyefikb",
    },
  });

  const mailOption = {
    from: "tsukiak2@gmail.com",
    to: req.body.email,
    subject: "Email replied from RentNRead",
    html: `You got a message from
      Email : "tsukiak2@gmail.com"
      Name: "RentNRead"
      Message: ${req.body.message}`,
  };

  transporter.sendMail(mailOption, (error, response) => {
    if (error) {
      res.status(400).json({
        msg: e,
      });
    } else {
      res.status(201).json({
        success: true,
        msg: "Successfully sent",
      });
    }
  });

  transporter.close();
});

router.get("/getemails", (req, res) => {
  Contactus.find()
    .sort({
      createdAt: "desc",
    })
    .then((contactus) => {
      res.status(201).json({
        success: true,
        data: contactus,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.put("/contactus/resolved/:id", (req, res) => {
  Contactus.updateOne(
    {
      _id: req.params.id,
    },
    {
      status: "Resolved",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Problem Resolved",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

router.delete("/contactus/delete/:id", (req, res) => {
  console.log(req.params._id);
  Contactus.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({ msg: "Deleted Successfully", success: true });
    })
    .catch((e) => {
      res
        .status(400)
        .json({ msg: "Something Went Wrong, Please Try Again!!!" });
    });
});
module.exports = router;

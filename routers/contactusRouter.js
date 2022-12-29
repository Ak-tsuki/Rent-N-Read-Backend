const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const Contactus = require("../models/contactusModel");
const User = require("../models/userModel");

router.post("/contactus", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const contact_no = req.boy.contact_no;
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

  data.save().then(() => {
    res.status(201).json({
      success: true,
      msg: "Successfully sent",
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOption = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: subject,
    html: `You got a message from
    Email : ${email}
    Name: ${first_name}
    Message: ${message}`,
  };

  transporter.sendMail(mailOption, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
  });

  transporter.close();
});

router.get("/getcontactus", (req, res) => {
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

router.put("/contactus/resolved", (req, res) => {
  Contactus.updateOne(
    {
      _id: req.body.id,
    },
    {
      status: "Resolved",
    }
  )
    .then(() => {
      res.status(201).json({
        msg: "Prolem Resolved",
      });
    })
    .catch((e) => {
      res.status(400).json({
        msg: e,
      });
    });
});

// router.put("/contactus/pending", (req, res) => {
//   Contactus.updateOne(
//     {
//       _id: req.body.id,
//     },
//     {
//       status: "Pending",
//     }
//   )
//     .then(() => {
//       res.status(201).json({
//         msg: "Prolem Resolved",
//       });
//     })
//     .catch((e) => {
//       res.status(400).json({
//         msg: e,
//       });
//     });
// });
module.exports = router;

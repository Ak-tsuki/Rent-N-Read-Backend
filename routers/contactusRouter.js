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
      res.json({
        msg: e,
      });
    });

  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.GMAIL_USER,
  //       pass: process.env.PASSWORD,
  //     },
  //   });

  //   const mailOption = {
  //     from: process.env.GMAIL_USER,
  //     to: email ,
  //     subject: ${subject},
  //     html: `You got a message from
  //     Email : ${process.env.GMAIL_USER}
  //     Name: "Akatsuki"
  //     Message: ${message}`,
  //
  //   };

  //   transporter.sendMail(mailOption, (error, response) => {
  //     if (error) {
  //       res.send(error);
  //     } else {
  //       res.send("Success");
  //     }
  //   });

  //   transporter.close();
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
        msg: "Problem Resolved",
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

const nodemailer = require("nodemailer");
require("dotenv").config();

const uId = process.env.MAIL_ADDRESS;

function sendMail(sendTOId, sendSubject, sendText) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: uId,
      pass: process.env.MAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: uId,
    to: sendTOId,
    subject: sendSubject,
    text: sendText
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      return info.response;
    }
  });
}
exports.sendMail = sendMail;

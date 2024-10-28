const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = async (email_id, mailSubject, body_template) => {
  try {
        
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email_id,
      subject: mailSubject,
      html: body_template,
    };

    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("OTP sent on mail ", info.response);
      }
    });
  } catch (err) {
    res.json({
      data: err.message,
    });
  }
};

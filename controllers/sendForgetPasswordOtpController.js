const OTP = require("../models/sendForgetPasswordOtpModel");
const sendEmailToUser = require("../helper/mailService");
// const commonServices = require("../../helpers/commonServices");

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

exports.sendForgetPasswordOtp = async (req, res) => {
  try {
    const { email_id } = req.body;

    if (!email_id) {
      return res.status(400).json({status: 0, error: "Email ID is required." });
    }

    const existingUser = await OTP.checkEmailExists(email_id);
    if (existingUser.length > 0) {
      return res.status(400).json({status: 0, error: "Email already exists." });
    }

    const otp = generateOTP(); // Generate OTP

    const text = `Your OTP is ${otp}. It is valid for 10 minutes.`;
    const subject = "OTP for password reset.";

    await sendEmailToUser.sendEmail(email_id, subject, text);

    // Save OTP in verify_email table
    await OTP.forgetPasswordOtp(email_id, otp);

    res.status(200).json({status: 1, message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 0, error: "Failed to send OTP." });
  }
};

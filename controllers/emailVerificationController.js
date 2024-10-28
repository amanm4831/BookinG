const OTP = require("../models/otpVerificationModel");
const sendEmailToUser = require("../helper/mailService");
const User = require("../models/userModel");

// Generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

exports.sendEmailVerificationOTP = async (req, res) => {
  try {
    const { email_id } = req.body;

    if (!email_id) {
      return res.status(400).json({status: 0, error: "Email ID is required." });
    }

    const existingUser = await User.findByEmail(email_id);
    if (existingUser.length > 0) {
      return res.status(400).json({status: 0, error: "Email already exists." });
    }

    const otp = generateOTP(); // Generate OTP

    

    const text = `Your OTP is ${otp}. It is valid for 10 minutes.`;
    const subject = "Your Email Verification OTP";

    
    await sendEmailToUser.sendEmail(email_id, subject, text)
    
    // Save OTP in verify_email table
    await OTP.saveOTP(email_id, otp);

    res.status(200).json({status: 1, message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 0, error: "Failed to send OTP." });
  }
};

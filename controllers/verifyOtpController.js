// verifyOtpController.js
const User = require("../models/userModel");
const OTP = require("../models/otpVerificationModel");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.verifyEmailOTP = async (req, res) => {
  try {
    const { email_id, otp } = req.body;

    if (!email_id || !otp) {
      return res.status(400).json({status: 0, error: "Email ID and OTP are required." });
    }

    // Check if the OTP is valid
    const isValidOTP = await OTP.verifyOTP(email_id, otp);
    // console.log("is",isValidOTP);
    
    if (!isValidOTP) {
      return res.status(400).json({status: 0, error: "Invalid OTP or OTP expired." });
    }else{
      return res.status(200).json({status: 1, message: "email verified successfully"})
    }

    // const auth_Key = jwt.sign({ email_id }, JWT_SECRET, { expiresIn: "1h" });

    // // Create user in the users table
    // await User.createUser( email_id, auth_Key); // Make sure to save the user info

    // res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 0, error: "An error occurred. Please try again." });
  }
};


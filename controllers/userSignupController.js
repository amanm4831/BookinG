// signupController.js
const nodemailer = require("nodemailer");
const constant = require("../config/constants");
const User = require("../models/userModel");
const commonServices = require("../helper/commonServices");
const jwt = require("jsonwebtoken");

exports.signUpWithEmail = async (req, res) => {
  try {
    const { full_name, email_id, password, time_offset } = req.body;

// console.log("JWT_SECRET",email_id);

    // Check for required fields
    if (!full_name || !email_id || !password) {
      return res.status(400).json({status: 0, error: "Full name, email, and password are required." });
    }

    // Generate token and encrypt password
    const auth_Key = jwt.sign({ email_id }, process.env.JWT_SECRET);
    // console.log("auth_Key",auth_Key);
    
    const encryptedPassword = await commonServices.encryptPassword(password);
    const created_datetime = await commonServices.standardDateFormat();
    // console.log(auth_Key, encryptedPassword, created_datetime);

    // Create the new user
    await User.createUser(full_name, email_id, encryptedPassword, auth_Key, created_datetime);

    res.status(200).json({status: 1, message: "User Created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 0, error: "An error occurred." });
  }
};

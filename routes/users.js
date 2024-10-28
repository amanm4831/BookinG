const express = require("express");
const router = express.Router();
const signupController = require("../controllers/userSignupController");
const emailVerificationController = require("../controllers/emailVerificationController");
const verifyOtpController = require("../controllers/verifyOtpController");
const userLoginController = require("../controllers/userLoginController");
const sendForgetPasswordOtp = require("../controllers/sendForgetPasswordOtpController");
const verifyForgetPasswordOtp = require("../controllers/verifyForgetPasswordOtpController");
const changePassword = require("../controllers/changePasswordController");

// User Signup
router.post("/sign-up-with-email", signupController.signUpWithEmail);

// Send OTP
router.post("/send-email-verification-otp", emailVerificationController.sendEmailVerificationOTP);

// Verify OTP
router.post("/verify-email-otp", verifyOtpController.verifyEmailOTP);

// Send forget password OTP
router.post("/send-forget-password-otp", sendForgetPasswordOtp.sendForgetPasswordOtp);

// Verify forget password OTP
router.post("/verify-forget-password-otp", verifyForgetPasswordOtp.verifyForgetPasswordOtp);

// change password route
router.post("/changePassword", changePassword.changePassword);

// Login route
router.post("/login", userLoginController.login);

module.exports = router;

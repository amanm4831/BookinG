const ForgetPassword = require("../models/verifyForgetPasswordOtpModel");

// Verify OTP for forget password
exports.verifyForgetPasswordOtp = async (req, res) => {
  try {
    const { email_id, otp } = req.body;

    // Validate request data
    if (!email_id || !otp) {
      return res.status(400).json({status: 0, error: "Email and OTP are required." });
    }

    // Verify if the OTP is correct and not expired
    const isOtpValid = await ForgetPassword.verifyOtp(email_id, otp);

    if (!isOtpValid) {
      return res.status(401).json({status: 0, error: "Invalid or expired OTP." });
    }

    // (Optional) Delete the OTP after successful verification
    await ForgetPassword.deleteOtp(email_id);

    res.status(200).json({status: 1, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({status: 0, error: "An error occurred. Please try again." });
  }
};

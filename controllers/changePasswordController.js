const ForgetPassword = require("../models/changePasswordModel");

// Change Password Controller
exports.changePassword = async (req, res) => {
  try {
    const { email_id, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email_id || !newPassword || !confirmPassword) {
      return res.status(400).json({status: 0, error: "Email, new password, and confirm password are required." });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({status: 0, error: "Passwords do not match." });
    }

    // Update the user's password in the database
    await ForgetPassword.updatePassword(email_id, newPassword);

    res.status(200).json({status: 1, message: "Password updated successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({status: 0, error: "An error occurred. Please try again." });
  }
};

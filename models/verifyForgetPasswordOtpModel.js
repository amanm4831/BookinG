const db = require("../config/db");

const ForgetPassword = {
  // Check if the OTP exists and matches for the provided email
  verifyOtp: (email_id, otp) => {
    const query = `
      SELECT * FROM verify_email 
      WHERE email_id = ? AND otp = ? 
      AND created_datetime >= NOW() - INTERVAL 10 MINUTE`;

    return new Promise((resolve, reject) => {
      db.query(query, [email_id, otp], (err, results) => {
        if (err) {
          console.error("Error verifying OTP:", err);
          return reject(err);
        }
        // Return true if the OTP matches and is not expired, otherwise false
        resolve(results.length > 0);
      });
    });
  },

  // Remove the used OTP after successful verification (optional)
  deleteOtp: (email_id) => {
    const query = "DELETE FROM verify_email WHERE email_id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [email_id], (err, result) => {
        if (err) {
          console.error("Error deleting OTP:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = ForgetPassword;

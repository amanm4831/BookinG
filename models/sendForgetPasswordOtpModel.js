const db = require("../config/db");

const ForgetPassword = {
  // Check if email exists in the 'users' table
  checkEmailExists: (email_id) => {
    const query = "SELECT * FROM users WHERE email_id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [email_id], (err, results) => {
        if (err) {
          console.error("Error checking email existence:", err);
          return reject(err);
        }
        // Return the first result or null if no user is found
        resolve(results[0] || null);
      });
    });
  },

  // Store or update OTP in 'verify_email' table using REPLACE INTO
  forgetPasswordOtp: (email_id, otp) => {
    const query = `
      REPLACE INTO verify_email (email_id, otp, created_datetime) 
      VALUES (?, ?, NOW())`;

    return new Promise((resolve, reject) => {
      db.query(query, [email_id, otp], (err, result) => {
        if (err) {
          console.error("Error saving OTP:", err);
          return reject(err);
        }
        console.log("OTP saved successfully:", result);
        resolve(result);
      });
    });
  },
};

module.exports = ForgetPassword;

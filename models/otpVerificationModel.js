const db = require("../config/db");

const OTP = {
  saveOTP: (email_id, otp) => {
    const query = `
      INSERT INTO verify_email (email_id, otp, created_datetime) 
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE otp = ?, created_datetime = NOW()`;

    return new Promise((resolve, reject) => {
      db.query(query, [email_id, otp, otp], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  verifyOTP: (email_id, otp) => {
    const query = "SELECT * FROM verify_email WHERE email_id = ? AND otp = ?";

    return new Promise((resolve, reject) => {
      db.query(query, [email_id, otp], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.length > 0); // Return true if OTP exists
      });
    });
  },
};

module.exports = OTP;

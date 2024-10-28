const db = require("../config/db");
const bcrypt = require("bcrypt");

const ForgetPassword = {
  // Hash the new password and update it in the database
  updatePassword: (email_id, newPassword) => {
    return new Promise(async (resolve, reject) => {
      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash password with salt rounds = 10
        const query = "UPDATE users SET password = ? WHERE email_id = ?";
        
        db.query(query, [hashedPassword, email_id], (err, result) => {
          if (err) {
            console.error("Error updating password:", err);
            return reject(err);
          }
          resolve(result);
        });
      } catch (error) {
        console.error("Error hashing password:", error);
        reject(error);
      }
    });
  },
};

module.exports = ForgetPassword;

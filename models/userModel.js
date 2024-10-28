const db = require("../config/db");

const User = {
  findByEmail: (email_id) => {
    const query = "SELECT * FROM users WHERE email_id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [email_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  createUser: (full_name, email_id, password,  auth_key, created_datetime) => {
    const query = "INSERT INTO users ( full_name, email_id, password, auth_key, created_datetime) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.query(query, [full_name, email_id, password,  auth_key, created_datetime], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = User;

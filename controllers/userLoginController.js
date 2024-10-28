const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// LOGIN Logic
exports.login = async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      return res.status(400).json({status: 0, error: "Email and password are required" });
    }

    // Fetch user by email
    const results = await User.findByEmail(email_id);
    if (results.length === 0) {
      return res.status(401).json({status: 0, error: "Invalid email or password" });
    }

    const user = results[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({status: 0, error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET);

    res.status(200).json({status: 1, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({status: 0, error: "An error occurred. Please try again." });
  }
};

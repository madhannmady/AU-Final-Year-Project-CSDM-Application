const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to signup a new user
router.post("/signup", async (req, res) => {
  console.log("Signup Called");

  try {
    const { name, phoneNumber } = req.body;
    console.log("User Data Received:", name, phoneNumber);

    // Validate required fields
    if (!name || !phoneNumber) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name and phone number are required",
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this phone number already exists",
        });
    }

    const newUser = new User({ name, phoneNumber });
    const savedUser = await newUser.save();
    console.log("User Saved to MongoDB:", savedUser);

    res
      .status(201)
      .json({
        success: true,
        message: "User signed up successfully!",
        data: savedUser,
      });
  } catch (error) {
    console.error("❌ Error Signing Up:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;

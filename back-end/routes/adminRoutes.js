const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); 
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"); // Import mongoose
const jwt = require("jsonwebtoken"); // ✅ Import jsonwebtoken

const path = require("path");
const findConfig = require("find-config");
require("dotenv").config({ path: findConfig(".env") }); // ✅ Load `.env` dynamically

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key"; // ✅ Use .env variable


router.post("/register", async (req, res) => {
    try {
        console.log("Register Called");

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required!" });
        }

        console.log("Datas:", username, password);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        console.log("✅ Admin Registered Successfully!");
        res.json({ message: "Admin registered!" });
    } catch (error) {
        console.error("❌ Error Registering Admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Admin Login
router.post("/login", async (req, res) => {

  console.log("Login called");

    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    console.log("admin "+admin);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;

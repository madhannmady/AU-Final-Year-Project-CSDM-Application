// server.js

const path = require("path");
const findConfig = require("find-config");
require("dotenv").config({ path: findConfig(".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fetch = require("node-fetch"); // Make sure this is installed
const connectDB = require("../config/db");
const adminRoutes = require("../routes/adminRoutes");
const foodRoutes = require("../routes/foodRoutes");
const userRoutes = require("../routes/userRoutes");
const postRoutes = require("../routes/postRoutes");
const sendSMS = require("../sendSms/sendSms");
const User = require("../models/User");
const Post = require("../models/Post");

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173",
  process.env.NGROK_URL ||
    "https://b090-2406-7400-1c3-dc0a-5840-d43e-9174-42d3.ngrok-free.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.setTimeout(20000);
  res.setTimeout(20000);
  console.log(`Incoming request: ${req.method} ${req.url} from ${req.ip}`);
  const originalEnd = res.end;
  let retryCount = 0;
  const maxRetries = 2;
  res.end = function (...args) {
    if (res.statusCode >= 500 && retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying request (${retryCount}/${maxRetries})...`);
      return setTimeout(() => next(), 2000);
    }
    originalEnd.apply(res, args);
  };
  next();
});

// --- Routes ---
app.use("/api/admin", adminRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

// --- In-memory Disaster Alerts ---
let disasterAlerts = [];

app.get("/api/alerts", (req, res) => {
  res.json({ alerts: disasterAlerts });
});

app.post("/api/alerts", (req, res) => {
  const { lat, lon, active } = req.body;
  if (!lat || !lon || active === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Lat, lon, and active are required" });
  }
  const id = Date.now();
  const newAlert = { id, lat, lon, active };
  disasterAlerts.push(newAlert);
  res.json({ message: "Alert Added", alert: newAlert });
});

app.delete("/api/alerts/:id", (req, res) => {
  const alertId = parseInt(req.params.id);
  disasterAlerts = disasterAlerts.filter((alert) => alert.id !== alertId);
  res.json({ message: "Alert Removed" });
});

// --- Send SMS ---
app.post("/send-sms", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({ success: false, error: "Message is required" });
  }
  console.log("Message to send:", message);
  sendSMS(message)
    .then(() =>
      res.status(200).json({ success: true, message: "SMS sent successfully" })
    )
    .catch((error) => {
      console.error("SMS sending failed:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send SMS",
        error: error.message,
      });
    });
});

// --- User Signup ---
app.post("/api/user/signup", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    if (!name || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Name and phone number are required",
      });
    }

    const sanitizedPhone = phoneNumber.replace(/\D/g, "");
    if (sanitizedPhone.length !== 10) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number must be 10 digits" });
    }

    const existingUser = await User.findOne({ phoneNumber: sanitizedPhone });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }

    const newUser = new User({
      name: name.trim(),
      phoneNumber: sanitizedPhone,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "Data saved successfully!",
      data: savedUser,
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// --- Get User by Phone Number ---
app.get("/api/user/:phoneNumber", async (req, res) => {
  try {
    const sanitizedPhone = req.params.phoneNumber.replace(/\D/g, "");
    const user = await User.findOne({ phoneNumber: sanitizedPhone });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// --- Like a Post ---
app.put("/api/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    post.likes = (post.likes || 0) + 1;
    const updatedPost = await post.save();
    res
      .status(200)
      .json({ success: true, message: "Post liked", data: updatedPost });
  } catch (error) {
    console.error("Error liking post:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// --- Ambee Disaster Data Endpoint ---
app.get("/api/disasters", async (req, res) => {
  try {
    const AMBEE_API_KEY = process.env.AMBEE_API_KEY;
    if (!AMBEE_API_KEY) throw new Error("Missing AMBEE_API_KEY in .env");

    const endpoint =
      "https://api.ambeedata.com/disasters/latest/by-country-code";
    const params = new URLSearchParams({
      countryCode: "IND",
      limit: "40",
      page: "1",
    });

    const response = await fetch(`${endpoint}?${params}`, {
      headers: {
        "x-api-key": AMBEE_API_KEY,
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    const data = await response.json();

    if (data.message !== "success" || !Array.isArray(data.result)) {
      throw new Error("Invalid response structure from Ambee");
    }

    res.status(200).json({ success: true, data: data.result });
  } catch (error) {
    console.error("Disaster API fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch disaster data",
      error: error.message,
    });
  }
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
const connectWithRetry = () => {
  connectDB()
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("MongoDB connection failed. Retrying in 5s...", err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

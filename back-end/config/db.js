const mongoose = require("mongoose");
const path = require("path");
const findConfig = require("find-config");
require("dotenv").config({ path: findConfig(".env") });

console.log("📌 MongoDB URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully!");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected! Trying to reconnect...");
      connectDB();
    });

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Export the function
module.exports = connectDB;

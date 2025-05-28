const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/Disaster_Management"; // Update if necessary

async function testConnection() {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
        });
        console.log("✅ MongoDB Connected Successfully!");
        process.exit(0); // Exit after testing
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
}

testConnection();

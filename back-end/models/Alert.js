const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    severity: { type: String, enum: ["Low", "Medium", "High"], required: true }, // Optional severity level
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Alert = mongoose.model("Alert", AlertSchema);

module.exports = Alert;

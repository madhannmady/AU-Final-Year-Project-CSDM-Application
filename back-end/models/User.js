const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true }, // Unique phone number as identifier
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);

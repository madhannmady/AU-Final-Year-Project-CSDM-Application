const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodItem: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", foodSchema);

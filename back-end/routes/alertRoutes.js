const express = require("express");
const router = express.Router();
const Alert = require("../models/Alert");


app.post("/add-alert", async (req, res) => {
    const { message } = req.body;
    const newAlert = new Alert({ message });
    await newAlert.save();
    res.json({ message: "Alert created!" });
  });
  
  // Get Alerts
  app.get("/alerts", async (req, res) => {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  });


  module.exports = router;  
const express = require("express");
const router = express.Router();
const Food = require("../models/Food"); // Import the Food model

// Route to add food item
router.post("/add-food", async (req, res) => {
  console.log("Food Called");

  try {
    const { foodItem, location } = req.body;
    console.log("Food Data Received:", foodItem, location);

    // Validate required fields
    if (!foodItem || !location || !location.lat || !location.lon) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (foodItem, location.lat, location.lon) are required",
      });
    }

    const newFood = new Food({ foodItem, location });
    const savedFood = await newFood.save();
    console.log("Food Saved to MongoDB:", savedFood);

    res.status(201).json({
      success: true,
      message: "Food item added successfully!",
      data: savedFood,
    });
  } catch (error) {
    console.error("❌ Error Adding Food:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Route to fetch all food items
router.get("/food-items", async (req, res) => {
  try {
    const foodList = await Food.find().sort({ createdAt: -1 }); // Sort by latest first
    console.log("Food Items Fetched:", foodList);
    res.json(foodList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to delete a food item
router.delete("/delete-food/:id", async (req, res) => {
  try {
    const foodId = req.params.id;
    console.log(`Received DELETE request for food ID: ${foodId}`); // Debug log
    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood) {
      console.log(`Food item ${foodId} not found in database`);
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    console.log("Food Deleted from MongoDB:", deletedFood);
    res.json({ success: true, message: "Food item deleted successfully!" });
  } catch (error) {
    console.error("❌ Error Deleting Food:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const Achievement = require("../models/achievement"); // Adjust the path as per your file structure
const { achievements } = require("../data/achivement"); // Import the achievements array
const connectDB = require("../database/connectDb");

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // Seed function
    const seedAchievements = async () => {
      try {
        // Delete all existing achievements before seeding
        await Achievement.deleteMany({});
        console.log("Old achievements removed successfully.");

        // Insert predefined achievements
        await Achievement.insertMany(achievements);
        console.log("Achievements seeded successfully!");
      } catch (err) {
        console.error("Error seeding achievements:", err);
      } finally {
        mongoose.connection.close(); // Close the connection after seeding
      }
    };

    // Run the seeding function
    seedAchievements();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

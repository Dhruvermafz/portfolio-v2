const mongoose = require("mongoose");
const connectDB = require("../database/connectDb"); // Adjust path if needed

// Function to drop the mobile_1 index
const dropMobileIndex = async () => {
  try {
    // Ensure MongoDB connection
    await connectDB();
    console.log("Connected to MongoDB");

    // Check if the mobile_1 index exists
    const indexes = await mongoose.connection.collection("users").indexes();
    const mobileIndex = indexes.find((index) => index.name === "mobile_1");

    if (!mobileIndex) {
      console.log("mobile_1 index does not exist");
      return;
    }

    // Drop the mobile_1 index
    await mongoose.connection.collection("users").dropIndex("mobile_1");
    console.log("Successfully dropped mobile_1 index");
  } catch (error) {
    console.error("Error dropping index:", error.message);
    if (error.code === 26) {
      console.log("Namespace not found: Index or collection does not exist");
    } else if (error.code === 11000) {
      console.log("Index already dropped or not found");
    }
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  }
};

// Run the function
dropMobileIndex();

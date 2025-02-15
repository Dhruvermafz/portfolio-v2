const mongoose = require("mongoose");
const User = require("../models/user"); // Adjust the path as necessary
const connectDB = require("../database/connectDb"); // Adjust the path based on your project structure

const seedAdminRole = async () => {
  const email = "vermadhruv09112002@gmail.com"; // Replace with the user's email
  const adminRole = "admin";

  try {
    // Connect to the MongoDB database using your connectDB function
    await connectDB();

    console.log("Connected to MongoDB");

    // Find the user by email and update their role
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: adminRole },
      { new: true }
    );

    if (updatedUser) {
      console.log(
        `Role updated successfully. User: ${updatedUser.username}, Role: ${updatedUser.role}`
      );
    } else {
      console.log("User not found. Please check the email address.");
    }
  } catch (error) {
    console.error("Error updating user role:", error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

seedAdminRole();

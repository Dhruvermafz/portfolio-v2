const mongoose = require("mongoose");
const states = require("../data/state"); // This should be an array of valid states for the 'state' field

// Define the schema for User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same username
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same email
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    photo: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/mern-travel-tourism.appspot.com/o/profile-photos%2F1706415975072defaultProfileImgttms125.png?alt=media&token=7f309b9e-7ccf-4a15-ba5c-829c9952a85c",
      // Default profile picture URL if none is provided
    },
    mobile: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same mobile number
    },
    state: {
      type: String,
      enum: states, // Limits the state field to the values in the 'states' array
      required: true, // State is required
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Restricts the role to either 'user' or 'admin'
      default: "user", // Default role is 'user'
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the User model using the schema
module.exports = mongoose.model("User", userSchema);

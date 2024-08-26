const mongoose = require("mongoose");

// Define the schema for Category
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Equivalent to NOT NULL in SQL
    },
  },
  {
    timestamps: true, // Add `createdAt` and `updatedAt` fields automatically
    // Specify collection name if different from model name
  }
);

// Create the Category model using the schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

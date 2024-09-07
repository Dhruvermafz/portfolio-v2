const mongoose = require("mongoose");

// Define the schema for Category
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Equivalent to NOT NULL in SQL
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId, // Reference to another category
      ref: "Category", // Refers to the Category model itself
      default: null, // Allows categories without parents (i.e., top-level categories)
    },
    isActive: {
      type: Boolean, // Boolean field for active/inactive status
      default: true, // Default value set to true
    },
  },
  {
    timestamps: true, // Add `createdAt` and `updatedAt` fields automatically
  }
);

// Create the Category model using the schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

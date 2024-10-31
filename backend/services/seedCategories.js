const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Category = require("../models/category");
const connectDb = require("../database/connectDb");

const seedCategories = async () => {
  try {
    await connectDb();

    // Read categories from JSON file
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/categories.json"), "utf-8")
    );

    // Step 1: Insert top-level categories
    const insertedCategories = {};
    for (const category of categoriesData) {
      if (!category.parentCategory) {
        const newCategory = await Category.create({ name: category.name });
        insertedCategories[category.name] = newCategory._id;
      }
    }

    // Step 2: Insert nested categories using ObjectId references
    for (const category of categoriesData) {
      if (category.parentCategory) {
        const parentCategoryId = insertedCategories[category.parentCategory];
        if (parentCategoryId) {
          await Category.create({
            name: category.name,
            parentCategory: parentCategoryId,
          });
        }
      }
    }

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedCategories();

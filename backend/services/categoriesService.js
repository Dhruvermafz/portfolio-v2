const Category = require("../models/category");

const categoriesService = {
  // Create a new category
  create: async (body) => {
    const category = await Category.create(body);
    return category.toJSON(); // Converts the Mongoose document to a plain JSON object
  },

  // Find all categories
  findAll: async () => {
    return await Category.find({});
  },

  // Find a category by ID
  findById: async (id) => {
    return await Category.findById(id);
  },

  // Update a category by ID
  updateById: async (id, updateData) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedCategory ? updatedCategory.toJSON() : null;
  },

  // Delete a category by ID
  deleteById: async (id) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    return deletedCategory ? deletedCategory.toJSON() : null;
  },

  // Find categories by parent category (useful for hierarchical structures)
  findByParentCategory: async (parentCategoryId) => {
    return await Category.find({ parentCategory: parentCategoryId });
  },

  // Deactivate a category (sets `isActive` to false)
  deactivateById: async (id) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return updatedCategory ? updatedCategory.toJSON() : null;
  },
};

module.exports = categoriesService;

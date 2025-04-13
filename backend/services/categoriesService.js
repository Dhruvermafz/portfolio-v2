const Category = require("../models/category");
const Post = require("../models/blogPost");
const Project = require("../models/project");

const categoriesService = {
  // Create a new category
  create: async (body) => {
    try {
      const category = await Category.create(body);
      return category.toJSON(); // Converts the Mongoose document to a plain JSON object
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Error creating category");
    }
  },

  // Find all categories
  findAll: async () => {
    try {
      return await Category.find({});
    } catch (error) {
      console.error("Error fetching all categories:", error);
      throw new Error("Error fetching categories");
    }
  },

  // Find a category by ID
  findById: async (id) => {
    try {
      return await Category.findById(id);
    } catch (error) {
      console.error(`Error fetching category by ID (${id}):`, error);
      throw new Error("Error fetching category");
    }
  },

  // Update a category by ID
  updateById: async (id, updateData) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      return updatedCategory ? updatedCategory.toJSON() : null;
    } catch (error) {
      console.error(`Error updating category by ID (${id}):`, error);
      throw new Error("Error updating category");
    }
  },

  // Delete a category by ID
  deleteById: async (id) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      return deletedCategory ? deletedCategory.toJSON() : null;
    } catch (error) {
      console.error(`Error deleting category by ID (${id}):`, error);
      throw new Error("Error deleting category");
    }
  },

  // Find categories by parent category (useful for hierarchical structures)
  findByParentCategory: async (parentCategoryId) => {
    try {
      return await Category.find({ parentCategory: parentCategoryId });
    } catch (error) {
      console.error(
        `Error fetching categories by parent ID (${parentCategoryId}):`,
        error
      );
      throw new Error("Error fetching categories by parent category");
    }
  },

  // Deactivate a category (sets `isActive` to false)
  deactivateById: async (id) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
      return updatedCategory ? updatedCategory.toJSON() : null;
    } catch (error) {
      console.error(`Error deactivating category by ID (${id}):`, error);
      throw new Error("Error deactivating category");
    }
  },

  getItemsByCategory: async (categoryId) => {
    try {
      const [posts, projects] = await Promise.all([
        Post.find({ category: categoryId }),
        Project.find({ category: categoryId }),
      ]);

      return [...posts, ...projects]; // Combine both
    } catch (error) {
      console.error("Error fetching posts/projects by category:", error);
      throw new Error("Error fetching items by category");
    }
  },
};

module.exports = categoriesService;

const categoriesService = require("../services/categoriesService");
const validateCategory = require("../middlewares/validateCategory");

const categoriesController = {
  create: async (req, res) => {
    const validatedBody = validateCategory(req.body);
    if (validatedBody.error) {
      return res
        .status(400)
        .json({ message: validatedBody.error.details[0].message });
    }
    try {
      const result = await categoriesService.create(validatedBody.value); // Passing the validated body
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
  findAll: async (req, res) => {
    try {
      const result = await categoriesService.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching categories: ", error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  findCategory: async (req, res) => {
    const categoryId = req.params.id;
    try {
      const result = await categoriesService.findById(categoryId);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  update: async (req, res) => {
    const validatedBody = validateCategory(req.body); // Validate input data
    if (validatedBody.error) {
      return res
        .status(400)
        .json({ message: validatedBody.error.details[0].message }); // Proper error handling
    }

    const categoryId = req.params.id; // Extract category ID from the request parameters
    try {
      const result = await categoriesService.updateById(
        categoryId,
        validatedBody.value
      ); // Pass validated data
      if (result) {
        res.status(200).json(result); // Return updated category
      } else {
        res.status(404).json({ message: "Category not found" }); // Handle category not found
      }
    } catch (error) {
      console.error("Error updating category:", error); // Log the error for debugging
      res.status(500).json({ message: "Server error", error }); // Return server error
    }
  },

  delete: async (req, res) => {
    const categoryId = req.params.id;
    try {
      const result = await categoriesService.deleteById(categoryId);
      if (result) {
        res.status(200).json({ message: "Category deleted successfully" });
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};

module.exports = categoriesController;

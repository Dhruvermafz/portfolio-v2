const categoriesService = require("../services/categoriesService");
const jwt = require("../middlewares/jwt");
const validateCategory = require("../middlewares/validateCategory");

const categoriesController = {
  create: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res
        .status(validatedToken.error.code)
        .json(validatedToken.error.message);
    }
    const validatedBody = validateCategory(req.body);
    if (validatedBody.error) {
      return res
        .status(validatedBody.error.code)
        .json(validatedBody.error.message);
    }
    const result = await categoriesService.create(validatedBody);
    res.status(201).json(result);
  },

  findAll: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res
        .status(validatedToken.error.code)
        .json(validatedToken.error.message);
    }
    const result = await categoriesService.findAll();
    res.status(200).json(result);
  },

  findCategory: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res
        .status(validatedToken.error.code)
        .json(validatedToken.error.message);
    }
    const categoryId = req.params.id;
    const result = await categoriesService.findById(categoryId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  },

  update: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res
        .status(validatedToken.error.code)
        .json(validatedToken.error.message);
    }
    const validatedBody = validateCategory(req.body);
    if (validatedBody.error) {
      return res
        .status(validatedBody.error.code)
        .json(validatedBody.error.message);
    }
    const categoryId = req.params.id;
    const result = await categoriesService.update(categoryId, validatedBody);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  },

  delete: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res
        .status(validatedToken.error.code)
        .json(validatedToken.error.message);
    }
    const categoryId = req.params.id;
    const result = await categoriesService.delete(categoryId);
    if (result) {
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  },
};

module.exports = categoriesController;

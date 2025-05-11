const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const route = Router();

route.get("/", categoriesController.findAll);
route.post("/", categoriesController.create);
route.get("/:id", categoriesController.findCategory); // Basic category info
route.get("/:id/items", categoriesController.findByIdWithItems); // Category with items
route.put("/:id", categoriesController.update);
route.delete("/:id", categoriesController.delete);

module.exports = route;

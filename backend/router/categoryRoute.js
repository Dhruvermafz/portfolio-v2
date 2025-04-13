const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const route = Router();

route.get("/", categoriesController.findAll);
route.post("/", categoriesController.create);
route.get("/:id", categoriesController.findCategory);
route.delete("/:id", categoriesController.delete);
route.put("/:id", categoriesController.update);
route.get("/:id", categoriesController.findByIdWithItems);
module.exports = route;

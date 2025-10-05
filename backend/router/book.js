const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController"); // Adjust path as needed

// Middleware to verify JWT token (assuming you have a similar setup for userApi)

// Book routes
router.post("/", bookController.createBook);
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.get("/filter", bookController.filterBooks);
module.exports = router;

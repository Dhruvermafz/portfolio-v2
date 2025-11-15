// routes/books.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, bookController.createBook);
router.get("/", bookController.getBooks); // Public or adjust as needed
router.get("/filter", bookController.filterBooks); // Public
router.get("/series", bookController.getAllSeries); // Public
router.get("/series/details", bookController.getSeries); // Public
router.get("/authors/details", bookController.getAuthors); // New endpoint
router.get("/authors/:slug", bookController.getAuthors); // New endpoint for slug
router.get("/:id", bookController.getBookById);
router.put("/:id", authenticateUser, bookController.updateBook);
router.delete("/:id", authenticateUser, bookController.deleteBook);

module.exports = router;

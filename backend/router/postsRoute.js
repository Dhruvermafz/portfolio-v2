const express = require("express");
const {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
  deleteBlog,
  createBlogWithMD,
} = require("../controllers/postsController");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Apply authentication and authorization only for these routes
router.post("/", authenticateUser, authorizeAdmin, createBlog);
router.put("/:id", authenticateUser, authorizeAdmin, updateBlog);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteBlog);
router.post("/markdown", authenticateUser, authorizeAdmin, createBlogWithMD);

// Fetch routes (no authentication required)
router.get("/:id", getSingleBlog);
router.get("/", getAllBlogs);
router.get("/featured", getFeaturedBlogs);

module.exports = router;

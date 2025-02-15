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

const blogRouter = express.Router();

// Apply authentication and authorization only for these routes
blogRouter.post("/", authenticateUser, authorizeAdmin, createBlog);
blogRouter.put("/:id", authenticateUser, authorizeAdmin, updateBlog);
blogRouter.delete("/:id", authenticateUser, authorizeAdmin, deleteBlog);
blogRouter.post(
  "/markdown",
  authenticateUser,
  authorizeAdmin,
  createBlogWithMD
);

// Fetch routes (no authentication required)
blogRouter.get("/:id", getSingleBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/featured", getFeaturedBlogs);

module.exports = blogRouter;

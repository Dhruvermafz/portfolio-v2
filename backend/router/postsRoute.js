const express = require("express");
const {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
  deleteBlog,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.get("/:id", getSingleBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/featured", getFeaturedBlogs);
blogRouter.delete("/:id", deleteBlog);

module.exports = blogRouter;

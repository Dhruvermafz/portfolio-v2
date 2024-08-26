const express = require("express");
const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    excerpt,
    tags,
    categories,
    featured,

    metaTitle,
    metaDescription,
    published,
    paragraphs,
    metaFields,
  } = req.body;

  try {
    let bannerImageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      bannerImageUrl = result.secure_url;
    }

    const paragraphImages = [];
    if (req.files.paragraphImages) {
      for (const file of req.files.paragraphImages) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "blogs",
        });
        paragraphImages.push(result.secure_url);
      }
    }

    const newBlog = await Blog.create({
      title,
      content,
      excerpt,
      tags,
      categories,
      featured,

      metaTitle,
      metaDescription,
      published,
      bannerImage: bannerImageUrl,
      paragraphs: paragraphs.map((para, index) => ({
        ...para,
        image: paragraphImages[index] || "",
      })),
      metaFields,
    });

    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.status(201).json(newBlog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

// Update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    excerpt,
    tags,
    categories,
    featured,

    metaTitle,
    metaDescription,
    published,
    paragraphs,
    metaFields,
  } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        excerpt,
        tags,
        categories,
        featured,

        metaTitle,
        metaDescription,
        published,
        paragraphs,
        metaFields,
      },
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update blog", error: error.message });
  }
});

// Get a single blog by ID
const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});

// Get all blogs with pagination
const getAllBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const blogs = await Blog.paginate({}, { page, limit });
  res.status(200).json(blogs);
});

// Get all featured blogs
const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const featuredBlogs = await Blog.find({ featured: true });
  if (featuredBlogs.length > 0) {
    res.status(200).json(featuredBlogs);
  } else {
    res.status(404).json({ message: "No featured blogs found" });
  }
});
// Delete an existing blog
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Remove the blog from the database
    await blog.remove();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete blog", error: error.message });
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
  deleteBlog,
};

const express = require("express");
const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/blogPost");
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
  const { title, content, userId, categories } = req.body;

  try {
    let images = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push({ url: result.secure_url, public_id: result.public_id });
        fs.unlinkSync(file.path); // Remove local file after upload
      }
    }

    const newBlog = await BlogPost.create({
      title,
      content,
      userId,
      categories,
      images,
      published: new Date(), // Set published date to now
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

// Update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, userId, categories } = req.body;

  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    let updatedImages = blog.images;
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
        fs.unlinkSync(file.path);
      }
    }

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        userId,
        categories,
        images: updatedImages,
        updated: new Date(),
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
  const blog = await BlogPost.findById(req.params.id).populate(
    "categories userId"
  );
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});

// Get all blogs with pagination
const getAllBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const blogs = await BlogPost.paginate({}, { page, limit });
  res.status(200).json(blogs);
});

// Get all featured blogs
const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const featuredBlogs = await BlogPost.find({ featured: true });
  if (featuredBlogs.length > 0) {
    res.status(200).json(featuredBlogs);
  } else {
    res.status(404).json({ message: "No featured blogs found" });
  }
});

// Delete an existing blog
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Remove images from Cloudinary
    for (const image of blog.images) {
      await cloudinary.uploader.destroy(image.public_id);
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

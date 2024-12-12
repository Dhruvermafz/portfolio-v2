const express = require("express");
const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/blogPost");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

// Firebase configuration
const serviceAccount = require("../database/firebase-service-account.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const bucket = firebaseAdmin.storage().bucket();

const upload = multer({ dest: "uploads/" });

// Function to upload image to Firebase
const uploadToFirebase = async (filePath, filename) => {
  const uniqueFileName = `${uuidv4()}_${filename}`;
  const uploadTask = bucket.upload(filePath, {
    destination: `blog_${blog._id}blog_images/${uniqueFileName}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });
  await uploadTask;
  const file = bucket.file(`blog${blog._id}blog_images/${uniqueFileName}`);
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2030", // Set expiration date far into the future
  });
  return url;
};

// Create a blog with Markdown
const createBlogWithMD = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Markdown file is required." });
  }

  const markdownFilePath = req.file.path;

  try {
    const fileContent = fs.readFileSync(markdownFilePath, "utf8");
    const { content, data } = matter(fileContent);

    const { title, tags } = data;
    if (!title) {
      return res.status(400).json({
        message: "Markdown file must include a title in the frontmatter.",
      });
    }

    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images = [];
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      images.push(match[1]);
    }

    const uploadedImages = [];
    for (const imagePath of images) {
      const absolutePath = path.resolve(
        path.dirname(markdownFilePath),
        imagePath
      );
      const fileName = path.basename(imagePath);
      const firebaseUrl = await uploadToFirebase(absolutePath, fileName);
      uploadedImages.push({ url: firebaseUrl });
      fs.unlinkSync(absolutePath);
    }

    const newBlog = await BlogPost.create({
      title,
      content,
      userId: req.user.id, // Use authenticated user's ID
      categories: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      images: uploadedImages,
      published: new Date(),
    });

    fs.unlinkSync(markdownFilePath);

    res
      .status(201)
      .json({ message: "Blog created successfully.", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog with Markdown:", error.message);
    if (fs.existsSync(markdownFilePath)) {
      fs.unlinkSync(markdownFilePath);
    }
    res.status(500).json({
      message: "Failed to create blog with Markdown.",
      error: error.message,
    });
  }
});

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, categories } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  if (!content) {
    return res.status(400).json({ message: " content are required." });
  }
  if (!title) {
    return res.status(400).json({ message: "Title  are required." });
  }
  try {
    let images = [];

    // Process uploaded files if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push({ url: result.secure_url, public_id: result.public_id });
        fs.unlinkSync(file.path); // Cleanup local file
      }
    }

    // Create a new blog post
    const newBlog = await BlogPost.create({
      title,
      content,
      userId: req.user.id, // Use authenticated user's ID
      categories: categories ? JSON.parse(categories) : [],
      images,
      published: new Date(),
    });

    res
      .status(201)
      .json({ message: "Blog created successfully.", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({
      message: "Failed to create blog.",
      error: error.message,
    });
  }
});

// Update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, categories } = req.body;

  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check ownership
    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action." });
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
  createBlogWithMD,
};

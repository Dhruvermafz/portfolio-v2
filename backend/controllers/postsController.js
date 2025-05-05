const express = require("express");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv"); // Add this line
const BlogPost = require("../models/blogPost");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
dotenv.config(); // Load env vars from .env file
// Firebase configuration
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const bucket = firebaseAdmin.storage().bucket();

const upload = multer({ dest: "uploads/" });

// Function to upload image to Firebase

// Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, categories } = req.body;

  // Validate title and content (check if they are provided and are strings)
  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Title is required." });
  }
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Content is required." });
  }

  try {
    let uploadedImages = [];

    // Process uploaded image files (if any)
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          // Upload to Firebase
          const firebaseUrl = await uploadToFirebase(
            file.path,
            file.originalname,
            uuidv4()
          );
          uploadedImages.push({ url: firebaseUrl });

          // Remove the file from local storage after uploading
          fs.unlinkSync(file.path);
        } catch (err) {
          console.error("Error uploading image to Firebase:", err.message);
          return res.status(500).json({
            message: "Failed to upload images to Firebase.",
            error: err.message,
          });
        }
      }
    }

    // Create a new blog post in the database
    const newBlog = await BlogPost.create({
      title,
      content,
      userId: req.user.id, // Use authenticated user's ID
      categories: categories ? JSON.parse(categories) : [],
      images: uploadedImages,
      published: new Date(),
    });

    res.status(201).json({
      message: "Blog created successfully.",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({
      message: "Failed to create blog.",
      error: error.message,
    });
  }
});

// Update an existing blog

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

// Function to upload image to Firebase
const uploadToFirebase = async (filePath, filename, blogId) => {
  const uniqueFileName = `blog_${blogId}/blog_images/${uuidv4()}_${filename}`;
  await bucket.upload(filePath, {
    destination: uniqueFileName,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });

  // Generate signed URL for the uploaded file
  const file = bucket.file(uniqueFileName);
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-01-2030", // Expiration date
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

    // Extract image paths from Markdown
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
      const firebaseUrl = await uploadToFirebase(
        absolutePath,
        fileName,
        uuidv4()
      ); // Generate a new blogId for images
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

// Update a blog
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

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const firebaseUrl = await uploadToFirebase(
          file.path,
          file.originalname,
          blog._id
        );
        updatedImages.push({ url: firebaseUrl });
        fs.unlinkSync(file.path); // Cleanup local file
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

module.exports = {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
  deleteBlog,
  createBlogWithMD,
};

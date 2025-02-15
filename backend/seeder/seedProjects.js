const mongoose = require("mongoose");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const Project = require("../models/project"); // Import Project Model
require("dotenv").config();

// Load Firebase credentials
const firebaseConfig = require("../data/firebase-service-account.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: "live-auctions-f725f.appspot.com",
});

const bucket = admin.storage().bucket();

// Load project data
const projectData = require("../data/projectData.json").projects;

// Define correct path for images
const IMAGES_DIR = path.join(__dirname, "../images/projects");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected..."))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Function to check if an image already exists in Firebase Storage
const checkIfImageExists = async (fileName) => {
  const destination = `projects/${fileName}`;
  try {
    const [files] = await bucket.getFiles({ prefix: destination });
    return files.length > 0; // True if file exists, false otherwise
  } catch (error) {
    console.error(`❌ Error checking image existence:`, error);
    return false;
  }
};

// Upload file to Firebase Storage
const uploadToFirebase = async (fileName) => {
  const filePath = path.join(IMAGES_DIR, fileName);
  const destination = `projects/${fileName}`;

  // Check if file exists locally before uploading
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Skipping upload: ${filePath} does not exist.`);
    return null;
  }

  // Check if image already exists in Firebase Storage
  const exists = await checkIfImageExists(fileName);
  if (exists) {
    console.log(`✅ Image already exists: ${destination}`);
    return `https://storage.googleapis.com/${bucket.name}/${destination}`;
  }

  try {
    const file = await bucket.upload(filePath, { destination });
    const publicUrl = await file[0].getSignedUrl({
      action: "read",
      expires: "01-01-2030",
    });

    console.log(`✅ Uploaded: ${filePath} -> ${publicUrl[0]}`);
    return publicUrl[0];
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error);
    return null;
  }
};

// Seed projects into MongoDB
const seedProjects = async () => {
  for (const project of projectData) {
    console.log(`🚀 Processing project: ${project.title}`);

    // Check for existing project by ID
    const existingProject = await Project.findOne({ id: project.id });
    if (existingProject) {
      console.log(
        `⚠️ Project with ID "${project.id}" already exists. Skipping...`
      );
      continue;
    }

    // Upload main image
    const mainImageUrl = await uploadToFirebase(project.mainImage);

    // Upload additional images
    const imageUrls = await Promise.all(
      project.images.map((image) => uploadToFirebase(image))
    );

    // Create a new project document
    const newProject = new Project({
      id: project.id,
      title: project.title,
      slug: slugify(project.title, { lower: true, strict: true }),
      client: project.client,
      services: project.services,
      website: project.website,
      ghLink: project.ghLink,
      overview: project.overview,
      mainImage: mainImageUrl || "", // Ensure it's not null
      images: imageUrls.filter(Boolean), // Remove null values if any upload fails
      challenges: project.challenges,
      results: project.results,
      tags: project.tags,
    });

    // Save to MongoDB
    try {
      await newProject.save();
      console.log(`✅ Saved project: ${project.title}`);
    } catch (err) {
      console.error(`❌ Error saving ${project.title}:`, err);
    }
  }

  // Close DB connection
  mongoose.connection.close();
  console.log("📌 Database connection closed.");
};

// Run the seeding process
seedProjects();

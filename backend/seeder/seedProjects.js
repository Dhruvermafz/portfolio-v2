const mongoose = require("mongoose");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const Project = require("../models/project");
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
    return files.length > 0;
  } catch (error) {
    console.error(`❌ Error checking image existence: ${fileName}`, error);
    return false;
  }
};

// Upload file to Firebase Storage
const uploadToFirebase = async (fileName) => {
  const filePath = path.join(IMAGES_DIR, fileName);
  const destination = `projects/${fileName}`;

  // Check if file exists locally
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Local image not found: ${filePath}`);
    return null;
  }

  // Check if image already exists in Firebase Storage
  const exists = await checkIfImageExists(fileName);
  if (exists) {
    console.log(`✅ Image already exists in Firebase: ${destination}`);
    try {
      const [signedUrl] = await bucket.file(destination).getSignedUrl({
        action: "read",
        expires: "01-01-2030",
      });
      return signedUrl;
    } catch (error) {
      console.error(
        `❌ Error generating signed URL for existing image: ${fileName}`,
        error
      );
      return null;
    }
  }

  // Upload new image
  try {
    const file = await bucket.upload(filePath, { destination });
    const [signedUrl] = await file[0].getSignedUrl({
      action: "read",
      expires: "01-01-2030",
    });
    console.log(`✅ Uploaded: ${filePath} -> ${signedUrl}`);
    return signedUrl;
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error);
    return null;
  }
};

// Validate project images
const validateProjectImages = (project) => {
  const mainImageExists = fs.existsSync(
    path.join(IMAGES_DIR, project.mainImage)
  );
  const allImagesExist = project.images.every((image) =>
    fs.existsSync(path.join(IMAGES_DIR, image))
  );
  return {
    isValid: mainImageExists && allImagesExist,
    missingImages: [
      !mainImageExists ? project.mainImage : null,
      ...project.images.filter(
        (image) => !fs.existsSync(path.join(IMAGES_DIR, image))
      ),
    ].filter(Boolean),
  };
};

// Seed projects into MongoDB
const seedProjects = async () => {
  for (const project of projectData) {
    console.log(`🚀 Processing project: ${project.title}`);

    // Validate images
    const { isValid, missingImages } = validateProjectImages(project);
    if (!isValid) {
      console.error(
        `❌ Skipping project "${
          project.title
        }" due to missing images: ${missingImages.join(", ")}`
      );
      continue;
    }

    const slug = slugify(project.title, { lower: true, strict: true });

    // Find project by slug
    const existingProject = await Project.findOne({ slug });

    // Upload images
    const mainImageUrl = await uploadToFirebase(project.mainImage);
    const imageUrls = await Promise.all(
      project.images.map((image) => uploadToFirebase(image))
    );

    // Check if all images were uploaded successfully
    if (!mainImageUrl || imageUrls.includes(null)) {
      console.error(
        `❌ Skipping project "${project.title}" due to failed image uploads`
      );
      continue;
    }

    if (existingProject) {
      // Project with this slug exists
      if (existingProject.id === project.id) {
        // Same project, check if images need updating
        console.log(
          `⚠️ Project with slug "${slug}" and id "${project.id}" already exists. Checking images...`
        );

        // Update only if images are unsigned or invalid
        const needsUpdate =
          !existingProject.mainImage.includes("Signature=") ||
          existingProject.images.some((img) => !img.includes("Signature="));

        if (!needsUpdate) {
          console.log(
            `✅ Images are valid for "${project.title}". Skipping update.`
          );
          continue;
        }

        // Update project with new image URLs
        existingProject.id = project.id;
        existingProject.title = project.title;
        existingProject.client = project.client;
        existingProject.services = project.services;
        existingProject.website = project.website;
        existingProject.ghLink = project.ghLink;
        existingProject.overview = project.overview;
        existingProject.mainImage = mainImageUrl;
        existingProject.images = imageUrls.filter(Boolean);
        existingProject.challenges = project.challenges;
        existingProject.results = project.results;
        existingProject.tags = project.tags;

        try {
          await existingProject.save();
          console.log(
            `✅ Updated project: ${project.title} with new image URLs`
          );
        } catch (err) {
          console.error(`❌ Error updating ${project.title}:`, err);
        }
        continue;
      } else {
        // Different project with same slug, update it
        console.log(
          `⚠️ Project with slug "${slug}" exists but has different id "${existingProject.id}". Updating document...`
        );

        existingProject.id = project.id;
        existingProject.title = project.title;
        existingProject.client = project.client;
        existingProject.services = project.services;
        existingProject.website = project.website;
        existingProject.ghLink = project.ghLink;
        existingProject.overview = project.overview;
        existingProject.mainImage = mainImageUrl;
        existingProject.images = imageUrls.filter(Boolean);
        existingProject.challenges = project.challenges;
        existingProject.results = project.results;
        existingProject.tags = project.tags;

        try {
          await existingProject.save();
          console.log(`✅ Updated project: ${project.title}`);
        } catch (err) {
          console.error(`❌ Error updating ${project.title}:`, err);
        }
        continue;
      }
    }

    // Create new project
    const newProject = new Project({
      id: project.id,
      title: project.title,
      slug,
      client: project.client,
      services: project.services,
      website: project.website,
      ghLink: project.ghLink,
      overview: project.overview,
      mainImage: mainImageUrl,
      images: imageUrls.filter(Boolean),
      challenges: project.challenges,
      results: project.results,
      tags: project.tags,
    });

    // Save to MongoDB
    try {
      await newProject.save();
      console.log(`✅ Saved new project: ${project.title}`);
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

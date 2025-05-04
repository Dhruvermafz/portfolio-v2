const mongoose = require("mongoose");
const Project = require("../models/project");
const admin = require("firebase-admin");
const dotenv = require("dotenv"); // Add this line
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
dotenv.config(); // Load env vars from .env file
// Load Firebase credentials
const firebaseConfig = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};
// Initialize Firebase only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    storageBucket: "live-auctions-f725f.appspot.com",
  });
}

const bucket = admin.storage().bucket();
const IMAGES_DIR = path.join(__dirname, "../images/projects");

// **Check if an image exists in Firebase Storage**
const checkIfImageExists = async (fileName) => {
  const destination = `projects/${fileName}`;
  try {
    const [files] = await bucket.getFiles({ prefix: destination });
    return files.length > 0; // Returns true if file exists
  } catch (error) {
    console.error(`❌ Error checking image existence:`, error);
    return false;
  }
};

// **Upload image to Firebase**
const uploadToFirebase = async (fileName) => {
  const filePath = path.join(IMAGES_DIR, fileName);
  const destination = `projects/${fileName}`;

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Skipping upload: ${filePath} does not exist.`);
    return null;
  }

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

// **Get all projects**
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// **Get a specific project by ID**
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// **Create a new project (with Firebase image upload)**
exports.createProject = async (req, res) => {
  try {
    const {
      id,
      title,
      client,
      services,
      website,
      ghLink,
      overview,
      mainImage,
      images,
      challenges,
      results,
      tags,
    } = req.body;

    // **Generate slug from title**
    const slug = slugify(title, { lower: true, strict: true });

    // **Check if project with the same slug exists**
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return res
        .status(400)
        .json({ message: "A project with this title already exists." });
    }

    // **Upload main image**
    const mainImageUrl = await uploadToFirebase(mainImage);

    // **Upload additional images**
    const imageUrls = await Promise.all(
      images.map((image) => uploadToFirebase(image))
    );

    // **Create new project**
    const newProject = new Project({
      id,
      title,
      slug,
      client,
      services,
      website,
      ghLink,
      overview,
      mainImage: mainImageUrl || "",
      images: imageUrls.filter(Boolean), // Remove null values
      challenges,
      results,
      tags,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(400).json({ message: "Error creating project", error });
  }
};

// **Update a project by ID**
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Error updating project", error });
  }
};

// **Delete a project by ID**
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};

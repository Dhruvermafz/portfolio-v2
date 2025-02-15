const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true }, // This is your original project ID
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true }, // New slug field (unique)
  client: { type: String, required: true },
  services: { type: String, required: true },
  website: { type: String, required: true },
  ghLink: { type: String, required: true },
  overview: { type: String, required: true },
  mainImage: { type: String, required: true }, // URL or image file reference
  images: [String], // Array of image URLs
  challenges: [challengeSchema],
  results: { type: String, required: true },
  tags: [String],
});

// **Auto-generate `slug` before saving**
projectSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, "-"); // Convert title to a slug
  }
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

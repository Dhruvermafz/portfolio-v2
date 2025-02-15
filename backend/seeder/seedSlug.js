const mongoose = require("mongoose");
const Project = require("../models/project"); // Adjust path as needed
require("dotenv").config();
const fixSlugs = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const projects = await Project.find({ slug: { $exists: false } }); // Find missing slugs

  for (let project of projects) {
    project.slug = project.title.toLowerCase().replace(/\s+/g, "-");
    await project.save();
    console.log(`✅ Updated slug for: ${project.title}`);
  }

  mongoose.connection.close();
  console.log("📌 Slug fixing completed.");
};

fixSlugs();

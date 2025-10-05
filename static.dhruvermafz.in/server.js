const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to fetch images
app.get("/api/images", async (req, res) => {
  try {
    const dirPath = path.join(
      __dirname,
      "public/assets/images/media-browser/projects"
    );
    const files = await fs.readdir(dirPath);
    // Filter for image files
    const images = files
      .filter((file) => /\.(png|jpg|jpeg|gif)$/i.test(file))
      .map((file) => ({
        name: file,
        path: `/assets/images/media-browser/projects/${file}`,
      }));
    res.json(images);
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

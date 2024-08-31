const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;

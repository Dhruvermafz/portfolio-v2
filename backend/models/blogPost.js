const mongoose = require("mongoose");

// Define the schema for BlogPost
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    content: {
      type: String,
      required: true, // Content is required
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // userId is required
    },
    published: {
      type: Date,
      default: Date.now, // Default to the current date
    },
    updated: {
      type: Date,
      default: Date.now, // Default to the current date
    },
  },
  {
    timestamps: false, // Disable automatic timestamps (if not needed)
  }
);

// Add a pre-save hook to update the `updated` field on every save
blogPostSchema.pre("save", function (next) {
  this.updated = Date.now(); // Update the `updated` field
  next();
});

// Create the BlogPost model using the schema
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;

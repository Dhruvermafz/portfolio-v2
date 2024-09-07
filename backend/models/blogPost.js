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
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to the Category model
        required: true, // At least one category is required
      },
    ],
    images: [
      {
        url: {
          type: String, // Cloudinary URL for the image
          required: true, // Image URL is required
        },
        public_id: {
          type: String, // Cloudinary public ID for the image
          required: true, // Public ID is required for managing the image on Cloudinary
        },
      },
    ],
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

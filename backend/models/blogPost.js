const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Define the schema for BlogPost
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    published: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Add a pre-save hook to update the `updated` field on every save
blogPostSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

// Apply the pagination plugin
blogPostSchema.plugin(mongoosePaginate);

// Create the BlogPost model using the schema
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;

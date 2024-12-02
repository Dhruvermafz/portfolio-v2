import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateBlog.css";
import useAuth from "../../../context/auth";
import { API_URL } from "../../../config";
import upload from "../../../assets/img/upload.png";

const CreateBlog = () => {
  const user = useAuth();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [useMarkdown, setUseMarkdown] = useState(false); // Toggle for Markdown
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedCategories(selectedValues);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleMarkdownUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text(); // Read file content as text
        setMarkdownContent(text);
        setUseMarkdown(true); // Switch to Markdown mode
      } catch (err) {
        setError("Failed to read the Markdown file. Please try again.");
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setBlogTitle("");
    setBlogContent("");
    setMarkdownContent("");
    setSelectedCategories([]);
    setThumbnail(null);
    setThumbnailPreview(null);
    setUseMarkdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Unauthorized: Please log in to create a blog.");
      return;
    }

    if (!blogTitle || !selectedCategories.length || !thumbnail) {
      setError("All fields are required.");
      return;
    }

    const content = useMarkdown ? markdownContent : blogContent;
    if (!content) {
      setError("Blog content is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("userId", user.id);

    try {
      const response = await axios.post(`${API_URL}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setSuccess("Blog created successfully!");
      resetForm();
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the blog. Please try again."
      );
      console.error(err);
    }
  };

  return (
    <div className="col-lg-10" style={{ display: "contents" }}>
      <div className="card content-box-card" style={{ display: "contents" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="create-blog-container">
            <div className="main-content card">
              <h6 className="card-title">Create New Blog</h6>
              <div className="form-group">
                <label htmlFor="blog-title" className="form-label">
                  Blog Title *
                </label>
                <input
                  type="text"
                  id="blog-title"
                  placeholder="Title"
                  className="form-input"
                  autoComplete="off"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Blog Category *</label>
                <select
                  className="form-select"
                  multiple
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  required
                >
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading categories...</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Blog Content *</label>
                {useMarkdown ? (
                  <textarea
                    className="form-textarea"
                    value={markdownContent}
                    readOnly
                  />
                ) : (
                  <textarea
                    className="form-textarea"
                    placeholder="Write your blog content here..."
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    required
                  />
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Or Upload Markdown File</label>
                <input
                  type="file"
                  accept=".md"
                  onChange={handleMarkdownUpload}
                />
              </div>
              <button
                type="button"
                onClick={() => setUseMarkdown(!useMarkdown)}
                className="toggle-btn"
              >
                {useMarkdown
                  ? "Switch to Manual Input"
                  : "Use Markdown Content"}
              </button>
            </div>

            <div className="thumbnail-section card">
              <h6 className="card-title">Add Blog Thumbnail</h6>
              <div className="thumbnail-upload">
                <label htmlFor="thumbnailsrc" className="file-container">
                  <input
                    type="file"
                    id="thumbnailsrc"
                    onChange={handleThumbnailChange}
                    hidden
                    className="file-input"
                  />
                  <span className="upload-icon">
                    <img
                      src={upload}
                      alt="icon"
                      className="upload-icon-image"
                    />
                    <span className="upload-text">Choose file</span>
                  </span>
                </label>
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="thumbnail-preview"
                  />
                )}
              </div>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

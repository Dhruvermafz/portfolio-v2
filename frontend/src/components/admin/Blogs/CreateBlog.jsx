import React, { useState } from "react";
import axios from "axios";
import "./CreateBlog.css";
import useAuth from "../../../context/auth";
import { API_URL } from "../../../config";
const CreateBlog = () => {
  const user = useAuth(); // Fetch user data from the token
  const [selectedCategories, setSelectedCategories] = useState(["technology"]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setThumbnail(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!thumbnail) {
      setError("Please upload a thumbnail.");
      return;
    }

    if (!user) {
      setError("Unauthorized: Please log in to create a blog.");
      return;
    }

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("categories", selectedCategories);
    formData.append("content", blogContent);
    formData.append("thumbnail", thumbnail);
    formData.append("userId", user.id); // Add the userId from token

    try {
      const response = await axios.post(`${API_URL}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add token to headers
        },
      });
      setSuccess("Blog created successfully!");
      console.log(response.data);
    } catch (err) {
      setError("An error occurred while creating the blog. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-blog-container">
      {/* Form Fields */}
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
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="finance">Finance</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="news">News</option>
            <option value="culture">Culture</option>
            <option value="science">Science</option>
            <option value="real_estate">Real Estate</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Blog Content *</label>
          <textarea
            className="form-textarea"
            placeholder="Write your blog content here..."
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            required
          />
        </div>
      </div>
      {/* Thumbnail Section */}
      <div className="thumbnail-section card">
        <h6 className="card-title">Add Blog Thumbnail</h6>
        <div className="thumbnail-upload">
          <p className="thumbnail-info">Thumbnail (200x200)</p>
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
                src="assets/images/icons/upload-file.svg"
                alt="icon"
                className="upload-icon-image"
              />
              <span className="upload-text">Choose file</span>
            </span>
          </label>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;

import React, { useState } from "react";
import axios from "axios";
import "./CreateBlog.css"; // Assuming you have a separate CSS file for the styles

const CreateBlog = () => {
  const [selectedCategories, setSelectedCategories] = useState(["technology"]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // For handling the file upload
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle category selection change
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

  // Handle thumbnail upload
  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setSuccess(""); // Reset any previous success messages

    if (!thumbnail) {
      setError("Please upload a thumbnail.");
      return;
    }

    // Create form data to send in the API request
    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("categories", selectedCategories);
    formData.append("content", blogContent);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await axios.post(
        "http://localhost:4000/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle success response
      setSuccess("Blog created successfully!");
      console.log(response.data);
    } catch (err) {
      // Handle error response
      setError("An error occurred while creating the blog. Please try again.");
      console.error(err);
    }
  };

  return (
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

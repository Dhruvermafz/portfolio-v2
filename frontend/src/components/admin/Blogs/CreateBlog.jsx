import React, { useState } from "react";
import "./CreateBlog.css"; // Assuming you have a separate CSS file for the styles

const CreateBlog = () => {
  const [selectedCategories, setSelectedCategories] = useState(["technology"]);

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

  return (
    <div className="create-blog-container">
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
        <button type="submit" className="submit-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;

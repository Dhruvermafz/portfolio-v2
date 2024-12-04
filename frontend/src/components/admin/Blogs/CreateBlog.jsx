import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, Button, Card, Alert, Image, Spinner } from "react-bootstrap";
import useAuth from "../../../context/auth";
import { API_URL } from "../../../config";
import upload from "../../../assets/img/upload.png";
import "./CreateBlog.css";
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

  const resetForm = () => {
    setBlogTitle("");
    setBlogContent("");
    setMarkdownContent("");
    setSelectedCategories([]);
    setThumbnail(null);
    setThumbnailPreview(null);
    setUseMarkdown(false);
  };

  return (
    <div className="col-lg-10">
      <Card className="content-box-card">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="create-blog-container">
            <Card className="main-content">
              <Card.Header>Create New Blog</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Blog Title *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blog Category *</Form.Label>
                  <Form.Select
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
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Blog Content *</Form.Label>
                  {useMarkdown ? (
                    <ReactQuill theme="snow" value={markdownContent} readOnly />
                  ) : (
                    <ReactQuill
                      theme="snow"
                      value={blogContent}
                      onChange={setBlogContent}
                    />
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => setUseMarkdown(!useMarkdown)}
                >
                  {useMarkdown
                    ? "Switch to Rich Text Editor"
                    : "Switch to Markdown"}
                </Button>
              </Card.Body>
            </Card>

            <Card className="thumbnail-section mt-4">
              <Card.Header>Add Blog Thumbnail</Card.Header>
              <Card.Body>
                <Form.Group className="thumbnail-upload">
                  <Form.Label className="file-container">
                    <Form.Control
                      type="file"
                      onChange={handleThumbnailChange}
                      hidden
                    />
                    <span className="upload-icon">
                      <Image
                        src={upload}
                        alt="icon"
                        className="upload-icon-image"
                      />
                      <span className="upload-text">Choose file</span>
                    </span>
                  </Form.Label>
                  {thumbnailPreview && (
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="thumbnail-preview mt-3"
                      fluid
                    />
                  )}
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateBlog;

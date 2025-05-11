import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Button,
  Card,
  Alert,
  Image,
  Spinner,
  Container,
} from "react-bootstrap";
import { useGetAllCategoriesQuery } from "../../../api/categoryApi";
import { useCreateBlogMutation } from "../../../api/blogApi";
import useAuth from "../../../context/auth";
import upload from "../../../assets/img/upload.png";
import "./CreateBlog.css";

const CreateBlog = () => {
  const user = useAuth();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [useMarkdown, setUseMarkdown] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories using the API slice
  const {
    data: categories,
    isLoading: loadingCategoriesData,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  // Mutation for creating a blog
  const [createBlog, { isLoading: creatingBlog }] = useCreateBlogMutation();

  // Update the loading state based on API response
  useEffect(() => {
    if (categoriesError) {
      setError("Failed to load categories. Please try again later.");
    }
  }, [categoriesError]);

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
    setSubmitting(true);

    if (!user) {
      setError("Unauthorized: Please log in to create a blog.");
      setSubmitting(false);
      return;
    }

    const content = useMarkdown ? markdownContent : blogContent;
    const trimmedTitle = blogTitle.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setError("Title and content are required.");
      setSubmitting(false);
      return;
    }

    if (!selectedCategories.length || !thumbnail) {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("content", content);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("thumbnail", thumbnail);
    formData.append("userId", user.userId || "");

    try {
      await createBlog(formData).unwrap();
      setSuccess("Blog created successfully!");
      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the blog."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
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
    <section className="create-blog-section py-5">
      <Container>
        <div className="json-header mb-4">
          <h1 className="json-title">Create New Blog</h1>
          <div className="json-actions">
            <Button
              variant="secondary"
              className="me-2"
              onClick={resetForm}
              disabled={submitting}
            >
              Discard
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="blog-form"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Publishing...
                </>
              ) : (
                "Publish Blog"
              )}
            </Button>
          </div>
        </div>

        <Form id="blog-form" onSubmit={handleSubmit}>
          <div className="json-object">
            <div className="json-brace">{"{"}</div>
            <div className="json-content">
              {/* Title */}
              <div className="json-field">
                <label className="json-key">"title":</label>
                <Form.Control
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="json-value"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* Categories */}
              <div className="json-field">
                <label className="json-key">"categories":</label>
                <div className="json-array">
                  <div className="json-brace">{"["}</div>
                  <div className="categories-container">
                    {selectedCategories.map((category, index) => (
                      <span key={index} className="category-tag">
                        {category}
                        <span
                          className="delete-icon"
                          onClick={() =>
                            setSelectedCategories(
                              selectedCategories.filter((_, i) => i !== index)
                            )
                          }
                        >
                          ×
                        </span>
                      </span>
                    ))}
                    <Form.Select
                      onChange={handleCategoryChange}
                      multiple
                      className="json-value"
                      disabled={loadingCategoriesData}
                    >
                      {loadingCategoriesData ? (
                        <option>Loading categories...</option>
                      ) : categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No categories available</option>
                      )}
                    </Form.Select>
                  </div>
                  <div className="json-brace">{"]"}</div>
                </div>
              </div>

              {/* Content */}
              <div className="json-field">
                <label className="json-key">"content":</label>
                <div className="content-container">
                  {useMarkdown ? (
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={markdownContent}
                      onChange={(e) => setMarkdownContent(e.target.value)}
                      className="json-value markdown-editor"
                      placeholder="Enter Markdown content"
                    />
                  ) : (
                    <ReactQuill
                      theme="snow"
                      value={blogContent}
                      onChange={setBlogContent}
                      className="json-value quill-editor"
                    />
                  )}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="toggle-editor-btn mt-2"
                    onClick={() => setUseMarkdown(!useMarkdown)}
                  >
                    {useMarkdown ? "Switch to Rich Text" : "Switch to Markdown"}
                  </Button>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="json-field">
                <label className="json-key">"thumbnail":</label>
                <div className="thumbnail-container">
                  <Form.Control
                    type="file"
                    onChange={handleThumbnailChange}
                    className="json-value file-input"
                    accept="image/*"
                  />
                  {thumbnailPreview && (
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="thumbnail-preview mt-3"
                      fluid
                    />
                  )}
                  {!thumbnailPreview && (
                    <div className="upload-placeholder">
                      <Image
                        src={upload}
                        alt="Upload"
                        className="upload-icon"
                      />
                      <span>Choose or drag an image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="json-brace">{"}"}</div>
          </div>

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mt-4">
              {success}
            </Alert>
          )}

          <Button
            type="submit"
            variant="success"
            className="w-100 mt-4 submit-btn"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Publishing...
              </>
            ) : (
              "Submit Blog"
            )}
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default CreateBlog;

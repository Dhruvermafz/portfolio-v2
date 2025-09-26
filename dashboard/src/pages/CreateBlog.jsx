import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Layout,
  Form,
  Input,
  Button,
  Alert,
  Image,
  Spin,
  Upload,
  Select,
  Tag,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGetAllCategoriesQuery } from "../api/categoryApi";
import { useCreateBlogMutation, useUpdateBlogMutation } from "../api/blogApi";
import { useAuth } from "../context/auth";
import "./CreateBlog.css";

// Loader component for categories
const CategoriesLoader = () => (
  <div className="loader-container">
    <Spin size="small" style={{ marginRight: 8 }} />
    <span>Loading categories...</span>
    <style jsx>{`
      .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        color: #555;
      }
    `}</style>
  </div>
);

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const CreateBlog = ({ blog, isEditMode = false }) => {
  const { user, token, isLoggedIn } = useAuth(); // Updated to use new AuthContext
  const [form] = Form.useForm();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [useMarkdown, setUseMarkdown] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories using the API slice
  const {
    data: categories,
    isLoading: loadingCategoriesData,
    error: categoriesError,
  } = useGetAllCategoriesQuery(undefined, {
    pollingInterval: 0,
    refetchOnMountOrArgChange: true,
  });

  // Mutations for creating and updating blogs
  const [createBlog, { isLoading: creatingBlog }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updatingBlog }] = useUpdateBlogMutation();

  // Pre-fill form data in edit mode
  useEffect(() => {
    if (isEditMode && blog) {
      form.setFieldsValue({
        title: blog.title || "",
        content: blog.content || "",
        categories: blog.categories || [],
      });
      setSelectedCategories(blog.categories || []);
      setThumbnailPreview(blog.thumbnail || null);
      setUseMarkdown(blog.isMarkdown || false);
    } else {
      form.resetFields();
      setSelectedCategories([]);
      setThumbnail(null);
      setThumbnailPreview(null);
      setUseMarkdown(false);
    }
  }, [isEditMode, blog, form]);

  // Handle category loading errors
  useEffect(() => {
    if (categoriesError) {
      setError("Failed to load categories. Please try again later.");
    }
  }, [categoriesError]);

  const handleThumbnailChange = ({ file }) => {
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values) => {
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (!isLoggedIn || !token) {
      setError("Unauthorized: Please log in to create or update a blog.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("categories", JSON.stringify(selectedCategories));
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    // Assuming userId is available in user object; if not, rely on token for auth
    formData.append("userId", user?.userId || "");
    if (isEditMode) {
      formData.append("blogId", blog._id || "");
    }

    try {
      if (isEditMode) {
        await updateBlog(formData).unwrap();
        setSuccess("Blog updated successfully!");
      } else {
        await createBlog(formData).unwrap();
        setSuccess("Blog created successfully!");
      }
      form.resetFields();
      setSelectedCategories([]);
      setThumbnail(null);
      setThumbnailPreview(null);
      setUseMarkdown(false);
    } catch (err) {
      setError(
        err.data?.message ||
          `An error occurred while ${
            isEditMode ? "updating" : "creating"
          } the blog.`
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-blog-section" style={{ padding: "40px 0" }}>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <div
            className="json-header"
            style={{
              marginBottom: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="json-title">
              {isEditMode ? "Update Blog" : "Create New Blog"}
            </h1>
            <div className="json-actions">
              <Button
                style={{ marginRight: 8 }}
                onClick={() => {
                  form.resetFields();
                  setSelectedCategories([]);
                  setThumbnail(null);
                  setThumbnailPreview(null);
                  setUseMarkdown(false);
                }}
                disabled={submitting}
              >
                Discard
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                form="blog-form"
                loading={submitting}
              >
                {isEditMode ? "Update Blog" : "Publish Blog"}
              </Button>
            </div>
          </div>

          <Form
            form={form}
            id="blog-form"
            onFinish={handleSubmit}
            layout="vertical"
            className="json-object"
          >
            <div className="json-brace">{"{"}</div>
            <div className="json-content">
              {/* Title */}
              <div className="json-field">
                <label className="json-key">"title":</label>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Title is required" }]}
                  noStyle
                >
                  <Input
                    placeholder="Enter blog title"
                    className="json-value"
                  />
                </Form.Item>
              </div>

              {/* Categories */}
              <div className="json-field">
                <label className="json-key">"categories":</label>
                <div className="json-array">
                  <div className="json-brace">{"["}</div>
                  <div className="categories-container">
                    {selectedCategories.map((category, index) => (
                      <Tag
                        key={index}
                        closable
                        onClose={() =>
                          setSelectedCategories(
                            selectedCategories.filter((_, i) => i !== index)
                          )
                        }
                        className="category-tag"
                      >
                        {category}
                      </Tag>
                    ))}
                    <Form.Item
                      name="categories"
                      rules={[
                        {
                          required: true,
                          message: "At least one category is required",
                        },
                      ]}
                      noStyle
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select categories"
                        onChange={setSelectedCategories}
                        disabled={loadingCategoriesData}
                        className="json-value"
                      >
                        {loadingCategoriesData ? (
                          <Option disabled>Loading categories...</Option>
                        ) : categories && categories.length > 0 ? (
                          categories.map((category) => (
                            <Option key={category._id} value={category.name}>
                              {category.name}
                            </Option>
                          ))
                        ) : (
                          <Option disabled>No categories available</Option>
                        )}
                      </Select>
                    </Form.Item>
                    {loadingCategoriesData && <CategoriesLoader />}
                  </div>
                  <div className="json-brace">{"]"}</div>
                </div>
              </div>

              {/* Content */}
              <div className="json-field">
                <label className="json-key">"content":</label>
                <div className="content-container">
                  <Form.Item
                    name="content"
                    rules={[{ required: true, message: "Content is required" }]}
                    noStyle
                  >
                    {useMarkdown ? (
                      <TextArea
                        rows={10}
                        placeholder="Enter Markdown content"
                        className="json-value markdown-editor"
                      />
                    ) : (
                      <ReactQuill
                        theme="snow"
                        onChange={(value) =>
                          form.setFieldsValue({ content: value })
                        }
                        value={form.getFieldValue("content") || ""}
                        className="json-value quill-editor"
                      />
                    )}
                  </Form.Item>
                  <Button
                    type="default"
                    size="small"
                    className="toggle-editor-btn"
                    onClick={() => setUseMarkdown(!useMarkdown)}
                    style={{ marginTop: 8 }}
                  >
                    {useMarkdown ? "Switch to Rich Text" : "Switch to Markdown"}
                  </Button>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="json-field">
                <label className="json-key">"thumbnail":</label>
                <div className="thumbnail-container">
                  <Form.Item
                    name="thumbnail"
                    rules={[
                      {
                        required: !isEditMode,
                        message: "Thumbnail is required",
                      },
                    ]}
                    noStyle
                  >
                    <Upload
                      accept="image/*"
                      beforeUpload={() => false} // Prevent auto-upload
                      onChange={handleThumbnailChange}
                      showUploadList={false}
                      className="json-value file-input"
                    >
                      <Button icon={<UploadOutlined />}>Choose Image</Button>
                    </Upload>
                  </Form.Item>
                  {thumbnailPreview && (
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="thumbnail-preview"
                      style={{ marginTop: 16, maxWidth: "100%" }}
                      preview={false}
                    />
                  )}
                  {!thumbnailPreview && (
                    <div className="upload-placeholder">
                      <UploadOutlined />
                      <span style={{ marginLeft: 8 }}>
                        Choose or drag an image
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="json-brace">{"}"}</div>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginTop: 24 }}
              />
            )}
            {success && (
              <Alert
                message={success}
                type="success"
                showIcon
                style={{ marginTop: 24 }}
              />
            )}

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={submitting}
              style={{ marginTop: 24 }}
            >
              {isEditMode ? "Update Blog" : "Submit Blog"}
            </Button>
          </Form>
        </Content>
      </Layout>
    </section>
  );
};

export default CreateBlog;

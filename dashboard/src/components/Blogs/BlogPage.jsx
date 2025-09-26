import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  Pagination,
  Spin,
  Modal,
} from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import AdminBlogCard from "./AdminBlogCard";
import "./blogs.css"; // Update this CSS to match AntD styling
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../../api/blogApi";

const { Content } = Layout;

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Redux Toolkit Query
  const { data, isLoading, isError } = useGetAllBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.docs || [];

  const handleEdit = (post) => {
    console.log("Edit post:", post._id);
    // Optional: navigate(`/admin/blogs/edit/${post._id}`);
  };

  const handleDelete = async (post) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this blog post?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteBlog(post._id).unwrap();
          Modal.success({
            content: "Blog post deleted successfully!",
          });
        } catch (err) {
          console.error("Error deleting post:", err);
          Modal.error({
            title: "Error",
            content: "Failed to delete blog post.",
          });
        }
      },
    });
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <section className="blog-page" style={{ padding: "40px 0" }}>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 40 }}>
            <Col xs={24} md={12}>
              <h1 className="blog-page-title">Blog Management</h1>
              <p className="blog-page-subtitle">
                Create, edit, and manage your blog posts
              </p>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 16,
              }}
            >
              <Form layout="inline" className="blog-search-form">
                <Form.Item>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search blogs by title..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="blog-search-input"
                    allowClear
                    style={{ width: 300 }}
                  />
                </Form.Item>
              </Form>
              <Link to="/admin/blogs/create">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="add-blog-btn"
                >
                  Add Blog
                </Button>
              </Link>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {isLoading ? (
              <Col span={24} style={{ textAlign: "center", padding: "40px 0" }}>
                <Spin size="large" />
                <p style={{ marginTop: 16, color: "#999" }}>Loading blogs...</p>
              </Col>
            ) : isError ? (
              <Col span={24} style={{ textAlign: "center", color: "#ff4d4f" }}>
                Error loading blogs
              </Col>
            ) : paginatedBlogs.length === 0 ? (
              <Col span={24}>
                <div
                  className="no-blogs-card"
                  style={{ textAlign: "center", padding: "24px" }}
                >
                  <p style={{ margin: 0, color: "#999" }}>
                    {searchQuery
                      ? "No blogs match your search."
                      : "No blogs found. Create a new blog to get started!"}
                  </p>
                </div>
              </Col>
            ) : (
              paginatedBlogs.map((blog) => (
                <AdminBlogCard
                  key={blog._id}
                  post={blog}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </Row>

          {totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={filteredBlogs.length}
              pageSize={blogsPerPage}
              onChange={(page) => setCurrentPage(page)}
              style={{ textAlign: "center", marginTop: 40 }}
              showSizeChanger={false}
            />
          )}
        </Content>
      </Layout>
    </section>
  );
};

export default BlogPage;

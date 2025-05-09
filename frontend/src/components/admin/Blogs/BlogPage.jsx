import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import AdminBlogCard from "./AdminBlogCard";
import { API_URL } from "../../../config";
import "./blogs.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/post`);
        setBlogs(res.data.docs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        alert("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (post) => {
    // Placeholder for edit modal or navigation
    console.log("Edit post:", post._id);
    // Example: navigate(`/admin/blogs/edit/${post._id}`);
  };

  const handleDelete = async (post) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(`${API_URL}/post/${post._id}`);
        setBlogs(blogs.filter((b) => b._id !== post._id));
        alert("Blog post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete blog post.");
      }
    }
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
    <section className="blog-page py-5">
      <Container>
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <h1 className="blog-page-title">Blog Management</h1>
            <p className="blog-page-subtitle">
              Create, edit, and manage your blog posts
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-end align-items-center gap-3"
          >
            <Form className="blog-search-form">
              <Form.Group className="position-relative">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search blogs by title..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="blog-search-input"
                />
              </Form.Group>
            </Form>
            <Link to="/admin/blogs/create">
              <Button variant="success" className="add-blog-btn">
                <FaPlus className="me-2" /> Add Blog
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          {loading ? (
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading blogs...</p>
            </Col>
          ) : paginatedBlogs.length === 0 ? (
            <Col>
              <div className="no-blogs-card text-center py-4">
                <p className="mb-0 text-muted">
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
          <Pagination className="custom-pagination justify-content-center mt-5">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </Container>
    </section>
  );
};

export default BlogPage;

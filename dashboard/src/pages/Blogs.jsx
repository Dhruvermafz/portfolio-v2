import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../api/blogApi";
import AdminBlogCard from "../components/Blogs/AdminBlogCard";
import PageTitle from "../components/Common/PageTitle";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const blogsPerPage = 6;

  const { data, isLoading, isError } = useGetAllBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const blogs = data?.docs || [];

  const handleDelete = async (post) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(post._id).unwrap();
        alert("Blog post deleted successfully!");
      } catch (err) {
        alert("Failed to delete blog post.");
      }
    }
  };

  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      // Add other sorting logic (e.g., active, unanswered)
      return 0;
    });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <main className="adminuiux-content has-sidebar">
      <PageTitle />
      <Container className="mt-3">
        {/* Statistics Cards */}
        <Row className="gx-3 mb-4">
          <Col xs={6} lg={3}>
            <div className="card adminuiux-card shadow-sm">
              <div className="card-body">
                <h5>{blogs.length}</h5>
                <p className="small text-secondary">Total Blogs</p>
              </div>
            </div>
          </Col>
          {/* Add more cards as needed */}
        </Row>

        {/* Search and Actions */}
        <Row className="mb-4 align-items-center">
          <Col md={6}>
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
          </Col>
          <Col md={6} className="d-flex justify-content-end gap-3">
            <div className="btn-group">
              <input
                type="radio"
                name="sort"
                id="newest"
                className="btn-check"
                checked={sortBy === "newest"}
                onChange={() => setSortBy("newest")}
              />
              <label className="btn btn-outline-theme" htmlFor="newest">
                Newest
              </label>
              {/* Add more sorting options */}
            </div>
            <Link to="/admin/blogs/create">
              <Button variant="success">
                <FaPlus className="me-2" /> Add Blog
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col lg={9}>
            {isLoading ? (
              <Spinner animation="border" />
            ) : isError ? (
              <div className="text-danger">Error loading blogs</div>
            ) : paginatedBlogs.length === 0 ? (
              <div>No blogs found.</div>
            ) : (
              paginatedBlogs.map((blog) => (
                <AdminBlogCard
                  key={blog._id}
                  post={blog}
                  onEdit={() => console.log("Edit", blog._id)}
                  onDelete={handleDelete}
                />
              ))
            )}
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-5">
                <Pagination.Prev
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
          </Col>
          <Col lg={3}>
            <div className="card adminuiux-card shadow-sm">
              <div className="card-header">
                <h6>Trending Tags</h6>
              </div>
              <div className="card-body">
                <a
                  href="#"
                  className="badge badge-lg badge-light text-bg-theme-1 me-1 my-1"
                >
                  Blogging
                </a>
                {/* Add more tags */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Blogs;

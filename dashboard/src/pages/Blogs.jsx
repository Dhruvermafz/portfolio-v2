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
import DeleteModal from "../components/Achivements/DeleteModal"; // Reusing Achievements' DeleteModal

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const blogsPerPage = 6;

  const { data, isLoading, isError, refetch } = useGetAllBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const blogs = data?.docs || [];

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Added for consistency with Achievements
      await deleteBlog({
        id: selectedBlog._id,
        headers: { Authorization: `Bearer ${token}` },
      }).unwrap();
      setDeleteModalOpen(false);
      setSelectedBlog(null);
      alert("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post.");
    }
  };

  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="title-header d-sm-flex align-items-center justify-content-between mb-4">
                <h5 className="mb-0">Blogs</h5>
                <div className="right-options">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <Link to="/blogs/create">
                        <Button variant="success">
                          <FaPlus className="me-2" /> Add Blog
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

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
                      className="blog-search-input ps-5"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <div className="btn-group">
                    <input
                      type="radio"
                      name="sort"
                      id="newest"
                      className="btn-check"
                      checked={sortBy === "newest"}
                      onChange={() => setSortBy("newest")}
                    />
                    <label className="btn btn-outline-primary" htmlFor="newest">
                      Newest
                    </label>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={9}>
                  {isLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  ) : isError ? (
                    <div className="text-center">
                      <p className="text-danger">Error loading blogs</p>
                      <Button variant="link" onClick={refetch}>
                        Retry
                      </Button>
                    </div>
                  ) : paginatedBlogs.length === 0 ? (
                    <div className="text-center">No blogs found.</div>
                  ) : (
                    <Row>
                      {paginatedBlogs.map((blog) => (
                        <AdminBlogCard
                          key={blog._id}
                          post={blog}
                          onDelete={handleDeleteClick}
                        />
                      ))}
                    </Row>
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
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  )}
                </Col>
                <Col lg={3}>
                  <div className="card shadow-sm">
                    <div className="card-header">
                      <h6>Trending Tags</h6>
                    </div>
                    <div className="card-body">
                      {blogs
                        .flatMap((blog) => blog.tags || [])
                        .filter(
                          (tag, index, self) => self.indexOf(tag) === index
                        )
                        .slice(0, 5)
                        .map((tag) => (
                          <a
                            key={tag}
                            href="#"
                            className="badge badge-lg bg-light text-primary me-1 my-1"
                          >
                            {tag}
                          </a>
                        ))}
                      {blogs.every(
                        (blog) => !blog.tags || blog.tags.length === 0
                      ) && (
                        <p className="text-muted small">No tags available.</p>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedBlog?.title || "blog post"}
      />
    </Container>
  );
};

export default Blogs;

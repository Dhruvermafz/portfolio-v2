import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminBlogCard from "./AdminBlogCard";
import { API_URL } from "../../../config";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/post`);
        setBlogs(res.data.docs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h1 className="main-title">Blogs Manage</h1>
          <p>Manage the blogs.</p>
        </Col>
        <Col
          md={6}
          className="text-end d-flex justify-content-end align-items-center gap-2"
        >
          <Form.Control
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-50"
          />
          <Link to="/admin/blogs/create">
            <Button variant="success">+ Add Blog</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        {paginatedBlogs.map((blog) => (
          <AdminBlogCard key={blog._id} post={blog} />
        ))}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default BlogPage;

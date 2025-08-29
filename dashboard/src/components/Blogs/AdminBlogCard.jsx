import React from "react";
import { Card, Dropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaBookOpen } from "react-icons/fa";
import placeholder from "../../assets/img/blog/placeholder.png";
import { PORTFOLIO_URL } from "../../config";
import "./blogs.css";

const AdminBlogCard = ({ post, onEdit, onDelete }) => {
  if (!post) return null;

  const { _id, title, content, published } = post;

  const calculateReadingTime = (text) => {
    const words = text?.split(/\s+/).length || 0;
    return Math.ceil(words / 200);
  };

  const getExcerpt = (text) => {
    const words = text?.split(/\s+/).slice(0, 20).join(" ") || "";
    return words.length < text?.length ? `${words}...` : words;
  };

  const readingTime = calculateReadingTime(content);
  const formattedDate = new Date(published).toLocaleDateString();
  const isPublished = !!published; // Assuming published is a timestamp or null

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <Card className="blog-card shadow-sm h-100">
        <div className="blog-card-img-wrapper">
          <Card.Img
            variant="top"
            src={post.image || placeholder}
            alt={title}
            className="blog-card-img"
          />
          <Badge
            bg={isPublished ? "success" : "warning"}
            className="blog-status-badge"
          >
            {isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="blog-title">
            <Link
              to={`${PORTFOLIO_URL}blogs/${_id}`}
              className="blog-title-link"
            >
              {title}
            </Link>
          </Card.Title>
          <Card.Text className="blog-meta text-muted small">
            {readingTime} min read • {formattedDate}
          </Card.Text>
          <Card.Text className="blog-excerpt">{getExcerpt(content)}</Card.Text>
          <div className="mt-auto d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                size="sm"
                className="action-toggle"
              >
                <i className="bi bi-three-dots-vertical" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="action-menu">
                <Dropdown.Item
                  as={Link}
                  to={`/admin/blogs/${_id}/edit`}
                  className="action-item"
                  onClick={() => onEdit?.(post)}
                >
                  <FaEdit className="me-2" /> Edit
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  className="action-item text-danger"
                  onClick={() => onDelete?.(post)}
                >
                  <FaTrash className="me-2" /> Delete
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to={`${PORTFOLIO_URL}blogs/${_id}`}
                  className="action-item"
                >
                  <FaBookOpen className="me-2" /> Read
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminBlogCard;

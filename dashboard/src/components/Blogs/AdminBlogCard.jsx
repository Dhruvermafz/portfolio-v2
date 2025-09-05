import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaBookOpen } from "react-icons/fa";
import placeholder from "../../assets/images/product/1.png";
import { PORTFOLIO_URL } from "../../config";

const AdminBlogCard = ({ post, onDelete }) => {
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
  const isPublished = !!published;

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <Card className="blog-card shadow-sm h-100">
        <div className="blog-card-img-wrapper">
          <Card.Img
            variant="top"
            src={post.image || placeholder}
            alt={title}
            className="blog-card-img"
            style={{ height: "200px", objectFit: "cover" }}
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
          <div className="mt-auto d-flex justify-content-end gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              as={Link}
              to={`/blogs/${_id}/edit`}
            >
              <FaEdit className="me-1" /> Edit
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete?.(post)}
            >
              <FaTrash className="me-1" /> Delete
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              as={Link}
              to={`${PORTFOLIO_URL}blogs/${_id}`}
            >
              <FaBookOpen className="me-1" /> Read
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminBlogCard;

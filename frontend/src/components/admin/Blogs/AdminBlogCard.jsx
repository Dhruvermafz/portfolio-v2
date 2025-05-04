import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import placeholder from "../../../assets/img/blog/placeholder.png";
import { PORTFOLIO_URL } from "../../../config";

const AdminBlogCard = ({ post }) => {
  if (!post) return null;

  const { _id, title, content, published } = post;

  const calculateReadingTime = (text) => {
    const words = text?.split(/\s+/).length || 0;
    return Math.ceil(words / 200);
  };

  const readingTime = calculateReadingTime(content);
  const formattedDate = new Date(published).toLocaleDateString();

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <Card className="shadow-sm h-100">
        <Card.Img variant="top" src={placeholder} alt={title} />
        <Card.Body>
          <Card.Title>
            <a
              href={`${PORTFOLIO_URL}blogs/${_id}`}
              className="text-decoration-none text-dark"
            >
              {title}
            </a>
          </Card.Title>
          <Card.Text className="text-muted small">
            {readingTime} min read • {formattedDate}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-white border-top-0 d-flex justify-content-end">
          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm">
              <i className="bi bi-three-dots-vertical" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#edit">Edit</Dropdown.Item>
              <Dropdown.Item href="#delete">Delete</Dropdown.Item>
              <Dropdown.Item href={`${PORTFOLIO_URL}blogs/${_id}`}>
                Read
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default AdminBlogCard;

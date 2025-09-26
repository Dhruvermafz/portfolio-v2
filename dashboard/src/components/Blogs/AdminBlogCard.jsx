import React from "react";
import { Card, Tag, Button, Image } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, ReadOutlined } from "@ant-design/icons";
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
      <Card
        className="blog-card"
        hoverable
        cover={
          <div className="blog-card-img-wrapper">
            <Image
              src={post.image || placeholder}
              alt={title}
              className="blog-card-img"
              style={{ height: 200, objectFit: "cover" }}
              preview={false}
            />
            <Tag
              color={isPublished ? "green" : "orange"}
              className="blog-status-badge"
            >
              {isPublished ? "Published" : "Draft"}
            </Tag>
          </div>
        }
      >
        <Card.Meta
          title={
            <Link
              to={`${PORTFOLIO_URL}blogs/${_id}`}
              className="blog-title-link"
            >
              {title}
            </Link>
          }
          description={
            <div className="d-flex flex-column">
              <div
                className="blog-meta"
                style={{ color: "#999", fontSize: "12px" }}
              >
                {readingTime} min read • {formattedDate}
              </div>
              <div className="blog-excerpt">{getExcerpt(content)}</div>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <Button
                  type="default"
                  size="small"
                  href={`/blogs/${_id}/edit`}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  danger
                  size="small"
                  onClick={() => onDelete?.(post)}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
                <Button
                  type="default"
                  size="small"
                  href={`${PORTFOLIO_URL}blogs/${_id}`}
                  icon={<ReadOutlined />}
                >
                  Read
                </Button>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default AdminBlogCard;

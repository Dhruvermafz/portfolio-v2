import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Table, Button, Pagination, Spin, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetAuthorsQuery, useDeleteBookMutation } from "../api/bookApi";
import DeleteModal from "../components/Common/DeleteModal";
const AuthorDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const booksPerPage = 10;

  // Decode slug to author name for display
  const authorName = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ") // Replace hyphens with spaces
        .replace(/\./g, ". ") // Ensure dots have spaces
        .replace(/\s+/g, " ")
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
        .trim()
    : "Unknown Author";

  // Fetch books by author using slug
  const {
    data: authorData = {
      books: [],
      author_name: authorName,
      pagination: { page: 1, totalPages: 1, limit: booksPerPage, total: 0 },
    },
    isLoading: isAuthorLoading,
    error: authorError,
  } = useGetAuthorsQuery({
    author_name: slug, // Send slug as-is to use /authors/:slug route
    page: currentPage,
    limit: booksPerPage,
    sort_by: "title",
    order: "asc",
  });

  const [deleteBook] = useDeleteBookMutation();

  const totalBooks = authorData?.pagination?.total || 0;
  const totalPages = authorData?.pagination?.totalPages || 1;
  const currentBooks = authorData.books || [];
  const displayAuthorName = authorData.author_name || authorName;

  // Table columns
  const columns = [
    {
      title: "Title",
      key: "title",
      render: (_, book) => (
        <div>
          <p style={{ margin: 0 }}>{book.title}</p>
          {book.subtitle && <small>{book.subtitle}</small>}
        </div>
      ),
    },
    {
      title: "Authors",
      dataIndex: "authors",
      key: "authors",
      render: (authors) => authors?.join(", ") || "N/A",
    },
    {
      title: "Series",
      key: "series",
      render: (_, book) =>
        book.is_series && book.series_name ? (
          <span>
            {book.series_name} (Part {book.series_part || "N/A"} of{" "}
            {book.series_total_parts || "N/A"})
          </span>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (language) => language || "N/A",
    },
    {
      title: "Shelf Status",
      dataIndex: "shelf_status",
      key: "shelf_status",
      render: (shelf_status) => (
        <span
          style={{
            color:
              shelf_status === "idle"
                ? "#52c41a"
                : shelf_status === "borrowed"
                ? "#ff4d4f"
                : "#faad14",
          }}
        >
          {shelf_status || "N/A"}
        </span>
      ),
    },
    {
      title: "Reading Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color:
              status === "completed"
                ? "#52c41a"
                : status === "unread"
                ? "#ff4d4f"
                : "#faad14",
          }}
        >
          {status || "N/A"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, book) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/book/${book._id}`)}
            title="View Details"
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/book/${book._id}/edit`)}
            title="Edit Book"
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              setSelectedBook(book);
              setDeleteModalOpen(true);
            }}
            title="Delete Book"
          />
        </div>
      ),
    },
  ];

  // Handle delete
  const handleDeleteConfirm = async () => {
    try {
      await deleteBook(selectedBook._id).unwrap();
      setDeleteModalOpen(false);
      setSelectedBook(null);
      message.success("Book removed successfully!");
    } catch (error) {
      message.error(
        `Failed to remove book: ${error?.data?.message || "Unknown error"}`
      );
    }
  };

  // Handle error
  useEffect(() => {
    if (authorError) {
      message.error(
        `Failed to load books by "${displayAuthorName}": ${
          authorError?.data?.message || "Unknown error"
        }`
      );
    }
  }, [authorError, displayAuthorName]);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title={`Books by ${displayAuthorName}`}>
            {isAuthorLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="large" />
                <p style={{ marginTop: 8 }}>Loading books...</p>
              </div>
            ) : authorError ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "#ff4d4f" }}>
                  Error loading books:{" "}
                  {authorError?.data?.message || "Unknown error"}
                </p>
              </div>
            ) : currentBooks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                No books found by "{displayAuthorName}".
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={currentBooks}
                rowKey="_id"
                pagination={false}
                locale={{
                  emptyText: `No books found by "${displayAuthorName}"`,
                }}
              />
            )}

            {totalPages > 1 && (
              <Pagination
                current={currentPage}
                total={totalBooks}
                pageSize={booksPerPage}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: 16, textAlign: "center" }}
                showSizeChanger={false}
              />
            )}
          </Card>
        </Col>
      </Row>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedBook?.title || "book"}
      />
    </div>
  );
};

export default AuthorDetails;

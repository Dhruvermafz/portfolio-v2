import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Table,
  Button,
  Pagination,
  Spin,
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  GlobalOutlined,
  CheckSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useGetBooksQuery, useDeleteBookMutation } from "../api/bookApi";

// DeleteModal Component
import DeleteModal from "../components/Common/DeleteModal";

const Books = () => {
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [seriesFilter, setSeriesFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const booksPerPage = 10;

  const navigate = useNavigate();

  // Fetch books using RTK Query with pagination, search, language, and series filters
  const {
    data = {
      books: [],
      pagination: { page: 1, totalPages: 1, limit: booksPerPage, total: 0 },
    },
    isLoading,
    error,
  } = useGetBooksQuery({
    title: search,
    language: languageFilter === "All" ? "" : languageFilter,
    series_name: seriesFilter === "All" ? "" : seriesFilter,
    page: currentPage,
    limit: booksPerPage,
  });
  const [deleteBook] = useDeleteBookMutation();

  // Get data from pagination
  const totalBooks = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 1;
  const currentBooks = data.books || [];

  // Get all languages and series from current page
  const languages = [
    ...new Set((data.books || []).map((b) => b.language).filter(Boolean)),
  ];
  const series = [
    ...new Set((data.books || []).map((b) => b.series_name).filter(Boolean)),
  ];

  // Table columns for library management
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
        book.is_series && book.series_name
          ? `${book.series_name} (Part ${book.series_part || "N/A"} of ${
              book.series_total_parts || "N/A"
            })`
          : "N/A",
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
      message.success("Book removed from library successfully!");
    } catch (error) {
      message.error(
        `Failed to remove book: ${error?.data?.message || "Unknown error"}`
      );
    }
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, languageFilter, seriesFilter]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Library Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: "#e6f7ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BookOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Total Books
                </p>
                <h5 style={{ margin: 0 }}>{totalBooks}</h5>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: "#f0e4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GlobalOutlined style={{ fontSize: 24, color: "#722ed1" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Languages
                </p>
                <h5 style={{ margin: 0 }}>{languages.length}</h5>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: "#fff7e6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckSquareOutlined
                  style={{ fontSize: 24, color: "#fa8c16" }}
                />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Borrowed Books
                </p>
                <h5 style={{ margin: 0 }}>
                  {
                    currentBooks.filter((b) => b.shelf_status === "borrowed")
                      .length
                  }
                </h5>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: "#e6fffb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BookOutlined style={{ fontSize: 24, color: "#13c2c2" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Book Series
                </p>
                <h5 style={{ margin: 0 }}>{series.length}</h5>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Library Catalog"
            extra={
              <Link to="/book/add">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add New Book
                </Button>
              </Link>
            }
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col xs={24} sm={12} md={8}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search books by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  value={languageFilter}
                  onChange={(value) => setLanguageFilter(value)}
                  style={{ width: "100%" }}
                  placeholder="Filter by Language"
                >
                  <Select.Option value="All">All Languages</Select.Option>
                  {languages.map((language) => (
                    <Select.Option key={language} value={language}>
                      {language}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  value={seriesFilter}
                  onChange={(value) => setSeriesFilter(value)}
                  style={{ width: "100%" }}
                  placeholder="Filter by Series"
                >
                  <Select.Option value="All">All Series</Select.Option>
                  {series.map((seriesName) => (
                    <Select.Option key={seriesName} value={seriesName}>
                      {seriesName}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>

            {isLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="large" />
                <p style={{ marginTop: 8 }}>Loading library catalog...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "#ff4d4f" }}>
                  Error loading library catalog:{" "}
                  {error?.data?.message || "Unknown error"}
                </p>
              </div>
            ) : currentBooks.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                No books found in the library catalog.
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={currentBooks}
                rowKey="_id"
                pagination={false}
                locale={{ emptyText: "No books found in the library catalog" }}
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedBook?.title || "book"}
      />
    </div>
  );
};

export default Books;

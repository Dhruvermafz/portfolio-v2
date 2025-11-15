// components/Books.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Input,
  Select,
  Button,
  Pagination,
  Spin,
  message,
  Tabs,
  Space,
  Avatar,
  Tag,
  Tooltip,
  Empty,
  Radio,
  Image,
  Typography,
  Table,
  Badge,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  GlobalOutlined,
  CheckSquareOutlined,
  UserOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  StarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  useGetBooksQuery,
  useGetFiltersQuery,
  useGetAllAuthorsQuery,
  useDeleteBookMutation,
} from "../api/bookApi";
import DeleteModal from "../components/Common/DeleteModal";

const { TabPane } = Tabs;
const { Text } = Typography;

const Books = () => {
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [seriesFilter, setSeriesFilter] = useState("All");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("card"); // card | list
  const [activeTab, setActiveTab] = useState("reading");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const booksPerPage = 12;
  const navigate = useNavigate();

  // === Queries ===
  const {
    data: booksData = { books: [], pagination: { total: 0, totalPages: 1 } },
    isLoading: isBooksLoading,
  } = useGetBooksQuery({
    title: search,
    language: languageFilter === "All" ? "" : languageFilter,
    series_name: seriesFilter === "All" ? "" : seriesFilter,
    author: authorFilter === "All" ? "" : authorFilter,
    page: currentPage,
    limit: booksPerPage,
  });

  const { data: filtersData = { languages: [], series: [] } } =
    useGetFiltersQuery();
  const { data: authorsData = [] } = useGetAllAuthorsQuery();
  const [deleteBook] = useDeleteBookMutation();

  const books = booksData.books || [];
  const totalBooks = booksData.pagination?.total || 0;
  const totalPages = booksData.pagination?.totalPages || 1;

  // === Reset page on filter change ===
  useEffect(() => {
    setCurrentPage(1);
  }, [search, languageFilter, seriesFilter, authorFilter, activeTab]);

  // === Tabs: Reading vs Completed ===
  const tabBooks = useMemo(() => {
    const filtered = books.filter((b) =>
      activeTab === "completed"
        ? b.status === "completed"
        : b.status !== "completed"
    );
    return filtered;
  }, [books, activeTab]);

  // === Free Book Cover API (OpenLibrary) ===
  // === Free Book Cover API (OpenLibrary) – works with title + author ===
  const getCoverUrl = (isbn, title, authors) => {
    // 1. If we have an ISBN → use the fast ISBN endpoint (as before)
    if (isbn) {
      return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    }

    // 2. No ISBN → build a search query
    const query = encodeURIComponent(
      `${title} ${authors.length ? authors[0] : ""}`.trim()
    );

    // Open Library search → returns a list of docs.
    // We only need the first cover (if any).
    return `https://covers.openlibrary.org/b/title/${query}-M.jpg`;
  };

  // === Delete ===
  const handleDelete = (book) => {
    setSelectedBook(book);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBook(selectedBook._id).unwrap();
      message.success("Book removed from library");
      setDeleteModalOpen(false);
    } catch {
      message.error("Failed to delete book");
    }
  };

  // === Stats ===
  const stats = useMemo(() => {
    const completed = books.filter((b) => b.status === "completed").length;
    const reading = books.filter((b) => b.status === "reading").length;
    const borrowed = books.filter((b) => b.shelf_status === "borrowed").length;
    return { completed, reading, borrowed };
  }, [books]);

  return (
    <div style={{ padding: "24px", background: "#f8f9fa", minHeight: "100vh" }}>
      {/* === Stats Dashboard === */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 16 }}>
            <Space>
              <div
                style={{ background: "#e6f7ff", padding: 12, borderRadius: 8 }}
              >
                <BookOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              </div>
              <div>
                <Text type="secondary">Total Books</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {totalBooks}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 16 }}>
            <Space>
              <div
                style={{ background: "#fff2e8", padding: 12, borderRadius: 8 }}
              >
                <ClockCircleOutlined
                  style={{ fontSize: 24, color: "#fa8c16" }}
                />
              </div>
              <div>
                <Text type="secondary">Reading</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stats.reading}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 16 }}>
            <Space>
              <div
                style={{ background: "#f6ffed", padding: 12, borderRadius: 8 }}
              >
                <StarOutlined style={{ fontSize: 24, color: "#52c41a" }} />
              </div>
              <div>
                <Text type="secondary">Completed</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stats.completed}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 16 }}>
            <Space>
              <div
                style={{ background: "#fff1f0", padding: 12, borderRadius: 8 }}
              >
                <CheckSquareOutlined
                  style={{ fontSize: 24, color: "#ff4d4f" }}
                />
              </div>
              <div>
                <Text type="secondary">Borrowed</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stats.borrowed}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* === Main Catalog === */}
      <Card
        title={
          <Space size="middle">
            <BookOutlined style={{ fontSize: 20 }} />
            <span style={{ fontSize: 18, fontWeight: 600 }}>My Library</span>
          </Space>
        }
        extra={
          <Space>
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="card">
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value="list">
                <UnorderedListOutlined />
              </Radio.Button>
            </Radio.Group>
            <Link to="/book/add">
              <Button type="primary" icon={<PlusOutlined />}>
                Add Book
              </Button>
            </Link>
          </Space>
        }
        bodyStyle={{ padding: 0 }}
        style={{
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* === Tabs === */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ margin: "0 24px" }}
        >
          <TabPane
            tab={
              <span>
                <ClockCircleOutlined /> Reading ({stats.reading})
              </span>
            }
            key="reading"
          />
          <TabPane
            tab={
              <span>
                <StarOutlined /> Completed ({stats.completed})
              </span>
            }
            key="completed"
          />
        </Tabs>

        {/* === Filters === */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #f0f0f0",
            background: "#fafafa",
          }}
        >
          <Row gutter={[12, 12]}>
            <Col xs={24} md={8}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search by title, author, ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Select
                value={languageFilter}
                onChange={setLanguageFilter}
                style={{ width: "100%" }}
                placeholder="Language"
                showSearch
              >
                <Select.Option value="All">All Languages</Select.Option>
                {filtersData.languages.map((l) => (
                  <Select.Option key={l} value={l}>
                    {l}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Select
                value={seriesFilter}
                onChange={setSeriesFilter}
                style={{ width: "100%" }}
                placeholder="Series"
                showSearch
              >
                <Select.Option value="All">All Series</Select.Option>
                {filtersData.series.map((s) => (
                  <Select.Option key={s} value={s}>
                    {s}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Select
                value={authorFilter}
                onChange={setAuthorFilter}
                style={{ width: "100%" }}
                placeholder="Author"
                showSearch
              >
                <Select.Option value="All">All Authors</Select.Option>
                {authorsData.map((a) => (
                  <Select.Option key={a} value={a}>
                    {a}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>

        {/* === Content === */}
        <div style={{ padding: 24 }}>
          {isBooksLoading ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <Spin size="large" />
            </div>
          ) : tabBooks.length === 0 ? (
            <Empty description="No books in this section" />
          ) : viewMode === "card" ? (
            /* === CARD VIEW === */
            <Row gutter={[16, 24]}>
              {tabBooks.map((book) => (
                <Col key={book._id} xs={12} sm={8} md={6} lg={4}>
                  <Card
                    hoverable
                    style={{ borderRadius: 12, overflow: "hidden" }}
                    cover={
                      <div
                        style={{
                          height: 220,
                          overflow: "hidden",
                          background: "#f5f5f5",
                        }}
                      >
                        {book.isbn ? (
                          <Image
                            src={getCoverUrl(book.isbn)}
                            alt={book.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            fallback="https://via.placeholder.com/300x400/eee/ccc?text=No+Cover"
                            preview={false}
                          />
                        ) : (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              padding: 16,
                            }}
                          >
                            <BookOutlined
                              style={{ fontSize: 48, marginBottom: 8 }}
                            />
                            <Text style={{ color: "white", fontWeight: 500 }}>
                              {book.title}
                            </Text>
                          </div>
                        )}
                      </div>
                    }
                    actions={[
                      <Tooltip title="View">
                        <Button
                          type="text"
                          icon={<EyeOutlined />}
                          onClick={() => navigate(`/book/${book._id}`)}
                        />
                      </Tooltip>,
                      <Tooltip title="Edit">
                        <Button
                          type="text"
                          icon={<EditOutlined />}
                          onClick={() => navigate(`/book/${book._id}/edit`)}
                        />
                      </Tooltip>,
                      <Tooltip title="Delete">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(book)}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Tooltip title={book.title}>
                          <Text strong ellipsis style={{ width: "100%" }}>
                            {book.title}
                          </Text>
                        </Tooltip>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            /* === LIST VIEW === */
            <Table
              dataSource={tabBooks}
              rowKey="_id"
              pagination={false}
              columns={[
                {
                  title: "Book",
                  render: (_, book) => (
                    <Space>
                      {book.isbn ? (
                        <Image
                          width={40}
                          src={getCoverUrl(book.isbn)}
                          fallback="https://via.placeholder.com/40/eee/ccc?text=B"
                        />
                      ) : (
                        <Avatar shape="square" icon={<BookOutlined />} />
                      )}
                      <div>
                        <Text strong>{book.title}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {book.authors?.join(", ") || "Unknown"}
                        </Text>
                      </div>
                    </Space>
                  ),
                },
                {
                  title: "Series",
                  dataIndex: "series_name",
                  render: (s, b) =>
                    b.is_series ? `${s} #${b.series_part}` : "—",
                },
                { title: "Language", dataIndex: "language" },
                {
                  title: "Status",
                  render: (_, b) => (
                    <Badge
                      status={
                        b.status === "completed" ? "success" : "processing"
                      }
                      text={b.status}
                    />
                  ),
                },
                {
                  title: "Actions",
                  render: (_, book) => (
                    <Space>
                      <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/book/${book._id}`)}
                      />
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/book/${book._id}/edit`)}
                      />
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(book)}
                      />
                    </Space>
                  ),
                },
              ]}
            />
          )}

          {/* === Pagination === */}
          {totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={totalBooks}
              pageSize={booksPerPage}
              onChange={setCurrentPage}
              style={{ marginTop: 24, textAlign: "center" }}
            />
          )}
        </div>
      </Card>

      {/* === Delete Modal === */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedBook?.title || "book"}
      />
    </div>
  );
};

export default Books;

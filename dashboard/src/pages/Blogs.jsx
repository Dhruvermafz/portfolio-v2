// Blogs.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Button,
  Pagination,
  Spin,
  Card,
  Tag,
  Badge,
  Space,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
  message,
  Empty,
  Typography,
  Modal,
  Alert,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  FireOutlined,
  CodeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../api/blogApi";
import DeleteModal from "../components/Common/DeleteModal";

const { Text } = Typography;

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const blogsPerPage = 6;

  const { data, isLoading, isError, refetch } = useGetAllBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = useMemo(() => data?.docs || [], [data]);

  // === Filters & Search ===
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [blogs, searchQuery]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // === Selection ===
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelected(paginatedBlogs.map((b) => b._id));
  };

  const clearSelection = () => setSelected([]);

  // === Actions ===
  const openDelete = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(blogToDelete._id).unwrap();
      message.success("Blog deleted");
      setDeleteModalOpen(false);
      setBlogToDelete(null);
      clearSelection();
    } catch {
      message.error("Failed to delete");
    }
  };

  const bulkDelete = () => {
    Modal.confirm({
      title: `Delete ${selected.length} blog(s)?`,
      onOk: async () => {
        try {
          await Promise.all(selected.map((id) => deleteBlog(id).unwrap()));
          message.success("Blogs deleted");
          clearSelection();
        } catch {
          message.error("Failed to delete");
        }
      },
    });
  };

  // === Dropdown ===
  const getMenu = (blog) => (
    <Menu>
      <Menu.Item icon={<EyeOutlined />}>
        <Link to={`/blog/${blog.slug || blog._id}`} target="_blank">
          View Live
        </Link>
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />}>
        <Link to={`/blogs/edit/${blog._id}`}>Edit</Link>
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        danger
        onClick={() => openDelete(blog)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  // === Time Ago ===
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div style={{ padding: "20px", background: "#f9f9fb", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            bodyStyle={{ padding: 0 }}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                background: "#fff",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Space size="middle">
                    <Text
                      strong
                      style={{
                        fontSize: 20,
                        fontFamily: "'Fira Code', monospace",
                      }}
                    >
                      Blog Posts
                    </Text>
                    <Badge
                      count={blogs.length}
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  </Space>
                </Col>
                <Col>
                  <Space>
                    {selected.length > 0 && (
                      <>
                        <Button size="small" onClick={clearSelection}>
                          Cancel
                        </Button>
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={bulkDelete}
                        >
                          Delete ({selected.length})
                        </Button>
                      </>
                    )}
                    <Link to="/blogs/create">
                      <Button type="primary" icon={<PlusOutlined />}>
                        Write Post
                      </Button>
                    </Link>
                  </Space>
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col xs={24} md={16}>
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search title, content, tags..."
                    allowClear
                    size="large"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "right" }}>
                  <Space>
                    <Button
                      icon={<FireOutlined />}
                      type={selected.length === 0 ? "default" : "link"}
                      onClick={selectAll}
                    >
                      Select All
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>

            {/* Content */}
            <div style={{ padding: 24 }}>
              {isLoading ? (
                <div style={{ textAlign: "center", padding: 40 }}>
                  <Spin size="large" />
                </div>
              ) : isError ? (
                <Alert
                  message="Failed to load blogs"
                  type="error"
                  showIcon
                  action={
                    <Button size="small" danger onClick={refetch}>
                      Retry
                    </Button>
                  }
                />
              ) : paginatedBlogs.length === 0 ? (
                <Empty
                  description="No blog posts yet"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                  <Link to="/blogs/create">
                    <Button type="primary" icon={<PlusOutlined />}>
                      Write Your First Post
                    </Button>
                  </Link>
                </Empty>
              ) : (
                <>
                  <Row gutter={[24, 24]}>
                    {paginatedBlogs.map((blog) => (
                      <Col key={blog._id} xs={24} md={12} lg={8}>
                        <Card
                          hoverable
                          style={{
                            borderRadius: 12,
                            overflow: "hidden",
                            border: selected.includes(blog._id)
                              ? "2px solid #1890ff"
                              : "1px solid #f0f0f0",
                            boxShadow: selected.includes(blog._id)
                              ? "0 0 0 2px rgba(24,144,255,0.2)"
                              : "none",
                          }}
                          onClick={(e) => {
                            if (e.ctrlKey || e.metaKey) {
                              toggleSelect(blog._id);
                            }
                          }}
                        >
                          {/* Cover Image */}
                          {blog.images?.[0] ? (
                            <div style={{ height: 140, overflow: "hidden" }}>
                              <img
                                src={blog.images[0]}
                                alt={blog.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                height: 140,
                                background:
                                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: 32,
                                fontWeight: "bold",
                              }}
                            >
                              {blog.title[0]}
                            </div>
                          )}

                          <div style={{ padding: "16px" }}>
                            {/* Title */}
                            <Text
                              strong
                              style={{
                                fontSize: 16,
                                display: "block",
                                marginBottom: 8,
                                fontFamily: "'Fira Code', monospace",
                              }}
                              ellipsis={{ tooltip: blog.title }}
                            >
                              {blog.title}
                            </Text>

                            {/* Metadata */}
                            <Space
                              size={8}
                              style={{ marginBottom: 12, flexWrap: "wrap" }}
                            >
                              <Tooltip title="Author">
                                <Space size={4}>
                                  <Avatar size="small" src={blog.author?.photo}>
                                    {blog.author?.name?.[0] || "A"}
                                  </Avatar>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: 12 }}
                                  >
                                    {blog.author?.name || "You"}
                                  </Text>
                                </Space>
                              </Tooltip>

                              <Tooltip title="Published">
                                <Space size={4}>
                                  <ClockCircleOutlined
                                    style={{ fontSize: 12, color: "#8c8c8c" }}
                                  />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: 12 }}
                                  >
                                    {timeAgo(blog.published || blog.createdAt)}
                                  </Text>
                                </Space>
                              </Tooltip>

                              <Badge
                                status={blog.published ? "success" : "warning"}
                                text={blog.published ? "Published" : "Draft"}
                                style={{ fontSize: 11 }}
                              />
                            </Space>

                            {/* Tags */}
                            <Space
                              wrap
                              size={[4, 4]}
                              style={{ marginBottom: 12 }}
                            >
                              {blog.tags?.slice(0, 3).map((tag) => (
                                <Tag
                                  key={tag}
                                  color="blue"
                                  size="small"
                                  icon={<CodeOutlined />}
                                >
                                  {tag}
                                </Tag>
                              ))}
                              {blog.tags?.length > 3 && (
                                <Tag size="small">+{blog.tags.length - 3}</Tag>
                              )}
                            </Space>

                            {/* Actions */}
                            <Space
                              style={{
                                width: "100%",
                                justifyContent: "space-between",
                              }}
                            >
                              <Checkbox
                                checked={selected.includes(blog._id)}
                                onChange={() => toggleSelect(blog._id)}
                                onClick={(e) => e.stopPropagation()}
                              />

                              <Dropdown
                                overlay={getMenu(blog)}
                                trigger={["click"]}
                              >
                                <Button
                                  size="small"
                                  icon={<MoreOutlined />}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </Dropdown>
                            </Space>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      current={currentPage}
                      total={filteredBlogs.length}
                      pageSize={blogsPerPage}
                      onChange={setCurrentPage}
                      style={{ marginTop: 32, textAlign: "center" }}
                      showSizeChanger={false}
                    />
                  )}
                </>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={blogToDelete?.title || "blog"}
      />
    </div>
  );
};

export default Blogs;

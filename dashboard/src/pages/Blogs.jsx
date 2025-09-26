import React, { useState } from "react";
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
  Radio,
  Modal,
  Alert,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../api/blogApi";
import DeleteModal from "../components/Common/DeleteModal";

// Placeholder AdminBlogCard (to be replaced with actual code)
import AdminBlogCard from "../components/Blogs/AdminBlogCard";

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
      const token = localStorage.getItem("authToken");
      await deleteBlog({
        id: selectedBlog._id,
        headers: { Authorization: `Bearer ${token}` },
      }).unwrap();
      setDeleteModalOpen(false);
      setSelectedBlog(null);
      Modal.success({ content: "Blog post deleted successfully!" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      Modal.error({ content: "Failed to delete blog post." });
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
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Blogs"
            extra={
              <Link to="/blogs/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Blog
                </Button>
              </Link>
            }
          >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col xs={24} md={12}>
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search blogs by title..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <Radio.Group
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <Radio.Button value="newest">Newest</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={18}>
                {isLoading ? (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                  </div>
                ) : isError ? (
                  <div style={{ textAlign: "center" }}>
                    <Alert
                      message="Error"
                      description="Error loading blogs"
                      type="error"
                      showIcon
                      style={{ marginBottom: 16 }}
                    />
                    <Button type="link" onClick={refetch}>
                      Retry
                    </Button>
                  </div>
                ) : paginatedBlogs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    No blogs found.
                  </div>
                ) : (
                  <Row gutter={[16, 16]}>
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
                  <Pagination
                    current={currentPage}
                    total={filteredBlogs.length}
                    pageSize={blogsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ marginTop: 24, textAlign: "center" }}
                    showSizeChanger={false}
                  />
                )}
              </Col>
              <Col xs={24} lg={6}>
                <Card title="Trending Tags">
                  {blogs
                    .flatMap((blog) => blog.tags || [])
                    .filter((tag, index, self) => self.indexOf(tag) === index)
                    .slice(0, 5)
                    .map((tag) => (
                      <Tag
                        key={tag}
                        color="blue"
                        style={{ margin: 4, cursor: "pointer" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        {tag}
                      </Tag>
                    ))}
                  {blogs.every(
                    (blog) => !blog.tags || blog.tags.length === 0
                  ) && (
                    <p style={{ color: "#595959", fontSize: 12 }}>
                      No tags available.
                    </p>
                  )}
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedBlog?.title || "blog post"}
      />
    </div>
  );
};

export default Blogs;

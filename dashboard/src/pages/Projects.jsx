// src/components/Projects.jsx
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
  Image,
  message,
  Tooltip,
  Dropdown,
  Menu,
  Space,
  Tag,
  Avatar,
  Switch,
  Badge,
  Divider,
  Typography,
  Radio,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  CheckSquareOutlined,
  PlusOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  MoreOutlined,
  GithubOutlined,
  GlobalOutlined,
  StarOutlined,
  CodeOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import {
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "../api/projectApi";
import DeleteModal from "../components/Common/DeleteModal";

const { Text, Title } = Typography;

const Projects = () => {
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("card");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();
  const { data: projects = [], isLoading, error } = useGetAllProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const projectsPerPage = 12;
  const clients = [...new Set(projects.map((p) => p.client).filter(Boolean))];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesClient = clientFilter === "All" || p.client === clientFilter;
    return matchesSearch && matchesClient;
  });

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(selectedProject._id).unwrap();
      setDeleteModalOpen(false);
      setSelectedProject(null);
      message.success("Project deleted");
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete");
    }
  };

  const getActionMenu = (p) => (
    <Menu>
      <Menu.Item
        icon={<EyeOutlined />}
        onClick={() => navigate(`/projects/${p._id}`)}
      >
        View Details
      </Menu.Item>
      <Menu.Item
        icon={<EditOutlined />}
        onClick={() => navigate(`/projects/${p._id}/edit`)}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          setSelectedProject(p);
          setDeleteModalOpen(true);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    clients: clients.length,
  };

  return (
    <div
      style={{
        padding: 24,

        minHeight: "100vh",
      }}
    >
      {/* === Stats Dashboard === */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 16 }}>
            <Space>
              <div
                style={{ background: "#e6f7ff", padding: 12, borderRadius: 8 }}
              >
                <FolderOpenOutlined
                  style={{ fontSize: 24, color: "#1890ff" }}
                />
              </div>
              <div>
                <Text type="secondary">Total</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stats.total}
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
                <CodeOutlined style={{ fontSize: 24, color: "#fa8c16" }} />
              </div>
              <div>
                <Text type="secondary">In Progress</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stats.inProgress}
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
                <CheckSquareOutlined
                  style={{ fontSize: 24, color: "#52c41a" }}
                />
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
                style={{ background: "#f0f5ff", padding: 12, borderRadius: 8 }}
              >
                <TeamOutlined style={{ fontSize: 24, color: "#722ed1" }} />
              </div>
              <div>
                <Text type="secondary">Clients</Text>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {stats.clients}
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* === Main Card === */}
      <Card
        title={
          <Space size="middle">
            <CodeOutlined style={{ fontSize: 20 }} />
            <Title level={4} style={{ margin: 0 }}>
              Project Master Hub
            </Title>
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
              <Radio.Button value="table">
                <UnorderedListOutlined />
              </Radio.Button>
            </Radio.Group>
            <Link to="/projects/add">
              <Button type="primary" icon={<PlusOutlined />}>
                New Project
              </Button>
            </Link>
          </Space>
        }
      >
        {/* Filters */}
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} md={10}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by title, tech..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              allowClear
            />
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Select
              value={clientFilter}
              onChange={(v) => {
                setClientFilter(v);
                setCurrentPage(1);
              }}
              style={{ width: "100%" }}
              placeholder="Client"
            >
              <Select.Option value="All">All Clients</Select.Option>
              {clients.map((c) => (
                <Select.Option key={c} value={c}>
                  {c}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Content */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin size="large" 念 />
          </div>
        ) : currentProjects.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
            <FolderOpenOutlined
              style={{ fontSize: 48, marginBottom: 16, color: "#ddd" }}
            />
            <Text type="secondary">No projects found</Text>
          </div>
        ) : viewMode === "table" ? (
          <Table
            dataSource={currentProjects}
            rowKey="_id"
            pagination={false}
            columns={[
              {
                title: "Project",
                render: (_, p) => (
                  <Space>
                    <Image
                      width={40}
                      src={p.mainImage || "https://via.placeholder.com/40"}
                      style={{ borderRadius: 4 }}
                    />
                    <div>
                      <Text strong>{p.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {p.client || "Personal"}
                      </Text>
                    </div>
                  </Space>
                ),
              },
              {
                title: "Status",
                render: (_, p) => (
                  <Badge
                    status={p.status === "Completed" ? "success" : "processing"}
                    text={p.status}
                  />
                ),
              },
              {
                title: "Links",
                render: (_, p) => (
                  <Space split={<Divider type="vertical" />}>
                    {p.ghLink && (
                      <a href={p.ghLink} target="_blank">
                        <GithubOutlined />
                      </a>
                    )}
                    {p.website && (
                      <a href={p.website} target="_blank">
                        <GlobalOutlined />
                      </a>
                    )}
                  </Space>
                ),
              },
              {
                title: "Actions",
                render: (_, p) => (
                  <Space>
                    <Button
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/projects/${p._id}`)}
                    />
                    <Button
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/projects/${p._id}/edit`)}
                    />
                    <Dropdown overlay={getActionMenu(p)} trigger={["click"]}>
                      <Button size="small" icon={<MoreOutlined />} />
                    </Dropdown>
                  </Space>
                ),
              },
            ]}
          />
        ) : (
          /* === CARD VIEW === */
          <Row gutter={[16, 24]}>
            {currentProjects.map((p) => (
              <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{ borderRadius: 12, overflow: "hidden" }}
                  cover={
                    <div style={{ height: 160, background: "#f0f0f0" }}>
                      <Image
                        src={
                          p.mainImage ||
                          "https://via.placeholder.com/300x160/eee/ccc?text=Project"
                        }
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        preview={false}
                      />
                    </div>
                  }
                  actions={[
                    <Tooltip title="View">
                      <EyeOutlined
                        onClick={() => navigate(`/projects/${p._id}`)}
                      />
                    </Tooltip>,
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() => navigate(`/projects/${p._id}/edit`)}
                      />
                    </Tooltip>,
                    <Dropdown
                      overlay={getActionMenu(p)}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <MoreOutlined style={{ fontSize: 18 }} />
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Text strong ellipsis>
                        {p.title}
                      </Text>
                    }
                    description={
                      <Space
                        direction="vertical"
                        size={4}
                        style={{ width: "100%" }}
                      >
                        <Text type="secondary" ellipsis>
                          {p.client || "Personal Project"}
                        </Text>
                        <Space wrap>
                          {p.techStack?.map((t) => (
                            <Tag key={t} color="geekblue" size="small">
                              {t}
                            </Tag>
                          ))}
                        </Space>
                        <Space>
                          {p.ghLink && (
                            <Badge count={p.stars || 0} size="small">
                              <a href={p.ghLink} target="_blank">
                                <GithubOutlined />
                              </a>
                            </Badge>
                          )}
                          {p.website && (
                            <a href={p.website} target="_blank">
                              <GlobalOutlined style={{ color: "#52c41a" }} />
                            </a>
                          )}
                        </Space>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={filteredProjects.length}
            pageSize={projectsPerPage}
            onChange={setCurrentPage}
            style={{ marginTop: 24, textAlign: "center" }}
          />
        )}
      </Card>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedProject?.title || "project"}
      />
    </div>
  );
};

export default Projects;

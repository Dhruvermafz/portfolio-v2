import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Statistic,
  List,
  Avatar,
  Tag,
  Button,
  Dropdown,
  Menu,
  Badge,
  Progress,
  Tooltip,
  Space,
  Divider,
  Empty,
  Spin,
} from "antd";
import {
  CodeOutlined,
  GithubOutlined,
  LinkOutlined,
  PlusOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  FireOutlined,
  MessageOutlined,
  FundOutlined,
  RocketOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { useGetAllCategoriesQuery } from "../api/categoryApi";
import { useGetAllProjectsQuery } from "../api/projectApi";
import { useGetUserByIdQuery } from "../api/userApi";
import { useGetAllContactsQuery } from "../api/contactApi";
import { useGetAllBlogsQuery } from "../api/blogApi";

const Dashboard = () => {
  const token = localStorage.getItem("authToken");
  const [filter, setFilter] = useState("all");

  // === API Hooks with Safe Pagination Handling ===
  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery("me", {
    skip: !token,
  });

  const { data: categories = [], isLoading: catLoading } =
    useGetAllCategoriesQuery();

  const { data: projectResponse = {}, isLoading: projLoading } =
    useGetAllProjectsQuery();
  const projects = useMemo(() => {
    if (Array.isArray(projectResponse)) return projectResponse;
    return projectResponse.docs || projectResponse.data || [];
  }, [projectResponse]);

  const { data: contactResponse = {}, isLoading: queryLoading } =
    useGetAllContactsQuery();
  const contactList = useMemo(
    () => contactResponse.data || contactResponse.docs || [],
    [contactResponse]
  );

  const { data: blogResponse = {}, isLoading: blogsLoading } =
    useGetAllBlogsQuery();
  const blogs = useMemo(
    () => blogResponse.docs || blogResponse.data || [],
    [blogResponse]
  );

  // === Memoized Stats ===
  const stats = useMemo(
    () => ({
      orders: userData?.orders || 9856,
      projects: projects.length,
      blogs: blogs.length,
      pendingQueries: contactList.filter((q) => !q.responded).length,
      liveProjects: projects.filter((p) => p.website).length,
    }),
    [userData, projects, blogs, contactList]
  );

  // === Unified Activity Feed (Latest 6) ===
  const activityFeed = useMemo(() => {
    const items = [
      ...contactList.slice(0, 5).map((q) => ({
        type: "query",
        icon: <MessageOutlined style={{ color: "#1890ff" }} />,
        title: q.subject || "New Message",
        desc: `${q.name} • ${q.email}`,
        time: q.createdAt || q._id,
        id: q._id,
        unread: !q.responded,
      })),
      ...projects.slice(0, 3).map((p) => ({
        type: "project",
        icon: <CodeOutlined style={{ color: "#52c41a" }} />,
        title: p.title || "Untitled Project",
        desc: p.client || "Client Project",
        time: p.createdAt || p._id,
        id: p._id,
        link: p.website,
        gh: p.ghLink,
      })),
      ...blogs.slice(0, 2).map((b) => ({
        type: "blog",
        icon: <FundOutlined style={{ color: "#fa8c16" }} />,
        title: b.title || "New Post",
        desc: "Published",
        time: b.published || b.createdAt || b._id,
        id: b._id,
      })),
    ];
    return items
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6);
  }, [contactList, projects, blogs]);

  // === Top Tech Stack from Project Services ===
  const techTags = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      const services = p.services || "";
      services.split(",").forEach((s) => {
        const tech = s.trim();
        if (tech) map[tech] = (map[tech] || 0) + 1;
      });
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [projects]);

  // === Loading State ===
  const isLoading =
    userLoading || catLoading || projLoading || queryLoading || blogsLoading;
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <Spin size="large" />
        <p style={{ marginTop: 16, color: "#8c8c8c" }}>
          Loading Developer Hub...
        </p>
      </div>
    );
  }

  // === Quick Actions Dropdown ===
  const quickActions = (
    <Menu>
      <Menu.Item key="proj" icon={<CodeOutlined />}>
        <Link to="/projects/add">Add Project</Link>
      </Menu.Item>
      <Menu.Item key="blog" icon={<FundOutlined />}>
        <Link to="/blogs/create">Write Blog</Link>
      </Menu.Item>
      <Menu.Item key="query" icon={<MessageOutlined />}>
        <Link to="/contacts">
          View Queries ({stats.pendingQueries} pending)
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        padding: "16px",
        background: "#f9f9fb",
        minHeight: "100vh",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 14 }} hoverable>
            <Statistic
              title="Live Projects"
              value={stats.liveProjects}
              prefix={<RocketOutlined style={{ color: "#1890ff" }} />}
              suffix={`/ ${stats.projects}`}
              valueStyle={{ color: "#1890ff", fontSize: 20 }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 14 }} hoverable>
            <Statistic
              title="Pending Queries"
              value={stats.pendingQueries}
              prefix={<Badge status="warning" />}
              valueStyle={{
                color: stats.pendingQueries > 0 ? "#fa8c16" : "#52c41a",
                fontSize: 20,
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bodyStyle={{ padding: 14 }} hoverable>
            <Statistic
              title="Blog Posts"
              value={stats.blogs}
              prefix={<FundOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#722ed1", fontSize: 20 }}
            />
          </Card>
        </Col>

        <Col>
          <Space>
            <Dropdown
              overlay={quickActions}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button type="primary" size="middle" icon={<PlusOutlined />}>
                Quick Add
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        {/* Activity Feed */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined />
                Recent Activity
              </Space>
            }
            bodyStyle={{
              padding: "12px 16px",
              maxHeight: 380,
              overflow: "auto",
            }}
          >
            {activityFeed.length > 0 ? (
              <List
                size="small"
                dataSource={activityFeed}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px dashed #f0f0f0",
                      opacity: item.unread ? 1 : 0.8,
                    }}
                  >
                    <List.Item.Meta
                      avatar={item.icon}
                      title={
                        <Space size={4}>
                          <span
                            style={{
                              fontWeight: item.unread ? "bold" : "normal",
                            }}
                          >
                            {item.title}
                          </span>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkOutlined
                                style={{ fontSize: 12, color: "#1890ff" }}
                              />
                            </a>
                          )}
                          {item.gh && (
                            <a
                              href={item.gh}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GithubOutlined
                                style={{ fontSize: 12, color: "#333" }}
                              />
                            </a>
                          )}
                        </Space>
                      }
                      description={
                        <small style={{ color: "#8c8c8c" }}>{item.desc}</small>
                      }
                    />
                    <Tooltip title={new Date(item.time).toLocaleString()}>
                      <small style={{ color: "#bfbfbf" }}>
                        {formatTimeAgo(item.time)}
                      </small>
                    </Tooltip>
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No recent activity"
              />
            )}
          </Card>
        </Col>

        {/* Top Tech Stack */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <Space>
                <FireOutlined />
                Top Tech Stack
              </Space>
            }
            bodyStyle={{ padding: 16 }}
          >
            {techTags.length > 0 ? (
              <Space direction="vertical" style={{ width: "100%" }}>
                {techTags.map((tag) => (
                  <div
                    key={tag.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Tag
                      color="blue"
                      icon={<CodeOutlined />}
                      style={{ margin: 0 }}
                    >
                      {tag.name}
                    </Tag>
                    <Progress
                      percent={Math.round((tag.count / projects.length) * 100)}
                      size="small"
                      showInfo={false}
                      strokeColor="#1890ff"
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: "#595959",
                        minWidth: 20,
                        textAlign: "right",
                      }}
                    >
                      {tag.count}
                    </span>
                  </div>
                ))}
              </Space>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No project tech data"
              />
            )}
          </Card>
        </Col>

        {/* Quick Links */}
        <Col xs={24} md={12} lg={8}>
          <Card
            title={
              <Space>
                <BugOutlined />
                Quick Navigation
              </Space>
            }
            bodyStyle={{ padding: 16 }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="small">
              <Button block type="dashed" icon={<CodeOutlined />}>
                <Link to="/projects">Projects ({stats.projects})</Link>
              </Button>
              <Button block type="dashed" icon={<FundOutlined />}>
                <Link to="/blogs">Blogs ({stats.blogs})</Link>
              </Button>
              <Button
                block
                type="dashed"
                danger={stats.pendingQueries > 0}
                icon={<MessageOutlined />}
              >
                <Link to="/contacts">
                  Queries ({stats.pendingQueries} pending)
                </Link>
              </Button>
              <Divider style={{ margin: "12px 0" }} />
              <Space wrap size={[4, 4]}>
                {categories.slice(0, 8).map((cat) => (
                  <Tag
                    key={cat._id}
                    color="processing"
                    style={{ margin: 0, cursor: "pointer" }}
                  >
                    <Link
                      to={`/category/${cat.name
                        .toLowerCase()
                        .replace(/ & /g, "-")}`}
                      style={{ color: "inherit" }}
                    >
                      {cat.name}
                    </Link>
                  </Tag>
                ))}
                {categories.length > 8 && <Tag color="default">…</Tag>}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// === Helper: Time Ago ===
const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(date).toLocaleDateString();
};

export default Dashboard;

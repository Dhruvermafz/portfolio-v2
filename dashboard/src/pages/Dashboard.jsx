import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Input,
  Button,
  Select,
  Image,
  Checkbox,
  Carousel,
  Tag,
  Spin,
  message,
} from "antd";
import {
  HeartFilled,
  DatabaseOutlined,
  ShoppingOutlined,
  MessageOutlined,
  UserAddOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { useGetAllCategoriesQuery } from "../api/categoryApi";
import { useGetAllProjectsQuery } from "../api/projectApi";
import { useGetTodosQuery, useAddTodoMutation } from "../api/todoApi";
import { useGetUserByIdQuery } from "../api/userApi";
import { useGetAllContactsQuery } from "../api/contactApi";
import { useGetAllBlogsQuery } from "../api/blogApi";

const { Option } = Select;

const Dashboard = () => {
  const [form] = Form.useForm();
  const token = localStorage.getItem("authToken");
  // Use the hook directly for the current user ("me")
  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery("me", {
    skip: !token,
  });

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();
  const { data: projects = [], isLoading: projectsLoading } =
    useGetAllProjectsQuery();
  const { data: todos = [], isLoading: todosLoading } = useGetTodosQuery();
  const { data: queries = { data: [] }, isLoading: queriesLoading } =
    useGetAllContactsQuery();
  const { data: blogs = [], isLoading: blogsLoading } = useGetAllBlogsQuery();
  const [addTodo] = useAddTodoMutation();

  const categoryImageMap = {
    technology: <CodeOutlined />,
    Programming: <CodeOutlined />,
    "MERN Stack": <CodeOutlined />,
    MySQL: <CodeOutlined />,
    "Web Development": <CodeOutlined />,
    "React.Js": <CodeOutlined />,
    database: <CodeOutlined />,
  };

  // State for new task input
  const [newTask, setNewTask] = useState("");

  // Handle task submission
  const handleAddTask = async (values) => {
    if (values.content?.trim()) {
      try {
        await addTodo({
          content: values.content,
          order: todos?.length || 0,
        }).unwrap();
        setNewTask("");
        form.resetFields();
        message.success("Task added successfully!");
      } catch (error) {
        console.error("Failed to add task:", error);
        message.error("Failed to add task.");
      }
    }
  };

  // Handle loading state
  if (
    userLoading ||
    todosLoading ||
    categoriesLoading ||
    projectsLoading ||
    queriesLoading ||
    blogsLoading
  ) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
        <p style={{ marginTop: 8 }}>Loading...</p>
      </div>
    );
  }

  // Table columns for Recent Queries
  const queryColumns = [
    {
      title: "Name",
      key: "name",
      render: (_, query) => (
        <div>
          <h5 style={{ margin: 0 }}>{query.name}</h5>
          <h6 style={{ color: "#595959" }}>{query.email}</h6>
        </div>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Date",
      key: "createdAt",
      render: (_, query) =>
        new Date(query.createdAt || query._id).toLocaleDateString(),
    },
  ];

  // Table columns for Top Projects
  const projectColumns = [
    {
      title: "Project",
      key: "project",
      render: (_, project) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image
            src={project.mainImage || "assets/images/project/default.png"}
            alt={project.title}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 4,
            }}
            preview={false}
          />
          <div>
            <h5 style={{ margin: 0 }}>{project.title || "Untitled Project"}</h5>
            <h6 style={{ color: "#595959" }}>
              {project.client || "Unknown Client"}
            </h6>
          </div>
        </div>
      ),
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (services) => services || "N/A",
    },
    {
      title: "Website",
      key: "website",
      render: (_, project) => (
        <a href={project.website} target="_blank" rel="noopener noreferrer">
          {project.website ? "Visit" : "N/A"}
        </a>
      ),
    },
    {
      title: "GitHub",
      key: "ghLink",
      render: (_, project) => (
        <a href={project.ghLink} target="_blank" rel="noopener noreferrer">
          {project.ghLink ? "View" : "N/A"}
        </a>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Total Revenue */}
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <DatabaseOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Total Revenue
                </p>
                <h4 style={{ margin: 0 }}>
                  ${userData?.revenue || 6659}
                  <Tag color="blue" style={{ marginLeft: 8 }}>
                    <HeartFilled /> 8.5%
                  </Tag>
                </h4>
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Orders */}
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <ShoppingOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Total Orders
                </p>
                <h4 style={{ margin: 0 }}>
                  {userData?.orders || 9856}
                  <Tag color="red" style={{ marginLeft: 8 }}>
                    <HeartFilled /> 8.5%
                  </Tag>
                </h4>
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Projects */}
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <MessageOutlined style={{ fontSize: 24, color: "#fa8c16" }} />
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Total Projects
                </p>
                <h4 style={{ margin: 0 }}>
                  {projects?.length || 0}
                  <Link to="/projects/add">
                    <Tag
                      color="default"
                      style={{ marginLeft: 8, cursor: "pointer" }}
                    >
                      ADD NEW
                    </Tag>
                  </Link>
                </h4>
              </div>
            </div>
          </Card>
        </Col>

        {/* Total Blogs */}
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <UserAddOutlined style={{ fontSize: 24, color: "#52c41a" }} />
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "#595959" }}>
                  Total Blogs
                </p>
                <h4 style={{ margin: 0 }}>
                  {blogs?.length || 0}
                  <Link to="/blogs/create">
                    <Tag
                      color="default"
                      style={{ marginLeft: 8, cursor: "pointer" }}
                    >
                      ADD NEW
                    </Tag>
                  </Link>
                </h4>
              </div>
            </div>
          </Card>
        </Col>

        {/* Category Slider */}
        <Col xs={24} xl={12}>
          <Card title="Category">
            {categories.length > 0 ? (
              <Carousel dots autoplay>
                {categories.map((category) => (
                  <div key={category._id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: 16,
                      }}
                    >
                      <Link
                        to={`/category/${category.name
                          .toLowerCase()
                          .replace(/ & /g, "-")}`}
                        style={{ fontSize: 24, color: "#1890ff" }}
                      >
                        {categoryImageMap[category.name] || <CodeOutlined />}
                      </Link>
                      <Link
                        to={`/category/${category.name
                          .toLowerCase()
                          .replace(/ & /g, "-")}`}
                        style={{ fontSize: 16, fontWeight: "bold" }}
                      >
                        {category.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div style={{ padding: 16, textAlign: "center" }}>
                No categories available
              </div>
            )}
          </Card>
        </Col>

        {/* To Do List */}
        <Col xs={24} xl={12}>
          <Card title="To Do List">
            <div style={{ padding: "0 16px" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {todos?.slice(0, 4).map((todo, index) => (
                  <li
                    key={todo._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 0",
                    }}
                  >
                    <Checkbox checked={todo.completed} disabled>
                      {todo.content}
                    </Checkbox>
                    <p style={{ margin: 0, color: "#595959", fontSize: 12 }}>
                      {todo.createdAt
                        ? new Date(todo.createdAt).toLocaleDateString()
                        : "8 Hours"}
                    </p>
                  </li>
                ))}
                {todos.length === 0 && (
                  <li style={{ padding: "8px 0" }}>
                    <p style={{ margin: 0, color: "#595959" }}>
                      No tasks available
                    </p>
                  </li>
                )}
                <li style={{ padding: "8px 0" }}>
                  <Form
                    form={form}
                    onFinish={handleAddTask}
                    layout="inline"
                    initialValues={{ content: "" }}
                  >
                    <Form.Item
                      name="content"
                      style={{ flex: 1 }}
                      rules={[
                        { required: true, message: "Task cannot be empty" },
                      ]}
                    >
                      <Input
                        placeholder="Enter Task Name"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onPressEnter={form.submit}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Add Task
                      </Button>
                    </Form.Item>
                  </Form>
                </li>
              </ul>
            </div>
          </Card>
        </Col>

        {/* Recent Queries */}
        <Col xs={24} xl={12}>
          <Card
            title="Recent Queries"
            extra={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>Sort By:</span>
                <Select defaultValue="Today" style={{ width: 120 }}>
                  <Option value="Today">Today</Option>
                  <Option value="This Week">This Week</Option>
                  <Option value="This Month">This Month</Option>
                </Select>
              </div>
            }
          >
            <Table
              columns={queryColumns}
              dataSource={queries.data?.slice(0, 4)}
              rowKey="_id"
              pagination={false}
              locale={{ emptyText: "No queries available" }}
            />
          </Card>
        </Col>

        {/* Top Projects */}
        <Col xs={24} xl={12}>
          <Card
            title="Top Projects"
            extra={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>Sort By:</span>
                <Select defaultValue="Today" style={{ width: 120 }}>
                  <Option value="Today">Today</Option>
                  <Option value="This Week">This Week</Option>
                  <Option value="This Month">This Month</Option>
                </Select>
              </div>
            }
          >
            <Table
              columns={projectColumns}
              dataSource={projects?.slice(0, 3)}
              rowKey="_id"
              pagination={false}
              locale={{ emptyText: "No projects available" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

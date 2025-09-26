import React, { useState, useEffect } from "react";
import { FaReply, FaSearch, FaStar, FaFlag, FaTrash } from "react-icons/fa";
import { useGetAllContactsQuery } from "../api/contactApi";
import {
  Card,
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Avatar,
  Tooltip,
  Space,
  Typography,
  Tag,
} from "antd";
import {
  StarOutlined,
  StarFilled,
  FlagOutlined,
  FlagFilled,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import DeleteModal from "../components/Common/DeleteModal";

const { Title, Text } = Typography;

const Queries = () => {
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const queriesPerPage = 20;

  // Fetch queries using RTK Query
  const {
    data: queries = { data: [] },
    isLoading,
    isError,
  } = useGetAllContactsQuery();

  // Handle search filter
  useEffect(() => {
    if (queries.data) {
      const lowerSearch = searchTerm.toLowerCase();
      const results = queries.data.filter(
        (query) =>
          query.name.toLowerCase().includes(lowerSearch) ||
          query.email.toLowerCase().includes(lowerSearch)
      );
      setFilteredQueries(results);
      setCurrentPage(1);
    }
  }, [searchTerm, queries]);

  // Pagination
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = filteredQueries.slice(
    indexOfFirstQuery,
    indexOfLastQuery
  );
  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handlers
  const handleViewMessage = (query) => {
    setSelectedQuery(query);
    setShowMessageModal(true);
  };

  const handleReply = (query) => {
    const subject = encodeURIComponent(`Re: ${query.subject || "Your Query"}`);
    const body = encodeURIComponent(
      `Dear ${query.name},\n\nThank you for your query. [Your response here]\n\nRegards,\n[Your Name]`
    );
    window.location.href = `mailto:${query.email}?subject=${subject}&body=${body}`;
    setShowMessageModal(false);
    setSelectedQuery(null);
  };

  // Table columns for Ant Design
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar
            src={record.avatar || "/assets/img/modern-ai-image/user-2.jpg"}
            alt={record.name}
          >
            {record.name && record.name[0]}
          </Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text copyable>{text}</Text>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => text || <Tag color="default">No Subject</Tag>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <>
          <Text>{new Date(date).toLocaleDateString()}</Text>{" "}
          <Text type="secondary">{new Date(date).toLocaleTimeString()}</Text>
        </>
      ),
    },
    {
      title: "Option",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Message">
            <Button
              icon={<EyeOutlined />}
              type="text"
              onClick={() => handleViewMessage(record)}
            />
          </Tooltip>
          <Tooltip title="Reply">
            <Button
              icon={<FaReply />}
              type="text"
              onClick={() => handleReply(record)}
            />
          </Tooltip>
          <Tooltip title={record.isStarred ? "Unstar" : "Star"}>
            <Button
              icon={
                record.isStarred ? (
                  <StarFilled style={{ color: "#faad14" }} />
                ) : (
                  <StarOutlined />
                )
              }
              type="text"
              // Add onClick to handle star toggling if you implement it
            />
          </Tooltip>
          <Tooltip title={record.isFlagged ? "Unflag" : "Flag"}>
            <Button
              icon={
                record.isFlagged ? (
                  <FlagFilled style={{ color: "#faad14" }} />
                ) : (
                  <FlagOutlined />
                )
              }
              type="text"
              // Add onClick to handle flag toggling if you implement it
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              type="text"
              danger
              // Add onClick to handle delete if you implement it
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <Title level={5} style={{ marginBottom: 0 }}>
            Query List
          </Title>
        }
        extra={
          <Input
            prefix={<FaSearch />}
            placeholder="Search queries..."
            style={{ width: 260 }}
            allowClear
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        }
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={currentQueries}
          loading={isLoading}
          rowKey={(record) => record._id}
          pagination={false}
          locale={{
            emptyText: isError ? (
              <Text type="danger">Error loading queries</Text>
            ) : (
              "No queries found."
            ),
          }}
        />
        {totalPages > 1 && (
          <div style={{ textAlign: "center", margin: "24px 0" }}>
            <Pagination
              current={currentPage}
              total={filteredQueries.length}
              pageSize={queriesPerPage}
              onChange={paginate}
              showSizeChanger={false}
            />
          </div>
        )}
      </Card>

      {/* Message Modal */}
      <Modal
        open={showMessageModal && !!selectedQuery}
        onCancel={() => setShowMessageModal(false)}
        footer={null}
        width={600}
        centered
        title={
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setShowMessageModal(false)}
            />
            <Space>
              <Button
                icon={
                  selectedQuery?.isStarred ? (
                    <StarFilled style={{ color: "#faad14" }} />
                  ) : (
                    <StarOutlined />
                  )
                }
                type="text"
              />
              <Button
                icon={
                  selectedQuery?.isFlagged ? (
                    <FlagFilled style={{ color: "#faad14" }} />
                  ) : (
                    <FlagOutlined />
                  )
                }
                type="text"
              />
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Space>
          </Space>
        }
      >
        {selectedQuery && (
          <>
            <Space align="start" size={16}>
              <Avatar
                size={60}
                src={
                  selectedQuery.avatar ||
                  "/assets/img/modern-ai-image/user-2.jpg"
                }
                alt={selectedQuery.name}
              >
                {selectedQuery.name && selectedQuery.name[0]}
              </Avatar>
              <div>
                <Title level={5} style={{ margin: 0 }}>
                  {selectedQuery.name}
                </Title>
                <Text copyable>{selectedQuery.email}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {new Date(selectedQuery.createdAt).toLocaleDateString()}{" "}
                  {new Date(selectedQuery.createdAt).toLocaleTimeString()}
                </Text>
              </div>
            </Space>
            <div style={{ marginTop: 16 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Subject
              </Text>
              <Title level={5} style={{ margin: 0 }}>
                {selectedQuery.subject || "No Subject"}
              </Title>
            </div>
            <div style={{ marginTop: 12, marginBottom: 16 }}>
              <Text>{selectedQuery.message}</Text>
            </div>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button
                icon={<DeleteOutlined />}
                type="default"
                danger
                onClick={() => setShowMessageModal(false)}
              >
                Close
              </Button>
              <Button
                type="primary"
                icon={<FaReply />}
                onClick={() => handleReply(selectedQuery)}
              >
                Reply
              </Button>
            </Space>
          </>
        )}
      </Modal>
    </>
  );
};

export default Queries;

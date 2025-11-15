import React, { useState, useEffect, useMemo } from "react";
import { FaReply, FaSearch } from "react-icons/fa";
import {
  useGetAllContactsQuery,
  useStarContactMutation,
  useFlagContactMutation,
  useDeleteContactMutation,
} from "../api/contactApi";
import {
  Card,
  Input,
  List,
  Avatar,
  Tag,
  Space,
  Typography,
  Button,
  Modal,
  Empty,
  Badge,
  Tooltip,
  Dropdown,
  Menu,
  Pagination,
} from "antd";
import {
  StarOutlined,
  StarFilled,
  FlagOutlined,
  FlagFilled,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import DeleteModal from "../components/Common/DeleteModal";

const { Text } = Typography;

const Queries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const queriesPerPage = 20;

  const { data: response = { data: [] }, isLoading } = useGetAllContactsQuery();
  const queries = response.data || [];

  const [star] = useStarContactMutation();
  const [flag] = useFlagContactMutation();
  const [remove] = useDeleteContactMutation();

  // === Search Filter ===
  const filtered = useMemo(() => {
    if (!searchTerm) return queries;
    const lower = searchTerm.toLowerCase();
    return queries.filter(
      (q) =>
        q.name.toLowerCase().includes(lower) ||
        q.email.toLowerCase().includes(lower) ||
        (q.subject && q.subject.toLowerCase().includes(lower))
    );
  }, [queries, searchTerm]);

  // === Pagination Logic ===
  const totalQueries = filtered.length;
  const indexOfLast = currentPage * queriesPerPage;
  const indexOfFirst = indexOfLast - queriesPerPage;
  const currentQueries = filtered.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // === Handlers ===
  const handleReply = (q) => {
    const subject = encodeURIComponent(`Re: ${q.subject || "Your Query"}`);
    const body = encodeURIComponent(
      `Dear ${q.name},\n\nThank you for reaching out.\n\nBest,\n[Your Name]`
    );
    window.location.href = `mailto:${q.email}?subject=${subject}&body=${body}`;
  };

  const toggleStar = (id, current) => star({ id, isStarred: !current });
  const toggleFlag = (id, current) => flag({ id, isFlagged: !current });

  const openDelete = (q) => {
    setSelectedQuery(q);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    await remove(selectedQuery._id).unwrap();
    setDeleteModal(false);
    setSelectedQuery(null);
  };

  // === Dropdown ===
  const getMenu = (q) => (
    <Menu>
      <Menu.Item icon={<EyeOutlined />} onClick={() => setSelectedQuery(q)}>
        View Message
      </Menu.Item>
      <Menu.Item
        icon={q.isStarred ? <StarFilled /> : <StarOutlined />}
        onClick={() => toggleStar(q._id, q.isStarred)}
      >
        {q.isStarred ? "Unstar" : "Star"}
      </Menu.Item>
      <Menu.Item
        icon={q.isFlagged ? <FlagFilled /> : <FlagOutlined />}
        onClick={() => toggleFlag(q._id, q.isFlagged)}
      >
        {q.isFlagged ? "Unflag" : "Flag"}
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} danger onClick={() => openDelete(q)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  // === Time Ago ===
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div style={{ padding: "16px", background: "#f5f5f5", minHeight: "100vh" }}>
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}
        >
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Space size="middle">
              <Text strong style={{ fontSize: 18 }}>
                Inbox
              </Text>
              <Badge
                count={totalQueries}
                style={{ backgroundColor: "#1890ff" }}
              />
            </Space>
            <Input
              prefix={<FaSearch style={{ color: "#8c8c8c" }} />}
              placeholder="Search name, email, subject..."
              allowClear
              style={{ width: 300 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Space>
        </div>

        {/* Email List */}
        <List
          loading={isLoading}
          dataSource={currentQueries}
          locale={{ emptyText: <Empty description="No queries found" /> }}
          renderItem={(q) => (
            <List.Item
              style={{
                padding: "12px 20px",
                borderBottom: "1px solid #f0f0f0",
                background: q.isStarred ? "#fffbe6" : "white",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onClick={() => setSelectedQuery(q)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={q.avatar || "/assets/img/modern-ai-image/user-2.jpg"}
                    size={40}
                  >
                    {q.name[0]}
                  </Avatar>
                }
                title={
                  <Space size={8}>
                    <Text strong style={{ fontSize: 15 }}>
                      {q.name}
                    </Text>
                    {q.isFlagged && <FlagFilled style={{ color: "#fa541c" }} />}
                    {q.isStarred && <StarFilled style={{ color: "#faad14" }} />}
                  </Space>
                }
                description={
                  <Space
                    direction="vertical"
                    size={0}
                    style={{ width: "100%" }}
                  >
                    <Space
                      style={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <Text ellipsis style={{ maxWidth: 300 }}>
                        <strong>{q.subject || "(no subject)"}</strong>
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {timeAgo(q.createdAt)}
                      </Text>
                    </Space>
                    <Text
                      ellipsis
                      style={{ color: "#8c8c8c", fontSize: 13, maxWidth: 500 }}
                    >
                      {q.message}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {q.email}
                    </Text>
                  </Space>
                }
              />

              {/* Actions */}
              <Space onClick={(e) => e.stopPropagation()}>
                <Tooltip title="Reply">
                  <Button
                    type="text"
                    icon={<FaReply />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(q);
                    }}
                    style={{ color: "#1890ff" }}
                  />
                </Tooltip>

                <Dropdown overlay={getMenu(q)} trigger={["click"]}>
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: 18, color: "#8c8c8c" }}
                  />
                </Dropdown>
              </Space>
            </List.Item>
          )}
        />

        {/* Pagination */}
        {totalQueries > queriesPerPage && (
          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid #f0f0f0",
              textAlign: "center",
            }}
          >
            <Pagination
              current={currentPage}
              total={totalQueries}
              pageSize={queriesPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper={totalQueries > 100}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} queries`
              }
            />
          </div>
        )}
      </Card>

      {/* Full Email Modal */}
      <Modal
        open={!!selectedQuery}
        onCancel={() => setSelectedQuery(null)}
        footer={null}
        width={700}
        centered
        title={null}
        closeIcon={<Button type="text" icon={<CloseOutlined />} />}
      >
        {selectedQuery && (
          <div style={{ padding: "8px 0" }}>
            <Space
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Space size="middle">
                <Avatar size={56} src={selectedQuery.avatar}>
                  {selectedQuery.name[0]}
                </Avatar>
                <div>
                  <Text strong style={{ fontSize: 18 }}>
                    {selectedQuery.name}
                  </Text>
                  <br />
                  <Text type="secondary">{selectedQuery.email}</Text>
                </div>
              </Space>
              <Space>
                <Button
                  icon={
                    selectedQuery.isStarred ? <StarFilled /> : <StarOutlined />
                  }
                  onClick={() =>
                    toggleStar(selectedQuery._id, selectedQuery.isStarred)
                  }
                />
                <Button
                  icon={
                    selectedQuery.isFlagged ? <FlagFilled /> : <FlagOutlined />
                  }
                  onClick={() =>
                    toggleFlag(selectedQuery._id, selectedQuery.isFlagged)
                  }
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    setSelectedQuery(null);
                    openDelete(selectedQuery);
                  }}
                />
              </Space>
            </Space>

            <div
              style={{
                margin: "16px 0",
                paddingBottom: 12,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Text strong style={{ fontSize: 16 }}>
                {selectedQuery.subject || "(no subject)"}
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {new Date(selectedQuery.createdAt).toLocaleString("en-IN")}
              </Text>
            </div>

            <div style={{ margin: "20px 0", lineHeight: 1.7, fontSize: 15 }}>
              <Text>{selectedQuery.message}</Text>
            </div>

            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setSelectedQuery(null)}>Close</Button>
              <Button
                type="primary"
                icon={<FaReply />}
                onClick={() => handleReply(selectedQuery)}
              >
                Reply
              </Button>
            </Space>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
        itemName={selectedQuery?.name || "query"}
      />
    </div>
  );
};

export default Queries;

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Button, Modal, Alert, Spin } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Avatar from "react-avatar";
import { useGetUsersQuery, useDeleteUserMutation } from "../api/userApi";

// DeleteModal Component
const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Modal
      open={isOpen}
      title="Confirm Delete"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
      centered
    >
      <p>Are you sure you want to delete the user "{itemName}"?</p>
    </Modal>
  );
};

const AllUsers = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users using the useGetUsersQuery hook
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  // Mutation hook for deleting users
  const [deleteUser] = useDeleteUserMutation();

  // Handle delete action
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUser.id).unwrap();
      setDeleteModalOpen(false);
      setSelectedUser(null);
      Modal.success({ content: "User deleted successfully!" });
    } catch (error) {
      console.error("Error deleting user:", error);
      Modal.error({
        content: `Failed to delete user: ${
          error?.data?.message || "Unknown error"
        }`,
      });
    }
  };

  // Table columns
  const columns = useMemo(
    () => [
      {
        title: "User",
        key: "photo",
        render: (_, user) => (
          <Avatar
            src={user.photo}
            name={user.username || user.email || "Unknown"}
            size="40"
            round={true}
            alt={`${user.username || user.email}'s avatar`}
            maxInitials={2}
            textSizeRatio={2.5}
            color={Avatar.getRandomColor("sitebase", {
              lightness: [0.4, 0.5, 0.6],
              saturation: [0.4, 0.5, 0.6],
            })}
            onError={() =>
              console.warn(`Failed to load avatar for ${user.username}`)
            }
          />
        ),
      },
      {
        title: "Name",
        dataIndex: "username",
        key: "username",
        render: (username) => username || "N/A",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (email) => email || "N/A",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (role) => role || "N/A",
      },
      {
        title: "Option",
        key: "option",
        render: (_, user) => (
          <div style={{ display: "flex", gap: 8 }}>
            <Link to={`/users/${user.id}`}>
              <Button type="link" icon={<EyeOutlined />} title="View Details" />
            </Link>
            <Link to={`/users/edit/${user.id}`}>
              <Button type="link" icon={<EditOutlined />} title="Edit User" />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteClick(user)}
              title="Delete User"
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="All Users"
            extra={
              <Link to="/users/add">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add New
                </Button>
              </Link>
            }
          >
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="large" />
                <p style={{ marginTop: 8 }}>Loading...</p>
              </div>
            ) : error ? (
              <Alert
                message="Error"
                description={
                  error?.data?.message || error?.error || "Failed to load users"
                }
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            ) : users.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                No users found
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={false}
                locale={{ emptyText: "No users found" }}
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
        itemName={selectedUser?.username || selectedUser?.email || "user"}
      />
    </div>
  );
};

export default AllUsers;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Button, Image, Modal, Alert, Spin } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery, useDeleteUserMutation } from "../api/userApi";

// DeleteModal Component (added for delete functionality)
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
      Modal.error({ content: "Failed to delete user." });
    }
  };

  // Table columns
  const columns = [
    {
      title: "User",
      key: "photo",
      render: (_, user) => (
        <Image
          src={user.photo || "assets/images/users/default.jpg"}
          alt={user.username}
          style={{ maxWidth: 50, borderRadius: "50%" }}
          preview={false}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Option",
      key: "option",
      render: (_, user) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/users/${user.id}`}>
            <Button type="link" icon={<EyeOutlined />} />
          </Link>
          <Link to={`/users/edit/${user.id}`}>
            <Button type="link" icon={<EditOutlined />} />
          </Link>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteClick(user)}
          />
        </div>
      ),
    },
  ];

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
                description={error.data?.message || "Failed to load users"}
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
        itemName={selectedUser?.username || "user"}
      />
    </div>
  );
};

export default AllUsers;

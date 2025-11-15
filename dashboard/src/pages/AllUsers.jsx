import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Alert,
  Spin,
  Dropdown,
  Menu,
  Space,
} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Avatar from "react-avatar";
import { useGetUsersQuery, useDeleteUserMutation } from "../api/userApi";

// DeleteModal Component
const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => (
  <Modal
    open={isOpen}
    title="Confirm Delete"
    onCancel={onClose}
    centered
    footer={[
      <Button key="cancel" onClick={onClose}>
        Cancel
      </Button>,
      <Button key="confirm" type="primary" danger onClick={onConfirm}>
        Delete
      </Button>,
    ]}
  >
    <p>
      Are you sure you want to delete the user "<strong>{itemName}</strong>"?
    </p>
  </Modal>
);

const AllUsers = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

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
      Modal.error({
        content: `Failed: ${error?.data?.message || "Unknown error"}`,
      });
    }
  };

  // Dropdown menu for each row
  const getMenu = (user) => (
    <Menu>
      <Menu.Item
        key="view"
        icon={<EyeOutlined />}
        onClick={() => window.open(`/users/${user.id}`, "_blank")}
      >
        View Details
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDeleteClick(user)}
      >
        Delete User
      </Menu.Item>
    </Menu>
  );

  const columns = useMemo(
    () => [
      {
        title: "User",
        key: "photo",
        width: 70,
        render: (_, user) => (
          <Avatar
            src={user.photo}
            name={user.username || user.email}
            size="40"
            round
            maxInitials={2}
            color={Avatar.getRandomColor("sitebase", {
              lightness: [0.4, 0.5, 0.6],
              saturation: [0.4, 0.5, 0.6],
            })}
          />
        ),
      },
      {
        title: "Name",
        dataIndex: "username",
        key: "username",
        render: (text) => text || "N/A",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <a href={`mailto:${text}`}>{text || "N/A"}</a>,
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (text) => (
          <span style={{ textTransform: "capitalize" }}>{text || "N/A"}</span>
        ),
      },
      {
        title: "Option",
        key: "option",
        width: 120,
        align: "center",
        render: (_, user) => (
          <Space>
            {/* Edit Button - Always Visible */}
            <Link to={`/users/edit/${user.id}`}>
              <Button
                type="link"
                icon={<EditOutlined />}
                title="Edit User"
                style={{ color: "#faad14" }}
              />
            </Link>

            {/* Three-Dot Dropdown */}
            <Dropdown
              overlay={getMenu(user)}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="link"
                icon={<MoreOutlined />}
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: 18, color: "#8c8c8c" }}
              />
            </Dropdown>
          </Space>
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
              <div className="text-center py-8">
                <Spin size="large" />
                <p className="mt-2">Loading users...</p>
              </div>
            ) : error ? (
              <Alert
                message="Error"
                description={error?.data?.message || "Failed to load users"}
                type="error"
                showIcon
                className="mb-4"
              />
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No users found. Click "Add New" to create one!
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={false}
                className="compact-table"
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

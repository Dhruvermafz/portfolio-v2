import React, { useState, useMemo } from "react";
import {
  Card,
  Tag,
  Button,
  Dropdown,
  Menu,
  Space,
  Tooltip,
  Empty,
  Spin,
  message,
  Row,
  Col,
  Alert,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../api/categoryApi";
import DeleteModal from "../components/Common/DeleteModal";
import AddCategoryModal from "../components/Category/AddCategoryModal";
import EditCategoryModal from "../components/Category/EditCategoryModal";
const Categories = () => {
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetAllCategoriesQuery();
  const [create] = useCreateCategoryMutation();
  const [update] = useUpdateCategoryMutation();
  const [remove] = useDeleteCategoryMutation();

  // Toggle status
  const toggleStatus = async (id, current) => {
    try {
      await update({ id, isActive: !current }).unwrap();
      message.success("Status updated");
    } catch {
      message.error("Update failed");
    }
  };

  // Handlers
  const openEdit = (cat) => {
    setSelected(cat);
    setEditOpen(true);
  };

  const openDelete = (cat) => {
    setSelected(cat);
    setDeleteOpen(true);
  };

  const handleAdd = async (data) => {
    try {
      await create(data).unwrap();
      setAddOpen(false);
      message.success("Category added");
    } catch {
      message.error("Failed to add");
    }
  };

  const handleEdit = async (data) => {
    try {
      await update({ id: data._id, ...data }).unwrap();
      setEditOpen(false);
      message.success("Category updated");
    } catch {
      message.error("Failed to update");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(selected._id).unwrap();
      setDeleteOpen(false);
      setSelected(null);
      message.success("Category deleted");
    } catch {
      message.error("Failed to delete");
    }
  };

  // Dropdown Menu
  const getMenu = (cat) => (
    <Menu>
      <Menu.Item
        key="view"
        icon={<EyeOutlined />}
        onClick={() => window.open(`/category/${cat._id}`, "_blank")}
      >
        View Page
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={() => openDelete(cat)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  // Sorted & filtered
  const sortedCategories = useMemo(() => {
    return [...categories].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [categories]);

  return (
    <div style={{ padding: "20px", background: "#f9f9fb", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={
              <Space>
                <span style={{ fontSize: 18, fontWeight: 600 }}>
                  Categories
                </span>
                <Tag color="blue">{categories.length}</Tag>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddOpen(true)}
                size="middle"
              >
                Add Category
              </Button>
            }
            bodyStyle={{ padding: "20px" }}
          >
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Spin size="large" />
              </div>
            ) : error ? (
              <Alert
                message="Failed to load categories"
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            ) : categories.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No categories yet"
                style={{ margin: "40px 0" }}
              >
                <Button type="primary" onClick={() => setAddOpen(true)}>
                  Create First Category
                </Button>
              </Empty>
            ) : (
              <Space wrap size={[12, 12]} style={{ width: "100%" }}>
                {sortedCategories.map((cat) => (
                  <Tag
                    key={cat._id}
                    style={{
                      padding: "8px 12px",
                      fontSize: 14,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minWidth: 180,
                      maxWidth: 300,
                      background: cat.isActive ? "#f6ffed" : "#fff2e8",
                      borderColor: cat.isActive ? "#b7eb8f" : "#ffbb96",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Space size={8} style={{ flex: 1, minWidth: 0 }}>
                      {/* Status Icon */}
                      <Tooltip title={cat.isActive ? "Active" : "Inactive"}>
                        {cat.isActive ? (
                          <CheckCircleOutlined style={{ color: "#52c41a" }} />
                        ) : (
                          <StopOutlined style={{ color: "#fa541c" }} />
                        )}
                      </Tooltip>

                      {/* Name */}
                      <span
                        style={{
                          fontWeight: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cat.name}
                      </span>

                      {/* Date */}
                      <small style={{ color: "#8c8c8c", fontSize: 11 }}>
                        {new Date(cat.createdAt).toLocaleDateString("en-IN")}
                      </small>
                    </Space>

                    {/* Actions */}
                    <Space size={4} onClick={(e) => e.stopPropagation()}>
                      {/* Edit Button */}
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(cat);
                        }}
                        style={{ color: "#fa8c16" }}
                      />

                      {/* Dropdown */}
                      <Dropdown
                        overlay={getMenu(cat)}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <Button
                          type="text"
                          size="small"
                          icon={<MoreOutlined />}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontSize: 16, color: "#595959" }}
                        />
                      </Dropdown>

                      {/* Status Toggle */}
                      <Button
                        type="text"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(cat._id, cat.isActive);
                        }}
                        style={{
                          color: cat.isActive ? "#52c41a" : "#fa541c",
                          fontWeight: "bold",
                        }}
                      >
                        {cat.isActive ? "ON" : "OFF"}
                      </Button>
                    </Space>
                  </Tag>
                ))}
              </Space>
            )}
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <AddCategoryModal
        isOpen={isAddOpen}
        onClose={() => setAddOpen(false)}
        onConfirm={handleAdd}
      />

      <EditCategoryModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        onConfirm={handleEdit}
        categoryToEdit={selected}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={selected?.name || "category"}
      />
    </div>
  );
};

export default Categories;

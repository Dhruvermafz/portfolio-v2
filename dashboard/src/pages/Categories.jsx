import React, { useState } from "react";
import { Card, Table, Button, Row, Col, Spin, Alert, Checkbox } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
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
import { message } from "antd";
const Categories = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories using RTK Query
  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetAllCategoriesQuery();

  // Mutation hooks
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleStatusChange = async (categoryId, currentStatus) => {
    try {
      await updateCategory({
        id: categoryId,
        isActive: !currentStatus,
      }).unwrap();
      message.success("Category status updated successfully!");
    } catch (error) {
      console.error("Error updating status", error);
      message.error("Failed to update category status.");
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      setDeleteModalOpen(false);
      message.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category", error);
      message.error("Failed to delete category.");
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      await createCategory(newCategory).unwrap();
      setAddCategoryModalOpen(false);
      message.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category", error);
      message.error("Failed to add category.");
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditCategoryModalOpen(true);
  };

  const handleEditConfirm = async (updatedCategory) => {
    try {
      await updateCategory({
        id: updatedCategory._id,
        ...updatedCategory,
      }).unwrap();
      setEditCategoryModalOpen(false);
      message.success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category", error);
      message.error("Failed to update category.");
    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text || "N/A",
    },
    {
      title: "Slug",
      key: "slug",
      render: (_, record) => record.slug || record.name.toLowerCase(),
    },
    {
      title: "Status",
      key: "isActive",
      render: (_, record) => (
        <Checkbox
          checked={record.isActive}
          onChange={() => handleStatusChange(record._id, record.isActive)}
        >
          Active
        </Checkbox>
      ),
    },
    {
      title: "Option",
      key: "option",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <a href={`/category/${record._id}`} style={{ color: "#1890ff" }}>
            <EyeOutlined />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleEditClick(record);
            }}
            style={{ color: "#faad14" }}
          >
            <EditOutlined />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteClick(record);
            }}
            style={{ color: "#ff4d4f" }}
          >
            <DeleteOutlined />
          </a>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="All Category"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddCategoryModalOpen(true)}
              >
                Add New
              </Button>
            }
          >
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Spin size="large" />
                <p style={{ marginTop: 8 }}>Loading categories...</p>
              </div>
            ) : error ? (
              <Alert
                message="Error"
                description={`Error fetching categories: ${error.message}`}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            ) : (
              <Table
                columns={columns}
                dataSource={categories}
                rowKey="_id"
                locale={{
                  emptyText: (
                    <div style={{ padding: "20px", textAlign: "center" }}>
                      No categories found. Add a new category to get started!
                    </div>
                  ),
                }}
                pagination={false}
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
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setAddCategoryModalOpen(false)}
        onConfirm={handleAddCategory}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => setEditCategoryModalOpen(false)}
        onConfirm={handleEditConfirm}
        categoryToEdit={selectedCategory}
      />
    </div>
  );
};

export default Categories;

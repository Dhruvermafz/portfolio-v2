import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, Checkbox } from "antd";
import {
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../api/categoryApi";

const { Option } = Select;

const EditCategoryModal = ({ isOpen, onClose, onConfirm, categoryToEdit }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [status, setStatus] = useState(true);
  const [isParentCategory, setIsParentCategory] = useState(false);

  const {
    data: parentCategories = [],
    error,
    isLoading,
  } = useGetAllCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setParentCategory(categoryToEdit.parentCategory || "");
      setStatus(categoryToEdit.isActive);
      setIsParentCategory(categoryToEdit.isParent || false);
    }
  }, [categoryToEdit]);

  const handleSubmit = async () => {
    try {
      const updatedCategory = {
        name,
        parentCategory: isParentCategory ? null : parentCategory,
        isActive: status,
        isParent: isParentCategory,
      };
      const response = await updateCategory({
        id: categoryToEdit._id,
        ...updatedCategory,
      }).unwrap();
      onConfirm(response);
      onClose();
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <Modal
      title="Edit Category"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSubmit}>
          Save Changes
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Category Name" required>
          <Input
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={isParentCategory}
            onChange={() => setIsParentCategory(!isParentCategory)}
          >
            Is Parent Category
          </Checkbox>
        </Form.Item>

        {!isParentCategory && (
          <Form.Item label="Parent Category">
            <Select
              value={parentCategory}
              onChange={(value) => setParentCategory(value)}
              allowClear
            >
              <Option value="">None</Option>
              {parentCategories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <Checkbox checked={status} onChange={() => setStatus(!status)}>
            Active
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;

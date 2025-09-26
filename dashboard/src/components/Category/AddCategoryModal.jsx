import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Spin,
  Alert,
  Select,
  Checkbox,
} from "antd";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../api/categoryApi";
import "./category.css"; // Create or update this CSS to match AntD styling

const { Option } = Select;

const AddCategoryModal = ({ isOpen, onClose, onConfirm }) => {
  const [form] = Form.useForm();
  const [isParentCategory, setIsParentCategory] = useState(false);
  const [error, setError] = useState("");

  // Using useCreateCategoryMutation to create a new category
  const [createCategory, { isLoading: isCreating, isError }] =
    useCreateCategoryMutation();

  // Using useGetAllCategoriesQuery to fetch all parent categories
  const {
    data: parentCategories,
    isLoading: isLoadingParentCategories,
    error: parentCategoriesError,
  } = useGetAllCategoriesQuery();

  // Handle category loading errors
  useEffect(() => {
    if (parentCategoriesError) {
      setError("Error fetching parent categories");
      console.error("Error fetching parent categories", parentCategoriesError);
    }
  }, [parentCategoriesError]);

  const handleSubmit = async (values) => {
    setError("");
    try {
      const newCategory = {
        name: values.name,
        parentCategory: isParentCategory ? null : values.parentCategory || null,
        isActive: values.status || false,
      };

      const result = await createCategory(newCategory).unwrap();
      onConfirm(result); // Pass the newly created category data to the parent component
      form.resetFields();
      setIsParentCategory(false);
      onClose();
    } catch (error) {
      setError("Failed to add category");
      console.error("Error adding category", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      title="Add New Category"
      onCancel={onClose}
      footer={null}
      centered
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      {isLoadingParentCategories ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="default" />
          <span style={{ marginLeft: 8 }}>Loading Parent Categories...</span>
        </div>
      ) : (
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ status: true }}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item name="isParentCategory" valuePropName="checked">
            <Checkbox onChange={(e) => setIsParentCategory(e.target.checked)}>
              Is Parent Category
            </Checkbox>
          </Form.Item>

          {!isParentCategory && parentCategories && (
            <Form.Item label="Parent Category" name="parentCategory">
              <Select placeholder="Select parent category" allowClear>
                <Option value="">None</Option>
                {parentCategories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Active</Checkbox>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={onClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isCreating}>
              Add Category
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default AddCategoryModal;

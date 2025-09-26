import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Alert } from "antd";
import "./achievement.css"; // Update this CSS to match AntD styling

const AddAchievementModal = ({
  isOpen,
  onClose,
  onConfirm,
  achievementToEdit,
  isEditMode,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  // Pre-populate form fields when editing
  useEffect(() => {
    if (isEditMode && achievementToEdit) {
      form.setFieldsValue({
        title: achievementToEdit.title || "",
        description: achievementToEdit.description || "",
        details: achievementToEdit.details || "",
      });
    } else {
      form.resetFields();
    }
  }, [isEditMode, achievementToEdit, form]);

  const handleSubmit = (values) => {
    setError("");
    onConfirm(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      title={isEditMode ? "Edit Achievement" : "Add New Achievement"}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        id="achievement-modal-form"
        className="json-modal-form"
      >
        <div className="json-object">
          <div className="json-brace">{"{"}</div>
          <div className="json-content">
            <div className="json-field">
              <label className="json-key">"title":</label>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "Title is required" }]}
                noStyle
              >
                <Input
                  placeholder="Enter achievement title"
                  className="json-value"
                />
              </Form.Item>
            </div>
            <div className="json-field">
              <label className="json-key">"description":</label>
              <Form.Item
                name="description"
                rules={[{ required: true, message: "Description is required" }]}
                noStyle
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter achievement description"
                  className="json-value"
                />
              </Form.Item>
            </div>
            <div className="json-field">
              <label className="json-key">"details":</label>
              <Form.Item
                name="details"
                rules={[{ required: true, message: "Details are required" }]}
                noStyle
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Enter achievement details"
                  className="json-value"
                />
              </Form.Item>
            </div>
          </div>
          <div className="json-brace">{"}"}</div>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginTop: 16 }}
          />
        )}
      </Form>
      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Button
          style={{ marginRight: 8 }}
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          form="achievement-modal-form"
          loading={isLoading}
        >
          {isEditMode ? "Save Changes" : "Add Achievement"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddAchievementModal;

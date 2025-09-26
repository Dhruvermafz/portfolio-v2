import React from "react";
import { Modal, Typography, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
  loading = false,
  confirmText = "Yes",
  cancelText = "No",
  description = "The permission for the use/group, preview is inherited from the object, object will create a new permission for this object",
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      closable
      closeIcon={<CloseOutlined />}
      footer={null}
      title={
        <div style={{ textAlign: "center", width: "100%" }}>
          <Title level={5} style={{ margin: 0 }}>
            Are You Sure?
          </Title>
        </div>
      }
      bodyStyle={{ textAlign: "center", paddingTop: 18 }}
      destroyOnClose
    >
      <Paragraph style={{ marginBottom: 32, color: "#666" }}>
        {description}
      </Paragraph>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <Button
          onClick={onCancel}
          type="default"
          size="middle"
          style={{ minWidth: 80 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          type="primary"
          danger
          size="middle"
          loading={loading}
          style={{ minWidth: 80 }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;

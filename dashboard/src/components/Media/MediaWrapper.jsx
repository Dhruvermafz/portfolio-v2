// MediaLibrary.jsx
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Checkbox,
  Button,
  Space,
  Typography,
  message,
  Upload,
  Modal,
  Empty,
  Dropdown,
  Menu,
} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
  FileOutlined,
  InboxOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const MediaLibrary = () => {
  // --- Media State ---
  const [media, setMedia] = useState([
    {
      id: "1",
      url: "https://via.placeholder.com/300x200/4A90E2/ffffff?text=Image+1",
      name: "hero-banner.jpg",
      type: "image",
    },
    {
      id: "2",
      url: "https://via.placeholder.com/300x200/50C878/ffffff?text=Image+2",
      name: "logo.png",
      type: "image",
    },
    {
      id: "3",
      url: "https://via.placeholder.com/300x200/F5A623/ffffff?text=PDF",
      name: "report.pdf",
      type: "file",
    },
  ]);

  const [selected, setSelected] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // --- Selection Helpers ---
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelected([]);

  // --- Bulk Actions ---
  const bulkDownload = () => {
    message.info(`Downloading ${selected.length} item(s)`);
  };

  const bulkDelete = () => {
    Modal.confirm({
      title: `Delete ${selected.length} item(s)?`,
      content: "This action cannot be undone.",
      onOk: () => {
        setMedia((prev) => prev.filter((m) => !selected.includes(m.id)));
        clearSelection();
        message.success("Deleted");
      },
    });
  };

  // --- Single Item Actions ---
  const downloadItem = (item) => {
    if (item.type === "image") {
      const a = document.createElement("a");
      a.href = item.url;
      a.download = item.name;
      a.click();
    } else {
      message.info(`Download: ${item.name}`);
    }
  };

  const deleteItem = (id) => {
    Modal.confirm({
      title: "Delete this file?",
      content: "This action cannot be undone.",
      onOk: () => {
        setMedia((prev) => prev.filter((m) => m.id !== id));
        setSelected((prev) => prev.filter((s) => s !== id));
        message.success("Deleted");
      },
    });
  };

  // --- Upload ---
  const handleUpload = (file) => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      const newItem = {
        id: `media-${Date.now()}`,
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "file",
        size: file.size,
      };
      setMedia((prev) => [newItem, ...prev]);
      message.success(`${file.name} uploaded`);
      setUploading(false);
    }, 800);
    return false; // Prevent default upload
  };

  // --- Preview ---
  const showPreview = (url, title) => {
    setPreviewImage(url);
    setPreviewTitle(title);
    setPreviewVisible(true);
  };

  // --- Dropdown Menu ---
  const getMenu = (item) => (
    <Menu>
      <Menu.Item
        key="view"
        icon={<EyeOutlined />}
        onClick={() =>
          item.type === "image" && showPreview(item.url, item.name)
        }
        disabled={item.type !== "image"}
      >
        View
      </Menu.Item>
      <Menu.Item
        key="download"
        icon={<DownloadOutlined />}
        onClick={() => downloadItem(item)}
      >
        Download
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={() => deleteItem(item.id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "20px", background: "#f9f9fb", minHeight: "100vh" }}>
      <Card bodyStyle={{ padding: 0 }}>
        {/* Header */}
        <div
          style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="middle">
                <Title level={5} style={{ margin: 0 }}>
                  Media Library
                </Title>
                {selected.length > 0 ? (
                  <Space>
                    <Button size="small" onClick={clearSelection}>
                      Cancel
                    </Button>
                    <Text type="secondary">{selected.length} selected</Text>
                    <Button
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={bulkDownload}
                    >
                      Download
                    </Button>
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={bulkDelete}
                    >
                      Delete
                    </Button>
                  </Space>
                ) : (
                  <Text type="secondary">{media.length} items</Text>
                )}
              </Space>
            </Col>
            <Col>
              <Upload
                accept="image/*,application/pdf"
                beforeUpload={handleUpload}
                showUploadList={false}
                multiple
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  loading={uploading}
                >
                  Add New
                </Button>
              </Upload>
            </Col>
          </Row>
        </div>

        {/* Empty State */}
        {media.length === 0 && (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <Empty
              description="No media files"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Upload.Dragger
                beforeUpload={handleUpload}
                showUploadList={false}
                style={{ marginTop: 16 }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Drop files here or click to upload
                </p>
              </Upload.Dragger>
            </Empty>
          </div>
        )}

        {/* Grid */}
        {media.length > 0 && (
          <div style={{ padding: 24 }}>
            <Row gutter={[16, 16]}>
              {media.map((item) => (
                <Col key={item.id} xs={12} sm={8} md={6} lg={4}>
                  <div
                    style={{
                      position: "relative",
                      border: selected.includes(item.id)
                        ? "2px solid #1890ff"
                        : "2px solid transparent",
                      borderRadius: 8,
                      background: "#fff",
                      boxShadow: selected.includes(item.id)
                        ? "0 0 0 2px rgba(24,144,255,0.2)"
                        : "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      if (e.ctrlKey || e.metaKey) {
                        toggleSelect(item.id);
                      } else {
                        toggleSelect(item.id);
                      }
                    }}
                  >
                    {/* Checkbox */}
                    <Checkbox
                      checked={selected.includes(item.id)}
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 10,
                      }}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(item.id);
                      }}
                    />

                    {/* Media */}
                    <div style={{ padding: 12, textAlign: "center" }}>
                      {item.type === "image" ? (
                        <Image
                          src={item.url}
                          alt={item.name}
                          width="100%"
                          height={120}
                          style={{ objectFit: "cover", borderRadius: 6 }}
                          preview={false}
                          onClick={(e) => {
                            e.stopPropagation();
                            showPreview(item.url, item.name);
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: 120,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#f5f5f5",
                            borderRadius: 6,
                          }}
                        >
                          <FileOutlined
                            style={{ fontSize: 32, color: "#8c8c8c" }}
                          />
                          <Text
                            type="secondary"
                            style={{ fontSize: 12, marginTop: 8 }}
                          >
                            {item.name.split(".").pop().toUpperCase()}
                          </Text>
                        </div>
                      )}
                    </div>

                    {/* File Name */}
                    <div
                      style={{
                        padding: "0 12px 8px",
                        fontSize: 12,
                        color: "#595959",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </div>

                    {/* Dropdown */}
                    <Dropdown
                      overlay={getMenu(item)}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Button
                        size="small"
                        icon={<MoreOutlined />}
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          zIndex: 10,
                          background: "rgba(255,255,255,0.9)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Dropdown>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card>

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        centered
      >
        <img
          alt={previewTitle}
          style={{ width: "100%", borderRadius: 8 }}
          src={previewImage}
        />
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={() =>
                downloadItem(media.find((m) => m.url === previewImage))
              }
            >
              Download
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                const item = media.find((m) => m.url === previewImage);
                if (item) {
                  deleteItem(item.id);
                  setPreviewVisible(false);
                }
              }}
            >
              Delete
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default MediaLibrary;

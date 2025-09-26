import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Checkbox,
  Dropdown,
  Button,
  Image,
  Space,
  message,
} from "antd";
import {
  DownloadOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

// Dummy media data for demonstration
const mediaList = [
  {
    id: 1,
    src: "assets/images/product/1.png",
    alt: "media1",
  },
  // Add more media items as needed
];

const MediaWrapper = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDownload = (id) => {
    message.info(`Download media with id: ${id}`);
    // Implement actual download logic here
  };

  const handleDelete = (id) => {
    message.warning(`Delete media with id: ${id}`);
    // Implement actual delete logic here
  };

  const handleBulkDownload = () => {
    message.info(`Download ${selected.length} selected media`);
    // Implement bulk download
  };

  const handleBulkDelete = () => {
    message.warning(`Delete ${selected.length} selected media`);
    // Implement bulk delete
  };

  const mediaMenu = (id) => (
    <Dropdown.Menu>
      <Dropdown.Item
        key="download"
        icon={<DownloadOutlined />}
        onClick={() => handleDownload(id)}
      >
        Download
      </Dropdown.Item>
      <Dropdown.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(id)}
      >
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <div>
      <Card>
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: 16 }}
        >
          <Col>
            <Space align="center">
              <Title level={5} style={{ margin: 0 }}>
                Media Library
              </Title>
              <Button
                icon={<DownloadOutlined />}
                disabled={selected.length === 0}
                onClick={handleBulkDownload}
                style={{ marginLeft: 16 }}
              >
                Download
              </Button>
              <Button
                icon={<DeleteOutlined />}
                danger
                disabled={selected.length === 0}
                onClick={handleBulkDelete}
              >
                Delete
              </Button>
              <span style={{ marginLeft: 16, color: "#888" }}>
                selected({selected.length})
              </span>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />}>
              Add Media
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ minHeight: "180px" }} justify="start">
          {mediaList.map((media) => (
            <Col
              key={media.id}
              xs={12}
              sm={8}
              md={6}
              lg={4}
              xl={4}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card
                hoverable
                bordered
                style={{ width: "100%", padding: 8, borderRadius: 12 }}
                bodyStyle={{ padding: 8 }}
              >
                <Checkbox
                  checked={selected.includes(media.id)}
                  onChange={() => handleSelect(media.id)}
                  style={{ position: "absolute", zIndex: 1 }}
                />
                <div style={{ textAlign: "center", position: "relative" }}>
                  <Image
                    src={media.src}
                    alt={media.alt}
                    width={90}
                    height={90}
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 6,
                      background: "#f6f6f6",
                    }}
                    preview={false}
                  />
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "download",
                          icon: <DownloadOutlined />,
                          label: "Download",
                          onClick: () => handleDownload(media.id),
                        },
                        {
                          key: "delete",
                          icon: <DeleteOutlined />,
                          label: "Delete",
                          onClick: () => handleDelete(media.id),
                        },
                      ],
                    }}
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <Button
                      shape="circle"
                      icon={<MoreOutlined />}
                      size="small"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    />
                  </Dropdown>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default MediaWrapper;

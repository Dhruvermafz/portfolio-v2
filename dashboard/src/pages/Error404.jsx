import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Typography, Row, Col } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import NotFoundSVG from "../assets/images/404_error.webp"; // Replace with actual path

const { Title, Text } = Typography;

const Error404 = () => {
  return (
    <div
      id="main-content"
      style={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #23243a 60%, #1e1e1e 100%)",
        padding: "0 0 40px 0",
      }}
    >
      <Card
        bordered={false}
        style={{
          maxWidth: 560,
          margin: "0 auto",
          width: "100%",
          background: "rgba(34, 38, 53, 0.98)",
          boxShadow: "0 6px 32px rgba(40,50,95,0.12)",
          borderRadius: 16,
          padding: "36px 26px",
          position: "relative",
        }}
        bodyStyle={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Row align="middle" justify="center" style={{ textAlign: "center" }}>
          <Col span={24}>
            {/* Animated background video (optional) */}

            <Title
              level={1}
              style={{
                fontWeight: 900,
                fontSize: 80,
                color: "#ff4d4f",
                margin: "24px 0 10px 0",
                letterSpacing: 4,
                lineHeight: 1,
                zIndex: 1,
              }}
            >
              4
              <span
                style={{
                  fontSize: 70,
                  color: "#ffb800",
                  verticalAlign: "middle",
                  margin: "0 6px",
                }}
                role="img"
                aria-label="wrench"
              >
                🛠️
              </span>
              4
            </Title>
            <Title
              level={2}
              style={{
                color: "#fff",
                fontWeight: 700,
                margin: "0 0 12px 0",
                zIndex: 1,
              }}
            >
              Something went wrong!
            </Title>
            <Text
              style={{
                fontSize: 18,
                color: "#e7e7e7",
                marginBottom: 8,
                display: "block",
                zIndex: 1,
              }}
            >
              Link is broken or page removed
            </Text>
            <Text
              type="secondary"
              style={{
                display: "block",
                marginBottom: 28,
                opacity: 0.8,
                color: "#c6c7d0",
                zIndex: 1,
              }}
            >
              The page doesn't exist or was removed.
              <br />
              Please check the URL or go back home.
            </Text>
            <Button
              type="primary"
              icon={<AiOutlineHome style={{ marginRight: 6, fontSize: 18 }} />}
              size="large"
              style={{
                borderRadius: 6,
                fontWeight: 500,
                marginTop: 2,
                zIndex: 1,
                background: "linear-gradient(90deg,#ff4d4f 60%,#ffb800 100%)",
                border: "none",
              }}
              as={Link}
              to="/"
            >
              Back to Home
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Error404;

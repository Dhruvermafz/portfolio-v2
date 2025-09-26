import React from "react";
import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      style={{
        textAlign: "center",
        background: "transparent",
        padding: "18px 0",
      }}
    >
      <Text type="secondary">
        Copyright &copy;{currentYear}, Creatively designed by{" "}
        <a
          href="https://dhruvermafz.in/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#16b3ac" }}
        >
          Dhruv Verma
        </a>
      </Text>
    </AntFooter>
  );
};

export default Footer;

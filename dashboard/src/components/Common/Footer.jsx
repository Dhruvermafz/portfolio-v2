import React from "react";
import { Layout, Typography } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="footer mt-auto py-3 text-center">
      <div class="container">
        <span class="text-muted">
          {" "}
          Copyright © <span id="year">{currentYear}</span> . Designed with{" "}
          <span class="bi bi-heart-fill text-danger"></span> by{" "}
          <a href="https://dhruvermafz.in/" target="_blank">
            <span class="fw-medium text-primary"> Dhruv Verma</span>
          </a>{" "}
          All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;

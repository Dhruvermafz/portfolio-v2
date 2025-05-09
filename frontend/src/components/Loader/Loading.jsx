import React from "react";
import { Spinner, Container } from "react-bootstrap";
import "./loading.css";

const Loading = ({
  size = "lg",
  color = "primary",
  text = "Loading...",
  inline = false,
}) => {
  return (
    <div
      className={`loading-container ${inline ? "loading-inline" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <Container className="text-center">
        <Spinner
          animation="border"
          variant={color}
          size={size === "sm" ? "sm" : undefined}
          className={`loading-spinner ${size}`}
          aria-hidden="true"
        />
        {text && <p className="loading-text mt-2 text-muted">{text}</p>}
      </Container>
    </div>
  );
};

export default Loading;

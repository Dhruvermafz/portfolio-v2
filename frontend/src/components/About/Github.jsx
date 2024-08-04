import React from "react";
import { Row } from "react-bootstrap";
import GitHubCalendar from "react-github-calendar";

function Github() {
  return (
    <Row style={{ backgroundColor: "hsl(0, 0%, 92%)" }}>
      <GitHubCalendar username="Dhruvermafz" />
    </Row>
  );
}

export default Github;

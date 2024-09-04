import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const ProgressCard = () => {
  return (
    <Row className="g-4">
      <Col xs={12} md={6} xl={3}>
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-muted fw-semibold mb-0">Overall revenue</h6>
              <div className="badge bg-secondary text-white rounded-pill px-2 py-1">
                07 Days
              </div>
            </div>
            <div className="pt-3 mt-3 d-flex gap-4">
              <div className="pb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h5 className="mb-0">
                    $
                    <span className="counter-value" data-value="30000">
                      0
                    </span>
                  </h5>
                  <div
                    className="text-primary d-flex align-items-center justify-content-center rounded-circle border border-primary"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <i className="ri-arrow-up-line"></i>
                  </div>
                </div>
                <div className="text-muted fw-semibold">
                  <span className="text-primary">09%</span> Below Target
                </div>
              </div>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div id="admin-overall-revenue-chart"></div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} xl={3}>
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-muted fw-semibold mb-0">
                Total registrations
              </h6>
              <div className="badge bg-secondary text-white rounded-pill px-2 py-1">
                07 Days
              </div>
            </div>
            <div className="pt-3 mt-3 d-flex gap-4">
              <div className="pb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h5 className="mb-0">
                    <span className="counter-value" data-value="21000">
                      0
                    </span>
                  </h5>
                  <div
                    className="text-danger d-flex align-items-center justify-content-center rounded-circle border border-danger"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <i className="ri-arrow-down-line"></i>
                  </div>
                </div>
                <div className="text-muted fw-semibold">
                  <span className="text-danger">05%</span> Below Target
                </div>
              </div>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div id="admin-total-registration-chart"></div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} xl={3}>
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-muted fw-semibold mb-0">Total courses</h6>
              <div className="badge bg-secondary text-white rounded-pill px-2 py-1">
                07 Days
              </div>
            </div>
            <div className="pt-3 mt-3 d-flex gap-4">
              <div className="pb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h5 className="mb-0">
                    <span className="counter-value" data-value="25000">
                      0
                    </span>
                  </h5>
                  <div
                    className="text-primary d-flex align-items-center justify-content-center rounded-circle border border-primary"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <i className="ri-arrow-up-line"></i>
                  </div>
                </div>
                <div className="text-muted fw-semibold">
                  <span className="text-primary">50%</span> Below Target
                </div>
              </div>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div id="admin-total-course-chart"></div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6} xl={3}>
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-muted fw-semibold mb-0">Average review</h6>
              <div className="badge bg-secondary text-white rounded-pill px-2 py-1">
                07 Days
              </div>
            </div>
            <div className="pt-3 mt-3 d-flex gap-4">
              <div className="pb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h5 className="mb-0">
                    <span className="counter-value" data-value="4.5">
                      0
                    </span>
                  </h5>
                  <div
                    className="text-primary d-flex align-items-center justify-content-center rounded-circle border border-primary"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <i className="ri-arrow-up-line"></i>
                  </div>
                </div>
                <div className="text-muted fw-semibold">
                  <span className="text-primary">05%</span> Below Target
                </div>
              </div>
              <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div id="admin-average-review-chart"></div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProgressCard;

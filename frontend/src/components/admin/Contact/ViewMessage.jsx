import React from "react";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components

const ViewMessage = ({ show, handleClose, message }) => {
  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 className="card-title text-lg mb-2">Message Details</h5>
            <p className="text-muted">{message || "No message available."}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewMessage;

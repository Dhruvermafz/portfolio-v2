import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src="assets/images/icons/delete-record.png"
          alt="delete"
          className="img-fluid mb-3"
          style={{ height: "80px" }}
        />
        <h5 className="mb-3">Are you sure?</h5>
        <p className="text-muted">
          Are you certain you want to delete this record?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, Delete It!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./deletemodal.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this achievement?</p>
        <p>This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

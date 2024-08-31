import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCategoryModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = () => {
    const newCategory = { name, parentCategory, icon, status };
    onConfirm(newCategory);
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="parentCategory" className="mt-3">
            <Form.Label>Parent Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter parent category"
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="icon" className="mt-3">
            <Form.Label>Icon</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter icon class"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="status" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Active"
              checked={status}
              onChange={() => setStatus(!status)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;

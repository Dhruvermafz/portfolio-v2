import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddCategoryModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [status, setStatus] = useState(true);
  const [isParentCategory, setIsParentCategory] = useState(false);

  useEffect(() => {
    // Fetch parent categories for the dropdown
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories");
        setParentCategories(response.data);
      } catch (error) {
        console.error("Error fetching parent categories", error);
      }
    };

    fetchParentCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const newCategory = {
        name,
        parentCategory: isParentCategory ? null : parentCategory,
        isActive: status,
        isParent: isParentCategory,
      };
      const response = await axios.post(
        "http://localhost:4000/categories",
        newCategory
      );
      onConfirm(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding category", error);
    }
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

          <Form.Group controlId="isParentCategory" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Is Parent Category"
              checked={isParentCategory}
              onChange={() => setIsParentCategory(!isParentCategory)}
            />
          </Form.Group>

          {!isParentCategory && (
            <Form.Group controlId="parentCategory" className="mt-3">
              <Form.Label>Parent Category</Form.Label>
              <Form.Control
                as="select"
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
              >
                <option value="">None</option>
                {parentCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}

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

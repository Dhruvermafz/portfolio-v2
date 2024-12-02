import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../config";

const EditCategoryModal = ({ isOpen, onClose, onConfirm, categoryToEdit }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [status, setStatus] = useState(true);
  const [isParentCategory, setIsParentCategory] = useState(false);

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setParentCategory(categoryToEdit.parentCategory || "");
      setStatus(categoryToEdit.isActive);
      setIsParentCategory(categoryToEdit.isParent || false);
    }

    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setParentCategories(response.data);
      } catch (error) {
        console.error("Error fetching parent categories", error);
      }
    };

    fetchParentCategories();
  }, [categoryToEdit]);

  const handleSubmit = async () => {
    try {
      const updatedCategory = {
        name,
        parentCategory: isParentCategory ? null : parentCategory,
        isActive: status,
        isParent: isParentCategory,
      };
      const response = await axios.put(
        `${API_URL}/categories/${categoryToEdit._id}`,
        updatedCategory
      );
      onConfirm(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoryModal;

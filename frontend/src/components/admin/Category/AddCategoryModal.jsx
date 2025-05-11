// src/components/AddCategoryModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../api/categoryApi";

const AddCategoryModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [status, setStatus] = useState(true);
  const [isParentCategory, setIsParentCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Using useCreateCategoryMutation to create a new category
  const [createCategory, { isLoading: isCreating, isError }] =
    useCreateCategoryMutation();

  // Using useGetAllCategoriesQuery to fetch all parent categories
  const {
    data: parentCategories,
    isLoading: isLoadingParentCategories,
    error: parentCategoriesError,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (parentCategoriesError) {
      setError("Error fetching parent categories");
      console.error("Error fetching parent categories", parentCategoriesError);
    }
  }, [parentCategoriesError]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setLoading(true);
    setError(""); // Reset any existing error

    try {
      const newCategory = {
        name,
        parentCategory: isParentCategory ? null : parentCategory,
        isActive: status,
      };

      const result = await createCategory(newCategory).unwrap();
      onConfirm(result); // Pass the newly created category data to the parent component
      onClose(); // Close the modal
    } catch (error) {
      setError("Failed to add category");
      console.error("Error adding category", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        {isLoadingParentCategories ? (
          <div className="text-center">
            <Spinner animation="border" />
            Loading Parent Categories...
          </div>
        ) : (
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

            {!isParentCategory && parentCategories && (
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
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isCreating}>
          {isCreating ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Add Category"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;

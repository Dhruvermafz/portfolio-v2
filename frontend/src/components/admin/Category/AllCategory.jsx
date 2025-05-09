import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { Button, Card, Row, Col, Form, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { API_URL } from "../../../config";
import "./category.css";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleStatusChange = async (categoryId, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/categories/${categoryId}`, {
        isActive: !currentStatus,
      });
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/categories/${selectedCategory._id}`);
      setCategories((prev) =>
        prev.filter((cat) => cat._id !== selectedCategory._id)
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, newCategory);
      setCategories([...categories, response.data]);
      setAddCategoryModalOpen(false);
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditCategoryModalOpen(true);
  };

  const handleEditConfirm = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      )
    );
    setEditCategoryModalOpen(false);
  };

  return (
    <section className="category-section py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="category-title">Category Management</h1>
            <p className="category-subtitle">
              Organize and manage all categories
            </p>
          </div>
          <Button
            variant="primary"
            className="add-category-btn"
            onClick={() => setAddCategoryModalOpen(true)}
          >
            <FaPlus className="me-2" /> Add Category
          </Button>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {categories.length === 0 ? (
            <Col>
              <Card className="no-categories-card shadow-sm">
                <Card.Body className="text-center">
                  <p className="mb-0">
                    No categories found. Add a new category to get started!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            categories.map((category) => (
              <Col key={category._id}>
                <Card className="category-card shadow-sm h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title className="category-name mb-0">
                        {category.name}
                      </Card.Title>
                      <Badge
                        bg={category.isActive ? "success" : "secondary"}
                        className="status-badge"
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <Card.Text className="category-parent mb-3">
                      <strong>Parent:</strong>{" "}
                      {category.parentCategory || "None"}
                    </Card.Text>
                    <Form.Check
                      type="switch"
                      id={`status-switch-${category._id}`}
                      label="Toggle Status"
                      checked={category.isActive}
                      onChange={() =>
                        handleStatusChange(category._id, category.isActive)
                      }
                      className="mb-4"
                    />
                    <div className="mt-auto d-flex justify-content-end gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleEditClick(category)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleDeleteClick(category)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        {/* Add Category Modal */}
        <AddCategoryModal
          isOpen={isAddCategoryModalOpen}
          onClose={() => setAddCategoryModalOpen(false)}
          onConfirm={handleAddCategory}
        />

        {/* Edit Category Modal */}
        <EditCategoryModal
          isOpen={isEditCategoryModalOpen}
          onClose={() => setEditCategoryModalOpen(false)}
          onConfirm={handleEditConfirm}
          categoryToEdit={selectedCategory}
        />
      </div>
    </section>
  );
};

export default AllCategory;

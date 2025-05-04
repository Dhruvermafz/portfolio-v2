import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { API_URL } from "../../../config";

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
    <section className="mt-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h4">Category List</h1>
            <p>All Categories Here</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setAddCategoryModalOpen(true)}
          >
            Add Category
          </Button>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {categories.map((category) => (
            <Col key={category._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Parent: {category.parentCategory || "None"}
                  </Card.Subtitle>

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <Form.Check
                      type="switch"
                      id={`status-switch-${category._id}`}
                      label={category.isActive ? "Active" : "Inactive"}
                      checked={category.isActive}
                      onChange={() =>
                        handleStatusChange(category._id, category.isActive)
                      }
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditClick(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(category)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
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

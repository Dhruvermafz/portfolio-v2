import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal"; // Import EditCategoryModal
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import AppBar from "../AppBar/Appbar";
import { API_URL } from "../../../config";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from API
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

  // Handle status change for a category
  const handleStatusChange = async (categoryId, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/categories/${categoryId}`, {
        isActive: !currentStatus,
      });
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  // Handle delete category
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/categories/${selectedCategory._id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== selectedCategory._id)
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  // Handle add category
  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, newCategory);
      setCategories([...categories, response.data]);
      setAddCategoryModalOpen(false);
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  // Handle edit category
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditCategoryModalOpen(true);
  };

  const handleEditConfirm = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      )
    );
    setEditCategoryModalOpen(false);
  };

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div
            className="row g-4"
            style={{ width: "100%", marginLeft: "auto" }}
          >
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
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

                  <div className="table-responsive">
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Category Name</th>
                          <th>Parent Category</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.parentCategory}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={category.isActive}
                                onChange={() =>
                                  handleStatusChange(
                                    category._id,
                                    category.isActive
                                  )
                                }
                              />
                            </td>
                            <td>
                              <div className="d-flex gap-2">
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
      </section>
    </>
  );
};

export default AllCategory;

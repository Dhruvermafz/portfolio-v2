import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import AddCategoryModal from "./AddCategoryModal"; // Import the AddCategoryModal component
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import AppBar from "../AppBar/Appbar";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories");
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
      await axios.patch(`/categories/${categoryId}`, {
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
      await axios.delete(`/categories/${selectedCategory._id}`);
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
      const response = await axios.post("/categories", newCategory);
      setCategories([...categories, response.data]);
      setAddCategoryModalOpen(false);
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  return (
    <section className="mt-4">
      <div className="container">
        <AppBar />
        <div className="row g-4" style={{ width: "80%", marginLeft: "auto" }}>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h1 className="h4">Course Category List</h1>
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
                          <td>
                            {category.parentCategory
                              ? category.parentCategory.name
                              : "None"}
                          </td>
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
                              <Link
                                to={`/categories/edit/${category._id}`}
                                className="btn btn-sm btn-warning"
                              >
                                Edit
                              </Link>
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
    </section>
  );
};

export default AllCategory;

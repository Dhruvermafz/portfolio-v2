import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import AddCategoryModal from "./AddCategoryModal"; // Import the AddCategoryModal component
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const AllCategory = () => {
  const [categories, setCategories] = useState([
    { name: "Programming", status: true },
    { name: "JavaScript", status: true },
    { name: "Web Development", status: true },
    { name: "Web Design", status: true },
    { name: "UI/UX", status: true },
    { name: "Business Growth", status: true },
    { name: "Job Success", status: true },
    { name: "Basic Graphic Design", status: true },
  ]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleStatusChange = (index) => {
    const newCategories = [...categories];
    newCategories[index].status = !newCategories[index].status;
    setCategories(newCategories);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setCategories(
      categories.filter((cat) => cat.name !== selectedCategory.name)
    );
    setDeleteModalOpen(false);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setAddCategoryModalOpen(false);
  };

  return (
    <section className="mt-4">
      <div className="container">
        <div className="row g-4">
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
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, index) => (
                        <tr key={index}>
                          <td>{category.name}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={category.status}
                              onChange={() => handleStatusChange(index)}
                            />
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                to="/create-course-category.html"
                                className="btn btn-sm btn-warning"
                              >
                                <i className="ri-edit-2-line"></i> Edit
                              </Link>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(category)}
                              >
                                <i className="ri-delete-bin-line"></i> Delete
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

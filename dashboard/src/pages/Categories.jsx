import React, { useState } from "react";
import { Button, Card, Form, Table, Image } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DeleteModal from "../components/Category/DeleteModal";
import AddCategoryModal from "../components/Category/AddCategoryModal";
import EditCategoryModal from "../components/Category/EditCategoryModal";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../api/categoryApi";

const Categories = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories using RTK Query
  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetAllCategoriesQuery();

  // Mutation hooks
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleStatusChange = async (categoryId, currentStatus) => {
    try {
      await updateCategory({
        id: categoryId,
        isActive: !currentStatus,
      }).unwrap();
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
      await deleteCategory(selectedCategory._id).unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      await createCategory(newCategory).unwrap();
      setAddCategoryModalOpen(false);
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditCategoryModalOpen(true);
  };

  const handleEditConfirm = async (updatedCategory) => {
    try {
      await updateCategory({
        id: updatedCategory._id,
        ...updatedCategory,
      }).unwrap();
      setEditCategoryModalOpen(false);
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Card className="card card-table">
            <Card.Body>
              <div className="title-header option-title d-flex justify-content-between align-items-center mb-4">
                <h5>All Category</h5>
                <Form className="d-inline-flex">
                  <Button
                    variant="primary"
                    className="align-items-center btn btn-theme d-flex"
                    onClick={() => setAddCategoryModalOpen(true)}
                  >
                    <FaPlus className="me-2" /> Add New
                  </Button>
                </Form>
              </div>

              {isLoading ? (
                <p>Loading categories...</p>
              ) : error ? (
                <p>Error fetching categories: {error.message}</p>
              ) : (
                <div className="table-responsive category-table">
                  <Table
                    className="table all-package theme-table"
                    id="table_id"
                  >
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Date</th>
                        <th>Product Image</th>
                        <th>Icon</th>
                        <th>Slug</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No categories found. Add a new category to get
                            started!
                          </td>
                        </tr>
                      ) : (
                        categories.map((category) => (
                          <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.createdAt || "N/A"}</td>
                            <td>
                              <div className="table-image">
                                <Image
                                  src={
                                    category.image ||
                                    "assets/images/product/placeholder.png"
                                  }
                                  className="img-fluid"
                                  alt={category.name}
                                  style={{ maxWidth: "50px" }}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="category-icon">
                                <Image
                                  src={
                                    category.icon ||
                                    "https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg"
                                  }
                                  className="img-fluid"
                                  alt={category.name}
                                  style={{ maxWidth: "30px" }}
                                />
                              </div>
                            </td>
                            <td>
                              {category.slug || category.name.toLowerCase()}
                            </td>
                            <td>
                              <ul className="d-flex list-unstyled gap-2">
                                <li>
                                  <a
                                    href={`/category/${category._id}`}
                                    className="text-primary"
                                  >
                                    <FaEye />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleEditClick(category);
                                    }}
                                    className="text-warning"
                                  >
                                    <FaEdit />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDeleteClick(category);
                                    }}
                                    className="text-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalToggle"
                                  >
                                    <FaTrash />
                                  </a>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
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
    </div>
  );
};

export default Categories;

import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

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
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle status change
  const handleStatusChange = (index) => {
    const newCategories = [...categories];
    newCategories[index].status = !newCategories[index].status;
    setCategories(newCategories);
  };

  // Function to handle delete
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

  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-12">
            <div className="card content-box-card">
              <div className="card-body portfolio-card">
                <div className="top-info d-flex justify-content-between align-items-center">
                  <div className="text">
                    <h1 className="main-title">Course Category List</h1>
                    <p className="card-description">All Categories Here</p>
                  </div>
                  <Link
                    to="/create-course-category.html"
                    className="project-btn"
                  >
                    <button className="btn b-solid btn-primary-solid">
                      Add Category
                    </button>
                  </Link>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="overflow-x-auto scrollbar-table">
                    <table className="table-auto w-full whitespace-nowrap text-left text-gray-500 dark:text-dark-text leading-none">
                      <thead className="border-b border-gray-200 dark:border-dark-border font-semibold">
                        <tr>
                          <th className="px-3.5 py-4">Category Name</th>
                          <th className="px-3.5 py-4">Status</th>
                          <th className="px-3.5 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                        {categories.map((category, index) => (
                          <tr
                            key={index}
                            className="hover:bg-primary-200/50 dark:hover:bg-dark-icon hover:text-gray-500 dark:hover:text-white"
                          >
                            <td className="px-3.5 py-4">{category.name}</td>
                            <td className="px-3.5 py-4">
                              <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="appearance-none peer"
                                  checked={category.status}
                                  onChange={() => handleStatusChange(index)}
                                />
                                <span className="switcher switcher-primary-solid"></span>
                              </label>
                            </td>
                            <td className="px-3.5 py-4">
                              <div className="flex items-center gap-1">
                                <Link
                                  to="/create-course-category.html"
                                  className="btn-icon btn-primary-icon-light size-7"
                                >
                                  <i className="ri-edit-2-line text-inherit text-[13px]"></i>
                                </Link>
                                <button
                                  className="btn-icon btn-danger-icon-light size-7"
                                  onClick={() => handleDeleteClick(category)}
                                >
                                  <i className="ri-delete-bin-line text-danger text-[13px]"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
    </section>
  );
};

export default AllCategory;

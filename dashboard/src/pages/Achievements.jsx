import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  useGetAllAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} from "../api/achievementsApi";
import DeleteModal from "../components/Achivements/DeleteModal";
import AddAchievementModal from "../components/Achivements/AddAchivementModal";

const Achievements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAchievementModalOpen, setAchievementModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const achievementsPerPage = 6;

  // RTK Query hooks
  const {
    data: achievements = [],
    isLoading,
    isError,
  } = useGetAllAchievementsQuery();
  const [createAchievement] = useCreateAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();

  // Handlers for CRUD operations
  const handleAddAchievement = async (newAchievement) => {
    try {
      const token = localStorage.getItem("authToken");
      await createAchievement({
        ...newAchievement,
        headers: { Authorization: `Bearer ${token}` },
      }).unwrap();
      setAchievementModalOpen(false);
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Failed to add achievement.");
    }
  };

  const handleEditClick = (achievement) => {
    setSelectedAchievement(achievement);
    setEditMode(true);
    setAchievementModalOpen(true);
  };

  const handleEditAchievement = async (updatedAchievement) => {
    try {
      const token = localStorage.getItem("authToken");
      await updateAchievement({
        id: selectedAchievement._id,
        ...updatedAchievement,
        headers: { Authorization: `Bearer ${token}` },
      }).unwrap();
      setAchievementModalOpen(false);
      setEditMode(false);
      setSelectedAchievement(null);
    } catch (error) {
      console.error("Error updating achievement:", error);
      alert("Failed to update achievement.");
    }
  };

  const handleDeleteClick = (achievement) => {
    setSelectedAchievement(achievement);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await deleteAchievement({
        id: selectedAchievement._id,
        headers: { Authorization: `Bearer ${token}` },
      }).unwrap();
      setDeleteModalOpen(false);
      setSelectedAchievement(null);
    } catch (error) {
      console.error("Error deleting achievement:", error);
      alert("Failed to delete achievement.");
    }
  };

  // Filter and pagination
  const filteredAchievements = achievements.filter((achievement) =>
    achievement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredAchievements.length / achievementsPerPage
  );
  const paginatedAchievements = filteredAchievements.slice(
    (currentPage - 1) * achievementsPerPage,
    currentPage * achievementsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="title-header option-title">
                  <h5>Achievement List</h5>
                  <div className="right-options">
                    <ul>
                      <li>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaSearch />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search achievements..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </li>
                      <li>
                        <button
                          className="btn btn-solid"
                          onClick={() => {
                            setEditMode(false);
                            setSelectedAchievement(null);
                            setAchievementModalOpen(true);
                          }}
                        >
                          <FaPlus /> Add Achievement
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="table-responsive">
                    <table
                      className="table all-package coupon-list-table table-hover theme-table"
                      id="table_id"
                    >
                      <thead>
                        <tr>
                          <th>
                            <span className="form-check user-checkbox m-0 p-0">
                              <input
                                className="checkbox_animated checkall"
                                type="checkbox"
                                value=""
                              />
                            </span>
                          </th>
                          <th>Title</th>

                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && (
                          <tr>
                            <td colSpan="7">Loading achievements...</td>
                          </tr>
                        )}
                        {isError && (
                          <tr>
                            <td colSpan="7" className="text-danger">
                              Error loading achievements
                            </td>
                          </tr>
                        )}
                        {!isLoading &&
                          !isError &&
                          paginatedAchievements.length === 0 && (
                            <tr>
                              <td colSpan="7">No achievements found.</td>
                            </tr>
                          )}
                        {!isLoading &&
                          !isError &&
                          paginatedAchievements.map((achievement) => (
                            <tr key={achievement._id}>
                              <td>
                                <span className="form-check user-checkbox m-0 p-0">
                                  <input
                                    className="checkbox_animated check-it"
                                    type="checkbox"
                                    value=""
                                  />
                                </span>
                              </td>
                              <td>
                                <div className="row gx-3 align-items-center">
                                  <div className="col">
                                    <p className="mb-0">{achievement.title}</p>
                                    <p className="text-secondary small">
                                      {achievement.description ||
                                        "No description"}
                                      {""}
                                      {achievement.details}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() =>
                                        handleEditClick(achievement)
                                      }
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      onClick={() =>
                                        handleDeleteClick(achievement)
                                      }
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {totalPages > 1 && (
                  <div className="card-footer">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li
                            key={i}
                            className={`page-item ${
                              currentPage === i + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddAchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => {
          setAchievementModalOpen(false);
          setEditMode(false);
          setSelectedAchievement(null);
        }}
        onSubmit={isEditMode ? handleEditAchievement : handleAddAchievement}
        initialData={isEditMode ? selectedAchievement : null}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedAchievement?.title || "achievement"}
      />
    </>
  );
};

export default Achievements;

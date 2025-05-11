import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import AddAchievementModal from "./AddAchivementModal";
import "./achievement.css";
import {
  useGetAllAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} from "../../../api/achievementsApi";

const AchievementList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAchievementModalOpen, setAchievementModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const achievementsPerPage = 6;

  // RTK Query hook to fetch achievements
  const {
    data: achievements = [],
    isLoading,
    isError,
  } = useGetAllAchievementsQuery();

  // RTK Query mutation hooks
  const [createAchievement] = useCreateAchievementMutation();
  const [updateAchievement] = useUpdateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();

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

  return (
    <section className="achievement-section py-5">
      <Container>
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <h1 className="achievement-title">Achievement Management</h1>
            <p className="achievement-subtitle">Manage your achievements</p>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-end align-items-center gap-3"
          >
            <Form className="achievement-search-form">
              <Form.Group className="position-relative">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search achievements by title..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="achievement-search-input"
                />
              </Form.Group>
            </Form>
            <Button
              variant="success"
              className="add-achievement-btn"
              onClick={() => {
                setEditMode(false);
                setSelectedAchievement(null);
                setAchievementModalOpen(true);
              }}
            >
              <FaPlus className="me-2" /> Add Achievement
            </Button>
          </Col>
        </Row>

        <Row xs={1} sm={2} md={3} className="g-4">
          {isLoading ? (
            <Col className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading achievements...</p>
            </Col>
          ) : isError ? (
            <Col>
              <Card className="no-achievements-card shadow-sm">
                <Card.Body className="text-center">
                  <p className="mb-0 text-muted">
                    Failed to load achievements.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ) : paginatedAchievements.length === 0 ? (
            <Col>
              <Card className="no-achievements-card shadow-sm">
                <Card.Body className="text-center">
                  <p className="mb-0 text-muted">
                    {searchQuery
                      ? "No achievements match your search."
                      : "No achievements found. Add a new achievement to get started!"}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            paginatedAchievements.map((achievement) => (
              <Col key={achievement._id}>
                <Card className="achievement-card shadow-sm h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="achievement-name">
                      {achievement.title}
                    </Card.Title>
                    <Card.Text className="achievement-description">
                      {achievement.description}
                    </Card.Text>
                    <Card.Text className="achievement-details mt-auto">
                      {achievement.details}
                    </Card.Text>
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleEditClick(achievement)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="action-btn"
                        onClick={() => handleDeleteClick(achievement)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {totalPages > 1 && (
          <Pagination className="custom-pagination justify-content-center mt-5">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}

        <AddAchievementModal
          isOpen={isAchievementModalOpen}
          onClose={() => {
            setAchievementModalOpen(false);
            setEditMode(false);
            setSelectedAchievement(null);
          }}
          onConfirm={isEditMode ? handleEditAchievement : handleAddAchievement}
          achievementToEdit={selectedAchievement}
          isEditMode={isEditMode}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </Container>
    </section>
  );
};

export default AchievementList;

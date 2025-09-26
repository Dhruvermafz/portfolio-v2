import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Pagination,
  Spin,
  Alert,
  Modal,
  Form,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddAchievementModal from "../components/Achivements/AddAchivementModal";
import {
  useGetAllAchievementsQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} from "../api/achievementsApi";
import "../components/Achivements/achievement.css"; // Create or update this CSS to match AntD styling
import DeleteModal from "../components/Common/DeleteModal";

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
      Modal.success({ content: "Achievement added successfully!" });
    } catch (error) {
      console.error("Error adding achievement:", error);
      Modal.error({ content: "Failed to add achievement." });
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
      Modal.success({ content: "Achievement updated successfully!" });
    } catch (error) {
      console.error("Error updating achievement:", error);
      Modal.error({ content: "Failed to update achievement." });
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
      Modal.success({ content: "Achievement deleted successfully!" });
    } catch (error) {
      console.error("Error deleting achievement:", error);
      Modal.error({ content: "Failed to delete achievement." });
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

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Achievement List"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditMode(false);
                  setSelectedAchievement(null);
                  setAchievementModalOpen(true);
                }}
              >
                Add Achievement
              </Button>
            }
          >
            <div style={{ marginBottom: 16 }}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 300 }}
              />
            </div>
            <Row gutter={[16, 16]}>
              {isLoading ? (
                <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
                  <Spin size="large" />
                  <p style={{ marginTop: 8 }}>Loading achievements...</p>
                </Col>
              ) : isError ? (
                <Col span={24}>
                  <Alert
                    message="Error"
                    description="Error loading achievements"
                    type="error"
                    showIcon
                  />
                </Col>
              ) : paginatedAchievements.length === 0 ? (
                <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
                  <p>No achievements found.</p>
                </Col>
              ) : (
                paginatedAchievements.map((achievement) => (
                  <Col xs={24} sm={12} md={8} key={achievement._id}>
                    <Card
                      hoverable
                      title={achievement.title}
                      extra={
                        <div style={{ display: "flex", gap: 8 }}>
                          <Button
                            type="default"
                            size="small"
                            onClick={() => handleEditClick(achievement)}
                          >
                            <EditOutlined /> Edit
                          </Button>
                          <Button
                            danger
                            size="small"
                            onClick={() => handleDeleteClick(achievement)}
                          >
                            <DeleteOutlined /> Delete
                          </Button>
                        </div>
                      }
                    >
                      <p style={{ color: "#595959" }}>
                        {achievement.description || "No description"}{" "}
                        {achievement.details}
                      </p>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
            {totalPages > 1 && (
              <Pagination
                current={currentPage}
                total={filteredAchievements.length}
                pageSize={achievementsPerPage}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: 16, textAlign: "center" }}
                showSizeChanger={false}
              />
            )}
          </Card>
        </Col>
      </Row>

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
    </div>
  );
};

export default Achievements;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "./achievement.css";

const AddAchievementModal = ({
  isOpen,
  onClose,
  onConfirm,
  achievementToEdit,
  isEditMode,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  // Pre-populate form fields when editing
  useEffect(() => {
    if (isEditMode && achievementToEdit) {
      setTitle(achievementToEdit.title || "");
      setDescription(achievementToEdit.description || "");
      setDetails(achievementToEdit.details || "");
    } else {
      setTitle("");
      setDescription("");
      setDetails("");
    }
  }, [isEditMode, achievementToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !details.trim()) {
      setError("All fields are required.");
      return;
    }

    onConfirm({ title, description, details });
    setTitle("");
    setDescription("");
    setDetails("");
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Edit Achievement" : "Add New Achievement"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit}
          id="achievement-modal-form"
          className="json-modal-form"
        >
          <div className="json-object">
            <div className="json-brace">{"{"}</div>
            <div className="json-content">
              <div className="json-field">
                <label className="json-key">"title":</label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter achievement title"
                  className="json-value"
                  required
                />
              </div>
              <div className="json-field">
                <label className="json-key">"description":</label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter achievement description"
                  className="json-value"
                  required
                />
              </div>
              <div className="json-field">
                <label className="json-key">"details":</label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Enter achievement details"
                  className="json-value"
                  required
                />
              </div>
            </div>
            <div className="json-brace">{"}"}</div>
          </div>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="achievement-modal-form">
          {isEditMode ? "Save Changes" : "Add Achievement"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAchievementModal;

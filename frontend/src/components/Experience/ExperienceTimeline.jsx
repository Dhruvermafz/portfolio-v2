import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Using Bootstrap modal
import "bootstrap/dist/css/bootstrap.min.css";
import "./experience.css"; // Ensure this CSS includes the classes provided in your HTML
import { workExperiences } from "../../assets/data/workExperiences"; // Assuming workExperiences is an array

const ExperienceTimeline = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedExperience, setSelectedExperience] = useState(null); // State to track selected experience

  // Function to handle opening modal and setting the selected experience
  const handleShowModal = (experience) => {
    setSelectedExperience(experience);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExperience(null);
  };

  return (
    <div className="client-feedback">
      <h2 className="main-common-title">My Work Experience</h2>
      <div className="row client-feedback-slider">
        {workExperiences.map((experience) => (
          <div className="col-lg-6 " key={experience.id}>
            <div className="feedback-item">
              <div className="feedback-top-info">
                <div className="rating">
                  {/* Dynamically generating star icons based on a rating value */}
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <div className="website">
                  {/* Triggering the modal on clicking the website link */}
                  <a>
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#007bff",
                        textDecoration: "underline",
                      }}
                      onClick={() => handleShowModal(experience)}
                    >
                      {experience.company}.com
                      <svg
                        className="arrow-up"
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.91634 4.5835L4.08301 10.4168"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.66699 4.5835H9.91699V9.8335"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div class="details">
                <p>{experience.description}</p>
              </div>
              <div class="designation">
                <p>
                  <span>{experience.id}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for experience details */}
      {selectedExperience && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedExperience.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content">
              <h4>Company: {selectedExperience.company}</h4>

              <p>Date Range: {selectedExperience.date}</p>
              <div className="rating mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <div class="details">
                <p>{selectedExperience.description}</p>
              </div>
              <div className="website">
                <a
                  href={selectedExperience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {selectedExperience.company} Website
                </a>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ExperienceTimeline;

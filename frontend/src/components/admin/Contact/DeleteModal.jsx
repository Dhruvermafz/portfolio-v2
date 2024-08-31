import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri"; // Importing the icon from react-icons

const DeleteModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Add your delete logic here
    handleCloseModal(); // Close the modal after deletion
  };

  return (
    <>
      {/* Trigger Button */}
      <button onClick={handleOpenModal} className="btn btn-danger">
        Open Delete Modal
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-flex justify-content-center align-items-center"
          tabIndex="-1"
          style={{ display: "block" }} // Inline style to display the modal
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <RiCloseLine className="ri-close-line text-secondary" />
                </button>
              </div>
              <div className="modal-body text-center">
                <img
                  src="assets/images/icons/delete-record.png"
                  alt="delete"
                  className="mb-3"
                  style={{ height: "50px" }}
                />
                <h5>Are you sure?</h5>
                <p className="text-muted">
                  Are you certain you want to delete this record?
                </p>
                <div className="d-flex justify-content-center gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Yes, Delete It!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;

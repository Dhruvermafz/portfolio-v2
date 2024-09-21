import React, { useState } from "react";
import { RiCloseLine, RiDeleteBin2Fill } from "react-icons/ri";

const DeleteModal = ({ isOpen, handleClose, handleDelete }) => {
  return (
    <>
      {/* Modal */}
      {isOpen && (
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
                  onClick={handleClose}
                >
                  <RiCloseLine className="ri-close-line text-secondary" />
                </button>
              </div>
              <div className="modal-body text-center">
                <RiDeleteBin2Fill />
                <h5>Are you sure?</h5>
                <p className="text-muted">
                  Are you certain you want to delete this record?
                </p>
                <div className="d-flex justify-content-center gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleClose}
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

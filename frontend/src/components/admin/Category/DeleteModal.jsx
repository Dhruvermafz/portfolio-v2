import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      className="fixed inset-0 z-modal flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    >
      <div className="p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white dark:bg-dark-tooltip rounded-lg shadow dk-theme-card-square">
          <button
            type="button"
            onClick={onClose} // Close modal on click
            className="absolute top-3 end-2.5 text-gray-500 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-icon rounded-lg size-8 flex-center dk-theme-card-square"
          >
            <i className="ri-close-line text-inherit text-xl leading-none"></i>
          </button>
          <div className="p-4 md:p-5 text-center">
            <img
              src="assets/images/icons/delete-record.png"
              alt="delete"
              className="block h-12 mx-auto"
            />
            <div className="mt-5 text-center">
              <h5 className="mb-1">Are you sure?</h5>
              <p className="text-slate-500 dark:text-zink-200">
                Are you certain you want to delete this record?
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <button
                  type="button"
                  onClick={onClose} // Close modal on click
                  className="btn b-light btn-danger-light btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm} // Confirm deletion on click
                  className="btn b-solid btn-danger-solid btn-sm"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

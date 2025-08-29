import React from "react";

const DeleteModal = () => {
  return (
    <div
      class="modal fade theme-modal remove-coupon"
      id="exampleModalToggle"
      aria-hidden="true"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-block text-center">
            <h5 class="modal-title w-100" id="exampleModalLabel22">
              Are You Sure ?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="remove-box">
              <p>
                The permission for the use/group, preview is inherited from the
                object, object will create a new permission for this object
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-animation btn-md fw-bold"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              class="btn btn-animation btn-md fw-bold"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

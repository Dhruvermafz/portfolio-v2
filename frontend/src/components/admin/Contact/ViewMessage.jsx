import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components

const ViewMessage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Trigger Button */}
      <Button variant="primary" onClick={handleShow}>
        View Message
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Private Course Published</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 className="card-title text-lg mb-2">
              New Private Course Published
            </h5>
            <span className="badge bg-secondary text-light mb-2">
              2018-08-26
            </span>
            <p className="text-muted">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              dolores, cumque rerum adipisci corporis ad!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewMessage;

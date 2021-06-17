import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./confirm-action-delete.styles.scss";

const ConfirmActionDelete = (props) => {
  const { message, show, handleHide, handleDelete } = props;
  return (
    <Modal show={show} onHide={handleHide} className="modal-delete-confirm">
      <Modal.Body className="confirm-modal-body">
        <p className="confirm-title">Are You Sure?</p>
        <p className="confirm-content">
          {message}
        </p>
        <div className="confirm-btn">
          <Button
            variant="outline-secondary"
            onClick={handleHide}
            className="btnCancel"
          >
            Cancel
          </Button>
          <Button
            variant="outline-danger"
            onClick={handleDelete}
            className="btnDelete"
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ConfirmActionDelete;

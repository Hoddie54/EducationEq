import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./confirm-action-confirm.styles.scss";

const ConfirmActionConfirm = (props) => {
  const { message, show, handleHide, handleConfirm } = props;
  return (
    <Modal show={show} onHide={handleHide} className="modal-confirm">
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
            variant="outline-primary"
            onClick={handleConfirm}
            className="btnConfirm"
          >
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ConfirmActionConfirm;

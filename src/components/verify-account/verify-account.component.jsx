import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./verify-account.styles.scss";

const VerifyAccount = (props) => {
  const { message, show, handleHide, handleVerify } = props;
  return (
    <Modal show={show} onHide={() => { handleHide(false) }} className="modal-verify">
      <Modal.Body className="verify-modal-body">
        <p className="verify-title">Verify Account</p>
        <p className="verify-content">{message}</p>
        <Form.Control type="email" placeholder="Enter School Email" className="verify-email" />
        <div className="verify-btn">
          <Button
            variant="primary"
            onClick={() => { handleHide(false) }}
            className="btnVerify"
          >
            Get Verified
          </Button>
        </div>
        <span className="or-email">Or email us at verify@edeq.io</span>
      </Modal.Body>
    </Modal>
  );
};
export default VerifyAccount;

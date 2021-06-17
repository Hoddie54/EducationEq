import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { IconSVG } from "../icon-svg";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleRegister = (event) => {
    event.preventDefault();
    this.props.handleSignIn(this.state);
  };

  render() {
    const { show, handleHide, signInWithGoogle } = this.props;
    return (
      <Modal
        show={show}
        //  onHide={handleHide}
        className="modal-sign-in"
      >
        <Modal.Body className="sign-in-modal-body">
          {/* <p className="close-btn" onClick={handleHide}>
            <IconSVG name="close-circle"></IconSVG>
          </p> */}
          <p className="sign-in-title">Sign In</p>
          <Form.Control
            type="email"
            placeholder="Email"
            className="sign-in-email"
            value={this.state.email}
            onChange={(newValue) => {
              this.setState({
                email: newValue.target.value,
              });
            }}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            className="sign-in-password"
            value={this.state.password}
            onChange={(newValue) => {
              this.setState({
                password: newValue.target.value,
              });
            }}
          />
          <div className="sign-in-btn">
            <Button
              variant="primary"
              onClick={this.handleRegister}
              className="btn-sign-in"
            >
              Sign In
            </Button>
          </div>
          <span className="forgot-password">Forgotten Password?</span>
          <span className="txt-or">OR</span>
          <div className="sign-in-btn">
            <Button
              variant="outline-primary"
              onClick={signInWithGoogle}
              className="btn-sign-in-google"
            >
              Sign In with Google
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
export default SignIn;

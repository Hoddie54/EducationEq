import React from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { resetPassword } from "../../utils/firebase/auth"
import { IconSVG } from "../icon-svg"
import "./sign-in.styles.scss"

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      showForgottenPassword: false,
    }
    this.showForgottenPassword = this.showForgottenPassword.bind(this)
    this.emailIsValid = this.emailIsValid.bind(this)
    this.forgottenPassword = this.forgottenPassword.bind(this)
    this.changeErrorMessage = this.changeErrorMessage.bind(this)
  }

  handleRegister = (event) => {
    event.preventDefault()
    const signInData = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.handleSignIn(signInData, this.changeErrorMessage)
  }

  showForgottenPassword() {
    this.setState(() => {
      return { showForgottenPassword: true }
    })
  }

  emailIsValid() {
    const email = this.state.email
    const text = document.querySelector(".error-message")
    if (email.includes("@")) {
      text.innerHTML = "Password has been reset"
      return true
    }
    text.classList.add("visible")
    return false
  }

  forgottenPassword() {
    if (this.emailIsValid()) {
      resetPassword(this.state.email)
    }
  }

  changeErrorMessage(errorMessage) {
    // this.props.showSignIn()
    const text = document.querySelector(".error-message")
    text.innerHTML = errorMessage
  }

  render() {
    const { show, handleHide, signInWithGoogle, switchToSignUp } = this.props
    return (
      <Modal show={show} onHide={handleHide} className="modal-sign-in">
        <Modal.Body className="sign-in-modal-body">
          {this.state.showForgottenPassword ? (
            <>
              <p className="sign-in-title">Reset your EdEq account</p>
              <div className="sign-in-title-no-border">
                Enter your email to recieve a reset link
              </div>
              <div className="password-reset__container">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="sign-in-email"
                  value={this.state.email}
                  onChange={(newValue) => {
                    this.setState({
                      email: newValue.target.value,
                    })
                  }}
                />
                <button
                  className="password__button"
                  onClick={this.forgottenPassword}
                >
                  Go
                </button>
              </div>
              <div id="error-text" className="error-message">
                Please enter a valid email
              </div>
            </>
          ) : (
            <>
              <p className="sign-in-title">Sign In</p>
              <Form.Control
                type="email"
                placeholder="Email"
                className="sign-in-email"
                value={this.state.email}
                onChange={(newValue) => {
                  this.setState({
                    email: newValue.target.value,
                  })
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
                  })
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
                <span
                  className="forgot-password"
                  onClick={this.showForgottenPassword}
                >
                  Forgotten Password?
                </span>
              </div>

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
              <div className="sign-in-btn">
                <Button
                  variant="outline-primary"
                  onClick={switchToSignUp}
                  className="btn-sign-in-google"
                >
                  Sign up
                </Button>
              </div>
              <div className="error-message" style={{ opacity: 1 }}></div>
            </>
          )}
        </Modal.Body>
      </Modal>
    )
  }
}
export default SignIn

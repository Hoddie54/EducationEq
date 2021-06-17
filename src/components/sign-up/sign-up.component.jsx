import { capitalize } from "lodash"
import React from "react"
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap"
import { IconSVG } from "../icon-svg"
import studentIllustration from "./../../assets/img/student-illustration.png"
import teacherIllustration from "./../../assets/img/teacher-illustration.png"
import "./sign-up.styles.scss"

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_type: "student",
      full_name: "",
      email: "",
      password: "",
    }
  }

  renderButtonStyle = (userType) => {
    return this.state.user_type == userType ? "btn-role-out-line" : "btn-role"
  }

  handleRegister = (event) => {
    event.preventDefault()
    if (this.isFormValid()) {
      this.props.handleSignUp(this.state)
    }
  }

  isFormValid() {
    const errorMessage = document.querySelector(".errorMessage")
    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const password = document.querySelector(".sign-up-password")
    if (this.state.full_name.trim().length === 0) {
      name.classList.add("invalid")
      errorMessage.classList.add("visible")
      return false
    } else {
      name.classList.remove("invalid")
    }
    if (!this.state.email.includes("@")) {
      email.classList.add("invalid")
      errorMessage.classList.add("visible")
      return false
    } else {
      email.classList.remove("invalid")
    }
    if (this.state.password.trim().length <= 6) {
      password.classList.add("invalid")
      errorMessage.classList.add("visible")
      return false
    } else {
      password.classList.remove("invalid")
    }
    errorMessage.classList.remove("visible")
    return true
  }

  render() {
    const { show, handleHide, showSignIn, signUpWithGoogle } = this.props
    return (
      <Modal
        size="lg"
        show={show}
        // onHide={handleHide}
        className="modal-sign-up"
      >
        <Modal.Body className="sign-up-modal-body">
          <Container>
            <Row>
              <Col className="left-sign-up">
                <p className="txt-sign-up-role">
                  {capitalize(this.state.user_type) + "s"}
                </p>
                <p className="txt-sign-up-content">
                  {this.state.user_type == "student"
                    ? "Learn at your own pace. Explore on-demand content, answer exam board specific questions and use analytics to monitor your progress."
                    : "Create courses, stretch your students and understand how they’re performing with Education Equation."}
                </p>
                <p className="txt-sign-up-illustration">
                  <img
                    src={
                      this.state.user_type == "student"
                        ? studentIllustration
                        : teacherIllustration
                    }
                  />
                </p>
              </Col>
              <Col className="right-sign-up">
                {/* <p className="close-btn" onClick={handleHide}>
                  <IconSVG name="close-circle"></IconSVG>
                </p> */}
                <p className="sign-up-title">Sign Up</p>
                <div>
                  <Button
                    className={this.renderButtonStyle("student")}
                    onClick={() => {
                      this.setState({ user_type: "student" })
                    }}
                  >
                    Student
                  </Button>{" "}
                  {/* <Button
                    className={this.renderButtonStyle("tutor")}
                    onClick={() => {
                      this.setState({ user_type: "tutor" });
                    }}
                  >
                    Tutor
                  </Button>{" "}
                  <Button
                    className={this.renderButtonStyle("parent")}
                    onClick={() => {
                      this.setState({ user_type: "parent" });
                    }}
                  >
                    Parent
                  </Button> */}
                  {/* <Button
                    className={this.renderButtonStyle("teacher")}
                    onClick={() => {
                      this.setState({ user_type: "teacher" });
                    }}
                  >
                    Teacher
                  </Button>{" "} */}
                </div>
                <Form.Control
                  type="text"
                  placeholder="Full name"
                  className="sign-up-email"
                  id="name"
                  value={this.state.full_name}
                  onChange={(newValue) => {
                    this.setState({
                      full_name: newValue.target.value,
                    })
                  }}
                />
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="sign-up-email"
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
                  className="sign-up-password"
                  value={this.state.password}
                  onChange={(newValue) => {
                    this.setState({
                      password: newValue.target.value,
                    })
                  }}
                />
                <div className="sign-up-btn">
                  <Button
                    variant="primary"
                    onClick={this.handleRegister}
                    className="btn-sign-up"
                  >
                    Next
                  </Button>
                </div>
                <span className="txt-or">OR</span>
                <div className="sign-up-btn">
                  <Button
                    variant="outline-primary"
                    onClick={() => signUpWithGoogle(this.state.user_type)}
                    className="btn-sign-up-google"
                  >
                    Signup with Google
                  </Button>
                </div>
                <span className="forgot-password">
                  By clicking “Sign Up” you accept our Terms & Conditions and
                  Privacy Policy
                </span>

                <div className="sign-up-btn">
                  <Button
                    variant="outline-primary"
                    onClick={showSignIn}
                    className="btn-sign-up-google"
                  >
                    Already Have an Account? Sign In
                  </Button>
                </div>
                <div className="errorMessage">
                  Please complete all marked fields correctly to create an
                  account
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}
export default SignUp

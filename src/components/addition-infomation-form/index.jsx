import { render } from "@testing-library/react"
import React from "react"
import { Button, Modal } from "react-bootstrap"
import "./addition-info-form.scss"
import { fetchSchools } from "./../../utils/firebase/firestore"
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider"

class AdditionInformationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { schools: [], exam_board: "AQA", level: "higher" }
    // this.handleFetchSchools();
  }

  handleFetchSchools = () => {
    fetchSchools()
      .then((schools) => {
        console.log(schools)
        this.setState({ schools })
      })
      .catch((err) => {
        alert("Fetch schools:" + err.message)
      })
  }

  handleCompleteSignUp = () => {
    if (this.props.type == "student") {
      let data = {
        ...this.state,
        dob: `${this.state.dob_day}/${this.state.dob_month}/${this.state.dob_year}`,
        school_name: this.state.school_name,
        subjects: [
          {
            name: "Chemistry",
            qualification: "GCSE",
            exam_board: this.state.exam_board,
            level: this.state.level,
          },
        ],
        exam_board: this.state.exam_board,
        level: this.state.level,
      }

      // data.guardian = {
      //   fullname: data.guardian_fullName,
      //   email: data.guardian_email,
      //   number: data.guardian_number,
      // }

      delete data.dob_day
      delete data.dob_month
      delete data.dob_year
      // delete data.school_name
      delete data.exam_board
      delete data.level

      // // delete data.guardian_fullName
      // delete data.guardian_email
      // delete data.guardian_number
      // delete data.schools
      console.log(data)
      this.props.handleCompleteSignUp(data)
    } else {
      this.props.handleCompleteSignUp(this.state)
    }
  }

  render() {
    const { type, show, handleHide } = this.props
    return (
      <Modal show={show} onHide={handleHide} className="addition-info-form">
        <Modal.Body className="addition-info-form-body">
          <div className="title"> Addition Information</div>
          {/* <Button className={"btn-role-out-line"}>Student</Button> */}
          <div className="actual-form">
            <div className="form-field">
              {type == "student" ? (
                <>
                  <div className="title">Date of Birth</div>
                  <div className="input-field">
                    <div className="dob-form">
                      <input
                        type="number"
                        placeholder="Day"
                        value={this.state.dob_day}
                        onChange={(newValue) => {
                          this.setState({
                            dob_day: newValue.target.value,
                          })
                        }}
                      ></input>
                      <input
                        type="number"
                        placeholder="Month"
                        value={this.state.dob_month}
                        onChange={(newValue) => {
                          this.setState({
                            dob_month: newValue.target.value,
                          })
                        }}
                      ></input>
                      <input
                        type="number"
                        placeholder="Year"
                        value={this.state.dob_year}
                        onChange={(newValue) => {
                          this.setState({
                            dob_year: newValue.target.value,
                          })
                        }}
                      ></input>
                    </div>
                  </div>
                  {/* <div className="title">School</div>
                  <div className="input-field">
                    <select
                      name="school"
                      id="school"
                      onChange={(e) => {
                        this.setState({ school: e.target.value });
                      }}
                    >
                      <option value="school">School</option>

                      {this.state.schools &&
                        this.state.schools.map((school, index) => {
                          return (
                            <option key={index} value={school.name}>
                              {school.name}
                            </option>
                          );
                        })}
                    </select>
                  </div> */}
                  {/* <div className="title">
                    Parent, Carer or Guardian's Details
                  </div>
                  <div className="input-field"> */}
                  {/* <input
                      type="text"
                      placeholder="Full Name"
                      value={this.state.guardian_fullName}
                      onChange={(newValue) => {
                        this.setState({
                          guardian_fullName: newValue.target.value,
                        })
                      }}
                    ></input>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={this.state.guardian_number}
                      onChange={(newValue) => {
                        this.setState({
                          guardian_number: newValue.target.value,
                        })
                      }}
                    ></input>
                    <input
                      type="email"
                      placeholder="Email"
                      value={this.state.guardian_email}
                      onChange={(newValue) => {
                        this.setState({
                          guardian_email: newValue.target.value,
                        })
                      }}
                    ></input>
                  </div> */}
                  <div className="title">School</div>
                  <div className="input-field">
                    <input
                      type="text"
                      placeholder="School name"
                      value={this.state.school_name}
                      onChange={(newValue) => {
                        this.setState({
                          school_name: newValue.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="title">GCSE Chemistry</div>
                  <div className="input-field">
                    <div className="exam-board-form">
                      <select
                        value={this.state.exam_board}
                        placeholder="Exam board"
                        onChange={(newValue) => {
                          this.setState({
                            exam_board: newValue.target.value,
                          })
                        }}
                      >
                        <option value="AQA">AQA</option>
                        <option value="OCR_A">OCR A</option>
                        <option value="Edexcel">EdExcel</option>
                      </select>
                      <select
                        value={this.state.level}
                        placeholder="Level / Tier"
                        onChange={(newValue) => {
                          this.setState({
                            level: newValue.target.value,
                          })
                        }}
                      >
                        <option value="higher">Higher Tier</option>
                        <option value="foundation">Foundation Tier</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {type == "tutor" ? (
                <>
                  <div className="title">Where are/have you studied?</div>
                  <div className="input-field">
                    <select
                      name="school"
                      id="school"
                      onChange={(e) => {
                        this.setState({ school: e.target.value })
                      }}
                    >
                      <option value="school">School</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                </>
              ) : (
                <></>
              )}

              {type == "parent" ? (
                <>
                  <div className="title">Phone number</div>
                  <div className="input-field">
                    <div className="phone-form">
                      <input
                        className="extension"
                        type="number"
                        placeholder="+44"
                      ></input>
                      <input
                        className="number"
                        type="number"
                        placeholder="Phone Number"
                        value={this.state.number}
                        onChange={(newValue) => {
                          this.setState({
                            number: newValue.target.value,
                          })
                        }}
                      ></input>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {type == "teacher" ? (
                <>
                  <div className="title">What school do you teach at?</div>
                  <div className="input-field">
                    <select
                      name="school"
                      id="school"
                      onChange={(e) => {
                        this.setState({ school: e.target.value })
                      }}
                    >
                      {this.state.schools &&
                        this.state.schools.map((school, index) => {
                          return (
                            <option key={index} value={school.name}>
                              {school.name}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                  <div className="title">What is your position?</div>
                  <div className="input-field">
                    <select
                      name="position"
                      id="position"
                      onChange={(e) => {
                        this.setState({ position: e.target.value })
                      }}
                    >
                      <option value="school">School</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="confirm-button">
            <Button
              variant="outline-secondary"
              onClick={this.handleCompleteSignUp}
              className="btn-complete"
            >
              Complete Sign up
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
export default AdditionInformationForm

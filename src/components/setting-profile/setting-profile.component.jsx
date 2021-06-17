import React, { Component } from "react"
import { Image, Form } from "react-bootstrap"
import profilepic from "../../assets/default-avatar.png"
import "./setting-profile.styles.scss"
import { IconSVG } from "../icon-svg"
import { updateUserInfo } from "./../../utils/firebase/firestore"

export default class SettingProfile extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = this.props
    this.state = {
      isEditing: false,
      display_name: currentUser.full_name,
      profilePic: null,
      school_name: currentUser.school_name,
      exam_board: currentUser.subjects[0].exam_board,
      level: currentUser.subjects[0].level,
      ...currentUser,
    }
    this.inputOpenFileRef = React.createRef()
    console.log(this.state.exam_board)
  }
  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click()
  }
  updateProfilePic = (e) => {
    this.setState({
      profilePic: URL.createObjectURL(e.target.files[0]),
    })
    console.log(this.state.profilePic)
  }

  editProfile = (isEditing) => {
    this.setState({
      isEditing,
    })
  }

  saveChanges = () => {
    const data = { ...this.state }
    data.subjects[0].exam_board = this.state.exam_board
    data.subjects[0].level = this.state.level
    delete data.isEditing
    delete data.exam_board
    delete data.level
    console.log(this.state)
    updateUserInfo(data)
    this.setState({
      isEditing: false,
    })
  }

  cancelChanges = () => {
    const { currentUser } = this.props
    this.setState({
      isEditing: false,
      school_name: currentUser.school_name,
      exam_board: currentUser.subjects[0].exam_board,
      level: currentUser.subjects[0].level,
      display_name: currentUser.full_name,
      ...currentUser,
    })
  }

  editButton = () => {
    return (
      <div className="edit-button-wrapper">
        <IconSVG name="edit"></IconSVG>
      </div>
    )
  }
  render() {
    const { isEditing } = this.state
    return (
      <div className="details profile-card">
        <div
          className={
            !isEditing
              ? "details__container details-profile-card"
              : "details__container detail-profile-card-edit"
          }
        >
          <div>
            <span className="profile-card-title">Profile</span>
            <div
              className="profile-card-edit-btn"
              onClick={() =>
                isEditing ? this.saveChanges() : this.editProfile(!isEditing)
              }
            >
              {!isEditing ? (
                this.editButton()
              ) : (
                <span className="btn-save">Save</span>
              )}
            </div>
            <div className="profile-card-edit-btn" onClick={this.cancelChanges}>
              {!isEditing ? (
                <React.Fragment />
              ) : (
                <span className="btn-cancel">Cancel</span>
              )}
            </div>
          </div>
          {/* <div className="setting-profile-pic">
            <Image
              className="profile__pic_black"
              src={this.state.profilePic ? this.state.profilePic : profilepic}
              alt=""
              onClick={this.showOpenFileDlg}
            ></Image>

            <input
              ref={this.inputOpenFileRef}
              onChange={this.updateProfilePic}
              type="file"
              accept="image/x-png,image/jpeg"
              style={{ display: "none" }}
            />
          </div> */}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label className="text-title">Name</Form.Label>
              {!isEditing ? (
                <p className="text-view">{this.state.full_name}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-profile"
                  value={this.state.full_name}
                  onChange={(newValue) => {
                    this.setState({
                      full_name: newValue.target.value,
                    })
                  }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formDisplayName">
              <Form.Label className="text-title">Display Name</Form.Label>
              {!isEditing ? (
                <p className="text-view">{this.state.display_name}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-profile"
                  value={this.state.display_name}
                  onChange={(newValue) => {
                    this.setState({
                      display_name: newValue.target.value,
                    })
                  }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="text-title">Email</Form.Label>
              {!isEditing ? (
                <p className="text-view">{this.state.email}</p>
              ) : (
                <Form.Control
                  type="email"
                  className="input-edit-profile"
                  value={this.state.email}
                  onChange={(newValue) => {
                    this.setState({
                      email: newValue.target.value,
                    })
                  }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formSchool">
              <Form.Label className="text-title">School</Form.Label>
              {!isEditing ? (
                <p className="text-view">{this.state.school_name}</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-profile"
                  value={this.state.school_name}
                  onChange={(newValue) => {
                    this.setState({
                      school_name: newValue.target.value,
                    })
                  }}
                />
              )}
            </Form.Group>
            <hr />
            <span className="profile-card-title">GCSE Chemistry details</span>
            <div class="form-select__container">
              <Form.Control
                as="select"
                className="form-select"
                value={this.state.exam_board}
                disabled={!isEditing}
                onChange={(newValue) => {
                  this.setState((new_state) => {
                    return {
                      ...new_state,
                      exam_board: newValue.target.value,
                    }
                  })
                }}
              >
                <option value="OCR_A">OCR A</option>
                <option value="Edexcel">Edexcel</option>
                <option value="AQA">AQA</option>
              </Form.Control>
              <Form.Control
                as="select"
                className="form-select"
                value={this.state.level}
                disabled={!isEditing}
                onChange={(newValue) => {
                  this.setState((new_state) => {
                    return {
                      ...new_state,
                      level: newValue.target.value,
                    }
                  })
                }}
              >
                <option value="foundation">Foundation</option>
                <option value="higher">Higher</option>
              </Form.Control>
            </div>
            {/* <Form.Group controlId="formPassword">
              <Form.Label className="text-title">Password</Form.Label>
              {!isEditing ? (
                <p className="text-view">*********</p>
              ) : (
                <Form.Control
                  type="password"
                  className="input-edit-profile"
                  defaultValue="123456"
                />
              )}
            </Form.Group> */}
          </Form>
          <hr />
          <span className="profile-card-title">EdEq agreements</span>
          <div>
            <button className="agreement-button">Terms and conditions</button>
            <button className="agreement-button">Privacy policy</button>
          </div>
          <hr />
          <span className="profile-card-title">Account actions</span>
          <div>
            <button
              className="account-action__button blue-text"
              onClick={this.props.handleLogout}
            >
              Log me out
            </button>
            <button
              className="account-action__button blue-text"
              onClick={this.props.handleAccountDeletion}
            >
              Delete my account
            </button>
          </div>
        </div>
      </div>
    )
  }
}

import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./setting-account.styles.scss";
import { IconSVG } from "../icon-svg";

export default class SettingAccount extends Component {
  state = {
    isEditing: false,
  };
  editAccount = (isEditing) => {
    this.setState({
      isEditing,
    });
  };

  editButton = () => {
    return (
      <div className="edit-button-wrapper">
        <IconSVG name="edit"></IconSVG>
      </div>
    );
  };
  render() {
    const { isEditing } = this.state;
    return (
      <div className="details account-card">
        <div
          className={
            !isEditing
              ? "details__container details-account-card"
              : "details__container detail-account-card-edit"
          }
        >
          <div>
            <span className="account-card-title">Account</span>
            <div
              className="account-card-edit-btn"
              onClick={() => this.editAccount(!isEditing)}
            >
              {!isEditing ? (
                this.editButton()
              ) : (
                <span className="btn-save">Save</span>
              )}
            </div>
          </div>
          <Form>
            <Form.Group controlId="formParentAccount">
              <Form.Label className="text-title">Parent Account</Form.Label>
              {!isEditing ? (
                <p className="text-view">Jonathon Smithe Senior.</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-account"
                  defaultValue="Jonathon Smithe Senior."
                />
              )}
            </Form.Group>

            {/* <Form.Group controlId="formLorem">
              <Form.Label className="text-title">Lorem</Form.Label>
              {!isEditing ? (
                <p className="text-view">Ipsum</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-account"
                  defaultValue="Ipsum"
                />
              )}
            </Form.Group>
            <Form.Group controlId="formLorem">
              <Form.Label className="text-title">Lorem</Form.Label>
              {!isEditing ? (
                <p className="text-view">Ipsum</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-account"
                  defaultValue="Ipsum"
                />
              )}
            </Form.Group>
            <Form.Group controlId="formLorem">
              <Form.Label className="text-title">Lorem</Form.Label>
              {!isEditing ? (
                <p className="text-view">Ipsum</p>
              ) : (
                <Form.Control
                  type="text"
                  className="input-edit-account"
                  defaultValue="Ipsum"
                />
              )}
            </Form.Group> */}
          </Form>
        </div>
      </div>
    );
  }
}

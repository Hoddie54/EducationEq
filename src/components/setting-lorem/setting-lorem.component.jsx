import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./setting-lorem.styles.scss";
import {IconSVG} from '../icon-svg';

export default class SettingLorem extends Component {
  state = {
    isEditing: false,
  };
  editLorem = (isEditing) => {
    this.setState({
      isEditing,
    });
  };

  editButton = () => {
    return (<div className="edit-button-wrapper"><IconSVG name="edit"></IconSVG></div>)
  }
  render() {
    const { isEditing } = this.state;
    return (
      <div className="details lorem-card">
        <div
          className={
            !isEditing
              ? "details__container details-lorem-card"
              : "details__container detail-lorem-card-edit"
          }
        >
          <div>
            <span className="lorem-card-title">Lorem</span>
            <div
              className="lorem-card-edit-btn"
              onClick={() => this.editLorem(!isEditing)}
            >
            {!isEditing ? this.editButton() : <span className="btn-save">Save</span>}
            </div>
          </div>
          <Form>
            <Form.Group controlId="formLorem">
              <Form.Label className="text-title">Lorem</Form.Label>
              {!isEditing ? <p className="text-view">Ipsum</p> : <Form.Control type="text" className="input-edit-lorem" defaultValue="Ipsum" />}
            </Form.Group>
            <Form.Group controlId="formLorem">
              <Form.Label className="text-title">Lorem</Form.Label>
              {!isEditing ? <p className="text-view">Ipsum</p> : <Form.Control type="text" className="input-edit-lorem" defaultValue="Ipsum" />}
            </Form.Group>
            <Form.Group controlId="formLorem">
              <Form.Label className="text-title">Lorem</Form.Label>
              {!isEditing ? <p className="text-view">Ipsum</p> : <Form.Control type="text" className="input-edit-lorem" defaultValue="Ipsum" />}
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

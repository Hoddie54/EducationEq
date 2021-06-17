import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import "./video-modal.styles.scss";
import { IconSVG } from "../../components/icon-svg";
import ReactStars from "react-rating-stars-component";
import VideoPlayer from "../video-player/video-player.component";

export default class VideoModal extends Component {
  show = (isOpen) => {
    this.setState({ isOpen });
  };

  ratingChanged = (newRating) => {};

  render() {
    const { isOpen, onClose, videoSelected } = this.props;
    return (
      <Modal show={isOpen} onHide={() => onClose()} className="join-modal">
        <Modal.Body>
          <VideoPlayer
            videoLink={videoSelected ? videoSelected.video_link : null}
          ></VideoPlayer>
          <div className="video-player-banner" onClick={() => onClose()}>
            <div>
              <IconSVG name="close"></IconSVG>
            </div>
          </div>
        </Modal.Body>
        <div className="modal-input">
          <div className="form-feedback">
            <Form.Row className="form-feedback__message">
              <Form.Group
                as={Col}
                controlId="formExam"
                className="input-feedback"
              >
                <Form.Control
                  type="text"
                  className="txt-feedback"
                  placeholder="Please add and any feedback on how we can improve our content in future ..."
                ></Form.Control>
                <Button variant="outline-primary" className="btn-feedback">
                  Submit
                </Button>
              </Form.Group>
            </Form.Row>
            <div className="rate-feedback">
              <span className="rate-feedback__title">Rate This Lesson</span>
              <span className="rate-feedback__star">
                <ReactStars
                  count={5}
                  onChange={this.ratingChanged}
                  size={18}
                  isHalf={false}
                  //emptyIcon={<IconSVG name="star"></IconSVG>}
                  //   halfIcon={<i className="fa fa-star-half-alt"></i>}
                  //fullIcon={<IconSVG name="star"></IconSVG>}
                  activeColor="#369AFF"
                />
              </span>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

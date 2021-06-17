import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import QuestionImage from "../question-image/question-image.component";
import "./answer-question.styles.scss";
import questionImg from "../test-question/question_image.jpg";
import { IconSVG } from "../icon-svg";

const questions = [
  { title: "What is the losem ipsum 1?", image: questionImg, answer: "" },
  { title: "What is the losem ipsum 2?", image: "", answer: "" },
  { title: "What is the losem ipsum 3?", image: questionImg, answer: "" },
  { title: "What is the losem ipsum 4?", image: "", answer: "" },
  { title: "What is the losem ipsum 5?", image: questionImg, answer: "" },
];

export default class AnswerQuestion extends Component {
  state = {
    index: 0,
  };

  previous = () => {
    let { index } = this.state;
    if (index > 0) {
      index--;
      this.setState({ index });
    }
  };

  next = () => {
    let { index } = this.state;
    const { answers } = this.props;
    if (index < answers.length - 1) {
      index++;
      this.setState({ index });
    } else {
      this.props.toggleAnswer(false);
    }
  };

  render() {
    const { handleClose, isOpen, answers } = this.props;
    const { index } = this.state;
    return (
      <>
        <Modal
          show={isOpen}
          onHide={() => handleClose()}
          className="answer-modal"
        >
          <Modal.Header className="answer-modal-header">
            <Modal.Title className="answer-modal-title">Revision</Modal.Title>
            <div onClick={() => handleClose()}>
              <IconSVG name="close-circle"></IconSVG>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="answer-number">Question</div>
            <div className="answer-title">
              {answers[index].question.question}
            </div>
            {answers[index].question && answers[index].question.image && (
              <QuestionImage image={questions[index].image}></QuestionImage>
            )}
            <hr />
            <div className="answer">
              <div className="your-answer">
                <div className="your-answer__title">Your Answer:</div>
                <div className="your-answer__content">
                  {answers[index].answer}
                </div>
              </div>
              <div className="correct-answer">
                <div className="correct-answer__title">Correct Answer:</div>
                <div className="correct-answer__content">
                  {answers[index].question.answer}
                </div>
              </div>
            </div>
          </Modal.Body>
          <div className="answer-btn">
            <Button
              variant="outline-secondary"
              onClick={this.previous}
              className="btnPrevious"
            >
              Previous
            </Button>
            <Button variant="primary" onClick={this.next} className="btnNext">
              Next
            </Button>
            <div className="question-index">
              <span className="question-index__preindex">{index + 1}</span> /{" "}
              {answers.length}
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

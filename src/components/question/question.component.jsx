import React from "react";
import { Form } from "react-bootstrap";
import { IconSVG } from "../icon-svg";
import "./question.styles.scss";

export default class Question extends React.Component {
  state = {
    fileAnswer: null,
    fileQuestion: null,
  };

  uploadFile = (e, position) => {
    const files = e.target.files;
    if (files.length > 0) {
      const fileName = files[0].name;
      if (position === "question") {
        this.setState({ fileQuestion: fileName });
      } else if (position === "answer") {
        this.setState({ fileAnswer: fileName });
      }
    }
  };

  removeFile = (position) => {
    if (position === "question") {
      this.setState({ fileQuestion: null });
    } else if (position === "answer") {
      this.setState({ fileAnswer: null });
    }
  };

  render() {
    const { fileAnswer, fileQuestion } = this.state;
    const { question, deleteQuestion, onChangeQuestionProps } = this.props;
    return (
      <div className="form-input-question">
        <div className="question-ans-number">
          <span
            className="question-btn-delete"
            onClick={() => {
              deleteQuestion();
            }}
          >
            Delete
          </span>
          Question
          <span className="question-btn-list">
            <IconSVG name="list"></IconSVG>
          </span>
        </div>
        <Form.Group controlId="formGridAddress1" className="input-answer">
          <Form.Control
            as="textarea"
            rows={4}
            value={question.question}
            className="field__input question-ans-content"
            onChange={(e) => {
              onChangeQuestionProps(question.index, "question", e.target.value);
            }}
          />
          {fileQuestion ? (
            <div className="img-list">
              <span>{fileQuestion}</span>
              <div
                className="img-list__close"
                onClick={() => {
                  this.removeFile("question");
                }}
              >
                <IconSVG name="close-circle"></IconSVG>
              </div>
            </div>
          ) : (
            <>
              <div
                className="upload-img__icon"
                onClick={() => {
                  this.fileQuestion.click();
                }}
              >
                <IconSVG name="photos"></IconSVG>
              </div>
              <input
                ref={(input) => (this.fileQuestion = input)}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  this.uploadFile(e, "question");
                }}
              ></input>
            </>
          )}
        </Form.Group>
        <div className="question-ans-number">Answer</div>
        <Form.Group controlId="formGridAddress1" className="input-answer">
          <Form.Control
            as="textarea"
            rows={8}
            value={question.answer}
            className="field__input question-ans-content"
            onChange={(e) => {
              onChangeQuestionProps(question.index, "answer", e.target.value);
            }}
          />
          {fileAnswer ? (
            <div className="img-list">
              <span>{fileAnswer}</span>
              <div
                className="img-list__close"
                onClick={() => {
                  this.removeFile("answer");
                }}
              >
                <IconSVG name="close-circle"></IconSVG>
              </div>
            </div>
          ) : (
            <>
              <div
                className="upload-img__icon"
                onClick={() => {
                  this.fileAnswer.click();
                }}
              >
                <IconSVG name="photos"></IconSVG>
              </div>
              <input
                ref={(input) => (this.fileAnswer = input)}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  this.uploadFile(e, "answer");
                }}
              ></input>
            </>
          )}
        </Form.Group>
        <div className="question-ans-number">Maximum Marks Available</div>
        <Form.Group controlId="formGridAddress1">
          <Form.Control
            type="text"
            value={question.marks_available.toString()}
            className="field__input question-ans-content"
            onChange={(e) => {
              onChangeQuestionProps(
                question.index,
                "marks_available",
                e.target.value
              );
            }}
          />
        </Form.Group>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import QuestionImage from "../question-image/question-image.component";
import "./test-question.styles.scss";
import questionImg from "./question_image.jpg";
import { IconSVG } from "../icon-svg";

// const questions = [
//   { title: 'What is the losem ipsum 1?', image: questionImg, answer: '' },
//   { title: 'What is the losem ipsum 2?', image: '', answer: '' },
//   { title: 'What is the losem ipsum 3?', image: questionImg, answer: '' },
//   { title: 'What is the losem ipsum 4?', image: '', answer: '' },
//   { title: 'What is the losem ipsum 5?', image: questionImg, answer: '' }
// ]

export default class TestQuestion extends Component {
  state = {
    index: 0,
    answerShown: false,
    showAnswerInput: false,
    currentMark: 0,
    isLastQuestion: false,
    answers: [],
  };

  previous = () => {
    let { index } = this.state;
    if (index > 0) {
      index--;
      this.setState({ index, answerShown: true });
    }
  };

  next = () => {
    const { questions, handleClose } = this.props;
    let { index, answerShown, currentMark } = this.state;
    if (!answerShown) {
      this.setState({
        answerShown: true,
        showAnswerInput: true,
        isLastQuestion: index == questions.length - 1,
      });
      return;
    }

    if (questions[index].student_answer != "") {
      let answers = this.state.answers;
      const marks =
        questions[index].answer == questions[index].student_answer
          ? questions[index].marks_available
          : 0;

      answers.push({
        question_id: questions[index].id,
        number_of_marks: parseInt(currentMark),
        total_marks: questions[index].marks_available,
        answer: questions[index].student_answer,
        time_stamp: Date.now(),
      });
      this.setState({ answers });
    }
    if (index < questions.length - 1 && answerShown) {
      index++;
      if (questions[index].student_answer == undefined) {
        questions[index].student_answer = "";
      }
      this.setState({
        index,
        answerShown: false,
        showAnswerInput: false,
        currentMark: 0,
      });
    } else {
      this.props.handleSaveAnswers(this.state.answers);
      handleClose();
    }
  };

  skip = () => {
    const { questions, handleClose } = this.props;
    let { index } = this.state;
    if (index < questions.length - 1) {
      index++;
      if (questions[index].student_answer == undefined) {
        questions[index].student_answer = "";
      }
      this.setState({ index, answerShown: false });
    } else {
      handleClose();
    }
  };

  saveAnswer = (event) => {
    const { questions } = this.props;
    const { index } = this.state;
    const answer = event.target.value;
    if (answer) {
      questions[index].student_answer = answer;
    } else {
      questions[index].student_answer = "";
    }
    this.setState({ index });
  };

  updateMarks = (value) => {
    if (!value.includes("/")) {
      this.setState({ currentMark: 0 });
      return;
    }
    const mark = value.split("/")[0];
    this.setState({ currentMark: mark });
  };

  render() {
    const { handleClose, isOpen, questions, title } = this.props;
    const { index, answerShown, isLastQuestion, showAnswerInput } = this.state;
    return (
      <>
        <Modal
          show={isOpen}
          onHide={() => handleClose()}
          className="question-modal"
        >
          {questions.length > 0 ? (
            <React.Fragment>
              <Modal.Header className="question-modal-header">
                <Modal.Title className="question-modal-title">
                  {title}
                </Modal.Title>
                <div onClick={() => handleClose()}>
                  <IconSVG name="close-circle"></IconSVG>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="question-number">
                  {/* Question {questions[index].index} of {questions.length} */}
                </div>
                <div className="question-title">
                  {questions[index].question}
                </div>
                {answerShown && (
                  <div>
                    <hr />
                    <div className="question-number">Your answer:</div>
                    <div className="question-title">
                      {questions[index].student_answer}
                    </div>
                    <div className="question-number">Correct answer:</div>
                    <div className="question-title">
                      {questions[index].answer}
                    </div>
                    <hr />
                  </div>
                )}

                {questions[index] && questions[index].image && (
                  <QuestionImage image={questions[index].image}></QuestionImage>
                )}

                <Form.Group controlId="formGridAddress1">
                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Type the answer/ mark scheme here"
                    className="field__input question-content"
                    value={questions[index].student_answer}
                    onChange={this.saveAnswer}
                  />
                </Form.Group>
              </Modal.Body>
              <div className="question-btn">
                {/* <Button
                  variant="outline-secondary"
                  onClick={this.previous}
                  className="btnPrevious"
                >
                  Previous
                </Button> */}
                {showAnswerInput && (
                  <div>
                    <Form.Control
                      className="text-input"
                      style={{ width: 90, marginBottom: -36, borderRadius: 24 }}
                      value={`${this.state.currentMark}/${questions[index].marks_available}`}
                      onChange={(newValue) => {
                        this.updateMarks(newValue.target.value);
                      }}
                    />
                  </div>
                )}

                <Button
                  variant="primary"
                  onClick={this.next}
                  className="btnNext"
                >
                  {isLastQuestion ? "Finish" : "Next"}
                </Button>
                {!isLastQuestion && (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      handleClose();
                    }}
                    className="btnSkip"
                  >
                    Skip
                  </Button>
                )}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Modal.Header className="question-modal-header">
                <Modal.Title className="question-modal-title">
                  This lesson has no questions
                </Modal.Title>
                <div onClick={() => handleClose()}>
                  <IconSVG name="close-circle"></IconSVG>
                </div>
              </Modal.Header>
            </React.Fragment>
          )}
        </Modal>
      </>
    );
  }
}

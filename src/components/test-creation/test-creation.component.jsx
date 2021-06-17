import React, { Component } from "react";
import Question from "../question/question.component";
import { Button, Modal } from "react-bootstrap";
import "./test-creation.styles.scss";
import { IconSVG } from "../icon-svg";
import { fetchQuestions } from "./../../utils/firebase/firestore";

let questions = [
  {
    index: 1,
    question: "Lorem Ipsum 1",
    point: 1,
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    index: 2,
    question: "Lorem Ipsum 2",
    point: 2,
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default class TestCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };

    this.handleFetchQuestions();
  }
  addQuestion = () => {
    let { questions } = this.state;
    questions = [
      ...questions,
      {
        index: questions.length + 1,
        question: "",
        answer: "",
        marks_available: 3,
      },
    ];
    this.setState({ questions });
  };

  handleFetchQuestions = () => {
    if (
      this.props.lesson_id == undefined &&
      this.props.topic.end_of_topic_questions
    ) {
      this.state.questions = this.props.topic.end_of_topic_questions;
    } else {
      const { course_id, topic_id, lesson_id } = this.props;
      fetchQuestions(course_id, topic_id, lesson_id)
        .then((questions) => {
          console.log(questions);
          this.setState({ questions });
        })
        .catch((err) => {
          console.log("handleFetchQuestions:" + err.message);
        });
    }
  };

  deleteQuestion = (index) => {
    let { questions } = this.state;
    questions.splice(index, 1);
    this.setState({ questions });
  };

  onChangeQuestionProps = (index, key, value) => {
    let { questions } = this.state;
    const pos = questions.findIndex((item) => item.index === index);
    if (key == "marks_available") {
      if (value.length == 0) value = "0";
      questions[pos] = { ...questions[pos], [key]: parseInt(value, 10) };
    } else {
      questions[pos] = { ...questions[pos], [key]: value };
    }

    this.setState({ questions });
  };

  handleSaveQuestions = () => {
    if (this.props.handleSaveQuestions == undefined) {
      this.props.handleSaveEndOfTopicQuestions(this.state.questions);
    } else {
      this.props.handleSaveQuestions(this.state.questions);
    }
  };

  render() {
    const { questions } = this.state;
    const { handleClose, show, title } = this.props;
    return (
      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
        className="question-modal"
      >
        <Modal.Header className="question-modal-header">
          <Modal.Title className="question-modal-title">{title}</Modal.Title>
          <div onClick={() => handleClose()}>
            <IconSVG name="close-circle"></IconSVG>
          </div>
        </Modal.Header>
        <Modal.Body>
          {questions.map((question, index) => {
            return (
              <Question
                key={index}
                question={question}
                deleteQuestion={() => {
                  this.deleteQuestion(index);
                }}
                onChangeQuestionProps={this.onChangeQuestionProps}
              />
            );
          })}
        </Modal.Body>
        <div className="question-btn">
          <Button
            variant="outline-primary"
            onClick={this.handleSaveQuestions}
            className="btnComplete"
          >
            Complete
          </Button>
          <Button
            variant="primary"
            onClick={this.addQuestion}
            className="btnAddQuestion edit-test-button "
          >
            Add Question
          </Button>
        </div>
      </Modal>
    );
  }
}

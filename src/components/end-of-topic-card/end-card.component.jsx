import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { IconSVG } from "../icon-svg";
import TestCreation from "../test-creation/test-creation.component";
import VerifyAccount from "../../components/verify-account/verify-account.component";
import TestQuestion from "../test-question/test-question.component";
import "./end-card.styles.scss";
import { updateTopic } from "./../../utils/firebase/firestore";
export default class EndOfTopicCard extends Component {
  state = {
    isEdit: false,
    isToggleEditQuestion: false,
    isShowVerify: false,
    isToggleTest: false,
    isToggleAnswer: false,
  };

  toggleVerify = (value) => {
    this.setState({
      isShowVerify: value,
    });
  };

  toggleEdit = (value) => {
    this.setState({ isEdit: value });
  };

  toggleTest = (value) => {
    this.setState({
      isToggleTest: value,
    });
  };

  toggleAnswer = (value) => {
    this.setState({
      isToggleAnswer: value,
    });
  };

  toggleEditQuestion = (value) => {
    this.setState({
      isToggleEditQuestion: value,
    });
  };

  handleSaveAnswers = (data) => {
    let { topic, course_id } = this.props;
    const newData = data.map((val) => ({
      lesson_id: "end_of_topic",
      topic_id: topic.id,
      course_id,
      id: Math.random().toString(36),
      ...val,
    }));
    this.props.handleSaveAnswers(newData);
    // this.handleFetchAnswers();
  };

  handleSaveEndOfTopicQuestions = (questions) => {
    const { course_id, topic_id } = this.props;
    updateTopic(course_id, topic_id, {
      end_of_topic_questions: questions,
    }).then(() => {
      this.setState({ isToggleEditQuestion: false });
      this.props.reloadTopics();
    });
  };

  render() {
    const { isEditPage, title, isEditable, user_type } = this.props;
    const {
      isEdit,
      isToggleEditQuestion,
      isShowVerify,
      isToggleTest,
      isToggleAnswer,
    } = this.state;
    return (
      <>
        <div className="details end-card">
          <div className="end-container details-end-card">
            {isEditPage &&
              (!isEdit ? (
                <div
                  className="btn-edit"
                  onClick={() => {
                    this.toggleEdit(true);
                  }}
                >
                  {isEditable && <IconSVG name="edit"></IconSVG>}
                </div>
              ) : (
                <div
                  className="btn-edit__save"
                  onClick={() => {
                    this.toggleEdit(false);
                  }}
                >
                  Save
                </div>
              ))}
            <div className="spacing-container-end">
              {!isEdit ? (
                <>
                  <div className="end-card-title">{title}</div>
                  <div className="end-card-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                  {user_type != "teacher" && (
                    <Button
                      variant="outline-primary"
                      className="end-card-btn"
                      onClick={() => {
                        // this.toggleVerify(true);
                        this.toggleTest(true);
                      }}
                    >
                      {" "}
                      End of Topic Test
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="opacity-50">
                    <div className="end-card-title">Mechanics</div>
                    <div className="end-card-content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </div>
                  </div>
                  <Button
                    variant="outline-primary"
                    className="end-card-btn__question"
                    onClick={() => {
                      this.toggleEditQuestion(true);
                    }}
                  >
                    {" "}
                    Edit Questions
                  </Button>
                  <TestCreation
                    handleClose={() => {
                      this.toggleEditQuestion(false);
                    }}
                    topic={this.props.topic}
                    show={isToggleEditQuestion}
                    handleSaveEndOfTopicQuestions={
                      this.handleSaveEndOfTopicQuestions
                    }
                  ></TestCreation>
                </>
              )}
            </div>
          </div>
        </div>
        <TestQuestion
          handleClose={() => {
            this.toggleTest(false);
          }}
          isOpen={isToggleTest}
          title={`${this.props.topic.title}: End of Topic Test`}
          questions={
            this.props.topic.end_of_topic_questions
              ? this.props.topic.end_of_topic_questions
              : []
          }
          handleSaveAnswers={this.handleSaveAnswers}
        ></TestQuestion>
        <VerifyAccount
          message="Before you can add links or images to your lessons we need to verify your account with a school email address. Please enter yours to get verified."
          show={isShowVerify}
          handleHide={this.toggleVerify}
          handleVerify={this.toggleVerify}
        ></VerifyAccount>
      </>
    );
  }
}

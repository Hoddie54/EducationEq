import React, { useState, useEffect } from "react";
import { Row, Form } from "react-bootstrap";
import { IconSVG } from "../icon-svg";
import EditAction from "../../components/edit-action/edit-action.component";
import "./lesson-page-top.styles.scss";
import { updateCourseDetails } from "./../../utils/firebase/firestore";
import { subjects, examBoards, levels } from "./../../utils/helpers/data";

class LessonPageTop extends React.Component {
  constructor(props) {
    super(props);
    const { title, class_code, subject, level, exam_board } = this.props.course;
    this.state = {
      id: this.props.course_id,
      isEdited: this.props.isNewCourse,
      title: title,
      class_code: class_code,
      subject: subject,
      level: level,
      exam_board: exam_board,
    };
    console.log("this.props.coursethis.props.course", this.props.course);
  }

  render() {
    const handleEdit = () => {
      this.setState({ isEdited: true });
    };

    const handleSave = () => {
      this.setState({ isEdited: false });
      const data = this.state;
      delete data.isEdited;
      updateCourseDetails(data);
    };

    const handleCancel = () => {
      this.setState({ isEdited: false });
      this.setState({ title: this.props.course.title });
    };

    // const changeClassCode = (event) => {
    //   setClassCode(event.target.value);
    // };
    const {
      isEdited,
      title,
      class_code,
      subject,
      level,
      exam_board,
    } = this.state;
    const { course } = this.props;
    return (
      <div className="page__row page__bn1">
        <div className="banner">
          <Row className="courses-top">
            <div className="banner">
              <div className="banner__container banner-top">
                <span className="text-header">
                  {!isEdited ? (
                    this.state.title
                  ) : (
                    <Form.Group className="form-input title-input">
                      <Form.Control
                        className="text-input"
                        value={this.state.title}
                        onChange={(newValue) => {
                          this.setState({
                            title: newValue.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  )}
                </span>
                <div className="nav-header banner-option">
                  {!isEdited ? (
                    <div
                      style={{ marginRight: 15, cursor: "pointer" }}
                      onClick={() =>
                        navigator.clipboard.writeText(course.class_code)
                      }
                    >
                      Class code:{" "}
                      <span className="class-code">
                        {course.class_code}{" "}
                        <IconSVG name="link" style={{ width: 20 }}></IconSVG>
                      </span>
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                  <div
                    className={!isEdited ? "border-right" : "no-border-right"}
                  >
                    {!isEdited ? (
                      course.subject
                    ) : (
                      <Form.Group>
                        <Form.Control
                          as="select"
                          className="form-control-select teacher-select"
                          onChange={(e) => {
                            this.setState({ subject: e.target.value });
                          }}
                        >
                          {subjects.map((subject, index) => {
                            return (
                              <option
                                selected={this.state.subject == subject}
                                key={index}
                              >
                                {subject}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    )}
                  </div>
                  <div
                    className={!isEdited ? "border-right" : "no-border-right"}
                  >
                    {!isEdited ? (
                      course.level
                    ) : (
                      <Form.Group>
                        <Form.Control
                          as="select"
                          className="form-control-select teacher-select"
                          onChange={(e) => {
                            this.setState({ level: e.target.value });
                          }}
                        >
                          {levels.map((level, index) => {
                            return (
                              <option
                                selected={this.state.level == level}
                                key={index}
                              >
                                {level}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    )}
                  </div>
                  <div className="no-border-right">
                    {!isEdited ? (
                      course.exam_board
                    ) : (
                      <Form.Group>
                        <Form.Control
                          as="select"
                          className="form-control-select teacher-select"
                          onChange={(e) => {
                            this.setState({ exam_board: e.target.value });
                          }}
                        >
                          {examBoards.map((examBoard, index) => {
                            return (
                              <option
                                selected={this.state.exam_board == examBoard}
                                key={index}
                              >
                                {examBoard}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                    )}
                  </div>
                  <div className="btn-edit">
                    {isEdited && (
                      <EditAction
                        cancel={handleCancel}
                        save={handleSave}
                      ></EditAction>
                    )}
                    <span onClick={handleEdit}>
                      {!isEdited && <IconSVG name="edit"></IconSVG>}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
export default LessonPageTop;

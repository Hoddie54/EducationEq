import React, { useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import "./join-course.styles.scss";

const JoinCourse = (props) => {
  const [show, setShow] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setlevel] = useState("");
  const [examBoard, setExamBoard] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJoinCourse = () => {
    if (subject.length > 0 && level.length > 0 && examBoard.length > 0) {
      props.handleJoinCourse(undefined, { subject, level, examBoard });
      handleClose();
      return;
    }
    props.handleJoinCourse(courseCode, undefined);
    handleClose();
  };

  const getSubjects = () => {
    const { courses } = props;
    return courses.filter((course) => {
      const filterOne = level != "" ? course.level == level : true;
      const filterTwo = examBoard != "" ? course.exam_board == examBoard : true;
      return filterOne && filterTwo;
    });
  };

  const getLevels = () => {
    const { courses } = props;
    return courses.filter((course) => {
      const filterOne = subject != "" ? course.subject == subject : true;
      const filterTwo = examBoard != "" ? course.exam_board == examBoard : true;
      return filterOne && filterTwo;
    });
  };

  const getBoards = () => {
    const { courses } = props;
    return courses.filter((course) => {
      const filterOne = level != "" ? course.level == level : true;
      const filterTwo = subject != "" ? course.subject == subject : true;
      return filterOne && filterTwo;
    });
  };

  return (
    <>
      <div className="details join-course-card">
        <div className="details__container details-join-course-card">
          <Button
            variant="outline-primary"
            className="join-course-card-btn"
            onClick={handleShow}
          >
            + Join Course
          </Button>
          <div className="join-course-card-content">
            Explore public courses or enter a course code to start learning.
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className="join-modal">
        <Modal.Header className="join-modal-header">
          <Modal.Title className="join-modal-title">Join a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="formSubject">
              <Form.Control
                as="select"
                className="form-control-select"
                onChange={(e) => {
                  setSubject(e.target.value);
                  setlevel("");
                  setExamBoard("");
                }}
              >
                <option value="" selected disabled hidden>
                  Select Subject
                </option>
                {props.courses.map((course, index) => {
                  return (
                    <option key={index} value={course.subject}>
                      {course.subject}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formLevel">
              <Form.Control
                as="select"
                className="form-control-select"
                onChange={(e) => {
                  setlevel(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Level (i.e. GSCE)
                </option>
                {getLevels().map((course, index) => {
                  return (
                    <option key={index} value={course.level}>
                      {course.level}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formExam">
              <Form.Control
                as="select"
                className="form-control-select"
                onChange={(e) => {
                  setExamBoard(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Exam Board (i.e. AQA)
                </option>
                {getBoards().map((course, index) => {
                  return (
                    <option key={index} value={course.exam_board}>
                      {course.exam_board}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <p className="text-center join-or">OR</p>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              placeholder="Course Code"
              className="field__input"
              value={courseCode}
              onChange={(e) => {
                setCourseCode(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Button
          variant="primary"
          onClick={handleJoinCourse}
          className="btnJoin"
        >
          Join Course
        </Button>
      </Modal>
    </>
  );
};
export default JoinCourse;

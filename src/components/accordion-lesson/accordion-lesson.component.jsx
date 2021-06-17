import React, { Component } from "react";
import { connect } from "react-redux";
import "./accordion-lesson.styles.scss";
import { Row, Card, Accordion, Form, Button } from "react-bootstrap";
import VideoCard from "../../components/video-card/video-card.component";
import VideoModal from "../../components/video-modal/video-modal.component";
import EndOfTopicCard from "../../components/end-of-topic-card/end-card.component";
import { IconSVG } from "../../components/icon-svg";
import AddCourseCard from "../../components/add-course-card/addcard.component";
import EditAction from "../../components/edit-action/edit-action.component";

import _ from "lodash";
import {
  updateTopic,
  fetchTopic,
  fetchLessons,
  fetchAnswers,
  updateLesson,
  deleteLessonFromFirestore,
  saveAnswersToFirestore,
  saveLessonToFirestore,
  saveQuestionsToFirestore,
} from "./../../utils/firebase/firestore";
import { setLesson } from "../../utils/redux/lesson/lesson.action";
import { setCurrentTopic } from "./../../utils/redux/topic/topic.action";

class AccordionLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSelected: {},
      isEdited: this.props.isNewCourse ? props.isNewCourse : false,
      isOpenModal: false,
      topic: props.topic,
      topic_title: props.topic.title,
      topic_description: props.topic.description,
      lessons: [],
    };
    if (this.props.isNewCourse) {
      this.props.editAccordion(1);
    }
    this.handleFetchLessons();
  }

  handleEdit = (isEdit, index = null) => {
    this.setState({
      isEdited: isEdit,
    });
    if (index) {
      this.props.editAccordion(index);
    }
  };

  showModal = (video) => {
    this.setState({
      isOpenModal: true,
      videoSelected: video,
    });
  };

  onClose = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  addVideo = () => {
    const { course_id } = this.props;
    const data = {
      video_link: "",
      title: "New video",
      lesson_number: this.state.lessons.length,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      topic_id: this.props.topic.id,
      links: [],
    };

    saveLessonToFirestore(course_id, data).then(() => {
      this.handleFetchLessons();
    });
  };

  handleFetchLessons = () => {
    const { course_id, topic, setLesson } = this.props;
    console.log("course_id:", course_id);
    console.log("topic id:", topic.id);
    fetchLessons(course_id, topic.id)
      .then((lessons) => {
        console.log("Fetched lessons:", lessons);
        this.setState({ lessons });
        setLesson(lessons);
      })
      .catch((err) => {
        setLesson([]);
        alert(err.message);
      });
  };

  handleUpdateLesson = (lesson_id, data) => {
    const { course_id, topic } = this.props;
    updateLesson(course_id, topic.id, lesson_id, data).then(() => {
      this.handleFetchLessons();
    });
  };

  handleDeleteLesson = (lesson_id) => {
    const { course_id, topic } = this.props;
    deleteLessonFromFirestore(course_id, topic.id, lesson_id).then(() => {
      this.handleFetchLessons();
    });
  };

  handleUpdateVideoLink = (lesson_id, links) => {
    const { course_id, topic } = this.props;
    updateLesson(course_id, topic.id, lesson_id, links).then(() => {
      this.handleFetchLessons();
    });
  };

  handleUpdateLessonVideoLink = (lesson_id, link) => {
    const { course_id, topic } = this.props;
    updateLesson(course_id, topic.id, lesson_id, link).then(() => {
      this.handleFetchLessons();
    });
  };

  handleSaveTopicChanges = () => {
    const { course_id, topic, setCurrentTopic, reloadTopics } = this.props;
    updateTopic(course_id, topic.id, {
      title: this.state.topic_title,
      description: this.state.topic_description,
    })
      .then(() => {
        const newTopic = {
          ...this.state.topic,
          title: this.state.topic_title,
          description: this.state.topic_description,
        };
        this.setState(
          {
            topic: newTopic,
          },
          () => {
            setCurrentTopic(newTopic);
            reloadTopics();
          }
        );
        this.handleEdit(false, topic.id);
        this.onClose();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  handleSaveQuestions = (lesson_id, data) => {
    const { course_id, topic } = this.props;
    saveQuestionsToFirestore(course_id, topic.id, lesson_id, data)
      .then(() => {
        this.handleFetchLessons();
        fetchAnswers(lesson_id).then((answers) => {
          this.setState({ answers });
        });
      })
      .catch((err) => {
        alert("handleSaveQuestions: " + err.message);
      });
  };

  handleSaveAnswers = (data) => {
    saveAnswersToFirestore(data)
      .then(() => {
        this.handleFetchLessons();
      })
      .catch((err) => {
        alert("handleSaveAnswers: " + err.message);
      });
  };

  handleFetchTopic = (course_id, topic_id) => {
    fetchTopic(course_id, topic_id).then((topic) => {
      this.setState({ topic });
    });
  };

  reloadTopics = () => {
    const { course_id, topic } = this.props;
    console.log("reload topics with:", course_id, topic.id);
    this.handleFetchTopic(course_id, topic.id);
  };

  render() {
    const {
      handleChange,
      updateVideoLink,
      // toggle,
      // addVideoCard,
      topicCreated,
      isNewCourse,
      firstTopic,
      lastTopic,
      topics,
      isEditable,
      // topic,
      course_id,
      isEditPage,
      currentUser,
    } = this.props;

    const { videoSelected, isEdited, lessons, topic } = this.state;

    return (
      <>
        {/* <Accordion
            id={`topic${topic.id}`}
            defaultActiveKey={topic.isToggle ? `${topic.id}` : null}
          > */}
        <Card className="card-course">
          <Card.Header className="card-header">
            {/* <Accordion.Toggle
              onClick={() => {
                // toggle(topic);
              }}
              variant="link"
              eventKey={`${topic.id}`}
              className="btn-hide"
            >
              {firstTopic === topic && <i className="ee-chevron-down"></i>}
              {lastTopic === topic && <i className="ee-chevron-up"></i>}
              <span className="card-title">&nbsp; {topic.title}</span>
            </Accordion.Toggle> */}

            {/* <span className="card-title">&nbsp; {topic.title}</span> */}
          </Card.Header>
          {/* <Accordion.Collapse eventKey={`${topic.id}`}> */}
          <Card.Body className="card-body">
            <div className="course-header">
              {_.includes(topicCreated, topic.id) ? (
                <>
                  <Form.Control
                    type="text"
                    className="input-text-title"
                    value={this.state.topic_title}
                    onChange={(newValue) => {
                      this.setState({
                        topic_title: newValue.target.value,
                      });
                      handleChange(newValue, topic.id);
                    }}
                  />
                  <Button variant="outline-primary" className="btn-test-all">
                    Test All
                  </Button>
                </>
              ) : (
                <span className="text-title">{topic.title}</span>
              )}
              <div className="course-edit">
                {_.includes(topicCreated, topic.id) && isEditable && (
                  <EditAction
                    save={() => this.handleSaveTopicChanges()}
                  ></EditAction>
                )}
                <span onClick={() => this.handleEdit(true, topic.id)}>
                  {!_.includes(topicCreated, topic.id) && isEditable && (
                    <IconSVG name="edit"></IconSVG>
                  )}
                </span>

                {/* </div> */}
              </div>
            </div>
            {_.includes(topicCreated, topic.id) ? (
              <Form.Control
                className="input-description"
                as="textarea"
                rows={3}
                value={this.state.topic_description}
                onChange={(newValue) => {
                  this.setState({
                    topic_description: newValue.target.value,
                  });
                }}
              />
            ) : (
              <p className="text-description">{topic.description}</p>
            )}
            <Row className="lst-video">
              {lessons &&
                lessons.length > 0 &&
                lessons.map((videoObject, index) => {
                  return (
                    <VideoCard
                      key={index}
                      videoObject={videoObject}
                      showModal={this.showModal}
                      isEditPage={true}
                      // isNewCreated={topic.lessons[index].isNewCreated}
                      isNewCourse={isNewCourse}
                      handleUpdateLesson={this.handleUpdateLesson}
                      handleSaveQuestions={this.handleSaveQuestions}
                      handleUpdateVideoLink={this.handleUpdateVideoLink}
                      handleUpdateLessonVideoLink={
                        this.handleUpdateLessonVideoLink
                      }
                      handleDeleteLesson={this.handleDeleteLesson}
                      course_id={course_id}
                      topic={topic}
                      isEditable={isEditable}
                      isNewCourse={isNewCourse}
                      handleSaveAnswers={this.handleSaveAnswers}
                    ></VideoCard>
                  );
                })}
              <EndOfTopicCard
                topic={topic}
                title={topic.title}
                isEditPage={true}
                isEditable={isEditable}
                reloadTopics={this.reloadTopics}
                course_id={course_id}
                topic_id={topic.id}
                user_type={currentUser.user_type}
                handleSaveAnswers={this.handleSaveAnswers}
              ></EndOfTopicCard>
              {isEditable && <AddCourseCard addVideoCard={this.addVideo} />}
            </Row>
            <VideoModal
              isOpen={this.state.isOpenModal}
              onClose={this.onClose}
              videoSelected={videoSelected}
            ></VideoModal>
          </Card.Body>
          {/* </Accordion.Collapse> */}
        </Card>
      </>
    );
  }
}

const mapDispatchStateToProps = (dispatch) => ({
  setLesson: (user) => dispatch(setLesson(user)),
  setCurrentTopic: (topic) => dispatch(setCurrentTopic(topic)),
});

const mapStateToProps = (state) => ({
  currentTopic: state.topic.currentTopic,
  currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(AccordionLesson);

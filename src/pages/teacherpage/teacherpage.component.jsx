import React, { Component } from "react";
import "./teacherpage.styles.scss";
import NavigationBarCollapsed from "../../navigation/navigation-bar-collapsed/navigation-bar-collapsed.component";
import CourseNav from "../../navigation/course-nav/course-nav.component";
import { Row, Col } from "react-bootstrap";
import LessonPageTop from "../../components/lesson-page-top/lesson-page-top.component";
import AccordionLesson from "../../components/accordion-lesson/accordion-lesson.component";
import logo from "../../assets/logo.svg";
import _ from "lodash";
import { connect } from "react-redux";
import { setCurrentTopic } from "./../../utils/redux/topic/topic.action";
import {
  fetchCourse,
  fetchTopics,
  saveTopicToFirestore,
  saveLessonToFirestore,
} from "./../../utils/firebase/firestore";
import SpinnerPage from "../spinner/spinner.component";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

const listVideoObject = [
  {
    id: 1,
    link: "https://www.youtube.com/embed/tgbNymZ7vqY",
    title: "Mechanics",
    unit: 2.1,
    lesson: 1,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna...`,
    current: 4,
    max: 5,
    titleBtn: "Try Again",
  },
];

class TeacherPage extends Component {
  constructor(props) {
    super(props);
    // parse collapsed status from props
    this.state = {
      isCollapsed: true,
      isOpenOptics: false,
      isOpenModal: false,
      isEdited: false,
      title: "Mechanics",
      videoSelected: {},
      course: {},
      topics: [],
      accordions: [
        {
          index: 1,
          title: "Radioactivity",
          description: text,
          lessons: listVideoObject,
          isToggle: true,
        },
      ],
      editedObject: [],
      topicCreated: [],
    };
    this.sidebar_click = this.sidebar_click.bind(this);
  }

  componentDidMount() {
    this.handleFetchCourse();
  }

  UNSAFE_componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.handleFetchCourse(nextProps.match.params.id);
    }
  }

  handleFetchCourse = (courseId = this.props.match.params.id) => {
    // let params = new URLSearchParams(this.props.location.search);
    // if (this.state.course == null) {
    fetchCourse(courseId)
      .then((course) => {
        // console.log("fetched course:", course);
        this.setState({ course });
        this.handleFetchTopics(course);
      })
      .catch((err) => {
        console.log("course does not exist");
      });
    // }
  };

  handleFetchTopics = (course) => {
    const { setCurrentTopic } = this.props;
    fetchTopics(course.id)
      .then((topics) => {
        this.setState(
          {
            topics,
            currentIndex: 0,
          },
          () => {
            setCurrentTopic(this.state.topics[0]);
          }
        );
      })
      .catch((err) => {
        // alert(err.message);
        this.setState({
          course: {},
          topics: [],
        });
      });
  };

  sidebar_click() {
    this.setState((state) => ({
      isCollapsed: !state.isCollapsed,
    }));
    let page = document.getElementsByClassName("page")[0];

    if (page.classList.contains("toggle") && !this.state.isCollapsed) {
      page.classList.remove("toggle");
    } else {
      page.classList.add("toggle");
    }

    let sidebar = document.getElementsByClassName("sidebar")[0];

    if (sidebar.classList.contains("active") && !this.state.isCollapsed) {
      sidebar.classList.remove("active");
    } else {
      sidebar.classList.add("active");
    }
  }

  toggle = (accordion) => {
    let { accordions } = this.state;
    accordions.forEach((item) => {
      if (item.index === accordion.index) {
        item.isToggle = !item.isToggle;
      }
    });
    this.setState({ accordions });
  };

  editAccordion = (value) => {
    let { editedObject, topicCreated } = this.state;
    if (_.includes(editedObject, value)) {
      _.remove(editedObject, (item) => item === value);
    } else {
      editedObject.push(value);
    }
    if (_.includes(topicCreated, value)) {
      _.remove(topicCreated, (item) => item === value);
    } else {
      topicCreated.push(value);
    }

    this.setState({ editedObject, topicCreated });
  };

  toggleOptics = (isOpenOptics) => {
    this.setState({
      isOpenOptics,
    });
  };

  handleChange = (event, index) => {
    let { accordions } = this.state;
    let title = event.target.value;
    accordions.forEach((item) => {
      if (item.index === index) {
        item.title = title;
      }
    });
  };

  updateVideoLink = (videoObj, index) => {
    console.log(videoObj);
    let { accordions } = this.state;
    const accordionIndex = accordions.findIndex((item) => item.index === index);
    const selectedAccordion = accordions[accordionIndex];
    // console.log("arc:", accordions);
    if (selectedAccordion.videos.length > 0) {
      const index = selectedAccordion.videos.findIndex(
        (item) => item.id === videoObj.id
      );
      selectedAccordion.videos[index] = videoObj;
    }
    accordions[accordionIndex] = selectedAccordion;
    this.setState({ accordions });
  };

  createTopic = () => {
    let { topics, topicCreated, course } = this.state;
    const topic = {
      index: topics.length + 1,
      title: `Topic ${topics.length + 1}`,
      description: "New topic description",
      lessons: [],
      isToggle: true,
    };
    topics.push(topic);
    topicCreated.push(topic.index);
    // this.setState({ topics, topicCreated });
    saveTopicToFirestore({
      title: `Topic ${topics.length + 1}`,
      description: "New topic description",
      course_id: this.state.course.id,
    })
      .then(() => {
        this.handleFetchTopics(course);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  addVideoCard = (topic, lessons_length) => {
    const data = {
      video_link: "",
      title: "New video",
      lesson_number: lessons_length,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      topic_id: topic.id,
      links: [],
    };

    saveLessonToFirestore(this.state.course.id, data).then(() => {
      // const { topics } = this.state;
      // topic.lessons.push(data);

      // this.refreshPage();
      this.handleFetchTopics(this.state.course);
    });

    // let { accordions } = this.state;
    // const indexAccordion = accordions.findIndex(
    //   (item) => item.index === accordionIndex
    // );
    // if (accordions[indexAccordion] && accordions[indexAccordion].videos) {
    //   const newVideoCard = {
    //     id: accordions[indexAccordion].videos.length + 1,
    //     link: "",
    //     title: "new video",
    //     unit: 2.1,
    //     lesson: 1,
    //     description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //     sed do eiusmod tempor incididunt ut labore et dolore magna...`,
    //     current: 2,
    //     max: 5,
    //     titleBtn: "Try Again",
    //     isNewCreated: true,
    //   };

    //   accordions[indexAccordion].videos.push(newVideoCard);

    //   this.setState({ accordions });
    // }
  };

  reloadTopics = () => {
    const { course } = this.state;
    this.handleFetchTopics(course);
  };
  refreshPage = () => {
    window.location.reload();
  };

  componentWillMount() {
    // fetch data in here, update it back to states
    let params = new URLSearchParams(this.props.location.search);
    let newcourse = params.get("newcourse");

    if (newcourse === "true") {
      this.setState({ isNewCourse: true, isEdited: true });
    } else {
      this.setState({ isNewCourse: false, isEdited: false });
    }
  }

  nextTopic = () => {
    const { currentIndex } = this.state;
    this.setState({
      currentIndex: currentIndex + 1,
    });
  };

  preTopic = () => {
    const { currentIndex } = this.state;
    this.setState({
      currentIndex: currentIndex - 1,
    });
  };

  handleMenuClick = (index) => {
    const { setCurrentTopic } = this.props;
    this.setState({ currentIndex: index });
    setCurrentTopic(this.state.topics[index]);
  };

  render() {
    let {
      accordions,
      editedObject,
      topicCreated,
      course,
      isNewCourse,
      topics,
      currentIndex,
    } = this.state;

    let preTopic,
      nextTopic = null;
    preTopic = topics[currentIndex - 1];
    nextTopic = topics[currentIndex + 1];

    if (currentIndex === 0) {
      preTopic = null;
    }

    if (currentIndex === topics.length - 1) {
      nextTopic = null;
    }

    return (
      <React.Fragment>
        {course ? (
          <div className="page">
            <NavigationBarCollapsed></NavigationBarCollapsed>
            <div className="page__wrapper">
              <div className="page__center">
                <div className="header">
                  {/* <button
                  className="header__burger"
                  onClick={this.sidebar_click}
                ></button> */}
                  <img
                    className="parallax-header_logo header__burger"
                    src={logo}
                    alt="header-logo"
                    onClick={this.sidebar_click}
                  ></img>
                </div>
                <Col md={12} className="p-r-0">
                  {course.title && (
                    <LessonPageTop
                      course_id={course.id}
                      course={course}
                      isNewCourse={isNewCourse}
                    ></LessonPageTop>
                  )}

                  <Row className="banner" style={{ margin: "0px !important" }}>
                    <Col lg={2} sm={12} className="p-r-0">
                      <CourseNav
                        createTopic={this.createTopic}
                        topics={topics}
                        editedObject={editedObject}
                        currentIndex={currentIndex}
                        handleMenuClick={this.handleMenuClick}
                      />
                    </Col>
                    <Col lg={10} sm={12} className="p-r-0">
                      <div
                        className="container-course"
                        style={{ borderRadius: "15px", background: "#fff" }}
                      >
                        {preTopic && (
                          <div className="change-topic" onClick={this.preTopic}>
                            <i className="ee-chevron-up"></i>
                            <span className="card-title">
                              &nbsp; {preTopic.title}
                            </span>
                          </div>
                        )}
                        {topics.map((topic, index) => {
                          if (currentIndex === index) {
                            return (
                              <AccordionLesson
                                key={index}
                                topic={topic}
                                handleChange={this.handleChange}
                                updateVideoLink={this.updateVideoLink}
                                // toggle={this.toggle}
                                editAccordion={this.editAccordion}
                                // addVideoCard={this.addVideoCard}
                                topicCreated={topicCreated}
                                isNewCourse={isNewCourse}
                                course_id={course.id}
                                isEditPage={true}
                                isEditable={true}
                                reloadTopics={this.reloadTopics}
                              ></AccordionLesson>
                            );
                          }
                        })}
                        {nextTopic && (
                          <div
                            className="change-topic"
                            onClick={this.nextTopic}
                          >
                            <i className="ee-chevron-down"></i>
                            <span className="card-title">
                              &nbsp; {nextTopic.title}
                            </span>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </div>
          </div>
        ) : (
          <SpinnerPage />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ topic }) => ({
  currentTopic: topic,
});

const mapDispatchStateToProps = (dispatch) => ({
  setCurrentTopic: (topic) => dispatch(setCurrentTopic(topic)),
});

export default connect(mapStateToProps, mapDispatchStateToProps)(TeacherPage);

import React, { Component } from "react";
import "./coursespage.styles.scss";
import NavigationBarCollapsed from "../../navigation/navigation-bar-collapsed/navigation-bar-collapsed.component";
import LessonsSideBar from "../../navigation/lessons-side-bar/lessons-side-bar.component";
import { Row, Col, Card, Accordion } from "react-bootstrap";
import VideoCard from "../../components/video-card/video-card.component";
import VideoModal from "../../components/video-modal/video-modal.component";
import EndOfTopicCard from "../../components/end-of-topic-card/end-card.component";
import { fetchCourse, fetchTopics } from "./../../utils/firebase/firestore";
import SpinnerPage from "../spinner/spinner.component";
import AccordionLesson from "../../components/accordion-lesson/accordion-lesson.component";
import logo from "../../assets/logo.svg";
import { connect } from "react-redux";
import { setCurrentTopic } from "./../../utils/redux/topic/topic.action";
import { IconSVG } from "../../components/icon-svg";
class CoursesPage extends Component {
  constructor(props) {
    super(props);
    // parse collapsed status from props
    this.state = {
      isCollapsed: true,
      isOpenRadioActivity: true,
      isOpenOptics: false,
      isOpenModal: false,
      isLoading: false,
      course: this.props.course,
      topics: [],
      // topics: topics ? topics : [],
      currentIndex: 0,
      course: {},
    };
    this.sidebar_click = this.sidebar_click.bind(this);
    this.handleFetchCourse();
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.handleFetchCourse(nextProps.match.params.id);
    }
  }

  handleFetchCourse = (courseId = this.props.match.params.id) => {
    // if (this.state.course == null) {
    fetchCourse(courseId)
      .then((course) => {
        this.setState({ course });
        this.handleFetchTopics(course);
      })
      .catch((err) => {
        console.log("course does not exist");
      });
    // }
  };

  handleFetchTopics = (course) => {
    fetchTopics(course.id)
      .then((topics) => {
        this.setState({
          topics,
          currentIndex: 0,
        });
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

  toggleRadioActivity = (isOpenRadioActivity) => {
    this.setState({
      isOpenRadioActivity,
    });
  };

  toggleOptics = (isOpenOptics) => {
    this.setState({
      isOpenOptics,
    });
  };

  showModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  handleMenuClick = (index) => {
    this.setState({ currentIndex: index });
    setCurrentTopic(this.state.topics[index]);
  };

  preTopic = () => {
    const { currentIndex } = this.state;
    this.setState({
      currentIndex: currentIndex - 1,
    });
  };

  nextTopic = () => {
    const { currentIndex } = this.state;
    this.setState({
      currentIndex: currentIndex + 1,
    });
  };

  render() {
    let {
      isOpenRadioActivity,
      isOpenOptics,
      course,
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
                  <div className="page__row page__bn1">
                    <div className="banner">
                      <Row className="courses-top">
                        <div className="banner">
                          <div className="banner__container">
                            <span className="text-header">{course.title}</span>
                            <ul
                              style={{
                                float: "right",
                                display: "inline-flex",
                                fontWeight: "bold",
                                color: "#5A5A5A",
                              }}
                            >
                              <li
                                style={{
                                  borderRight: "1px solid #C4C4C4",
                                  padding: "0 5px",
                                }}
                              >
                                <div
                                  style={{ marginRight: 15, cursor: "pointer" }}
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      course.class_code
                                    )
                                  }
                                >
                                  Class code:{" "}
                                  <span className="class-code">
                                    {course.class_code}{" "}
                                    <IconSVG
                                      name="link"
                                      style={{ width: 20 }}
                                    ></IconSVG>
                                  </span>
                                </div>
                              </li>
                              <li
                                style={{
                                  borderRight: "1px solid #C4C4C4",
                                  padding: "0 5px",
                                }}
                              >
                                {course.subject}
                              </li>
                              <li
                                style={{
                                  borderRight: "1px solid #C4C4C4",
                                  padding: "0 5px",
                                }}
                              >
                                {course.level}
                              </li>
                              <li style={{ padding: "0 5px" }}>
                                {course.exam_board}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Row>
                    </div>
                  </div>
                  <Row className="banner" style={{ margin: "0px !important" }}>
                    <Col lg={2} md={12} className="p-r-0">
                      <LessonsSideBar
                        topics={topics}
                        currentIndex={currentIndex}
                        handleMenuClick={this.handleMenuClick}
                      />
                    </Col>
                    <Col lg={10} md={12} className="p-r-0">
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
                                // isNewCourse={isNewCourse}
                                course_id={course.id}
                                card_type="learning"
                                isEditPage={false}
                                isEditable={false}
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

export default connect(mapStateToProps, mapDispatchStateToProps)(CoursesPage);

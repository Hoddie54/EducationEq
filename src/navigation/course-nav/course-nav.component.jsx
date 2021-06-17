import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import _ from "lodash";
import "./course-nav.styles.scss";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 3,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    // backgroundColor: bgcolor,
    backgroundImage: "linear-gradient(#0340FF, #369AFF)",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        {/* <span style={labelStyles}>{`${completed}%`}</span> */}
      </div>
    </div>
  );
};

class CourseNav extends Component {
  state = {
    role: true,
  };

  render() {
    const {
      createTopic,
      topics,
      handleMenuClick,
      currentIndex,
      currentLessons,
      currentTopic,
    } = this.props;
    const { role } = this.state;
    return (
      <div className="course_nav__wrapper">
        {role && (
          <div className="container-course-top course-nav">
            <Button
              variant="outline-primary"
              className="topic-create-btn"
              onClick={() => {
                createTopic();
              }}
            >
              + Create Topic
            </Button>
            <div className="add-new-topic-txt">
              Add a new topic to your course. Once you’ve created your topic you
              can add lessons, videos, links and tests for your students.
            </div>
          </div>
        )}
        <div className="container-course course-nav">
          {topics &&
            topics.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    // className={
                    //   props.editedObject &&
                    //   _.includes(props.editedObject, item.index)
                    //     ? "course-menu-title menu-topic"
                    //     : "course-menu-title"
                    // }
                    className={
                      currentIndex === index
                        ? "course-menu-title menu-topic"
                        : "course-menu-title"
                    }
                    onClick={() => handleMenuClick(index)}
                  >
                    {currentIndex == index && currentTopic
                      ? currentTopic.title
                      : item.title}
                  </div>
                  {currentIndex === index && (
                    <ul className="mainmenu">
                      {currentLessons &&
                        currentLessons.map((lesson, index) => {
                          return (
                            <li key={index}>
                              <a href="">{lesson.title}</a>
                              <ProgressBar key="0" completed={80} />
                            </li>
                          );
                        })}
                      <li className="li-border-bottom"></li>
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTopic: state.topic.currentTopic,
  currentLessons: state.lessons.lessons,
});

export default connect(mapStateToProps)(CourseNav);

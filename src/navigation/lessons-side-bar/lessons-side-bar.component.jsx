import React, { Component } from "react";
import { connect } from "react-redux";
import "./lessons-side-bar.styles.scss";

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

class LessonsSideBar extends Component {
  render() {
    const {
      topics,
      currentIndex,
      handleMenuClick,
      currentLessons,
    } = this.props;
    return (
      <div className="container-course lessons-sidebar">
        <div className="course-nav">
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
                    {item.title}
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

export default connect(mapStateToProps)(LessonsSideBar);

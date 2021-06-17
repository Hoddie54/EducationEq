import React from "react";
import { Button } from "react-bootstrap";
import "./course-card.styles.scss";

const CourseCard = (props) => {
  const { course, type } = props;
  return (
    <div className="details course-card">
      <div className="details__container details-course-card">
        <div className="course-card-title">{course.title}</div>
        <div className="course-card-name">{course.subject}</div>
        <div className="course-card-sub-name">2.1 Lesson 1</div>
        <div className="course-card-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna...
        </div>
        <div className="course-card-btn-wrapper">
          <Button
            variant="outline-primary"
            className="course-card-btn"
            onClick={() => {
              window.location.href = "/" + type + "/" + course.id;
            }}
          >
            {type == "teaching" ? (
              <a href={"/" + type + "/" + course.id}>Edit Course</a>
            ) : (
              <a href={"/" + type + "/" + course.id}>Continue Learning</a>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;

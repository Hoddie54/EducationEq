import React from "react";
import { Button } from "react-bootstrap";
import "./create-course.styles.scss";
import history from "../../history";

const CreateCourse = (props) => {
  const handleClick = () => {
    props.handleCreateCourse();
  };
  return (
    <div className="details create-course-card">
      <div className="details__container details-create-course-card">
        <Button
          variant="outline-primary"
          className="create-course-card-btn"
          onClick={handleClick}
        >
          + Create Course
        </Button>
        <div className="create-course-card-content">
          Explore public courses or enter a course code to start learning.
        </div>
      </div>
    </div>
  );
};
export default CreateCourse;

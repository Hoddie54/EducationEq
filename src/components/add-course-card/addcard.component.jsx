import React from "react";
import { Button } from "react-bootstrap";
import "./addcard.styles.scss";
import { IconSVG } from "../icon-svg";

const AddCourseCard = (props) => {
  return (
    <>
      <div className="add-card">
        <div className="add-container details-add-card">
          <Button
            variant="outline-primary"
            className="add-card-btn"
            onClick={() => props.addVideoCard()}
          >
            <span><IconSVG name="plus"></IconSVG></span>
            <span>Add Lesson</span>
          </Button>
          <div className="spacing-container-add">
            <div className="add-card-content">
              Link/Upload video lessons and add test questions to your course
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCourseCard;

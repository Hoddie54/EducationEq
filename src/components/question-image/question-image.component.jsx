import React, { useState } from "react";
import { Image } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import { IconSVG } from "../icon-svg";
import "react-image-lightbox/style.css";
import "./question-image.styles.scss";

const QuestionImage = (props) => {
  const { image } = props;
  const [isOpen, setShow] = useState(false);
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);
  const customStyles = {
    content: {
      zIndex: 1060,
    },
  };
  return (
    <div>
      <div className="img-container">
        <button type="button" onClick={handleShow} className="pic__fullscreen">
          <IconSVG name="fullscreen"></IconSVG>
        </button>
        <Image src={image} thumbnail className="question-image" />
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={image}
          onCloseRequest={handleHide}
          reactModalStyle={customStyles}
        />
      )}
    </div>
  );
};
export default QuestionImage;

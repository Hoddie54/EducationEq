import React from "react";
import { Spinner } from "react-bootstrap";
import "./spinner.style.scss";

const SpinnerPage = () => {
  return (
    <div className="parent">
      <Spinner className="child" animation="grow" variant="primary" />{" "}
    </div>
  );
};

export default SpinnerPage;

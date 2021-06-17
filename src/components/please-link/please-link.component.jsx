import React, { useState } from "react";
import { InputGroup, Row, Col } from "react-bootstrap";
import { IconSVG } from "../../components/icon-svg";
import "./please-link.styles.scss";

const PleaseLink = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = (e) => {
    if (e.key === "Enter") {
      setShow(false);
    }
  };
  const handleShow = () => setShow(true);
  return (
    <div className="please_link__wrapper">
      <div className="page__row page__bn1">
        <div className="banner">
          <div className="banner__container__search">
            {show ? (
              <Row>
                <InputGroup>
                  <Col sm={3} style={{ display: "flex" }}>
                    <span className="search-title">
                      <IconSVG name="info"></IconSVG>
                      Please Link a Parent Account:
                    </span>
                  </Col>
                  <Col sm={9}>
                    <div className="field__wrap">
                      <input
                        className="field__input"
                        type="text"
                        placeholder="Enter an email for your Parent, Carer or Guardian"
                        onKeyDown={handleClose}
                      ></input>
                    </div>
                  </Col>
                </InputGroup>
              </Row>
            ) : (
              <Row>
                <InputGroup>
                  <Col sm={9} style={{ display: "flex" }}>
                    <span className="search-title">
                      <IconSVG name="check"></IconSVG>
                      Thanks! Please ask your parent, carer or guardian to
                      confirm the link by clicking the link in their email.
                    </span>
                  </Col>
                  <Col sm={3}>
                    <span
                      className="update-email-click"
                      onClick={() => handleShow()}
                    >
                      Update Email Adress
                    </span>
                  </Col>
                </InputGroup>
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PleaseLink;

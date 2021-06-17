import React, { useContext } from "react";
import { Accordion, Card, Button, AccordionContext } from "react-bootstrap";
import "./accordion-card.styles.scss";
import { IconSVG } from "../icon-svg";

function ContextAwareToggle({ eventKey }) {
  const currentEventKey = useContext(AccordionContext);

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Accordion.Toggle
      as={Button}
      variant="link"
      eventKey="0"
      className="btn-hide"
    >
      <div className="accordion-svg-wrapper">
        <IconSVG name="eye"></IconSVG>
      </div>
      {isCurrentEventKey ? "Hide" : "Show"}
    </Accordion.Toggle>
  );
}

const AccordionCard = (props) => {
  const { name, defaultActiveKey, hasOpenBtn } = props;

  return (
    <Accordion defaultActiveKey={defaultActiveKey}>
      <Card>
        <Card.Header>
          <span className="card-title">
            <span  className="top-icon">
              <IconSVG name={(name==='Learning')?'video':((name==='Teaching')?'student':'analytics')}></IconSVG>
            </span>
            <span className="name">{name}</span>
          </span>

          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
            className="btn-open-teaching"
            style={{ display: hasOpenBtn ? "block" : "none" }}
          >
            Open Teaching
          </Accordion.Toggle>

          <ContextAwareToggle eventKey="0"></ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0" className="accordion-body">
          <Card.Body>{props.children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AccordionCard;

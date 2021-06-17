import React from "react";
import { Form, Button } from "react-bootstrap";
import { IconSVG } from "../../components/icon-svg";
import BarChart from "../../components/charts/chart2";
import PracticeCard from "../../components/practice-card/practice-card.component";
import AccordionCard from "../../components/accordion-card/accordion-card.component";
import AnalyticsMiniCard from "../../components/analytics-mini-card/analytics-mini-card.component";
import "./analytics-parent.styles.scss";

const AnalyticsParent = (props) => {
  const { style } = props;
  return (
    <div className="analytics_parent__wrapper">
      <div className="page__row">
        <div className="banner">
          <AccordionCard name="Analytics" defaultActiveKey="0">
            <div className="page__widgets">
              <div className="widget-md-6 widget-first">
                <Form.Group>
                  <Form.Control
                    as="select"
                    className="form-control-select analytics-select"
                  >
                    <option></option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="select"
                    className="form-control-select analytics-select"
                  >
                    <option></option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <AnalyticsMiniCard></AnalyticsMiniCard>
                  <AnalyticsMiniCard></AnalyticsMiniCard>
                  <AnalyticsMiniCard
                    style={{ marginRight: "0px" }}
                  ></AnalyticsMiniCard>
                </Form.Group>
                <PracticeCard></PracticeCard>
              </div>
              <div className="widget-md-6">
                <div className="details">
                  <div className="details__container chart-container">
                    <div className="details__row">
                      <BarChart></BarChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-notifications">
              <div className="notifications-content">
                <div className="left-icon">
                  <IconSVG name="info"></IconSVG>
                </div>
                <div className="right-content">
                  <p>
                    Our analytics indicate Ryan's most important area to focus
                    on is Mechanics in Physics.
                  </p>
                  <p>
                    Speak to a member of our team to help choose the perfect
                    tutor for Ryan and help improve their grade.
                  </p>
                </div>
                <div className="btn-chat-with-us">
                  <Button variant="outline-primary" className="btnChatWithUs">
                    Chat With Our Team
                  </Button>
                </div>
              </div>
            </div>
          </AccordionCard>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsParent;

import React from "react";
import { Form, Button } from "react-bootstrap";
import BarChart from "../../components/charts/chart2";
import PracticeCard from "../../components/practice-card/practice-card.component";
import AccordionCard from "../../components/accordion-card/accordion-card.component";
import AnalyticsMiniCard from "../../components/analytics-mini-card/analytics-mini-card.component";
import "./analytics-students.styles.scss";
import { IconSVG } from "../../components/icon-svg";

const AnalyticsStudents = (props) => {
  const handleChangeCourse = (course) => {
    props.handleChangeAnalyticsCourse(course);
  };

  const { style, user, course, courses, aggregation } = props;
  const strongestTopic = aggregation.topics[0];
  const weakestTopic = aggregation.topics.slice(-1).pop();
  const percentage = aggregation.percentage;
  const weakestLesson = aggregation.lessons;

  return (
    <div className="analytics_students__wrapper">
      <div className="page__row">
        <div className="banner">
          <AccordionCard name="Analytics" defaultActiveKey="0">
            <div className="page__widgets">
              <div className="widget-md-6 widget-first">
                <Form.Group>
                  <Form.Control
                    as="select"
                    className="form-control-select analytics-select"
                    onChange={(e) => {
                      handleChangeCourse(e.target.value);
                    }}
                  >
                    {courses &&
                      courses.map((course, index) => (
                        <option value={course.id} key={index}>
                          {course.title}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <AnalyticsMiniCard
                    title={"Overview"}
                    subtitle={"Current mark"}
                    value={`${percentage.toFixed(0)}%`}
                  />
                  <AnalyticsMiniCard
                    title={"Weakest Topic"}
                    subtitle={weakestTopic.title}
                    value={`${weakestTopic.percentage}%`}
                  />
                  <AnalyticsMiniCard
                    style={{ marginRight: "0px" }}
                    title={"Strongest Topic"}
                    subtitle={strongestTopic.title}
                    value={`${strongestTopic.percentage}%`}
                  />
                </Form.Group>
                {aggregation && (
                  <PracticeCard lessons={aggregation.lessons}></PracticeCard>
                )}
              </div>
              <div className="widget-md-6">
                <div className="details">
                  <div className="details__container chart-container">
                    <div className="details__row">
                      {aggregation && (
                        <BarChart
                          course_title={course.title}
                          topics={aggregation.topics}
                        ></BarChart>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user && weakestLesson && (
              <div className="card-notifications">
                <div className="notifications-content">
                  <div className="left-icon">
                    <IconSVG name="info"></IconSVG>
                  </div>
                  <div className="right-content">
                    <p>
                      {`Our analytics indicate ${
                        user.full_name.split(" ")[0]
                      }'s most important
                    area to focus on is ${weakestLesson.topic_title} in ${
                        course.title
                      }`}
                    </p>
                    <p>
                      {`Speak to a member of our team to help choose the perfect
                      tutor for ${
                        user.full_name.split(" ")[0]
                      } and help improve their grade.`}
                    </p>
                  </div>
                  <div
                    className="btn-chat-with-us"
                    style={{ marginTop: 7, marginRight: 6 }}
                  >
                    <Button
                      variant="outline-primary"
                      className="btnChatWithUs"
                      onClick={() => {
                        // chat with our team
                      }}
                    >
                      Chat With Our Team
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </AccordionCard>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsStudents;

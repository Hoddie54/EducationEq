import React from "react";
import { Form, Button } from "react-bootstrap";
import BarChart from "../../components/charts/chart2";
import PracticeCard from "../../components/practice-card/practice-card.component";
import AccordionCard from "../../components/accordion-card/accordion-card.component";
import AnalyticsMiniCard from "../../components/analytics-mini-card/analytics-mini-card.component";
import { IconSVG } from "../../components/icon-svg";
import "./analytics-teacher.styles.scss";

const AnalyticsTeacher = (props) => {
  const handleChangeCourse = (course) => {
    props.handleChangeAnalyticsCourse(course);
  };

  const { style, user, course, courses, aggregation, students } = props;
  const strongestTopic = aggregation.topics[0];
  const weakestTopic = aggregation.topics.slice(-1).pop();
  const percentage = aggregation.percentage;
  const weakestLesson = aggregation.lessons
    ? aggregation.lessons.slice(-1).pop()
    : undefined;

  return (
    <div className="analytics_teacher__wrapper">
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
                  <Form.Control
                    as="select"
                    className="form-control-select analytics-select"
                  >
                    {students &&
                      students.map((student, index) => (
                        <option value={student.id} key={index}>
                          {student.full_name}
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
          </AccordionCard>
        </div>
      </div>
    </div>
  );
};
export default AnalyticsTeacher;

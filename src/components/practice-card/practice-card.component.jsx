import React from "react";
import { Button, Table } from "react-bootstrap";
import "./practice-card.styles.scss";

const PracticeCard = (props) => {
  const { lessons } = props;
  return (
    <div className="details practice-card">
      <div className="details__container details-practice-card">
        <div className="practice-card-title">Let’s Practice</div>
        <div className="practice-card-name">Weakest Lessons</div>
        <div className="practice-card-content">
          <Table className="weakest-lessons-table">
            <tbody>
              {lessons.map((lesson, index) => {
                return (
                  <tr key={index}>
                    <td className="tb-content">
                      {index + 1}. {lesson.topic_title}, {lesson.lesson_title}{" "}
                    </td>
                    <td className="tb-value">{lesson.percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="access-tutoring-button">
          <Button variant="outline-primary" className="practice-card-btn">
            Access Tutoring
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PracticeCard;

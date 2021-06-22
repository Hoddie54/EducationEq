import "./subtopic-card.styles.scss"
import { Link } from "react-router-dom"

function SubtopicCard(props) {
  return (
    <div className="card-container">
      <div className="main-card">
        <div className="lesson-headers">
          <div style={{ textTransform: "capitalize" }}>
            {props.subject} GCSE
          </div>
          <div>{props.lesson_id}</div>
        </div>
        <div className="lesson-title blue-text">{props.name}</div>
        <div className="lesson-text"></div>
        <Link to={`/subtopic/${props.topic_id}/${props.subtopic_id}`}>
          <button className="lesson-button blue-text explore-subtopic">
            Explore Subtopic
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SubtopicCard

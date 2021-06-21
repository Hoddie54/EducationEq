import "./subtopic-card.styles.scss"

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
        <button className="lesson-button blue-text">Explore Subtopic</button>
      </div>
    </div>
  )
}

export default SubtopicCard

import "./subtopic-card.styles.scss"

function SubtopicCard() {
  return (
    <div className="card-container">
      <div className="main-card">
        <div className="lesson-headers">
          <div>Chemistry GCSE</div>
          <div>2.1 Lesson 1</div>
        </div>
        <div className="lesson-title blue-text">The periodic table</div>
        <div className="lesson-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut lab...
        </div>
        <button className="lesson-button blue-text">Explore Subtopic</button>
      </div>
    </div>
  )
}

export default SubtopicCard

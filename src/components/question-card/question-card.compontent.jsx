import { useState } from "react"
import { IconSVG } from "../icon-svg"
import "./question-card.styles.scss"

function QuestionCard(props) {
  const [showAnswer, setShowAnswer] = useState(false)

  const modalContent = (
    <div className="question-card__img-container" onClick={toggleAnswer}>
      <img src={"/questions/q1aans.png"} />
    </div>
  )

  function toggleAnswer() {
    props.setBlurred((state) => {
      return !state
    })

    props.setModalContent(modalContent)
    setShowAnswer((state) => {
      return !state
    })
  }

  return (
    <>
      <div className={`question-card__container ${props.color}`}>
        <div className="question-card__header">
          <div className="title">Question {props.number}</div>
          <div className="marks">Marks: {props.marks}</div>
        </div>
        <div className="question-card__image">
          <img src={"/questions/q1a.png"} />
        </div>
        <div className="question-card__footer">
          <div className="score__container">
            <div className="score">Assess your score</div>
            <div className="buttons">
              <div
                className="red"
                onClick={() => {
                  props.changeColor(props.number, "red")
                }}
              >
                <IconSVG name="close" />
              </div>
              <div
                className="amber"
                onClick={() => {
                  props.changeColor(props.number, "amber")
                }}
              >
                <IconSVG name="info" />
              </div>
              <div
                className="green"
                onClick={() => {
                  props.changeColor(props.number, "green")
                }}
              >
                <IconSVG name="check" />
              </div>
            </div>
          </div>
          <div className="answer" onClick={toggleAnswer}>
            View answer
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard

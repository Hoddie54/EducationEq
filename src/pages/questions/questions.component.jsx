import "./questions.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState } from "react"
import QuestionCard from "../../components/question-card/question-card.compontent"
function Questions() {
  const [selectedQuestion, setSelectedQuestion] = useState("1a")
  const [colors, setColors] = useState({})

  const questions = [
    { number: "1a", marks: 1, image_url: "" },
    { number: "1b", marks: 1, image_url: "" },
    { number: "1c", marks: 1, image_url: "" },

    { number: "2a", marks: 3, image_url: "" },
    { number: "2b", marks: 2, image_url: "" },

    { number: "3", marks: 3, image_url: "" },
  ]

  function changeColor(number, color) {
    setColors((state) => {
      return { ...state, [number]: color }
    })
  }

  const labels = questions.map((question) => {
    return (
      <div
        className={`questions__label ${colors[question.number]}`}
        onClick={() => {
          setSelectedQuestion(question.number)
        }}
      >
        {question.number}
      </div>
    )
  })

  const questionsJSX = questions
    .filter((question) => {
      return question.number === selectedQuestion
    })
    .map((question) => {
      return (
        <QuestionCard
          number={question.number}
          key={question.number}
          marks={question.marks}
          image_url={question.image_url}
          changeColor={changeColor}
          color={colors[question.number]}
        />
      )
    })

  return (
    <Basepage>
      <div className="questions__title">1.1 Cell structure</div>
      <div className="questions__text">Questions</div>
      <div className="questions__labels-container">{labels}</div>
      <div className="questions">{questionsJSX}</div>
    </Basepage>
  )
}

export default Questions

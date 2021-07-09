import "./questions.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState } from "react"
import QuestionCard from "../../components/question-card/question-card.compontent"
function Questions(props) {
  const [selectedQuestion, setSelectedQuestion] = useState("1a")
  const [colors, setColors] = useState({})
  const [blurred, setBlurred] = useState(false)
  const [modalContent, setModalContent] = useState()

  let questions = []
  if (props.match.params.id === "1") {
    questions.push(...questionGenerator(1, 1, 2))
    questions.push(...questionGenerator(1, 2, 2))
    questions.push(...questionGenerator(1, 3, 6))
    questions.push(...questionGenerator(1, 4, 3))
  } else {
    questions.push(...questionGenerator(2, 1, 4))
    questions.push(...questionGenerator(2, 2, 3))
    questions.push(...questionGenerator(2, 3, 3))
    questions.push(...questionGenerator(2, 4, 2))
  }

  //Only for the fake Qs
  function questionGenerator(subtopic, question_no, amount) {
    const alphabet = ["a", "b", "c", "d", "e", "f"]
    const questions = []
    for (let i = 0; i < amount; i++) {
      const question = {
        number: `${question_no}${alphabet[i]}`,
        marks: 1,
        image_url: `Q${subtopic}.${question_no}${alphabet[i]}.png`,
      }
      questions.push(question)
    }
    return questions
  }

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
          setBlurred={setBlurred}
          setModalContent={setModalContent}
        />
      )
    })

  return (
    <Basepage blurred={blurred} modal_content={modalContent}>
      <div className="questions__title">
        {props.match.params.id
          ? "1.1 A simple model of the atom"
          : "1.2 The periodic table"}
      </div>
      <div className="questions__text">Questions</div>
      <div className="questions__labels-container">{labels}</div>
      <div className="questions">{questionsJSX}</div>
    </Basepage>
  )
}

export default Questions

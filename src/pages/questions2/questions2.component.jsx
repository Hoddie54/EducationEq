import Basepage from "../basepage/basepage.component"
import "./questions2.styles.scss"
import { IconSVG } from "../../components/icon-svg/index"
import RelatedSpecpoints from "../../components/related-specpoints/related-specpoints.components"
import { useEffect, useState } from "react"
import SpinnerPage from "../spinner/spinner.component"
import {
  getAllDataForQuestions,
  getRatings,
} from "../../utils/firebase/firestore"
import { Link } from "react-router-dom"
import ReactGA from "react-ga"

function Questions2(props) {
  const spec_id = props.match.params.id

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [ratings, setRatings] = useState()

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)

  let currentQuestion, my_specpoint, color

  if (!isLoading) {
    currentQuestion = data[currentQuestionNumber]
    my_specpoint = currentQuestion.related_specpoints.find((specpoint) => {
      return spec_id === specpoint.UID
    })
    if (ratings[my_specpoint.UID]) {
      color = ratings[my_specpoint.UID]
    } else {
      color = ""
    }
  }

  const [selectedAnswer, setSelectedAnswer] = useState()
  const [corrects, setCorrects] = useState([])
  const [incorrects, setIncorrects] = useState([])

  useEffect(() => {
    async function getData() {
      const promise = await Promise.all([
        getAllDataForQuestions(spec_id),
        getRatings(props.currentUser.uid),
      ])
      const returned_data = promise[0]
      const ratings = promise[1]
      // console.log(returned_data)
      setData(returned_data)
      setRatings(ratings)
      setIsLoading(false)
    }
    getData()
  }, [])

  function switchQuestion(number) {
    setCurrentQuestionNumber((current_value) => {
      const new_value = number + current_value
      if (new_value < 0) return current_value
      if (new_value === data.length) return 0
      if (new_value >= data.length) return current_value
      return new_value
    })
    setSelectedAnswer()
    setCorrects([])
    setIncorrects([])
  }

  function answerQuestion(answer) {
    if (selectedAnswer) return
    setSelectedAnswer(answer)
    if (answer !== currentQuestion.correction) {
      setIncorrects({ [answer]: true })
    }
    setCorrects({ [currentQuestion.correction]: true })
    console.log(currentQuestion.id)
    ReactGA.event({
      category: "Action_button",
      action: "Answer_question",
      label: currentQuestion.id,
    })
  }

  return (
    <Basepage>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          <div className={`questions2__title-container ${color}`}>
            <Link to="/main">
              <div className="button blue-text">
                <div>
                  <IconSVG name="arrow-down" />
                </div>
                Back
              </div>
            </Link>
            <div className="questions2__title blue-text">
              Questions: {my_specpoint.name}
            </div>
            {/* <div className="questions2__exam-board">
              {my_specpoint.exam_board}
            </div> */}
            <div className="questions2__spec-point-title">
              {`Spec point: ${my_specpoint.number}`}
            </div>
          </div>
          <div className="questions2__content-container">
            <div className="main-content">
              <div className="questions2__question">
                <div className="question__number blue-text">
                  Question {currentQuestionNumber + 1}
                </div>
                <div className="question__text">
                  {currentQuestion.question_text}
                </div>
              </div>
              <div className="options__container">
                <div
                  id="A"
                  className={`option ${corrects["A"] ? "correct" : ""} ${
                    incorrects["A"] ? "incorrect" : ""
                  }`}
                  onClick={() => {
                    answerQuestion("A")
                  }}
                >
                  <div className="option__title blue-text">A</div>
                  <div className="option__text">{currentQuestion.A}</div>
                </div>
                <div
                  id="B"
                  className={`option ${corrects["B"] ? "correct" : ""} ${
                    incorrects["B"] ? "incorrect" : ""
                  }`}
                  onClick={() => {
                    answerQuestion("B")
                  }}
                >
                  <div className="option__title blue-text">B</div>
                  <div className="option__text">{currentQuestion.B}</div>
                </div>
                <div
                  id="C"
                  className={`option ${corrects["C"] ? "correct" : ""} ${
                    incorrects["C"] ? "incorrect" : ""
                  }`}
                  onClick={() => {
                    answerQuestion("C")
                  }}
                >
                  <div className="option__title blue-text">C</div>
                  <div className="option__text">{currentQuestion.C}</div>
                </div>
                {/* <div
                  id="D"
                  className={`option ${corrects["D"] ? "correct" : ""} ${
                    incorrects["D"] ? "incorrect" : ""
                  }`}
                  onClick={() => {
                    answerQuestion("D")
                  }}
                >
                  <div className="option__title blue-text">D</div>
                  <div className="option__text">{currentQuestion.D}</div>
                </div> */}
              </div>
              <div className="questions2__explanation">
                <div className="title blue-text">Explanation: </div>
                <div className="explanation">
                  {selectedAnswer
                    ? currentQuestion.explanation
                    : "Please answer the question to see the reasoning"}
                </div>
              </div>
              <div className="questions2__buttons blue-text">
                <div
                  className="button"
                  onClick={() => {
                    switchQuestion(-1)
                  }}
                >
                  Previous
                </div>
                <div>{`${currentQuestionNumber + 1}/${data.length}`}</div>
                <div
                  className="button"
                  onClick={() => {
                    switchQuestion(1)
                  }}
                >
                  Next
                </div>
              </div>
            </div>
            <RelatedSpecpoints
              specpoints={currentQuestion.related_specpoints}
              specpoint={my_specpoint.UID}
              question_or_video={"question"}
            />
          </div>
        </>
      )}
    </Basepage>
  )
}

export default Questions2

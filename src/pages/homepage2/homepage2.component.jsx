import "./homepage2.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState } from "react"
import FeedbackModal from "../../components/feedback-modal/feedback-modal.component"
import Feedback from "../../components/feedback/feedback.component"
import FilteredCards from "../../components/filtered-cards/filtered-cards.component"

function Homepage2() {
  const [isFeedbackShown, setIsFeedbackShown] = useState(false)
  const tabComponents = [
    "Video lessons",
    "Questions",
    "Revision notes",
    "Flashcards",
    "Topic formulas",
  ]
  const initialTabActiveStates = {}
  tabComponents.forEach((text) => (initialTabActiveStates[text] = false))
  initialTabActiveStates["Video lessons"] = true
  const [tabActiveStates, setTabActiveStates] = useState(initialTabActiveStates)

  const [selectedSubtopic, setSelectedSubtopic] = useState("1")

  function hideModal() {
    setIsFeedbackShown(false)
  }

  function showModal() {
    setIsFeedbackShown(true)
  }

  function setActive(trueTabText) {
    const tabActiveStates = {}
    tabComponents.forEach(
      (text) => (tabActiveStates[text] = trueTabText === text)
    )
    setTabActiveStates(tabActiveStates)
  }

  function HomepageTabComponent(props) {
    return (
      <div
        className={`homepage__tab ${props.isActive ? "active" : ""}`}
        onClick={() => {
          props.setActive(props.text)
        }}
      >
        {props.text}
      </div>
    )
  }

  return (
    <Basepage>
      {isFeedbackShown ? (
        <FeedbackModal hideModal={hideModal} />
      ) : (
        <>
          <div className="feedback">
            <Feedback showModal={showModal} />
          </div>
          <div className="homepage__dropdown">
            <select>
              <option>Atomic Structure and the Periodic Table</option>
            </select>
            <select
              value={selectedSubtopic}
              onChange={(event) => {
                setSelectedSubtopic(event.target.value)
              }}
            >
              <option value={1}>
                A simple model of the atoms, symbols, relative atomic mass,
                electronic charge and isotopes
              </option>
              <option value={2}>The periodic table</option>
            </select>
          </div>
          <hr className="homepage__line" />
          <div className="homepage__tabs">
            {tabComponents.map((text) => {
              return (
                <HomepageTabComponent
                  text={text}
                  key={text}
                  isActive={tabActiveStates[text]}
                  setActive={setActive}
                />
              )
            })}
          </div>
          <div className="homepage__main">
            <FilteredCards
              tabActiveStates={tabActiveStates}
              subtopic={selectedSubtopic}
            />
          </div>
        </>
      )}
    </Basepage>
  )
}

export default Homepage2

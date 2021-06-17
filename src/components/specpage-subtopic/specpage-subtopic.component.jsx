import { useState } from "react"
import "./specpage-subtopic.styles.scss"

function SpecPageSubtopic(props) {
  const [isShown, setIsShown] = useState(false)

  function toggleIsShown() {
    setIsShown((current_state) => {
      return !current_state
    })
  }

  function SpecPoint(props) {
    return (
      <div className="spec-point__container">
        <span className="spec-point__number">{`${props.number} `}</span>
        <span className="spec-point__text">{props.text}</span>
        <hr />
      </div>
    )
  }

  function SubTopic(props) {
    const [isShown, setIsShown] = useState(false)

    const default_text =
      "Understand how to calculate the valence of metal ions when they are bonding in hydrogen and that the electrons in the outer shell is consumed first by the atmosheric gases in the ozone layer."

    function toggleIsShown() {
      setIsShown((current_state) => {
        return !current_state
      })
    }

    return (
      <div>
        <div class="spec-page__container smaller">
          <div className="spec-page__text">{props.title}</div>
          <div className="spec-page__button">
            <button onClick={toggleIsShown}>{isShown ? "-" : "+"}</button>
          </div>
        </div>
        <hr className="hr" />
        {isShown ? (
          <>
            <SpecPoint number="1.2.3" text={default_text} />
            <SpecPoint number="1.2.3" text={default_text} />
          </>
        ) : (
          ""
        )}
      </div>
    )
  }

  return (
    <>
      <div class="spec-page__container">
        <div className="spec-page__text">{props.title}</div>
        <div className="spec-page__button">
          <button onClick={toggleIsShown}>{isShown ? "-" : "+"}</button>
        </div>
      </div>
      <hr className="hr" />
      <div className="spec-page__main">
        {isShown ? (
          <>
            <SubTopic title="TEST" />
            <SubTopic title="I am a generic suybtoic" />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default SpecPageSubtopic

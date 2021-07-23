import { useState, useCallback, useEffect } from "react"
import { getSpecpoints, getSubtopics } from "../../utils/firebase/firestore"
import SpinnerPage from "../../pages/spinner/spinner.component"
import "./specpage-subtopic.styles.scss"
import { useHistory } from "react-router"

function SpecPageSubtopic(props) {
  const isDefaultShown = props.topic_id === props.topic_display ? true : false
  const [isShown, setIsShown] = useState(isDefaultShown)
  // const [subtopicData, setSubtopicData] = useState([])

  function toggleIsShown() {
    setIsShown((current_state) => {
      return !current_state
    })
  }

  function SpecPoint(props) {
    const history = useHistory()

    return (
      <>
        <div className="spec-point__container">
          <div className="spec-point__content">
            <div>
              <span className="spec-point__number">{`${props.number} `}</span>
              <span className="spec-point__text">{props.text}</span>
            </div>
            <div
              className="spec-point__learn"
              onClick={() => {
                history.push(`/videos2/${props.id}`)
              }}
            >
              Learn
            </div>
          </div>
          <hr />
        </div>
      </>
    )
  }

  function SubTopic(props) {
    const isDefaultShown =
      props.subtopic_id === props.subtopic_display ? true : false
    const [isShown, setIsShown] = useState(isDefaultShown)
    // const [specpointData, setSpecPointData] = useState([])

    function toggleIsShown() {
      setIsShown((current_state) => {
        return !current_state
      })
    }

    // const getSpecPointData = useCallback(async () => {
    //   const specpoints = await getSpecpoints(props.topic_id, props.subtopic_id)
    //   setSpecPointData(specpoints)
    // }, [])

    // useEffect(() => {
    //   // getSpecPointData()
    // }, [getSubtopicData])

    const specpointJSX = props.specpoints
      .filter((specpoint) => {
        if (props.selected_rating === "no-filter") return true
        if (props.selected_rating === props.ratings[specpoint.UID]) return true
        if (props.selected_rating === "" && !props.ratings[specpoint.UID])
          return true
        return false
      })
      .map((specpoint) => {
        return (
          <SpecPoint
            number={specpoint.number}
            text={specpoint.text}
            id={specpoint.UID}
            key={specpoint.UID}
          />
        )
      })

    return (
      <div>
        <div class="spec-page__container smaller" onClick={toggleIsShown}>
          <div className="spec-page__text">{props.title}</div>
          <div className="spec-page__button">
            <button>{isShown ? "-" : "+"}</button>
          </div>
        </div>
        <hr className="hr" />
        {isShown ? <>{specpointJSX}</> : ""}
      </div>
    )
  }

  // const getSubtopicData = useCallback(async () => {
  //   const subtopics = await getSubtopics(props.topic_id)
  //   setSubtopicData(subtopics)
  // }, [])

  // useEffect(() => {
  //   // getSubtopicData()
  // }, [getSubtopicData])

  const subtopicsJSX = props.subtopics.map((subtopic) => {
    return (
      <SubTopic
        title={subtopic.name}
        topic_id={props.topic_id}
        subtopic_id={subtopic.UID}
        key={subtopic.UID}
        specpoints={subtopic.specpoints}
        subtopic_display={props.subtopic_display}
        selected_rating={props.selected_rating}
        ratings={props.ratings}
      />
    )
  })

  return (
    <>
      <div class="spec-page__container" onClick={toggleIsShown}>
        <div className="spec-page__text">{props.title}</div>
        <div className="spec-page__button">
          <button>{isShown ? "-" : "+"}</button>
        </div>
      </div>
      <hr className="hr" />
      <div className="spec-page__main">
        {isShown ? <>{subtopicsJSX}</> : ""}
      </div>
    </>
  )
}

export default SpecPageSubtopic

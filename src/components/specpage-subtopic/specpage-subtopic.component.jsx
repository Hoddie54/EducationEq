import { useState, useCallback, useEffect } from "react"
import { getSpecpoints, getSubtopics } from "../../utils/firebase/firestore"
import SpinnerPage from "../../pages/spinner/spinner.component"
import "./specpage-subtopic.styles.scss"

function SpecPageSubtopic(props) {
  const isDefaultShown = props.topic_id === props.topic_display ? true : false
  const [isShown, setIsShown] = useState(isDefaultShown)
  const [subtopicData, setSubtopicData] = useState([])

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
    const isDefaultShown =
      props.subtopic_id === props.subtopic_display ? true : false
    const [isShown, setIsShown] = useState(isDefaultShown)
    const [specpointData, setSpecPointData] = useState([])

    function toggleIsShown() {
      setIsShown((current_state) => {
        return !current_state
      })
    }

    const getSpecPointData = useCallback(async () => {
      const specpoints = await getSpecpoints(props.topic_id, props.subtopic_id)
      setSpecPointData(specpoints)
    }, [])

    useEffect(() => {
      getSpecPointData()
    }, [getSubtopicData])

    let specpointJSX = <SpinnerPage />
    if (specpointData.length > 0) {
      specpointJSX = specpointData.map((specpoint) => {
        return (
          <SpecPoint
            number={specpoint.spec_number_and_tier}
            text={specpoint.text}
            key={specpoint.spec_number_and_tier}
          />
        )
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
        {isShown ? <>{specpointJSX}</> : ""}
      </div>
    )
  }

  const getSubtopicData = useCallback(async () => {
    const subtopics = await getSubtopics(props.topic_id)
    setSubtopicData(subtopics)
  }, [])

  useEffect(() => {
    getSubtopicData()
  }, [getSubtopicData])

  let subtopicsJSX = <SpinnerPage />
  if (subtopicData.length > 0) {
    subtopicsJSX = subtopicData.map((subtopic) => {
      return (
        <SubTopic
          title={subtopic.name}
          topic_id={props.topic_id}
          subtopic_id={subtopic.uid}
          key={subtopic.uid}
          subtopic_display={props.subtopic_display}
        />
      )
    })
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
        {isShown ? <>{subtopicsJSX}</> : ""}
      </div>
    </>
  )
}

export default SpecPageSubtopic

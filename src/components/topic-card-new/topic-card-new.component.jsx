import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import SearchSVG from "../../assets/search-svg"
import SpinnerPage from "../../pages/spinner/spinner.component"
import { getSubtopics } from "../../utils/firebase/firestore"
import ShowHide from "../show-hide/show-hide.component"
import SubtopicCard from "../subtopic-card/subtopic-card.component"
import "./topic-card-new.styles.scss"

function TopicCard(props) {
  const [isShown, setIsShown] = useState(true)
  const [subtopics, setSubtopics] = useState([])

  function onClickHandler() {
    setIsShown((state) => {
      return !state
    })
  }

  useEffect(() => {
    handleSubtopics(props.id)
  }, [])

  async function handleSubtopics() {
    const subtopics = await getSubtopics(props.id)
    setSubtopics(subtopics)
  }

  let subtopicJSX = <Spinner />
  if (subtopics.length > 0) {
    subtopicJSX = subtopics.map((subtopic) => {
      return (
        <SubtopicCard
          exam_board={props.exam_board}
          subject={props.subject}
          name={subtopic.name}
          lesson_id={subtopic.lesson_id}
        />
      )
    })
  }

  return (
    <div className="topic__container">
      <div className="subtopic__title">
        <div className="subtopic-container">
          <SearchSVG />
          <div className="title-text blue-text">{props.name}</div>
        </div>
        <div className="show-hide">
          <ShowHide isShown={isShown} onClickHandler={onClickHandler} />
        </div>
      </div>

      <div className={"subtopic__content".concat(isShown ? "" : " hidden")}>
        {subtopicJSX}
      </div>
    </div>
  )
}

export default TopicCard

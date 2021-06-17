import { useState } from "react"
import SearchSVG from "../../assets/search-svg"
import ShowHide from "../show-hide/show-hide.component"
import SubtopicCard from "../subtopic-card/subtopic-card.component"
import "./topic-card-new.styles.scss"

function TopicCard() {
  const [isShown, setIsShown] = useState(true)

  function onClickHandler() {
    setIsShown((state) => {
      return !state
    })
  }

  return (
    <div className="topic__container">
      <div className="subtopic__title">
        <div className="subtopic-container">
          <SearchSVG />
          <div className="title-text blue-text">1.0 I am an example title</div>
        </div>
        <div className="show-hide">
          <ShowHide isShown={isShown} onClickHandler={onClickHandler} />
        </div>
      </div>

      <div className={"subtopic__content".concat(isShown ? "" : " hidden")}>
        <SubtopicCard />
        <SubtopicCard />
        <SubtopicCard />
        <SubtopicCard />
      </div>
    </div>
  )
}

export default TopicCard

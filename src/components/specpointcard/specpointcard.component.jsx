import "./specpointcard.styles.scss"
import { useHistory, Link } from "react-router-dom"
import { useState } from "react"
import { sendRating } from "../../utils/firebase/firestore"
import {
  Video,
  Target,
  Notes,
} from "../../components/main-icons/MainIcons.component"
import { lineify } from "../../utils/helpers/misc"
import ReactGA from "react-ga"

function SpecPointCard(props) {
  const history = useHistory()

  console.log(props.text)

  const [rating, setRating] = useState(props.rating)

  function changeRating(event) {
    setRating(event.target.value)
    props.setRatings((old_rating) => {
      return {
        ...old_rating,
        [props.spec_uid]: event.target.value,
      }
    })
    sendRating(props.spec_uid, event.target.value)
    ReactGA.event({
      category: "Action_button",
      action: "RAG_rating",
      label: event.target.value,
    })
  }

  function fireGAEventNotes() {
    ReactGA.event({
      category: "Action_button",
      action: "Notes click",
      label: props.spec_uid,
    })
  }

  return (
    <div className="speccard__container">
      <div className="speccard__spec-rating">
        <div className="speccard__spec">{`Spec: ${props.number}`}</div>
        <div className={`speccard__rating`}>
          <select
            value={rating}
            onChange={changeRating}
            className={`${rating}`}
          >
            <option value="">Rate me</option>
            <option value="green">Got it</option>
            <option value="amber">Getting it</option>
            <option value="red">Work needed</option>
          </select>
        </div>
      </div>
      <div className="speccard__title blue-text">{props.title}</div>
      {/* <div className="speccard__number blue-text">{props.number}</div> */}
      <div className="speccard__text">{lineify(props.text)}</div>
      <div className="speccard__buttons">
        <Link to={`/videos2/${props.spec_uid}`}>
          <div className="speccard__button blue-text">
            <Video />
            <div>Watch videos</div>
          </div>
        </Link>
        <a href={props.notes_url} target="_blank" onClick={fireGAEventNotes}>
          <div className="speccard__button blue-text">
            <Notes />
            <div>Explore notes</div>
          </div>
        </a>
        <Link to={`/questions2/${props.spec_uid}`}>
          <div
            className="speccard__button blue-text"
            //history.push(`/questions/${props.questions_link}`)
          >
            <Target />
            <div>Answer questions</div>
          </div>
        </Link>
        {/* <div
          className="speccard__button blue-text"
          onClick={() => {
            history.push(`/flashcard/1`)
          }}
        >
          <VideoIcon />
          <div>FLASHCARDS</div>
        </div> */}
      </div>
    </div>
  )
}

export default SpecPointCard

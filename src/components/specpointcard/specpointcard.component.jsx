import "./specpointcard.styles.scss"
import { useHistory } from "react-router-dom"

function SpecPointCard(props) {
  const history = useHistory()

  function VideoIcon() {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 59 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.2917 0.5H48.0417C53.9937 0.5 58.8333 5.14333 58.8333 10.8889V41.1111C58.8333 46.8567 53.9937 51.5 48.0417 51.5H11.2917C5.33965 51.5 0.5 46.8567 0.5 41.1111V10.8889C0.5 5.14333 5.33965 0.5 11.2917 0.5ZM11.2917 6.16667C8.5452 6.16667 6.33333 8.28881 6.33333 10.8889V41.1111C6.33333 43.7112 8.5452 45.8333 11.2917 45.8333H48.0417C50.7881 45.8333 53 43.7112 53 41.1111V10.8889C53 8.28881 50.7881 6.16667 48.0417 6.16667H11.2917ZM27.3669 39.2996C25.3475 40.9235 22.5321 40.1689 21.402 37.9896C21.0804 37.3693 20.9167 36.6779 20.9167 35.9819V16.0179C20.9167 13.8393 22.5275 11.8333 24.9184 11.8333C25.823 11.8333 26.6803 12.148 27.3669 12.7002L39.78 22.6822C41.3704 23.9612 41.7643 26.2402 40.8478 28.0076C40.5876 28.5094 40.2279 28.9574 39.78 29.3176L27.3669 39.2996ZM26.75 19.5605V32.4394L34.7577 25.9999L26.75 19.5605Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="31.0001"
            y1="-0.50003"
            x2="31.0001"
            y2="50.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2276FF" />
            <stop offset="1" stop-color="#0340FF" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div className="speccard__container">
      <div className="speccard__title blue-text">{props.title}</div>
      <div className="speccard__number blue-text">{props.number}</div>
      <div className="speccard__text">{props.text}</div>
      <div className="speccard__buttons">
        <div
          className="speccard__button blue-text"
          onClick={() => {
            history.push(`/videos2/${props.spec_uid}`)
          }}
        >
          <VideoIcon />
          <div>VIDEOS</div>
        </div>
        <div
          className="speccard__button blue-text"
          onClick={() => {
            history.push(`/notes/${props.notes_link}`)
          }}
        >
          <VideoIcon />
          <div>NOTES</div>
        </div>
        <div
          className="speccard__button blue-text"
          //history.push(`/questions/${props.questions_link}`)
          onClick={() => {
            history.push(`/questions2`)
          }}
        >
          <VideoIcon />
          <div>QUESTIONS</div>
        </div>
        <div
          className="speccard__button blue-text"
          onClick={() => {
            history.push(`/flashcard/1`)
          }}
        >
          <VideoIcon />
          <div>FLASHCARDS</div>
        </div>
      </div>
    </div>
  )
}

export default SpecPointCard

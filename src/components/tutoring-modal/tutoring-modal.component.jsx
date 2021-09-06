import "./tutoring-modal.styles.scss"
import teacher from "../../assets/img/teacher.png"
import { IconSVG } from "../icon-svg"

function TutoringModal(props) {
  let title = "Insufficient funds"
  let message1 = "Your selected lesson is not confirmed"
  let message2 = "Please top-up your account and try again"

  if (props.error_or_success === "success") {
    title = "Lesson confirmed"
    message1 = "This lesson costs £" + props.cost
    message2 =
      "Your new accout balance is £" + (props.balance - props.cost * 100)
  }

  const clock = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 5V10L13.3333 11.6667"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
  const calendar = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8333 3.33337H4.16667C3.24619 3.33337 2.5 4.07957 2.5 5.00004V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V5.00004C17.5 4.07957 16.7538 3.33337 15.8333 3.33337Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3333 1.66663V4.99996"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66675 1.66663V4.99996"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 8.33337H17.5"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )

  return (
    <div className="tutoring-modal-wrapper">
      <div className="tutoring-modal-header">Top up your account</div>
      <div className="x-container" onClick={props.cancelModal}>
        <IconSVG name="close-circle" />
      </div>
      <hr />
      <div
        className={`tutoring-modal-title ${
          props.error_or_success === "success" ? "green" : ""
        }`}
      >
        {title}
      </div>
      <div className="tutoring-modal-info">
        <div className="info">
          {calendar}
          {props.date}
        </div>
        <div className="info">
          {clock}
          {props.start_time}
        </div>

        <div className="info">
          <img src={teacher} />
          {props.teacher_name}
        </div>
      </div>
      <div className="message1">{message1}</div>
      <div className="message2">{message2}</div>
    </div>
  )
}

export default TutoringModal

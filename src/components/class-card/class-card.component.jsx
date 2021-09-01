import "./class-card.styles.scss"
import teacher from "../../assets/img/teacher.png"
import { useState } from "react"
import { useEffect } from "react"
import {
  addMeToClass,
  getClassURL,
  removeMeFromClass,
} from "../../utils/firebase/cloud"

function ClassCard(props) {
  const hat = (
    <svg
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.232 0.189898L19.5979 5.34196L19.6375 5.36502C19.7804 5.45697 19.8749 5.61645 19.8749 5.79778V15.0553C19.8217 15.0042 19.7675 14.9528 19.7124 14.901L19.3541 14.5648L18.9958 14.901C18.9406 14.9528 18.8864 15.0042 18.8333 15.0553V6.67423L10.232 11.4057C10.0747 11.4922 9.88345 11.4922 9.72615 11.4057L0.351146 6.24859C-0.00604615 6.0521 -0.00604615 5.54345 0.351146 5.34697L9.72615 0.189898C9.88345 0.103367 10.0747 0.103367 10.232 0.189898Z"
        fill="url(#paint0_radial)"
      />
      <path
        d="M19.3541 14.7083C18.3042 15.753 17.7916 16.5647 17.7916 17.0824C17.7916 17.9368 18.4911 18.6295 19.3541 18.6295C20.217 18.6295 20.9166 17.9368 20.9166 17.0824C20.9166 16.5647 20.4039 15.753 19.3541 14.7083Z"
        fill="url(#paint1_radial)"
      />
      <path
        d="M16.7496 14.1637L16.7499 9.40772L10.7379 12.7149C10.5018 12.8447 10.2403 12.9096 9.97873 12.9096C9.71742 12.9095 9.45612 12.8446 9.22027 12.7149L3.20825 9.40772L3.2079 14.1637C3.2079 14.2892 3.25411 14.4104 3.33788 14.5045C4.61026 15.935 6.8323 16.6276 9.97873 16.6276C13.1252 16.6276 15.3472 15.935 16.6196 14.5045C16.7034 14.4104 16.7496 14.2892 16.7496 14.1637Z"
        fill="url(#paint2_radial)"
      />
      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.4999 9.37726) rotate(90) scale(9.25226 10.4167)"
        >
          <stop stop-color="#0340FF" />
          <stop offset="1" stop-color="#2276FF" />
        </radialGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.4999 9.37726) rotate(90) scale(9.25226 10.4167)"
        >
          <stop stop-color="#0340FF" />
          <stop offset="1" stop-color="#2276FF" />
        </radialGradient>
        <radialGradient
          id="paint2_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.4999 9.37726) rotate(90) scale(9.25226 10.4167)"
        >
          <stop stop-color="#0340FF" />
          <stop offset="1" stop-color="#2276FF" />
        </radialGradient>
      </defs>
    </svg>
  )
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

  async function onCancel() {
    const result = await removeMeFromClass(props.data.id)
    console.log(result)
  }

  const [flipped, setFlipped] = useState(false)
  const [card_html, setCard_html] = useState("")

  function flip() {
    card_html.classList.add("animate-flip")
    setFlipped((state) => {
      return !state
    })
  }

  useEffect(() => {
    setCard_html(document.getElementById(props.data.class_id))
  }, [])

  async function launch(class_id) {
    const result = await getClassURL(class_id)
    console.log(result)
    window.open(result.data.launchurl, "_blank")
  }

  async function register(selectedClassUID) {
    const result = await addMeToClass(selectedClassUID)
    console.log(result)
  }

  const isCancellable = props.data.start_time_and_date - 43200000 > Date.now()

  return (
    <div
      className="class-wrapper"
      id={props.data.class_id}
      onAnimationEnd={() => {
        card_html.classList.remove("animate-flip")
      }}
    >
      <div className="class-card">
        <div className="class-header">
          <div>{props.data.subject}</div>
          <div>{`£${props.data.cost}`}</div>
        </div>
        <hr />

        {flipped ? (
          <>
            <div className="topic-and-description">
              <div className="topic">Topic: {props.data.topic}</div>
              <div className="description">
                {props.data.learning_objectives}
              </div>
            </div>
            <div className="class-buttons" onClick={flip}>
              <div className="button">Back to lesson details</div>
            </div>
          </>
        ) : (
          <>
            <div className="topic-and-cancel">
              <div>Topic: {props.data.topic}</div>
              {props.launch && isCancellable && (
                <div onClick={onCancel}>Cancel</div>
              )}
            </div>
            <div className="information">
              <div>
                <div>{calendar}</div>
                <div>{props.data.date}</div>
              </div>
              <div>
                <div>{clock}</div>
                <div>{props.data.start_time}</div>
              </div>
              <div>
                <div>{hat}</div>
                <div>{props.data.year_group}</div>
              </div>
              <div>
                <img src={teacher} />
                <div>{props.data.teacher_name}</div>
              </div>
            </div>
            <div className="class-buttons">
              <div className="button" onClick={flip}>
                More details
              </div>
              <div
                className="button"
                onClick={() => {
                  if (props.launch) {
                    launch(props.data.class_id)
                  } else {
                    register(props.data.id)
                  }
                }}
              >
                {props.launch ? "Launch" : "Register"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ClassCard

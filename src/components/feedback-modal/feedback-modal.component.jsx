import CloseSVG from "../close-svg/"
import { useState } from "react"
import "./feedback-modal.styles.scss"
import { sendFeedback } from "../../utils/firebase/firestore"

const placeholder_textarea =
  "Please give us any thoughts or feedback you have - We really do read every single one!"
function FeedbackModal(props) {
  const [feedback, setFeedback] = useState("")
  const [success, setSuccess] = useState(false)

  function onSubmitHandler(e) {
    e.preventDefault()
    sendFeedback(feedback)
    setSuccess(true)
  }

  return (
    <div className="feedback-modal__container">
      <div className="feedback-modal__title">
        Feedback
        <div className="close-circle__container" onClick={props.hideModal}>
          <CloseSVG />
        </div>
      </div>
      <div className="feedback-modal__content">
        {!success ? (
          <form onSubmit={onSubmitHandler}>
            <label>
              {" "}
              We would really love your feedback to help us build the best
              platform experience for you.{" "}
            </label>
            <textarea
              value={feedback}
              placeholder={placeholder_textarea}
              onChange={(change) => {
                setFeedback(change.target.value)
              }}
              rows="5"
              cols="3"
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>Feedback successfully sent</div>
        )}
      </div>
    </div>
  )
}

export default FeedbackModal

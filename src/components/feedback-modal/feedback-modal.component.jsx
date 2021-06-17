import CloseSVG from "../close-svg/"

import "./feedback-modal.styles.scss"

const placeholder_textarea =
  "Please send through your thoughts, feedback and insights in order to help us build the most powerful experience possible for new users of our platform. Please send through your thoughts, feedback and insights in order to help us build the most powerful experience possible for new users of our platform. "

function FeedbackModal(props) {
  function onSubmitHandler(e) {
    e.preventDefault()
    //ADD FEEDBACK
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
        <form onSubmit={onSubmitHandler}>
          <label>
            {" "}
            We would really love your feedback to help us build the best
            platform experience for you.{" "}
          </label>
          <textarea placeholder={placeholder_textarea} rows="5" cols="3" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default FeedbackModal

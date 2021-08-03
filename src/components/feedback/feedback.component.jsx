import { propTypes } from "react-bootstrap/esm/Image"
import { IconSVG } from "../../components/icon-svg"
import "./feedback.styles.scss"

function Feedback(props) {
  return (
    <div className="feedback-container">
      <div className="feedback">
        <div className="feedback-left text-format">
          <IconSVG name="info"></IconSVG>
          <span>
            We really value your feedback, both good and bad to help us build
            the best possible experience for you
          </span>
        </div>
        <button
          className="feedback-right text-format"
          onClick={props.showModal}
        >
          <span className="blue-text">Tell us how to improve</span>
        </button>
      </div>
    </div>
  )
}

export default Feedback

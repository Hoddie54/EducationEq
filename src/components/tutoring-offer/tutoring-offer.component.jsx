import "./tutoring-offer.styles.scss"
import { Link } from "react-router-dom"

function TutoringOffer() {
  return (
    <div className="tutoring-offer-wrapper">
      <div>Get your first tutoring lesson free!</div>
      <Link to="/tutoring">
        <div>
          Click <u>here</u> to enter your parent's details and redeem your first
          lesson with us{" "}
        </div>
      </Link>
    </div>
  )
}

export default TutoringOffer

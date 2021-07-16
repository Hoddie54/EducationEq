import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import Feedback from "../../components/feedback/feedback.component"
import Basepage from "../basepage/basepage.component"
import "./homepage3.styles.scss"

function Homepage3() {
  function Subject(props) {
    return (
      <div className="subject__container">
        <div>
          <img src={props.image_url} />
          <div className="subject__content">
            <div className="subject__title blue-text">GCSE {props.subject}</div>
            <div className="subject__text">{props.text}</div>
          </div>
        </div>
        <Link to="/main">
          <div className={`button ${props.disabled ? "disabled" : ""}`}>
            <span>{props.disabled ? "Coming soon" : "Go"}</span>
          </div>
        </Link>
      </div>
    )
  }

  const history = useHistory()

  return (
    <Basepage>
      <Feedback />
      <div className="homepage3__title">
        <div className="subjects blue-text">Subjects</div>
        <div className="exam-board">Edexcel</div>
      </div>
      <Subject
        subject="Chemistry"
        text="Lorem ipsum cheese"
        image_url={"assets/chem.png"}
      />
      <Subject
        subject="Physics"
        text="Lorem ipsum cheese"
        image_url={"assets/physics.png"}
        disabled={true}
      />
      <Subject
        subject="Biology"
        text="Lorem ipsum cheese"
        image_url={"assets/bio.png"}
        disabled={true}
      />
      <Subject
        subject="Maths"
        text="Lorem ipsum cheese"
        image_url={"assets/maths.png"}
        disabled={true}
      />
    </Basepage>
  )
}

export default Homepage3

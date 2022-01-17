import { useEffect, useState } from "react"
import FeedbackModal from "../../components/feedback-modal/feedback-modal.component"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import Feedback from "../../components/feedback/feedback.component"
import Basepage from "../basepage/basepage.component"
import "./homepage3.styles.scss"
import { updateUserInfo } from "../../utils/firebase/firestore"
import AdditionInformationForm from "../../components/addition-infomation-form"
import TutoringOffer from "../../components/tutoring-offer/tutoring-offer.component"
import UpcomingBookings from "../../components/upcoming-bookings/upcoming-bookings.component"
import HomepageModal from "../../components/homepageModal/homepageModal.component"

function Homepage3(props) {
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
            <span>{props.disabled ? "Unavailable" : "Go"}</span>
          </div>
        </Link>
      </div>
    )
  }

  const news = [
    {
      title: "Planned changes",
      news: "You can expect MVP 6.0 (Beta) to come out January 24th. It will include: 1) Blockchain integration with crypto wallet functionality. 2) Ability to learners to send requests for tutoring. 3) Tutor login and ability to view requests dashboard ",
    },
  ]

  function NewsItem(props) {
    const [show, setShow] = useState(false)

    function toggleShow() {
      setShow((state) => {
        return !state
      })
    }

    return (
      <div className="news-item__container">
        <div className="news-item__button" onClick={toggleShow}>
          {show ? "-" : "+"}
        </div>
        <div className="news-item__title">{props.title}</div>
        {show ? <div className="news-item__news">{props.news}</div> : ""}
      </div>
    )
  }

  const history = useHistory()
  const [isBlurred, setIsBlurred] = useState(false)
  const [isShown, setIsShown] = useState(true)

  let exam_board = ""
  if (props.currentUser.subjects) {
    exam_board = props.currentUser.subjects[0].exam_board
  }

  return (
    <Basepage
      blurred={isBlurred}
      modal_content={
        <FeedbackModal hideModal={() => setIsBlurred(() => false)} />
      }
    >
      <Feedback
        showModal={() => {
          setIsBlurred(() => true)
        }}
      />
      <HomepageModal show={isShown} setShow={setIsShown} />
      <div className="homepage__container">
        <div className="homepage__subjects">
          {/* <div className="homepage3__title">
            <div className="subjects blue-text">Subjects</div>
            <div className="exam-board">{exam_board}</div>
          </div> */}
          <div className="homepage__tutoring-offer">
            <TutoringOffer />
          </div>
          <Subject
            subject="Chemistry"
            text="Learn all of GCSE Chemistry from your exam board"
            image_url={"assets/chem.png"}
          />
          <Subject
            subject="Physics"
            text="We are currently working on this subject. If you want us to build it first, please submit feedback in the top of the screen!"
            image_url={"assets/physics.png"}
            disabled={true}
          />
          <Subject
            subject="Biology"
            text="We are currently working on this subject. If you want us to build it first, please submit feedback in the top of the screen!"
            image_url={"assets/bio.png"}
            disabled={true}
          />
          <Subject
            subject="Maths"
            text="We are currently working on this subject. If you want us to build it first, please submit feedback in the top of the screen!"
            image_url={"assets/maths.png"}
            disabled={true}
          />
        </div>

        <div className="homepage__updates-and-classes">
          <div className="homepage__updates">
            <div className="blue-text update__title">
              EdEq Updates
              <hr />
            </div>

            <div className="update__versions">
              <div className="update__version">
                <div>Version</div>
                <div>Update MVP 5.3</div>
              </div>
              <div className="update__version">
                <div>Last updated</div>
                <div>21/11/2021</div>
              </div>
            </div>
            <hr />
            <div className="update__news">
              <div className="update__news-title blue-text">What's new?</div>
              <div className="update__news__container">
                {news.map((item, index) => {
                  return (
                    <NewsItem title={item.title} key={index} news={item.news} />
                  )
                })}
              </div>
            </div>
          </div>
          <div className="homepage__classes">
            <UpcomingBookings currentUser={props.currentUser} />
          </div>
        </div>
      </div>
      {!props.currentUser.dob ? (
        <AdditionInformationForm
          type={"student"}
          show={true}
          handleCompleteSignUp={(data) => {
            updateUserInfo(data)
          }}
          handleHide={() => {
            console.log("handleHide")
          }}
          handleAction={() => {
            console.log("handleAction")
          }}
        />
      ) : (
        ""
      )}
    </Basepage>
  )
}

export default Homepage3

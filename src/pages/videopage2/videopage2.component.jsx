import "./videopage2.styles.scss"
import Basepage from "../basepage/basepage.component"
import { IconSVG } from "../../components/icon-svg"
import RelatedSpecpoints from "../../components/related-specpoints/related-specpoints.components"

import { useEffect } from "react"
import { useState } from "react"
import {
  getAllDataForVideopage2,
  getRatings,
} from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"
import queryString from "query-string"
import { Link } from "react-router-dom"
import { Notes, Target } from "../../components/main-icons/MainIcons.component"
import ReactGA from "react-ga"

function VideoPage2(props) {
  const [spec_id, setSpecId] = useState(props.match.params.id)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const [ratings, setRatings] = useState()

  // const history = useHistory()

  let key = ""
  let color
  let my_specpoint

  if (!isLoading) {
    const search = queryString.parse(data.video_url)
    key = search["https://www.youtube.com/watch?v"]

    if (ratings[spec_id]) {
      color = ratings[spec_id]
    } else {
      color = ""
    }

    my_specpoint = data.related_spec_points.find((specpoint) => {
      return specpoint.UID === spec_id
    })
  }

  useEffect(() => {
    async function getData() {
      const promise = await Promise.all([
        getAllDataForVideopage2(spec_id),
        getRatings(props.currentUser.uid),
      ])
      const returned_data = promise[0]
      const ratings = promise[1]
      setData(returned_data)
      setRatings(ratings)
      setIsLoading(false)
    }
    getData()

    window.addEventListener("blur", fireGAEventVideo)
  }, [spec_id])

  function fireGAEventVideo() {
    ReactGA.event({
      category: "Action_button",
      action: "Video_click",
      label: spec_id,
    })
  }

  function fireGAEventNotes() {
    ReactGA.event({
      category: "Action_button",
      action: "Notes click",
      label: spec_id,
    })
  }

  return (
    <Basepage>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          <div className={`video__title-container ${color}`}>
            <Link to="/main">
              <div className="video__back-button blue-text">
                <div>
                  <IconSVG name="arrow-down" />
                </div>
                Back
              </div>
            </Link>
            <div className="video__title blue-text">GCSE Chemistry</div>
            <div className="video__exam-board">{`Spec point: ${data.number}`}</div>
          </div>
          <div className="video__content-container">
            <div className="video__content">
              <div className="video">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
              </div>
              <div className="other-content-container">
                <div className="other-content">
                  <Notes />
                  Access notes for this specification point
                  <a
                    href={my_specpoint.notes_url}
                    target="_blank"
                    onClick={fireGAEventNotes}
                  >
                    <div className="blue-text">Learn with notes</div>
                  </a>
                </div>

                <div className="other-content">
                  <Target />
                  Answer questions about this specification point
                  <Link to={`/questions2/${spec_id}`}>
                    <div className="blue-text">Test yourself</div>
                  </Link>
                </div>
              </div>

              <div className="buttons">
                <div
                  className={`button blue-text ${
                    data.back === "Disable" ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (data.back === "disabled") return
                    setIsLoading(true)
                    setSpecId(data.back)
                  }}
                >
                  Back
                </div>

                <div
                  className={`button next ${
                    data.forward === "Disable" ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (data.forward === "disabled") return
                    setIsLoading(true)
                    setSpecId(data.forward)
                  }}
                >
                  Next
                </div>
              </div>
            </div>
            <RelatedSpecpoints
              specpoint={spec_id}
              specpoints={data.related_spec_points}
              question_or_video="video"
            />
          </div>
        </>
      )}
    </Basepage>
  )
}

export default VideoPage2

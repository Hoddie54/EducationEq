import "./specvideos.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState, useCallback, useEffect } from "react"
import { IconSVG } from "../../components/icon-svg"
import VideoCardNew from "../../components/video-card-new/video-card-new.component"
import {
  getSpecpoint,
  getVideosFromSpecpoint,
} from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"
import { useHistory } from "react-router"

function Specvideos(props) {
  const specpoint_id = props.match.params.id

  const [isLoading, setIsLoading] = useState(true)
  const [specpoint, setSpecpoint] = useState()
  const [videos, setVideos] = useState([])

  const getData = useCallback(async () => {
    const obtained_specpoint = await getSpecpoint(specpoint_id)
    const videos = await getVideosFromSpecpoint(specpoint_id)

    setSpecpoint(obtained_specpoint)
    setVideos(videos)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const history = useHistory()

  return (
    <Basepage menu_col={true}>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          <div className="spec-title__container">
            <svg
              className="svg"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                history.go(-1)
              }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27.7714 32L39.2191 43.4477C40.2605 44.4891 40.2605 46.1776 39.2191 47.219C38.1777 48.2603 36.4893 48.2603 35.4479 47.219L22.1145 33.8856C21.0731 32.8442 21.0731 31.1558 22.1145 30.1144L35.4479 16.781C36.4893 15.7397 38.1777 15.7397 39.2191 16.781C40.2605 17.8224 40.2605 19.5109 39.2191 20.5523L27.7714 32Z"
                fill="#92929D"
              />
            </svg>

            <div className="spec-title__number blue-text">
              {specpoint.spec_number_and_tier}
            </div>
            <div className="spec-title__text">{specpoint.text}</div>
          </div>
          <div className="videos__container">
            {videos.length === 0
              ? ""
              : videos.map((video) => {
                  return (
                    <VideoCardNew
                      key={video.uid}
                      id={video.uid}
                      title={video.title}
                      url={video.url}
                      specpoints={video.specpoints}
                      description={video.description}
                    />
                  )
                })}
          </div>
        </>
      )}
    </Basepage>
  )
}

export default Specvideos

import { IconSVG } from "../icon-svg"
import "./video-card-new.styles.scss"
import Badge from "../badge/badge.component"
import queryString from "query-string"
import { useHistory } from "react-router-dom"
import { useState, useCallback, useEffect } from "react"
import { getSpecpoint } from "../../utils/firebase/firestore"
import { FormLabel } from "react-bootstrap"

function VideoCardNew(props) {
  const search = queryString.parse(props.url)
  const key = search["https://www.youtube.com/watch?v"]

  const history = useHistory()

  const [specpoints, setSpecpoints] = useState([])

  const getData = useCallback(async () => {
    const specs = []
    for (let specpoint of props.specpoints) {
      const obtained_point = await getSpecpoint(specpoint)
      specs.push(obtained_point)
    }
    setSpecpoints(specs)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const descriptions = props.description.split("|")
  let description = descriptions.map((d) => {
    return (
      <>
        <span>{d}</span>
        <br />
      </>
    )
  })

  return (
    <div className="video-card__container">
      <div
        className="image-container"
        onClick={() => {
          history.push(`/video/${props.id}`)
        }}
      >
        <div className="icon-container">
          <IconSVG name="play" />
        </div>
        <img src={`https://img.youtube.com/vi/${key}/0.jpg`} />
      </div>
      <div className="video-card__title blue-text">Chemistry</div>
      <div className="video-card__sub-title blue-text">{props.title}</div>
      <div className="video-card__spec">{props.lesson_id}</div>
      <div className="video-card__desc">{description}</div>
      <div className="badge-container">
        {specpoints.map((specpoint) => {
          return (
            <Badge
              key={specpoint.uid}
              number={specpoint.spec_number_and_tier}
              topic_id={specpoint.topic_id}
              subtopic_id={specpoint.subtopic_id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VideoCardNew

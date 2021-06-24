import Basepage from "../basepage/basepage.component"
import "./videopage.styles.scss"
import Badge from "../../components/badge/badge.component"
import { getSpecpoint, getVideo } from "../../utils/firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import SpinnerPage from "../spinner/spinner.component"
import queryString from "query-string"

function VideoPage(props) {
  const video_id = props.match.params.id

  const [data, setData] = useState([])
  const [specpoints, setSpecpoints] = useState([])

  const getData = useCallback(async () => {
    const obtainedData = await getVideo(video_id)
    const specs = []
    for (let specpoint of obtainedData.specpoints) {
      const obtained_point = await getSpecpoint(specpoint)
      specs.push(obtained_point)
    }

    setData(obtainedData)
    setSpecpoints(specs)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const search = queryString.parse(data.url)
  const key = search["https://www.youtube.com/watch?v"]

  return (
    <Basepage menu_col={true}>
      <div className="subtopic-title__container">
        <div className="subtopic-title__text blue-text">GCSE Chemistry</div>
        <div className="subtopic-title__exam">EdExcel</div>
      </div>
      <div className="videopage__container">
        {data.length === 0 ? (
          <SpinnerPage />
        ) : (
          <>
            <div className="videopage__video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${key}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="videopage__info">
              <div className="blue-text videopage__spec">{data.lesson_id}</div>
              <div className="videopage__text">
                <div>{data.title}</div>
                <div>{data.description}</div>
              </div>
              <div className="videopage__badges">
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
          </>
        )}
      </div>
    </Basepage>
  )
}

export default VideoPage

import "./subtopicpage.styles.scss"
import VideoCardNew from "../../components/video-card-new/video-card-new.component"
import Basepage from "../basepage/basepage.component"
import { useEffect, useCallback, useState } from "react"
import { getSubtopic, getVideos } from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"

function SubtopicPage(props) {
  const [data, setData] = useState([])
  const [videos, setVideos] = useState([])

  const getData = useCallback(async () => {
    const subtopic = await getSubtopic(
      props.match.params.topic_id,
      props.match.params.subtopic_id
    )
    const videos = await getVideos(
      props.match.params.topic_id,
      props.match.params.subtopic_id
    )
    setData(subtopic)
    setVideos(videos)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Basepage menu_col={true}>
        {data.length === 0 ? (
          <SpinnerPage />
        ) : (
          <>
            <div className="subtopic-title__container">
              <div className="subtopic-title__text blue-text">
                GCSE Chemistry
              </div>
              <div className="subtopic-title__exam">EdExcel</div>
            </div>
            <div className="subtopic-main-content">
              <div className="subtopic-header">
                <div className="subtopic-header__text">{data.name}</div>
                <div className="button-container">
                  <button className="selected">Featured</button>
                  <button className="">Extra videos</button>
                </div>
              </div>
              <div className="subtopic-content__container">
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
            </div>
          </>
        )}
      </Basepage>
    </>
  )
}

export default SubtopicPage

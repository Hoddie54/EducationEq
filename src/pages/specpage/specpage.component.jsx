import "./specpage.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState, useEffect, useCallback } from "react"
import SpecPageSubtopic from "../../components/specpage-subtopic/specpage-subtopic.component"
import {
  getAllDataForMainpage,
  getRatings,
  getTopics,
} from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"
import queryString from "query-string"

function SpecPage(props) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedRating, setSelectedRating] = useState("no-filter")
  // const [topics, setTopics] = useState([])
  const [data, setData] = useState()
  const [ratings, setRatings] = useState()

  const getData = useCallback(async () => {
    const currentUser = props.currentUser
    const subject = currentUser.subjects[0].name
    const exam_board = currentUser.subjects[0].exam_board
    //const topics = await getTopics(subject, exam_board)

    const promise = await Promise.all([
      getAllDataForMainpage(subject, exam_board),
      getRatings(currentUser.uid),
    ])
    const data = promise[0]
    const ratings = promise[1]

    // setTopics(topics)
    setRatings(ratings)
    setData(data)
  }, [])
  useEffect(() => {
    getData()
  }, [getData])

  const search = queryString.parse(props.location.search)
  const topic_display = search.topic
  const subtopic_display = search.subtopic

  let topicsJSX = <SpinnerPage />
  if (data && ratings) {
    topicsJSX = data.content.map((topic) => {
      if (
        selectedTopic == null ||
        selectedTopic === "No subject filter" ||
        topic.UID === selectedTopic
      ) {
        return (
          <SpecPageSubtopic
            title={topic.topic_name}
            topic_id={topic.UID}
            key={topic.UID}
            subtopics={topic.subtopics}
            topic_display={topic_display}
            subtopic_display={subtopic_display}
            selected_rating={selectedRating}
            ratings={ratings}
          />
        )
      }
    })
  }

  return (
    <Basepage menu_col={true}>
      {/* <div className="spec-info">
        If you click on a specification point, you can search our platform for
        all videos that cover that point. This is amazing for revision and
        making sure you know everything you need for the exam.{" "}
      </div> */}
      <div className="spec__page">
        <div className="spec-title">View your progress on spec</div>
        <div className="spec__progress-bar">
          <div className="progress-bar__green"></div>
          <div className="progress-bar__amber"></div>
          <div className="progress-bar__red"></div>
          <div className="progress-bar__unrated"></div>
        </div>
        <div className="spec-filters">
          <div className="selection">GCSE Chemistry</div>
          <select
            value={selectedTopic}
            onChange={(newValue) => {
              setSelectedTopic(newValue.target.value)
            }}
            className="selection"
          >
            <option value={null}>No subject filter</option>
            {data
              ? data.content.map((topic) => {
                  return (
                    <option value={topic.UID} key={topic.UID}>
                      {topic.topic_name}
                    </option>
                  )
                })
              : ""}
          </select>
          <select
            className="selection"
            value={selectedRating}
            onChange={(newValue) => {
              setSelectedRating(newValue.target.value)
            }}
          >
            <option value="no-filter">No rating filter</option>
            <option value="">Unrated</option>
            <option value="green">Got it</option>
            <option value="amber">Getting it</option>
            <option value="red">Soon come</option>
          </select>
        </div>
        <div className="spec-main">{topicsJSX}</div>
      </div>
    </Basepage>
  )
}

export default SpecPage

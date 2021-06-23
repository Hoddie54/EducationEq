import "./specpage.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState, useEffect, useCallback } from "react"
import SpecPageSubtopic from "../../components/specpage-subtopic/specpage-subtopic.component"
import { getTopics } from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"
import queryString from "query-string"

function SpecPage(props) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [topics, setTopics] = useState([])

  const getData = useCallback(async () => {
    const currentUser = props.currentUser
    const subject = currentUser.subjects[0].name
    const exam_board = currentUser.subjects[0].exam_board
    const topics = await getTopics(subject, exam_board)

    setTopics(topics)
  }, [])
  useEffect(() => {
    getData()
  }, [getData])

  const search = queryString.parse(props.location.search)
  const topic_display = search.topic
  const subtopic_display = search.subtopic

  let topicsJSX = <SpinnerPage />
  if (topics.length > 0) {
    topicsJSX = topics.map((topic) => {
      if (
        selectedTopic == null ||
        selectedTopic === "No filter" ||
        topic.uid === selectedTopic
      ) {
        return (
          <SpecPageSubtopic
            title={topic.name}
            topic_id={topic.uid}
            key={topic.uid}
            topic_display={topic_display}
            subtopic_display={subtopic_display}
          />
        )
      }
    })
  }

  return (
    <Basepage menu_col={true}>
      <div className="spec-info">
        If you click on a specification point, you can search our platform for
        all videos that cover that point. This is amazing for revision and
        making sure you know everything you need for the exam.{" "}
      </div>
      <div className="spec-title">Spec page view</div>
      <div className="spec-filters">
        <div className="selection">GCSE Chemistry</div>
        <select
          value={selectedTopic}
          onChange={(newValue) => {
            setSelectedTopic(newValue.target.value)
          }}
          className="selection"
        >
          <option value={null}>No filter</option>
          {topics.map((topic) => {
            return (
              <option value={topic.uid} key={topic.uid}>
                {topic.name}
              </option>
            )
          })}
        </select>
      </div>
      <div className="spec-main">{topicsJSX}</div>
    </Basepage>
  )
}

export default SpecPage

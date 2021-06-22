import "./specpage.styles.scss"
import Basepage from "../basepage/basepage.component"
import { useState, useEffect, useCallback } from "react"
import SpecPageSubtopic from "../../components/specpage-subtopic/specpage-subtopic.component"
import { getTopics } from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"

function SpecPage() {
  const [topic, setTopic] = useState(1)
  const [topics, setTopics] = useState([])

  const getData = useCallback(async () => {
    const topics = await getTopics("Chemistry", "Edexcel")
    setTopics(topics)
  }, [])
  useEffect(() => {
    getData()
  }, [getData])

  let topicsJSX = <SpinnerPage />
  if (topics.length > 0) {
    topicsJSX = topics.map((topic) => {
      return <SpecPageSubtopic title={topic.name} />
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
          value={topic}
          onChange={(newValue) => {
            setTopic(newValue.target.value)
          }}
          className="selection"
        >
          <option value={1}>Topic 1</option>
          <option value={2}>Topic 2</option>
        </select>
      </div>
      <div className="spec-main">{topicsJSX}</div>
    </Basepage>
  )
}

export default SpecPage

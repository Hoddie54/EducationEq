import "./main-page.styles.scss"
import Basepage from "../basepage/basepage.component"
import SpecPointCard from "../../components/specpointcard/specpointcard.component"
import Feedback from "../../components/feedback/feedback.component"
import SpinnerPage from "../spinner/spinner.component"
import { useEffect, useState } from "react"
import {
  getAllDataForMainpage,
  getRatings,
} from "../../utils/firebase/firestore"
import ReactGA from "react-ga"

function MainPage(props) {
  const subject = "Chemistry"
  const exam_board = props.currentUser.subjects[0].exam_board

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const [ratings, setRatings] = useState()

  const [selectedTopic, setSelectedTopic] = useState("0")
  const [selectedSubtopic, setSelectedSubtopic] = useState("0")

  function topicChange(event) {
    setSelectedTopic(event.target.value)
    setSelectedSubtopic("0")
    ReactGA.event({
      category: "Action_button",
      action: "Topic_change",
      label: data.content[event.target.value].topic_name,
    })
  }

  function subtopicChange(event) {
    setSelectedSubtopic(event.target.value)
    ReactGA.event({
      category: "Action_button",
      action: "Subtopic_change",
      label: data.content[selectedTopic].subtopics[event.target.value].name,
    })
  }

  useEffect(() => {
    async function getData() {
      // const returned_data = await getAllDataForMainpage(subject, exam_board)
      // const ratings = await getRatings()
      const promise = await Promise.all([
        getAllDataForMainpage(subject, exam_board),
        getRatings(props.currentUser.uid),
      ])
      const returned_data = promise[0]
      const ratings = promise[1]
      setData(returned_data)
      setRatings(ratings)
      setIsLoading(false)
    }
    getData()
    ReactGA.event({
      category: "Identity",
      action: "main_page",
      label: props.currentUser.email.split("@")[0],
    })
  }, [])

  return (
    <Basepage>
      {/* <Feedback /> */}
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          <div className="main-page__selector">
            <div className="main-page__topic">
              <span>Topic: </span>
              <select value={selectedTopic} onChange={topicChange}>
                {data.content.map((topic, index) => {
                  return (
                    <option value={index} key={topic.UID}>
                      {topic.topic_name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="main-page__topic">
              <span>Subtopic: </span>
              <select value={selectedSubtopic} onChange={subtopicChange}>
                {data.content[selectedTopic].subtopics.map(
                  (subtopic, index) => {
                    return (
                      <option value={index} key={subtopic.UID}>
                        {subtopic.name}
                      </option>
                    )
                  }
                )}
              </select>
            </div>
          </div>
          <div className="main-page__message blue-text">
            Rate how confident you are on each spec point by changing the level
          </div>
          <div className="main-page__content">
            {data.content[selectedTopic].subtopics[
              selectedSubtopic
            ].specpoints.map((specpoint) => {
              return (
                <SpecPointCard
                  key={specpoint.UID}
                  title={specpoint.name}
                  number={specpoint.number}
                  text={specpoint.text}
                  spec_uid={specpoint.UID}
                  subtopic_uid={
                    data.content[selectedTopic].subtopics[selectedSubtopic].UID
                  }
                  rating={ratings[specpoint.UID] ? ratings[specpoint.UID] : ""}
                  setRatings={setRatings}
                  notes_url={specpoint.notes_url}
                />
              )
            })}
          </div>
        </>
      )}
    </Basepage>
  )
}

export default MainPage

import { useState, useEffect } from "react"
import Basepage from "../basepage/basepage.component"
import { useParams } from "react-router-dom"
import { cloneDeep } from "lodash"
import {
  getDataFromFirestore,
  getSubtopicsOnTopic,
  updateDataFromFirestore,
} from "../../utils/firebase/firestore"
import SpinnerPage from "../spinner/spinner.component"
import MyCourseNewTopicModal from "../../components/myCourseNewTopicModal/myCourseNewTopicModal.component"
import Subtopic from "../../components/subtopic/subtopic.component"
import "./myCoursesSubtopic.styles.scss"

function MyCoursesSubtopic() {
  const [topic, setTopic] = useState()
  const [subtopics, setSubtopics] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [showAddNewTopicModal, setShowAddNewTopicModal] = useState(false)

  const { course_id, topic_id } = useParams()

  useEffect(() => {
    async function load() {
      //const course = await getDataFromFirestore("course_drafts", topic_id)
      const topic = await getDataFromFirestore("topics", topic_id)
      const subtopics = await getSubtopicsOnTopic(topic_id)
      setTopic(topic)
      setSubtopics(subtopics)
      setIsLoading(false)
    }
    load()
  }, [])

  function addNewSubtopic(subtopic) {
    setSubtopics((state) => {
      const new_state = [...state]
      new_state.push(subtopic)
      return new_state
    })
  }

  async function saveSubtopics() {
    await Promise.all(
      subtopics.map((subtopic, index) => {
        return new Promise((resolve, reject) => {
          const topic_data = {
            title: subtopic.title,
            order: index,
            uid: subtopic.uid,
            topic_uid: topic_id,
            course_uid: course_id,
            points: subtopic.points ? subtopic.points : [],
          }
          updateDataFromFirestore("subtopics", topic_data.uid, topic_data)
            .then((res) => {
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        })
      })
    )
    alert("Done")
  }

  if (isLoading) {
    return (
      <Basepage>
        <SpinnerPage />
      </Basepage>
    )
  }

  function moveUp(n) {
    swap(n, n - 1)
  }

  function moveDown(n) {
    swap(n, n + 1)
  }

  function swap(a, b) {
    setSubtopics((array) => {
      const new_array = [...array]
      new_array[a] = array[b]
      new_array[b] = array[a]
      return new_array
    })
  }

  function swapPoints(subtopic, point1, point2) {
    setSubtopics((state) => {
      const new_state = cloneDeep(state)
      new_state[subtopic].points[point1].order =
        state[subtopic].points[point2].order
      new_state[subtopic].points[point2].order =
        state[subtopic].points[point1].order

      console.log(new_state[subtopic].points)
      return new_state
    })
  }

  function movePointUp(subtopic, point) {
    swapPoints(subtopic, point, point - 1)
  }

  function movePointDown(subtopic, point) {
    swapPoints(subtopic, point, point + 1)
  }

  return (
    <Basepage>
      <div className="course-subtopic">
        <h2 className="blue-text edeq-heading">{topic.title}</h2>
        <div className="edeq-container">
          <div className="">
            {subtopics.map((subtopic, index) => {
              const moveMeUp = () => {
                moveUp(index)
              }

              const moveMeDown = () => {
                moveDown(index)
              }

              function addLearningPoint(learning_point) {
                setSubtopics((state) => {
                  const new_state = [...state]
                  const length = new_state[index].points.length
                  new_state[index].points.push({
                    ...learning_point,
                    order: length,
                  })
                  return new_state
                })
              }

              const first = index === 0
              const last = index === subtopics.length - 1

              return (
                <Subtopic
                  {...subtopic}
                  index={index}
                  key={index}
                  topic_index={topic.order}
                  moveUp={moveMeUp}
                  moveDown={moveMeDown}
                  first={first}
                  last={last}
                  addLearningPoint={addLearningPoint}
                  movePointDown={movePointDown}
                  movePointUp={movePointUp}
                />
              )
            })}
            <div className="edeq-topic">
              <div
                className="edeq-button"
                onClick={() => {
                  setShowAddNewTopicModal(true)
                }}
              >
                Add new subtopic
              </div>
            </div>
          </div>
          <div className="buttons">
            <div className="edeq-button" onClick={saveSubtopics}>
              Save
            </div>
          </div>
        </div>
      </div>
      <MyCourseNewTopicModal
        addNewTopic={addNewSubtopic}
        showModal={showAddNewTopicModal}
        setShowModal={setShowAddNewTopicModal}
        title="Subtopic"
      />
    </Basepage>
  )
}

export default MyCoursesSubtopic

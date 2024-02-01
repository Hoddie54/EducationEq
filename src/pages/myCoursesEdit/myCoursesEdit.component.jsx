import "./myCoursesEdit.styles.scss"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  getDataFromFirestore,
  getTopicsOnCourse,
  updateDataFromFirestore,
} from "../../utils/firebase/firestore"
import Basepage from "../basepage/basepage.component"
import SpinnerPage from "../spinner/spinner.component"
import MyCourseNewTopicModal from "../../components/myCourseNewTopicModal/myCourseNewTopicModal.component"
import { useHistory } from "react-router-dom"

function MyCoursesEdit(props) {
  const [course, setCourse] = useState()

  const [myTopics, setMyTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewTopicModal, setShowNewTopicModal] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function load() {
      const course = await getDataFromFirestore("course_drafts", id)
      const topics = await getTopicsOnCourse(course.id)
      setCourse(course)
      setMyTopics(topics)
      setLoading(false)
    }
    load()
  }, [])

  function addNewTopic(topic) {
    setMyTopics((state) => {
      const new_state = [...state]
      new_state.push(topic)
      return new_state
    })
  }

  async function saveTopics() {
    await Promise.all(
      myTopics.map((topic, index) => {
        return new Promise((resolve, reject) => {
          const topic_data = {
            title: topic.title,
            order: index,
            uid: topic.uid,
            course: id,
          }
          updateDataFromFirestore("topics", topic_data.uid, topic_data)
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

  function moveUp(n) {
    swap(n, n - 1)
  }

  function moveDown(n) {
    swap(n, n + 1)
  }

  function swap(a, b) {
    setMyTopics((array) => {
      const new_array = [...array]
      new_array[a] = array[b]
      new_array[b] = array[a]
      return new_array
    })
  }

  const history = useHistory()

  if (loading) {
    return (
      <Basepage>
        <SpinnerPage />
      </Basepage>
    )
  }

  return (
    <Basepage>
      <div className="course-edit">
        <h2 className="blue-text edeq-heading">{course.title}</h2>
        {/* Edit Title and Subject */}
        <div className="edeq-container">
          {myTopics.map((topic, index) => {
            const first = index === 0
            const last = index === myTopics.length - 1

            return (
              <div className="edeq-topic" key={index}>
                <div>
                  {" "}
                  <div>{`${index + 1}.0`}</div>
                  <div className="edeq-heading">{topic.title}</div>
                </div>
                <div>
                  <div
                    className="edeq-button"
                    onClick={async () => {
                      await saveTopics()
                      history.push(`/my-courses/${id}/${topic.uid}`)
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className={`up-down ${first ? "blurred" : ""}`}
                    onClick={() => {
                      if (first) return
                      moveUp(index)
                    }}
                  >
                    ▲
                  </div>
                  <div
                    className={`up-down ${last ? "blurred" : ""}`}
                    onClick={() => {
                      if (last) return
                      moveDown(index)
                    }}
                  >
                    ▼
                  </div>
                </div>
              </div>
            )
          })}
          <div className="edeq-topic">
            <div
              className="edeq-button"
              onClick={() => {
                setShowNewTopicModal(true)
              }}
            >
              Add new topic
            </div>
          </div>
          <div className="buttons">
            <div className="edeq-button">Preview</div>
            <div
              className="edeq-button"
              onClick={() => {
                saveTopics()
              }}
            >
              Save
            </div>
            <div className="edeq-button">Publish</div>
          </div>
        </div>
      </div>
      <MyCourseNewTopicModal
        showModal={showNewTopicModal}
        setShowModal={setShowNewTopicModal}
        addNewTopic={addNewTopic}
        title="Topic"
      />
    </Basepage>
  )
}

export default MyCoursesEdit

import "./myCoursesEdit.styles.scss"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  getDataFromFirestore,
  getTopics,
  getTopicsOnCourse,
  updateDataFromFirestore,
} from "../../utils/firebase/firestore"
import Basepage from "../basepage/basepage.component"
import SpinnerPage from "../spinner/spinner.component"
import MyCourseNewTopicModal from "../../components/myCourseNewTopicModal/myCourseNewTopicModal.component"

function MyCoursesEdit(props) {
  const [course, setCourse] = useState()
  const [topics, setTopics] = useState()
  const [myTopics, setMyTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewTopicModal, setShowNewTopicModal] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    async function load() {
      const course = await getDataFromFirestore("course_drafts", id)
      const topics = await getTopicsOnCourse(course.id)
      setCourse(course)
      setTopics(topics)
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
            return (
              <div className="edeq-topic" key={index}>
                <div>
                  {" "}
                  <div>{`${index + 1}.0`}</div>
                  <div>{topic.title}</div>
                </div>
                <div>
                  <div className="edeq-button">Edit</div>
                  <div className="up-down">▲</div>
                  <div className="up-down">▼</div>
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
      />
    </Basepage>
  )
}

export default MyCoursesEdit

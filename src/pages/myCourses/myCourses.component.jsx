import { useEffect } from "react"
import { useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { propTypes } from "react-bootstrap/esm/Image"
import NewCourseModal from "../../components/newCourseModal/newCourseModal.component"
import { getCourseDrafts, getImageUrl } from "../../utils/firebase/firestore"
import Basepage from "../basepage/basepage.component"
import SpinnerPage from "../spinner/spinner.component"
import "./myCourses.styles.scss"

function MyCourses(props) {
  //Load courses

  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState()
  const [imageURLs, setImageURLs] = useState()

  const [showNewCourseModal, setShowNewCourseModal] = useState(false)

  useEffect(() => {
    async function load() {
      const loaded_courses = await getCourseDrafts(props.currentUser.uid)
      const imageURLs = await Promise.all(
        loaded_courses.map((course) => {
          return new Promise((resolve) => {
            getImageUrl(course.image).then((url) => {
              resolve(url)
            })
          })
        })
      )
      setCourses(loaded_courses)
      setImageURLs(imageURLs)
      setLoading(false)
    }
    load()
  }, [])

  function showModal() {
    setShowNewCourseModal(true)
  }

  return (
    <Basepage>
      <div className="my-courses">
        <div className="course-header">
          <h2 className="blue-text edeq-heading">My Courses</h2>
          <Button className="edeq-button" onClick={showModal}>
            Add new course
          </Button>
        </div>
        <div className="edeq-container">
          Note: No tokens will be allocated until your wallet is connected
        </div>
        <div className="my-courses-courses">
          {loading ? <SpinnerPage /> : ""}
          {!loading && courses.size === 0 ? (
            <div className="edeq-container">
              You have not uploaded any courses yet
            </div>
          ) : (
            ""
          )}
          {!loading && courses
            ? courses.map((course, index) => {
                return (
                  <div className="course edeq-container" key={index}>
                    <img src={imageURLs[index]} />
                    <hr />
                    <div className="title-and-edit">
                      <h4>{course.title}</h4>
                      <Button
                        className="edeq-button"
                        href={`./my-courses/${course.id}`}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                )
              })
            : ""}
        </div>
      </div>
      <NewCourseModal
        showModal={showNewCourseModal}
        setShowModal={setShowNewCourseModal}
        currentUser={props.currentUser}
      />
    </Basepage>
  )
}

export default MyCourses

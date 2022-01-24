import { Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"
import { subjects } from "../../utils/helpers/data"
import { sendDataToFirebase, uploadImage } from "../../utils/firebase/firestore"
import { makeId } from "../../utils/helpers/misc"

function NewCourseModal(props) {
  const { showModal, setShowModal } = props

  function handleHide() {
    setSubmitted(false)
    setShowModal(false)
  }

  const initialData = { title: "", subject: "", image: "", image_file: "" }
  const [formData, setFormData] = useState(initialData)
  const [submitted, setSubmitted] = useState(false)

  function onChange(e) {
    setFormData((state) => {
      console.log(e.target)
      return { ...state, [e.target.name]: e.target.value }
    })
  }

  function onImageChange(e) {
    setFormData((state) => {
      console.log(e.target)
      return {
        ...state,
        [e.target.name]: e.target.value,
        image_file: e.target.files[0],
      }
    })
  }

  async function formSubmit(e) {
    e.preventDefault()
    const newId = makeId(10)
    const ans = await uploadImage(formData.image_file, newId)
    const data = {
      title: formData.title,
      subject: formData.subject,
      image: newId,
      subtopics: [],
      author: props.currentUser.uid,
    }
    const resp = await sendDataToFirebase("course_drafts", data)
    setSubmitted(true)
    setFormData(initialData)
  }

  return (
    <Modal show={showModal} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title className="blue-text">Add a course</Modal.Title>
      </Modal.Header>
      {submitted ? (
        <Modal.Body>Submitted!</Modal.Body>
      ) : (
        <Modal.Body>
          <Form onSubmit={formSubmit}>
            <Form.Group>
              <Form.Label>Course title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={onChange}
                name="title"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                value={formData.subject}
                onChange={onChange}
                name="subject"
                required
              >
                {subjects.map((subject, index) => {
                  return (
                    <option value={subject} key={index}>
                      {subject}
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Course header photo</Form.Label>
              <Form.Control
                type="file"
                value={formData.image}
                name="image"
                onChange={onImageChange}
                required
                accept="image/png, image/jpeg"
              ></Form.Control>
            </Form.Group>
            <Button className="edeq-button" type="submit">
              Create course
            </Button>
          </Form>
        </Modal.Body>
      )}
    </Modal>
  )
}

export default NewCourseModal

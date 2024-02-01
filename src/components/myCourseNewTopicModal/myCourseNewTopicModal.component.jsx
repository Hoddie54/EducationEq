import { makeId } from "../../utils/helpers/misc"
import { Form, Button, Modal } from "react-bootstrap"
import { useState } from "react"

function MyCourseNewTopicModal(props) {
  const { showModal, setShowModal, title } = props

  function handleHide() {
    setShowModal(false)
  }

  const initialData = { title: "" }
  const [formData, setFormData] = useState(initialData)

  function onChange(e) {
    setFormData((state) => {
      return { ...state, [e.target.name]: e.target.value }
    })
  }

  function formSubmit(e) {
    e.preventDefault()
    const topic = { title: formData.title, uid: makeId(15) }
    props.addNewTopic(topic)
    setFormData(initialData)
    handleHide()
  }

  return (
    <Modal show={showModal} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title className="blue-text">Add a {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formSubmit}>
          <Form.Group>
            <Form.Label>Topic title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={onChange}
              name="title"
              required
            ></Form.Control>
          </Form.Group>
          <Button className="edeq-button" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default MyCourseNewTopicModal

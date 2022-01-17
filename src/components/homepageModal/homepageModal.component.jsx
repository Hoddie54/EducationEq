import { Modal } from "react-bootstrap"

function HomepageModal(props) {
  const { show, setShow } = props

  function handleHide() {
    setShow(false)
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>A message from EdEq Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Welcome to our alpha. We are releasing major changes and taking our beta
        public in the next week (24th January). We’re introducing many new
        features with blockchain integration, tutor logins and tutoring request
        dashboards. But for now, enjoy playing with our alpha and let us know
        what you think ;){" "}
      </Modal.Body>
    </Modal>
  )
}

export default HomepageModal

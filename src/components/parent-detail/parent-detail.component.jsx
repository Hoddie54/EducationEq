import "./parent-detail.styles.scss"
import { useState } from "react"
import { sendParentDetails } from "../../utils/firebase/firestore"

function ParentDetail() {
  const initialFormDetails = { name: "", email: "", phone: "", checkbox: false }

  const [formDetails, setFormDetails] = useState(initialFormDetails)
  const [submitted, setSubmitted] = useState(false)

  function formChange(e) {
    setFormDetails((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  function submit(e) {
    e.preventDefault()
    console.log(formDetails)
    sendParentDetails({
      parent_name: formDetails.name,
      parent_email: formDetails.email,
      parent_phone: formDetails.phone,
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => alert(err))
  }

  return (
    <div className="parent-detail-wrapper">
      <div className="form-wrapper">
        {submitted ? (
          "Thank you. We will be in touch very soon to organise your free lesson"
        ) : (
          <>
            <form onSubmit={submit} id="form">
              <input
                type="text"
                name="name"
                value={formDetails.name}
                placeholder="Parent's name"
                onChange={formChange}
                required
              />
              <input
                type="email"
                placeholder="Parent's Email"
                name="email"
                value={formDetails.email}
                onChange={formChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Parent's Phone"
                value={formDetails.phone}
                onChange={formChange}
                required
              />

              <label htmlFor="checkbox">
                You verify that your parent / carer listed above consents to
                being contacted about your tutoring lesson
                <input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  value={formDetails.checkbox}
                  onChange={formChange}
                  required
                />
              </label>
            </form>
            <button type="submit" form="form">
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ParentDetail

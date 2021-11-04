import { useState } from "react"
import "./tutoring-form-1.styles.scss"

function TutoringForm1(props) {
  const { formDetails } = props
  const { formChange } = props
  const passwordTooShort = formDetails.password.length < 6

  function onSubmit() {
    if (formDetails.password.length < 6) return
    props.setFormStage(2)
  }

  return (
    <div className="form-1">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Please enter your email"
          value={formDetails.email}
          onChange={formChange}
          required
        />
        <label>Please select a password</label>
        {passwordTooShort && formDetails.password.length > 0
          ? "Please enter a password with at least 7 characters"
          : ""}
        <input
          name="password"
          type="password"
          value={formDetails.password}
          onChange={formChange}
          required
        />
        <input
          name="parent_name"
          type="text"
          placeholder="What is your name?"
          value={formDetails.parent_name}
          onChange={formChange}
          required
        />
        <label>How many sessions did you purchase?</label>
        <select
          name="package"
          value={formDetails.package}
          onChange={formChange}
          required
        >
          {/* <option>Which package have you purchased?</option> */}
          <option value={5}>5 sessions</option>
          <option value={10}>10 sessions</option>
          <option value={20}>20 sessions</option>
        </select>
        <input
          name="phone_number"
          type="tel"
          placeholder="What is your phone number?"
          value={formDetails.phone_number}
          onChange={formChange}
          required
        />
        <input
          name="student_email"
          type="email"
          placeholder="What is the student's email?"
          value={formDetails.student_email}
          onChange={formChange}
        />
        <input
          name="student_phone_number"
          type="tel"
          placeholder="What is the student's phone number?"
          value={formDetails.student_phone_number}
          onChange={formChange}
        />
        <button type="submit">Next</button>
      </form>
    </div>
  )
}

export default TutoringForm1
